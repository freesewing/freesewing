import jwt from 'jsonwebtoken'
import { log } from '../utils/log.mjs'
import { hash, hashPassword, randomString, verifyPassword } from '../utils/crypto.mjs'
import { replaceImage, importImage } from '../utils/cloudflare-images.mjs'
import { clean, asJson, i18nUrl } from '../utils/index.mjs'
import { decorateModel } from '../utils/model-decorator.mjs'

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
   * Ensure the account is active
   */
  if (user.iss && user.status < 1) return this.setResponse(403, 'accountStatusLacking')

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
      data: this.encrypt('{}'),
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
  return this.isOk() ? this.signInOk() : this.setResponse(401, 'signInFailed')
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
  await this.Confirmation.delete()

  /*
   * Sign in was a success, run a final check before returning
   */
  return this.isOk() ? this.signInOk() : this.setResponse(401, 'signInFailed')
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
   * Make sure the account is in a state where it's allowed to do this
   */
  if (user.iss && user.status < 1) return this.setResponse(403, 'accountStatusLacking')

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
      if (typeof body[field] === 'object') data[field] = body[field]
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
      metadata: {
        user: user.uid,
        ihash: this.record.ihash,
      },
      b64: body.img,
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
   * Ensure account is in the proper state to do this
   */
  if (user.iss && user.status < 1) return this.setResponse(403, 'accountStatusLacking')

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
    ihash: this.ihash,
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
      aud: this.config.jwt.audience,
      iss: this.config.jwt.issuer,
    },
    this.config.jwt.secretOrKey,
    { expiresIn: this.config.jwt.expiresIn }
  )
}

/*
 * Helper method to check an account is ok
 */
UserModel.prototype.isOk = function () {
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
    return true

  return false
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
 * Helper method that is called by middleware to verifu whether the user
 * is allowed in. It will update the `lastSeen` field of the user as
 * well as increase the call counter for either JWT or KEY.
 * It will also check whether the user status is ok and consent granted.
 *
 * If this returns false, the request will never make it past the middleware.
 *
 * @param {id} string - The user ID
 * @param {type} string - The authentication type (one of 'jwt' or 'key')
 * @returns {success} boolean - True if it worked, false if not
 */
UserModel.prototype.papersPlease = async function (id, type) {
  /*
   * Construct data object for update operation
   */
  const data = { lastSeen: new Date() }
  data[`${type}Calls`] = { increment: 1 }

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
    log.warn({ id }, 'Could not update lastSeen field from middleware')
    return false
  }

  /*
   * Verify the consent and status
   */
  if (user.consent < 1) return false

  /*
   * Is the account active?
   */
  if (user.status < 1) return false

  /*
   * If we get here, the lastSeen field was updated, user exists,
   * and their consent and status are ok, so so return true and let them through.
   */
  return true
}

/*
 * Everything below this comment is migration code.
 * This can all be removed after v3 is in production and all users have been migrated.
 */
const migrateUser = (v2) => {
  const email = clean(v2.email)
  const initial = clean(v2.initial)
  const data = {
    bio: v2.bio,
    consent: 0,
    createdAt: v2.time?.created ? new Date(v2.time.created) : new Date(),
    email,
    ehash: hash(email),
    github: v2.social?.github,
    ihash: hash(initial),
    img:
      v2.picture.slice(-4).toLowerCase() === '.svg' // Don't bother with default avatars
        ? ''
        : v2.picture,
    initial,
    imperial: v2.units === 'imperial',
    language: v2.settings.language,
    lastSeen: new Date(),
    lusername: v2.username.toLowerCase(),
    mfaEnabled: false,
    newsletter: false,
    password: JSON.stringify({
      type: 'v2',
      data: v2.password,
    }),
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
        console.log(user)
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
