import { useTranslation } from 'next-i18next'
import Settings from './settings'
import {useEffect, useMemo} from 'react'
import Draft from '../draft/index'
import {cutFabricPlugin} from '../print/plugin'
import mirrorOnFold from './plugin-mirrorOnFold'
import {valToImperialFraction} from 'shared/utils'

const CutLayout = props => {
  const { t } = useTranslation(['workbench'])
  const {gist} = props

  const layoutProps = gist._state?.layout?.forCutting

  useEffect(() => {
    if (gist._state?.xray?.enabled) props.updateGist(
      ['_state', 'xray', 'enabled'],
      false,
      false
    )
    if(layoutProps?.fabricType === undefined) props.updateGist(
      ['_state', 'layout', 'forCutting', 'fabricType'],
      'cut',
      false)
  }, [])

  // const fabricType = useMemo(() => (gist._state?.layout?.forCutting?.fabricType || 'cut'), [gist._state.layout.forCutting])

  // const draft = useMemo(() => {
  //   const draft = props.draft.use(cutFabricPlugin(
  //       gist._state?.layout?.forCutting?.fabric?.fabricWidth,
  //       gist._state?.layout?.forCutting?.fabric?.fabricHeight,
  //     )).use(mirrorOnFold)
  //   return draft
  // }, [gist._state.layout.forCutting.fabric, fabricType])

  // const patternProps = useMemo(() => {
  //   draft.draftCutList(fabricType)
  //   let renderProps = draft.getRenderProps('cutLayout')
  //   renderProps.width = gist._state?.layout?.forCutting?.fabric?.fabricWidth || renderProps.width
  //   return renderProps
  // },[draft, fabricType, gist._state.layout.forCutting.fabric])

  // const lengthsNeeded = useMemo(() => {
  //   let lengths = patternProps.height / (gist._state?.layout?.forCutting?.fabric?.fabricHeight || 1)
  //   if (gist.units == 'imperial') {
  //     lengths = valToImperialFraction(lengths, 'none')
  //   } else {
  //     lengths = Math.round(lengths * 100) / 100
  //   }
  //   return lengths
  // }, [gist._state.layout.forCutting.fabric, patternProps, gist.units])

  let patternProps
  let lengthsNeeded = 0
  let draft
  let layoutType;
  try {
    draft = props.draft.use(cutFabricPlugin(
      layoutProps.fabric?.fabricWidth,
      layoutProps.fabric?.fabricHeight,
    )).use(mirrorOnFold)
    const fabricType = layoutProps.fabricType || 'cut'
    layoutType = fabricType + '_cutLayout';

    draft.draftCutList(fabricType)
    patternProps = draft.getRenderProps(layoutType)
    patternProps.width = layoutProps.fabric?.fabricWidth || 0
    lengthsNeeded = patternProps.height / (layoutProps.fabric?.fabricHeight || 1)
    if (gist.units == 'imperial') {
      lengthsNeeded = valToImperialFraction(lengthsNeeded, 'none')
    } else {
      lengthsNeeded = Math.round(lengthsNeeded * 100) / 100
    }
  } catch(err) {
    console.log(err, gist)
    return null
  }



  // if (!patternProps) { return null}

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
        draft={draft}
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
