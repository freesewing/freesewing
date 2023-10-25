import { log } from '../utils/log.mjs'
import { hashPassword, randomString, verifyPassword } from '../utils/crypto.mjs'
import { asJson } from '../utils/index.mjs'
import { decorateModel } from '../utils/model-decorator.mjs'

/*
 * This model handles all apikey updates
 *
 * @param {tools} object - A set of tools loaded in src/index.js
 * @returns {ApikeyModel} object - The ApikeyModel
 */
export function ApikeyModel(tools) {
  /*
   * See utils/model-decorator.mjs for details
   */
  return decorateModel(this, tools, {
    name: 'apikey',
    encryptedFields: ['name'],
    models: ['user'],
  })
}

/*
 * Verifies an API key and secret
 * Will set this.verified to true or false before returning the model
 *
 * @param {key} string - The API key
 * @param {secret} string - The API secret
 * @returns {ApikeyModel} object - The ApikeyModel
 */
ApikeyModel.prototype.verify = async function (key, secret) {
  /*
   * Attempt to read the record from the database
   */
  await this.read({ id: key })

  /*
   * Apikey secret is just like a password, and we verify it the same way
   */
  const [valid] = verifyPassword(secret, this.record.secret)

  /*
   * Store result in the verified property
   */
  this.verified = valid

  return this
}

/*
 * Reads an API key
 * This is guarded so it enforces access control and validates input
 *
 * @param {params} object - The request (url) parameters
 * @param {user} object - The user as loaded by the authentication middleware
 * @returns {ApikeyModel} object - The ApikeyModel
 */
ApikeyModel.prototype.guardedRead = async function ({ params, user }) {
  /*
   * Enforece RBAC
   */
  if (!this.rbac.readSome(user)) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * Attempt to read record from database
   */
  await this.read({ id: params.id })

  /*
   * If it's not found, return 404
   */
  if (!this.record) return this.setResponse(404)

  /*
   * Only admins can read other users
   */
  if (this.record.userId !== user.uid && !this.rbac.admin(user)) {
    return this.setResponse(403, 'insufficientAccessLevel')
  }

  /*
   * Decrypt data that is encrypted at rest
   */
  await this.reveal()

  return this.setResponse200({
    apikey: {
      key: this.record.id,
      level: this.record.level,
      createdAt: this.record.createdAt,
      expiresAt: this.record.expiresAt,
      name: this.clear.name,
      userId: this.record.userId,
    },
  })
}

/*
 * Deletes an API key
 * This is guarded so it enforces access control and validates input
 *
 * @param {params} object - The request (url) parameters
 * @param {user} object - The user as loaded by the authentication middleware
 * @returns {ApikeyModel} object - The ApikeyModel
 */
ApikeyModel.prototype.guardedDelete = async function ({ params, user }) {
  /*
   * Enforece RBAC
   */
  if (!this.rbac.user(user)) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * Attempt to read record from database
   */
  await this.read({ id: params.id })

  /*
   * If it's not found, return 404
   */
  if (!this.record) return this.setResponse(404)

  /*
   * Only admins can delete other users
   */
  if (this.record.userId !== user.uid && !this.rbac.admin(user)) {
    return this.setResponse(403, 'insufficientAccessLevel')
  }

  /*
   * Delete record from the database
   */
  await this.delete()

  return this.setResponse(204)
}

/*
 * Returns all API keys for a user with uid
 *
 * @param {uid} string - The uid of the user
 * Note that the uid is the ID, but we user uid when it comes from middleware
 * @returns {keys} array - An array of Apikeys
 */
ApikeyModel.prototype.userApikeys = async function (uid) {
  /*
   * Guard against missing input
   */
  if (!uid) return false

  /*
   * Wrap async code with try ... catch
   */
  let keys
  try {
    /*
     * Attempt to read records from database
     */
    keys = await this.prisma.apikey.findMany({ where: { userId: uid } })
  } catch (err) {
    /*
     * Something went wrong, log a warning and return 404
     */
    log.warn(`Failed to search apikeys for user ${uid}: ${err}`)
    return this.setResponse(404)
  }

  /*
   * Keys are an array, remove secrets with map() and decrypt prior to returning
   */
  const list = []
  for (const key of keys) {
    list.push(await this.asKeyData(key))
  }

  return list
}

/*
 * Takes non-instatiated key data and prepares it so it can be returned
 */
ApikeyModel.prototype.asKeyData = async function (key) {
  delete key.secret
  delete key.aud
  key.name = await this.decrypt(key.name)

  return key
}

/*
 * Creates an Apikey
 *
 * @param {body} object - The request body
 * @param {user} object - The user as loaded by the authentication middleware
 * @returns {ApikeyModel} object - The ApikeyModel
 */
ApikeyModel.prototype.create = async function ({ body, user }) {
  /*
   * Do we have a POST body?
   */
  if (Object.keys(body).length < 1) return this.setResponse(400, 'postBodyMissing')

  /*
   * Is the name set?
   */
  if (!body.name) return this.setResponse(400, 'nameMissing')

  /*
   * Is the level set?
   */
  if (!body.level) return this.setResponse(400, 'levelMissing')

  /*
   * Is level numeric?
   */
  if (typeof body.level !== 'number') return this.setResponse(400, 'levelNotNumeric')

  /*
   * Is level a known/valid level?
   */
  if (!this.config.apikeys.levels.includes(body.level)) return this.setResponse(400, 'invalidLevel')

  /*
   * Is expiresIn set?
   */
  if (!body.expiresIn) return this.setResponse(400, 'expiresInMissing')

  /*
   * Is expiresIn numberic?
   */
  if (typeof body.expiresIn !== 'number') return this.setResponse(400, 'expiresIsNotNumeric')

  /*
   * Is expiresIn above the maximum?
   */
  if (body.expiresIn > this.config.apikeys.maxExpirySeconds)
    return this.setResponse(400, 'expiresIsHigherThanMaximum')

  /*
   * Load authenticated user from the database
   */
  await this.User.loadAuthenticatedUser(user)

  /*
   * Is the user allowed to create a key of this level?
   */
  if (body.level > this.config.roles.levels[this.User.authenticatedUser.role]) {
    return this.setResponse(400, 'keyLevelExceedsRoleLevel')
  }

  /*
   * Generate the apikey secret
   */
  const secret = randomString(32)

  /*
   * Calculate expiry date
   */
  const expiresAt = new Date(Date.now() + body.expiresIn * 1000)

  /*
   * Attempt to create the record in the database
   */
  try {
    this.record = await this.prisma.apikey.create({
      data: this.cloak({
        aud: `${this.config.api}/${this.config.instance}`,
        expiresAt,
        name: body.name,
        level: body.level,
        secret: asJson(hashPassword(secret)),
        userId: user.uid,
      }),
    })
  } catch (err) {
    /*
     * That did not work. Log and error and return 500
     */
    log.warn(err, 'Could not create apikey')
    return this.setResponse(500, 'createApikeyFailed')
  }

  return this.setResponse201({
    apikey: {
      key: this.record.id,
      secret,
      level: this.record.level,
      createdAt: this.record.createdAt,
      expiresAt: this.record.expiresAt,
      name: body.name,
      userId: this.record.userId,
    },
  })
}
