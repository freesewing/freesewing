import jwt from 'jsonwebtoken'
import { log } from '../utils/log.mjs'
import { hash, hashPassword, randomString, verifyPassword } from '../utils/crypto.mjs'
import { setUserAvatar } from '../utils/sanity.mjs'
import { clean, asJson, i18nUrl } from '../utils/index.mjs'
import { ConfirmationModel } from './confirmation.mjs'

export function UserModel(tools) {
  this.config = tools.config
  this.prisma = tools.prisma
  this.decrypt = tools.decrypt
  this.encrypt = tools.encrypt
  this.mfa = tools.mfa
  this.rbac = tools.rbac
  this.mailer = tools.email
  this.Confirmation = new ConfirmationModel(tools)
  this.encryptedFields = ['bio', 'github', 'email', 'initial', 'img', 'mfaSecret']
  this.clear = {} // For holding decrypted data

  return this
}

/*
 * Loads a user from the database based on the where clause you pass it
 *
 * Stores result in this.record
 */
UserModel.prototype.read = async function (where) {
  try {
    this.record = await this.prisma.user.findUnique({ where })
  } catch (err) {
    log.warn({ err, where }, 'Could not read user')
  }

  this.reveal()

  return this.setExists()
}

/*
 * Helper method to decrypt at-rest data
 */
UserModel.prototype.reveal = async function () {
  this.clear = {}
  if (this.record) {
    for (const field of this.encryptedFields) {
      this.clear[field] = this.decrypt(this.record[field])
    }
  }

  return this
}

/*
 * Helper method to encrypt at-rest data
 */
UserModel.prototype.cloak = function (data) {
  for (const field of this.encryptedFields) {
    if (typeof data[field] !== 'undefined') data[field] = this.encrypt(data[field])
  }
  if (typeof data.password === 'string') data.password = asJson(hashPassword(data.password))

  return data
}

/*
 * Loads a user from the database based on the where clause you pass it
 * In addition prepares it for returning the account data
 *
 * Stores result in this.record
 */
UserModel.prototype.guardedRead = async function (where, { user }) {
  if (!this.rbac.readSome(user)) return this.setResponse(403, 'insufficientAccessLevel')
  if (user.iss && user.status < 1) return this.setResponse(403, 'accountStatusLacking')
  await this.read(where)

  return this.setResponse(200, false, {
    result: 'success',
    account: this.asAccount(),
  })
}

/*
 * Finds a user based on one of the accepted unique fields which are:
 *   - lusername (lowercase username)
 *   - ehash
 *   - id
 *
 * Stores result in this.record
 */
UserModel.prototype.find = async function (body) {
  try {
    this.record = await this.prisma.user.findFirst({
      where: {
        OR: [
          { lusername: { equals: clean(body.username) } },
          { ehash: { equals: hash(clean(body.username)) } },
          { id: { equals: parseInt(body.username) || -1 } },
        ],
      },
    })
  } catch (err) {
    log.warn({ err, body }, `Error while trying to find user: ${body.username}`)
  }

  this.reveal()

  return this.setExists()
}

/*
 * Loads the user that is making the API request
 *
 * Stores result in this.authenticatedUser
 */
UserModel.prototype.loadAuthenticatedUser = async function (user) {
  if (!user) return this
  this.authenticatedUser = await this.prisma.user.findUnique({
    where: { id: user.uid },
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
UserModel.prototype.guardedCreate = async function ({ body }) {
  if (Object.keys(body).length < 1) return this.setResponse(400, 'postBodyMissing')
  if (!body.email) return this.setResponse(400, 'emailMissing')
  if (!body.language) return this.setResponse(400, 'languageMissing')
  if (!this.config.languages.includes(body.language))
    return this.setResponse(400, 'unsupportedLanguage')

  const ehash = hash(clean(body.email))
  const check = randomString()
  await this.read({ ehash })

  // Check for unit tests only once
  const isTest = this.isTest(body)

  if (this.exists) {
    /*
     * User already exists. However, if we return an error, then baddies can
     * spam the signup endpoint to figure out who has a FreeSewing account
     * which would be a privacy leak. So instead, pretend there is no user
     * with that account, and that signup is proceeding as normal.
     * Except that rather than a signup email, we send the user an info email.
     *
     * Note that we have to deal with 3 scenarios here:
     *
     *   - Account exists, and is active (aea)
     *   - Account exists, but is inactive (regular signup)
     *   - Account exists, but is disabled (aed)
     */
    // Set type of action based on the account status
    let type = 'signup-aed'
    if (this.record.status === 0) type = 'signup'
    else if (this.record.status === 1) type = 'signup-aea'

    // Create confirmation unless account is disabled
    if (type !== 'signup-aed') {
      this.confirmation = await this.Confirmation.create({
        type,
        data: {
          language: body.language,
          email: this.clear.email,
          id: this.record.id,
          ehash: ehash,
          check,
        },
        userId: this.record.id,
      })
    }
    // Send email unless it's a test and we don't want to send test emails
    if (!isTest || this.config.tests.sendEmail)
      await this.mailer.send({
        template: type,
        language: body.language,
        to: this.clear.email,
        replacements: {
          actionUrl:
            type === 'signup-aed'
              ? false // No actionUrl for disabled accounts
              : i18nUrl(body.language, `/confirm/${type}/${this.Confirmation.record.id}/${check}`),
          whyUrl: i18nUrl(body.language, `/docs/faq/email/why-${type}`),
          supportUrl: i18nUrl(body.language, `/patrons/join`),
        },
      })

    // Now return as if everything is fine
    return this.setResponse(201, false, { email: this.clear.email })
  }

  // New signup
  try {
    this.clear.email = clean(body.email)
    this.clear.initial = this.clear.email
    this.language = body.language
    const email = this.encrypt(this.clear.email)
    const username = clean(randomString()) // Temporary username
    const data = {
      ehash,
      ihash: ehash,
      email,
      initial: email,
      username,
      lusername: username,
      language: body.language,
      mfaEnabled: false,
      mfaSecret: this.encrypt(''),
      password: asJson(hashPassword(randomString())), // We'll change this later
      github: this.encrypt(''),
      bio: this.encrypt(''),
      // Set this one initially as we need the ID to create a custom img via Sanity
      img: this.encrypt(this.config.avatars.user),
    }
    // During tests, users can set their own permission level so you can test admin stuff
    if (isTest && body.role) data.role = body.role
    this.record = await this.prisma.user.create({ data })
  } catch (err) {
    log.warn(err, 'Could not create user record')
    return this.setResponse(500, 'createAccountFailed')
  }

  // Update username
  try {
    await this.unguardedUpdate({
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
    data: {
      language: this.language,
      email: this.clear.email,
      id: this.record.id,
      ehash: ehash,
      check,
    },
    userId: this.record.id,
  })

  // Send signup email
  if (!this.isTest(body) || this.config.tests.sendEmail)
    await this.mailer.send({
      template: 'signup',
      language: this.language,
      to: this.clear.email,
      replacements: {
        actionUrl: i18nUrl(
          this.language,
          `/confirm/signup/${this.Confirmation.record.id}/${check}`
        ),
        whyUrl: i18nUrl(this.language, `/docs/faq/email/why-signup`),
        supportUrl: i18nUrl(this.language, `/patrons/join`),
      },
    })

  return this.isTest(body)
    ? this.setResponse(201, false, {
        email: this.clear.email,
        confirmation: this.confirmation.record.id,
      })
    : this.setResponse(201, false, { email: this.clear.email })
}

/*
 * Sign in based on username + password
 */
UserModel.prototype.passwordSignIn = async function (req) {
  if (Object.keys(req.body).length < 1) return this.setResponse(400, 'postBodyMissing')
  if (!req.body.username) return this.setResponse(400, 'usernameMissing')
  if (!req.body.password) return this.setResponse(400, 'passwordMissing')

  await this.find(req.body)
  if (!this.exists) {
    log.warn(`Sign-in attempt for non-existing user: ${req.body.username} from ${req.ip}`)
    return this.setResponse(401, 'signInFailed')
  }

  // Account found, check password
  const [valid, updatedPasswordField] = verifyPassword(req.body.password, this.record.password)
  if (!valid) {
    log.warn(`Wrong password for existing user: ${req.body.username} from ${req.ip}`)
    return this.setResponse(401, 'signInFailed')
  }

  // Check for MFA
  if (this.record.mfaEnabled) {
    if (!req.body.token) return this.setResponse(403, 'mfaTokenRequired')
    else if (!this.mfa.verify(req.body.token, this.clear.mfaSecret)) {
      return this.setResponse(401, 'signInFailed')
    }
  }

  // Sign in success
  log.info(`Sign-in by user ${this.record.id} (${this.record.username})`)
  if (updatedPasswordField) {
    // Update the password field with a v3 hash
    await this.unguardedUpdate({ password: updatedPasswordField })
  }

  return this.isOk() ? this.signInOk() : this.setResponse(401, 'signInFailed')
}

/*
 * Sign in based on a sign-in link
 */
UserModel.prototype.linkSignIn = async function (req) {
  if (!req.params.id) return this.setResponse(400, 'signInIdMissing')
  if (!req.params.check) return this.setResponse(400, 'signInCheckMissing')

  // Retrieve confirmation record
  await this.Confirmation.read({ id: req.params.id })

  // Verify whether Confirmation exists
  if (!this.Confirmation.exists) {
    log.warn(`Could not find signin confirmation id ${req.params.id}`)
    return this.setResponse(404)
  }

  // Verify whether Confirmation is of the right type
  if (this.Confirmation.record.type !== 'signinlink') {
    log.warn(`Confirmation mismatch; ${req.params.id} is not a signin id`)
    return this.setResponse(404)
  }

  // Verify Confirmation check
  if (this.Confirmation.clear.data.check !== req.params.check) {
    log.warn(`Confirmation mismatch; ${req.params.check} did not match signin confirmation check`)
    return this.setResponse(404)
  }

  // Looks good, load user
  await this.read({ id: this.Confirmation.record.user.id })
  if (this.error) return this

  // Check for MFA
  if (this.record.mfaEnabled) {
    if (!req.body.token) return this.setResponse(403, 'mfaTokenRequired')
    else if (!this.mfa.verify(req.body.token, this.clear.mfaSecret)) {
      return this.setResponse(401, 'signInFailed')
    }
  }

  // Before we return, remove the confirmation so it works only once
  await this.Confirmation.unguardedDelete()

  // Sign in success
  log.info(`Sign-in by user ${this.record.id} (${this.record.username}) (via signin link)`)

  return this.isOk() ? this.signInOk() : this.setResponse(401, 'signInFailed')
}

/*
 * Send a magic link for user sign in
 */
UserModel.prototype.sendSigninlink = async function (req) {
  if (Object.keys(req.body).length < 1) return this.setResponse(400, 'postBodyMissing')
  if (!req.body.username) return this.setResponse(400, 'usernameMissing')

  await this.find(req.body)
  if (!this.exists) {
    log.warn(`Magic link attempt for non-existing user: ${req.body.username} from ${req.ip}`)
    return this.setResponse(401, 'signInFailed')
  }

  // Account found, create confirmation
  const check = randomString()
  this.confirmation = await this.Confirmation.create({
    type: 'signinlink',
    data: {
      language: this.record.language,
      check,
    },
    userId: this.record.id,
  })
  const isTest = this.isTest(req.body)
  if (!isTest) {
    // Send sign-in link email
    await this.mailer.send({
      template: 'signinlink',
      language: this.record.language,
      to: this.clear.email,
      replacements: {
        actionUrl: i18nUrl(
          this.record.language,
          `/confirm/signin/${this.Confirmation.record.id}/${check}`
        ),
        whyUrl: i18nUrl(this.record.language, `/docs/faq/email/why-signin-link`),
        supportUrl: i18nUrl(this.record.language, `/patrons/join`),
      },
    })
  }

  return this.setResponse(200, 'emailSent')
}

/*
 * Confirms a user account
 */
UserModel.prototype.confirm = async function ({ body, params }) {
  if (!params.id) return this.setResponse(404)
  if (Object.keys(body).length < 1) return this.setResponse(400, 'postBodyMissing')
  if (!body.consent || typeof body.consent !== 'number' || body.consent < 1)
    return this.setResponse(400, 'consentRequired')

  // Retrieve confirmation record
  await this.Confirmation.read({ id: params.id })

  if (!this.Confirmation.exists) {
    log.warn(`Could not find confirmation id ${params.id}`)
    return this.setResponse(404)
  }

  if (this.Confirmation.record.type !== 'signup') {
    log.warn(`Confirmation mismatch; ${params.id} is not a signup id`)
    return this.setResponse(404)
  }

  if (this.error) return this
  const data = this.Confirmation.clear.data
  if (data.ehash !== this.Confirmation.record.user.ehash) return this.setResponse(404)
  if (data.id !== this.Confirmation.record.user.id) return this.setResponse(404)

  // Load user
  await this.read({ id: this.Confirmation.record.user.id })
  if (this.error) return this

  // Update user status, consent, and last sign in
  await this.unguardedUpdate({
    status: 1,
    consent: body.consent,
    lastSignIn: new Date(),
  })
  if (this.error) return this

  // Before we return, remove the confirmation so it works only once
  await this.Confirmation.unguardedDelete()

  // Account is now active, let's return a passwordless sign in
  return this.signInOk()
}

/*
 * Updates the user data - Used when we create the data ourselves
 * so we know it's safe
 */
UserModel.prototype.unguardedUpdate = async function (data) {
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
  await this.reveal()

  return this.setResponse(200)
}

/*
 * Updates the user data - Used when we pass through user-provided data
 * so we can't be certain it's safe
 */
UserModel.prototype.guardedUpdate = async function ({ body, user }) {
  if (!this.rbac.writeSome(user)) return this.setResponse(403, 'insufficientAccessLevel')
  if (user.iss && user.status < 1) return this.setResponse(403, 'accountStatusLacking')
  const data = {}
  // Bio
  if (typeof body.bio === 'string') data.bio = body.bio
  // Compare
  if ([true, false].includes(body.compare)) data.compare = body.compare
  // Consent
  if ([0, 1, 2, 3].includes(body.consent)) data.consent = body.consent
  // Control
  if ([1, 2, 3, 4, 5].includes(body.control)) data.control = body.control
  // Github
  if (typeof body.github === 'string') data.github = body.github.split('@').pop()
  // Imperial
  if ([true, false].includes(body.imperial)) data.imperial = body.imperial
  // Language
  if (this.config.languages.includes(body.language)) data.language = body.language
  // Newsletter
  if ([true, false].includes(body.newsletter)) data.newsletter = body.newsletter
  // Password
  if (typeof body.password === 'string') data.password = body.password // Will be cloaked below
  // Username
  if (typeof body.username === 'string') {
    const available = await this.isLusernameAvailable(body.username)
    if (available) {
      data.username = body.username.trim()
      data.lusername = clean(body.username)
    } else {
      log.info(`Rejected user name change from ${data.username} to ${body.username.trim()}`)
    }
  }
  // Image (img)
  if (typeof body.img === 'string') {
    const img = await setUserAvatar(this.record.id, body.img)
    data.img = img.url
  }

  // Now update the record
  await this.unguardedUpdate(this.cloak(data))

  const isTest = this.isTest(body)
  if (typeof body.email === 'string' && this.clear.email !== clean(body.email)) {
    // Email change (requires confirmation)
    const check = randomString()
    this.confirmation = await this.Confirmation.create({
      type: 'emailchange',
      data: {
        language: this.record.language,
        check,
        email: {
          current: this.clear.email,
          new: body.email,
        },
      },
      userId: this.record.id,
    })
    if (!isTest || this.config.tests.sendEmail) {
      // Send confirmation email
      await this.mailer.send({
        template: 'emailchange',
        language: this.record.language,
        to: body.email,
        cc: this.clear.email,
        replacements: {
          actionUrl: i18nUrl(
            this.record.language,
            `/confirm/emailchange/${this.Confirmation.record.id}/${check}`
          ),
          whyUrl: i18nUrl(this.record.language, `/docs/faq/email/why-emailchange`),
          supportUrl: i18nUrl(this.record.language, `/patrons/join`),
        },
      })
    }
  } else if (
    typeof body.confirmation === 'string' &&
    body.confirm === 'emailchange' &&
    typeof body.check === 'string'
  ) {
    // Handle email change confirmation
    await this.Confirmation.read({ id: body.confirmation })

    if (!this.Confirmation.exists) {
      log.warn(`Could not find confirmation id ${body.confirmation}`)
      return this.setResponse(404)
    }

    if (this.Confirmation.record.type !== 'emailchange') {
      log.warn(`Confirmation mismatch; ${body.confirmation} is not an emailchange id`)
      return this.setResponse(404)
    }

    const data = this.Confirmation.clear.data
    if (
      data.check === body.check &&
      data.email.current === this.clear.email &&
      typeof data.email.new === 'string'
    ) {
      await this.unguardedUpdate({
        email: this.encrypt(data.email.new),
        ehash: hash(clean(data.email.new)),
      })
    }
  }

  const returnData = {
    result: 'success',
    account: this.asAccount(),
  }
  if (isTest && this.Confirmation.record?.id) returnData.confirmation = this.Confirmation.record.id

  return this.setResponse(200, false, returnData)
}

/*
 * Enables/Disables MFA on the account - Used when we pass through
 * user-provided data so we can't be certain it's safe
 */
UserModel.prototype.guardedMfaUpdate = async function ({ body, user, ip }) {
  if (!this.rbac.user(user)) return this.setResponse(403, 'insufficientAccessLevel')
  if (user.iss && user.status < 1) return this.setResponse(403, 'accountStatusLacking')
  if (body.mfa === true && this.record.mfaEnabled === true)
    return this.setResponse(400, 'mfaActive')

  // Disable
  if (body.mfa === false) {
    if (!body.token) return this.setResponse(400, 'mfaTokenMissing')
    if (!body.password) return this.setResponse(400, 'passwordMissing')
    // Check password
    const [valid] = verifyPassword(body.password, this.record.password)
    if (!valid) {
      log.warn(`Wrong password for existing user while disabling MFA: ${user.uid} from ${ip}`)
      return this.setResponse(401, 'authenticationFailed')
    }
    // Check MFA token
    if (this.mfa.verify(body.token, this.clear.mfaSecret)) {
      // Looks good. Disable MFA
      try {
        await this.unguardedUpdate({ mfaEnabled: false })
      } catch (err) {
        log.warn(err, 'Could not disable MFA after token check')
        return this.setResponse(500, 'mfaDeactivationFailed')
      }
      return this.setResponse(200, false, {
        result: 'success',
        account: this.asAccount(),
      })
    } else {
      return this.setResponse(401, 'authenticationFailed')
    }
  }
  // Confirm
  else if (body.mfa === true && body.token && body.secret) {
    if (body.secret === this.clear.mfaSecret && this.mfa.verify(body.token, this.clear.mfaSecret)) {
      // Looks good. Enable MFA
      try {
        await this.unguardedUpdate({
          mfaEnabled: true,
        })
      } catch (err) {
        log.warn(err, 'Could not enable MFA after token check')
        return this.setResponse(500, 'mfaActivationFailed')
      }
      return this.setResponse(200, false, {
        result: 'success',
        account: this.asAccount(),
      })
    } else return this.setResponse(403, 'mfaTokenInvalid')
  }
  // Enroll
  else if (body.mfa === true && this.record.mfaEnabled === false) {
    let mfa
    try {
      mfa = await this.mfa.enroll(this.record.username)
    } catch (err) {
      log.warn(err, 'Failed to enroll MFA')
    }

    // Update mfaSecret
    try {
      await this.unguardedUpdate({
        mfaSecret: this.encrypt(mfa.secret),
      })
    } catch (err) {
      log.warn(err, 'Could not update username after user creation')
      return this.setResponse(500, 'usernameUpdateAfterUserCreationFailed')
    }

    return this.setResponse(200, false, { mfa })
  }

  return this.setResponse(400, 'invalidMfaSetting')
}

/*
 * Returns account data
 */
UserModel.prototype.asAccount = function () {
  return {
    id: this.record.id,
    bio: this.clear.bio,
    compare: this.record.compare,
    consent: this.record.consent,
    control: this.record.control,
    createdAt: this.record.createdAt,
    email: this.clear.email,
    github: this.clear.github,
    img: this.clear.img,
    imperial: this.record.imperial,
    initial: this.clear.initial,
    language: this.record.language,
    lastSignIn: this.record.lastSignIn,
    mfaEnabled: this.record.mfaEnabled,
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
  if (status === 404) this.response.body = null

  return this.setExists()
}

/*
 * Helper method to send response
 */
UserModel.prototype.sendResponse = async function (res) {
  return res.status(this.response.status).send(this.response.body)
}

/*
 * Update method to determine whether this request is
 * part of a (unit) test
 */
UserModel.prototype.isTest = function (body) {
  // Disalowing tests in prodution is hard-coded to protect people from
  if (this.config.env === 'production' && !this.config.tests.production) return false
  if (!body.test) return false
  if (this.clear?.email && !this.clear.email.split('@').pop() === this.config.tests.domain)
    return false
  if (body.email && !body.email.split('@').pop() === this.config.tests.domain) return false

  return true
}

/*
 * Helper method to check an account is ok
 */
UserModel.prototype.isOk = function () {
  if (
    this.exists &&
    this.record &&
    this.record.status > 0 &&
    this.record.consent > 0 &&
    this.record.role &&
    this.record.role !== 'blocked'
  )
    return true

  return false
}

/*
 * Helper method to return from successful sign in
 */
UserModel.prototype.signInOk = function () {
  return this.setResponse(200, false, {
    result: 'success',
    token: this.getToken(),
    account: this.asAccount(),
  })
}

/*
 * Check to see if a (lowercase) username is available
 * as well as making sure username is not something we
 * do not allow
 */
UserModel.prototype.isLusernameAvailable = async function (lusername) {
  if (lusername.length < 2) return false
  let user
  try {
    user = await this.prisma.user.findUnique({ where: { lusername } })
  } catch (err) {
    log.warn({ err, lusername }, 'Could not search for free username')
    return false
  }
  if (user) return false

  return true
}
