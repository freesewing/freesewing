import { useState } from 'react'
import ClearIcon from 'shared/components/icons/clear.js'
import EditIcon from 'shared/components/icons/edit.js'
import { useTranslation } from 'next-i18next'

const EditCount = props => (
  <div className="form-control mb-2 w-full">
    <label className="label">
      <span className="label-text text-neutral-content">{props.min}</span>
      <span className="label-text font-bold text-neutral-content">{props.value}</span>
      <span className="label-text text-neutral-content">{props.max}</span>
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
      <span className="text-neutral-content font-bold">#</span>
    </label>
  </div>
)


const DesignOptionCount = props => {
  const { t } = useTranslation(['app'])
  const { count, max, min } = props.pattern.config.options[props.option]
  const val = (typeof props.gist?.options?.[props.option] === 'undefined')
    ? count
    : props.gist.options[props.option]

  const [value, setValue] = useState(val)
  const [editCount, setEditCount] = useState(false)

  const handleChange = (evt) => {
    const newVal = evt.target.value
    setValue(newVal)
    props.updateGist(['options', props.option], newVal)
  }
  const reset = () => {
    setValue(count)
    props.unsetGist(['options', props.option])
  }

  return (
    <div className="py-4 mx-6 border-l-2 pl-2">
      <div className="flex flex-row justify-between">
        {editCount
          ? <EditCount
              value={value}
              handleChange={handleChange}
              min={min}
              max={max}
              setEditCount={setEditCount}
              t={t}
            />
          : (
            <>
              <span className="opacity-50">{min}</span>
              <span className={
                `font-bold ${val===count ? 'text-secondary' : 'text-accent'}`}
              >
                {val}
              </span>
              <span className="opacity-50">{max}</span>
            </>
          )
        }
      </div>
      <input
        type="range"
        max={max}
        min={min}
        step={1}
        value={value}
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
            disabled={val === count}
            onClick={reset}
          >
            <ClearIcon />
          </button>
          <button
            title={t('editThing', { thing: '#' })}
            className={`
              btn btn-ghost btn-xs hover:text-secondary-focus
              ${editCount
                ? 'text-accent'
                : 'text-secondary'
              }
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

export default DesignOptionCount
