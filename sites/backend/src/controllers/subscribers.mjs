//import fs from 'fs'
//import path from 'path'
import { SubscriberModel } from '../models/subscriber.mjs'

/*
 * Load pages for subscribe and unsubscribe confirmation
 * Some people might find this extra step annoying,
 * but GET requests should not make changes.
 */
//const index = fs.readFileSync(path.resolve('.', 'src', 'landing', 'index.html'))
//app.get('/', async (req, res) => res.set('Content-Type', 'text/html').status(200).send(index))

export function SubscribersController() {}

/*
 * Subscribe to the newsletter (sends confirmation email)
 * See: https://freesewing.dev/reference/backend/api
 */
SubscribersController.prototype.subscribe = async (req, res, tools) => {
  const Subscriber = new SubscriberModel(tools)
  await Subscriber.guardedCreate(req)

  return Subscriber.sendResponse(res)
}

/*
 * Subscribe confirmation
 * See: https://freesewing.dev/reference/backend/api
 */
SubscribersController.prototype.subscribeConfirm = async (req, res, tools) => {
  const Subscriber = new SubscriberModel(tools)
  await Subscriber.subscribeConfirm(req)

  return Subscriber.sendResponse(res)
}

/*
 * Unsubscribe confirmation
 * See: https://freesewing.dev/reference/backend/api
 */
SubscribersController.prototype.unsubscribeConfirm = async (req, res, tools) => {
  const Subscriber = new SubscriberModel(tools)
  await Subscriber.unsubscribeConfirm(req)

  return Subscriber.sendResponse(res)
}

/*
 * Confirm newsletter subscription
 * See: https://freesewing.dev/reference/backend/api
 */
SubscribersController.prototype.confirm = async (req, res, tools) => {
  const Subscriber = new SubscriberModel(tools)
  await Subscriber.confirm(req)

  return Subscriber.sendResponse(res)
}

/*
 * Unsubscribe from the newsletter
 * See: https://freesewing.dev/reference/backend/api
 */
SubscribersController.unsubscribe = async (req, res, tools) => {
  const Subscriber = new SubscriberModel(tools)
  await Subscriber.unsubscribe(req)

  return Subscriber.sendResponse(res)
}
