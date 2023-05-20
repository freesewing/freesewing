import { useState } from 'react'
import { formatMm, round } from 'shared/utils.mjs'
import { ChoiceButton } from 'shared/components/choice-button.mjs'

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

export const CountOptionInput = ({ name, design, config, current, update, t, override }) => {
  const { count, max, min } = config
  if (typeof current === 'undefined') current = count

  const [value, setValue] = useState(current)

  const handleChange = (evt) => {
    const newCurrent = evt.target.value
    setValue(newCurrent)
    update.settings(['options', name], newCurrent)
  }
  //const reset = () => {
  //  setValue(count)
  //  update.settings(['options', name])
  //}

  return (
    <>
      <p>{t(`${design}:o.${name}.d`)}</p>
      <div className="flex flex-row justify-between">
        {override ? (
          <EditCount {...{ value, handleChange, min, max, t }} />
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
          ${current === count ? 'range-secondary' : 'range-accent'}
        `}
      />
    </>
  )
}

export const ListOptionInput = ({ design, name, config, current, update, t }) => {
  const { dflt } = config
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
    <>
      <p>{t(`${design}:o.${name}.d`)}</p>
      {config.list.map((entry) => (
        <ChoiceButton
          key={entry}
          title={t(`${design}:o.${config.choiceTitles[entry]}.t`)}
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

export const BoolOptionInput = ListOptionInput

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

export const PctOptionInput = ({
  name,
  design,
  config,
  settings,
  current,
  update,
  t,
  type = 'pct',
  override,
}) => {
  const suffix = type === 'deg' ? '°' : '%'
  const factor = type === 'deg' ? 1 : 100
  const { max, min } = config
  const dflt = config[type]
  if (typeof current === 'undefined') current = dflt
  else current = current * factor

  const [value, setValue] = useState(current)

  const handleChange = (evt) => {
    const newCurrent = evt.target.value
    setValue(newCurrent)
    update.settings(['options', name], newCurrent / factor)
  }

  //const reset = () => {
  //  setValue(dflt)
  //  update.settings(['options', name])
  //}

  return (
    <>
      <p>{t(`${design}:${name}.d`)}</p>
      <div className="flex flex-row justify-between">
        {override ? (
          <EditOption {...{ value, handleChange, min, max, t, suffix }} />
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
      <div className="flex flex-row justify-around">
        <span className={current === dflt ? 'text-secondary' : 'text-accent'}>
          {config.toAbs && settings.measurements
            ? formatMm(config.toAbs(value / 100, settings))
            : ' '}
        </span>
      </div>
    </>
  )
}

export const DegOptionInput = (props) => <PctOptionInput {...props} type="deg" />
export const MmOptionInput = () => (
  <span>FIXME: Mm options are deprecated. Please report this </span>
)
export const ConstantOptionInput = () => <p>FIXME: Constant options are not implemented (yet)</p>
