import { PatternModel } from '../models/pattern.mjs'

export function PatternsController() {}

/*
 * Create a pattern
 * See: https://freesewing.dev/reference/backend/api
 */
PatternsController.prototype.create = async (req, res, tools) => {
  const Pattern = new PatternModel(tools)
  await Pattern.guardedCreate(req)

  return Pattern.sendResponse(res)
}

/*
 * Read a pattern
 * See: https://freesewing.dev/reference/backend/api
 */
PatternsController.prototype.read = async (req, res, tools) => {
  const Pattern = new PatternModel(tools)
  await Pattern.guardedRead(req)

  return Pattern.sendResponse(res)
}

/*
 * Update a pattern
 * See: https://freesewing.dev/reference/backend/api
 */
PatternsController.prototype.update = async (req, res, tools) => {
  const Pattern = new PatternModel(tools)
  await Pattern.guardedUpdate(req)

  return Pattern.sendResponse(res)
}

/*
 * Remove a pattern
 * See: https://freesewing.dev/reference/backend/api
 */
PatternsController.prototype.delete = async (req, res, tools) => {
  const Pattern = new PatternModel(tools)
  await Pattern.guardedDelete(req)

  return Pattern.sendResponse(res)
}

/*
 * Clone a pattern
 * See: https://freesewing.dev/reference/backend/api
 */
PatternsController.prototype.clone = async (req, res, tools) => {
  const Pattern = new PatternModel(tools)
  await Pattern.guardedClone(req)

  return Pattern.sendResponse(res)
}
