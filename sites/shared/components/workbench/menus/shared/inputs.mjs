import { useCallback, useMemo, useState, useEffect, useRef } from 'react'
import {
  round,
  measurementAsMm,
  measurementAsUnits,
  formatFraction128,
  fractionToDecimal,
} from 'shared/utils.mjs'
import { ChoiceButton } from 'shared/components/choice-button.mjs'
import debounce from 'lodash.debounce'

/*******************************************************************************************
 * This file contains the base components to be used by inputs in menus in the workbench
 * For the purposes of our menus, we have two main types:
 * Sliders for changing numbers
 * Lists for changing everything else
 *
 * Inputs that deal with more specific use cases should wrap one of the above base inputs
 *******************************************************************************************/

/** Regex to validate that an input is a number */
const numberInputMatchers = {
  0: /^-?[0-9]*[.,eE]?[0-9]+$/, // match a single decimal separator
  1: /^-?[0-9]*(\s?[0-9]+\/|[.,eE])?[0-9]+$/, // match a single decimal separator or fraction
}

/**
 * Validate and parse a value that should be a number
 * @param  {any}  val            the value to validate
 * @param  {Boolean} allowFractions should fractions be considered valid input?
 * @param  {Number}  min            the minimum allowable value
 * @param  {Number}  max            the maximum allowable value
 * @return {null|false|Number}      null if the value is empty,
 *                                  false if the value is invalid,
 *                                  or the value parsed to a number if it is valid
 */
const validateVal = (val, allowFractions = true, min = -Infinity, max = Infinity) => {
  // if it's empty, we're neutral
  if (typeof val === 'undefined' || val === '') return null

  // make sure it's a string
  val = ('' + val).trim()

  // get the appropriate match pattern and check for a match
  const matchPattern = numberInputMatchers[Number(allowFractions)]
  if (!val.match(matchPattern)) return false

  // replace comma with period
  const parsedVal = val.replace(',', '.')
  // if fractions are allowed, parse for fractions, otherwise use the number as a value
  const useVal = allowFractions ? fractionToDecimal(parsedVal) : parsedVal

  // check that it's a number and it's in the range
  if (isNaN(useVal) || useVal > max || useVal < min) return false

  // all checks passed. return the parsed value
  return useVal
}

/**
 * A number input that accepts comma or period decimal separators.
 * Because our use case is almost never going to include thousands, we're using a very simple way of accepting commas:
 * The validator checks for the presence of a single comma or period followed by numbers
 * The parser replaces a single comma with a period
 *
 * optionally accepts fractions
 * @param  {Number}  options.val       the value of the input
 * @param  {Function}  options.onUpdate  a function to handle when the value is updated to a valid value
 * @param  {Boolean} options.fractions should the input allow fractional input
 */
export const NumberInput = ({
  value,
  onUpdate,
  onMount,
  className,
  fractions = true,
  min = -Infinity,
  max = Infinity,
}) => {
  const valid = useRef(validateVal(value, fractions, min, max))

  // this is the change handler that will be debounced by the debounce handler
  // we check validity inside this debounced function because
  // we need to call the debounce handler on change regardless of validity
  // if we don't, the displayed value won't update
  const handleChange = useCallback(
    (newVal) => {
      // only actually update if the value is valid
      if (typeof onUpdate === 'function') {
        onUpdate(valid.current, newVal)
      }
    },
    [onUpdate, valid]
  )

  // get a debounce handler
  const { debouncedHandleChange, displayVal } = useDebouncedHandlers({ handleChange, val: value })

  // onChange
  const onChange = useCallback(
    (evt) => {
      const newVal = evt.target.value
      // set validity so it will display
      valid.current = validateVal(newVal, fractions, min, max)

      // handle the change
      debouncedHandleChange(newVal)
    },
    [debouncedHandleChange, fractions, min, max, valid]
  )

  useEffect(() => {
    if (typeof onMount === 'function') {
      onMount(valid.current)
    }
  }, [onMount, valid])

  return (
    <input
      type="text"
      inputMode="number"
      className={`input input-bordered ${className || 'input-sm  grow text-base-content'}
        ${valid.current === false && 'input-error'}
        ${valid.current && 'input-success'}
      `}
      value={displayVal}
      onChange={onChange}
    />
  )
}

/** A component that shows a number input to edit a value */
const EditCount = (props) => {
  const { handleChange } = props
  const onUpdate = useCallback(
    (validVal) => {
      if (validVal !== null && validVal !== false) handleChange(validVal)
    },
    [handleChange]
  )

  return (
    <div className="form-control mb-2 w-full">
      <label className="label">
        <span className="label-text text-base-content">{props.min}</span>
        <span className="label-text font-bold text-base-content">{props.current}</span>
        <span className="label-text text-base-content">{props.max}</span>
      </label>
      <label className="input-group input-group-sm">
        <NumberInput value={props.current} onUpdate={onUpdate} min={props.min} max={props.max} />
        <span className="text-base-content font-bold">#</span>
      </label>
    </div>
  )
}

/**
 * A hook to get the change handler for an input.
 * @param  {Number|String|Boolean} options.dflt       the default value for the input
 * @param  {Function}              options.updateFunc the onChange
 * @param  {string}                options.name       the name of the property being changed
 * @return the change handler for the input
 */
const useSharedHandlers = ({ dflt, updateFunc, name }) => {
  return useCallback(
    (newCurrent) => {
      if (newCurrent === dflt) newCurrent = undefined
      updateFunc([name], newCurrent)
    },
    [dflt, updateFunc, name]
  )
}

/** get the configuration that allows a boolean value to use the list input */
const useBoolConfig = (name, config) => {
  return useMemo(
    () => ({
      list: [false, true],
      choiceTitles: {
        false: `${name}No`,
        true: `${name}Yes`,
      },
      valueTitles: {
        false: 'no',
        true: 'yes',
      },
      ...config,
    }),
    [name, config]
  )
}

/** a toggle input for list/boolean values */
export const ListToggle = ({ config, changed, updateFunc, name, color }) => {
  const boolConfig = useBoolConfig(name, config)
  const handleChange = useSharedHandlers({ dflt: boolConfig.dflt, updateFunc, name })

  const dfltIndex = boolConfig.list.indexOf(boolConfig.dflt)

  const doToggle = () =>
    handleChange(boolConfig.list[changed ? dfltIndex : Math.abs(dfltIndex - 1)])

  const checked = boolConfig.dflt == false ? changed : !changed

  //line 89 changes the text colour inside the checkbox
  return (
    <input
      type="checkbox"
      // force tailwind: toggle-accent toggle-primary toggle-secondary
      className={`toggle toggle-${color}`}
      checked={checked}
      onChange={doToggle}
      onClick={(evt) => evt.stopPropagation()}
    />
  )
}

/**
 * An input for selecting and item from a list
 * @param  {String}  options.name       the name of the property this input changes
 * @param  {Object}  options.config     configuration for the input
 * @param  {String|Number}  options.current    the current value of the input
 * @param  {Function}  options.updateFunc the function called by the event handler to update the value
 * @param  {Boolean} options.compact    include descriptions with the list items?
 * @param  {Function}  options.t          translation function
 */
export const ListInput = ({ name, config, current, updateFunc, compact = false, t, changed }) => {
  const handleChange = useSharedHandlers({
    dflt: config.dflt,
    updateFunc,
    name,
  })

  return (
    <>
      <p>{t(`${name}.d`)}</p>
      {config.list.map((entry) => {
        const titleKey = config.choiceTitles ? config.choiceTitles[entry] : `${name}.o.${entry}`
        return (
          <ChoiceButton
            key={entry}
            title={t(`${titleKey}.t`)}
            color={'primary'}
            active={changed ? current === entry : entry === config.dflt}
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
  const { name, config } = props
  const boolConfig = useBoolConfig(name, config)

  return <ListInput {...props} config={boolConfig} />
}

export const useDebouncedHandlers = ({ handleChange = () => {}, val }) => {
  // hold onto what we're showing as the value so that the input doesn't look unresponsive
  const [displayVal, setDisplayVal] = useState(val)

  // the debounce function needs to be it's own memoized value so we can flush it on unmount
  const debouncer = useMemo(() => debounce(handleChange, 300), [handleChange])

  // this is the change handler
  const debouncedHandleChange = useCallback(
    (newVal) => {
      // always set the display
      setDisplayVal(newVal)
      // debounce the actual update
      debouncer(newVal)
    },
    [setDisplayVal, debouncer]
  )

  // immediately call the debounced function on unmount so we don't miss an update
  useEffect(() => debouncer.flush, [debouncer])

  // set the display val to the current value when it gets changed
  useEffect(() => {
    setDisplayVal(val)
  }, [val])

  return { debouncedHandleChange, displayVal }
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
  const handleChange = useSharedHandlers({
    current,
    dflt: config.dflt,
    updateFunc,
    name,
    setReset,
  })

  const { debouncedHandleChange, displayVal } = useDebouncedHandlers({
    handleChange,
    val: changed ? current : config.dflt,
  })

  return (
    <>
      <p>{t(`${name}.d`)}</p>
      <div className="flex flex-row justify-between">
        {override ? (
          <EditCount
            {...{
              current: displayVal,
              handleChange,
              min,
              max,
              t,
            }}
          />
        ) : (
          <>
            <span>
              <span dangerouslySetInnerHTML={{ __html: valFormatter(min) + suffix }} />
            </span>
            <span className={`font-bold ${changed ? 'text-accent' : 'text-secondary'}`}>
              <span dangerouslySetInnerHTML={{ __html: valFormatter(displayVal) + suffix }} />
            </span>
            <span>
              <span dangerouslySetInnerHTML={{ __html: valFormatter(max) + suffix }} />
            </span>
          </>
        )}
      </div>
      <input
        type="range"
        {...{ min, max, value: displayVal, step: config.step || 0.1 }}
        onChange={(evt) => debouncedHandleChange(evt.target.value)}
        className={`
          range range-sm mt-1
          ${changed ? 'range-accent' : 'range-secondary'}
        `}
      />
      {children}
    </>
  )
}

/**
 * round a value to the correct number of decimal places to display all supplied digits after multiplication
 * this is a workaround for floating point errors
 * examples:
 * roundPct(0.72, 100) === 72
 * roundPct(7.5, 0.01) === 0.075
 * roundPct(7.50, 0.01) === 0.0750
 * @param  {Number} num the number to be operated on
 * @param  {Number} factor the number to multiply by
 * @return {Number}     the given num multiplied by the factor, rounded appropriately
 */
const roundPct = (num, factor) => {
  // stringify
  const str = '' + num
  // get the index of the decimal point in the number
  const decimalIndex = str.indexOf('.')
  // get the number of places the factor moves the decimal point
  const factorPlaces = factor > 0 ? Math.ceil(Math.log10(factor)) : Math.floor(Math.log10(factor))
  // the number of places needed is the number of digits that exist after the decimal minus the number of places the decimal point is being moved
  const numPlaces = Math.max(0, str.length - (decimalIndex + factorPlaces))
  return round(num * factor, numPlaces)
}

/** A {@see SliderInput} to handle percentage values */
export const PctInput = ({ current, changed, updateFunc, config, ...rest }) => {
  const factor = 100
  let pctCurrent = changed ? roundPct(current, factor) : current
  const pctUpdateFunc = useCallback(
    (path, newVal) =>
      updateFunc(path, newVal === undefined ? undefined : roundPct(newVal, 1 / factor)),
    [updateFunc]
  )

  return (
    <SliderInput
      {...{
        ...rest,
        config: { ...config, dflt: roundPct(config.dflt, factor) },
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
export const DegInput = (props) => {
  const { updateFunc } = props
  const degUpdateFunc = useCallback(
    (path, newVal) => {
      updateFunc(path, newVal === undefined ? undefined : Number(newVal))
    },
    [updateFunc]
  )
  return <SliderInput {...props} suffix="°" valFormatter={round} updateFunc={degUpdateFunc} />
}

export const MmInput = (props) => {
  const { units, updateFunc, current, config } = props
  const mmUpdateFunc = useCallback(
    (path, newCurrent) => {
      const calcCurrent =
        typeof newCurrent === 'undefined' ? undefined : measurementAsMm(newCurrent, units)
      updateFunc(path, calcCurrent)
    },
    [updateFunc, units]
  )

  // add a default step that's appropriate to the unit. can be overwritten by config
  const defaultStep = units === 'imperial' ? 0.125 : 0.1

  return (
    <SliderInput
      {...{
        ...props,
        config: {
          step: defaultStep,
          ...config,
          dflt: measurementAsUnits(config.dflt, units),
        },
        current: current === undefined ? undefined : measurementAsUnits(current, units),
        updateFunc: mmUpdateFunc,
        valFormatter: (val) => (units === 'imperial' ? formatFraction128(val, null) : val),
        suffix: units === 'imperial' ? '"' : 'cm',
      }}
    />
  )
}

/** A placeholder for an input to handle constant values */
export const ConstantInput = ({
  type = 'number',
  name,
  current,
  updateFunc,
  t,
  changed,
  config,
}) => (
  <>
    <p>{t(`${name}.d`)}</p>
    <input
      type={type}
      className={`
      input input-bordered w-full text-base-content
      input-${changed ? 'accent' : 'secondary'}
    `}
      value={changed ? current : config.dflt}
      onChange={(evt) => updateFunc([name], evt.target.value)}
    />
  </>
)
