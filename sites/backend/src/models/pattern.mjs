import { log } from '../utils/log.mjs'
import { capitalize } from '../utils/index.mjs'
import { storeImage } from '../utils/cloudflare-images.mjs'
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
  // Set this one initially as we need the ID to store an image on cloudflare
  data.img = this.config.avatars.pattern

  // Create record
  await this.unguardedCreate(data)

  // Update img? (now that we have the ID)
  const img =
    this.config.use.cloudflareImages &&
    typeof body.img === 'string' &&
    (!body.test || (body.test && this.config.use.tests?.cloudflareImages))
      ? await storeImage({
          id: `pattern-${this.record.id}`,
          metadata: { user: user.uid },
          b64: body.img,
        })
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
    const img = await storeImage({
      id: `pattern-${this.record.id}`,
      metadata: { user: this.user.uid },
      b64: body.img,
    })
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

const migratePattern = (v2, userId) => ({
  createdAt: new Date(v2.created ? v2.created : v2.createdAt),
  data: { version: v2.data.version, notes: ['Migrated from version 2'] },
  design: v2.design || v2.data.design,
  name: v2.name || '--',
  notes: v2.notes ? v2.notes + '\n\nMigrated from v2' : 'Migrated from v2',
  settings: v2.data.settings,
  userId,
})

const v2lut = {
  'size 28, with breasts': 1,
  'size 30, with breasts': 2,
  'size 32, with breasts': 3,
  'size 34, with breasts': 4,
  'size 36, with breasts': 5,
  'size 38, with breasts': 6,
  'size 40, with breasts': 7,
  'size 42, with breasts': 8,
  'size 44, with breasts': 9,
  'size 46, with breasts': 10,
  'size-28-b': 1,
  'size-30-b': 2,
  'size-32-b': 3,
  'size-34-b': 4,
  'size-36-b': 5,
  'size-38-b': 6,
  'size-40-b': 7,
  'size-42-b': 8,
  'size-44-b': 9,
  'size-46-b': 10,
  'size-28-with-breasts': 1,
  'size-30-with-breasts': 2,
  'size-32-with-breasts': 3,
  'size-34-with-breasts': 4,
  'size-36-with-breasts': 5,
  'size-38-with-breasts': 6,
  'size-40-with-breasts': 7,
  'size-42-with-breasts': 8,
  'size-44-with-breasts': 9,
  'size-46-with-breasts': 10,
  'größe 28, mit brüsten': 1,
  'größe 30, mit brüsten': 2,
  'größe 32, mit brüsten': 3,
  'größe 34, mit brüsten': 4,
  'größe 36, mit brüsten': 5,
  'größe 38, mit brüsten': 6,
  'größe 40, mit brüsten': 7,
  'größe 42, mit brüsten': 8,
  'größe 44, mit brüsten': 9,
  'größe 46, mit brüsten': 10,
  'taille 28, avec des seins': 1,
  'taille 30, avec des seins': 2,
  'taille 32, avec des seins': 3,
  'taille 34, avec des seins': 4,
  'taille 36, avec des seins': 5,
  'taille 38, avec des seins': 6,
  'taille 40, avec des seins': 7,
  'taille 42, avec des seins': 8,
  'taille 44, avec des seins': 9,
  'taille 46, avec des seins': 10,
  'tamaño 28, con pechos': 1,
  'tamaño 30, con pechos': 2,
  'tamaño 32, con pechos': 3,
  'tamaño 34, con pechos': 4,
  'tamaño 36, con pechos': 5,
  'tamaño 38, con pechos': 6,
  'tamaño 40, con pechos': 7,
  'tamaño 42, con pechos': 8,
  'tamaño 44, con pechos': 9,
  'tamaño 46, con pechos': 10,

  'size 32, without breasts': 11,
  'size 34, without breasts': 12,
  'size 36, without breasts': 13,
  'size 38, without breasts': 14,
  'size 40, without breasts': 15,
  'size 42, without breasts': 16,
  'size 44, without breasts': 17,
  'size 46, without breasts': 18,
  'size 48, without breasts': 19,
  'size 50, without breasts': 20,
  'taille 32, sans seins': 11,
  'taille 34, sans seins': 12,
  'taille 36, sans seins': 13,
  'taille 38, sans seins': 14,
  'taille 40, sans seins': 15,
  'taille 42, sans seins': 16,
  'taille 44, sans seins': 17,
  'taille 46, sans seins': 18,
  'taille 48, sans seins': 19,
  'taille 50, sans seins': 20,
  'size-32-a': 11,
  'size-34-a': 12,
  'size-36-a': 13,
  'size-38-a': 14,
  'size-40-a': 15,
  'size-42-a': 16,
  'size-44-a': 17,
  'size-46-a': 18,
  'size-48-a': 19,
  'size-50-a': 20,
  'maat 32, zonder borsten': 11,
  'maat 34, zonder borsten': 12,
  'maat 36, zonder borsten': 13,
  'maat 38, zonder borsten': 14,
  'maat 40, zonder borsten': 15,
  'maat 42, zonder borsten': 16,
  'maat 44, zonder borsten': 17,
  'maat 46, zonder borsten': 18,
  'maat 48, zonder borsten': 19,
  'maat 50, zonder borsten': 20,
  'größe 32, ohne brüste': 11,
  'größe 34, ohne brüste': 12,
  'größe 36, ohne brüste': 13,
  'größe 38, ohne brüste': 14,
  'größe 40, ohne brüste': 15,
  'größe 42, ohne brüste': 16,
  'größe 44, ohne brüste': 17,
  'größe 46, ohne brüste': 18,
  'größe 48, ohne brüste': 19,
  'größe 50, ohne brüste': 20,
  'tamaño 32, sin pechos': 11,
  'tamaño 34, sin pechos': 12,
  'tamaño 36, sin pechos': 13,
  'tamaño 38, sin pechos': 14,
  'tamaño 40, sin pechos': 15,
  'tamaño 42, sin pechos': 16,
  'tamaño 44, sin pechos': 17,
  'tamaño 46, sin pechos': 18,
  'tamaño 48, sin pechos': 19,
  'tamaño 50, sin pechos': 20,
}
/*
 * This is a special route not available for API users
 */
PatternModel.prototype.import = async function (v2user, lut, userId) {
  for (const [handle, pattern] of Object.entries(v2user.patterns)) {
    let skip = false
    const data = { ...migratePattern(pattern, userId), userId }
    if (lut[pattern.person]) data.setId = lut[pattern.person]
    else if (v2lut[pattern.person]) data.csetId = v2lut[pattern.person]
    else if (pattern.person.length !== 5 && !['any', 'original'].includes(pattern.person)) {
      console.log(`Cannot find ${pattern.person}`, pattern, { lut, v2lut })
      process.exit()
    }
    if (!data.design || ['theo', 'ursula', 'unice'].includes(data.design)) skip = true
    if (!skip) {
      // V2 does not support images for patterns
      data.img = 'default-avatar'
      const cloaked = await this.cloak(data)
      try {
        this.record = await this.prisma.pattern.create({ data: cloaked })
      } catch (err) {
        log.warn(err, 'Could not create pattern')
        console.log(data)
      }
    }
  }
}
