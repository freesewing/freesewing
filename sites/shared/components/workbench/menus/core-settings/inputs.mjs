import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { SecText, SumButton, Li, SumDiv, Deg } from 'shared/components/workbench/menus/index.mjs'
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

  return (
    <div className="py-4 mx-6 border-l-2 pl-2">
      <p className="m-0 p-0 px-2 mb-2 text-base-content opacity-60 italic">
        {t(`core-settings:${name}.d`)}
      </p>
      <div className="flex flex-row justify-between">
        <span
          className="opacity-50"
          dangerouslySetInnerHTML={{ __html: formatMm(config.min, units) }}
        />
        <span
          className={`font-bold ${
            current === config.dflt ? 'text-secondary-focus' : 'text-accent'
          }`}
          dangerouslySetInnerHTML={{ __html: formatMm(current, units) }}
        />
        <span
          className="opacity-50"
          dangerouslySetInnerHTML={{ __html: formatMm(config.max, units) }}
        />
      </div>
      <input
        type="range"
        max={config.max}
        min={config.min}
        step={0.1}
        value={current}
        onChange={handleChange}
        className={`
          range range-sm mt-1
          ${current === config.dflt ? 'range-secondary' : 'range-accent'}
        `}
      />
      <div className="flex flex-row justify-between">
        <span />
        <button
          title={t('reset')}
          className="btn btn-ghost btn-xs text-accent"
          disabled={current === config.dflt}
          onClick={reset}
        >
          <ClearIcon />
        </button>
      </div>
    </div>
  )
}

// Shared input for number inputs
export const NrSetting = ({ name, config, current, update, t }) => {
  if (typeof current === 'undefined') current = config.dflt
  const { min = 0, max = 1 } = config

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

  return (
    <div className="py-4 mx-6 border-l-2 pl-2">
      <p className="m-0 p-0 px-2 mb-2 text-base-content opacity-60 italic">
        {t(`core-settings:${name}.d`)}
      </p>
      <div className="flex flex-row justify-between">
        <span className="opacity-50">{min}</span>
        <span
          className={`font-bold ${
            current === config.dflt ? 'text-secondary-focus' : 'text-accent'
          }`}
        >
          {current}
        </span>
        <span className="opacity-50">{max}</span>
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
      <div className="flex flex-row justify-between">
        <span />
        <button
          title={t('reset')}
          className="btn btn-ghost btn-xs text-accent"
          disabled={current === config.dflt}
          onClick={reset}
        >
          <ClearIcon />
        </button>
      </div>
    </div>
  )
}

export const LocaleSettingInput = (props) => <ListSetting {...props} />

export const UnitsSettingInput = ({ name, config, current, update, t }) => (
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

export const OnlySettingInput = ({ name, config, current, update, t, draftOrder }) => {
  const partNames = draftOrder.map((part) => ({ id: part, name: t(`part.${part}`) }))

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
    <div className="py-4 mx-6 border-l-2 pl-2">
      <p className="m-0 p-0 px-2 mb-2 text-base-content opacity-60 italic">
        {t(`core-settings:only.d`)}
      </p>
      <div className="flex flex-row">
        <div className="grow">
          {orderBy(partNames, ['name'], ['asc']).map((part) => (
            <button
              key={part.id}
              onClick={() => togglePart(part.id)}
              className={`
                mr-1 mb-1 text-left text-lg w-full hover:text-secondary-focus px-2
                ${current && current.includes(part.id) && 'font-bold text-secondary-focus'}
              `}
            >
              <span
                className={`
                text-3xl mr-2 inline-block p-0 leading-3
                translate-y-3
              `}
              >
                <>&deg;</>
              </span>
              {part.name}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-row-reverse">
        <button
          title={t('reset')}
          className="btn btn-ghost btn-xs text-accent"
          disabled={!current || current.length < 1}
          onClick={reset}
        >
          <ClearIcon />
        </button>
      </div>
    </div>
  )
}

export const SaMmSettingInput = ({ name, config, current, update, t, units }) => {
  return null
  const { dflt, min, max } = config
  if (typeof current === 'undefined') current = config.dflt

  const [value, setValue] = useState(current)

  const handleChange = (evt) => {
    const newCurrent = parseFloat(evt.target.value)

    setValue(newCurrent)
    if (sabool) update.settings([['samm'], newCurrent, ['sa'], newCurrent])
    else update.settings(['samm'], newCurrent)
  }
  const reset = () => {
    update.settings(['samm'])
    setValue(config.dflt)
  }

  return (
    <div className="py-4 mx-6 border-l-2 pl-2">
      <p className="m-0 p-0 px-2 mb-2 text-base-content opacity-60 italic">
        {t(`core-settings:sa.d`)}
      </p>
      <div className="flex flex-row justify-between">
        <span className="opacity-50" dangerouslySetInnerHTML={{ __html: formatMm(min, units) }} />
        <span
          className={`font-bold ${val === dflt ? 'text-secondary-focus' : 'text-accent'}`}
          dangerouslySetInnerHTML={{ __html: formatMm(val, units) }}
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
      <div className="flex flex-row justify-between">
        <span />
        <button
          title={t('reset')}
          className="btn btn-ghost btn-xs text-accent"
          disabled={current === config.dflt}
          onClick={reset}
        >
          <ClearIcon />
        </button>
      </div>
    </div>
  )
}

export const SaBoolSettingInput = ({ config, current, update, t, samm, changed }) => {
  if (typeof current === 'undefined') current = config.dflt

  const handleChange = (newCurrent) => {
    const newSa = newCurrent ? samm : 0
    if (newCurrent === config.dflt) reset()
    else {
      update.settings([
        [['sabool'], newCurrent],
        [['sa'], newSa],
      ])
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
