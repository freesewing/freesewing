import { CuratedSetModel } from '../models/curated-set.mjs'
import { SetModel } from '../models/set.mjs'

export function CuratedSetsController() {}

/*
 * Create a curated measurements set
 * See: https://freesewing.dev/reference/backend/api
 */
CuratedSetsController.prototype.create = async (req, res, tools) => {
  const CuratedSet = new CuratedSetModel(tools)
  await CuratedSet.guardedCreate(req)

  return CuratedSet.sendResponse(res)
}

/*
 * Read a curated measurements set
 * See: https://freesewing.dev/reference/backend/api
 */
CuratedSetsController.prototype.read = async (req, res, tools, format = false) => {
  const CuratedSet = new CuratedSetModel(tools)
  await CuratedSet.guardedRead(req, format)

  return format === 'yaml' ? CuratedSet.sendYamlResponse(res) : CuratedSet.sendResponse(res)
}

/*
 * Get a list of curated measurements sets
 * See: https://freesewing.dev/reference/backend/api
 */
CuratedSetsController.prototype.list = async (req, res, tools, format = false) => {
  const CuratedSet = new CuratedSetModel(tools)
  const curatedSets = await CuratedSet.allCuratedSets()

  if (curatedSets) {
    if (!format) CuratedSet.setResponse(200, 'success', { curatedSets })
    else CuratedSet.setResponse(200, 'success', curatedSets, true)
  } else CuratedSet.setResponse(404, 'notFound')

  return format === 'yaml' && curatedSets
    ? CuratedSet.sendYamlResponse(res)
    : CuratedSet.sendResponse(res)
}

/*
 * Update a curated measurements set
 * See: https://freesewing.dev/reference/backend/api
 */
CuratedSetsController.prototype.update = async (req, res, tools) => {
  const CuratedSet = new CuratedSetModel(tools)
  await CuratedSet.guardedUpdate(req)

  return CuratedSet.sendResponse(res)
}

/*
 * Remove a curated measurements set
 * See: https://freesewing.dev/reference/backend/api
 */
CuratedSetsController.prototype.delete = async (req, res, tools) => {
  const CuratedSet = new CuratedSetModel(tools)
  await CuratedSet.guardedDelete(req)

  return CuratedSet.sendResponse(res)
}

/*
 * Clone a curated measurements set
 * See: https://freesewing.dev/reference/backend/api
 */
CuratedSetsController.prototype.clone = async (req, res, tools) => {
  const CuratedSet = new CuratedSetModel(tools)
  const Set = new SetModel(tools)
  await CuratedSet.guardedClone(req, Set)

  // Note: Sending the set back
  return Set.sendResponse(res)
}
