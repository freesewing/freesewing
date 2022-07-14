import { useTranslation } from 'next-i18next'
import Settings from './settings'
import {useEffect, useMemo} from 'react'
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
    props.gist?._state?.layout?.forCutting?.fabric?.width,
    props.gist?._state?.layout?.forCutting?.fabric?.height,
  )).use(mirrorOnFold)

  let patternProps
  try {
    draft.draftCutList()
    patternProps = draft.getRenderProps('cutLayout')
  } catch(err) {
    console.log(err, props.gist)
  }

  patternProps.width = props.gist?._state?.layout?.forCutting?.fabric?.width
  let lengthsNeeded = patternProps.height / props.gist?._state?.layout?.forCutting?.fabric?.height
  if (props.gist.units == 'imperial') lengthsNeeded = valToImperialFraction(lengthsNeeded, 'none')

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
      <h3> Lengths needed: {lengthsNeeded} </h3>
      <Settings {...props} layoutType="cutLayout"/>
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
