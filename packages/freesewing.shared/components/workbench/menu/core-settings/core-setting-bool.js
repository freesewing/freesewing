import { useState } from 'react'
import { linkClasses } from 'shared/components/navigation/primary.js'

const CoreSettingBool = props => {
  const val = props.gist[props.setting]
  const dflt = props.dflt

  const [value, setValue] = useState(val)

  const toggle = (evt) => {
    props.updateGist([props.setting], !value)
    setValue(!value)
  }

  return (
    <li className="flex flex-row">
      <button className={`
        flex flex-row
        w-full
        justify-between
        px-2
        text-left
        text-base-content
        sm:text-neutral-content
        items-center
        pr-6
      `} onClick={toggle}>
        <div className={`
          grow pl-2 border-l-2
          ${linkClasses}
          hover:cursor-pointer
          hover:border-secondary
          sm:hover:border-secondary-focus
          text-base-content sm:text-neutral-content
        `}>
          <span className={`
            text-3xl mr-2 inline-block p-0 pl-2 leading-3
            translate-y-3
          `}>
            <>&deg;</>
          </span>
          <span>
            { props.app.t(`settings.${props.setting}.title`) }
          </span>
        </div>
        <span className="text-secondary">
          {props.app.t('app.'+ (value ? 'yes' : 'no'))}
        </span>
      </button>
    </li>
  )
}

export default CoreSettingBool
