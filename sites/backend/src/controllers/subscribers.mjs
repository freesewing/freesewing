import { SubscriberModel } from '../models/subscriber.mjs'
// Catch-all page
import { html as ocunsubOk } from '../html/ocunsub-ok.mjs'
import { html as ocunsubKo } from '../html/ocunsub-ko.mjs'

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
 * Unsubscribe
 * See: https://freesewing.dev/reference/backend/api
 */
SubscribersController.prototype.unsubscribe = async (req, res, tools) => {
  const Subscriber = new SubscriberModel(tools)
  await Subscriber.unsubscribe(req)

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
 * One-Click unsubscribe from the newsletter
 * See: https://freesewing.dev/reference/backend/api
 */
SubscribersController.prototype.ocunsub = async (req, res, tools) => {
  if (!res.params?.ehash) return res.set('Content-Type', 'text/html').status(200).send(ocunsubKo)

  const Subscriber = new SubscriberModel(tools)
  const result = await Subscriber.ocunsub(req)

  if (result) return res.set('Content-Type', 'text/html').status(200).send(ocunsubOk)

  return res.set('Content-Type', 'text/html').status(200).send(okunsubKo)
}
