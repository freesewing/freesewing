import { FlowModel } from '../models/flow.mjs'

export function FlowsController() {}

/*
 * Send out an invite for a translator who wants to join the team
 * See: https://freesewing.dev/reference/backend/api
 */
FlowsController.prototype.sendTranslatorInvite = async (req, res, tools) => {
  const Flow = new FlowModel(tools)
  await Flow.sendTranslatorInvite(req)

  return Flow.sendResponse(res)
}

/*
 * Send out an email to the maintainer to notify them of a new language suggestion
 * See: https://freesewing.dev/reference/backend/api
 */
FlowsController.prototype.sendLanguageSuggestion = async (req, res, tools) => {
  const Flow = new FlowModel(tools)
  await Flow.sendLanguageSuggestion(req)

  return Flow.sendResponse(res)
}
