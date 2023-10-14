import { SubscriberModel } from '../models/subscriber.mjs'
import { UserModel } from '../models/user.mjs'
import axios from 'axios'

export function ImportsController() {}

/*
 * This is a special route that uses hard-coded credentials
 */
const runChecks = (req) => {
  if (req.body.import_token !== process.env.IMPORT_TOKEN) {
    return [401, { result: 'error', error: 'accessDenied' }]
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
ImportsController.prototype.user = async (req, res, tools) => {
  const check = runChecks(req)
  if (check !== true) return res.status(check[0]).send(check[1])

  const User = new UserModel(tools)
  await User.import(req.body.user)

  return User.sendResponse(res)
}

/*
 * Migrates a user in v2 format
 */
ImportsController.prototype.migrate = async (req, res, tools) => {
  if (!req.body.username || !req.body.password) return res.status(401).end()

  const v2 = await getV2Data(req.body)
  if (!v2) return res.status(401).end()

  const User = new UserModel(tools)
  await User.migrate({
    username: req.body.username,
    password: req.body.password,
    v2,
  })

  return User.sendResponse(res)
}

const getV2Data = async ({ username, password }) => {
  let result
  try {
    result = await axios.post('https://backend.freesewing.org/login', { username, password })
  } catch (err) {
    console.log(err)
    return false
  }

  if (result.status === 200 && result.data.account) return result.data
}
