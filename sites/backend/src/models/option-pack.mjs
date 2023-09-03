import { capitalize } from '../utils/index.mjs'
import { log } from '../utils/log.mjs'
import { replaceImage } from '../utils/cloudflare-images.mjs'
import { decorateModel } from '../utils/model-decorator.mjs'

/*
 * This model handles all option pack updates
 */
export function OptionPackModel(tools) {
  return decorateModel(this, tools, {
    name: 'optionPack',
    jsonFields: ['options', 'tagsDe', 'tagsEn', 'tagsEs', 'tagsFr', 'tagsNl', 'tagsUk'],
    models: ['confirmation'],
  })
}

/*
 * Creates an option pack
 *
 * @param {body} object - The request body
 * @returns {OptionPackModel} object - The OptionPackModel
 */
OptionPackModel.prototype.guardedCreate = async function ({ body, user }) {
  /*
   * Enforce RBAC
   */
  if (!this.rbac.curator(user)) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * Do we have a POST body?
   */
  if (Object.keys(body).length < 1) return this.setResponse(400, 'postBodyMissing')

  /*
   * Is design set?
   */
  if (!body.design || typeof body.design !== 'string') return this.setResponse(400, 'designMissing')
  /*
   * Is nameEn set?
   */
  if (!body.nameEn || typeof body.nameEn !== 'string') return this.setResponse(400, 'nameEnMissing')

  /*
   * Prepare data to create the record
   * An option pack has a name and notes in every supported languages
   * (eg nameEn and notesEn)
   * So we need to iterated over languages + fields
   */
  const data = {
    design: body.design.toLowerCase(),
  }
  for (const lang of this.config.languages) {
    for (const field of ['name', 'notes']) {
      const key = field + capitalize(lang)
      if (body[key] && typeof body[key] === 'string') data[key] = body[key]
    }
    const key = 'tags' + capitalize(lang)
    if (body[key] && Array.isArray(body[key])) data[key] = JSON.stringify(body[key])
  }

  /*
   * Add the options if there are any
   */
  if (body.options) data.options = JSON.stringify(this.scrubOptions(body.options))
  else data.options = '{}'

  /*
   * Set an initial img as we need the record ID to store an image on cloudflare
   */
  data.img = this.config.avatars.opack

  /*
   * Create the database record
   */
  await this.createRecord(data)

  /*
   * Now that we have a record and ID, we can update the image after uploading it to cloudflare
   */
  if (body.img) {
    const img = await replaceImage({
      id: `opack-${this.record.id}`,
      data: body.img,
      metadata: { user: user.uid },
    })
    if (img) await this.update({ img })
  }

  await this.read({ id: this.record.id })

  /*
   * Record created, return data in the proper format
   */
  return this.setResponse201({ optionPack: this.asOptionPack() })
}

/*
 * Loads an option pack from the database based on the where clause you pass it
 * In addition prepares it for returning the pack data
 *
 * @param {params} object - The (URL) params from the request
 * @param {format} string - The format to use (json or yaml)
 * @returns {OptionPackModel} object - The OptionPackModel
 */
OptionPackModel.prototype.guardedRead = async function ({ params }, format = false) {
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
      optionPack: this.asOptionPack(),
    })

  return this.setResponse200(this.asData(), true)
}

/*
 * Returns a list of all option packs
 *
 * @returns {list} array - The list of option packs
 */
OptionPackModel.prototype.allOptionPacks = async function () {
  /*
   * Attempt to read all option packs from the database
   */
  let optionPacks
  try {
    optionPacks = await this.prisma.optionPack.findMany()
  } catch (err) {
    log.warn(`Failed to search option packs: ${err}`)
  }

  /*
   * Iterate over list to do some housekeeping and JSON wrangling
   */
  const list = []
  for (const optionPack of optionPacks) {
    const asPojo = { ...optionPack }
    /*
     * We need to parse this from JSON
     * See https://github.com/prisma/prisma/issues/3786
     */
    asPojo.options = JSON.parse(asPojo.options)
    for (const lang of this.config.languages) {
      const key = `tags${capitalize(lang)}`
      asPojo[key] = JSON.parse(asPojo[key] || [])
    }
    list.push(asPojo)
  }

  return list
}

/*
 * Updates the option pack data - Used when we pass through user-provided data
 * so we can't be certain it's safe
 *
 * @param {params} object - The (URL) params from the request
 * @param {body} string - The request body
 * @param {user} string - The user object as loaded by auth middleware
 * @returns {OptionPackModel} object - The OptionPackModel
 */
OptionPackModel.prototype.guardedUpdate = async function ({ params, body, user }) {
  /*
   * Enforce RBAC
   */
  if (!this.rbac.curator(user)) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * Attempt to read database record
   */
  await this.read({ id: parseInt(params.id) })

  /*
   * Prepare data for updating the record
   */
  const data = {}
  /*
   * Option packs have notes and name in each language
   */
  for (const lang of this.config.languages) {
    for (const field of ['name', 'notes']) {
      const key = field + capitalize(lang)
      if (body[key] && typeof body[key] === 'string') data[key] = body[key]
    }
  }

  /*
   * Handle the options
   */
  if (typeof body.options === 'object') {
    data.options = JSON.stringify(
      this.scrubOptions({
        ...this.record.options,
        ...body.options,
      })
    )
  }

  /*
   * Handle the image, if there is one
   */
  if (typeof body.img === 'string') {
    const img = await replaceImage({
      id: `opack-${this.record.id}`,
      data: body.img,
      metadata: { user: user.uid },
    })
    if (img) data.img = img
  }

  /*
   * Now update the record
   */
  await this.update(data)

  /*
   * Return 200 with updated data
   */
  return this.setResponse200({ optionPack: this.asOptionPack() })
}

/*
 * Removes the option pack - But checks permissions
 *
 * @param {params} object - The (URL) params from the request
 * @param {user} string - The user object as loaded by auth middleware
 * @returns {OptionPackModel} object - The OptionPackModel
 */
OptionPackModel.prototype.guardedDelete = async function ({ params, user }) {
  /*
   * Enforce RBAC
   */
  if (!this.rbac.curator(user)) return this.setResponse(403, 'insufficientAccessLevel')

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
 * Suggests an option pack
 *
 * @param {body} object - The request body
 * @param {user} string - The user object as loaded by auth middleware
 * @returns {OptionPackMode} object - The OptionPackModel
 */
OptionPackModel.prototype.suggest = async function ({ body, user }) {
  /*
   * Enforce RBAC
   */
  if (!this.rbac.user(user)) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * Is design set?
   */
  if (!body.design || typeof body.design !== 'string') return this.setResponse(403, 'designMissing')

  /*
   * Is options set?
   */
  if (!body.options || typeof body.options !== 'object')
    return this.setResponse(403, 'optionsMissing')

  /*
   * Is notes set?
   */
  if (!body.notes || typeof body.notes !== 'string') return this.setResponse(403, 'notesMissing')

  /*
   * Create confirmation to store the suggested data
   */
  await this.Confirmation.createRecord({
    type: 'opack',
    data: {
      notes: body.notes,
      design: body.design.toLowerCase(),
      options: body.options,
    },
    userId: user.uid,
  })

  /*
   * Return id
   */
  return this.setResponse200({ submission: { type: 'opack', id: this.Confirmation.record.id } })
}

/*
 * Returns record data fit for public publishing
 *
 * @returns {optionPack} object - The Option Pack as a plain object
 */
OptionPackModel.prototype.asOptionPack = function () {
  return this.record
}

/*
 * Returns record data fit for public publishing
 *
 * @returns {optionPack} object - The Option Pack as a plain object
 */
OptionPackModel.prototype.asData = function () {
  const data = {
    provider: 'FreeSewing.org',
    type: 'optionPack',
    about: 'Contains curated options for a given design',
    ...this.asOptionPack(),
  }

  return data
}

/*
 * Removed null options
 */
OptionPackModel.prototype.scrubOptions = function (options) {
  /*
   * Any options set to null should be removed
   */
  for (const name in options) {
    if (options[name] === null) delete options[name]
  }

  return options
}
