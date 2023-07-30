import { freeSewingConfig } from 'shared/config/freesewing.config.mjs'
import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { formatNumber } from 'shared/utils.mjs'
import { Payment } from './payment.mjs'

export const ns = ['patrons']

export const Subscribe = ({ color = 'secondary' }) => {
  const { t } = useTranslation(ns)

  const [amount, setAmount] = useState(null)
  const [currency, setCurrency] = useState('eur')
  const [period, setPeriod] = useState('m')
  const [handlePayment, setHandlePayment] = useState(false)

  const { amounts, periods, currencies } = freeSewingConfig.stripe

  const changeCurrency = (evt) => {
    const newCur = evt.target.value
    const newAmount = amount ? (amount / currencies[currency]) * currencies[newCur] : amount
    setAmount(newAmount)
    setCurrency(newCur)
  }

  if (handlePayment)
    return (
      <>
        <Payment {...{ amount, currency }} />
        <button
          className={`btn btn-${color} w-full mt-4`}
          onClick={() => setHandlePayment(!handlePayment)}
        >
          To checkout
        </button>
      </>
    )

  return (
    <div className="w-full">
      <div className="flex flex-row gap-2">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text-alt text-inherit">Your contribution</span>
          </label>
          <input
            type="text"
            placeholder="Enter amount here"
            className="input input-bordered w-full text-base-content"
            value={amount}
          />
        </div>
        <div className="form-control w-24">
          <label className="label">
            <span className="label-text-alt text-inherit">Currency</span>
          </label>
          <select
            className="select select-bordered text-base-content"
            defaultValue="eur"
            onChange={changeCurrency}
          >
            {Object.keys(currencies)
              .sort()
              .map((cur) => (
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
            <span className="hidden lg:inline">Presets:</span>
            {amounts.map((val) => (
              <button
                key={val}
                className="font-bold underline decoration-2 px-1 hover:decoration-4"
                onClick={() => setAmount(val * currencies[currency])}
              >
                {formatNumber(val * currencies[currency])}
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
                className={`radio checked:bg-${color} border-inherit bg-inherit radio-xs lg:radio-sm`}
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
      <button
        className={`btn btn-${color} w-full mt-4`}
        onClick={() => setHandlePayment(!handlePayment)}
      >
        To checkout
      </button>
    </div>
  )
}
