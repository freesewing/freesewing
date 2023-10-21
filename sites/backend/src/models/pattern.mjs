import { log } from '../utils/log.mjs'
import { storeImage } from '../utils/cloudflare-images.mjs'
import { decorateModel } from '../utils/model-decorator.mjs'

/*
 * This model handles all flows (typically that involves sending out emails)
 */
export function PatternModel(tools) {
  return decorateModel(this, tools, {
    name: 'pattern',
    encryptedFields: ['data', 'name', 'notes', 'settings'],
    jsonFields: ['data'],
  })
}

/*
 * Returns a list of patterns for the user making the API call
 *
 * @param {uid} string - uid of the user, as provided by the auth middleware
 * @returns {patterns} array - The list of patterns
 */
PatternModel.prototype.userPatterns = async function (uid) {
  /*
   * No uid no deal
   */
  if (!uid) return false

  /*
   * Run query returning all patterns from the database
   */
  let patterns
  try {
    patterns = await this.prisma.pattern.findMany({
      where: { userId: uid },
    })
  } catch (err) {
    log.warn(`Failed to search patterns for user ${uid}: ${err}`)
  }

  /*
   * Decrypt data for all patterns found
   */
  const list = patterns.map((pattern) => this.revealPattern(pattern))

  /*
   * Return the list of patterns
   */
  return list
}

/*
 * Creates a new pattern - Takes user input so we validate data and access
 *
 * @param {body} object - The request body
 * @param {user} object - The user data as provided by the auth middleware
 * @returns {PatternModel} object - The PatternModel
 */
PatternModel.prototype.guardedCreate = async function ({ body, user }) {
  /*
   * Enforce RBAC
   */
  if (!this.rbac.user(user)) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * Do we have a POST body?
   */
  if (Object.keys(body).length < 2) return this.setResponse(400, 'postBodyMissing')

  /*
   * Is settings set?
   */
  if (typeof body.settings !== 'object') return this.setResponse(400, 'settingsNotAnObject')

  /*
   * Is data set?
   */
  if (body.data && typeof body.data !== 'object') return this.setResponse(400, 'dataNotAnObject')

  /*
   * Is design set?
   */
  if (!body.design && !body.data?.design) return this.setResponse(400, 'designMissing')

  /*
   * Is design a string?
   */
  if (typeof body.design !== 'string') return this.setResponse(400, 'designNotStringy')

  /*
   * Create initial record
   */
  await this.createRecord({
    data: typeof body.data === 'object' ? body.data : {},
    design: body.design,
    img: this.config.avatars.pattern,
    settings: {
      ...body.settings,
      measurements:
        typeof body.settings.measurements === 'object' ? body.settings.measurements : {},
    },
    userId: user.uid,
    name: typeof body.name === 'string' && body.name.length > 0 ? body.name : '--',
    notes: typeof body.notes === 'string' && body.notes.length > 0 ? body.notes : '--',
    public: body.public === true ? true : false,
  })

  /*
   * Now that we have a record ID, we can update the image, but only if needed
   */
  if (body.img) {
    const img = await storeImage(
      {
        id: `pattern-${this.record.id}`,
        metadata: { user: user.uid },
        b64: body.img,
      },
      this.isTest(body)
    )

    /*
     * If an image was created, update the record with its ID
     * If not, just update the record from the database
     */
    await this.update({ img })
  } else await this.read({ id: this.record.id })

  /*
   * Now return 201 and the record data
   */
  return this.setResponse201({ pattern: this.asPattern() })
}

/*
 * Loads a pattern from the database but only if it's public
 *
 * @param {params} object - The request (URL) parameters
 * @returns {PatternModel} object - The PatternModel
 */
PatternModel.prototype.publicRead = async function ({ params }) {
  /*
   * Attempt to read the database record
   */
  await this.read({ id: parseInt(params.id) })

  /*
   * Ensure it is public and if it is not public, return 404
   * rather than reveal that a non-public pattern exists
   */
  if (this.record.public !== true) return this.setResponse(404)

  /*
   * Return pattern
   */
  return this.setResponse200(this.asPublicPattern())
}

/*
 * Loads a pattern from the database based on the where clause you pass it
 * In addition prepares it for returning the pattern data
 *
 * @param {params} object - The request (URL) parameters
 * @param {user} object - The user data as provided by the auth middleware
 * @returns {PatternModel} object - The PatternModel
 */
PatternModel.prototype.guardedRead = async function ({ params, user }) {
  /*
   * Enforce RBAC
   */
  if (!this.rbac.readSome(user)) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * Is the id set?
   */
  if (typeof params.id !== 'undefined' && !Number(params.id))
    return this.setResponse(403, 'idNotNumeric')

  /*
   * Attempt to read record from database
   */
  await this.read({ id: parseInt(params.id) })

  /*
   * Return 404 if it cannot be found
   */
  if (!this.record) return this.setResponse(404, 'notFound')

  /*
   * You need at least the bughunter role to read another user's pattern
   */
  if (this.record.userId !== user.uid && !this.rbac.bughunter(user)) {
    return this.setResponse(403, 'insufficientAccessLevel')
  }

  /*
   * Return the loaded pattern
   */
  return this.setResponse200({ pattern: this.asPattern() })
}

/*
 * Clones a pattern
 * In addition prepares it for returning the pattern data
 *
 * @param {params} object - The request (URL) parameters
 * @param {user} object - The user data as provided by the auth middleware
 * @returns {PatternModel} object - The PatternModel
 */
PatternModel.prototype.guardedClone = async function ({ params, user }) {
  /*
   * Enforce RBAC
   */
  if (!this.rbac.writeSome(user)) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * Attempt to read record from database
   */
  await this.read({ id: parseInt(params.id) })

  /*
   * You need the support role to clone another user's pattern that is not public
   */
  if (this.record.userId !== user.uid && !this.record.public && !this.rbac.support(user)) {
    return this.setResponse(403, 'insufficientAccessLevel')
  }

  /*
   * Now clone the pattern
   */
  const data = this.asPattern()
  delete data.id
  data.name += ` (cloned from #${this.record.id})`
  data.notes += ` (Note: This pattern was cloned from pattern #${this.record.id})`

  /*
   * Write it to the database
   */
  await this.createRecord(data)

  /*
   * Update record with unencrypted data
   */
  this.reveal()

  /*
   * And return the cloned pattern
   */
  return this.setResponse200({ pattern: this.asPattern() })
}

/*
 * Updates the pattern data - Used when we pass through user-provided data
 * so we can't be certain it's safe
 *
 * @param {params} object - The request (URL) parameters
 * @param {body} object - The request body
 * @param {user} object - The user data as provided by the auth middleware
 * @returns {PatternModel} object - The PatternModel
 */
PatternModel.prototype.guardedUpdate = async function ({ params, body, user }) {
  /*
   * Enforce RBAC
   */
  if (!this.rbac.writeSome(user)) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * Attempt to read record from the database
   */
  await this.read({ id: parseInt(params.id) })

  /*
   * Only admins can update other people's patterns
   */
  if (this.record.userId !== user.uid && !this.rbac.admin(user)) {
    return this.setResponse(403, 'insufficientAccessLevel')
  }

  /*
   * Prepare data for updating the record
   */
  const data = {}
  /*
   * name
   */
  if (typeof body.name === 'string') data.name = body.name
  /*
   * notes
   */
  if (typeof body.notes === 'string') data.notes = body.notes
  /*
   * public
   */
  if (body.public === true || body.public === false) data.public = body.public
  /*
   * data
   */
  if (typeof body.data === 'object') data.data = body.data
  /*
   * settings
   */
  if (typeof body.settings === 'object') data.settings = body.settings
  /*
   * img
   */
  if (typeof body.img === 'string') {
    data.img = await storeImage(
      {
        id: `pattern-${this.record.id}`,
        metadata: { user: user.uid },
        b64: body.img,
      },
      this.isTest(body)
    )
  }

  /*
   * Now update the record
   */
  await this.update(data)

  /*
   * Return 200 and the data
   */
  return this.setResponse200({ pattern: this.asPattern() })
}

/*
 * Removes the pattern - Checks permissions
 *
 * @param {params} object - The request (URL) parameters
 * @param {user} object - The user data as provided by the auth middleware
 * @returns {PatternModel} object - The PatternModel
 */
PatternModel.prototype.guardedDelete = async function ({ params, user }) {
  /*
   * Enforce RBAC
   */
  if (!this.rbac.writeSome(user)) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * Attempt to read record from database
   */
  await this.read({ id: parseInt(params.id) })

  /*
   * Only admins can delete other user's patterns
   */
  if (this.record.userId !== user.uid && !this.rbac.admin(user)) {
    return this.setResponse(403, 'insufficientAccessLevel')
  }

  /*
   * Remove the record
   */
  await this.delete()

  /*
   * Return 204
   */
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
 *
 * @param {pattern} object - The pattern data
 * @returns {pattern} object - The unencrypted pattern data
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

  return { ...pattern, ...clear }
}

/*
 * Returns record data fit for public publishing
 */
PatternModel.prototype.asPublicPattern = function () {
  const data = {
    provider: 'FreeSewing.org',
    type: 'pattern',
    ...this.asPattern(),
  }
  delete data.public

  return data
}
