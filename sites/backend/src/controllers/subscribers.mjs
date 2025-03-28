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

/*
 * Starts the unsubscribe flow
 *
 * Typically, people unsubscribe from an unsubscribe link in the newsletter.
 * However, what if they want to subscribe at an arbitrary point in time and they
 * do not have the unsubcribe link handy?
 * This endpoint will send them an email with the unsubscribe link. From there
 * on, we follow the regular flow.
 */
SubscribersController.prototype.startUnsubscribe = async (req, res, tools) => {
  if (!req.body.email) return res.status(400).send()

  const Subscriber = new SubscriberModel(tools)
  const result = await Subscriber.startUnsubscribe(req.body.email)
  console.log(result)

  return res.status(200).send({ result })
}
