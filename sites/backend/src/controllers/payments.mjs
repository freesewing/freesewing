export function PaymentsController() {}

/*
 * Create payment intent
 *
 * This is the endpoint that handles creation of a Stripe payment intent
 * See: https://freesewing.dev/reference/backend/api/apikey
 */
PaymentsController.prototype.createIntent = async (req, res, tools) => {
  if (!req.body.amount) return this.setResponse(400, 'amountMissing')
  if (!req.body.currency) return this.setResponse(400, 'currencyMissing')

  const body = new URLSearchParams()
  body.append('amount', req.body.amount)
  body.append('currency', req.body.currency)

  // Call Stripe API with fetch to create the payment inent
  const result = await fetch('https://api.stripe.com/v1/payment_intents', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      authorization: `Bearer ${tools.config.stripe.keys.createIntent}`,
    },
    body,
  })
  // Convert response to JSON
  const json = await result.json()

  // Return status code 201 (created) and clientSecret
  return res.status(201).send({
    result: 'success',
    clientSecret: json.client_secret,
  })
}
