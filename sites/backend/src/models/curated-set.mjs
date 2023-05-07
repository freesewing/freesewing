import { capitalize } from '../utils/index.mjs'
import { log } from '../utils/log.mjs'
import { setSetAvatar } from '../utils/sanity.mjs'
import yaml from 'js-yaml'

export function CuratedSetModel(tools) {
  this.config = tools.config
  this.prisma = tools.prisma
  this.rbac = tools.rbac

  return this
}

CuratedSetModel.prototype.guardedCreate = async function ({ body, user }) {
  if (!this.rbac.curator(user)) return this.setResponse(403, 'insufficientAccessLevel')
  if (Object.keys(body).length < 1) return this.setResponse(400, 'postBodyMissing')
  if (!body.nameEn || typeof body.nameEn !== 'string') return this.setResponse(400, 'nameEnMissing')

  // Prepare data
  const data = {}
  for (const lang of this.config.languages) {
    for (const field of ['name', 'notes']) {
      const key = field + capitalize(lang)
      if (body[key] && typeof body[key] === 'string') data[key] = body[key]
    }
  }
  if (body.measies) data.measies = this.sanitizeMeasurements(body.measies)
  else data.measies = {}
  // Set this one initially as we need the ID to create a custom img via Sanity
  data.img = this.config.avatars.set

  // Create record
  await this.unguardedCreate(data)

  // Update img? (now that we have the ID)
  const img =
    this.config.use.sanity &&
    typeof body.img === 'string' &&
    (!body.test || (body.test && this.config.use.tests?.sanity))
      ? await setSetAvatar(this.record.id, body.img)
      : false

  if (img) await this.unguardedUpdate({ img: img.url })
  else await this.read({ id: this.record.id })

  return this.setResponse(201, 'created', { curatedSet: this.asCuratedSet() })
}

CuratedSetModel.prototype.unguardedCreate = async function (data) {
  // FIXME: See https://github.com/prisma/prisma/issues/3786
  if (data.measies && typeof data.measies === 'object') data.measies = JSON.stringify(data.measies)
  try {
    this.record = await this.prisma.curatedSet.create({ data })
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
CuratedSetModel.prototype.read = async function (where) {
  try {
    this.record = await this.prisma.curatedSet.findUnique({ where })
  } catch (err) {
    log.warn({ err, where }, 'Could not read measurements set')
  }

  // FIXME: Convert JSON to object. See https://github.com/prisma/prisma/issues/3786
  this.record.measies = JSON.parse(this.record.measies)

  return this.curatedSetExists()
}

/*
 * Loads a measurements set from the database based on the where clause you pass it
 * In addition prepares it for returning the set data
 *
 * Stores result in this.record
 */
CuratedSetModel.prototype.guardedRead = async function ({ params }, format = false) {
  await this.read({ id: parseInt(params.id) })

  if (!format)
    return this.setResponse(200, false, {
      result: 'success',
      curatedSet: this.asCuratedSet(),
    })

  return this.setResponse(200, false, this.asData(), true)
}

/*
 * Returns a list of all curated sets
 */
CuratedSetModel.prototype.allCuratedSets = async function () {
  let curatedSets
  try {
    curatedSets = await this.prisma.curatedSet.findMany()
  } catch (err) {
    log.warn(`Failed to search curated sets: ${err}`)
  }
  const list = []
  for (const curatedSet of curatedSets) list.push(curatedSet)

  return list
}

/*
 * Clones a curated measurements set (into a regular set)
 * In addition prepares it for returning the set data
 *
 * Stores result in this.record
 */
CuratedSetModel.prototype.guardedClone = async function ({ params, user, body }, Set) {
  if (!this.rbac.writeSome(user)) return this.setResponse(403, 'insufficientAccessLevel')
  if (user.iss && user.status < 1) return this.setResponse(403, 'accountStatusLacking')
  if (!body.language || !this.config.languages.includes(body.language))
    return this.setResponse(403, 'languageMissing')

  await this.read({ id: parseInt(params.id) })

  // Clone curated set
  const data = {}
  const lang = capitalize(body.language.toLowerCase())
  data.name = this.record[`name${lang}`]
  data.notes = this.record[`notes${lang}`]
  data.measies = this.record.measies

  await Set.guardedCreate({ params, user, body: data })

  return
}

/*
 * Checks this.record and sets a boolean to indicate whether
 * the curated set exists or not
 *
 * Stores result in this.exists
 */
CuratedSetModel.prototype.curatedSetExists = function () {
  this.exists = this.record ? true : false

  return this
}

/*
 * Updates the set data - Used when we create the data ourselves
 * so we know it's safe
 */
CuratedSetModel.prototype.unguardedUpdate = async function (data) {
  // FIXME: Convert object to JSON. See https://github.com/prisma/prisma/issues/3786
  if (data.measies && typeof data.measies === 'object') data.measies = JSON.stringify(data.measies)

  try {
    this.record = await this.prisma.curatedSet.update({
      where: { id: this.record.id },
      data,
    })
    // FIXME: Convert JSON to object. See https://github.com/prisma/prisma/issues/3786
    this.record.measies = JSON.parse(this.record.measies)
  } catch (err) {
    log.warn(err, 'Could not update set record')
    process.exit()
    return this.setResponse(500, 'updateSetFailed')
  }

  return this.setResponse(200)
}

/*
 * Updates the set data - Used when we pass through user-provided data
 * so we can't be certain it's safe
 */
CuratedSetModel.prototype.guardedUpdate = async function ({ params, body, user }) {
  if (!this.rbac.curator(user)) return this.setResponse(403, 'insufficientAccessLevel')
  if (user.iss && user.status < 1) return this.setResponse(403, 'accountStatusLacking')
  await this.read({ id: parseInt(params.id) })

  // Prepare data
  const data = {}
  for (const lang of this.config.languages) {
    for (const field of ['name', 'notes']) {
      const key = field + capitalize(lang)
      if (body[key] && typeof body[key] === 'string') data[key] = body[key]
    }
  }
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
    data.measies = { ...this.record.measies, ...measies }
    for (const key of remove) delete data.measies[key]
  }

  // Image (img)
  if (typeof body.img === 'string') {
    const img = await setSetAvatar(params.id, body.img)
    data.img = img.url
  }

  // Now update the record
  await this.unguardedUpdate(data)

  return this.setResponse(200, false, { set: this.asCuratedSet() })
}

/*
 * Removes the set - No questions asked
 */
CuratedSetModel.prototype.unguardedDelete = async function () {
  await this.prisma.curatedSet.delete({ where: { id: this.record.id } })
  this.record = null
  this.clear = null

  return this.curatedSetExists()
}

/*
 * Removes the set - Checks permissions
 */
CuratedSetModel.prototype.guardedDelete = async function ({ params, user }) {
  if (!this.rbac.curator(user)) return this.setResponse(403, 'insufficientAccessLevel')
  if (user.iss && user.status < 1) return this.setResponse(403, 'accountStatusLacking')

  await this.read({ id: parseInt(params.id) })
  if (this.record.userId !== user.uid && user.level < 8) {
    return this.setResponse(403, 'insufficientAccessLevel')
  }

  await this.unguardedDelete()

  return this.setResponse(204, false)
}

/*
 * Returns record data fit for public publishing
 */
CuratedSetModel.prototype.asCuratedSet = function () {
  return { ...this.record }
}

/*
 * Returns record data fit for public publishing
 */
CuratedSetModel.prototype.asData = function () {
  const data = {
    author: 'FreeSewing.org',
    type: 'curatedMeasurementsSet',
    about: 'Contains measurements in mm as well as metadata',
    ...this.asCuratedSet(),
  }
  data.measurements = data.measies
  delete data.measies

  return data
}

/*
 * Helper method to set the response code, result, and body
 *
 * Will be used by this.sendResponse()
 */
CuratedSetModel.prototype.setResponse = function (
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

  return this.curatedSetExists()
}

/*
 * Helper method to send response (as JSON)
 */
CuratedSetModel.prototype.sendResponse = async function (res) {
  return res.status(this.response.status).send(this.response.body)
}

/*
 * Helper method to send response as YAML
 */
CuratedSetModel.prototype.sendYamlResponse = async function (res) {
  return res.status(this.response.status).type('yaml').send(yaml.dump(this.response.body))
}

/* Helper method to parse user-supplied measurements */
CuratedSetModel.prototype.sanitizeMeasurements = function (input) {
  const measies = {}
  if (typeof input !== 'object') return measies
  for (const [m, val] of Object.entries(input)) {
    if (this.config.measies.includes(m) && typeof val === 'number' && val > 0) measies[m] = val
  }

  return measies
}
