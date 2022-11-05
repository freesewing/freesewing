import jwt from 'jsonwebtoken'
import { log } from '../utils/log.mjs'
import { hash, hashPassword, randomString, verifyPassword } from '../utils/crypto.mjs'
import { clean, asJson, i18nUrl } from '../utils/index.mjs'
import { ConfirmationModel } from './confirmation.mjs'

export function UserModel(tools) {
  this.config = tools.config
  this.prisma = tools.prisma
  this.decrypt = tools.decrypt
  this.encrypt = tools.encrypt
  this.mailer = tools.email
  this.Confirmation = new ConfirmationModel(tools)

  return this
}

/*
 * Loads a user from the database based on the where clause you pass it
 *
 * Stores result in this.record
 */
UserModel.prototype.read = async function (where) {
  this.record = await this.prisma.user.findUnique({ where })
  if (this.record?.email) this.email = this.decrypt(this.record.email)
  if (this.record?.initial) this.initial = this.decrypt(this.record.initial)

  return this.setExists()
}

/*
 * Loads the user that is making the API request
 *
 * Stores result in this.authenticatedUser
 */
UserModel.prototype.loadAuthenticatedUser = async function (user) {
  if (!user) return this
  const where = user?.apikey ? { id: user.userId } : { id: user._id }
  this.authenticatedUser = await this.prisma.user.findUnique({
    where,
    include: {
      apikeys: true,
    },
  })

  return this
}

/*
 * Checks this.record and sets a boolean to indicate whether
 * the user exists or not
 *
 * Stores result in this.exists
 */
UserModel.prototype.setExists = function () {
  this.exists = this.record ? true : false

  return this
}

/*
 * Creates a user+confirmation and sends out signup email
 */
UserModel.prototype.create = async function ({ body }) {
  if (Object.keys(body) < 1) return this.setResponse(400, 'postBodyMissing')
  if (!body.email) return this.setResponse(400, 'emailMissing')
  if (!body.password) return this.setResponse(400, 'passwordMissing')
  if (!body.language) return this.setResponse(400, 'languageMissing')

  const ehash = hash(clean(body.email))
  await this.read({ ehash })
  if (this.exists) return this.setResponse(400, 'emailExists')

  try {
    this.email = clean(body.email)
    this.language = body.language
    const email = this.encrypt(this.email)
    const username = clean(randomString()) // Temporary username
    this.record = await this.prisma.user.create({
      data: {
        ehash,
        ihash: ehash,
        email,
        initial: email,
        username,
        lusername: username,
        data: asJson({ settings: { language: this.language } }),
        password: asJson(hashPassword(body.password)),
      },
    })
  } catch (err) {
    log.warn(err, 'Could not create user record')
    return this.setResponse(500, 'createAccountFailed')
  }

  // Update username
  try {
    await this.update({
      username: `user-${this.record.id}`,
      lusername: `user-${this.record.id}`,
    })
  } catch (err) {
    log.warn(err, 'Could not update username after user creation')
    return this.setResponse(500, 'usernameUpdateAfterUserCreationFailed')
  }

  // Create confirmation
  this.confirmation = await this.Confirmation.create({
    type: 'signup',
    data: this.encrypt({
      language: this.language,
      email: this.email,
      id: this.record.id,
      ehash: ehash,
    }),
    userId: this.record.id,
  })

  // Send signup email
  await this.mailer.send({
    template: 'signup',
    language: this.language,
    to: 'joost@decock.org', // this.email,
    replacements: {
      actionUrl: i18nUrl(this.language, `/confirm/signup/${this.Confirmation.record.id}`),
      whyUrl: i18nUrl(this.language, `/docs/faq/email/why-signup`),
      supportUrl: i18nUrl(this.language, `/patrons/join`),
    },
  })

  return body.unittest && this.email.split('@').pop() === this.config.tests.domain
    ? this.setResponse(201, false, { email: this.email, confirmation: this.confirmation.record.id })
    : this.setResponse(201, false, { email: this.email })
}

/*
 * Confirms a user account
 */
UserModel.prototype.confirm = async function ({ body, params }) {
  if (!params.id) return this.setReponse(404, 'missingConfirmationId')
  if (Object.keys(body) < 1) return this.setResponse(400, 'postBodyMissing')
  if (!body.consent || typeof body.consent !== 'number' || body.consent < 1)
    return this.setResponse(400, 'consentRequired')

  // Retrieve confirmation record
  await this.Confirmation.read({ id: params.id })

  if (!this.Confirmation.exists) {
    log.warn(err, `Could not find confirmation id ${params.id}`)
    return this.setResponse(404, 'failedToFindConfirmationId')
  }

  if (this.Confirmation.record.type !== 'signup') {
    log.warn(err, `Confirmation mismatch; ${params.id} is not a signup id`)
    return this.setResponse(404, 'confirmationIdTypeMismatch')
  }

  if (this.error) return this
  const data = await this.decrypt(this.Confirmation.record.data)
  if (data.ehash !== this.Confirmation.record.user.ehash)
    return this.setResponse(404, 'confirmationEhashMismatch')
  if (data.id !== this.Confirmation.record.user.id)
    return this.setResponse(404, 'confirmationUserIdMismatch')

  // Load user
  await this.read({ id: this.Confirmation.record.user.id })
  if (this.error) return this

  // Update user status, consent, and last login
  await this.update({
    //data: this.encrypt({...this.decrypt(this.record.data), status: 1}),
    consent: body.consent,
    lastLogin: new Date(),
  })
  if (this.error) return this

  // Account is now active, let's return a passwordless login
  return this.setResponse(200, false, {
    result: 'success',
    token: this.getToken(),
    account: this.asAccount(),
  })
}

/*
 * Updates the user data
 */
UserModel.prototype.update = async function (data) {
  try {
    this.record = await this.prisma.user.update({
      where: { id: this.record.id },
      data,
    })
  } catch (err) {
    log.warn(err, 'Could not update user record')
    process.exit()
    return this.setResponse(500, 'updateUserFailed')
  }

  return this.setResponse(200)
}

/*
 * Returns account data
 */
UserModel.prototype.asAccount = function () {
  return {
    id: this.record.id,
    consent: this.record.consent,
    createdAt: this.record.createdAt,
    data: this.record.data,
    email: this.email,
    initial: this.initial,
    lastLogin: this.record.lastLogin,
    newsletter: this.record.newsletter,
    patron: this.record.patron,
    role: this.record.role,
    status: this.record.status,
    updatedAt: this.record.updatedAt,
    username: this.record.username,
    lusername: this.record.lusername,
  }
}

/*
 * Returns a JSON Web Token (jwt)
 */
UserModel.prototype.getToken = function () {
  return jwt.sign(
    {
      _id: this.record.id,
      username: this.record.username,
      role: this.record.role,
      status: this.record.status,
      aud: this.config.jwt.audience,
      iss: this.config.jwt.issuer,
    },
    this.config.jwt.secretOrKey,
    { expiresIn: this.config.jwt.expiresIn }
  )
}

/*
 * Helper method to set the response code, result, and body
 *
 * Will be used by this.sendResponse()
 */
UserModel.prototype.setResponse = function (status = 200, error = false, data = {}) {
  this.response = {
    status,
    body: {
      result: 'success',
      ...data,
    },
  }
  if (status > 201) {
    this.response.body.error = error
    this.response.body.result = 'error'
    this.error = true
  } else this.error = false

  return this.setExists()
}

/*
 * Helper method to send response
 */
UserModel.prototype.sendResponse = async function (res) {
  return res.status(this.response.status).send(this.response.body)
}
