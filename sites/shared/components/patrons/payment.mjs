import { stripeConfig } from 'shared/config/stripe.mjs'
import { useEffect, useState } from 'react'
import { useTheme } from 'shared/hooks/use-theme.mjs'
import { Elements, PaymentElement } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

/*
 * The stripe API docs will emphasize to always handle this server-side because
 * doing this client-side allows nefarious users to modify the payment amount.
 * Which is great advice, but FreeSewing uses a pay-whatever-you-want model so
 * if people want to muck about with JS to change the amount rather than change
 * it in the input field for the amount, let them.
 *
 * This is also why we need to use fetch and talk to the API directly, because
 * the stripe client-side SDK does not include this functionality.
 */
const createPaymentIntent = async ({ amount, currency }) => {
  const body = new URLSearchParams()
  body.append('amount', amount)
  body.append('currency', currency)

  return await fetch('https://api.stripe.com/v1/payment_intents', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      authorization: `Bearer ${stripeConfig.apiKey}`,
    },
    body,
  })
}

export const Payment = ({ amount = 2500, currency = 'eur' }) => {
  const appearance = useTheme().stripe
  const [stripe, setStripe] = useState(false)
  const [intent, setIntent] = useState(false)
  const options = intent
    ? {
        mode: 'payment',
        layout: {
          type: 'accordion',
          radios: true,
          spacedAccordianItems: true,
        },
        business: {
          name: 'FreeSewing',
        },
        amount,
        currency,
        appearance,
      }
    : null

  useEffect(() => {
    const getPaymentIntent = async () => {
      const stripeClient = await loadStripe(stripeConfig.apiKey)
      const result = await createPaymentIntent({ amount, currency })
      const json = await result.json()
      setStripe(stripeClient)
      setIntent(json)
    }
    getPaymentIntent()
  }, [amount, currency])

  return intent ? (
    <Elements stripe={stripe} options={options} layout="accordion">
      <form>
        <PaymentElement options={options} />
        <pre>{JSON.stringify(intent, null, 2)}</pre>
      </form>
    </Elements>
  ) : (
    <>
      <p>One moment please...</p>
      <pre>{JSON.stringify(options, null, 2)}</pre>
    </>
  )
}

//<pre>{JSON.stringify(options, null ,2)}</pre>
//<pre>{JSON.stringify(intent, null ,2)}</pre>
