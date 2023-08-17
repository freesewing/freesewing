import { decorateModel } from '../utils/model-decorator.mjs'

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
  if (typeof params.check === 'undefined') return this.setResponse(404)

  /*
   * Attempt to read record from the database
   */
  await this.read({ id: params.id })

  /*
   * Does it exist?
   */
  if (!this.record) return this.setResponse(404)

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
