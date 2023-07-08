import { PatternModel } from '../models/pattern.mjs'

export function PatternsController() {}

/*
 * Get a list of patterns
 * See: https://freesewing.dev/reference/backend/api
 */
PatternsController.prototype.list = async (req, res, tools) => {
  const Pattern = new PatternModel(tools)
  const patterns = await Pattern.userPatterns(req.user.uid)

  if (patterns) Pattern.setResponse(200, 'success', { patterns })
  else Pattern.setResponse(404, 'notFound')

  return Pattern.sendResponse(res)
}

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

/*
 * Read a public pattern
 * See: https://freesewing.dev/reference/backend/api
 */
PatternsController.prototype.readPublic = async (req, res, tools, format = 'json') => {
  const Pattern = new PatternModel(tools)
  await Pattern.publicRead(req)

  return format === 'yaml' ? Pattern.sendYamlResponse(res) : Pattern.sendResponse(res)
}
