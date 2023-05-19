import { log } from '../utils/log.mjs'
import { hashPassword, randomString, verifyPassword } from '../utils/crypto.mjs'
import { asJson } from '../utils/index.mjs'
import { UserModel } from './user.mjs'

export function ApikeyModel(tools) {
  this.config = tools.config
  this.prisma = tools.prisma
  this.rbac = tools.rbac
  this.User = new UserModel(tools)

  return this
}

ApikeyModel.prototype.setExists = function () {
  this.exists = this.record ? true : false

  return this
}

ApikeyModel.prototype.setResponse = function (status = 200, error = false, data = {}) {
  this.response = {
    status,
    body: {
      result: 'success',
      ...data,
    },
  }
  if (status === 201) this.response.body.result = 'created'
  else if (status > 204) {
    this.response.body.error = error
    this.response.body.result = 'error'
    this.error = true
  } else this.error = false

  return this.setExists()
}

ApikeyModel.prototype.sendResponse = async function (res) {
  return res.status(this.response.status).send(this.response.body)
}

ApikeyModel.prototype.verify = async function (key, secret) {
  await this.unguardedRead({ id: key })
  const verify = await verifyPassword(secret, this.record.secret)
  const [valid] = verify
  this.verified = valid

  return this
}

ApikeyModel.prototype.guardedRead = async function ({ params, user }) {
  if (!this.rbac.readSome(user)) return this.setResponse(403, 'insufficientAccessLevel')
  if (user.iss && user.status < 1) return this.setResponse(403, 'accountStatusLacking')

  await this.unguardedRead({ id: params.id })
  if (!this.record) return this.setResponse(404)

  if (this.record.userId !== user.uid) {
    // Not own key - only admin can do that
    if (!this.rbac.admin(user)) return this.setResponse(403, 'insufficientAccessLevel')
  }

  return this.setResponse(200, 'success', {
    apikey: {
      key: this.record.id,
      level: this.record.level,
      createdAt: this.record.createdAt,
      expiresAt: this.record.expiresAt,
      name: this.record.name,
      userId: this.record.userId,
    },
  })
}

ApikeyModel.prototype.guardedDelete = async function ({ params, user }) {
  if (!this.rbac.user(user)) return this.setResponse(403, 'insufficientAccessLevel')
  if (user.iss && user.status < 1) return this.setResponse(403, 'accountStatusLacking')

  await this.unguardedRead({ id: params.id })
  if (!this.record) return this.setResponse(404)

  if (this.record.userId !== user.uid) {
    // Not own key - only admin can do that
    if (!this.rbac.admin(user)) return this.setResponse(403, 'insufficientAccessLevel')
  }

  await this.unguardedDelete()

  return this.setResponse(204)
}

ApikeyModel.prototype.unguardedRead = async function (where) {
  this.record = await this.prisma.apikey.findUnique({ where })

  return this
}

ApikeyModel.prototype.unguardedDelete = async function () {
  await this.prisma.apikey.delete({ where: { id: this.record.id } })
  this.record = null
  this.clear = null

  return this.setExists()
}

ApikeyModel.prototype.userApikeys = async function (uid) {
  if (!uid) return false
  let keys
  try {
    keys = await this.prisma.apikey.findMany({ where: { userId: uid } })
  } catch (err) {
    log.warn(`Failed to search apikeys for user ${uid}: ${err}`)
  }

  return keys.map((key) => {
    delete key.secret
    return key
  })
}

ApikeyModel.prototype.create = async function ({ body, user }) {
  if (Object.keys(body).length < 1) return this.setResponse(400, 'postBodyMissing')
  if (!body.name) return this.setResponse(400, 'nameMissing')
  if (!body.level) return this.setResponse(400, 'levelMissing')
  if (typeof body.level !== 'number') return this.setResponse(400, 'levelNotNumeric')
  if (!this.config.apikeys.levels.includes(body.level)) return this.setResponse(400, 'invalidLevel')
  if (!body.expiresIn) return this.setResponse(400, 'expiresInMissing')
  if (typeof body.expiresIn !== 'number') return this.setResponse(400, 'expiresIsNotNumeric')
  if (body.expiresIn > this.config.apikeys.maxExpirySeconds)
    return this.setResponse(400, 'expiresIsHigherThanMaximum')

  // Load user making the call
  await this.User.loadAuthenticatedUser(user)
  if (body.level > this.config.roles.levels[this.User.authenticatedUser.role])
    return this.setResponse(400, 'keyLevelExceedsRoleLevel')

  // Generate api secret
  const secret = randomString(32)
  const expiresAt = new Date(Date.now() + body.expiresIn * 1000)

  try {
    this.record = await this.prisma.apikey.create({
      data: {
        expiresAt,
        name: body.name,
        level: body.level,
        secret: asJson(hashPassword(secret)),
        userId: user.uid,
      },
    })
  } catch (err) {
    log.warn(err, 'Could not create apikey')
    return this.setResponse(500, 'createApikeyFailed')
  }

  return this.setResponse(201, 'created', {
    apikey: {
      key: this.record.id,
      secret,
      level: this.record.level,
      createdAt: this.record.createdAt,
      expiresAt: this.record.expiresAt,
      name: this.record.name,
      userId: this.record.userId,
    },
  })
}
