import { useEffect, useState, useMemo } from 'react'
import { useGist } from 'shared/hooks/useGist'
import Layout from 'shared/components/layouts/default'
import Menu from 'shared/components/workbench/menu/index.js'
import DraftError from 'shared/components/workbench/draft/error.js'
import { pluginTheme } from '@freesewing/plugin-theme'
import preloaders from 'shared/components/workbench/preload.js'
import Modal from 'shared/components/modal'

// Views
import Measurements from 'shared/components/workbench/measurements/index.js'
import LabDraft from 'shared/components/workbench/draft/index.js'
import LabSample from 'shared/components/workbench/sample.js'
import ExportDraft from 'shared/components/workbench/exporting/index.js'
import GistAsJson from 'shared/components/workbench/gist-as-json.js'
import GistAsYaml from 'shared/components/workbench/yaml.js'
import DraftLogs from 'shared/components/workbench/logs.js'
import CutLayout from 'shared/components/workbench/layout/cut'
import PrintingLayout from 'shared/components/workbench/layout/print'

import ErrorBoundary from 'shared/components/error/error-boundary'

const views = {
  measurements: Measurements,
  draft: LabDraft,
  test: LabSample,
  printingLayout: PrintingLayout,
  cuttingLayout: CutLayout,
  export: ExportDraft,
  logs: DraftLogs,
  yaml: GistAsYaml,
  json: GistAsJson,
  welcome: () => <p>TODO</p>,
}

const hasRequiredMeasurementsMethod = (design, gist) => {
  if (design.patternConfig?.measurements?.length > 0 && !gist.measurements) return false

  for (const m of design.patternConfig?.measurements || []) {
    if (!gist.measurements[m]) return false
  }

  return true
}

const doPreload = async (preload, from, design, gist, setGist, setPreloaded) => {
  const g = await preloaders[from](preload, design)
  setPreloaded(preload)
  setGist({ ...gist, ...g.settings })
}

/*
 * This component wraps the workbench and is in charge of
 * keeping the gist state, which will trickle down
 * to all workbench subcomponents
 */
const WorkbenchWrapper = ({ app, design, preload = false, from = false, layout = false }) => {
  // State for gist
  const { gist, setGist, unsetGist, updateGist, gistReady, undoGist, resetGist } = useGist(
    design.designConfig?.data?.name,
    app
  )
  const [messages, setMessages] = useState([])
  const [popup, setPopup] = useState(false)
  const [preloaded, setPreloaded] = useState(false)

  // We'll use this in more than one location
  const hasRequiredMeasurements = hasRequiredMeasurementsMethod(design, gist)

  // If we don't have the required measurements,
  // force view to measurements
  useEffect(() => {
    if (!gistReady) return
    if (gist._state?.view !== 'measurements' && !hasRequiredMeasurements)
      updateGist(['_state', 'view'], 'measurements')
  }, [gistReady, gist._state?.view, hasRequiredMeasurements])

  // If we need to preload the gist, do so
  useEffect(() => {
    if (preload && preload !== preloaded && from && preloaders[from]) {
      doPreload(preload, from, design, gist, setGist, setPreloaded)
    }
  }, [preload, preloaded, from, design])

  // Helper methods to manage the gist state
  const updateWBGist = useMemo(
    () =>
      (path, value, closeNav = false, addToHistory = true) => {
        updateGist(path, value, addToHistory)
        // Force close of menu on mobile if it is open
        if (closeNav && app.primaryMenu) app.setPrimaryMenu(false)
      },
    [app]
  )

  // Helper methods to handle messages
  const feedback = {
    add: (msg) => {
      const newMsgs = [...messages]
      if (Array.isArray(msg)) newMsgs.push(...msg)
      else newMsgs.push(msg)
      setMessages(newMsgs)
    },
    set: setMessages,
    clear: () => setMessages([]),
  }

  // don't do anything until the gist is ready
  if (!gistReady) {
    return null
  }

  // Generate the draft here so we can pass it down to both the view and the options menu
  let draft = false
  if (['draft', 'logs', 'test', 'printingLayout'].indexOf(gist._state?.view) !== -1) {
    gist.embed = true
    // get the appropriate layout for the view
    const layout = gist.layouts?.[gist._state.view] || gist.layout || true
    // hand it separately to the design
    draft = new design({ ...gist, layout })
    //draft.__init()

    // add theme to svg renderer
    if (gist.renderer === 'svg') draft.use(pluginTheme, { skipGrid: ['pages'] })

    // draft it for draft and event views. Other views may add plugins, etc and we don't want to draft twice
    try {
      if (['draft', 'logs'].indexOf(gist._state.view) > -1) draft.draft()
    } catch (error) {
      return <DraftError error={error} app={app} draft={draft} at={'draft'} />
    }
  }

  // Props to pass down
  const componentProps = {
    app,
    design,
    gist,
    updateGist: updateWBGist,
    unsetGist,
    setGist,
    draft,
    feedback,
    gistReady,
    showInfo: setPopup,
    hasRequiredMeasurements,
  }
  // Required props for layout
  const layoutProps = {
    app: app,
    noSearch: true,
    workbench: true,
    AltMenu: <Menu {...componentProps} />,
    showInfo: setPopup,
  }

  const errorProps = {
    undoGist,
    resetGist,
    gist,
  }

  // Layout to use
  const LayoutComponent = layout ? layout : Layout

  const Component = views[gist._state?.view] ? views[gist._state.view] : views.welcome

  return (
    <LayoutComponent {...layoutProps}>
      {messages}
      <ErrorBoundary {...errorProps}>
        <Component {...componentProps} />
        {popup && <Modal cancel={() => setPopup(false)}>{popup}</Modal>}
      </ErrorBoundary>
    </LayoutComponent>
  )
}

export default WorkbenchWrapper
