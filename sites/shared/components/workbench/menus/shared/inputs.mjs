import { useEffect, useCallback } from 'react'
import { round, measurementAsMm, measurementAsUnits, formatFraction128 } from 'shared/utils.mjs'
import { ChoiceButton } from 'shared/components/choice-button.mjs'

/*******************************************************************************************
 * This file contains the base components to be used by inputs in menus in the workbench
 * For the purposes of our menus, we have two main types:
 * Sliders for changing numbers
 * Lists for changing everything else
 *
 * Inputs that deal with more specific use cases should wrap one of the above base inputs
 *******************************************************************************************/

/** A component that shows a number input to edit a value */
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

/**
 * A hook to get the change handler for an input.
 * Also sets the reset function on a parent component
 * @param  {Number|String|Boolean} options.dflt       the default value for the input
 * @param  {Function}              options.updateFunc the onChange
 * @param  {string}                options.name       the name of the property being changed
 * @param  {Function}              options.setReset   the setReset function passed from the parent component
 * @return {ret.handleChange}                         the change handler for the input
 */
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

/**
 * An input for selecting and item from a list
 * @param  {String}  options.name       the name of the property this input changes
 * @param  {Object}  options.config     configuration for the input
 * @param  {String|Number}  options.current    the current value of the input
 * @param  {Function}  options.updateFunc the function called by the event handler to update the value
 * @param  {Boolean} options.compact    include descriptions with the list items?
 * @param  {Function}  options.t          translation function
 * @param  {Function}  options.setReset   a setter for the reset function on the parent component
 */
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

/** A boolean version of {@see ListInput} that sets up the necessary configuration */
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

/**
 * An input component that uses a slider to change a number value
 * @param  {String}   options.name         the name of the property being changed by the input
 * @param  {Object}   options.config       configuration for the input
 * @param  {Number}   options.current      the current value of the input
 * @param  {Function}   options.updateFunc   the function called by the event handler to update the value
 * @param  {Function}   options.t            translation function
 * @param  {Boolean}   options.override     open the text input to allow override of the slider?
 * @param  {String}   options.suffix       a suffix to append to value labels
 * @param  {Function} options.valFormatter a function that accepts a value and formats it for display as a label
 * @param  {Function}   options.setReset     a setter for the reset function on the parent component
 */
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
  changed,
}) => {
  const { max, min } = config
  const { handleChange } = useSharedHandlers({
    current,
    dflt: config.dflt,
    updateFunc,
    name,
    setReset,
  })

  let currentOrDefault = changed ? current : config.dflt

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
        {...{ min, max, value: currentOrDefault, step: config.step || 0.1 }}
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

/** A {@see SliderInput} to handle percentage values */
export const PctInput = ({ current, changed, updateFunc, ...rest }) => {
  const factor = 100
  let pctCurrent = changed ? current * factor : current
  const pctUpdateFunc = useCallback(
    (path, newVal) => updateFunc(path, newVal === undefined ? undefined : newVal / factor),
    [updateFunc, factor]
  )

  return (
    <SliderInput
      {...{
        ...rest,
        current: pctCurrent,
        updateFunc: pctUpdateFunc,
        suffix: '%',
        valFormatter: round,
        changed,
      }}
    />
  )
}

/** A {@see SliderInput} to handle degree values */
export const DegInput = (props) => <SliderInput {...props} suffix="°" valFormatter={round} />

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

/** A placeholder for an input to handle constant values */
export const ConstantInput = () => <p>FIXME: Constant options are not implemented (yet)</p>
