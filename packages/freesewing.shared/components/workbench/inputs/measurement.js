import React, { useState, useEffect } from 'react'

/*
 * This is a single input for a measurements
 * Note that it keeps local state with whatever the user types
 * but will only trigger a gist update if the input is valid.
 *
 * m holds the measurement name. It's just so long to type
 * measurement and I always have some typo in it because dyslexia.
 */
const MeasurementInput = ({ m, gist, app, updateMeasurements }) => {
  const prefix = (app.site === 'org') ? '' : 'https://freesewing.org'
  const title = app.t(`measurements.${m}`)
  const isValid = input => {
    if (input === '') return ''
    return !isNaN(input)
  }

  const update = evt => {
    setVal(evt.target.value)
    const ok = isValid(evt.target.value)
    console.log({ok})
    if (ok) {
      setValid(true)
      updateMeasurements(evt.target.value*10, m)
    } else setValid(false)
  }

  const [val, setVal] = useState(gist?.measurements?.[m] || '')
  const [valid, setValid] = useState(typeof gist?.measurements?.[m] === 'undefined'
    ? '' :
    isValid(gist.measurements[m])
  )

  useEffect(() => {
    if (gist?.measurements?.[m]) setVal(gist.measurements[m]/10)
  }, [gist])

  if (!m) return null

  return (
    <div className="form-control mb-2" key={`wrap-${m}`}>
      <label className="label">
        <span className="label-text font-bold text-xl">{title}</span>
        <a
          href={`${prefix}/docs/measurements/${m.toLowerCase()}`}
          className="label-text-alt text-secondary hover:text-secondary-focus hover:underline"
          title={`${app.t('docs')}: ${app.t(`measurements.${m}`)}`}
          tabIndex="-1"
        >
          {app.t('docs')}
        </a>
      </label>
      <label className="input-group input-group-lg">
        <input
          key={`input-${m}`}
          type="text"
          placeholder={title}
          className={`
            input input-lg input-bordered grow text-base-content
            ${valid === false && 'input-error'}
            ${valid === true && 'input-success'}
          `}
          value={val}
          onChange={update}
        />
        <span className={`
          ${valid === false && 'bg-error text-neutral-content'}
          ${valid === true && 'bg-success text-neutral-content'}
          ${valid === '' && 'bg-base-200 text-base-content'}
       `}>
          cm
        </span>
      </label>
      <label className="label">
        <span className="label-text-alt">
          {valid === ''
            ? ''
            : valid
            ? 'Looks good'
            : 'Invalid'
          }
          {val}
        </span>
      </label>
    </div>
  )
}

export default MeasurementInput

