import { log } from '../utils/log.mjs'
import { storeImage } from '../utils/cloudflare-images.mjs'
import { decorateModel } from '../utils/model-decorator.mjs'

/*
 * This model handles all flows (typically that involves sending out emails)
 */
export function PatternModel(tools) {
  return decorateModel(this, tools, {
    name: 'pattern',
    encryptedFields: ['data', 'img', 'name', 'notes', 'settings'],
    jsonFields: ['data'],
    models: ['set'],
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
      include: {
        set: true,
        cset: true,
      },
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
    csetId: body.cset ? body.cset : null,
    data: typeof body.data === 'object' ? body.data : {},
    design: body.design,
    img: this.config.avatars.pattern,
    setId: body.set ? body.set : null,
    settings: {
      ...body.settings,
      measurements: body.settings.measurements === 'object' ? body.settings.measurements : {},
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
    await this.update(this.cloak({ img }))
  } else await this.read({ id: this.record.id }, { set: true, cset: true })

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
  await this.read({ id: parseInt(params.id) }, { set: true, cset: true })

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
  await this.read({ id: parseInt(params.id) }, { set: true, cset: true })

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
  await this.read({ id: parseInt(params.id) }, { set: true, cset: true })

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
  await this.update(data, { set: true, cset: true })

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
  if (pattern.set) delete pattern.set.measies
  if (pattern.cset) delete pattern.cset.measies

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

/*
 *
 * Everything below this comment is v2 => v3 migration code
 * And can be removed after the migration
 */

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
  'maat 28, met borsten': 1,
  'maat 30, met borsten': 2,
  'maat 32, met borsten': 3,
  'maat 34, met borsten': 4,
  'maat 36, met borsten': 5,
  'maat 38, met borsten': 6,
  'maat 40, met borsten': 7,
  'maat 42, met borsten': 8,
  'maat 44, met borsten': 9,
  'maat 46, met borsten': 10,
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
  'size 28, avec des seins': 1,
  'size 30, avec des seins': 2,
  'size 32, avec des seins': 3,
  'size 34, avec des seins': 4,
  'size 36, avec des seins': 5,
  'size 38, avec des seins': 6,
  'size 40, avec des seins': 7,
  'size 42, avec des seins': 8,
  'size 44, avec des seins': 9,
  'size 46, avec des seins': 10,
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
  'size 32, sans seins': 11,
  'size 34, sans seins': 12,
  'size 36, sans seins': 13,
  'size 38, sans seins': 14,
  'size 40, sans seins': 15,
  'size 42, sans seins': 16,
  'size 44, sans seins': 17,
  'size 46, sans seins': 18,
  'size 48, sans seins': 19,
  'size 50, sans seins': 20,
  'size-28-without-breasts': 11,
  'size-30-without-breasts': 12,
  'size-32-without-breasts': 13,
  'size-34-without-breasts': 14,
  'size-36-without-breasts': 15,
  'size-38-without-breasts': 16,
  'size-40-without-breasts': 17,
  'size-42-without-breasts': 18,
  'size-44-without-breasts': 19,
  'size-46-without-breasts': 20,
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
  'grösse 32, ohne brüste': 11,
  'grösse 34, ohne brüste': 12,
  'grösse 36, ohne brüste': 13,
  'grösse 38, ohne brüste': 14,
  'grösse 40, ohne brüste': 15,
  'grösse 42, ohne brüste': 16,
  'grösse 44, ohne brüste': 17,
  'grösse 46, ohne brüste': 18,
  'grösse 48, ohne brüste': 19,
  'grösse 50, ohne brüste': 20,
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
  for (const pattern of Object.values(v2user.patterns)) {
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
      try {
        this.createRecord(data)
      } catch (err) {
        log.warn(err, 'Could not create pattern')
        console.log(data)
      }
    }
  }
}
