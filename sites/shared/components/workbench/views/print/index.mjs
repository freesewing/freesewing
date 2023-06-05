import { useEffect, useState, useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { pagesPlugin } from 'shared/plugins/plugin-layout-part.mjs'
import {
  handleExport,
  ns as exportNs,
} from 'shared/components/workbench/exporting/export-handler.mjs'
import get from 'lodash.get'
import { MovablePattern } from 'shared/components/workbench/pattern/movable/index.mjs'
import { PrintMenu, ns as menuNs } from './menu.mjs'
import { defaultPrintSettings, printSettingsPath } from './config.mjs'
import { PrintIcon, RightIcon, ClearIcon, ExportIcon } from 'shared/components/icons.mjs'
import { LoadingContext } from 'shared/context/loading-context.mjs'
import { useToast } from 'shared/hooks/use-toast.mjs'

const viewNs = ['print', ...exportNs]
export const ns = [...viewNs, ...menuNs]

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
  Design,
}) => {
  const { t } = useTranslation(ns)
  const loading = useContext(LoadingContext)
  const toast = useToast()

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
  const bgProps = { fill: 'none' }

  const exportIt = () => {
    handleExport({
      format: 'pdf',
      settings,
      design,
      t,
      Design,
      ui,
      startLoading: loading.startLoading,
      stopLoading: loading.stopLoading,
      onComplete: () => {},
      onError: (err) => toast.error(err.message),
    })
  }

  let name = design
  const pages = pattern.setStores[0].get('pages', {})
  const { cols, rows, count } = pages
  return (
    <div>
      <div className="flex flex-row">
        <div className="w-2/3 shrink-0 grow lg:p-4 sticky top-0">
          <div className="flex justify-between">
            <h2 className="capitalize">
              {t('layoutThing', { thing: name }) + ' ' + t('forPrinting')}
            </h2>
            <div className="flex flex-row font-bold items-center text-2xl justify-center ">
              <PrintIcon />
              <span className="ml-2">{count}</span>
              <span className="mx-6 opacity-50">|</span>
              <RightIcon />
              <span className="ml-2">{cols}</span>
              <span className="mx-6 opacity-50">|</span>
              <div className="rotate-90">
                <RightIcon />
              </div>
              <span className="ml-2">{rows}</span>
            </div>
          </div>
          <MovablePattern
            {...{
              renderProps,
              update,
              immovable: ['pages'],
              layoutPath: ['layouts', 'print'],
              showButtons: !ui.hideMovableButtons,
            }}
          />
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
              exportIt,
            }}
          />
        </div>
      </div>
    </div>
  )
}
