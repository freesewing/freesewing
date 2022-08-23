import { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import Settings from './settings'
import Draft from '../draft/index'
import {pagesPlugin} from './plugin'
import {handleExport, defaultPdfSettings} from 'shared/components/workbench/exporting'

const PrintLayout = props => {
  // disable xray
  useEffect(() => {
    if (props.gist?._state?.xray?.enabled) props.updateGist(
      ['_state', 'xray', 'enabled'],
      false
    )
  }, [])

  const { t } = useTranslation(['workbench'])

  const draft = props.draft

  // add the pages plugin to the draft
  const layoutSettings = {
    ...defaultPdfSettings,
    ...props.gist?._state?.layout?.forPrinting?.page
  }
  draft.use(pagesPlugin(
    layoutSettings
  ))

  let patternProps
  try {
    // draft the pattern
    draft.draft()
    patternProps = draft.getRenderProps()
  } catch(err) {
    console.log(err, props.gist)
  }
  const bgProps = { fill: "url(#page)" }

  const exportIt = () => {
    handleExport('pdf', props.gist, props.design, t, props.app)
  }

  return (
    <div>
      <h2 className="capitalize">
        {
          t('layoutThing', { thing: props.design.config.name })
          + ': '
          + t('forPrinting')
        }
      </h2>
      <div className="m-4">
        <Settings {...{...props, exportIt, layoutSettings}} draft={draft}/>
      </div>
      <Draft
        draft={draft}
        gist={props.gist}
        updateGist={props.updateGist}
        patternProps={patternProps}
        bgProps={bgProps}
        gistReady={props.gistReady}
        layoutPart="pages"
      />
    </div>
  )
}

export default PrintLayout
