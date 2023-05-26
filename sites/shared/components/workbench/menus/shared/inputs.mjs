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

const useSharedHandlers = ({ current, dflt, updater, updatePath, name }) => {
  const handleChange = (newCurrent) => {
    if (newCurrent === dflt) reset()
    else {
      updater([...updatePath, name], newCurrent)
    }
  }
  const reset = () => {
    updater([...updatePath, name])
  }

  return { handleChange, reset }
}

export const SliderInput = ({
  name,
  config,
  current,
  dflt,
  updater,
  updatePath = [],
  t,
  override,
  suffix = '',
  valFormatter = (val) => val,
  step = 1,
  children,
}) => {
  const { max, min } = config
  const { handleChange, reset } = useSharedHandlers({ current, dflt, updater, updatePath, name })

  return (
    <>
      <p>{t(`${name}.d`)}</p>
      <div className="flex flex-row justify-between">
        {override ? (
          <EditCount {...{ current, handleChange, min, max, t }} />
        ) : (
          <>
            <span className="opacity-50">
              {min}
              {suffix}
            </span>
            <span className={`font-bold ${current === dflt ? 'text-secondary' : 'text-accent'}`}>
              <span dangerouslySetInnerHTML={{ __html: valFormatter(current) + suffix }} />
            </span>
            <span className="opacity-50">
              {max}
              {suffix}
            </span>
          </>
        )}
      </div>
      <input
        type="range"
        {...{ min, max, value: current, step }}
        onChange={(evt) => handleChange(evt.target.value)}
        className={`
          range range-sm mt-1
          ${current === dflt ? 'range-secondary' : 'range-accent'}
        `}
      />
      {children}
    </>
  )
}

export const ListInput = ({
  name,
  config,
  current,
  dflt,
  updater,
  updatePath = [],
  compact = false,
  t,
}) => {
  const { handleChange, reset } = useSharedHandlers({ current, dflt, updater, updatePath, name })

  return (
    <>
      <p>{t(`${name}.d`)}</p>
      {config.list.map((entry) => (
        <ChoiceButton
          key={entry}
          title={t(`${config.choiceTitles[entry]}${compact ? '' : '.t'}`)}
          color={entry === config.dflt ? 'primary' : 'accent'}
          active={current === entry}
          onClick={() => handleChange(entry)}
        >
          {compact ? null : t(`${config.choiceTitles[entry]}.d`)}
        </ChoiceButton>
      ))}
    </>
  )
}

export const BoolInput = ListInput

const EditInputValue = (props) => (
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

export const PctInput = ({
  name,
  config,
  settings,
  current,
  updater,
  updatePath = [],
  t,
  type = 'pct',
  override,
}) => {
  const suffix = type === 'deg' ? '°' : '%'
  const factor = type === 'deg' ? 1 : 100
  const max = round(config.max),
    min = round(config.min)
  const dflt = config[type]
  let pctCurrent = typeof current === 'undefined' ? dflt : current * factor

  const valFormatter = (val) => round(val)
  const pctUpdater = (path, newVal) =>
    updater(path, newVal === undefined ? undefined : newVal / factor)

  return (
    <SliderInput
      {...{
        name,
        config,
        current: pctCurrent,
        dflt,
        updater: pctUpdater,
        updatePath,
        t,
        override,
        suffix,
        valFormatter,
        step: 0.1,
      }}
    >
      <div className="flex flex-row justify-around">
        <span className={current === dflt ? 'text-secondary' : 'text-accent'}>
          {config.toAbs && settings.measurements
            ? formatMm(config.toAbs(current / factor, settings))
            : ' '}
        </span>
      </div>
    </SliderInput>
  )
}

export const DegInput = (props) => <PctInput {...props} type="deg" />
export const MmInput = () => <span>FIXME: Mm options are deprecated. Please report this </span>
export const ConstantInput = () => <p>FIXME: Constant options are not implemented (yet)</p>
