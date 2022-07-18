import { useTranslation } from 'next-i18next'
import Settings from './settings'
import {useEffect} from 'react'
import Draft from '../draft/index'
import {cutFabricPlugin} from '../print/plugin'
import mirrorOnFold from './plugin-mirrorOnFold'
import {valToImperialFraction} from 'shared/utils'

const CutLayout = props => {
  const { t } = useTranslation(['workbench'])

  const layoutProps = props.gist._state?.layout?.forCutting
  const fabricType = layoutProps?.fabricType || 'cut'
  const layoutType = fabricType + '_cutLayout';

  useEffect(() => {
    if (props.gist._state?.xray?.enabled) props.updateGist(
      ['_state', 'xray', 'enabled'],
      false,
      false
    )
  }, [])

  useEffect(() => {
    if(layoutProps === undefined) {
      props.updateGist(
      ['_state', 'layout', 'forCutting'],
      {
        fabricType: 'cut',
        fabric: {
          [fabricType]: {fabricWidth: 1000, fabricHeight: 1000}
        }
      },
      false,
      false)
    } else if (layoutProps.fabric?.[fabricType] === undefined) {
      props.updateGist(['_state', 'layout', 'forCutting', 'fabric', fabricType], {
        fabricWidth: 1000, fabricHeight: 1000
      },
      false,
      false)
    }
  }, [layoutProps])

  props.draft.use(cutFabricPlugin(
    layoutProps?.fabric?.[fabricType]?.fabricWidth,
    layoutProps?.fabric?.[fabricType]?.fabricHeight,
  )).use(mirrorOnFold)


  let patternProps
  let lengthsNeeded = 0
  try {
    props.draft.draftCutList(fabricType)
    patternProps = props.draft.getRenderProps(layoutType)
    patternProps.width = layoutProps?.fabric?.[fabricType]?.fabricWidth || 0
    lengthsNeeded = patternProps.height / (layoutProps?.fabric?.[fabricType]?.fabricHeight || 1)
    if (props.gist.units == 'imperial') {
      lengthsNeeded = valToImperialFraction(lengthsNeeded, 'none')
    } else {
      lengthsNeeded = Math.round(lengthsNeeded * 100) / 100
    }
  } catch(err) {
    console.log(err, props.gist)
    return null
  }

  const bgProps = { fill: "url(#page)" }
  return (
    <div>
      <h2 className="capitalize">
        {
          t('layoutThing', { thing: props.design.config.name })
          + ': '
          + t('forCutting')
        }
      </h2>
      <Settings {...props} length={lengthsNeeded} layoutType={layoutType}/>
      <Draft
        draft={props.draft}
        gist={props.gist}
        updateGist={props.updateGist}
        patternProps={patternProps}
        gistReady={props.gistReady}
        bgProps={bgProps}
        layoutPart="cutFabric"
        fitLayoutPart={true}
        layoutType={layoutType}
      />
    </div>
  )
}

export default CutLayout
