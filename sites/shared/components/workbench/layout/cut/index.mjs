import { useTranslation } from 'next-i18next'
import { CutLayoutSettings } from './settings.mjs'
import { Draft } from '../draft/index.mjs'
import { fabricPlugin } from '../plugin-layout-part.mjs'
import { cutLayoutPlugin } from './plugin-cut-layout.mjs'
import { pluginCutlist } from '@freesewing/plugin-cutlist'
import { pluginFlip } from '@freesewing/plugin-flip'
import { measurementAsMm } from 'shared/utils.mjs'
import { useState, useEffect, useCallback, useRef } from 'react'
import { Tabs } from 'shared/components/mdx/tabs.mjs'
import get from 'lodash.get'

export const CutLayout = (props) => {
  const { t } = useTranslation(['workbench'])

  // disable xray
  useEffect(() => {
    if (props.gist?._state?.xray?.enabled) props.updateGist(['_state', 'xray', 'enabled'], false)
  })

  const isImperial = props.gist.units === 'imperial'

  const [patternProps, setPatternProps] = useState(undefined)
  const [cutFabrics, setCutFabrics] = useState(['fabric'])
  const [draft, setDraft] = useState()
  const [cutFabric, setCutFabric] = useState('fabric')

  const gistSettings = get(props.gist, ['_state', 'layout', 'forCutting', 'fabric', cutFabric])
  const sheetWidth =
    gistSettings?.sheetWidth || measurementAsMm(isImperial ? 54 : 120, props.gist.units)
  const gist = props.gist
  const sheetHeight = measurementAsMm(isImperial ? 36 : 100, props.gist.units)

  useEffect(() => {
    try {
      // get the appropriate layout for the view
      const layout = gist.layouts?.[gist._state.view]?.[cutFabric] || gist.layout || true
      // hand it separately to the design
      const draft = new props.design({ ...gist, layout })

      // add the pages plugin to the draft
      const layoutSettings = {
        sheetWidth,
        sheetHeight,
      }
      draft.use(fabricPlugin(layoutSettings))
      draft.use(cutLayoutPlugin(cutFabric))
      draft.use(pluginCutlist)
      draft.use(pluginFlip)
      // draft the pattern
      draft.draft()
      setPatternProps(draft.getRenderProps())

      const cutList = draft.setStores[0].get('cutlist')
      const cf = ['fabric']
      for (const partName in cutList) {
        for (const matName in cutList[partName].materials) {
          if (!cf.includes(matName)) cf.push(matName)
        }
      }
      setCutFabrics(cf)
    } catch (err) {
      console.log(err, props.gist)
    }
  }, [cutFabric, isImperial, gist])

  const bgProps = { fill: 'url(#page)' }

  let name = props.design.designConfig.data.name
  name = name.replace('@freesewing/', '')

  return patternProps ? (
    <div>
      <h2 className="capitalize">{t('layoutThing', { thing: name }) + ': ' + t('forCutting')}</h2>
      <CutLayoutSettings
        {...{ ...props, patternProps, cutFabric, sheetWidth }}
        patternProps={patternProps}
        cutFabric={cutFabric}
      />
      <div className="my-4">
        <div className="tabs">
          {cutFabrics.map((title) => (
            <button
              key={title}
              className={`text-xl font-bold capitalize tab tab-bordered grow ${
                cutFabric === title ? 'tab-active' : ''
              }`}
              onClick={() => setCutFabric(title)}
            >
              {title}
            </button>
          ))}
        </div>
        <Draft
          draft={draft}
          gist={props.gist}
          updateGist={props.updateGist}
          patternProps={patternProps}
          bgProps={bgProps}
          gistReady={props.gistReady}
          layoutPart="fabric"
          layoutType={['cuttingLayout', cutFabric]}
        />
      </div>
    </div>
  ) : null
}
