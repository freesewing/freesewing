import { log } from '../utils/log.mjs'
import { setPatternAvatar } from '../utils/sanity.mjs'

export function PatternModel(tools) {
  this.config = tools.config
  this.prisma = tools.prisma
  this.decrypt = tools.decrypt
  this.encrypt = tools.encrypt
  this.encryptedFields = ['data', 'img', 'name', 'notes', 'settings']
  this.clear = {} // For holding decrypted data

  return this
}

PatternModel.prototype.guardedCreate = async function ({ body, user }) {
  if (user.level < 3) return this.setResponse(403, 'insufficientAccessLevel')
  if (Object.keys(body).length < 2) return this.setResponse(400, 'postBodyMissing')
  if (!body.set) return this.setResponse(400, 'setMissing')
  if (typeof body.set !== 'number') return this.setResponse(400, 'setNotNumeric')
  if (typeof body.settings !== 'object') return this.setResponse(400, 'settingsNotAnObject')
  if (body.data && typeof body.data !== 'object') return this.setResponse(400, 'dataNotAnObject')
  if (!body.design && !body.data?.design) return this.setResponse(400, 'designMissing')
  if (typeof body.design !== 'string') return this.setResponse(400, 'designNotStringy')

  // Prepare data
  const data = {
    design: body.design,
    setId: body.set,
    settings: body.settings,
  }
  // Data (will be encrypted, so always set _some_ value)
  if (typeof body.data === 'object') data.data = body.data
  else data.data = {}
  // Name (will be encrypted, so always set _some_ value)
  if (typeof body.name === 'string' && body.name.length > 0) data.name = body.name
  else data.name = '--'
  // Notes (will be encrypted, so always set _some_ value)
  if (typeof body.notes === 'string' && body.notes.length > 0) data.notes = body.notes
  else data.notes = '--'
  // Public
  if (body.public === true) data.public = true
  data.userId = user.uid
  // Set this one initially as we need the ID to create a custom img via Sanity
  data.img = this.config.avatars.pattern

  // Create record
  await this.unguardedCreate(data)

  // Update img? (now that we have the ID)
  const img =
    this.config.use.sanity &&
    typeof body.img === 'string' &&
    (!body.unittest || (body.unittest && this.config.use.tests?.sanity))
      ? await setPatternAvatar(this.record.id, body.img)
      : false

  if (img) await this.unguardedUpdate(this.cloak({ img: img.url }))
  else await this.read({ id: this.record.id })

  return this.setResponse(201, 'created', { pattern: this.asPattern() })
}

PatternModel.prototype.unguardedCreate = async function (data) {
  try {
    this.record = await this.prisma.pattern.create({ data: this.cloak(data) })
  } catch (err) {
    log.warn(err, 'Could not create pattern')
    return this.setResponse(500, 'createPatternFailed')
  }

  return this
}

/*
 * Loads a pattern from the database based on the where clause you pass it
 *
 * Stores result in this.record
 */
PatternModel.prototype.read = async function (where) {
  try {
    this.record = await this.prisma.pattern.findUnique({ where })
  } catch (err) {
    log.warn({ err, where }, 'Could not read pattern')
  }

  this.reveal()

  return this.setExists()
}

/*
 * Loads a pattern from the database based on the where clause you pass it
 * In addition prepares it for returning the pattern data
 *
 * Stores result in this.record
 */
PatternModel.prototype.guardedRead = async function ({ params, user }) {
  if (user.level < 1) return this.setResponse(403, 'insufficientAccessLevel')
  if (user.iss && user.status < 1) return this.setResponse(403, 'accountStatusLacking')

  await this.read({ id: parseInt(params.id) })
  if (this.record.userId !== user.uid && user.level < 5) {
    return this.setResponse(403, 'insufficientAccessLevel')
  }

  return this.setResponse(200, false, {
    result: 'success',
    pattern: this.asPattern(),
  })
}

/*
 * Clones a pattern
 * In addition prepares it for returning the pattern data
 *
 * Stores result in this.record
 */
PatternModel.prototype.guardedClone = async function ({ params, user }) {
  if (user.level < 3) return this.setResponse(403, 'insufficientAccessLevel')
  if (user.iss && user.status < 1) return this.setResponse(403, 'accountStatusLacking')

  await this.read({ id: parseInt(params.id) })
  if (this.record.userId !== user.uid && !this.record.public && user.level < 5) {
    return this.setResponse(403, 'insufficientAccessLevel')
  }

  // Clone pattern
  const data = this.asPattern()
  delete data.id
  data.name += ` (cloned from #${this.record.id})`
  data.notes += ` (Note: This pattern was cloned from pattern #${this.record.id})`
  await this.unguardedCreate(data)

  // Update unencrypted data
  this.reveal()

  return this.setResponse(200, false, {
    result: 'success',
    pattern: this.asPattern(),
  })
}

/*
 * Helper method to decrypt at-rest data
 */
PatternModel.prototype.reveal = async function () {
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
PatternModel.prototype.cloak = function (data) {
  for (const field of this.encryptedFields) {
    if (typeof data[field] !== 'undefined') {
      data[field] = this.encrypt(data[field])
    }
  }

  return data
}

/*
 * Checks this.record and sets a boolean to indicate whether
 * the pattern exists or not
 *
 * Stores result in this.exists
 */
PatternModel.prototype.setExists = function () {
  this.exists = this.record ? true : false

  return this
}

/*
 * Updates the pattern data - Used when we create the data ourselves
 * so we know it's safe
 */
PatternModel.prototype.unguardedUpdate = async function (data) {
  try {
    this.record = await this.prisma.pattern.update({
      where: { id: this.record.id },
      data,
    })
  } catch (err) {
    log.warn(err, 'Could not update pattern record')
    process.exit()
    return this.setResponse(500, 'updatePatternFailed')
  }
  await this.reveal()

  return this.setResponse(200)
}

/*
 * Updates the pattern data - Used when we pass through user-provided data
 * so we can't be certain it's safe
 */
PatternModel.prototype.guardedUpdate = async function ({ params, body, user }) {
  if (user.level < 3) return this.setResponse(403, 'insufficientAccessLevel')
  if (user.iss && user.status < 1) return this.setResponse(403, 'accountStatusLacking')
  await this.read({ id: parseInt(params.id) })
  if (this.record.userId !== user.uid && user.level < 8) {
    return this.setResponse(403, 'insufficientAccessLevel')
  }
  const data = {}
  // Name
  if (typeof body.name === 'string') data.name = body.name
  // Notes
  if (typeof body.notes === 'string') data.notes = body.notes
  // Public
  if (body.public === true || body.public === false) data.public = body.public
  // Data
  if (typeof body.data === 'object') data.data = body.data
  // Settings
  if (typeof body.settings === 'object') data.settings = body.settings
  // Image (img)
  if (typeof body.img === 'string') {
    const img = await setPatternAvatar(params.id, body.img)
    data.img = img.url
  }

  // Now update the record
  await this.unguardedUpdate(this.cloak(data))

  return this.setResponse(200, false, { pattern: this.asPattern() })
}

/*
 * Removes the pattern - No questions asked
 */
PatternModel.prototype.unguardedDelete = async function () {
  await this.prisma.pattern.delete({ here: { id: this.record.id } })
  this.record = null
  this.clear = null

  return this.setExists()
}

/*
 * Removes the pattern - Checks permissions
 */
PatternModel.prototype.guardedDelete = async function ({ params, user }) {
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
PatternModel.prototype.asPattern = function () {
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
PatternModel.prototype.setResponse = function (status = 200, error = false, data = {}) {
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
PatternModel.prototype.sendResponse = async function (res) {
  return res.status(this.response.status).send(this.response.body)
}
