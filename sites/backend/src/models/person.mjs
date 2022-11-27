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

PersonModel.prototype.guardedCreate = async function ({ body, user }) {
  if (user.level < 3) return this.setResponse(403, 'insufficientAccessLevel')
  if (Object.keys(body) < 1) return this.setResponse(400, 'postBodyMissing')
  if (!body.name || typeof body.name !== 'string') return this.setResponse(400, 'nameMissing')

  // Prepare data
  const data = { name: body.name }
  // Name (will be encrypted, so always set _some_ value)
  if (typeof body.name === 'string') data.name = body.name
  else data.name = '--'
  // Notes (will be encrypted, so always set _some_ value)
  if (body.notes || typeof body.notes === 'string') data.notes = body.notes
  else data.notes = '--'
  if (body.public === true) data.public = true
  if (body.measies) data.measies = this.sanitizeMeasurements(body.measies)
  data.imperial = body.imperial === true ? true : false
  data.userId = user.uid
  // Set this one initially as we need the ID to create a custom img via Sanity
  data.img = this.config.avatars.person

  // Create record
  await this.unguardedCreate(data)

  // Update img? (now that we have the ID)
  const img =
    this.config.use.sanity &&
    typeof body.img === 'string' &&
    (!body.unittest || (body.unittest && this.config.use.tests?.sanity))
      ? await setPersonAvatar(this.record.id, body.img)
      : false

  if (img) await this.unguardedUpdate(this.cloak({ img: img.url }))
  else await this.read({ id: this.record.id })

  return this.setResponse(201, 'created', { person: this.asPerson() })
}

PersonModel.prototype.unguardedCreate = async function (data) {
  try {
    this.record = await this.prisma.person.create({ data: this.cloak(data) })
  } catch (err) {
    log.warn(err, 'Could not create person')
    return this.setResponse(500, 'createPersonFailed')
  }

  return this
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
 * Loads a person from the database based on the where clause you pass it
 * In addition prepares it for returning the person data
 *
 * Stores result in this.record
 */
PersonModel.prototype.guardedRead = async function ({ params, user }) {
  if (user.level < 1) return this.setResponse(403, 'insufficientAccessLevel')
  if (user.iss && user.status < 1) return this.setResponse(403, 'accountStatusLacking')

  await this.read({ id: parseInt(params.id) })
  if (this.record.userId !== user.uid && user.level < 5) {
    return this.setResponse(403, 'insufficientAccessLevel')
  }

  return this.setResponse(200, false, {
    result: 'success',
    person: this.asPerson(),
  })
}

/*
 * Clones a person
 * In addition prepares it for returning the person data
 *
 * Stores result in this.record
 */
PersonModel.prototype.guardedClone = async function ({ params, user }) {
  if (user.level < 3) return this.setResponse(403, 'insufficientAccessLevel')
  if (user.iss && user.status < 1) return this.setResponse(403, 'accountStatusLacking')

  await this.read({ id: parseInt(params.id) })
  if (this.record.userId !== user.uid && !this.record.public && user.level < 5) {
    return this.setResponse(403, 'insufficientAccessLevel')
  }

  // Clone person
  const data = this.asPerson()
  delete data.id
  data.name += ` (cloned from #${this.record.id})`
  data.notes += ` (Note: This person was cloned from person #${this.record.id})`
  await this.unguardedCreate(data)

  // Update unencrypted data
  this.reveal()

  return this.setResponse(200, false, {
    result: 'success',
    person: this.asPerson(),
  })
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
    if (typeof data[field] !== 'undefined') {
      data[field] = this.encrypt(data[field])
    }
  }

  return data
}

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
PersonModel.prototype.unguardedUpdate = async function (data) {
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
 * Updates the person data - Used when we pass through user-provided data
 * so we can't be certain it's safe
 */
PersonModel.prototype.guardedUpdate = async function ({ params, body, user }) {
  if (user.level < 3) return this.setResponse(403, 'insufficientAccessLevel')
  if (user.iss && user.status < 1) return this.setResponse(403, 'accountStatusLacking')
  await this.read({ id: parseInt(params.id) })
  if (this.record.userId !== user.uid && user.level < 8) {
    return this.setResponse(403, 'insufficientAccessLevel')
  }
  const data = {}
  // Imperial
  if (body.imperial === true || body.imperial === false) data.imperial = body.imperial
  // Name
  if (typeof body.name === 'string') data.name = body.name
  // Notes
  if (typeof body.notes === 'string') data.notes = body.notes
  // Public
  if (body.public === true || body.public === false) data.public = body.public
  // Measurements
  const measies = {}
  if (typeof body.measies === 'object') {
    const remove = []
    for (const [key, val] of Object.entries(body.measies)) {
      if (this.config.measies.includes(key)) {
        if (val === null) remove.push(key)
        else if (typeof val == 'number' && val > 0) measies[key] = val
      }
    }
    data.measies = { ...this.clear.measies, ...measies }
    for (const key of remove) delete data.measies[key]
  }

  // Image (img)
  if (typeof body.img === 'string') {
    const img = await setPersonAvatar(params.id, body.img)
    data.img = img.url
  }

  // Now update the record
  await this.unguardedUpdate(this.cloak(data))

  return this.setResponse(200, false, { person: this.asPerson() })
}

/*
 * Removes the person - No questions asked
 */
PersonModel.prototype.unguardedDelete = async function () {
  await this.prisma.person.delete({ here: { id: this.record.id } })
  this.record = null
  this.clear = null

  return this.setExists()
}

/*
 * Removes the person - Checks permissions
 */
PersonModel.prototype.guardedDelete = async function ({ params, body, user }) {
  if (user.level < 3) return this.setResponse(403, 'insufficientAccessLevel')
  if (user.iss && user.status < 1) return this.setResponse(403, 'accountStatusLacking')

  await this.read({ id: parseInt(params.id) })
  if (this.record.userId !== user.uid && user.level < 8) {
    return this.setResponse(403, 'insufficientAccessLevel')
  }

  await this.unguardedDelete()

  return this.setResponse(204, false)
}

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
