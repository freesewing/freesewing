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

/*
 * Upload an image to Cloudflare
 * See: https://freesewing.dev/reference/backend/api
 */
FlowsController.prototype.uploadImage = async (req, res, tools, anon = false) => {
  const Flow = new FlowModel(tools)
  await Flow.uploadImage(req, anon)

  return Flow.sendResponse(res)
}

/*
 * Remove an image from Cloudflare
 * See: https://freesewing.dev/reference/backend/api
 */
FlowsController.prototype.removeImage = async (req, res, tools) => {
  const Flow = new FlowModel(tools)
  await Flow.removeImage(req)

  return Flow.sendResponse(res)
}

/*
 * Creates a pull request for a new showcase post
 * See: https://freesewing.dev/reference/backend/api
 */
FlowsController.prototype.createPostPr = async (req, res, tools, type) => {
  const Flow = new FlowModel(tools)
  await Flow.createPostPr(req, type)

  return Flow.sendResponse(res)
}

/*
 * Create Issue
 *
 * This is the endpoint that handles creation of Github issues
 * See: https://freesewing.dev/reference/backend/api/apikey
 */
FlowsController.prototype.createIssue = async (req, res, tools) => {
  const Flow = new FlowModel(tools)
  await Flow.createIssue(req)

  return Flow.sendResponse(res)
}

/*
 * Create Discussion
 *
 * This is the endpoint that handles creation of Github issues
 * See: https://freesewing.dev/reference/backend/api/apikey
 */
FlowsController.prototype.createDiscussion = async (req, res, tools) => {
  const Flow = new FlowModel(tools)
  await Flow.createDiscussion(req)

  return Flow.sendResponse(res)
}

/*
 * Is a blog or showcase slug available?
 *
 * This is the endpoint that verifies whether a blog or showcase slug is available
 * See: https://freesewing.dev/reference/backend/api/apikey
 */
FlowsController.prototype.isSlugAvailable = async (req, res, tools, type) => {
  const Flow = new FlowModel(tools)
  const available = await Flow.isSlugAvailable(req, type)

  if (!available)
    Flow.setResponse(200, false, {
      result: 'success',
      slug: req.params.slug,
      available: false,
    })
  else Flow.setResponse(404)

  return Flow.sendResponse(res)
}
