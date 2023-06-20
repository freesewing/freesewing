// Hooks
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useView } from 'shared/hooks/use-view.mjs'
import { usePatternSettings } from 'shared/hooks/use-pattern-settings.mjs'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useControlState } from 'shared/components/account/control.mjs'
// Dependencies
import { pluginTheme } from '@freesewing/plugin-theme'
import { pluginI18n } from '@freesewing/plugin-i18n'
import { objUpdate, hasRequiredMeasurements } from 'shared/utils.mjs'
// Components
import { WorkbenchHeader } from './header.mjs'
import { ErrorView } from 'shared/components/error/view.mjs'
import { ModalSpinner } from 'shared/components/modal/spinner.mjs'
// Views
import { DraftView, ns as draftNs } from 'shared/components/workbench/views/draft/index.mjs'
import { SaveView, ns as saveNs } from 'shared/components/workbench/views/save/index.mjs'
import { PrintView, ns as printNs } from 'shared/components/workbench/views/print/index.mjs'
import { CutView, ns as cutNs } from 'shared/components/workbench/views/cut/index.mjs'
import { EditView, ns as editNs } from './views/edit/index.mjs'
import { TestView, ns as testNs } from 'shared/components/workbench/views/test/index.mjs'
import { ExportView, ns as exportNs } from 'shared/components/workbench/views/exporting/index.mjs'
import { LogView, ns as logNs } from 'shared/components/workbench/views/logs/index.mjs'
import { InspectView, ns as inspectNs } from 'shared/components/workbench/views/inspect/index.mjs'
import { MeasiesView, ns as measiesNs } from 'shared/components/workbench/views/measies/index.mjs'

export const ns = [
  'account',
  'workbench',
  ...draftNs,
  ...saveNs,
  ...printNs,
  ...cutNs,
  ...editNs,
  ...testNs,
  ...exportNs,
  ...logNs,
  ...inspectNs,
  ...measiesNs,
]

const defaultUi = {
  renderer: 'react',
}

const views = {
  draft: DraftView,
  print: PrintView,
  cut: CutView,
  export: ExportView,
  edit: EditView,
  test: TestView,
  logs: LogView,
  inspect: InspectView,
  measies: MeasiesView,
}

const draftViews = ['draft', 'inspect']

export const Workbench = ({ design, Design, DynamicDocs }) => {
  // Hooks
  const { t, i18n } = useTranslation(ns)
  const { language } = i18n
  const { account } = useAccount()
  const controlState = useControlState()

  // State
  const [view, setView] = useView()
  const [settings, setSettings] = usePatternSettings()
  const [ui, setUi] = useState(defaultUi)
  const [error, setError] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [missingMeasurements, setMissingMeasurements] = useState(false)

  useEffect(() => {
    // Force the measurements view if we have missing measurements
    const [ok, missing] = hasRequiredMeasurements(Design, settings.measurements)
    if (ok) setMissingMeasurements(false)
    else {
      // Guard against loops
      if (JSON.stringify(missing) !== JSON.stringify(missingMeasurements))
        setMissingMeasurements(missing)
      if (view !== 'measies') setView('measies')
    }
  }, [Design, settings.measurements, missingMeasurements, view])

  // Helper methods for settings/ui updates
  const update = {
    settings: (path, val) => setSettings(objUpdate({ ...settings }, path, val)),
    ui: (path, val) => setUi(objUpdate({ ...ui }, path, val)),
    toggleSa: () => {
      const sa = settings.samm || (account.imperial ? 15.3125 : 10)
      if (settings.sabool)
        setSettings(
          objUpdate({ ...settings }, [
            [['sabool'], 0],
            [['sa'], 0],
            [['samm'], sa],
          ])
        )
      else {
        const sa = settings.samm || (account.imperial ? 15.3125 : 10)
        setSettings(
          objUpdate({ ...settings }, [
            [['sabool'], 1],
            [['sa'], sa],
            [['samm'], sa],
          ])
        )
      }
    },
    setControl: controlState.update,
  }

  // Don't bother without a Design
  if (!Design) return <ModalSpinner />

  // Short-circuit errors early
  if (error)
    return (
      <>
        <WorkbenchHeader {...{ view, setView, update }} />
        {error}
      </>
    )

  // Deal with each view
  const viewProps = {
    account,
    design,
    view,
    setView,
    update,
    settings,
    ui,
    language,
    DynamicDocs,
    Design,
  }
  let viewContent = null

  switch (view) {
    // Save view
    case 'save':
      viewContent = <SaveView {...viewProps} from={from} />
      break
    case 'export':
      viewContent = <ExportView {...viewProps} />
      break
    case 'edit':
      viewContent = <EditView {...viewProps} setSettings={setSettings} />
      break
    case 'measies':
      viewContent = <MeasiesView {...viewProps} {...{ setSettings, missingMeasurements }} />
      break
    default: {
      const layout = ui.layouts?.[view] || settings.layout || true
      // Generate the pattern here so we can pass it down to both the view and the options menu
      const pattern = settings.measurements !== undefined && new Design({ layout, ...settings })

      // Return early if the pattern is not initialized yet
      if (typeof pattern.getConfig !== 'function') return null

      const patternConfig = pattern.getConfig()
      if (ui.renderer === 'svg') {
        // Add theme to svg renderer
        pattern.use(pluginI18n, { t })
        pattern.use(pluginTheme, { skipGrid: ['pages'] })
      }

      if (draftViews.includes(view)) {
        // Draft the pattern or die trying
        try {
          pattern.draft()
          const errors = [...pattern.store.logs.error]
          for (const store of pattern.setStores) errors.push(...store.logs.error)
          if (errors.length > 0) setView('logs')
        } catch (error) {
          console.log(error)
          setError(<ErrorView>{JSON.stringify(error)}</ErrorView>)
        }
      }
      const View = views[view]
      viewContent = <View {...{ ...viewProps, pattern, patternConfig }} />
    }
  }

  return (
    <div className="flex flex-row">
      <div className="grow-no shrink-no">
        <WorkbenchHeader {...{ view, setView, update }} />
      </div>
      <div className="grow">{viewContent}</div>
    </div>
  )
}
