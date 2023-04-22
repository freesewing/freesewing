import { SetModel } from '../models/set.mjs'

export function SetsController() {}

/*
 * Create a measurements set for the authenticated user
 * See: https://freesewing.dev/reference/backend/api
 */
SetsController.prototype.create = async (req, res, tools) => {
  const Set = new SetModel(tools)
  await Set.guardedCreate(req)

  return Set.sendResponse(res)
}

/*
 * Read a measurements set
 * See: https://freesewing.dev/reference/backend/api
 */
SetsController.prototype.read = async (req, res, tools) => {
  const Set = new SetModel(tools)
  await Set.guardedRead(req)

  return Set.sendResponse(res)
}

/*
 * Get a list of measurements sets
 * See: https://freesewing.dev/reference/backend/api
 */
SetsController.prototype.list = async (req, res, tools) => {
  const Set = new SetModel(tools)
  const sets = await Set.userSets(req.user.uid)

  if (sets) Set.setResponse(200, 'success', { sets })
  else Set.setResponse(404, 'notFound')

  return Set.sendResponse(res)
}

/*
 * Update a measurements set
 * See: https://freesewing.dev/reference/backend/api
 */
SetsController.prototype.update = async (req, res, tools) => {
  const Set = new SetModel(tools)
  await Set.guardedUpdate(req)

  return Set.sendResponse(res)
}

/*
 * Remove a measurements set
 * See: https://freesewing.dev/reference/backend/api
 */
SetsController.prototype.delete = async (req, res, tools) => {
  const Set = new SetModel(tools)
  await Set.guardedDelete(req)

  return Set.sendResponse(res)
}

/*
 * Clone a measurements set
 * See: https://freesewing.dev/reference/backend/api
 */
SetsController.prototype.clone = async (req, res, tools) => {
  const Set = new SetModel(tools)
  await Set.guardedClone(req)

  return Set.sendResponse(res)
}
