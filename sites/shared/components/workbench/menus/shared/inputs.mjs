import { useCallback, useMemo } from 'react'
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
 * @param  {Number|String|Boolean} options.dflt       the default value for the input
 * @param  {Function}              options.updateFunc the onChange
 * @param  {string}                options.name       the name of the property being changed
 * @return the change handler for the input
 */
const useSharedHandlers = ({ dflt, updateFunc, name }) => {
  return useCallback(
    (newCurrent) => {
      if (newCurrent === dflt) newCurrent = undefined

      updateFunc(name, newCurrent)
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
export const ListToggle = ({ config, changed, updateFunc, name }) => {
  const boolConfig = useBoolConfig(name, config)
  const handleChange = useSharedHandlers({ dflt: boolConfig.dflt, updateFunc, name })

  const dfltIndex = boolConfig.list.indexOf(boolConfig.dflt)

  const doToggle = () =>
    handleChange(boolConfig.list[changed ? dfltIndex : Math.abs(dfltIndex - 1)])

  const checked = boolConfig.dflt == false ? changed : !changed

  return (
    <input type="checkbox" className="toggle toggle-sm" checked={checked} onChange={doToggle} />
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
            color={entry === config.dflt ? 'primary' : 'secondary'}
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
  const defaultStep = units === 'metric' ? 0.1 : 0.125

  return (
    <SliderInput
      {...{
        ...props,
        config: { step: defaultStep, ...config },
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
