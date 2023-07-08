import { IssueModel } from '../models/issue.mjs'

export function IssuesController() {}

/*
 * Create Issue
 *
 * This is the endpoint that handles creation of Github issues
 * See: https://freesewing.dev/reference/backend/api/apikey
 */
IssuesController.prototype.create = async (req, res, tools) => {
  const Issue = new IssueModel(tools)
  await Issue.create(req)

  return Issue.sendResponse(res)
}
