import { useTranslation } from 'next-i18next'
import { CutLayoutSettings } from './settings.mjs'
import { Draft } from '../draft/index.mjs'
import { fabricPlugin } from '../plugin-layout-part.mjs'
import { cutLayoutPlugin } from './plugin-cut-layout.mjs'
import { pluginCutlist } from '@freesewing/plugin-cutlist'
import { measurementAsMm } from 'shared/utils.mjs'
import { useEffect } from 'react'
import get from 'lodash.get'

export const fabricSettingsOrDefault = (gist, fabric) => {
  const isImperial = gist.units === 'imperial'
  const sheetHeight = measurementAsMm(isImperial ? 36 : 100, gist.units)
  const gistSettings = get(gist, ['_state', 'layout', 'forCutting', 'fabric', fabric])
  const sheetWidth = gistSettings?.sheetWidth || measurementAsMm(isImperial ? 54 : 120, gist.units)
  const grainDirection =
    gistSettings?.grainDirection === undefined ? 90 : gistSettings.grainDirection

  return { activeFabric: fabric, sheetWidth, grainDirection, sheetHeight }
}

const activeFabricPath = ['_state', 'layout', 'forCutting', 'activeFabric']
const useFabricSettings = (gist) => {
  const activeFabric = get(gist, activeFabricPath) || 'fabric'
  return fabricSettingsOrDefault(gist, activeFabric)
}

const useFabricDraft = (gist, design, fabricSettings) => {
  // get the appropriate layout for the view
  const layout =
    get(gist, ['layouts', gist._state.view, fabricSettings.activeFabric]) || gist.layout || true
  // hand it separately to the design
  const draft = new design({ ...gist, layout })

  const layoutSettings = {
    sheetWidth: fabricSettings.sheetWidth,
    sheetHeight: fabricSettings.sheetHeight,
  }

  let patternProps
  try {
    // add the fabric plugin to the draft
    draft.use(fabricPlugin(layoutSettings))
    // add the cutLayout plugin
    draft.use(cutLayoutPlugin(fabricSettings.activeFabric, fabricSettings.grainDirection))
    // also, pluginCutlist and pluginFlip are needed
    draft.use(pluginCutlist)

    // draft the pattern
    draft.draft()
    patternProps = draft.getRenderProps()
  } catch (err) {
    console.log(err, gist)
  }

  return { draft, patternProps }
}

const useFabricList = (draft) => {
  return draft.setStores[0].cutlist.getCutFabrics(draft.settings[0])
}

const bgProps = { fill: 'none' }
export const CutLayout = (props) => {
  const { t } = useTranslation(['workbench', 'plugin'])
  const { gist, design, updateGist } = props

  // disable xray
  useEffect(() => {
    if (gist?._state?.xray?.enabled) updateGist(['_state', 'xray', 'enabled'], false)
  })

  const fabricSettings = useFabricSettings(gist)
  const { draft, patternProps } = useFabricDraft(gist, design, fabricSettings)
  const fabricList = useFabricList(draft)

  const setCutFabric = (newFabric) => {
    updateGist(activeFabricPath, newFabric)
  }

  let name = design.designConfig.data.name
  name = name.replace('@freesewing/', '')

  const settingsProps = {
    gist,
    updateGist,
    patternProps,
    unsetGist: props.unsetGist,
    ...fabricSettings,
  }

  return patternProps ? (
    <div>
      <h2 className="capitalize">{t('layoutThing', { thing: name }) + ': ' + t('forCutting')}</h2>
      <CutLayoutSettings {...settingsProps} />
      <div className="my-4">
        {fabricList.length > 1 ? (
          <div className="tabs">
            {fabricList.map((title) => (
              <button
                key={title}
                className={`text-xl font-bold capitalize tab tab-bordered grow ${
                  fabricSettings.activeFabric === title ? 'tab-active' : ''
                }`}
                onClick={() => setCutFabric(title)}
              >
                {t('plugin:' + title)}
              </button>
            ))}
          </div>
        ) : null}
        <Draft
          draft={draft}
          gist={gist}
          updateGist={updateGist}
          patternProps={patternProps}
          bgProps={bgProps}
          gistReady={props.gistReady}
          layoutPart="fabric"
          layoutType={['cuttingLayout', fabricSettings.activeFabric]}
          layoutSetType="forCutting"
        />
      </div>
    </div>
  ) : null
}
