import jwt from 'jsonwebtoken'
import { log } from '../utils/log.mjs'
import { hash, hashPassword, randomString, verifyPassword } from '../utils/crypto.mjs'
import { replaceImage, importImage, removeImage } from '../utils/cloudflare-images.mjs'
import { clean, asJson, i18nUrl, writeExportedData } from '../utils/index.mjs'
import { decorateModel } from '../utils/model-decorator.mjs'
import { userCard } from '../templates/svg/user-card.mjs'
import { oauth } from '../utils/oauth.mjs'

/*
 * This model handles all user updates
 */
export function UserModel(tools) {
  return decorateModel(this, tools, {
    name: 'user',
    encryptedFields: ['bio', 'data', 'email', 'initial', 'img', 'mfaSecret'],
    jsonFields: ['data'],
    models: ['confirmation', 'set', 'pattern'],
  })
}

/*
 * Start Oauth flow, supported providers are google and github
 *
 * To initialize the Oauth flow, all we need is to generate a secret
 * and let the client know what URL to connect to to trigger the authentication.
 * For the secret, we'll just use the UUID of the confirmation.
 *
 * @param {body} object - The request body
 * @returns {UserModel} object - The UserModel
 */
UserModel.prototype.oauthInit = async function ({ body }) {
  /*
   * Is the provider set and a known Oauth provider?
   */
  if (
    typeof body.provider === 'undefined' ||
    !Object.keys(this.config.oauth).includes(body.provider.toLowerCase())
  )
    return this.setResponse(403, 'invalidProvider')

  /*
   * Is the language set and a known langauge?
   */
  if (
    typeof body.language === 'undefined' ||
    !this.config.languages.includes(body.language.toLowerCase())
  )
    return this.setResponse(403, 'invalidLanguage')

  const provider = body.provider.toLowerCase()
  const language = body.language.toLowerCase()

  /*
   * Create confirmation
   */
  await this.Confirmation.createRecord({
    type: 'oauth-init',
    data: { provider, language },
  })

  /*
   * Return the confirmation ID as Oauth state, along with the
   * authentication URL the client should use.
   */
  return this.setResponse200({
    authUrl: this.config.oauth[provider].url(this.Confirmation.record.id, language),
  })
}

/*
 * Sign In via Oauth, supported providers are google and github
 *
 * This could be an existing user (Sign In) or a new user (Sign Up)
 * so we need to deal with both cases.
 *
 * @param {body} object - The request body
 * @returns {UserModel} object - The UserModel
 */
UserModel.prototype.oauthSignIn = async function ({ body }) {
  /*
   * Is the provider set and a known Oauth provider?
   */
  if (
    typeof body.provider === 'undefined' ||
    !Object.keys(this.config.oauth).includes(body.provider.toLowerCase())
  )
    return this.setResponse(403, 'invalidProvider')

  /*
   * Is state set?
   */
  if (typeof body.state !== 'string') return this.setResponse(403, 'stateInvalid')

  /*
   * Is code set?
   */
  if (typeof body.code !== 'string') return this.setResponse(403, 'codeInvalid')

  /*
   * Attempt to retrieve the confirmation record, its ID is the state value
   */
  await this.Confirmation.read({ id: body.state })

  /*
   * Get token in exchange for Oauth code
   */
  const provider = body.provider.toLowerCase()
  const token = await oauth[provider].getToken(body.code)

  /*
   * Load user data from API
   */
  const oauthData = await oauth[provider].loadUser(token)

  /*
   * Does the user exist?
   */
  await this.read({ ehash: hash(clean(oauthData.email)) })
  if (this.exists) {
    /*
     * Final check for account status and other things before returning
     */
    const [ok, err, status] = this.isOk()
    if (ok === true) return this.signInOk()
    else return this.setResponse(status, err)
  }

  /*
   * This is a new user, so essentially a sign-up.
   * We need to handle this the same way, expect without the need to confirm email
   *
   * Let's start by making sure the username we use is available
   */
  let lusername = clean(oauthData.username)
  let available = await this.isLusernameAvailable(lusername)
  while (!available) {
    lusername += '+'
    available = await this.isLusernameAvailable(lusername)
  }

  /*
   * Create all data to create the record
   */
  const email = clean(oauthData.email)
  const ihash = hash(email)
  const extraData = {}
  if (provider === 'github') {
    extraData.githubEmail = oauthData.email
    extraData.githubUsername = oauthData.username
  }
  if (oauthData.website) extraData.website = oauthData.website
  if (oauthData.twitter) extraData.twitter = oauthData.twitter
  const data = {
    ehash: ihash,
    ihash,
    email: this.encrypt(email),
    initial: this.encrypt(email),
    username: lusername,
    lusername: lusername,
    language: this.Confirmation.clear.data.language,
    mfaEnabled: false,
    mfaSecret: '',
    password: asJson(hashPassword(randomString())),
    data: this.encrypt(extraData),
    bio: this.encrypt(oauthData.bio || '--'),
  }

  /*
   * Next, if there is an image (url) let's handle that first
   */
  if (oauthData.img) {
    try {
      const img = await replaceImage({
        id: `user-${ihash}`,
        metadata: { ihash },
        url: oauthData.img,
      })
      if (img) data.img = this.encrypt(img)
      else data.img = this.encrypt(this.config.avatars.user)
    } catch (err) {
      log.info(err, `Unable to update image post-oauth signup for user ${email}`)
      return this.setResponse(500, 'createAccountFailed')
    }
  } else data.img = this.encrypt(this.config.avatars.user)

  /*
   * Now attempt to create the record in the database
   */
  try {
    this.record = await this.prisma.user.create({ data })
  } catch (err) {
    /*
     * Could not create record. Log warning and return 500
     */
    log.warn(err, 'Could not create user record')
    return this.setResponse(500, 'createAccountFailed')
  }

  /*
   * Consent won't be ok yet, but we must handle that in the frontend
   */
  return this.signInOk()
}

/*
 * Loads a user from the database based on the where clause you pass it
 * In addition prepares it for returning the account data
 * This is guarded so it enforces access control and validates input
 * This is an anonymous route returning limited info (profile data)
 *
 * @param {params} object - The request (URL) parameters
 * @returns {UserModel} object - The UserModel
 */
UserModel.prototype.profile = async function ({ params }) {
  /*
   * Is id set?
   */
  if (typeof params.id === 'undefined') return this.setResponse(403, 'idMissing')

  /*
   * Try to find the record in the database
   * Note that find checks lusername, ehash, and id but we
   * pass it in the username value as that's what the login
   * rout does
   */
  await this.find({ username: params.id })

  /*
   * If it does not exist, return 404
   */
  if (!this.exists) return this.setResponse(404)

  return this.setResponse200({
    result: 'success',
    profile: this.asProfile(),
  })
}

/*
 * Returns an SVG user card
 * This is an anonymous route returning limited info (profile data)
 *
 * @param {params} object - The request (URL) parameters
 * @returns {UserModel} object - The UserModel
 */
UserModel.prototype.profileCard = async function ({ params }) {
  /*
   * Is id set?
   */
  if (typeof params.id === 'undefined') return this.setResponse(403, 'idMissing')

  /*
   * Try to find the record in the database
   * Note that find checks lusername, ehash, and id but we
   * pass it in the username value as that's what the login
   * rout does
   */
  await this.find({ username: params.id })

  /*
   * If it does not exist, return 404
   */
  if (!this.exists) return this.setResponse(404)

  return this.setResponse200(userCard(this.record.username, this.record.id), true)
}

/*
 * Loads a user from the database based on the where clause you pass it
 * In addition prepares it for returning all account data
 * This is guarded so it enforces access control and validates input
 *
 * @param {params} object - The request (URL) parameters
 * @returns {UserModel} object - The UserModel
 */
UserModel.prototype.allData = async function ({ params }) {
  /*
   * Is id set?
   */
  if (typeof params.id === 'undefined') return this.setResponse(403, 'idMissing')

  /*
   * Try to find the record in the database
   * Note that find checks lusername, ehash, and id but we
   * pass it in the username value as that's what the login
   * route does
   */
  await this.read(
    { id: Number(params.id) },
    { apikeys: true, bookmarks: true, patterns: true, sets: true }
  )

  /*
   * If it does not exist, return 404
   */
  if (!this.exists) return this.setResponse(404)

  return this.setResponse200({
    result: 'success',
    data: this.asData(),
  })
}

/*
 * Exports all account data
 *
 * @param {user} object - The user as loaded by the authentication middleware
 * @returns {UserModel} object - The UserModel
 */
UserModel.prototype.exportAccount = async function ({ user }) {
  /*
   * Read the record from the database
   */
  await this.read({ id: user.uid }, { apikeys: true, bookmarks: true, patterns: true, sets: true })

  /*
   * If it does not exist, return 404
   */
  if (!this.exists) return this.setResponse(404)

  return this.setResponse200({
    result: 'success',
    data: writeExportedData(this.asExport()),
  })
}

/*
 * Restricts processing of account data
 *
 * @param {user} object - The user as loaded by the authentication middleware
 * @returns {UserModel} object - The UserModel
 */
UserModel.prototype.restrictAccount = async function ({ user }) {
  /*
   * Read the record from the database
   */
  await this.read({ id: user.uid }, { apikeys: true, bookmarks: true, patterns: true, sets: true })

  /*
   * If it does not exist, return 404
   */
  if (!this.exists) return this.setResponse(404)

  /*
   * Update status to block the account
   */
  await this.update({ status: -1 })

  return this.setResponse200({
    result: 'success',
    data: {},
  })
}

/*
 * Remove account
 *
 * @param {user} object - The user as loaded by the authentication middleware
 * @returns {UserModel} object - The UserModel
 */
UserModel.prototype.removeAccount = async function ({ user }) {
  /*
   * Read the record from the database
   */
  await this.read({ id: user.uid }, { apikeys: true, bookmarks: true, patterns: true, sets: true })

  /*
   * If it does not exist, return 404
   */
  if (!this.exists) return this.setResponse(404)

  /*
   * Remove user image
   */
  await removeImage(`user-${this.record.ihash}`)

  /*
   * Remove account
   */
  try {
    await this.prisma.pattern.deleteMany({ where: { userId: user.uid } })
    await this.prisma.set.deleteMany({ where: { userId: user.uid } })
    await this.prisma.bookmark.deleteMany({ where: { userId: user.uid } })
    await this.prisma.apikey.deleteMany({ where: { userId: user.uid } })
    await this.prisma.confirmation.deleteMany({ where: { userId: user.uid } })
    await this.delete()
  } catch (err) {
    log.warn(err, 'Error while removing account')
  }

  return this.setResponse200({
    result: 'success',
    data: {},
  })
}

/*
 * This is a less strict version of guardedRead that will not err with 401
 * when the authentication is valid, but consent has not been granted.
 * This is required for the Oauth flow where people signup and are in this
 * state where they are authenticated by have not provided consent yet.
 *
 * So in that case, this will return a limited set of data to allow the frontend
 * to present/update the consent choices.
 *
 * @param {where} object - The where clasuse for the Prisma query
 * @param {user} object - The user as provided by middleware
 * @returns {UserModel} object - The UserModel
 */
UserModel.prototype.whoami = async function (where, { user }) {
  /*
   * Check middleware for guest-specific errors
   */
  if (user.guestError) {
    let status = 401
    if (user.guestError === 'consentLacking') status = 451
    if (user.guestError === 'statusLacking') status = 403
    return this.setResponse(status, { error: user.guestError })
  }

  /*
   * Enforce RBAC
   */
  if (!this.rbac.readSome(user)) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * Read record from database
   */
  await this.read(where)

  return this.setResponse200({
    result: 'success',
    account: this.asAccount(),
  })
}

/*
 * Loads a user from the database based on the where clause you pass it
 * In addition prepares it for returning the account data
 * This is guarded so it enforces access control and validates input
 *
 * @param {where} object - The where clasuse for the Prisma query
 * @returns {UserModel} object - The UserModel
 */
UserModel.prototype.guardedRead = async function (where, { user }) {
  /*
   * Enforce RBAC
   */
  if (!this.rbac.readSome(user)) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * Read record from database
   */
  await this.read(where)

  return this.setResponse200({
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
 * @param {body} object - The request body
 * @returns {UserModel} object - The UserModel
 */
UserModel.prototype.find = async function (body) {
  /*
   * Attempt to load record (one) from the database
   */
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
    /*
     * Failed to run database query. Log warning and return 404
     */
    log.warn({ err, body }, `Error while trying to find user: ${body.username}`)
    return this.setResponse(404)
  }

  /*
   * Decrypt data that is encrypted at rest
   */
  await this.reveal()

  return this.recordExists()
}

/*
 * Searches for users - Admin route
 *
 * @param {body} object - The request body
 * @returns {UserModel} object - The UserModel
 */
UserModel.prototype.search = async function (q) {
  /*
   * Find users based on lusername
   */
  let usernames, emails
  try {
    usernames = await this.asAccountList(
      await this.prisma.user.findMany({
        where: {
          lusername: { contains: clean(q) },
        },
      })
    )
  } catch (err) {
    usernames = []
  }
  /*
   * Find users based on ehash/ihash
   */
  try {
    const ehash = hash(clean(q))
    emails = await this.asAccountList(
      await this.prisma.user.findMany({
        where: {
          OR: [{ ehash: { equals: ehash } }, { ihash: { equals: ehash } }],
        },
      })
    )
  } catch (err) {
    emails = []
  }

  return {
    email: emails,
    username: usernames,
  }
}

/*
 * Loads the user that is making the API request
 *
 * @param {user} object - The user as loaded by the authentication middleware
 * @returns {UserModel} object - The UserModel
 */
UserModel.prototype.loadAuthenticatedUser = async function (user) {
  /*
   * Guard against missing input
   */
  if (!user) return this

  /*
   * Now attempt to load the full user record from the database
   */
  try {
    this.authenticatedUser = await this.prisma.user.findUnique({
      where: { id: user.uid },
      include: {
        apikeys: true,
      },
    })
  } catch (err) {
    /*
     * Failed to run database query. Log warning and return 404
     */
    log.warn({ err, user }, `Error while trying to find user: ${user.uid}`)
    return this.setResponse(404)
  }

  return this
}

/*
 * Loads & reveals the user that is making the API request
 *
 * @param {user} object - The user as loaded by the authentication middleware
 * @returns {UserModel} object - The UserModel
 */
UserModel.prototype.revealAuthenticatedUser = async function (user) {
  /*
   * Guard against missing input
   */
  if (!user) return this

  /*
   * Now attempt to load the full user record from the database
   */
  try {
    this.record = await this.prisma.user.findUnique({
      where: { id: user.uid },
      include: {
        apikeys: true,
      },
    })
  } catch (err) {
    /*
     * Failed to run database query. Log warning and return 404
     */
    log.warn({ err, user }, `Error while trying to find and reveal user: ${user.uid}`)
    return this.setResponse(404)
  }

  return this.reveal()
}

/*
 * Creates a user+confirmation and sends out signup email - Anonymous route
 *
 * @param {body} object - The request body
 * @returns {UserModel} object - The UserModel
 */
UserModel.prototype.guardedCreate = async function ({ body }) {
  /*
   * Do we have a POST body?
   */
  if (Object.keys(body).length < 1) return this.setResponse(400, 'postBodyMissing')

  /*
   * Is email set?
   */
  if (!body.email) return this.setResponse(400, 'emailMissing')

  /*
   * Is language set?
   */
  if (!body.language) return this.setResponse(400, 'languageMissing')

  /*
   * Is language a supported language?
   */
  if (!this.config.languages.includes(body.language))
    return this.setResponse(400, 'unsupportedLanguage')

  /*
   * Create ehash and check
   */
  const ehash = hash(clean(body.email))
  const check = randomString()

  /*
   * Check if we already have a user with this email address
   */
  await this.read({ ehash })

  /*
   * Check for unit tests only once
   */
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

    /*
     * Set type of action based on the account status
     */
    let type = 'signup-aed'
    if (this.record.status === 0) type = 'signup'
    else if (this.record.status === 1) type = 'signup-aea'

    /*
     * Create confirmation unless account is disabled
     */
    if (type !== 'signup-aed') {
      this.confirmation = await this.Confirmation.createRecord({
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

    /*
     *  Set the action url based on the account status
     */
    let actionUrl = false
    if (this.record.status === 0)
      actionUrl = i18nUrl(body.language, `/confirm/${type}/${this.Confirmation.record.id}/${check}`)
    else if (this.record.status === 1)
      actionUrl = i18nUrl(body.language, `/confirm/signin/${this.Confirmation.record.id}/${check}`)

    /*
     * Send email unless it's a test and we don't want to send test emails
     */
    if (!isTest || this.config.tests.sendEmail)
      await this.mailer.send({
        template: type,
        language: body.language,
        to: this.clear.email,
        replacements: {
          actionUrl,
          whyUrl: i18nUrl(body.language, `/docs/faq/email/why-${type}`),
          supportUrl: i18nUrl(body.language, `/patrons/join`),
        },
      })

    /*
     * Now return as if everything is fine
     */
    return this.setResponse201({ email: this.clear.email })
  }

  /*
   * New signup, attempt to create database record
   */
  try {
    this.clear.email = clean(body.email)
    this.clear.initial = this.clear.email
    this.language = body.language
    const email = this.encrypt(this.clear.email)
    /*
     * Create a temporary username because we need one
     */
    const username = clean(randomString())
    const data = {
      ehash,
      /*
       * The ihash (initial email hash) is the hash of the email that was used to
       * create the account. The initial email itself is stored in the intial field.
       * Once an account created, the ihash and initial fields can never be changed
       * by a user.
       * We keep them because in the case somebody claims their account was taken
       * over. We can check the original email address that was used to create it
       * even if the email address on the account was changed.
       */
      ihash: ehash,
      email,
      initial: email,
      username,
      lusername: username,
      language: body.language,
      mfaEnabled: false,
      mfaSecret: '',
      /*
       * The user will change this later. Or not. They can juse get a magic link via email
       */
      password: asJson(hashPassword(randomString())),
      /*
       * These are all placeholders, but fields that get encrypted need _some_ value
       * because encrypting null will cause an error.
       */
      data: this.encrypt({}),
      bio: this.encrypt(''),
      img: this.encrypt(this.config.avatars.user),
    }
    /*
     * During tests, users can set their own permission level so you can test admin stuff
     */
    if (isTest && body.role) data.role = body.role

    /*
     * Now attempt to create the record in the database
     */
    this.record = await this.prisma.user.create({ data })
  } catch (err) {
    /*
     * Could not create record. Log warning and return 500
     */
    log.warn(err, 'Could not create user record')
    return this.setResponse(500, 'createAccountFailed')
  }

  /*
   * Update username now that we have the databse ID
   */
  try {
    await this.update({
      username: `user-${this.record.id}`,
      lusername: `user-${this.record.id}`,
    })
  } catch (err) {
    /*
     * This is very unlikely, but it is possible that the username is taken
     * Which is not really a problem, so we will swallow this error and
     * continue with the random username
     */
    log.info(`Username collision for user-${this.record.id}`)
  }

  /*
   * Now create the confirmation
   */
  this.confirmation = await this.Confirmation.createRecord({
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

  /*
   * And send out the signup email
   */
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

  /*
   * For unit tests, we return the confirmation code so no email is needed
   * Obviously, that would defeat the point for production use.
   */
  return this.isTest(body)
    ? this.setResponse201({
        email: this.clear.email,
        confirmation: this.confirmation.record.id,
      })
    : this.setResponse201({ email: this.clear.email })
}

/*
 * Sign in based on username + password
 *
 * @param {req} object - The request object.
 * We use the entire request object here because we log the IP of failed log attempts
 * so we can detect if people are attempting to brute-force logins and block those IPs.
 * @returns {UserModel} object - The UserModel
 */
UserModel.prototype.passwordSignIn = async function (req) {
  /*
   * Do we have a POST body?
   */
  if (Object.keys(req.body).length < 1) return this.setResponse(400, 'postBodyMissing')

  /*
   * Is the username set?
   */
  if (!req.body.username) return this.setResponse(400, 'usernameMissing')

  /*
   * Is the password set?
   */
  if (!req.body.password) return this.setResponse(400, 'passwordMissing')

  /*
   * Attempt to find the user
   */
  await this.find(req.body)

  /*
   * If it does not exist, don't say so but just pretend the login failed.
   * This stops people from figuring out whether someone has a FreeSewing
   * account, which would be a privacy leak if we said 'not found' here'
   */
  if (!this.exists) {
    log.warn(`Sign-in attempt for non-existing user: ${req.body.username} from ${req.ip}`)
    return this.setResponse(401, 'signInFailed')
  }

  /*
   * Account found, check the password
   */
  const [valid, updatedPasswordField] = verifyPassword(req.body.password, this.record.password)

  /*
   * If the password is incorrect, log a warning with IP and return 401
   */
  if (!valid) {
    log.warn(`Wrong password for existing user: ${req.body.username} from ${req.ip}`)
    return this.setResponse(401, 'signInFailed')
  }

  /*
   * Check if the user has MFA enabled and if so handle the second factor
   */
  if (this.record.mfaEnabled) {
    /*
     * If there is no token, return 403 so the front-end can present the token
     */
    if (!req.body.token) return this.setResponse(403, 'mfaTokenRequired')
    /*
     * If there is a token, verify it and if it is not correct, return 401
     */ else if (!this.mfa.verify(req.body.token, this.clear.mfaSecret)) {
      return this.setResponse(401, 'signInFailed')
    }
  }

  /*
   * At this point sign in is a success. We will update the lastLogin value
   *
   * However, the way passwords are handled in v2 and v3 is slightly different.
   * So v2 users who have been migrated have a v2 hash. So now that we
   * have their password and we know it's good, let's rehash it the v3 way
   * if this happens to be a v2 user.
   */
  if (updatedPasswordField) await this.update({ password: updatedPasswordField })

  /*
   * Final check for account status and other things before returning
   */
  const [ok, err, status] = this.isOk()
  if (ok === true) return this.signInOk()
  else return this.setResponse(status, err)
}

/*
 * Sign in based on a sign-in link
 *
 * @param {req} object - The request object.
 * @returns {UserModel} object - The UserModel
 */
UserModel.prototype.linkSignIn = async function (req) {
  /*
   * Is the id set?
   */
  if (!req.params.id) return this.setResponse(400, 'signInIdMissing')

  /*
   * Is the check set?
   */
  if (!req.params.check) return this.setResponse(400, 'signInCheckMissing')

  /*
   * Attempt to retrieve confirmation record
   */
  await this.Confirmation.read({ id: req.params.id })

  /*
   * If the confirmation does not exist, return 404
   */
  if (!this.Confirmation.exists) return this.setResponse(404)

  /*
   * If the confirmation is not of of the right type, return 404
   */
  if (!['signinlink', 'signup-aea'].includes(this.Confirmation.record.type)) {
    return this.setResponse(404)
  }

  /*
   * If the confirmation check is not valid, return 404
   */
  if (this.Confirmation.clear.data.check !== req.params.check) {
    return this.setResponse(404)
  }

  /*
   * Looks like we're good, so attempt to read the user from the database
   */
  await this.read({ id: this.Confirmation.record.userId })

  /*
   * if anything went wrong, this.error will be set
   */
  if (this.error) return this

  /*
   * Check if the user has MFA enabled and if so handle the second factor
   */
  if (this.record.mfaEnabled) {
    /*
     * If there is no token, return 403 so the front-end can present the token
     */
    if (!req.body.token) return this.setResponse(403, 'mfaTokenRequired')
    /*
     * If there is a token, verify it and if it is not correct, return 401
     */ else if (!this.mfa.verify(req.body.token, this.clear.mfaSecret)) {
      return this.setResponse(401, 'signInFailed')
    }
  }

  /*
   * Before we return, remove the confirmation so it works only once
   */
  //await this.Confirmation.delete()

  /*
   * Sign in was a success, run a final check before returning
   */
  const [ok, err, status] = this.isOk(401, 'signInFailed')
  if (ok === true) return this.signInOk()
  else return this.setResponse(status, err)
}

/*
 * Send a magic link for user sign in
 *
 * @param {req} object - The request object.
 * @returns {UserModel} object - The UserModel
 */
UserModel.prototype.sendSigninlink = async function (req) {
  /*
   * Do we have a POST body?
   */
  if (Object.keys(req.body).length < 1) return this.setResponse(400, 'postBodyMissing')

  /*
   * Is username set?
   */
  if (!req.body.username) return this.setResponse(400, 'usernameMissing')

  /*
   * Attempt to find the user
   */
  await this.find(req.body)

  /*
   * If we could not find it, log a warning but send a 401
   * to not reveal such a user does not exist.
   */
  if (!this.exists) {
    log.warn(`Magic link attempt for non-existing user: ${req.body.username} from ${req.ip}`)
    return this.setResponse(401, 'signInFailed')
  }

  /*
   * Account found, generate random check and create the confirmation
   */
  const check = randomString()
  this.confirmation = await this.Confirmation.createRecord({
    type: 'signinlink',
    data: {
      language: this.record.language,
      check,
    },
    userId: this.record.id,
  })

  /*
   * Figure out whether this is part of a unit test
   */
  const isTest = this.isTest(req.body)

  /*
   * Only send out this email if it is not a unit test
   */
  if (!isTest) {
    /*
     * Send sign-in link email
     */
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

  return this.setResponse200({ result: 'emailSent' })
}

/*
 * Confirms a user account
 *
 * @param {body} object - The request body
 * @param {params} object - The request (URL) params
 * @returns {UserModel} object - The UserModel
 */
UserModel.prototype.confirm = async function ({ body, params }) {
  /*
   * Is the id set?
   */
  if (!params.id) return this.setResponse(404)

  /*
   * Do we have a POST body?
   */
  if (Object.keys(body).length < 1) return this.setResponse(400, 'postBodyMissing')

  /*
   * Do we have consent from the user to process their data?
   */
  if (!body.consent || typeof body.consent !== 'number' || body.consent < 1)
    return this.setResponse(400, 'consentRequired')

  /*
   * Attempt to read the confirmation from the database
   */
  await this.Confirmation.read({ id: params.id }, { user: true })

  /*
   * If the confirmation does not exist, log a warning and return 404
   */
  if (!this.Confirmation.exists) {
    log.warn(`Could not find confirmation id ${params.id}`)
    return this.setResponse(404)
  }

  /*
   * If the confirmation is of the wrong type, log a warning and return 404
   */
  if (this.Confirmation.record.type !== 'signup') {
    log.warn(`Confirmation mismatch; ${params.id} is not a signup id`)
    return this.setResponse(404)
  }

  /*
   * If an error occured, it will be in this.error and we can return here
   */
  if (this.error) return this

  /*
   * Get the unencrypted data from the confirmation
   */
  const data = this.Confirmation.clear.data

  /*
   * If the ehash does not match, return 404
   */
  if (data.ehash !== this.Confirmation.record.user.ehash) return this.setResponse(404)

  /*
   * If the id does not match, return 404
   */
  if (data.id !== this.Confirmation.record.userId) return this.setResponse(404)

  /*
   * Attempt to load the user from the database
   */
  await this.read({ id: this.Confirmation.record.userId })

  /*
   * If an error occured, it will be in this.error and we can return here
   */
  if (this.error) return this

  /*
   * Update user status, consent, and last sign in
   */
  await this.update({
    status: 1,
    consent: body.consent,
  })

  /*
   * If an error occured, it will be in this.error and we can return here
   */
  if (this.error) return this

  /*
   * Before we return, remove the confirmation so it works only once
   */
  await this.Confirmation.delete()

  /*
   * Account is now active, return a passwordless sign in
   */
  return this.signInOk()
}

/*
 * Updates the consent of the authenticated user
 * Goes through jwt-guest middelware so one of the few routes you can access without consent
 *
 * @param {body} object - The request body
 * @param {user} object - The user as loaded by auth middleware
 * @returns {UserModel} object - The UserModel
 */
UserModel.prototype.updateConsent = async function ({ body, user }) {
  /*
   * Enforce RBAC
   */
  if (!this.rbac.writeSome(user)) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * Is consent valid?
   */
  if (![0, 1, 2].includes(body.consent)) return this.setResponse(400, 'consentInvalid')

  /*
   * Create data to update the record
   */
  const data = { consent: body.consent }
  if (this.record.status === 0 && body.consent > 0) data.status = 1

  /*
   * Now update the database record
   */
  await this.update(data)

  /*
   * Construct data to return
   */
  const returnData = {
    result: 'success',
    account: this.asAccount(),
    token: this.getToken(),
  }

  /*
   * Return data
   */
  return this.setResponse200(returnData)
}

/*
 * Updates the user data - Used when we pass through user-provided data
 * so we can't be certain it's safe
 *
 * @param {body} object - The request body
 * @param {user} object - The user as loaded by auth middleware
 * @returns {UserModel} object - The UserModel
 */
UserModel.prototype.guardedUpdate = async function ({ body, user }) {
  /*
   * Enforce RBAC
   */
  if (!this.rbac.writeSome(user)) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * Create data to update the record
   */
  const data = {}

  /*
   * String fields
   */
  for (const field of ['bio']) {
    if (typeof body[field] === 'string') data[field] = body[field]
  }

  /*
   * Enum fields
   */
  for (const [field, values] of Object.entries(this.config.enums.user)) {
    if (values.includes(body[field])) data[field] = body[field]
  }

  /*
   * JSON fields
   */
  for (const field of this.jsonFields) {
    if (typeof body[field] !== 'undefined') {
      if (typeof body[field] === 'object')
        data[field] = {
          ...this.clear[field],
          ...body[field],
        }
      else log.warn(body, `Tried to set JDON field ${field} to a non-object`)
    }
  }

  /*
   * Password
   */
  if (typeof body.password === 'string') data.password = body.password

  /*
   * Username
   */
  if (typeof body.username === 'string') {
    const available = await this.isLusernameAvailable(body.username)
    if (available) {
      data.username = body.username.trim()
      data.lusername = clean(body.username)
    } else {
      log.info(`Rejected user name change from ${data.username} to ${body.username.trim()}`)
    }
  }

  /*
   * Image (img)
   */
  if (typeof body.img === 'string')
    data.img = await replaceImage({
      id: `user-${this.record.ihash}`,
      data: body.img,
      metadata: {
        user: user.uid,
        ihash: this.record.ihash,
      },
    })

  /*
   * Now update the database record
   */
  await this.update(data)

  /*
   * Figure out whether this is a unit test
   */
  const isTest = this.isTest(body)

  /*
   * If there's an email change, we need to trigger confirmation
   */
  if (typeof body.email === 'string' && this.clear.email !== clean(body.email)) {
    /*
     * Generate the check
     */
    const check = randomString()

    /*
     * Generate the confirmation record
     */
    this.confirmation = await this.Confirmation.createRecord({
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

    /*
     * Send out confirmation email (unless it's a test)
     */
    if (!isTest || this.config.tests.sendEmail) {
      await this.mailer.send({
        template: 'emailchange',
        language: this.record.language,
        to: body.email,
        /*
         * CC the old address to guard against account take-over
         */
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
    /*
     * Could be an email change confirmation
     */
    typeof body.confirmation === 'string' &&
    body.confirm === 'emailchange' &&
    typeof body.check === 'string'
  ) {
    /*
     * Attemt to read the confirmation record from the database
     */
    await this.Confirmation.read({ id: body.confirmation })

    /*
     * If it does not exist, log a warning and return 404
     */
    if (!this.Confirmation.exists) {
      log.warn(`Could not find confirmation id ${body.confirmation}`)
      return this.setResponse(404)
    }

    /*
     * If it is the wrong confirmation type, log a warning and return 404
     */
    if (this.Confirmation.record.type !== 'emailchange') {
      log.warn(`Confirmation mismatch; ${body.confirmation} is not an emailchange id`)
      return this.setResponse(404)
    }

    /*
     * Load unencrypted data
     */
    const data = this.Confirmation.clear.data

    /*
     * Verify confirmation ID and check. Update email if it checks out.
     */
    if (
      data.check === body.check &&
      data.email.current === this.clear.email &&
      typeof data.email.new === 'string'
    ) {
      /*
       * Update the email address and ehash
       */
      await this.update({
        email: this.encrypt(data.email.new),
        ehash: hash(clean(data.email.new)),
      })
    }
  }

  /*
   * Construct data to return
   */
  const returnData = {
    result: 'success',
    account: this.asAccount(),
  }

  /*
   * If it is a unit test, include the confirmation id
   */
  if (isTest && this.Confirmation.record?.id) returnData.confirmation = this.Confirmation.record.id

  /*
   * Return data
   */
  return this.setResponse200(returnData)
}

/*
 * Enables/Disables MFA on the account - Used when we pass through
 * user-provided data so we can't be certain it's safe
 *
 * @param {body} object - The request body
 * @param {user} object - The user as loaded by auth middleware
 * @param {ip} object - The user as loaded by auth middleware
 * @returns {UserModel} object - The UserModel
 */
UserModel.prototype.guardedMfaUpdate = async function ({ body, user, ip }) {
  /*
   * Enforce RBAC
   */
  if (!this.rbac.user(user)) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * If MFA is active and it is an attempt to active it, return 400
   */
  if (body.mfa === true && this.record.mfaEnabled === true)
    return this.setResponse(400, 'mfaActive')

  /*
   * Option 1/3: Is this an attempt to disable MFA?
   */
  if (body.mfa === false) {
    /*
     * Is token set in the POST body?
     */
    if (!body.token) return this.setResponse(400, 'mfaTokenMissing')

    /*
     * Is password set in the POST body?
     */
    if (!body.password) return this.setResponse(400, 'passwordMissing')

    /*
     * Verify the password
     */
    const [valid] = verifyPassword(body.password, this.record.password)

    /*
     * If the password is not correct, log a warning including the IP and reutrn 401
     */
    if (!valid) {
      log.warn(`Wrong password for existing user while disabling MFA: ${user.uid} from ${ip}`)
      return this.setResponse(401, 'authenticationFailed')
    }

    /*
     * Verify the MFA token
     */
    if (this.mfa.verify(body.token, this.clear.mfaSecret)) {
      /*
       * Token is valid. Update user record to disable MFA
       */
      try {
        await this.update({ mfaEnabled: false })
      } catch (err) {
        /*
         * Problem occured while updating the record. Log warning and reurn 500
         */
        log.warn(err, 'Could not disable MFA after token check')
        return this.setResponse(500, 'mfaDeactivationFailed')
      }

      /*
       * All done here. Return account data
       */
      return this.setResponse200({
        result: 'success',
        account: this.asAccount(),
      })
    } else {
      /*
       * MFA token not valid. Return 401
       */
      return this.setResponse(401, 'authenticationFailed')
    }
  } else if (body.mfa === true && body.token && body.secret) {
    /*
     * Option 2/3: Is this is a confirmation after enabling MFA?
     */
    /*
     * Verify secret and token
     */
    if (body.secret === this.clear.mfaSecret && this.mfa.verify(body.token, this.clear.mfaSecret)) {
      /*
       * Looks good. Update the user record to enable MFA
       */
      try {
        await this.update({ mfaEnabled: true })
      } catch (err) {
        /*
         * Problem occured while updating the record. Log warning and reurn 500
         */
        log.warn(err, 'Could not enable MFA after token check')
        return this.setResponse(500, 'mfaActivationFailed')
      }

      /*
       * All done here. Return account data
       */
      return this.setResponse200({
        result: 'success',
        account: this.asAccount(),
      })
    } else return this.setResponse(403, 'mfaTokenInvalid')
    /*
     * Secret and/or token don't match. Return 403
     */
  } else if (body.mfa === true && this.record.mfaEnabled === false) {
    /*
     * Option 3/3: Is this an initial request to enable MFA?
     */
    /*
     * Setup MFA
     */
    let mfa
    try {
      mfa = await this.mfa.enroll(this.record.username)
    } catch (err) {
      /*
       * Problem occured while creating MFA setup. Return 500.
       */
      log.warn(err, 'Failed to setup MFA')
      return this.setResponse(500, 'mfaSetupFailed')
    }

    /*
     * Update record with the MFA secret
     */
    try {
      await this.update({ mfaSecret: mfa.secret })
    } catch (err) {
      /*
       * Problem occured while updating record. Return 500.
       */
      log.warn(err, 'Could not update MFA secret after setup')
      return this.setResponse(500, 'mfaUpdateAfterSetupFailed')
    }

    /*
     * Return the MFA data so the user can add them to their MFA app
     */
    return this.setResponse200({ mfa })
  }

  /*
   * We should not ever arrive here, so return 400 at this point
   */
  return this.setResponse(400, 'invalidMfaSetting')
}

/*
 * Returns the database record as profile data for public consumption
 *
 * @return {account} object - The account data as a plain object
 */
UserModel.prototype.asProfile = function () {
  /*
   * Nothing to do here but construct the object to return
   */
  return {
    id: this.record.id,
    bio: this.clear.bio,
    img: this.clear.img,
    ihash: this.record.ihash,
    patron: this.record.patron,
    role: this.record.role,
    username: this.record.username,
  }
}

/*
 * Returns the database record as account data for for consumption
 *
 * @return {account} object - The account data as a plain object
 */
UserModel.prototype.asAccount = function () {
  /*
   * Nothing to do here but construct the object to return
   */
  return {
    id: this.record.id,
    bio: this.clear.bio,
    compare: this.record.compare,
    consent: this.record.consent,
    control: this.record.control,
    createdAt: this.record.createdAt,
    email: this.clear.email,
    data: this.clear.data,
    ihash: this.record.ihash,
    img: this.clear.img,
    imperial: this.record.imperial,
    initial: this.clear.initial,
    jwtCalls: this.record.jwtCalls,
    keyCalls: this.record.keyCalls,
    language: this.record.language,
    lastSeen: this.record.lastSeen,
    mfaEnabled: this.record.mfaEnabled,
    newsletter: this.record.newsletter,
    patron: this.record.patron,
    role: this.record.role,
    status: this.record.status,
    updatedAt: this.record.updatedAt,
    username: this.record.username,
    lusername: this.record.lusername,
    /*
     * Add this so we can give a note to users about migrating their password
     */
    passwordType: JSON.parse(this.record.password).type,
  }
}

/*
 * Returns all user data (that is not included in the account data)
 *
 * @return {account} object - The account data as a plain object
 */
UserModel.prototype.asData = function () {
  /*
   * Nothing to do here but construct the object to return
   */
  return {
    apikeys: this.record.apikeys
      ? this.record.apikeys.map((key) => {
          delete key.secret
          delete key.aud
          key.name = this.decrypt(key.name)

          return key
        })
      : [],
    bookmarks: this.record.bookmarks || [],
    patterns: this.record.patterns || [],
    sets: this.record.sets || [],
  }
}

/*
 * Returns all user data to be exported
 *
 * @return {account} object - The account data as a plain object
 */
UserModel.prototype.asExport = function () {
  /*
   * Get both account data and all data
   */
  return {
    ...this.asAccount(),
    ...this.asData(),
  }
}

/*
 * Returns a list of records as search results
 * Typically used by admin search
 *
 * @param {list} array - A list of database records
 * @return {list} array - The records mapped and decrypted
 *
 */
UserModel.prototype.asAccountList = async function (list) {
  const newList = []
  for (const record of list) {
    const clear = {}
    for (const field of this.encryptedFields) {
      clear[field] = await this.decrypt(record[field])
    }
    for (const field of [
      'id',
      'compare',
      'consent',
      'control',
      'createdAt',
      'ihash',
      'jwtCalls',
      'keyCalls',
      'language',
      'lastSeen',
      'mfaEnabled',
      'newsletter',
      'patron',
      'role',
      'status',
      'updatedAt',
      'username',
      'lusername',
    ])
      clear[field] = record[field]
    clear.passwordType = JSON.parse(record.password).type
    newList.push(clear)
  }

  return newList
}

/*
 * Creates and returns a JSON Web Token (jwt)
 *
 * @return {jwt} string - The JWT
 */
UserModel.prototype.getToken = function () {
  /*
   * Call the jwt library with the correct config
   */
  return jwt.sign(
    {
      _id: this.record.id,
      username: this.record.username,
      role: this.record.role,
      status: this.record.status,
      aud: `${this.config.api}/${this.config.instance}`,
      iss: this.config.jwt.issuer,
    },
    this.config.jwt.secretOrKey,
    { expiresIn: this.config.jwt.expiresIn }
  )
}

/*
 * Helper method to check an account is ok
 */
UserModel.prototype.isOk = function (failStatus = 401, failMsg = 'authenticationFailed') {
  /*
   * These are all the checks we run to see if an account is 'ok'
   */
  if (
    this.exists &&
    this.record &&
    this.record.status > 0 &&
    this.record.consent > 0 &&
    this.record.role &&
    this.record.role !== 'blocked'
  )
    return [true, false]

  if (!this.exists) return [false, 'noSuchUser', 404]
  if (this.record.consent < 1) return [false, 'consentLacking', 451]
  if (this.record.status < 1) return [false, 'statusLacking', 403]
  if (this.record.role === 'blocked') return [false, 'accountBlocked', 403]

  return [false, failMsg, failStatus]
}

/*
 * Helper method to handle the return after a successful sign in
 *
 * @returns {UserModel} object - The UserModel
 */
UserModel.prototype.signInOk = function () {
  return this.setResponse200({
    result: 'success',
    token: this.getToken(),
    account: this.asAccount(),
  })
}

/*
 * Helper method to see if a (lowercase) username is available
 * as well as making sure username is not something we
 * do not allow
 *
 * @param {lusername} string - The lowercased username
 * @returns {isTest} boolean - True if it's a test. False if not.
 */
UserModel.prototype.isLusernameAvailable = async function (lusername) {
  /*
   * We do not allow usernames shorter than 2 characters
   */
  if (lusername.length < 2) return false

  /*
   * Attempt to find a user with the provided lusername
   */
  let user
  try {
    user = await this.prisma.user.findUnique({ where: { lusername } })
  } catch (err) {
    /*
     * An error means it's not good. Return false
     */
    log.warn({ err, lusername }, 'Could not search for free username')
    return false
  }
  /*
   * If a user is found, the lusername is not available, so return false
   */
  if (user) return false

  /*
   * If we get here, the lusername is available, so return true
   */
  return true
}

/*
 * Helper method that is called by middleware to verify whether the user
 * is allowed in. It will update the `lastSeen` field of the user as
 * well as increase the call counter for either JWT or KEY.
 * It will also check whether the user status is ok.
 * It will NOT check whether consent is granted because the users who
 * sign up with Oauth need to be able to get their data during onboarding
 * so they can consent.
 *
 * If this returns false, the request will never make it past the middleware.
 *
 * @param {id} string - The user ID
 * @param {type} string - The authentication type (one of 'jwt' or 'key')
 * @param {type} string - The middleware auth payload
 * @returns {success} boolean - True if it worked, false if not
 */
UserModel.prototype.papersPlease = async function (id, type, payload) {
  /*
   * Construct data object for update operation
   */
  const data = { lastSeen: new Date() }
  data[`${type === 'key' ? 'key' : 'jwt'}Calls`] = { increment: 1 }

  /*
   * Now update the dabatase record
   */
  let user
  try {
    user = await this.prisma.user.update({ where: { id }, data })
  } catch (err) {
    /*
     * An error means it's not good. Return false
     */
    console.log(err)
    log.warn({ id }, 'Could not update lastSeen field from middleware')
    return [false, 'failedToUpdateLastSeen']
  }

  /*
   * If it's an API key, update the call call and lastSeen field too
   */
  if (type === 'key') {
    const keyData = {
      calls: { increment: 1 },
      lastSeen: new Date(),
    }
    try {
      await this.prisma.apikey.update({ where: { id: payload.id }, data: keyData })
    } catch (err) {
      /*
       * An error means it's not good. Return false
       */
      log.warn({ id }, 'Could not update apikey lastSeen field from middleware')
      return [false, 'failedToUpdateKeyCallCount']
    }
  }

  /*
   * Is consent given? (Lacking consent is only allowed under the jwt-guest type)
   */
  if (user.consent < 1) return [type === 'jwt-guest' ? true : false, 'consentLacking']

  /*
   * Is the account active? (Lacking status is only allowed under the jwt-guest type)
   */
  if (user.status < 1) {
    if (user.status === -1) return [type === 'jwt-guest' ? true : false, 'accountDisabled']
    if (user.status === -2) return [type === 'jwt-guest' ? true : false, 'accountBlocked']
    return [type === 'jwt-guest' ? true : false, 'accountInactive']
  }

  /*
   * If we get here, the lastSeen field was updated, user exists,
   * and their consent and status are ok, so so return true and let them through.
   */
  return [true, false]
}

/*
 * Everything below this comment is migration code.
 * This can all be removed after v3 is in production and all users have been migrated.
 */
const migrateUser = (v2) => {
  const email = clean(v2.email)
  const initial = v2.initial ? clean(v2.initial) : email
  const data = {
    bio: v2.bio || '--',
    consent: 0,
    createdAt: v2.time?.created ? new Date(v2.time.created) : new Date(),
    email,
    ehash: hash(email),
    data: {},
    ihash: hash(initial),
    img: 'default-avatar',
    initial,
    imperial: v2.settings.units === 'imperial',
    language: v2.settings.language,
    lastSeen: new Date(),
    lusername: v2.username.toLowerCase(),
    mfaEnabled: false,
    newsletter: v2.newsletter === true ? true : false,
    patron: v2.patron,
    role: v2._id === '5d62aa44ce141a3b816a3dd9' ? 'admin' : 'user',
    status: v2.status === 'active' ? 1 : 0,
    username: v2.username,
  }
  if (data.consent.profile) data.consent++
  if (data.consent.measurements) data.consent++
  if (data.consent.openData) data.consent++

  return data
}

/*
 * This is a special migration route
 */
UserModel.prototype.migrate = async function ({ password, v2 }) {
  //let lut = false
  const data = migrateUser(v2.account)
  if (v2.account.consent.profile && (v2.account.consent.model || v2.account.consent.measurements)) {
    data.consent++
    if (v2.account.consent.openData) v2.account.consent++
  }
  data.password = password
  await this.read({ ehash: data.ehash })
  if (!this.record) {
    /*
     * Skip images for now
     */
    data.img = 'default-avatar'
    let available = await this.isLusernameAvailable(data.lusername)
    while (!available) {
      data.username += '+'
      data.lusername += '+'
      available = await this.isLusernameAvailable(data.lusername)
    }
    try {
      await this.createRecord(data)
    } catch (err) {
      log.warn(err, 'Could not create user record')
      return this.setResponse(500, 'createUserFailed')
    }
    // That's the user, now load their people as sets
    const user = {
      ...v2.account,
      people: v2.people,
      patterns: v2.patterns,
    }
    if (user.people) await this.Set.migrate(user, this.record.id)
    //if (user.people) lut = await this.Set.migrate(user, this.record.id)
    //if (user.patterns) await this.Pattern.import(user, lut, this.record.id)
  } else {
    return this.setResponse(400, 'userExists')
  }

  /*
   * Decrypt data so we can return it
   */
  await this.reveal()

  /*
   * Looks like the migration was a success. Return a passwordless sign in
   */
  return this.signInOk()
}
/*
 * This is a special route not available for API users
 */
UserModel.prototype.import = async function (user) {
  if (user.status === 'active') {
    const data = migrateUser(user)
    if (user.consent.profile && (user.consent.model || user.consent.measurements)) {
      data.consent++
      if (user.consent.openData) data.consent++
    }

    await this.read({ ehash: data.ehash })
    if (!this.record) {
      /*
       * Skip images for now
       */
      if (data.img) {
        /*
         * Figure out what image to grab from the FreeSewing v2 backend server
         */
        const imgId = `user-${data.ihash}`
        const imgUrl =
          'https://static.freesewing.org/users/' +
          encodeURIComponent(user.handle.slice(0, 1)) +
          '/' +
          encodeURIComponent(user.handle) +
          '/' +
          encodeURIComponent(data.img)
        data.img = await importImage({
          id: imgId,
          metadata: {
            user: `v2-${user.handle}`,
            ihash: data.ihash,
          },
          url: imgUrl,
        })
        data.img = imgId
      } else data.img = 'default-avatar'
      let available = await this.isLusernameAvailable(data.lusername)
      while (!available) {
        data.username += '+'
        data.lusername += '+'
        available = await this.isLusernameAvailable(data.lusername)
      }
      try {
        await this.createRecord(data)
      } catch (err) {
        log.warn(err, 'Could not create user record')
        return this.setResponse(500, 'createUserFailed')
      }
      // That's the user, now load their people as sets
      let lut = false
      if (user.people) lut = await this.Set.import(user, this.record.id)
      if (user.patterns) await this.Pattern.import(user, lut, this.record.id)
    }
  }

  return this.setResponse200()
}
