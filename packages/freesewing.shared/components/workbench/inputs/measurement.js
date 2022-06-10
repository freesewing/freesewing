import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { useTranslation } from 'next-i18next'
import { isDegreeMeasurement } from '../../../config/measurements'
import measurementAsMm from 'pkgs/utils/measurementAsMm'
import formatMm from 'pkgs/utils/formatMm'

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
  const isDegree = isDegreeMeasurement(m)

  const isValValid = val => (typeof val === 'undefined' || val === '')
      ? null
      : val !== false && !isNaN(val)
  const isValid = (newVal) => (typeof newVal === 'undefined')
    ? isValValid(val)
    : isValValid(newVal)

  const [val, setVal] = useState(formatMm(gist?.measurements?.[m], gist.units, false) || '')

  // keep a single reference to a debounce timer
  const debounceTimeout = useRef(null);

  // this callback will track to current gist values
  const cb = useCallback((evt) => {
    let evtVal = evt.target.value;
    // cleat the timeout reference
    debounceTimeout.current = null;

    let useVal = isDegree ? evtVal : measurementAsMm(evtVal, gist.units);
    const ok = isValid(useVal)
    // only set to the gist if it's valid
    if (ok) {
      updateMeasurements(useVal, m)
    }
  }, [gist]);

  // onChange
  const update = (evt) => {
    evt.stopPropagation();
    let evtVal = evt.target.value;
    // set Val immediately so that the input reflects it
    setVal(evtVal)

    // debounce the rest of the callback
    if (debounceTimeout.current !== null) { clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      cb(evt)
    }, 500);
  }

  // use this for better update efficiency
  const memoVal = useMemo(() => gist?.measurements[m], [gist])
  // track validity against the value and the units
  const valid = useMemo(() => isValid(measurementAsMm(val, gist.units)), [val, gist.units])

  // hook to update the value when the gist changes
  useEffect(() => {
    if (memoVal) {
      let gistVal = isDegree ? memoVal : formatMm(memoVal, gist.units, false);
      setVal(gistVal)
    }
  }, [memoVal, gist.units])

  // cleanup
  useEffect(() => clearTimeout(debounceTimeout.current), [])

  if (!m) return null

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
            ${valid === false && 'input-error'}
            ${valid === true && 'input-success'}
          `}
          value={val}
          onChange={update}
        />
        <span role="img" className={`bg-transparent border-y
          ${valid === false && 'border-error text-neutral-content'}
          ${valid === true && 'border-success text-neutral-content'}
          ${valid === null && 'border-base-200 text-base-content'}
       `}>
          {(valid === true) && '👍'}
          {(valid === false) && '🤔'}
        </span>
        <span className={`
          ${valid === false && 'bg-error text-neutral-content'}
          ${valid === true && 'bg-success text-neutral-content'}
          ${valid === null && 'bg-base-200 text-base-content'}
       `}>
        {isDegree ? '° ' : gist.units == 'metric' ? 'cm' : 'in'}
        </span>
      </label>
    </div>
  )
}

export default MeasurementInput

