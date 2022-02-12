import React, { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'

/*
 * This is a single input for a measurements
 * Note that it keeps local state with whatever the user types
 * but will only trigger a gist update if the input is valid.
 *
 * m holds the measurement name. It's just so long to type
 * measurement and I always have some typo in it because dyslexia.
 */
const MeasurementInput = ({ m, gist, app, updateMeasurements }) => {
  const { t } = useTranslation(['app', 'measurements'])
  const prefix = (app.site === 'org') ? '' : 'https://freesewing.org'
  const title = t(`measurements:${m}`)

  const isValValid = val => (typeof val === 'undefined' || val === '')
      ? null
      : !isNaN(val)
  const isValid = (newVal) => (typeof newVal === 'undefined')
    ? isValValid(gist?.measurements?.[m])
    : isValValid(newVal)

  const update = evt => {
    setVal(evt.target.value)
    const ok = isValid(evt.target.value)
    if (ok) {
      setValid(true)
      updateMeasurements(evt.target.value*10, m)
    } else setValid(false)
  }

  const [val, setVal] = useState(gist?.measurements?.[m] || '')

  useEffect(() => {
    if (gist?.measurements?.[m]) setVal(gist.measurements[m]/10)
  }, [gist])

  if (!m) return null

  const valid = isValid()
  return (
    <div className="form-control mb-2" key={`wrap-${m}`}>
      <label className="label">
        <span className="label-text font-bold text-xl">{title}</span>
        <a
          href={`${prefix}/docs/measurements/${m.toLowerCase()}`}
          className="label-text-alt text-secondary hover:text-secondary-focus hover:underline"
          title={`${t('docs')}: ${t(m)}`}
          tabIndex="-1"
        >
          {t('docs')}
        </a>
      </label>
      <label className="input-group input-group-lg">
        <input
          key={`input-${m}`}
          type="text"
          placeholder={title}
          className={`
            input input-lg input-bordered grow text-base-content border-r-0
            ${isValid() === false && 'input-error'}
            ${isValid() === true && 'input-success'}
          `}
          value={val}
          onChange={update}
        />
        <span role="img" className={`bg-transparent border-y
          ${isValid() === false && 'border-error text-neutral-content'}
          ${isValid() === true && 'border-success text-neutral-content'}
          ${isValid() === null && 'border-base-200 text-base-content'}
       `}>
          {isValid() === null
            ? ''
            : valid
            ? '👍'
            : '🤔'
          }
        </span>
        <span className={`
          ${valid === false && 'bg-error text-neutral-content'}
          ${valid === true && 'bg-success text-neutral-content'}
          ${valid === null && 'bg-base-200 text-base-content'}
       `}>
          cm
        </span>
      </label>
    </div>
  )
}

export default MeasurementInput

