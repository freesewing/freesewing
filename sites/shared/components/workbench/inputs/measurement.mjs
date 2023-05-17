import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { useTranslation } from 'next-i18next'
import { isDegreeMeasurement } from '../../../config/measurements'
import { measurementAsMm } from 'shared/utils.mjs'

/*
 * This is a single input for a measurements
 * Note that it keeps local state with whatever the user types
 * but will only trigger a gist update if the input is valid.
 *
 * m holds the measurement name. It's just so long to type
 * measurement and I always have some typo in it because dyslexia.
 */
export const MeasurementInput = ({ m, gist, app, updateMeasurements, focus, optional }) => {
  const { t } = useTranslation(['app', 'measurements'])
  const prefix = app.site === 'org' ? '' : 'https://freesewing.org'
  const title = t(`measurements:${m}`)

  const isDegree = isDegreeMeasurement(m)
  const factor = useMemo(() => (isDegree ? 1 : gist.units == 'imperial' ? 25.4 : 10), [gist.units])

  const isValValid = (val) => (val == false ? optional : !isNaN(val))
  const isValid = (newVal) => (typeof newVal === 'undefined' ? isValValid(val) : isValValid(newVal))

  const [val, setVal] = useState(gist.measurements?.[m] / factor || '')

  // keep a single reference to a debounce timer
  const debounceTimeout = useRef(null)
  const input = useRef(null)

  // onChange
  const update = useCallback(
    (evt) => {
      evt.stopPropagation()
      let evtVal = evt.target.value
      // set Val immediately so that the input reflects it
      setVal(evtVal)

      let useVal = isDegree ? evtVal : measurementAsMm(evtVal, gist.units)
      const ok = isValid(useVal)
      // only set to the gist if it's valid
      if (ok) {
        // debounce in case it's still changing
        if (debounceTimeout.current !== null) {
          clearTimeout(debounceTimeout.current)
        }
        debounceTimeout.current = setTimeout(() => {
          // clear the timeout reference
          debounceTimeout.current = null
          updateMeasurements(useVal, m)
        }, 500)
      }
    },
    [gist.units]
  )

  // use this for better update efficiency
  const memoVal = useMemo(() => gist.measurements?.[m], [gist])
  // track validity against the value and the units
  const valid = useMemo(
    () => isValid(isDegree ? val : measurementAsMm(val, gist.units)),
    [val, gist.units]
  )

  // hook to update the value or format when the gist changes
  useEffect(() => {
    // set the value to the proper value and format
    if (memoVal) {
      let gistVal = +(memoVal / factor).toFixed(2)
      setVal(gistVal)
    }
  }, [memoVal, factor])

  // focus when prompted by parent
  useEffect(() => {
    if (focus) {
      input.current.focus()
    }
  }, [focus])

  // cleanup
  useEffect(() => {
    clearTimeout(debounceTimeout.current)
  }, [])

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
          ref={input}
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
        <span
          role="img"
          className={`bg-transparent border-y
          ${valid === false && 'border-error text-neutral-content'}
          ${valid === true && 'border-success text-neutral-content'}
          ${valid === null && 'border-base-200 text-base-content'}
       `}
        >
          {valid === true && '👍'}
          {valid === false && '🤔'}
        </span>
        <span
          className={`
          ${valid === false && 'bg-error text-neutral-content'}
          ${valid === true && 'bg-success text-neutral-content'}
          ${valid === null && 'bg-base-200 text-base-content'}
       `}
        >
          {isDegree ? '° ' : gist.units == 'metric' ? 'cm' : 'in'}
        </span>
      </label>
    </div>
  )
}
