import { stripeConfig } from 'shared/config/stripe.mjs'
import { useEffect, useState } from 'react'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useTheme } from 'shared/hooks/use-theme.mjs'
import { Elements, PaymentElement } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Loading } from 'shared/components/spinner.mjs'

export const Payment = ({ amount = 2500, currency = 'eur' }) => {
  const appearance = useTheme().stripe
  const backend = useBackend()
  const [stripe, setStripe] = useState(false)
  const [clientSecret, setClientSecret] = useState(false)

  const options = {
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

  useEffect(() => {
    const getPaymentIntent = async () => {
      const stripeClient = await loadStripe(stripeConfig.apiKey)
      const result = await backend.createPaymentIntent({ amount, currency })
      if (result.success && result.data.clientSecret) setClientSecret(result.data.clientSecret)
      setStripe(stripeClient)
    }
    getPaymentIntent()
  }, [amount, currency])

  return clientSecret ? (
    <Elements stripe={stripe} options={options} layout="accordion">
      <form>
        <PaymentElement options={options} />
        <pre>{JSON.stringify(clientSecret, null, 2)}</pre>
      </form>
    </Elements>
  ) : (
    <div className="my-12">
      <Loading />
    </div>
  )
}

//<pre>{JSON.stringify(options, null ,2)}</pre>
//<pre>{JSON.stringify(intent, null ,2)}</pre>
