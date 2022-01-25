import { useState } from 'react'
import ClearIcon from 'shared/components/icons/clear.js'
import { formatMm, round } from 'shared/utils.js'

const DesignOptionPercentage = props => {
  const { pct, max, min } = props.pattern.config.options[props.option]
  const val = (typeof props.gist?.options?.[props.option] === 'undefined')
    ? pct
    : props.gist.options[props.option] * 100

  const [value, setValue] = useState(val)

  const handleChange = (evt) => {
    const newVal = evt.target.value
    setValue(newVal)
    props.updateGist(['options', props.option], newVal/100)
  }
  const reset = () => {
    setValue(pct)
    props.unsetGist(['options', props.option])
  }

  return (
    <div className="py-4 mx-6 border-l-2 pl-2">
      <div className="flex flex-row justify-between">
        <span className="opacity-50">{round(min)}%</span>
        <span className={`font-bold ${val===pct ? 'text-secondary' : 'text-accent'}`}>{round(val)}%</span>
        <span className="opacity-50">{round(max)}%</span>
      </div>
      <input
        type="range"
        max={max}
        min={min}
        step={0.1}
        value={value}
        onChange={handleChange}
        className={`
          range range-sm
          ${val === pct ? 'range-secondary' : 'range-accent'}
        `}
      />
      <div className="flex flex-row justify-between">
        <span className={val===pct ? 'text-secondary' : 'text-accent'}>
          {props.pattern.config.options[props.option]?.toAbs
            ? formatMm(props.pattern.config.options[props.option].toAbs(value/100, props.gist))
            : ' '
          }
        </span>
        <button
          title={props.app.t('app.reset')}
          className="btn btn-ghost btn-xs text-accent"
          disabled={val === pct}
          onClick={reset}
        >
          <ClearIcon />
        </button>
      </div>
    </div>
  )
}

export default DesignOptionPercentage
