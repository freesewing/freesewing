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
