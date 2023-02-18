import { useTranslation } from 'next-i18next'
import { CutLayoutSettings } from './settings.mjs'
import { Draft } from '../draft/index.mjs'
import { fabricPlugin } from '../layout-part-plugin.mjs'
import { useEffect } from 'react'
import { measurementAsMm } from 'shared/utils.mjs'

export const CutLayout = (props) => {
  const { t } = useTranslation(['workbench'])

  // disable xray
  useEffect(() => {
    if (props.gist?._state?.xray?.enabled) props.updateGist(['_state', 'xray', 'enabled'], false)
  })

  const draft = props.draft
  const isImperial = props.gist.units === 'imperial'
  const gistSettings = props.gist?._state?.layout?.forCutting?.fabric || {}

  // add the pages plugin to the draft
  const layoutSettings = {
    sheetWidth: gistSettings.sheetWidth || measurementAsMm(isImperial ? 54 : 50, props.gist.units),
    sheetHeight:
      gistSettings.sheetHeight || measurementAsMm(isImperial ? 36 : 100, props.gist.units),
  }
  draft.use(fabricPlugin(layoutSettings))

  let patternProps
  try {
    // draft the pattern
    draft.draft()
    patternProps = draft.getRenderProps()
  } catch (err) {
    console.log(err, props.gist)
  }
  const bgProps = { fill: 'url(#page)' }

  let name = props.design.designConfig.data.name
  name = name.replace('@freesewing/', '')
  return (
    <div>
      <h2 className="capitalize">{t('layoutThing', { thing: name }) + ': ' + t('forCutting')}</h2>
      <CutLayoutSettings {...props} patternProps={patternProps} />
      <Draft
        draft={draft}
        gist={props.gist}
        updateGist={props.updateGist}
        patternProps={patternProps}
        bgProps={bgProps}
        gistReady={props.gistReady}
        layoutPart="fabric"
        layoutType="cuttingLayout"
      />
    </div>
  )
}
