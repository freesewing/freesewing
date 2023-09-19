// Dependencies
import { nsMerge } from 'shared/utils.mjs'
import {
  handleExport,
  ns as exportNs,
} from 'shared/components/workbench/exporting/export-handler.mjs'
import { pagesPlugin } from 'shared/plugins/plugin-layout-part.mjs'
import get from 'lodash.get'
import { defaultPrintSettings, printSettingsPath } from './config.mjs'
// Hooks
import { useContext } from 'react'
import { useTranslation } from 'next-i18next'
// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Components
import { MovablePattern } from 'shared/components/workbench/pattern/movable/index.mjs'
import { PrintMenu, ns as menuNs } from './menu.mjs'
import { PatternWithMenu, ns as wrapperNs } from '../pattern-with-menu.mjs'

export const ns = nsMerge(menuNs, wrapperNs, exportNs, 'print', 'status')

export const PrintView = ({
  design,
  pattern,
  patternConfig,
  settings,
  setSettings,
  ui,
  update,
  language,
  account,
  DynamicDocs,
  Design,
}) => {
  const { t } = useTranslation(ns)
  const { loading, setLoadingStatus } = useContext(LoadingStatusContext)

  const defaultSettings = defaultPrintSettings(settings.units)
  // add the pages plugin to the draft
  const pageSettings = {
    ...defaultSettings,
    ...get(ui, printSettingsPath, {}),
  }

  pattern.use(pagesPlugin(pageSettings))

  let renderProps
  try {
    // draft the pattern
    pattern.draft()
    renderProps = pattern.getRenderProps()
  } catch (err) {
    console.log(err)
  }

  const exportIt = () => {
    setLoadingStatus([true, 'generatingPdf'])
    handleExport({
      format: pageSettings.size,
      settings,
      design,
      t,
      Design,
      ui,
      startLoading: loading.startLoading,
      stopLoading: loading.stopLoading,
      onComplete: () => {
        setLoadingStatus([true, 'pdfReady', true, true])
      },
      onError: (err) => {
        setLoadingStatus([true, 'pdfFailed', true, true])
        console.log(err)
      },
    })
  }

  return (
    <>
      <PatternWithMenu
        noHeader
        {...{
          settings,
          ui,
          update,
          control: account.control,
          account,
          design,
          setSettings,
          title: (
            <h2 className="text-center lg:text-left capitalize">{t('workbench:printLayout')}</h2>
          ),
          pattern: (
            <MovablePattern
              {...{
                renderProps,
                update,
                immovable: ['pages'],
                layoutPath: ['layouts', 'print'],
                showButtons: !ui.hideMovableButtons,
              }}
            />
          ),
          menu: (
            <PrintMenu
              {...{
                design,
                pattern,
                patternConfig,
                setSettings,
                settings,
                ui,
                update,
                language,
                account,
                DynamicDocs,
                exportIt,
              }}
            />
          ),
        }}
      />
    </>
  )
}
