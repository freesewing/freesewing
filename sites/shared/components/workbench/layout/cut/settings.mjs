import { useMemo, useEffect, useState, useCallback, useRef } from 'react'
import { ClearIcon, PageIcon } from 'shared/components/icons.mjs'
import { useTranslation } from 'next-i18next'
import { formatFraction128, measurementAsMm, round, formatMm } from 'shared/utils.mjs'
import get from 'lodash.get'

const FabricSizer = ({ gist, updateGist, cutFabric, sheetWidth }) => {
  const { t } = useTranslation(['workbench'])

  let val = formatMm(sheetWidth, gist.units, 'none')
  // onChange
  const update = (evt) => {
    evt.stopPropagation()
    let evtVal = evt.target.value
    // set Val immediately so that the input reflects it
    val = evtVal

    let useVal = measurementAsMm(evtVal, gist.units)
    // only set to the gist if it's valid
    if (!isNaN(useVal)) {
      updateGist(['_state', 'layout', 'forCutting', 'fabric', cutFabric, 'sheetWidth'], useVal)
    }
  }

  return (
    <div className="flex gap-4 px-0 font-bold items-center">
      <div className="form-control mb-2 flex flex-row" key="wrap-fabricWidth">
        <label className="input-group input-group-xs">
          <span className="label-text font-bold">{`${t(cutFabric)} ${t('width')}`}</span>
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

export const CutLayoutSettings = ({
  gist,
  patternProps,
  unsetGist,
  updateGist,
  cutFabric,
  sheetWidth,
}) => {
  const { t } = useTranslation(['workbench'])

  const fabricLength = useFabricLength(gist.units === 'imperial', patternProps.height)

  return (
    <div className="flex flex-row justify-between mb-2 items-baseline">
      <FabricSizer {...{ gist, updateGist, cutFabric, sheetWidth }} />
      <div>
        <PageIcon className="h-6 w-6 mr-2 inline align-middle" />
        <span className="text-xl font-bold align-middle">{fabricLength}</span>
      </div>
      <button
        key="reset"
        onClick={() => unsetGist(['layouts', 'cuttingLayout', cutFabric])}
        className="btn btn-primary btn-outline"
      >
        <ClearIcon className="h-6 w-6 mr-2" />
        {t('reset')}
      </button>
    </div>
  )
}
