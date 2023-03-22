import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { PrintLayoutSettings } from './settings.mjs'
import { Draft } from '../draft/index.mjs'
import { pagesPlugin } from '../plugin-layout-part.mjs'
import {
  handleExport,
  defaultPdfSettings,
} from 'shared/components/workbench/exporting/export-handler.mjs'
import { Popout } from 'shared/components/popout.mjs'

export const PrintLayout = (props) => {
  // disable xray
  useEffect(() => {
    if (props.gist?._state?.xray?.enabled) props.updateGist(['_state', 'xray', 'enabled'], false)
  })

  const { t } = useTranslation(['workbench', 'plugin'])
  const [error, setError] = useState(false)

  const draft = props.draft

  // add the pages plugin to the draft
  const layoutSettings = {
    ...defaultPdfSettings,
    ...props.gist?._state?.layout?.forPrinting?.page,
  }
  draft.use(pagesPlugin(layoutSettings))

  let patternProps
  try {
    // draft the pattern
    draft.draft()
    patternProps = draft.getRenderProps()
  } catch (err) {
    console.log(err, props.gist)
  }
  const bgProps = { fill: 'none' }

  const exportIt = () => {
    setError(false)
    handleExport(
      'pdf',
      props.gist,
      props.design,
      t,
      props.app,
      () => setError(false),
      () => setError(true)
    )
  }

  let name = props.design.designConfig.data.name
  name = name.replace('@freesewing/', '')
  return (
    <div>
      <h2 className="capitalize">{t('layoutThing', { thing: name }) + ': ' + t('forPrinting')}</h2>
      <div className="m-4">
        <PrintLayoutSettings {...{ ...props, exportIt, layoutSettings }} draft={draft} />
        {error && (
          <Popout warning compact>
            <span className="font-bold mr-4 uppercase text-sm">{t('error')}:</span>
            {t('somethingWentWrong')}
          </Popout>
        )}
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
