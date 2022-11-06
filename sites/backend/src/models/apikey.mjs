import { log } from '../utils/log.mjs'
import { hash, hashPassword, randomString, verifyPassword } from '../utils/crypto.mjs'
import { clean, asJson } from '../utils/index.mjs'
import { UserModel } from './user.mjs'

export function ApikeyModel(tools) {
  this.config = tools.config
  this.prisma = tools.prisma
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
  else if (status > 201) {
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
  await this.read({ id: key })
  const [valid] = await verifyPassword(secret, this.record.secret)
  this.verified = valid

  return this
}

ApikeyModel.prototype.readIfAllowed = async function (where, user) {
  if (!this.User.authenticatedUser) await this.User.loadAuthenticatedUser(user)
  await this.read(where)
  if (!this.record) return this.setResponse(404, 'apikeyNotFound')
  if (this.record.userId !== this.User.authenticatedUser.id) {
    // Not own key - only admin can do that
    if (this.User.authenticatedUser.role !== 'admin') {
      return this.setResponse(400, 'permissionLackingToLoadOtherApiKey')
    }
  }

  return this.setResponse(200, 'success', {
    apikey: {
      key: this.record.id,
      level: this.record.level,
      expiresAt: this.record.expiresAt,
      name: this.record.name,
      userId: this.record.userId,
    },
  })
}

ApikeyModel.prototype.removeIfAllowed = async function (where, user) {
  if (!this.User.authenticatedUser) await this.User.loadAuthenticatedUser(user)
  await this.read(where)
  if (!this.record) return this.setResponse(404, 'apikeyNotFound')
  if (this.record.userId !== this.User.authenticatedUser.id) {
    // Not own key - only admin can do that
    if (this.User.authenticatedUser.role !== 'admin') {
      return this.setResponse(400, 'permissionLackingToRemoveOtherApiKey')
    }
  }
  await this.remove(where)

  return this.setResponse(204)
}

ApikeyModel.prototype.read = async function (where) {
  this.record = await this.prisma.apikey.findUnique({ where })

  return this
}

ApikeyModel.prototype.remove = async function (where) {
  await this.prisma.apikey.delete({ where })
  this.record = false

  return this
}

ApikeyModel.prototype.create = async function ({ body, user }) {
  if (Object.keys(body) < 1) return this.setResponse(400, 'postBodyMissing')
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
        userId: user._id || user.userId,
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
      expiresAt: this.record.expiresAt,
      name: this.record.name,
      userId: this.record.userId,
    },
  })
}

ApikeyModel.prototype.___read = async function ({ user, params }) {
  // Load user making the call
  await this.User.loadAuthenticatedUser(user)

  const key = this.User.authenticatedUser.apikeys.filter((key) => key.id === params.id)

  return key.length === 1
    ? this.setResponse(200, 'success', {
        apikey: {
          key: key[0].id,
          level: key[0].level,
          expiresAt: key[0].expiresAt,
          name: key[0].name,
          userId: key[0].userId,
        },
      })
    : this.setResponse(404, 'notFound')
}
