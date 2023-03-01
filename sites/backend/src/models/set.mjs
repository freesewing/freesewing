import { log } from '../utils/log.mjs'
import { setSetAvatar } from '../utils/sanity.mjs'

export function SetModel(tools) {
  this.config = tools.config
  this.prisma = tools.prisma
  this.decrypt = tools.decrypt
  this.encrypt = tools.encrypt
  this.encryptedFields = ['measies', 'img', 'name', 'notes']
  this.clear = {} // For holding decrypted data

  return this
}

SetModel.prototype.guardedCreate = async function ({ body, user }) {
  if (user.level < 3) return this.setResponse(403, 'insufficientAccessLevel')
  if (Object.keys(body).length < 1) return this.setResponse(400, 'postBodyMissing')
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
  data.img = this.config.avatars.set

  // Create record
  await this.unguardedCreate(data)

  // Update img? (now that we have the ID)
  const img =
    this.config.use.sanity &&
    typeof body.img === 'string' &&
    (!body.unittest || (body.unittest && this.config.use.tests?.sanity))
      ? await setSetAvatar(this.record.id, body.img)
      : false

  if (img) await this.unguardedUpdate(this.cloak({ img: img.url }))
  else await this.read({ id: this.record.id })

  return this.setResponse(201, 'created', { set: this.asSet() })
}

SetModel.prototype.unguardedCreate = async function (data) {
  try {
    this.record = await this.prisma.set.create({ data: this.cloak(data) })
  } catch (err) {
    log.warn(err, 'Could not create set')
    return this.setResponse(500, 'createSetFailed')
  }

  return this
}

/*
 * Loads a measurements set from the database based on the where clause you pass it
 *
 * Stores result in this.record
 */
SetModel.prototype.read = async function (where) {
  try {
    this.record = await this.prisma.set.findUnique({ where })
  } catch (err) {
    log.warn({ err, where }, 'Could not read measurements set')
  }

  this.reveal()

  return this.setExists()
}

/*
 * Loads a measurements set from the database based on the where clause you pass it
 * In addition prepares it for returning the set data
 *
 * Stores result in this.record
 */
SetModel.prototype.guardedRead = async function ({ params, user }) {
  if (user.level < 1) return this.setResponse(403, 'insufficientAccessLevel')
  if (user.iss && user.status < 1) return this.setResponse(403, 'accountStatusLacking')

  await this.read({ id: parseInt(params.id) })
  if (this.record.userId !== user.uid && user.level < 5) {
    return this.setResponse(403, 'insufficientAccessLevel')
  }

  return this.setResponse(200, false, {
    result: 'success',
    set: this.asSet(),
  })
}

/*
 * Clones a measurements set
 * In addition prepares it for returning the set data
 *
 * Stores result in this.record
 */
SetModel.prototype.guardedClone = async function ({ params, user }) {
  if (user.level < 3) return this.setResponse(403, 'insufficientAccessLevel')
  if (user.iss && user.status < 1) return this.setResponse(403, 'accountStatusLacking')

  await this.read({ id: parseInt(params.id) })
  if (this.record.userId !== user.uid && !this.record.public && user.level < 5) {
    return this.setResponse(403, 'insufficientAccessLevel')
  }

  // Clone set
  const data = this.asSet()
  delete data.id
  data.name += ` (cloned from #${this.record.id})`
  data.notes += ` (Note: This measurements set was cloned from set #${this.record.id})`
  await this.unguardedCreate(data)

  // Update unencrypted data
  this.reveal()

  return this.setResponse(200, false, {
    result: 'success',
    set: this.asSet(),
  })
}

/*
 * Helper method to decrypt at-rest data
 */
SetModel.prototype.reveal = async function () {
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
SetModel.prototype.cloak = function (data) {
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
SetModel.prototype.setExists = function () {
  this.exists = this.record ? true : false

  return this
}

/*
 * Updates the set data - Used when we create the data ourselves
 * so we know it's safe
 */
SetModel.prototype.unguardedUpdate = async function (data) {
  try {
    this.record = await this.prisma.set.update({
      where: { id: this.record.id },
      data,
    })
  } catch (err) {
    log.warn(err, 'Could not update set record')
    process.exit()
    return this.setResponse(500, 'updateSetFailed')
  }
  await this.reveal()

  return this.setResponse(200)
}

/*
 * Updates the set data - Used when we pass through user-provided data
 * so we can't be certain it's safe
 */
SetModel.prototype.guardedUpdate = async function ({ params, body, user }) {
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
    const img = await setSetAvatar(params.id, body.img)
    data.img = img.url
  }

  // Now update the record
  await this.unguardedUpdate(this.cloak(data))

  return this.setResponse(200, false, { set: this.asSet() })
}

/*
 * Removes the set - No questions asked
 */
SetModel.prototype.unguardedDelete = async function () {
  await this.prisma.set.delete({ here: { id: this.record.id } })
  this.record = null
  this.clear = null

  return this.setExists()
}

/*
 * Removes the set - Checks permissions
 */
SetModel.prototype.guardedDelete = async function ({ params, user }) {
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
SetModel.prototype.asSet = function () {
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
SetModel.prototype.setResponse = function (status = 200, error = false, data = {}) {
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
SetModel.prototype.sendResponse = async function (res) {
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
SetModel.prototype.sanitizeMeasurements = function (input) {
  const measies = {}
  if (typeof input !== 'object') return measies
  for (const [m, val] of Object.entries(input)) {
    if (this.config.measies.includes(m) && typeof val === 'number' && val > 0) measies[m] = val
  }

  return measies
}
