import { SubscribersController } from '../controllers/subscribers.mjs'

const Subscriber = new SubscribersController()

export function subscribersRoutes(tools) {
  const { app } = tools

  /*
   * None of these require authentication
   */

  // Subscribe to the newsletter
  app.post('/subscriber', (req, res) => Subscriber.subscribe(req, res, tools))

  // Confirm subscription to the newsletter
  app.put('/subscriber', (req, res) => Subscriber.subscribeConfirm(req, res, tools))

  // Unsubscribe from newsletter
  app.delete('/subscriber', (req, res) => Subscriber.unsubscribeConfirm(req, res, tools))
}
