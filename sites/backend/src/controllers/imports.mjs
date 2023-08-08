import { SubscriberModel } from '../models/subscriber.mjs'
import { UserModel } from '../models/user.mjs'

export function ImportsController() {}

/*
 * This is a special route that uses hard-coded credentials
 */
const runChecks = (req) => {
  if (req.body.import_token !== process.env.IMPORT_TOKEN) {
    return [401, { result: 'error', error: 'accessDenied' }]
  }
  if (!Array.isArray(req.body.list)) {
    return [400, { result: 'error', error: 'listMissing' }]
  }

  return true
}

/*
 * Imports newsletters subscribers in v2 format
 */
ImportsController.prototype.subscribers = async (req, res, tools) => {
  const check = runChecks(req)
  if (check !== true) return res.status(check[0]).send(check[1])

  const Subscriber = new SubscriberModel(tools)
  await Subscriber.import(req.body.list)

  return Subscriber.sendResponse(res)
}

/*
 * Imports users in v2 format
 */
ImportsController.prototype.users = async (req, res, tools) => {
  const check = runChecks(req)
  if (check !== true) return res.status(check[0]).send(check[1])

  const User = new UserModel(tools)
  await User.import(req.body.list)

  return User.sendResponse(res)
}
