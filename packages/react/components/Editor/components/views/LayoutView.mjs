// Dependencies
import { defaultPrintSettings, printSettingsPath, handleExport } from '../../lib/export/index.mjs'
import { tilerPlugin } from '../../lib/export/plugin-tiler.mjs'
import { get } from '@freesewing/utils'
import { draft } from '../../lib/index.mjs'
import React from 'react'
//import {
//  handleExport,
//  ns as exportNs,
//} from 'shared/components/workbench/exporting/export-handler.mjs'
//import { pagesPlugin } from 'shared/plugins/plugin-layout-part.mjs'
//import get from 'lodash.get'
//import { defaultPrintSettings, printSettingsPath } from './config.mjs'
//// Hooks
//import { useContext } from 'react'
//import { useTranslation } from 'next-i18next'
//// Context
//import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Components
import { ZoomablePattern } from '../ZoomablePattern.mjs'
import { PatternLayout } from '../PatternLayout.mjs'
//import { MovablePattern } from 'shared/components/workbench/pattern/movable/index.mjs'
//import { PrintMenu, ns as menuNs } from './menu.mjs'
//import { PatternWithMenu, ns as wrapperNs } from '../pattern-with-menu.mjs'

export const LayoutView = (props) => {
  //  design,
  //  pattern,
  //  patternConfig,
  //  settings,
  //  setSettings,
  //  ui,
  //  update,
  //  language,
  //  account,
  //  Design,
  //}) => {

  const { config, state, update, Design } = props
  const defaultSettings = defaultPrintSettings(state.settings?.units)

  // Settings for the tiler plugin
  const pageSettings = {
    ...defaultSettings,
    ...get(state.ui, printSettingsPath, {}),
  }

  /*
   * Now draft the pattern
   */
  const { pattern, failure, errors } = draft(Design, state.settings, [tilerPlugin(pageSettings)])
  if (failure) return <p>Draft failed. FIXME: Handle this gracefully.</p>

  const renderProps = pattern.getRenderProps()

  const exportIt = () => {
    update.startLoading('layout', { msg: 'Generating PDF' })
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

  const output = (
    <MovablePattern
      {...{
        renderProps,
        update,
        immovable: ['pages'],
        layoutPath: ['layouts', 'print'],
        showButtons: !ui.hideMovableButtons,
      }}
    />
    //<ZoomablePattern
    //  renderProps={renderProps}
    //  patternLocale="en"
    //  rotate={state.ui.rotate}
    ///>
  )

  return <PatternLayout {...{ update, Design, output, state, pattern, config }} />

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
                exportIt,
              }}
            />
          ),
        }}
      />
    </>
  )
}
