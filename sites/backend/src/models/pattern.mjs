import { log } from '../utils/log.mjs'
import { capitalize } from '../utils/index.mjs'
import { setPatternAvatar } from '../utils/sanity.mjs'
import yaml from 'js-yaml'
import { SetModel } from './set.mjs'

export function PatternModel(tools) {
  this.config = tools.config
  this.prisma = tools.prisma
  this.decrypt = tools.decrypt
  this.encrypt = tools.encrypt
  this.rbac = tools.rbac
  this.encryptedFields = ['data', 'img', 'name', 'notes', 'settings']
  this.clear = {} // For holding decrypted data
  this.Set = new SetModel(tools)

  return this
}

/*
 * Returns a list of sets for the user making the API call
 */
PatternModel.prototype.userPatterns = async function (uid) {
  if (!uid) return false
  let patterns
  try {
    patterns = await this.prisma.pattern.findMany({
      where: { userId: uid },
      include: {
        set: true,
        cset: true,
      },
    })
  } catch (err) {
    log.warn(`Failed to search patterns for user ${uid}: ${err}`)
  }
  const list = []
  for (const pattern of patterns) list.push(this.revealPattern(pattern))

  return list
}

PatternModel.prototype.guardedCreate = async function ({ body, user }) {
  if (!this.rbac.user(user)) return this.setResponse(403, 'insufficientAccessLevel')
  if (Object.keys(body).length < 2) return this.setResponse(400, 'postBodyMissing')
  if (!body.set && !body.cset) return this.setResponse(400, 'setOrCsetMissing')
  if (typeof body.set !== 'undefined' && typeof body.set !== 'number')
    return this.setResponse(400, 'setNotNumeric')
  if (typeof body.cset !== 'undefined' && typeof body.cset !== 'number')
    return this.setResponse(400, 'csetNotNumeric')
  if (typeof body.settings !== 'object') return this.setResponse(400, 'settingsNotAnObject')
  if (body.data && typeof body.data !== 'object') return this.setResponse(400, 'dataNotAnObject')
  if (!body.design && !body.data?.design) return this.setResponse(400, 'designMissing')
  if (typeof body.design !== 'string') return this.setResponse(400, 'designNotStringy')

  // Prepare data
  const data = {
    design: body.design,
    settings: body.settings,
  }
  if (data.settings.measurements) delete data.settings.measurements
  if (body.set) data.setId = body.set
  else if (body.cset) data.csetId = body.cset
  else return this.setResponse(400, 'setOrCsetMissing')

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
    (!body.test || (body.test && this.config.use.tests?.sanity))
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
    this.record = await this.prisma.pattern.findUnique({
      where,
      include: {
        set: true,
        cset: true,
      },
    })
  } catch (err) {
    log.warn({ err, where }, 'Could not read pattern')
  }

  this.reveal()

  return this.setExists()
}

/*
 * Loads a pattern from the database but only if it's public
 *
 * Stores result in this.record
 */
PatternModel.prototype.publicRead = async function ({ params }) {
  await this.read({ id: parseInt(params.id) })
  if (this.record.public !== true) {
    // Note that we return 404
    // because we don't want to reveal that a non-public pattern exists.
    return this.setResponse(404)
  }

  return this.setResponse(200, false, this.asPublicPattern(), true)
}

/*
 * Loads a pattern from the database based on the where clause you pass it
 * In addition prepares it for returning the pattern data
 *
 * Stores result in this.record
 */
PatternModel.prototype.guardedRead = async function ({ params, user }) {
  if (!this.rbac.readSome(user)) return this.setResponse(403, 'insufficientAccessLevel')
  if (user.iss && user.status < 1) return this.setResponse(403, 'accountStatusLacking')
  if (typeof params.id !== 'undefined' && !Number(params.id))
    return this.setResponse(403, 'idNotNumeric')

  await this.read({ id: parseInt(params.id) })
  if (!this.record) return this.setResponse(404, 'notFound')

  if (this.record.userId !== user.uid && !this.rbac.bughunter(user)) {
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
  if (!this.rbac.writeSome(user)) return this.setResponse(403, 'insufficientAccessLevel')
  if (user.iss && user.status < 1) return this.setResponse(403, 'accountStatusLacking')

  await this.read({ id: parseInt(params.id) })
  if (this.record.userId !== user.uid && !this.record.public && !this.rbac.support(user)) {
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

  // Parse JSON content
  if (this.record?.cset) {
    for (const lang of this.config.languages) {
      const key = `tags${capitalize(lang)}`
      if (this.record.cset[key]) this.record.cset[key] = JSON.parse(this.record.cset[key])
    }
    if (this.record.cset.measies) this.record.cset.measies = JSON.parse(this.record.cset.measies)
  }
  if (this.record?.set) {
    this.record.set = this.Set.revealSet(this.record.set)
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
      include: {
        set: true,
        cset: true,
      },
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
  if (!this.rbac.writeSome(user)) return this.setResponse(403, 'insufficientAccessLevel')
  if (user.iss && user.status < 1) return this.setResponse(403, 'accountStatusLacking')
  await this.read({ id: parseInt(params.id) })
  if (this.record.userId !== user.uid && !this.rbac.admin(user)) {
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
  await this.prisma.pattern.delete({ where: { id: this.record.id } })
  this.record = null
  this.clear = null

  return this.setExists()
}

/*
 * Removes the pattern - Checks permissions
 */
PatternModel.prototype.guardedDelete = async function ({ params, user }) {
  if (!this.rbac.writeSome(user)) return this.setResponse(403, 'insufficientAccessLevel')
  if (user.iss && user.status < 1) return this.setResponse(403, 'accountStatusLacking')

  await this.read({ id: parseInt(params.id) })
  if (this.record.userId !== user.uid && !this.rbac.admin(user)) {
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
 * Helper method to decrypt data from a non-instantiated pattern
 */
PatternModel.prototype.revealPattern = function (pattern) {
  const clear = {}
  for (const field of this.encryptedFields) {
    try {
      clear[field] = this.decrypt(pattern[field])
    } catch (err) {
      //console.log(err)
    }
  }
  if (pattern.set) delete pattern.set.measies
  if (pattern.cset) delete pattern.cset.measies

  return { ...pattern, ...clear }
}

/*
 * Helper method to set the response code, result, and body
 *
 * Will be used by this.sendResponse()
 */
PatternModel.prototype.setResponse = function (
  status = 200,
  error = false,
  data = {},
  rawData = false
) {
  this.response = {
    status,
    body: rawData
      ? data
      : {
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

/*
 * Helper method to send response as YAML
 */
PatternModel.prototype.sendYamlResponse = async function (res) {
  return res.status(this.response.status).type('yaml').send(yaml.dump(this.response.body))
}

/*
 * Returns record data fit for public publishing
 */
PatternModel.prototype.asPublicPattern = function () {
  const data = {
    author: 'FreeSewing.org',
    type: 'pattern',
    ...this.asPattern(),
  }
  delete data.userId
  delete data.public

  return data
}
