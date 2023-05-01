import { useState } from 'react'
import { formatMm } from 'shared/utils.mjs'
import { ClearIcon } from 'shared/components/icons.mjs'
import { useTranslation } from 'next-i18next'

export const CoreSettingSaMm = (props) => {
  const { t } = useTranslation(['app', 'settings'])
  const { dflt, min, max, step, dfltIm, maxIm, stepIm } = props
  const val = props.gist?.[props.setting]

  let dfltVal
  let maxVal
  let stepVal
  if (props.gist.units == 'imperial') {
    dfltVal = dfltIm
    maxVal = maxIm
    stepVal = stepIm
  } else {
    dfltVal = dflt
    maxVal = max
    stepVal = step
  }

  const [value, setValue] = useState(val)

  const handleChange = (evt) => {
    const newVal = parseFloat(evt.target.value)

    setValue(stepVal)

    setValue(newVal)
    if (props.gist.saBool)
      props.setGist({
        ...props.gist,
        saMm: newVal,
        sa: newVal,
      })
    else props.updateGist(['saMm'], newVal)
  }
  const reset = () => {
    setValue(dfltVal)
    props.updateGist(['saMm'], dfltVal)
    props.updateGist(['sa'], dfltVal)
  }

  return (
    <div className="py-4 mx-6 border-l-2 pl-2">
      <p className="m-0 p-0 px-2 mb-2 text-base-content opacity-60 italic">{t(`settings:sa.d`)}</p>
      <div className="flex flex-row justify-between">
        <span
          className="opacity-50"
          dangerouslySetInnerHTML={{ __html: formatMm(min, props.gist.units) }}
        />
        <span
          className={`font-bold ${val === dfltVal ? 'text-secondary-focus' : 'text-accent'}`}
          dangerouslySetInnerHTML={{ __html: formatMm(val, props.gist.units) }}
        />
        <span
          className="opacity-50"
          dangerouslySetInnerHTML={{ __html: formatMm(maxVal, props.gist.units) }}
        />
      </div>
      <input
        type="range"
        max={maxVal}
        min={min}
        step={stepVal}
        value={value}
        onChange={handleChange}
        className={`
          range range-sm mt-1
          ${val === dfltVal ? 'range-secondary' : 'range-accent'}
        `}
      />
      <div className="flex flex-row justify-between">
        <span />
        <button
          title={t('reset')}
          className="btn btn-ghost btn-xs text-accent"
          disabled={val === dfltVal}
          onClick={reset}
        >
          <ClearIcon />
        </button>
      </div>
    </div>
  )
}
