import React, { useMemo, useCallback, useState } from 'react'
import { designOptionType, round } from '@freesewing/utils'
import { menuRoundPct } from '../../lib/index.mjs'
import { ButtonFrame, NumberInput } from '@freesewing/react/components/Input'
import { defaultConfig } from '../../config/index.mjs'
import { ApplyIcon } from '@freesewing/react/components/Icon'

/** A boolean version of {@see MenuListInput} that sets up the necessary configuration */
export const MenuBoolInput = (props) => {
  const { name, config } = props
  const boolConfig = useBoolConfig(name, config)

  return <MenuListInput {...props} config={boolConfig} />
}

/** A placeholder for an input to handle constant values */
export const MenuConstantInput = ({
  type = 'number',
  name,
  current,
  updateHandler,
  changed,
  config,
}) => (
  <>
    <input
      type={type}
      className={`
      tw-daisy-input tw-daisy-input-bordered tw-w-full tw-text-base-content
      ${changed ? 'tw-daisy-input-secondary' : 'tw-daisy-input-accent'}
    `}
      value={changed ? current : config.dflt}
      onChange={(evt) => updateHandler([name], evt.target.value)}
    />
  </>
)

/** A {@see MenuSliderInput} to handle degree values */
export const MenuDegInput = (props) => {
  const { updateHandler } = props
  const degUpdateHandler = useCallback(
    (path, newVal) => {
      updateHandler(path, newVal === undefined ? undefined : Number(newVal))
    },
    [updateHandler]
  )
  return (
    <MenuSliderInput {...props} suffix="°" valFormatter={round} updateHandler={degUpdateHandler} />
  )
}

const getTitleAndDesc = (config = {}, i18n = {}, isDesignOption = false) => {
  if (config.choiceTitles && config.choiceDescriptions) {
    const current = typeof config.current === 'undefined' ? config.dflt : config.current
    return {
      title: config.choiceTitles[current],
      desc: config.choiceDescriptions[current],
    }
  }

  let titleKey = config.choiceTitles
    ? 'fixme' //config.choiceTitles[entry]
    : isDesignOption
      ? i18n.en.o[name]
      : `${name}.o.${entry}`
  if (!config.choiceTitles && i18n && i18n.en.o[`${name}.${entry}`])
    titleKey = i18n.en.o[`${name}.${entry}`]
  console.log({ titleKey, titles: config.choiceTitles, isDesignOption })
  const title = config.title
    ? config.title
    : config.titleMethod
      ? config.titleMethod(entry)
      : typeof titleKey === 'string'
        ? i18n.en.o[titleKey]?.t
        : titleKey.t
  const desc = config.valueMethod
    ? config.valueMethod(entry)
    : typeof titleKey === 'string'
      ? i18n.en.o[titleKey]?.d
      : titleKey.d

  return {
    title: 'fixmeTitle',
    desc: 'fixmeDesc',
  }
}

/**
 * An input for selecting and item from a list
 * @param  {String}  options.name       the name of the property this input changes
 * @param  {Object}  options.config     configuration for the input
 * @param  {String|Number}  options.current    the current value of the input
 * @param  {Function}  options.updateFunc the function called by the event handler to update the value
 * @param  {Boolean} options.compact    include descriptions with the list items?
 * @param  {Function}  options.t          translation function
 * @param  {String}  design  name of the design
 * @param  {Boolean} isDesignOption  Whether or not it's a design option
 */
export const MenuListInput = ({
  name,
  config,
  current,
  updateHandler,
  compact = false,
  t,
  changed,
  design,
  isDesignOption = false,
  i18n,
}) => {
  const handleChange = useSharedHandlers({
    dflt: config.dflt,
    updateHandler,
    name,
    isDesignOption,
  })

  return config.list.map((entry) => {
    const { title = false, about = false } = config //getTitleAndDesc(config, i18n, isDesignOption)
    if (!title || !about) console.log('No title or about in', { name, config, design })
    const sideBySide = config.sideBySide || about.length + title.length < 42

    return (
      <ButtonFrame
        dense={config.dense || false}
        key={entry}
        active={
          changed
            ? Array.isArray(current)
              ? current.includes(entry)
              : current === entry
            : entry === config.dflt
        }
        onClick={() => handleChange(entry)}
      >
        <div
          className={`tw-w-full tw-flex tw-items-start ${
            sideBySide ? 'tw-flex-row tw-justify-between tw-gap-2' : 'tw-flex-col'
          }`}
        >
          <div className="tw-font-semibold tw-shrink-0">{config.choiceTitles[entry]}</div>
          {compact || !config.choiceDescriptions ? null : (
            <div className="tw-text-base tw-font-normal">{config.choiceDescriptions[entry]}</div>
          )}
        </div>
      </ButtonFrame>
    )
  })
}

/** a toggle input for list/boolean values */
export const MenuListToggle = ({ config, changed, updateHandler, name }) => {
  const boolConfig = useBoolConfig(name, config)
  const handleChange = useSharedHandlers({ dflt: boolConfig.dflt, updateHandler, name })

  const dfltIndex = boolConfig.list.indexOf(boolConfig.dflt)

  const doToggle = () =>
    handleChange(boolConfig.list[changed ? dfltIndex : Math.abs(dfltIndex - 1)])

  const checked = boolConfig.dflt == false ? changed : !changed

  return (
    <input
      type="checkbox"
      className={`tw-daisy-toggle ${changed ? 'tw-daisy-toggle-accent' : 'tw-daisy-toggle-secondary'}`}
      checked={checked}
      onChange={doToggle}
      onClick={(evt) => evt.stopPropagation()}
    />
  )
}

export const MenuMmInput = (props) => {
  const { units, updateHandler, current, config } = props
  const mmUpdateHandler = useCallback(
    (path, newCurrent) => {
      const calcCurrent =
        typeof newCurrent === 'undefined' ? undefined : measurementAsMm(newCurrent, units)
      updateHandler(path, calcCurrent)
    },
    [updateHandler, units]
  )

  // add a default step that's appropriate to the unit. can be overwritten by config
  const defaultStep = units === 'imperial' ? 0.125 : 0.1

  return (
    <MenuSliderInput
      {...props}
      {...{
        config: {
          step: defaultStep,
          ...config,
          dflt: measurementAsUnits(config.dflt, units),
        },
        current: current === undefined ? undefined : measurementAsUnits(current, units),
        updateHandler: mmUpdateHandler,
        valFormatter: (val) => (units === 'imperial' ? formatFraction128(val, null) : val),
        suffix: units === 'imperial' ? '"' : 'cm',
      }}
    />
  )
}

/** A {@see SliderInput} to handle percentage values */
export const MenuPctInput = ({ current, changed, updateHandler, config, ...rest }) => {
  const factor = 100
  let pctCurrent = changed ? menuRoundPct(current, factor) : current
  const pctUpdateHandler = useCallback(
    (path, newVal) =>
      updateHandler(path, newVal === undefined ? undefined : menuRoundPct(newVal, 1 / factor)),
    [updateHandler]
  )

  return (
    <MenuSliderInput
      {...{
        ...rest,
        config: { ...config, dflt: menuRoundPct(config.dflt, factor) },
        current: pctCurrent,
        updateHandler: pctUpdateHandler,
        suffix: '%',
        valFormatter: round,
        changed,
      }}
    />
  )
}

/**
 * An input component that uses a slider to change a number value
 * @param  {String}   options.name         the name of the property being changed by the input
 * @param  {Object}   options.config       configuration for the input
 * @param  {Number}   options.current      the current value of the input
 * @param  {Function}   options.updateHandler   the function called by the event handler to update the value
 * @param  {Function}   options.t            translation function
 * @param  {Boolean}   options.override     open the text input to allow override of the slider?
 * @param  {String}   options.suffix       a suffix to append to value labels
 * @param  {Function} options.valFormatter a function that accepts a value and formats it for display as a label
 * @param  {Function}   options.setReset     a setter for the reset function on the parent component
 */
export const MenuSliderInput = ({
  name,
  config,
  current,
  updateHandler,
  override,
  suffix = '',
  valFormatter = (val) => val,
  setReset,
  children,
  changed,
  i18n,
}) => {
  const { max, min } = config
  const handleChange = useSharedHandlers({
    current,
    dflt: config.dflt,
    updateHandler,
    name,
    setReset,
  })

  const val = typeof current === 'undefined' ? config.dflt : current

  if (override)
    return (
      <>
        <div className="tw-flex tw-flex-row tw-justify-between">
          <MenuEditOption
            {...{
              config,
              current: val,
              handleChange,
              min,
              max,
            }}
          />
        </div>
        {children}
      </>
    )

  return (
    <>
      <div className="tw-flex tw-flex-row tw-justify-between">
        <span className="tw-opacity-50">
          <span dangerouslySetInnerHTML={{ __html: valFormatter(min) + suffix }} />
        </span>
        <span
          className={`tw-font-bold ${val === config.dflt ? 'tw-text-secondary' : 'tw-text-accent'}`}
        >
          <span dangerouslySetInnerHTML={{ __html: valFormatter(val) + suffix }} />
        </span>
        <span className="tw-opacity-50">
          <span dangerouslySetInnerHTML={{ __html: valFormatter(max) + suffix }} />
        </span>
      </div>
      <input
        type="range"
        {...{ min, max, value: val, step: config.step || 0.1 }}
        onChange={(evt) => handleChange(evt.target.value)}
        className={`
          tw-daisy-range tw-daisy-range-sm tw-mt-1
          ${changed ? 'tw-daisy-range-accent' : 'tw-daisy-range-secondary'}
        `}
      />
      {children}
    </>
  )
}

export const MenuEditOption = (props) => {
  const [manualEdit, setManualEdit] = useState(props.current)
  const { config, handleChange } = props
  const type = designOptionType(config)

  const onUpdate = useCallback(
    (validVal) => {
      if (validVal !== null && validVal !== false) handleChange(validVal)
    },
    [handleChange]
  )

  if (!['pct', 'count', 'deg', 'mm'].includes(type))
    return <p>This design option type does not have a component to handle manual input.</p>

  return (
    <div className="tw-daisy-form-control tw-mb-2 tw-w-full">
      <label className="tw-daisy-label tw-font-medium tw-text-accent">
        <em>Enter a custom value ({defaultConfig.menuOptionEditLabels[type]})</em>
      </label>
      <label className="tw-daisy-input-group tw-daisy-input-group-sm tw-flex tw-flex-row tw-items-center tw-gap-2 tw--mt-4">
        <NumberInput value={manualEdit} update={setManualEdit} />
        <button
          className="tw-daisy-btn tw-daisy-btn-secondary tw-mt-4"
          onClick={() => onUpdate(manualEdit)}
        >
          <ApplyIcon />
        </button>
      </label>
    </div>
  )
}

/**
 * A hook to get the change handler for an input.
 * @param  {Number|String|Boolean} options.dflt       the default value for the input
 * @param  {Function}              options.updateHandler the onChange
 * @param  {string}                options.name       the name of the property being changed
 * @return the change handler for the input
 */
const useSharedHandlers = ({ dflt, updateHandler, name, isDesignOption }) => {
  return useCallback(
    (newCurrent = '__UNSET__') => {
      /*
       * When a design option is set to the default, just unset it instead
       * This is both more efficient, and  makes it easy to see in which ways
       * your pattern differs from the defaults
       */
      if (isDesignOption && newCurrent === dflt) newCurrent = '__UNSET__'
      updateHandler([name], newCurrent)
    },
    [dflt, updateHandler, name, isDesignOption]
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

/** an input for the 'only' setting. toggles individual parts*/
export const MenuOnlySettingInput = (props) => {
  const { config } = props
  config.sideBySide = true
  config.titleMethod = (entry, t) => {
    const chunks = entry.split('.')
    return <span className="tw-font-medium tw-text-base">{t(`${chunks[0]}:${chunks[1]}`)}</span>
  }
  config.valueMethod = (entry) => (
    <span className="tw-text-sm">{capitalize(entry.split('.')[0])}</span>
  )
  config.dense = true
  // Sort alphabetically (translated)
  const order = []
  for (const part of config.list) {
    const [ns, name] = part.split('.')
    order.push(t(`${ns}:${name}`) + `|${part}`)
  }
  order.sort()
  config.list = order.map((entry) => entry.split('|')[1])

  return <MenuListInput {...props} />
}

export const MenuUxSettingInput = (props) => {
  const { state, update } = props

  return <MenuListInput {...props} updateHandler={update.ui} current={state.ui.ux} />
}
