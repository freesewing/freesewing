import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { SecText, SumButton, Li, SumDiv, Deg } from 'shared/components/workbench/menus/index.mjs'
import { formatMm } from 'shared/utils.mjs'
import { ClearIcon } from 'shared/components/icons.mjs'
import orderBy from 'lodash.orderby'

export const BoolSetting = ({ gist, updateGist, setting }) => {
  const { t } = useTranslation(['app'])
  const [value, setValue] = useState(gist[setting])

  const toggle = () => {
    updateGist(['settings', setting], !value)
    setValue(!value)
  }

  return (
    <Li>
      <SumButton onClick={toggle}>
        <SumDiv>
          <Deg />
          <span>{t(`settings:${setting}.t`)}</span>
        </SumDiv>
        <SecText>{t(value ? 'yes' : 'no')}</SecText>
      </SumButton>
    </Li>
  )
}

export const ListSetting = ({ gist, updateGist, dflt, setting, list }) => {
  const { t } = useTranslation(['settings'])
  const val = gist.settings?.[setting]

  const [value, setValue] = useState(val)

  const handleChange = (newVal) => {
    if (newVal === dflt) reset()
    else {
      setValue(newVal)
      updateGist(['settings', setting], newVal)
    }
  }

  const reset = () => {
    setValue(dflt)
    updateGist(['settings', setting], dflt)
  }

  return (
    <div className="py-4 mx-6 border-l-2 pl-2">
      <p className="m-0 p-0 px-2 mb-2 text-base-content opacity-60 italic">
        {t(`settings:${setting}.d`)}
      </p>
      <div className="flex flex-row">
        <div className="grow">
          {list.map((entry) => (
            <button
              key={entry.key}
              onClick={() => handleChange(entry.key)}
              className={`
                mr-1 mb-1 text-left text-lg w-full hover:text-secondary-focus px-2
                ${entry.key === value && 'font-bold text-secondary'}
              `}
            >
              <Deg />
              {entry.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export const MmSetting = (props) => {
  const { t } = useTranslation(['app', 'settings'])
  const { dflt, min, max } = props
  const val = props.gist?.[props.setting]

  const [value, setValue] = useState(val)

  const handleChange = (evt) => {
    const newVal = parseFloat(evt.target.value)

    if (newVal === dflt) reset()
    else {
      setValue(newVal)
      props.updateGist([props.setting], newVal)
    }
  }
  const reset = () => {
    setValue(props.dflt)
    props.updateGist([props.setting], props.dflt)
  }

  return (
    <div className="py-4 mx-6 border-l-2 pl-2">
      <p className="m-0 p-0 px-2 mb-2 text-base-content opacity-60 italic">
        {t(`settings:${props.setting}.d`)}
      </p>
      <div className="flex flex-row justify-between">
        <span
          className="opacity-50"
          dangerouslySetInnerHTML={{ __html: formatMm(min, props.gist.units) }}
        />
        <span
          className={`font-bold ${val === dflt ? 'text-secondary-focus' : 'text-accent'}`}
          dangerouslySetInnerHTML={{ __html: formatMm(val, props.gist.units) }}
        />
        <span
          className="opacity-50"
          dangerouslySetInnerHTML={{ __html: formatMm(max, props.gist.units) }}
        />
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
          ${val === dflt ? 'range-secondary' : 'range-accent'}
        `}
      />
      <div className="flex flex-row justify-between">
        <span />
        <button
          title={t('reset')}
          className="btn btn-ghost btn-xs text-accent"
          disabled={val === dflt}
          onClick={reset}
        >
          <ClearIcon />
        </button>
      </div>
    </div>
  )
}

export const NrSetting = ({ gist, updateGist, dflt, setting, min = 0, max = 1 }) => {
  const { t } = useTranslation(['app', 'settings'])
  const val = gist.settings?.[setting]

  const [value, setValue] = useState(val)

  const handleChange = (evt) => {
    const newVal = parseFloat(evt.target.value)

    if (newVal === dflt) reset()
    else {
      setValue(newVal)
      updateGist(['settings', setting], newVal)
    }
  }
  const reset = () => {
    setValue(dflt)
    updateGist(['settings', setting], dflt)
  }

  return (
    <div className="py-4 mx-6 border-l-2 pl-2">
      <p className="m-0 p-0 px-2 mb-2 text-base-content opacity-60 italic">
        {t(`settings:${setting}.d`)}
      </p>
      <div className="flex flex-row justify-between">
        <span className="opacity-50">{min}</span>
        <span className={`font-bold ${val === dflt ? 'text-secondary-focus' : 'text-accent'}`}>
          {val}
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
          ${val === dflt ? 'range-secondary' : 'range-accent'}
        `}
      />
      <div className="flex flex-row justify-between">
        <span />
        <button
          title={t('reset')}
          className="btn btn-ghost btn-xs text-accent"
          disabled={val === dflt}
          onClick={reset}
        >
          <ClearIcon />
        </button>
      </div>
    </div>
  )
}

export const OnlySetting = (props) => {
  const { t } = useTranslation(['app', 'parts', 'settings'])
  const list = props.patternConfig.draftOrder
  const partNames = list.map((part) => ({ id: part, name: t(`parts:${part}`) }))

  const togglePart = (part) => {
    const parts = props.gist.only || []
    const newParts = new Set(parts)
    if (newParts.has(part)) newParts.delete(part)
    else newParts.add(part)
    if (newParts.size < 1) reset()
    else props.updateGist(['only'], [...newParts])
  }

  const reset = () => {
    props.unsetGist(['only'])
  }

  return (
    <div className="py-4 mx-6 border-l-2 pl-2">
      <p className="m-0 p-0 px-2 mb-2 text-base-content opacity-60 italic">
        {t(`settings:only.d`)}
      </p>
      <div className="flex flex-row">
        <div className="grow">
          {orderBy(partNames, ['name'], ['asc']).map((part) => (
            <button
              key={part.id}
              onClick={() => togglePart(part.id)}
              className={`
                mr-1 mb-1 text-left text-lg w-full hover:text-secondary-focus px-2
                ${
                  props.gist?.only &&
                  props.gist.only.indexOf(part.id) !== -1 &&
                  'font-bold text-secondary-focus'
                }
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
          disabled={!props.gist.only || props.gist.only.length < 1}
          onClick={reset}
        >
          <ClearIcon />
        </button>
      </div>
    </div>
  )
}

export const SaBoolSetting = ({ gist, updateGist }) => {
  const { t } = useTranslation(['app', 'settings'])
  const [value, setValue] = useState(gist.saBool || false)

  const toggle = () => {
    setValue(!value)
    updateGist([['saBool', !value][(['settings', 'sa'], value ? 0 : gist.saMm)]])
  }

  return (
    <Li>
      <SumButton onClick={toggle}>
        <SumDiv>
          <Deg />
          <span>{t('settings:sabool.t')}</span>
        </SumDiv>
        <SecText>{t(value ? 'yes' : 'no')}</SecText>
      </SumButton>
    </Li>
  )
}

export const SaMmSetting = (props) => {
  const { t } = useTranslation(['app', 'settings'])
  const { dflt, min, max } = props
  const val = props.gist?.[props.setting]

  const [value, setValue] = useState(val)

  const handleChange = (evt) => {
    const newVal = parseFloat(evt.target.value)

    setValue(newVal)
    if (props.gist.saBool)
      props.setGist({
        ...props.gist,
        saMm: newVal,
        sa: newVal,
      })
    else props.updateGist(['saMm'], newVal)
  }
  const reset = () => {
    setValue(dflt)
    props.updateGist(['saMm'], dflt)
  }

  return (
    <div className="py-4 mx-6 border-l-2 pl-2">
      <p className="m-0 p-0 px-2 mb-2 text-base-content opacity-60 italic">{t(`settings:sa.d`)}</p>
      <div className="flex flex-row justify-between">
        <span
          className="opacity-50"
          dangerouslySetInnerHTML={{ __html: formatMm(min, props.gist.units) }}
        />
        <span
          className={`font-bold ${val === dflt ? 'text-secondary-focus' : 'text-accent'}`}
          dangerouslySetInnerHTML={{ __html: formatMm(val, props.gist.units) }}
        />
        <span
          className="opacity-50"
          dangerouslySetInnerHTML={{ __html: formatMm(max, props.gist.units) }}
        />
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
          ${val === dflt ? 'range-secondary' : 'range-accent'}
        `}
      />
      <div className="flex flex-row justify-between">
        <span />
        <button
          title={t('reset')}
          className="btn btn-ghost btn-xs text-accent"
          disabled={val === dflt}
          onClick={reset}
        >
          <ClearIcon />
        </button>
      </div>
    </div>
  )
}
