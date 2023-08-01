import { stripeConfig } from 'shared/config/stripe.mjs'
import { useEffect, useState } from 'react'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useTheme } from 'shared/hooks/use-theme.mjs'
import { Elements, PaymentElement } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Loading } from 'shared/components/spinner.mjs'

export const Payment = ({ amount = 2500, currency = 'eur' }) => {
  const formData = {
    2: {
      name: 'monkey',
      code: 'pm',
      item: 'Powder Monkey',
    },
    4: {
      name: 'mate',
      code: 'fm',
      item: 'First Mate',
    },
    8: {
      name: 'captain',
      code: 'capt',
      item: 'Captain',
    },
  }

  const tier = 4
  const form = formData[tier]

  return (
    <div>
      <form
        action="https://www.paypal.com/cgi-bin/webscr"
        method="post"
        target="_top"
        id={'form-tier' + tier}
        className="monthly"
      >
        <input type="hidden" name="cmd" value="_xclick-subscriptions" />
        <input type="hidden" name="business" value="info@freesewing.org" />
        <input type="hidden" name="lc" value="BE" />
        <input type="hidden" name="item_name" value={'Freesewing Patron - ' + form.item} />
        <input type="hidden" name="item_number" value={'patron-' + form.code} />
        <input type="hidden" name="no_note" value="1" />
        <input type="hidden" name="no_shipping" value="2" />
        <input type="hidden" name="rm" value="1" />
        <input type="hidden" name="return" value="https://freesewing.org/patrons/thanks" />
        <input type="hidden" name="src" value="1" />
        <input type="hidden" name="a3" value={tier + '.00'} />
        <input type="hidden" name="p3" value="1" />
        <input type="hidden" name="t3" value="M" />
        <input type="hidden" name="currency_code" value="EUR" />
        <input
          type="hidden"
          name="bn"
          value="PP-SubscriptionsBF:btn_subscribeCC_LG.gif:NonHosted"
        />
        <input
          type="hidden"
          name="image_url"
          value="https://data.freesewing.org/static/img/paypal-logo.png"
        />
        <button color="primary" size="large" type="submit" variant="contained">
          subscribe
        </button>
      </form>
      <form
        action="https://www.paypal.com/cgi-bin/webscr"
        method="post"
        target="_top"
        id={'form-tier' + tier + '-yearly'}
        className="yearly"
      >
        <input type="hidden" name="cmd" value="_xclick-subscriptions" />
        <input type="hidden" name="business" value="info@freesewing.org" />
        <input type="hidden" name="lc" value="BE" />
        <input
          type="hidden"
          name="item_name"
          value={'Freesewing Patron - ' + form.item + ' - Yearly'}
        />
        <input type="hidden" name="item_number" value={'patron-' + form.code} />
        <input type="hidden" name="no_note" value="1" />
        <input type="hidden" name="no_shipping" value="2" />
        <input type="hidden" name="rm" value="1" />
        <input type="hidden" name="return" value="https://freesewing.org/patrons/thanks" />
        <input type="hidden" name="src" value="1" />
        <input type="hidden" name="a3" value={tier * 12 + '.00'} />
        <input type="hidden" name="p3" value="1" />
        <input type="hidden" name="t3" value="Y" />
        <input type="hidden" name="currency_code" value="EUR" />
        <input type="hidden" name="bn" value="https://freesewing.org/patrons/thanks" />
        <input
          type="hidden"
          name="image_url"
          value="https://data.freesewing.org/static/img/paypal-logo.png"
        />
        <button color="secondary" size="small" type="submit" variant="text">
          pay per year
        </button>
      </form>
      <p>Payment button here</p>
    </div>
  )
}

//<pre>{JSON.stringify(options, null ,2)}</pre>
//<pre>{JSON.stringify(intent, null ,2)}</pre>
