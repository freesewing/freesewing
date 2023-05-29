import { useState, useEffect, useCallback } from 'react'
import {
  formatMm,
  round,
  measurementAsMm,
  measurementAsUnits,
  formatFraction128,
} from 'shared/utils.mjs'
import { ChoiceButton } from 'shared/components/choice-button.mjs'

const EditCount = (props) => (
  <div className="form-control mb-2 w-full">
    <label className="label">
      <span className="label-text text-base-content">{props.min}</span>
      <span className="label-text font-bold text-base-content">{props.current}</span>
      <span className="label-text text-base-content">{props.max}</span>
    </label>
    <label className="input-group input-group-sm">
      <input
        type="number"
        className={`
          input input-sm input-bordered grow text-base-content
        `}
        value={props.current}
        onChange={props.handleChange}
      />
      <span className="text-base-content font-bold">#</span>
    </label>
  </div>
)

const useSharedHandlers = ({ dflt, updateFunc, updatePath, name, setReset }) => {
  const reset = useCallback(() => updateFunc([...updatePath, name]), [updatePath, updateFunc, name])

  const handleChange = useCallback(
    (newCurrent) => {
      if (newCurrent === dflt) reset()
      else {
        updateFunc([...updatePath, name], newCurrent)
      }
    },
    [dflt, updateFunc, updatePath, name]
  )

  useEffect(() => setReset(() => reset), [reset, setReset])

  return { handleChange, reset }
}

export const ListInput = ({
  name,
  config,
  current,
  updateFunc,
  updatePath = [],
  compact = false,
  t,
  setReset,
}) => {
  const { handleChange, reset, set } = useSharedHandlers({
    dflt: config.dflt,
    updateFunc,
    updatePath,
    name,
    setReset,
  })

  return (
    <>
      <p>{t(`${name}.d`)}</p>
      {config.list.map((entry) => {
        const titleKey = config.choiceTitles ? config.choiceTitles[entry] : `${name}.o.${entry}`
        return (
          <ChoiceButton
            key={entry}
            title={t(`${titleKey}${compact ? '' : '.t'}`)}
            color={entry === config.dflt ? 'primary' : 'accent'}
            active={current === entry}
            onClick={() => handleChange(entry)}
          >
            {compact ? null : t(`${titleKey}.d`)}
          </ChoiceButton>
        )
      })}
    </>
  )
}

export const BoolInput = ListInput

const EditInputValue = (props) => (
  <div className="form-control mb-2 w-full">
    <label className="label">
      <span className="label-text text-base-content">
        {props.min}
        {props.suffix}
      </span>
      <span className="label-text font-bold text-base-content">
        {props.value}
        {props.suffix}
      </span>
      <span className="label-text text-base-content">
        {props.max}
        {props.suffix}
      </span>
    </label>
    <label className="input-group input-group-sm">
      <input
        type="number"
        className={`
          input input-sm input-bordered grow text-base-content
        `}
        value={props.value}
        onChange={props.handleChange}
      />
      <span className="text-base-content font-bold">{props.suffix}</span>
    </label>
  </div>
)

export const SliderInput = ({
  name,
  config,
  current,
  updateFunc,
  updatePath = [],
  t,
  override,
  suffix = '',
  valFormatter = (val) => val,
  setReset,
  children,
}) => {
  const { max, min } = config
  const { handleChange, reset } = useSharedHandlers({
    current,
    dflt: config.dflt,
    updateFunc,
    updatePath,
    name,
    setReset,
  })

  let currentOrDefault = current === undefined ? config.dflt : current

  return (
    <>
      <p>{t(`${name}.d`)}</p>
      <div className="flex flex-row justify-between">
        {override ? (
          <EditCount
            {...{
              current: currentOrDefault,
              handleChange: (evt) => handleChange(evt.target.value),
              min,
              max,
              t,
            }}
          />
        ) : (
          <>
            <span className="opacity-50">
              <span dangerouslySetInnerHTML={{ __html: valFormatter(min) + suffix }} />
            </span>
            <span
              className={`font-bold ${
                currentOrDefault === config.dflt ? 'text-secondary' : 'text-accent'
              }`}
            >
              <span dangerouslySetInnerHTML={{ __html: valFormatter(currentOrDefault) + suffix }} />
            </span>
            <span className="opacity-50">
              <span dangerouslySetInnerHTML={{ __html: valFormatter(max) + suffix }} />
            </span>
          </>
        )}
      </div>
      <input
        type="range"
        {...{ min, max, value: currentOrDefault, step: config.step }}
        onChange={(evt) => handleChange(evt.target.value)}
        className={`
          range range-sm mt-1
          ${currentOrDefault === config.dflt ? 'range-secondary' : 'range-accent'}
        `}
      />
      {children}
    </>
  )
}

export const PctInput = ({ config, settings, current, updateFunc, type = 'pct', ...rest }) => {
  const suffix = type === 'deg' ? '°' : '%'
  const factor = type === 'deg' ? 1 : 100
  const dflt = config[type]
  let pctCurrent = typeof current === 'undefined' ? dflt : current * factor

  const valFormatter = (val) => round(val)
  const pctUpdateFunc = useCallback(
    (path, newVal) => updateFunc(path, newVal === undefined ? undefined : newVal / factor),
    [updateFunc]
  )

  return (
    <SliderInput
      {...{
        ...rest,
        config: {
          ...config,
          step: 0.1,
          dflt,
        },
        current: pctCurrent,
        updateFunc: pctUpdateFunc,
        suffix,
        valFormatter,
      }}
    >
      <div className="flex flex-row justify-around">
        <span className={current === dflt ? 'text-secondary' : 'text-accent'}>
          {config.toAbs && settings.measurements
            ? formatMm(config.toAbs(current / factor, settings))
            : ' '}
        </span>
      </div>
    </SliderInput>
  )
}

export const DegInput = (props) => <PctInput {...props} type="deg" />

export const MmInput = (props) => {
  const mmUpdateFunc = useCallback(
    (path, newCurrent) => {
      const calcCurrent =
        typeof newCurrent === 'undefined' ? undefined : measurementAsMm(newCurrent, props.units)
      props.updateFunc(path, calcCurrent)
    },
    [props.updateFunc, props.units]
  )
  return (
    <SliderInput
      {...{
        ...props,
        current:
          props.current === undefined ? undefined : measurementAsUnits(props.current, props.units),
        updateFunc: mmUpdateFunc,
        valFormatter: (val) => (props.units === 'imperial' ? formatFraction128(val, null) : val),
        suffix: props.units === 'imperial' ? '"' : 'cm',
      }}
    />
  )
}

export const ConstantInput = () => <p>FIXME: Constant options are not implemented (yet)</p>
