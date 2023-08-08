import { SubscriberModel } from '../models/subscriber.mjs'

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
