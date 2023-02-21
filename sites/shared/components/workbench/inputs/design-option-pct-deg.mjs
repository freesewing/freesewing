import { useState } from 'react'
import { ClearIcon, EditIcon } from 'shared/components/icons.mjs'
import { formatMm, round } from 'shared/utils.mjs'
import { useTranslation } from 'next-i18next'

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

export const DesignOptionPctDeg = (props) => {
  const { t } = useTranslation(['app'])
  const suffix = props.type === 'deg' ? '°' : '%'
  const factor = props.type === 'deg' ? 1 : 100
  const { max, min } = props.design.patternConfig.options[props.option]
  const dflt = props.design.patternConfig.options[props.option][props.type || 'pct']
  const val =
    typeof props.gist?.options?.[props.option] === 'undefined'
      ? dflt
      : props.gist.options[props.option] * factor

  const [value, setValue] = useState(val)
  const [editOption, setEditOption] = useState(false)

  const handleChange = (evt) => {
    const newVal = evt.target.value
    setValue(newVal)
    props.updateGist(['options', props.option], newVal / factor)
  }
  const reset = () => {
    setValue(dflt)
    props.unsetGist(['options', props.option])
  }

  return (
    <div className="py-4 mx-6 border-l-2 pl-2">
      <p className="m-0 p-0 px-2 mb-2 text-base-content opacity-60 italic">
        {props.ot(`${props.option}.d`)}
      </p>
      <div className="flex flex-row justify-between">
        {editOption ? (
          <EditOption
            value={value}
            handleChange={handleChange}
            min={min}
            max={max}
            setEditOption={setEditOption}
            t={t}
            suffix={suffix}
          />
        ) : (
          <>
            <span className="opacity-50">
              {round(min)}
              {suffix}
            </span>
            <span className={`font-bold ${val === dflt ? 'text-secondary' : 'text-accent'}`}>
              {round(val)}
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
        <span className={val === dflt ? 'text-secondary' : 'text-accent'}>
          {props.design.patternConfig.options[props.option]?.toAbs && props.gist.measurements
            ? formatMm(
                props.design.patternConfig.options[props.option].toAbs(value / 100, props.gist)
              )
            : ' '}
        </span>
        <div>
          <button
            title={t('reset')}
            className="btn btn-ghost btn-xs text-accent"
            disabled={val === dflt}
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
