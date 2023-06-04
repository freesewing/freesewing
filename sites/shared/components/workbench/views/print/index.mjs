import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
// import { PrintLayoutSettings } from './settings.mjs'
// import { Draft } from '../draft/index.mjs'
import { pagesPlugin } from 'shared/components/workbench/layout/plugin-layout-part.mjs'
// import {
//   handleExport,
//   defaultPdfSettings,
// } from 'shared/components/workbench/exporting/export-handler.mjs'
// import { Popout } from 'shared/components/popout.mjs'
import get from 'lodash.get'
import { PanZoomPattern as ShowPattern } from 'shared/components/workbench/pan-zoom-pattern.mjs'
import { PrintMenu, ns as menuNs } from './menu.mjs'

const viewNs = ['print']
export const ns = [...viewNs, ...menuNs]

const defaultPdfSettings = {
  size: 'a4',
  orientation: 'portrait',
  margin: 10,
  coverPage: true,
  cutlist: true,
}

export const PrintView = ({
  design,
  pattern,
  patternConfig,
  setView,
  settings,
  ui,
  update,
  language,
  account,
  DynamicDocs,
}) => {
  // disable xray
  // useEffect(() => {
  //   if (props.gist?._state?.xray?.enabled) props.updateGist(['_state', 'xray', 'enabled'], false)
  // })

  const { t } = useTranslation(viewNs)
  const [error, setError] = useState(false)

  // add the pages plugin to the draft
  const layoutSettings = {
    ...defaultPdfSettings,
    ...get(ui, ['layout', 'print', 'page']),
  }

  pattern.use(pagesPlugin(layoutSettings))

  let patternProps
  try {
    // draft the pattern
    pattern.draft()
    patternProps = pattern.getRenderProps()
  } catch (err) {
    console.log(err)
  }
  const bgProps = { fill: 'none' }

  const exportIt = () => {
    // setError(false)
    // handleExport(
    //   'pdf',
    //   props.gist,
    //   props.design,
    //   t,
    //   props.app,
    //   () => setError(false),
    //   () => setError(true)
    // )
  }

  let name = design
  return (
    <div>
      <h2 className="capitalize">{t('layoutThing', { thing: name }) + ': ' + t('forPrinting')}</h2>
      <div className="flex flex-row">
        <div className="w-2/3 shrink-0 grow lg:p-4 sticky top-0">
          <ShowPattern renderProps={patternProps} />
        </div>
        <div className="w-1/3 shrink grow-0 lg:p-4 max-w-2xl h-screen overflow-scroll">
          <PrintMenu
            {...{
              design,
              pattern,
              patternConfig,
              settings,
              ui,
              update,
              language,
              account,
              DynamicDocs,
            }}
          />
        </div>
      </div>
    </div>
  )
}
