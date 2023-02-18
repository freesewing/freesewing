import { useMemo, useEffect, useState, useCallback } from 'react'
import { ClearIcon } from 'shared/components/icons.mjs'
import { useTranslation } from 'next-i18next'
import { formatFraction128, measurementAsMm, round, formatMm } from 'shared/utils.mjs'

const FabricSizer = ({ gist, updateGist }) => {
  const { t } = useTranslation(['workbench'])
  const [val, setVal] = useState(500)

  useEffect(() => {
    setVal(formatMm(gist._state?.layout?.forCutting?.fabric.sheetWidth || 500, gist.units, 'none'))
  }, [gist])
  const setFabricWidth = (width) => {}

  // onChange
  const update = useCallback(
    (evt) => {
      evt.stopPropagation()
      let evtVal = evt.target.value
      // set Val immediately so that the input reflects it
      setVal(evtVal)

      let useVal = measurementAsMm(evtVal, gist.units)
      // only set to the gist if it's valid
      if (!isNaN(useVal)) {
        updateGist(['_state', 'layout', 'forCutting', 'fabric', 'sheetWidth'], useVal)
      }
    },
    [gist.units]
  )

  return (
    <div className="flex gap-4">
      <div className="form-control mb-2 flex flex-row" key="wrap-fabricWidth">
        <label className="input-group input-group-xs">
          <span className="label-text font-bold">{t('fabricWidth')}</span>
          <input
            key="input-fabricWidth"
            type="text"
            className="input input-sm input-bordered grow text-base-content border-r-0"
            value={val}
            onChange={update}
          />
          <span className="bg-transparent border input-bordered">
            {gist.units == 'metric' ? 'cm' : 'in'}
          </span>
        </label>
      </div>
    </div>
  )
}

const useFabricLength = (isImperial, height) => {
  // regular conversion from mm to inches or cm
  const unit = isImperial ? 25.4 : 10
  // conversion from inches or cm to yards or meters
  const fabricUnit = isImperial ? 36 : 100
  // for fabric, these divisions are granular enough
  const rounder = isImperial ? 16 : 10

  // we convert the used fabric height to the right units so we can round it
  const inFabricUnits = height / (fabricUnit * unit)
  // we multiply it by the rounder, round it up, then divide by the rounder again to get the rounded amount
  const roundCount = Math.ceil(rounder * inFabricUnits) / rounder
  // format as a fraction for imperial, a decimal for metric
  const count = isImperial ? formatFraction128(roundCount, 'none') : round(roundCount, 1)

  return `${count}${isImperial ? 'yds' : 'm'}`
}

export const CutLayoutSettings = ({ gist, patternProps, unsetGist, updateGist }) => {
  const { t } = useTranslation(['workbench'])

  const fabricLength = useFabricLength(gist.units === 'imperial', patternProps.height)

  return (
    <div>
      <div
        className="flex flex-row justify-between
      mb-2"
      >
        <button
          key="reset"
          onClick={() => unsetGist(['layouts', 'cuttingLayout'])}
          className="btn btn-primary btn-outline"
        >
          <ClearIcon className="h-6 w-6 mr-2" />
          {t('reset')}
        </button>
      </div>
      <div className="flex flex-row font-bold items-center px-0">
        <FabricSizer {...{ gist, updateGist }} />
        <span className="ml-2">{fabricLength}</span>
      </div>
    </div>
  )
}
