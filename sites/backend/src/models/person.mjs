import { log } from '../utils/log.mjs'
import { setPersonAvatar } from '../utils/sanity.mjs'

export function PersonModel(tools) {
  this.config = tools.config
  this.prisma = tools.prisma
  this.decrypt = tools.decrypt
  this.encrypt = tools.encrypt
  this.encryptedFields = ['measies', 'img', 'name', 'notes']
  this.clear = {} // For holding decrypted data

  return this
}

PersonModel.prototype.create = async function ({ body, user }) {
  if (user.level < 3) return this.setResponse(403, 'insufficientAccessLevel')
  if (Object.keys(body) < 1) return this.setResponse(400, 'postBodyMissing')
  if (!body.name || typeof body.name !== 'string') return this.setResponse(400, 'nameMissing')

  // Prepare data
  const data = { name: body.name }
  if (body.notes || typeof body.notes === 'string') data.notes = body.notes
  if (body.public === true) data.public = true
  if (body.measies) data.measies = this.sanitizeMeasurements(body.measies)
  data.imperial = body.imperial === true ? true : false
  data.userId = user.uid
  // Set this one initially as we need the ID to create a custom img via Sanity
  data.img = this.encrypt(this.config.avatars.person)

  // Create record
  try {
    this.record = await this.prisma.person.create({ data: this.cloak(data) })
  } catch (err) {
    log.warn(err, 'Could not create person')
    return this.setResponse(500, 'createPersonFailed')
  }

  // Update img? (now that we have the ID)
  const img =
    this.config.use.sanity &&
    typeof body.img === 'string' &&
    (!body.unittest || (body.unittest && this.config.use.tests?.sanity))
      ? await setPersonAvatar(this.record.id, body.img)
      : false

  if (img) await this.safeUpdate(this.cloak({ img: img.url }))
  else await this.read({ id: this.record.id })

  return this.setResponse(201, 'created', { person: this.asPerson() })
}

/*
 * Loads a person from the database based on the where clause you pass it
 *
 * Stores result in this.record
 */
PersonModel.prototype.read = async function (where) {
  try {
    this.record = await this.prisma.person.findUnique({ where })
  } catch (err) {
    log.warn({ err, where }, 'Could not read person')
  }

  this.reveal()

  return this.setExists()
}

/*
 * Helper method to decrypt at-rest data
 */
PersonModel.prototype.reveal = async function () {
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
PersonModel.prototype.cloak = function (data) {
  for (const field of this.encryptedFields) {
    if (typeof data[field] !== 'undefined') data[field] = this.encrypt(data[field])
  }

  return data
}

/*
 * Loads a user from the database based on the where clause you pass it
 * In addition prepares it for returning the account data
 *
 * Stores result in this.record
 */
//UserModel.prototype.readAsAccount = async function (where) {
//  await this.read(where)
//
//  return this.setResponse(200, false, {
//    result: 'success',
//    account: this.asAccount(),
//  })
//}

/*
 * Finds a user based on one of the accepted unique fields which are:
 *   - lusername (lowercase username)
 *   - ehash
 *   - id
 *
 * Stores result in this.record
 */
//UserModel.prototype.find = async function (body) {
//  try {
//    this.record = await this.prisma.user.findFirst({
//      where: {
//        OR: [
//          { lusername: { equals: clean(body.username) } },
//          { ehash: { equals: hash(clean(body.username)) } },
//          { id: { equals: parseInt(body.username) || -1 } },
//        ],
//      },
//    })
//  } catch (err) {
//    log.warn({ err, body }, `Error while trying to find user: ${body.username}`)
//  }
//
//  this.reveal()
//
//  return this.setExists()
//}

/*
 * Checks this.record and sets a boolean to indicate whether
 * the user exists or not
 *
 * Stores result in this.exists
 */
PersonModel.prototype.setExists = function () {
  this.exists = this.record ? true : false

  return this
}

/*
 * Updates the person data - Used when we create the data ourselves
 * so we know it's safe
 */
PersonModel.prototype.safeUpdate = async function (data) {
  try {
    this.record = await this.prisma.person.update({
      where: { id: this.record.id },
      data,
    })
  } catch (err) {
    log.warn(err, 'Could not update person record')
    process.exit()
    return this.setResponse(500, 'updatePersonFailed')
  }
  await this.reveal()

  return this.setResponse(200)
}

/*
 * Updates the user data - Used when we pass through user-provided data
 * so we can't be certain it's safe
 */
//UserModel.prototype.unsafeUpdate = async function (body) {
//  const data = {}
//  const notes = []
//  // Bio
//  if (typeof body.bio === 'string') data.bio = body.bio
//  // Consent
//  if ([0, 1, 2, 3].includes(body.consent)) data.consent = body.consent
//  // Github
//  if (typeof body.github === 'string') data.github = body.github.split('@').pop()
//  // Imperial
//  if ([true, false].includes(body.imperial)) data.imperial = body.imperial
//  // Language
//  if (this.config.languages.includes(body.language)) data.language = body.language
//  // Newsletter
//  if ([true, false].includes(body.newsletter)) data.newsletter = body.newsletter
//  // Password
//  if (typeof body.password === 'string') data.password = body.password // Will be cloaked below
//  // Username
//  if (typeof body.username === 'string') {
//    const available = await this.isLusernameAvailable(body.username)
//    if (available) {
//      data.username = body.username.trim()
//      data.lusername = clean(body.username)
//    } else {
//      log.info(`Rejected user name change from ${data.username} to ${body.username.trim()}`)
//      notes.push('usernameChangeRejected')
//    }
//  }
//  // Image (img)
//  if (typeof body.img === 'string') {
//    const img = await setPersonAvatar(this.record.id, body.img)
//    data.img = img.url
//  }
//
//  // Now update the record
//  await this.safeUpdate(this.cloak(data))
//
//  const isUnitTest = this.isUnitTest(body)
//  if (typeof body.email === 'string' && this.clear.email !== clean(body.email)) {
//    // Email change (requires confirmation)
//    this.confirmation = await this.Confirmation.create({
//      type: 'emailchange',
//      data: {
//        language: this.record.language,
//        email: {
//          current: this.clear.email,
//          new: body.email,
//        },
//      },
//      userId: this.record.id,
//    })
//    if (!isUnitTest || this.config.tests.sendEmail) {
//      // Send confirmation email
//      await this.mailer.send({
//        template: 'emailchange',
//        language: this.record.language,
//        to: body.email,
//        cc: this.clear.email,
//        replacements: {
//          actionUrl: i18nUrl(this.language, `/confirm/emailchange/${this.Confirmation.record.id}`),
//          whyUrl: i18nUrl(this.language, `/docs/faq/email/why-emailchange`),
//          supportUrl: i18nUrl(this.language, `/patrons/join`),
//        },
//      })
//    }
//  } else if (typeof body.confirmation === 'string' && body.confirm === 'emailchange') {
//    // Handle email change confirmation
//    await this.Confirmation.read({ id: body.confirmation })
//
//    if (!this.Confirmation.exists) {
//      log.warn(err, `Could not find confirmation id ${params.id}`)
//      return this.setResponse(404, 'failedToFindConfirmationId')
//    }
//
//    if (this.Confirmation.record.type !== 'emailchange') {
//      log.warn(err, `Confirmation mismatch; ${params.id} is not an emailchange id`)
//      return this.setResponse(404, 'confirmationIdTypeMismatch')
//    }
//
//    const data = this.Confirmation.clear.data
//    if (data.email.current === this.clear.email && typeof data.email.new === 'string') {
//      await this.safeUpdate({
//        email: this.encrypt(data.email.new),
//        ehash: hash(clean(data.email.new)),
//      })
//    }
//  }
//
//  const returnData = {
//    result: 'success',
//    account: this.asAccount(),
//  }
//  if (isUnitTest) returnData.confirmation = this.Confirmation.record.id
//
//  return this.setResponse(200, false, returnData)
//}

/*
 * Returns record data
 */
PersonModel.prototype.asPerson = function () {
  return {
    ...this.record,
    ...this.clear,
  }
}

/*
 * Helper method to set the response code, result, and body
 *
 * Will be used by this.sendResponse()
 */
PersonModel.prototype.setResponse = function (status = 200, error = false, data = {}) {
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
PersonModel.prototype.sendResponse = async function (res) {
  return res.status(this.response.status).send(this.response.body)
}

/*
 * Update method to determine whether this request is
 * part of a unit test
 */
//UserModel.prototype.isUnitTest = function (body) {
//  if (!body.unittest) return false
//  if (!this.clear.email.split('@').pop() === this.config.tests.domain) return false
//  if (body.email && !body.email.split('@').pop() === this.config.tests.domain) return false
//
//  return true
//}

/*
 * Helper method to check an account is ok
 */
//UserModel.prototype.isOk = function () {
//  if (
//    this.exists &&
//    this.record &&
//    this.record.status > 0 &&
//    this.record.consent > 0 &&
//    this.record.role &&
//    this.record.role !== 'blocked'
//  )
//    return true
//
//  return false
//}

/* Helper method to parse user-supplied measurements */
PersonModel.prototype.sanitizeMeasurements = function (input) {
  const measies = {}
  if (typeof input !== 'object') return measies
  for (const [m, val] of Object.entries(input)) {
    if (this.config.measies.includes(m) && typeof val === 'number' && val > 0) measies[m] = val
  }

  return measies
}
