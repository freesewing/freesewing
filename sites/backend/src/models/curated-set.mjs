import { capitalize } from '../utils/index.mjs'
import { log } from '../utils/log.mjs'
import { storeImage } from '../utils/cloudflare-images.mjs'
import { decorateModel } from '../utils/model-decorator.mjs'

/*
 * This model handles all curated set updates
 */
export function CuratedSetModel(tools) {
  return decorateModel(this, tools, {
    name: 'curatedSet',
    jsonFields: ['measies', 'tagsDe', 'tagsEn', 'tagsEs', 'tagsFr', 'tagsNl', 'tagsUk'],
  })
}

/*
 * Creates a curated set
 *
 * @param {body} object - The request body
 * @returns {CuratedSetModel} object - The CureatedSetModel
 */
CuratedSetModel.prototype.guardedCreate = async function ({ body, user }) {
  /*
   * Enforce RBAC
   */
  if (!this.rbac.curator(user)) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * Do we have a POST body?
   */
  if (Object.keys(body).length < 1) return this.setResponse(400, 'postBodyMissing')

  /*
   * Is nameEn set?
   */
  if (!body.nameEn || typeof body.nameEn !== 'string') return this.setResponse(400, 'nameEnMissing')

  /*
   * Prepare data to create the record
   * A curated set is special in that it has a name and notes like a regular set, but it
   * has those in every supported languages (eg nameEn and notesEn)
   * So we need to iterated over languages + fields
   */
  const data = {}
  for (const lang of this.config.languages) {
    for (const field of ['name', 'notes']) {
      const key = field + capitalize(lang)
      if (body[key] && typeof body[key] === 'string') data[key] = body[key]
    }
    const key = 'tags' + capitalize(lang)
    if (body[key] && Array.isArray(body[key])) data[key] = JSON.stringify(body[key])
  }

  /*
   * Add the (sanitized) measurements if there are any
   */
  if (body.measies) data.measies = JSON.stringify(this.sanitizeMeasurements(body.measies))
  else data.measies = '{}'

  /*
   * Set an initial img as we need the record ID to store an image on cloudflare
   */
  data.img = this.config.avatars.set

  /*
   * Create the database record
   */
  await this.createRecord(data)

  /*
   * Now that we have a record and ID, we can update the image after uploading it to cloudflare
   */
  const img = await storeImage(
    {
      id: `cset-${this.record.id}`,
      metadata: { user: user.uid },
      b64: body.img,
    },
    this.isTest(body)
  )

  /*
   * If an image was uploaded, update the record with the image ID
   */
  if (img) await this.update({ img: img.url })
  /*
   * If not, just read the record from the datbasa
   */ else await this.read({ id: this.record.id })

  /*
   * Record created, return data in the proper format
   */
  return this.setResponse201({ curatedSet: this.asCuratedSet() })
}

/*
 * Loads a measurements set from the database based on the where clause you pass it
 * In addition prepares it for returning the set data
 *
 * @param {params} object - The (URL) params from the request
 * @param {format} string - The format to use (json or yaml)
 * @returns {CuratedSetModel} object - The CureatedSetModel
 */
CuratedSetModel.prototype.guardedRead = async function ({ params }, format = false) {
  /*
   * Read record from database
   */
  await this.read({ id: parseInt(params.id) })

  /*
   * If no format is specified, return as object
   */
  if (!format)
    return this.setResponse200({
      result: 'success',
      curatedSet: this.asCuratedSet(),
    })

  return this.setResponse200(this.asData(), true)
}

/*
 * Returns a list of all curated sets
 *
 * @returns {list} array - The list of curated sets
 */
CuratedSetModel.prototype.allCuratedSets = async function () {
  /*
   * Attempt to read all curates sets from the database
   */
  let curatedSets
  try {
    curatedSets = await this.prisma.curatedSet.findMany()
  } catch (err) {
    log.warn(`Failed to search curated sets: ${err}`)
  }

  /*
   * Iterate over list to do some housekeeping and JSON wrangling
   */
  const list = []
  for (const curatedSet of curatedSets) {
    const asPojo = { ...curatedSet }
    /*
     * We need to parse this from JSON
     * See https://github.com/prisma/prisma/issues/3786
     */
    asPojo.measies = JSON.parse(asPojo.measies)
    for (const lang of this.config.languages) {
      const key = `tags${capitalize(lang)}`
      asPojo[key] = JSON.parse(asPojo[key] || [])
    }
    list.push(asPojo)
  }

  return list
}

/*
 * Clones a curated measurements set (into a regular set)
 * In addition prepares it for returning the set data
 *
 * @param {params} object - The (URL) params from the request
 * @param {user} string - The user object as loaded by auth middleware
 * @param {body} string - The request body
 * @param {Set} SetModel - The Set to clone into
 * @returns {CuratedSetModel} object - The CureatedSetModel
 */
CuratedSetModel.prototype.guardedClone = async function ({ params, user, body }, Set) {
  /*
   * Enforce RBAC
   */
  if (!this.rbac.writeSome(user)) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * Verify JWT
   */
  if (user.iss && user.status < 1) return this.setResponse(403, 'accountStatusLacking')

  /*
   * Is language set?
   */
  if (!body.language || !this.config.languages.includes(body.language))
    return this.setResponse(403, 'languageMissing')

  /*
   * Read record from database
   */
  await this.read({ id: parseInt(params.id) })

  /*
   * Create data for the cloned set
   */
  const lang = capitalize(body.language.toLowerCase())
  const data = {
    lang,
    name: this.record[`name${lang}`],
    notes: this.record[`notes${lang}`],
    measies: this.record.measies,
  }

  /*
   * Clone curated set into regular set
   */
  await Set.guardedCreate({ params, user, body: data })

  return
}

/*
 * Updates the set data - Used when we pass through user-provided data
 * so we can't be certain it's safe
 *
 * @param {params} object - The (URL) params from the request
 * @param {body} string - The request body
 * @param {user} string - The user object as loaded by auth middleware
 * @returns {CuratedSetModel} object - The CureatedSetModel
 */
CuratedSetModel.prototype.guardedUpdate = async function ({ params, body, user }) {
  /*
   * Enforce RBAC
   */
  if (!this.rbac.curator(user)) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * Verify JWT token for user status
   */
  if (user.iss && user.status < 1) return this.setResponse(403, 'accountStatusLacking')

  /*
   * Attempt to read database record
   */
  await this.read({ id: parseInt(params.id) })

  /*
   * Prepare data for updating the record
   */
  const data = {}
  /*
   * Unlike a regular set, curated set have notes and name in each language
   */
  for (const lang of this.config.languages) {
    for (const field of ['name', 'notes']) {
      const key = field + capitalize(lang)
      if (body[key] && typeof body[key] === 'string') data[key] = body[key]
    }
  }

  /*
   * Handle the measurements
   */
  if (typeof body.measies === 'object') {
    data.measies = JSON.stringify(
      this.sanitizeMeasurements({
        ...this.record.measies,
        ...body.measies,
      })
    )
  }

  /*
   * Handle the image, if there is one
   */
  if (typeof body.img === 'string') {
    const img = await storeImage(
      {
        id: `cset-${this.record.id}`,
        metadata: { user: this.user.uid },
        b64: body.img,
      },
      this.isTest(body)
    )
    data.img = img.url
  }

  /*
   * Now update the record
   */
  await this.update(data)

  /*
   * Return 200 with updated data
   */
  return this.setResponse200({ set: this.asCuratedSet() })
}

/*
 * Removes the set - But checks permissions
 *
 * @param {params} object - The (URL) params from the request
 * @param {user} string - The user object as loaded by auth middleware
 * @returns {CuratedSetModel} object - The CureatedSetModel
 */
CuratedSetModel.prototype.guardedDelete = async function ({ params, user }) {
  /*
   * Enforce RBAC
   */
  if (!this.rbac.curator(user)) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * Make sure the account is ok by checking the JWT
   */
  if (user.iss && user.status < 1) return this.setResponse(403, 'accountStatusLacking')

  /*
   * Find the database record
   */
  await this.read({ id: parseInt(params.id) })

  /*
   * Now delete it
   */
  await this.delete()

  /*
   * Return 204
   */
  return this.setResponse(204, false)
}

/*
 * Returns record data fit for public publishing
 *
 * @returns {curatedSet} object - The Cureated Set as a plain object
 */
CuratedSetModel.prototype.asCuratedSet = function () {
  return this.record
}

/*
 * Returns record data fit for public publishing
 *
 * @returns {curatedSet} object - The Cureated Set as a plain object
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
