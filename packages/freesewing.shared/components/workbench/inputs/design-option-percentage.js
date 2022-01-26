import { useState } from 'react'
import ClearIcon from 'shared/components/icons/clear.js'
import EditIcon from 'shared/components/icons/edit.js'
import { formatMm, round } from 'shared/utils.js'

const EditPercentage = props => (
  <div className="form-control mb-2 w-full">
    <label className="label">
      <span className="label-text text-neutral-content">{props.min}%</span>
      <span className="label-text font-bold text-neutral-content">{props.value}%</span>
      <span className="label-text text-neutral-content">{props.max}%</span>
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
      <span className="text-neutral-content font-bold">%</span>
    </label>
  </div>
)


const DesignOptionPercentage = props => {
  const { pct, max, min } = props.pattern.config.options[props.option]
  const val = (typeof props.gist?.options?.[props.option] === 'undefined')
    ? pct
    : props.gist.options[props.option] * 100

  const [value, setValue] = useState(val)
  const [editPercentage, setEditPercentage] = useState(false)

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
        {editPercentage
          ? <EditPercentage
              value={value}
              handleChange={handleChange}
              min={min}
              max={max}
              setEditPercentage={setEditPercentage}
              t={props.app.t}
            />
          : (
            <>
              <span className="opacity-50">{round(min)}%</span>
              <span className={
                `font-bold ${val===pct ? 'text-secondary' : 'text-accent'}`}
              >
                {round(val)}%
              </span>
              <span className="opacity-50">{round(max)}%</span>
            </>
          )
        }
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
        <div>
          <button
            title={props.app.t('app.reset')}
            className="btn btn-ghost btn-xs text-accent"
            disabled={val === pct}
            onClick={reset}
          >
            <ClearIcon />
          </button>
          <button
            title={props.app.t('app.editThing', { thing: '%' })}
            className={`
              btn btn-ghost btn-xs hover:text-secondary-focus
              ${editPercentage
                ? 'text-accent'
                : 'text-secondary'
              }
            `}
            onClick={() => setEditPercentage(!editPercentage)}
          >
            <EditIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

export default DesignOptionPercentage
