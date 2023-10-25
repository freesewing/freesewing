import { decorateModel } from '../utils/model-decorator.mjs'
import { log } from '../utils/log.mjs'

/*
 * This model handles all confirmation updates
 *
 * @param {tools} object - A set of tools loaded in src/index.js
 * @returns {ConfirmationModel} object - The ConfirmationModel
 */
export function ConfirmationModel(tools) {
  /*
   * See utils/model-decorator.mjs for details
   */
  return decorateModel(this, tools, {
    name: 'confirmation',
    encryptedFields: ['data'],
    jsonFields: ['data'],
  })
}

/*
 * Reads a confirmation - Anonymous route
 *
 * @param {params} object - The request (url) parameters
 * @returns {ConfirmationModel} object - The ConfirmationModel
 */
ConfirmationModel.prototype.guardedRead = async function ({ params }) {
  /*
   * Is the id set?
   */
  if (typeof params.id === 'undefined') return this.setResponse(404)

  /*
   * Is the check set?
   */
  //if (typeof params.check === 'undefined') return this.setResponse(404)

  /*
   * Attempt to read record from the database
   */
  await this.read({ id: params.id })

  /*
   * Does it exist?
   */
  if (!this.record) return this.setResponse(404)

  /*
   * For types that do not require a check (submissions) return data
   */
  if (['sugset'].includes(this.record.type)) {
    return this.setResponse200({ submission: { id: this.record.id, ...this.clear.data } })
  }

  /*
   * Return data only if the check matches
   */
  return this.clear.data.check === params.check
    ? this.setResponse200({
        confirmation: {
          id: this.record.id,
          check: this.clear.data.check,
        },
      })
    : this.setResponse(404)
}

/*
 * Gets suggested sets/packs - Curators or higher only
 *
 * @param {user} object - The user as returned from middleware
 * @params {type} string - The confiramtion type
 * @returns {ConfirmationModel} object - The ConfirmationModel
 */
ConfirmationModel.prototype.getSuggested = async function ({ user }, type) {
  /*
   * Enforce RBAC
   */
  if (!this.rbac.curator(user)) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * Attempt to read records from the database
   */
  let result
  try {
    result = await this.prisma.confirmation.findMany({ where: { type } })
  } catch (err) {
    log.warn(`Failed to search conifirmations with type ${type}`)
  }
  const list = []
  for (const confirmation of result) list.push(this.revealConfirmation(confirmation))

  return this.setResponse200({ suggested: list })
}

/*
 * Removes a suggested set/pack - Curators or higher only
 *
 * @param {params} object - The request URL parameters
 * @param {user} object - The user as returned from middleware
 * @params {type} string - The confiramtion type
 * @returns {ConfirmationModel} object - The ConfirmationModel
 */
ConfirmationModel.prototype.removeSuggested = async function ({ user, params }, type) {
  /*
   * Enforce RBAC
   */
  if (!this.rbac.curator(user)) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * Is ID set?
   */
  if (!params.id) return this.setResponse(400, 'idMissing')

  /*
   * Read the record from the database
   */
  await this.read({ id: params.id })

  /*
   * Ensure type matches
   */
  if (this.record.type !== type) return this.setResponse(400, 'typeMismatch')

  /*
   * If it does not exist, return 404
   */
  if (!this.exists) return this.setResponse(404)

  /*
   * Remove record
   */
  try {
    await this.delete()
  } catch (err) {
    log.warn(err, 'Error while removing confirmation')
  }

  return this.setResponse200({
    result: 'success',
    data: {},
  })
}

/*
 * Helper method to decrypt data from a non-instantiated confirmation
 *
 * @param {confirmation} object - The confirmation data
 * @returns {confirmation} object - The unencrypted data
 */
ConfirmationModel.prototype.revealConfirmation = function (confirmation) {
  const clear = {}
  for (const field of this.encryptedFields) {
    try {
      clear[field] = this.decrypt(confirmation[field])
    } catch (err) {
      //console.log(err)
    }
  }
  for (const field of this.jsonFields) {
    try {
      clear[field] = JSON.parse(clear[field])
    } catch (err) {
      //console.log(err)
    }
  }

  return { ...confirmation, ...clear }
}
