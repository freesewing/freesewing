import { useState } from 'react'
import { ClearIcon, EditIcon } from 'shared/components/icons.mjs'
import { useTranslation } from 'next-i18next'
import { formatMm, round } from 'shared/utils.mjs'

const EditCount = (props) => (
  <div className="form-control mb-2 w-full">
    <label className="label">
      <span className="label-text text-base-content">{props.min}</span>
      <span className="label-text font-bold text-base-content">{props.value}</span>
      <span className="label-text text-base-content">{props.max}</span>
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
      <span className="text-base-content font-bold">#</span>
    </label>
  </div>
)

export const CountOptionInput = ({ name, config, current, update, t }) => {
  const { count, max, min } = config
  if (typeof current === 'undefined') current = count

  const [value, setValue] = useState(current)
  const [editCount, setEditCount] = useState(false)

  const handleChange = (evt) => {
    const newCurrent = evt.target.value
    setValue(newCurrent)
    update.settings(['options', name], newCurrent)
  }
  const reset = () => {
    setValue(count)
    update.settings(['options', name])
  }

  return (
    <div className="py-4 mx-6 border-l-2 pl-2">
      <div className="flex flex-row justify-between">
        {editCount ? (
          <EditCount {...{ value, handleChange, min, max, setEditCount, t }} />
        ) : (
          <>
            <span className="opacity-50">{min}</span>
            <span className={`font-bold ${current === count ? 'text-secondary' : 'text-accent'}`}>
              {current}
            </span>
            <span className="opacity-50">{max}</span>
          </>
        )}
      </div>
      <input
        type="range"
        {...{ min, max, value }}
        step={1}
        onChange={handleChange}
        className={`
          range range-sm mt-1
          ${val === count ? 'range-secondary' : 'range-accent'}
        `}
      />
      <div className="flex flex-row justify-between">
        <span></span>
        <div>
          <button
            title={t('reset')}
            className="btn btn-ghost btn-xs text-accent"
            disabled={current === count}
            onClick={reset}
          >
            <ClearIcon />
          </button>
          <button
            title={t('editThing', { thing: '#' })}
            className={`
              btn btn-ghost btn-xs hover:text-secondary-focus
              ${editCount ? 'text-accent' : 'text-secondary'}
            `}
            onClick={() => setEditCount(!editCount)}
          >
            <EditIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

export const ListOptionInput = ({ design, name, config, current, update, t }) => {
  const { dflt, list, doNotTranslate = false } = config
  if (typeof current === 'undefined') current = dflt

  const [value, setValue] = useState(current)

  const handleChange = (newCurrent) => {
    if (newCurrent === dflt) reset()
    else {
      setValue(newCurrent)
      update.settings(['options', name], newCurrent)
    }
  }
  const reset = () => {
    setValue(dflt)
    update.settings(['options', name])
  }

  return (
    <div className="py-4 mx-6 border-l-2 pl-2">
      <div className="flex flex-row">
        <div className="grow">
          {list.map((choice) => (
            <button
              key={choice}
              onClick={() => handleChange(choice)}
              className={`
                mr-1 mb-1 text-left text-lg w-full
                ${
                  choice === value
                    ? choice === dflt
                      ? 'text-secondary'
                      : 'text-accent'
                    : 'text-base-content'
                }
              `}
            >
              <span className="text-3xl mr-2 inline-block p-0 leading-3 translate-y-3">
                <>&deg;</>
              </span>
              {doNotTranslate ? choice : t(`o_${design}:${name}.o.${choice}`)}
            </button>
          ))}
        </div>
        <button title={t('reset')} className="" disabled={current === dflt} onClick={reset}>
          <span className={current === dflt ? 'text-base' : 'text-accent'}>
            <ClearIcon />
          </span>
        </button>
      </div>
    </div>
  )
}

const EditOption = (props) => (
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

export const PctOptionInput = ({ name, config, settings, current, update, t, type = 'pct' }) => {
  const suffix = type === 'deg' ? '°' : '%'
  const factor = type === 'deg' ? 1 : 100
  const { max, min } = config
  const dflt = config[type]
  if (typeof current === 'undefined') current = dflt
  else current = current * factor

  const [value, setValue] = useState(current)
  const [editOption, setEditOption] = useState(false)

  const handleChange = (evt) => {
    const newCurrent = evt.target.value
    setValue(newCurrent)
    update.settings(['options', name], newCurrent / factor)
  }
  const reset = () => {
    setValue(dflt)
    update.settings(['options', name])
  }

  return (
    <div className="py-4 mx-6 border-l-2 pl-2">
      <p className="m-0 p-0 px-2 mb-2 text-base-content opacity-60 italic">{t(`${name}.d`)}</p>
      <div className="flex flex-row justify-between">
        {editOption ? (
          <EditOption {...{ value, handleChange, min, max, setEditOption, t, suffix }} />
        ) : (
          <>
            <span className="opacity-50">
              {round(min)}
              {suffix}
            </span>
            <span className={`font-bold ${current === dflt ? 'text-secondary' : 'text-accent'}`}>
              {round(current)}
              {suffix}
            </span>
            <span className="opacity-50">
              {round(max)}
              {suffix}
            </span>
          </>
        )}
      </div>
      <input
        {...{ min, max, value }}
        type="range"
        step={0.1}
        onChange={handleChange}
        className={`
          range range-sm mt-1
          ${current === dflt ? 'range-secondary' : 'range-accent'}
        `}
      />
      <div className="flex flex-row justify-between">
        <span className={current === dflt ? 'text-secondary' : 'text-accent'}>
          {config.toAbs && settings.measurements
            ? formatMm(config.toAbs(value / 100, settings))
            : ' '}
        </span>
        <div>
          <button
            title={t('reset')}
            className="btn btn-ghost btn-xs text-accent"
            disabled={current === dflt}
            onClick={reset}
          >
            <ClearIcon />
          </button>
          <button
            title={t('editThing', { thing: suffix })}
            className={`
              btn btn-ghost btn-xs hover:text-secondary-focus
              ${editOption ? 'text-accent' : 'text-secondary'}
            `}
            onClick={() => setEditOption(!editOption)}
          >
            <EditIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

export const DegOptionInput = (props) => <DesignOptionPctInput {...props} type="deg" />
export const MmOptionInput = () => (
  <span>FIXME: Mm options are deprecated. Please report this </span>
)
export const ConstantOptionInput = () => <p>FIXME: Constant options are not implemented (yet)</p>
