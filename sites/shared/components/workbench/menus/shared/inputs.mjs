import { useEffect, useCallback } from 'react'
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

const useSharedHandlers = ({ dflt, updateFunc, name, setReset }) => {
  const reset = useCallback(() => updateFunc(name), [updateFunc, name])

  const handleChange = useCallback(
    (newCurrent) => {
      if (newCurrent === dflt) reset()
      else {
        updateFunc(name, newCurrent)
      }
    },
    [dflt, updateFunc, name, reset]
  )

  useEffect(() => {
    if (typeof setReset === 'function') setReset(() => reset)
  }, [reset, setReset])

  return { handleChange, reset }
}

export const ListInput = ({ name, config, current, updateFunc, compact = false, t, setReset }) => {
  const { handleChange } = useSharedHandlers({
    dflt: config.dflt,
    updateFunc,
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

export const BoolInput = (props) => {
  const boolConfig = {
    list: [0, 1],
    choiceTitles: {
      0: `${props.name}No`,
      1: `${props.name}Yes`,
    },
    valueTitles: {
      0: 'no',
      1: 'yes',
    },
    dflt: props.config.dflt ? 1 : 0,
    ...props.config,
  }

  return <ListInput {...props} config={boolConfig} />
}

export const SliderInput = ({
  name,
  config,
  current,
  updateFunc,
  t,
  override,
  suffix = '',
  valFormatter = (val) => val,
  setReset,
  children,
}) => {
  const { max, min } = config
  const { handleChange } = useSharedHandlers({
    current,
    dflt: config.dflt,
    updateFunc,
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
  let pctCurrent = typeof current === 'undefined' ? config.dflt : current * factor

  const valFormatter = (val) => round(val)
  const pctUpdateFunc = useCallback(
    (path, newVal) => updateFunc(path, newVal === undefined ? undefined : newVal / factor),
    [updateFunc, factor]
  )

  return (
    <SliderInput
      {...{
        ...rest,
        config: {
          ...config,
          step: 0.1,
        },
        current: pctCurrent,
        updateFunc: pctUpdateFunc,
        suffix,
        valFormatter,
      }}
    >
      <div className="flex flex-row justify-around">
        <span className={current === config.dflt ? 'text-secondary' : 'text-accent'}>
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
  const { units, updateFunc, current } = props
  const mmUpdateFunc = useCallback(
    (path, newCurrent) => {
      const calcCurrent =
        typeof newCurrent === 'undefined' ? undefined : measurementAsMm(newCurrent, units)
      updateFunc(path, calcCurrent)
    },
    [updateFunc, units]
  )

  return (
    <SliderInput
      {...{
        ...props,
        current: current === undefined ? undefined : measurementAsUnits(current, units),
        updateFunc: mmUpdateFunc,
        valFormatter: (val) => (units === 'imperial' ? formatFraction128(val, null) : val),
        suffix: units === 'imperial' ? '"' : 'cm',
      }}
    />
  )
}

export const ConstantInput = () => <p>FIXME: Constant options are not implemented (yet)</p>
