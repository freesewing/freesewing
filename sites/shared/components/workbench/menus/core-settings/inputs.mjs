import { useState } from 'react'
import { formatMm } from 'shared/utils.mjs'
import { ChoiceButton } from 'shared/components/choice-button.mjs'
import orderBy from 'lodash.orderby'
import { ListInput, SliderInput, BoolInput } from '../shared/inputs.mjs'

// Shared input for list inputs
export const ListSetting = ({ name, config, current, updater, t }) => (
  <ListInput
    {...{
      name,
      config,
      current,
      dflt: config.dflt,
      updater,
      t,
    }}
  />
)

// Shared input for mm inputs
export const MmSetting = ({ name, config, current, updater, t, units }) => (
  <SliderInput
    {...{
      name,
      config,
      current,
      dlft: config.dflt,
      updater,
      t,
      valFormatter: (val) => formatMm(val, units),
      step: config.step,
    }}
  />
)
// {
//   if (typeof current === 'undefined') current = config.dflt

//   const [value, setValue] = useState(current)

//   const handleChange = (evt) => {
//     const newCurrent = parseFloat(evt.target.value)

//     if (newCurrent === config.dflt) reset()
//     else {
//       update.settings([name], newCurrent)
//       setValue(newCurrent)
//     }
//   }
//   const reset = () => {
//     update.settings([name])
//     setValue(config.dflt)
//   }

//   return <SliderSetting {...{ name, config, current, update, t, value, handleChange, units }} mm />
// }

// Shared input for number inputs
export const NrSetting = ({ name, config, current, updater, t }) => (
  <SliderInput
    {...{
      name,
      config,
      current,
      dflt: config.dflt,
      updater: (path, newVal) => updater(path, parseFloat(newVal)),
      t,
      step: config.step,
    }}
  />
)
// {
//   if (typeof current === 'undefined') current = config.dflt

//   const [value, setValue] = useState(current)

//   const handleChange = (evt) => {
//     const newCurrent = parseFloat(evt.target.value)

//     if (newCurrent === config.dflt) reset()
//     else {
//       update.settings([name], newCurrent)
//       setValue(newCurrent)
//     }
//   }
//   const reset = () => {
//     update.settings([name])
//     setValue(config.dflt)
//   }

//   return <SliderSetting {...{ name, config, current, update, t, value, handleChange }} />
// }

// Shared component for slider inputs
const SliderSetting = ({
  name,
  config,
  current,
  updater,
  t,
  value,
  handleChange,
  units,
  mm = false,
}) => (
  <>
    <p>{t(`core-settings:${name}.d`)}</p>
    <div className="flex flex-row justify-between">
      <span className="opacity-50">{config.min}</span>
      <span
        className={`font-bold ${current === config.dflt ? 'text-secondary-focus' : 'text-accent'}`}
      >
        {mm ? <span dangerouslySetInnerHTML={{ __html: formatMm(current, units) }} /> : current}
      </span>
      <span className="opacity-50">{config.max}</span>
    </div>
    <input
      type="range"
      max={config.max}
      min={config.min}
      step={config.step}
      value={value}
      onChange={handleChange}
      className={`
        range range-sm mt-1
        ${current === config.dflt ? 'range-secondary' : 'range-accent'}
      `}
    />
  </>
)

export const LocaleSettingInput = (props) => <ListSetting {...props} />
export const UnitsSettingInput = (props) => <ListSetting {...props} />

export const UnitsSettingInputs = (props) => {
  props.config.list = props.list.map((key) => ({
    key,
    title: props.t(`${key}Units`),
  }))

  return <ListSetting {...props} />
}

export const MarginSettingInput = (props) => <MmSetting {...props} />
export const ScaleSettingInput = (props) => <NrSetting {...props} />
export const RendererSettingInput = (props) => <ListSetting {...props} />
export const CompleteSettingInput = (props) => <ListSetting {...props} />
export const PaperlessSettingInput = (props) => <ListSetting {...props} />

export const OnlySettingInput = ({ name, config, current, updater, t, draftOrder, design }) => {
  const partNames = config.parts.map((part) => ({
    id: part,
    t: t(`${design}:${part}.t`),
    d: t(`${design}:${part}.d`),
  }))

  const togglePart = (part) => {
    const parts = current || []
    const newParts = new Set(parts)
    if (newParts.has(part)) newParts.delete(part)
    else newParts.add(part)
    if (newParts.size < 1) reset()
    else updater(['only'], [...newParts])
  }

  const reset = () => {
    updater(['only'])
  }

  return (
    <>
      <p>{t(`core-settings:only.d`)}</p>
      {orderBy(partNames, ['name'], ['asc']).map((part) => {
        const included = Array.isArray(current) ? (current.includes(part.id) ? true : false) : true

        return (
          <ChoiceButton
            key={part.id}
            title={part.t}
            color={included ? 'secondary' : 'accent'}
            active={included}
            onClick={() => togglePart(part.id)}
          >
            {part.d}
          </ChoiceButton>
        )
      })}
    </>
  )
}

export const SaMmSettingInput = ({ name, config, current, updater, t, units }) => {
  const { dflt, min, max } = config
  if (typeof current === 'undefined') current = config.dflt

  const [value, setValue] = useState(current)

  const handleChange = (evt) => {
    const newCurrent = parseFloat(evt.target.value)
    setValue(newCurrent)
    updater([
      [['samm'], newCurrent],
      [['sa'], newCurrent],
    ])
  }

  return (
    <>
      <p>{t(`core-settings:samm.d`)}</p>
      <div className="flex flex-row justify-between">
        <span className="opacity-50" dangerouslySetInnerHTML={{ __html: formatMm(min, units) }} />
        <span
          className={`font-bold ${current === dflt ? 'text-secondary-focus' : 'text-accent'}`}
          dangerouslySetInnerHTML={{ __html: formatMm(current, units) }}
        />
        <span className="opacity-50" dangerouslySetInnerHTML={{ __html: formatMm(max, units) }} />
      </div>
      <input
        type="range"
        max={max}
        min={min}
        step={0.1}
        value={value}
        onChange={handleChange}
        className={`
          range range-sm mt-1
          ${current === config.dflt ? 'range-secondary' : 'range-accent'}
        `}
      />
    </>
  )
}

export const SaBoolSettingInput = ({ config, current, updater, t, samm, changed }) => {
  if (typeof current === 'undefined') current = config.dflt

  const handleChange = (newCurrent) => {
    if (newCurrent === config.dflt) reset()
    else {
      updater([[['sabool'], newCurrent], [['sa']]])
    }
  }

  const reset = () => {
    updater([[['sabool']], [['sa']]])
  }

  return (
    <>
      <p>{t(`core-settings:sabool.d`)}</p>
      {config.list.map((entry) => (
        <ChoiceButton
          key={entry}
          title={t(`core-settings:${config.choiceTitles[entry]}.t`)}
          color={entry === config.dflt ? 'primary' : 'accent'}
          active={current === entry}
          onClick={() => handleChange(entry)}
        >
          {t(`core-settings:${config.choiceTitles[entry]}.d`)}
        </ChoiceButton>
      ))}
    </>
  )
}
