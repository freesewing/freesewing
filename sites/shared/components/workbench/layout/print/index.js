import { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import Settings from './settings'
import Draft from '../draft/index'
import {pagesPlugin} from './plugin'
import {handleExport} from 'shared/components/workbench/exporting'

const PrintLayout = props => {

  useEffect(() => {
    if (props.gist?._state?.xray?.enabled) props.updateGist(
      ['_state', 'xray', 'enabled'],
      false
    )
  }, [])

  const { t } = useTranslation(['workbench'])

  const draft = props.draft.use(pagesPlugin(
    props.gist?._state?.layout?.forPrinting?.page?.size,
    props.gist?._state?.layout?.forPrinting?.page?.orientation,
  ))

  let patternProps
  try {
    draft.draft()
    patternProps = draft.getRenderProps('printLayout')
  } catch(err) {
    console.log(err, props.gist)
  }
  const bgProps = { fill: "url(#page)" }

  const exportIt = () => {
    handleExport('pdf', props.gist, props.design, t)
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
        <Settings {...props} draft={draft} layoutType="printLayout"/>
        <button className="button" onClick={exportIt}>Export </button>
      </div>
      <Draft
        draft={draft}
        gist={props.gist}
        updateGist={props.updateGist}
        patternProps={patternProps}
        bgProps={bgProps}
        gistReady={props.gistReady}
        layoutPart="pages"
        layoutType="printLayout"
      />
    </div>
  )
}

export default PrintLayout
