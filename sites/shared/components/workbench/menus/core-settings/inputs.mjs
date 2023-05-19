import { useState } from 'react'
import { formatMm } from 'shared/utils.mjs'
import { ClearIcon } from 'shared/components/icons.mjs'
import { ChoiceButton } from 'shared/components/choice-button.mjs'
import orderBy from 'lodash.orderby'

// Shared input for list inputs
export const ListSetting = ({ name, list, config, current, update, t }) => {
  if (typeof current === 'undefined') current = config.dflt

  const [value, setValue] = useState(current)

  const handleChange = (newCurrent) => {
    if (newCurrent === config.dflt) reset()
    else {
      update.settings([name], newCurrent)
      setValue(newCurrent)
    }
  }

  const reset = () => {
    update.settings([name])
    setValue(config.dflt)
  }

  return (
    <>
      <p>{t(`core-settings:${name}.d`)}</p>
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

// Shared input for mm inputs
export const MmSetting = ({ name, config, current, update, t, units }) => {
  if (typeof current === 'undefined') current = config.dflt

  const [value, setValue] = useState(current)

  const handleChange = (evt) => {
    const newCurrent = parseFloat(evt.target.value)

    if (newCurrent === config.dflt) reset()
    else {
      update.settings([name], newCurrent)
      setValue(newCurrent)
    }
  }
  const reset = () => {
    update.settings([name])
    setValue(config.dflt)
  }

  return <SliderSetting {...{ name, config, current, update, t, value, handleChange, units }} mm />
}

// Shared input for number inputs
export const NrSetting = ({ name, config, current, update, t }) => {
  if (typeof current === 'undefined') current = config.dflt

  const [value, setValue] = useState(current)

  const handleChange = (evt) => {
    const newCurrent = parseFloat(evt.target.value)

    if (newCurrent === config.dflt) reset()
    else {
      update.settings([name], newCurrent)
      setValue(newCurrent)
    }
  }
  const reset = () => {
    update.settings([name])
    setValue(config.dflt)
  }

  return <SliderSetting {...{ name, config, current, update, t, value, handleChange }} />
}

// Shared component for slider inputs
const SliderSetting = ({
  name,
  config,
  current,
  update,
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

export const UnitsSettingInputs = ({ name, config, current, update, t }) => (
  <ListSetting
    {...{ name, config, current, update, t }}
    list={config.list.map((key) => ({
      key,
      title: t(`${key}Units`),
    }))}
  />
)

export const MarginSettingInput = (props) => <MmSetting {...props} />
export const ScaleSettingInput = (props) => <NrSetting {...props} />
export const RendererSettingInput = (props) => <ListSetting {...props} />
export const CompleteSettingInput = (props) => <ListSetting {...props} />
export const PaperlessSettingInput = (props) => <ListSetting {...props} />

export const OnlySettingInput = ({ name, config, current, update, t, draftOrder, design }) => {
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
    else update.settings(['only'], [...newParts])
  }

  const reset = () => {
    update.settings(['only'])
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

export const SaMmSettingInput = ({ name, config, current, update, t, units }) => {
  const { dflt, min, max } = config
  if (typeof current === 'undefined') current = config.dflt

  const [value, setValue] = useState(current)

  const handleChange = (evt) => {
    const newCurrent = parseFloat(evt.target.value)
    setValue(newCurrent)
    update.settings([
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

export const SaBoolSettingInput = ({ config, current, update, t, samm, changed }) => {
  if (typeof current === 'undefined') current = config.dflt

  const handleChange = (newCurrent) => {
    if (newCurrent === config.dflt) reset()
    else {
      update.settings([[['sabool'], newCurrent], [['sa']]])
    }
  }

  const reset = () => {
    update.settings([[['sabool']], [['sa']]])
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
