import { useState } from 'react'
import { Deg } from 'shared/components/workbench/menu/index.js'

const CoreSettingList = props => {
  const { dflt, list } = props
  const val = props.gist?.[props.setting]

  const [value, setValue] = useState(val)

  const handleChange = (newVal) => {
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
      <div className="flex flex-row">
        <div className="grow">
          {props.list.map(entry => (
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

export default CoreSettingList
