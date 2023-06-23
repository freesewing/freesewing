import { useContext } from 'react'
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
import { PrintIcon, RightIcon } from 'shared/components/icons.mjs'
import { LoadingContext } from 'shared/context/loading-context.mjs'
import { useToast } from 'shared/hooks/use-toast.mjs'
import { PatternWithMenu, ns as wrapperNs } from '../pattern-with-menu.mjs'

const viewNs = ['print', ...exportNs]
export const ns = [...viewNs, ...menuNs, ...wrapperNs]

const PageCounter = ({ pattern }) => {
  const pages = pattern.setStores[0].get('pages', {})
  const { cols, rows, count } = pages

  return (
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
  )
}
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

  return (
    <PatternWithMenu
      {...{
        settings,
        ui,
        update,
        control: account.control,
        setSettings,
        title: (
          <div className="flex lg:justify-between items-baseline flex-wrap px-2">
            <h2 className="text-center lg:text-left capitalize">
              {t('layoutThing', { thing: design }) + ' ' + t('forPrinting')}
            </h2>
            <PageCounter pattern={pattern} />
          </div>
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
  )
}
