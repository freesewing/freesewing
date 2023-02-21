import { useState } from 'react'
import { ClearIcon } from 'shared/components/icons.mjs'
import { useTranslation } from 'next-i18next'

export const DesignOptionList = (props) => {
  const { t } = useTranslation([`o_${props.design.designConfig.data.name}`])
  const { dflt, list, doNotTranslate = false } = props.design.patternConfig.options[props.option]
  const val =
    typeof props.gist?.options?.[props.option] === 'undefined'
      ? dflt
      : props.gist.options[props.option]

  const [value, setValue] = useState(val)

  const handleChange = (newVal) => {
    if (newVal === dflt) reset()
    else {
      setValue(newVal)
      props.updateGist(['options', props.option], newVal)
    }
  }
  const reset = () => {
    setValue(dflt)
    props.unsetGist(['options', props.option])
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
              <span
                className={`
                text-3xl mr-2 inline-block p-0 leading-3
                translate-y-3
              `}
              >
                <>&deg;</>
              </span>
              {doNotTranslate
                ? choice
                : props.ot(`o_${props.design.designConfig.data.name}:${props.option}.o.${choice}`)}
            </button>
          ))}
        </div>
        <button title={t('reset')} className="" disabled={val === dflt} onClick={reset}>
          <span className={val === dflt ? 'text-base' : 'text-accent'}>
            <ClearIcon />
          </span>
        </button>
      </div>
    </div>
  )
}

export default DesignOptionList
