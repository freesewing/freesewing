import { paypalConfig } from 'shared/config/paypal.mjs'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'

export const ns = ['patrons']

const PaypalFormBody = ({ amount, period, currency, language }) => (
  <>
    {[
      ...Object.entries(paypalConfig.vars[period === 'x' ? 'donate' : 'subscribe']),
      ...Object.entries(paypalConfig.vars.shared),
    ].map(([name, value]) => (
      <input type="hidden" {...{ name, value }} key={name} />
    ))}
    <input
      type="hidden"
      name="item_number"
      value={
        period === 'x'
          ? `donate-${amount}-${currency}`
          : `subscribe-${amount}-${currency}-${period}`
      }
    />
    {period === 'x' ? (
      <>
        <input type="hidden" name="item_number" value={`donate-${amount}-${currency}`} />
        <input type="hidden" name="amount" value={amount} />
      </>
    ) : (
      <>
        <input
          type="hidden"
          name="item_number"
          value={`subscribe-${amount}-${currency}-${period}`}
        />
        <input type="hidden" name="p3" value={period === '3m' ? 3 : period === '6m' ? 6 : 1} />
        <input type="hidden" name="t3" value={period === 'w' ? 'W' : period === 'y' ? 'Y' : 'M'} />
        <input type="hidden" name="a3" value={amount} />
      </>
    )}
    <input type="hidden" name="currency_code" value={currency.toUpperCase()} />
    <input type="hidden" name="lc" value={paypalConfig.languages[language]} />
  </>
)

export const Subscribe = ({
  color = 'secondary',
  subscribeOnly,
  amountPreset = '25',
  periodPreset = 'm',
}) => {
  const { t, i18n } = useTranslation(ns)
  const { language } = i18n

  const [amount, setAmount] = useState(amountPreset)
  const [currency, setCurrency] = useState('eur')
  const [period, setPeriod] = useState(periodPreset)

  const { amounts, currencies } = paypalConfig
  const periods = subscribeOnly
    ? paypalConfig.periods.filter((p) => p !== 'x')
    : paypalConfig.periods

  return (
    <div className="w-full">
      <div className="flex flex-row gap-2">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text-alt text-inherit">{t('patrons:yourContribution')}</span>
          </label>
          <input
            type="number"
            placeholder="Enter amount here"
            className="input input-bordered w-full text-base-content"
            value={amount}
            onChange={(evt) => setAmount(evt.target.value)}
          />
        </div>
        <div className="form-control w-24">
          <label className="label">
            <span className="label-text-alt text-inherit">{t('patrons:currency')}</span>
          </label>
          <select
            className="select select-bordered text-base-content"
            defaultValue={currency}
            onChange={(evt) => setCurrency(evt.target.value)}
          >
            {currencies.sort().map((cur) => (
              <option value={cur} key={cur}>
                {cur.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="label">
          <div className="label-text-alt text-inherit flex flex-row flex-wrap gap-1">
            <span className="hidden lg:inline">{t('patrons:presets')}:</span>
            {amounts.map((val) => (
              <button
                key={val}
                className="font-bold underline decoration-2 px-1 hover:decoration-4"
                onClick={() => setAmount(val)}
              >
                {val}
              </button>
            ))}
          </div>
        </label>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
        {periods.map((val) => (
          <div
            className={`form-control border border-solid border-inherit rounded px-1 flex flex-col justify-center ${
              period === val ? 'bg-base-100 text-base-content' : ''
            }`}
            key={val}
          >
            <label className="label cursor-pointer py-1.5 flex flex-row gap-2 items-center overflow-clip justify-start">
              <input
                type="radio"
                name="period"
                className={
                  /** border-secondary-content border-primary-content checked:radio-secondary checked:radio-primary*/
                  `radio checked:radio-${color} border-${color}-content radio-xs lg:radio-sm`
                }
                value={val}
                onChange={() => setPeriod(val)}
                checked={val === period ? 1 : 0}
              />
              <span
                className={`label-text text-inherit text-xs lg:text-sm ${
                  val === period ? 'font-bold' : ''
                }`}
              >
                {t(`patrons:period-${val}`)}
              </span>
            </label>
          </div>
        ))}
      </div>
      <form
        action="https://www.paypal.com/cgi-bin/webscr"
        method="post"
        target="_top"
        id={'form-tier'}
        className="monthly"
      >
        <PaypalFormBody {...{ currency, amount, period, language }} />
        <button
          className={`btn btn-${color} w-full mt-4`}
          disabled={Number(amount) < 1}
          type="submit"
        >
          {period === 'x' ? t('patrons:donate') : t('patrons:subscribe')}
        </button>
      </form>
    </div>
  )
}
