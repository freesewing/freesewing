import { PaymentsController } from '../controllers/payments.mjs'

const Payments = new PaymentsController()

export function paymentsRoutes(tools) {
  const { app } = tools

  /*
   * Only add these routes if payments are enabled in the config
   */
  if (tools.config.use.stripe) {
    // Create payment intent
    app.post('/payments/intent', (req, res) => Payments.createIntent(req, res, tools))
  }
}
