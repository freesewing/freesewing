import { useTranslation } from 'next-i18next'
import Settings from './settings'
import {useEffect} from 'react'
import Draft from '../draft/index'
import {cutFabricPlugin} from '../print/plugin'
import mirrorOnFold from './plugin-mirrorOnFold'
import {valToImperialFraction} from 'shared/utils'

const CutLayout = props => {
  const { t } = useTranslation(['workbench'])

  useEffect(() => {
    if (props.gist?._state?.xray?.enabled) props.updateGist(
      ['_state', 'xray', 'enabled'],
      false
    )
  }, [])

  const draft = props.draft.use(cutFabricPlugin(
    props.gist?._state?.layout?.forCutting?.fabric?.fabricWidth,
    props.gist?._state?.layout?.forCutting?.fabric?.fabricHeight,
  )).use(mirrorOnFold)

  let patternProps
  let lengthsNeeded = 0
  try {
    draft.draftCutList()
    patternProps = draft.getRenderProps('cutLayout')
    patternProps.width = props.gist?._state?.layout?.forCutting?.fabric?.fabricWidth || 0
    lengthsNeeded = patternProps.height / (props.gist?._state?.layout?.forCutting?.fabric?.fabricHeight || 1)
    if (props.gist?.units == 'imperial') {
      lengthsNeeded = valToImperialFraction(lengthsNeeded, 'none')
    } else {
      lengthsNeeded = Math.round(lengthsNeeded * 100) / 100
    }
  } catch(err) {
    console.log(err, props.gist)
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
      <Settings {...props} length={lengthsNeeded} layoutType="cutLayout"/>
      <Draft
        draft={draft}
        gist={props.gist}
        updateGist={props.updateGist}
        patternProps={patternProps}
        gistReady={props.gistReady}
        bgProps={bgProps}
        layoutPart="cutFabric"
        fitLayoutPart={true}
        layoutType="cutLayout"
      />
    </div>
  )
}

export default CutLayout
