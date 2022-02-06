import { useState } from 'react'
import ClearIcon from 'shared/components/icons/clear.js'
import EditIcon from 'shared/components/icons/edit.js'

const CoreSettingNr = props => {
  const { dflt, min, max } = props
  const val = props.gist?.[props.setting]

  const [value, setValue] = useState(val)

  const handleChange = evt => {
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
      <p className="m-0 p-0 px-2 mb-2 text-neutral-content opacity-60 italic">
        {props.app.t(`settings.${props.setting}.description`)}
      </p>
      <div className="flex flex-row justify-between">
        <span className="opacity-50">
          {min}
        </span>
        <span className={`font-bold ${val===dflt ? 'text-secondary' : 'text-accent'}`}>
          {val}
        </span>
        <span className="opacity-50">
          {max}
        </span>
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
          title={props.app.t('app.reset')}
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

export default CoreSettingNr
