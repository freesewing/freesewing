import { ClearIcon, IconWrapper } from 'shared/components/icons.mjs'
import { useTranslation } from 'next-i18next'
import { formatFraction128, measurementAsMm, round, formatMm } from 'shared/utils.mjs'
import { ShowButtonsToggle } from '../draft/buttons.mjs'

const SheetIcon = (props) => (
  <IconWrapper {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"
    />
  </IconWrapper>
)

const GrainIcon = (props) => (
  <IconWrapper {...props}>
    <g>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 17l-5-5 5-5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12l8 0" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 7l5 5-5 5" />
    </g>
  </IconWrapper>
)
const FabricSizer = ({ gist, updateGist, activeFabric, sheetWidth }) => {
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
      updateGist(['_state', 'layout', 'forCutting', 'fabric', activeFabric, 'sheetWidth'], useVal)
    }
  }

  return (
    <label className="input-group">
      <span className="label-text font-bold">{`${t(activeFabric)} ${t('width')}`}</span>
      <input
        key="input-fabricWidth"
        type="text"
        className="input input-bordered grow text-base-content border-r-0"
        value={val}
        onChange={update}
      />
      <span className="bg-transparent border input-bordered">
        {gist.units == 'metric' ? 'cm' : 'in'}
      </span>
    </label>
  )
}
export const GrainDirectionPicker = ({ grainDirection, activeFabric, updateGist }) => {
  const { t } = useTranslation(['workbench'])

  return (
    <button
      className={`
        btn btn-primary flex flex-row gap-2 items-center
        hover:text-primary-content ml-4
      `}
      onClick={() =>
        updateGist(
          ['_state', 'layout', 'forCutting', 'fabric', activeFabric, 'grainDirection'],
          grainDirection === 0 ? 90 : 0
        )
      }
    >
      <GrainIcon className={`h-6 w-6 mr-2 ${grainDirection === 0 ? '' : 'rotate-90'}`} />
      <span>{t(`grainDirection`)}</span>
    </button>
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
  activeFabric,
  sheetWidth,
  grainDirection,
}) => {
  const { t } = useTranslation(['workbench'])

  const fabricLength = useFabricLength(gist.units === 'imperial', patternProps.height)

  return (
    <div className="flex flex-row justify-between mb-2 items-center">
      <div className="flex">
        <FabricSizer {...{ gist, updateGist, activeFabric, sheetWidth }} />
        <GrainDirectionPicker {...{ updateGist, activeFabric, grainDirection }} />
      </div>
      <div>
        <SheetIcon className="h-6 w-6 mr-2 inline align-middle" />
        <span className="text-xl font-bold align-middle">{fabricLength}</span>
      </div>
      <div>
        <ShowButtonsToggle
          gist={gist}
          updateGist={updateGist}
          layoutSetType="forCutting"
        ></ShowButtonsToggle>
        <button
          key="reset"
          onClick={() => unsetGist(['layouts', 'cuttingLayout', activeFabric])}
          className="btn btn-primary btn-outline"
        >
          <ClearIcon className="h-6 w-6 mr-2" />
          {t('reset')}
        </button>
      </div>
    </div>
  )
}
