import { ConfirmationModel } from '../models/confirmation.mjs'

export function ConfirmationsController() {}

/*
 * Read confirmation
 *
 * This is the endpoint that handles reading confirmations
 * See: https://freesewing.dev/reference/backend/api/confirmation
 */
ConfirmationsController.prototype.read = async (req, res, tools) => {
  const Confirmation = new ConfirmationModel(tools)
  await Confirmation.guardedRead(req)

  return Confirmation.sendResponse(res)
}

/*
 * Get either sugset or sugpack confirmations (requires curator role)
 * See: https://freesewing.dev/reference/backend/api/confirmation
 */
ConfirmationsController.prototype.getSuggested = async (req, res, tools, type) => {
  const Confirmation = new ConfirmationModel(tools)
  await Confirmation.getSuggested(req, type)

  return Confirmation.sendResponse(res)
}

/*
 * Remove a sugset or sugpack confirmation (requires curator role)
 * See: https://freesewing.dev/reference/backend/api/confirmation
 */
ConfirmationsController.prototype.removeSuggested = async (req, res, tools, type) => {
  const Confirmation = new ConfirmationModel(tools)
  await Confirmation.removeSuggested(req, type)

  return Confirmation.sendResponse(res)
}
