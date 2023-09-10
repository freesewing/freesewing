// Hooks
import { useEffect, useState, useCallback, useMemo } from 'react'
import { useTranslation } from 'next-i18next'
import { useView } from 'shared/hooks/use-view.mjs'
import { usePatternSettings } from 'shared/hooks/use-pattern-settings.mjs'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useControlState } from 'shared/components/account/control.mjs'
// Dependencies
import { pluginTheme } from '@freesewing/plugin-theme'
import { pluginI18n } from '@freesewing/plugin-i18n'
import { objUpdate, hasRequiredMeasurements, nsMerge } from 'shared/utils.mjs'
// Components
import { Header, ns as headerNs } from 'site/components/header/index.mjs'
import { WorkbenchHeader } from './header.mjs'
import { ErrorView } from 'shared/components/error/view.mjs'
import { ModalSpinner } from 'shared/components/modal/spinner.mjs'
import { MobileMenubar } from './menus/mobile-menubar.mjs'
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

export const ns = nsMerge(
  'account',
  'workbench',
  'flag',
  'plugin-annotations',
  draftNs,
  saveNs,
  printNs,
  cutNs,
  editNs,
  testNs,
  exportNs,
  logNs,
  inspectNs,
  measiesNs,
  headerNs
)

const defaultUi = {
  renderer: 'react',
  kiosk: false,
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

const kioskClasses = 'z-30 w-screen h-screen fixed top-0 left-0 bg-base-100'

export const Workbench = ({ design, Design, DynamicDocs }) => {
  // Hooks
  const { t, i18n } = useTranslation([...ns, design])
  const { language } = i18n
  const { account } = useAccount()
  const controlState = useControlState()

  // State
  const [view, _setView] = useView()
  const [settings, setSettings] = usePatternSettings()
  const [ui, setUi] = useState(defaultUi)
  const [error, setError] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [missingMeasurements, setMissingMeasurements] = useState(false)

  const setView = useCallback(
    (newView) => {
      // hacky little way to scroll to the top but keep the menu hidden if it was hidden
      const endScroll = Math.min(window.scrollY, 21)
      window.scrollTo({ top: 0, behavior: 'instant' })
      _setView(newView)
      window.scroll({ top: endScroll })
    },
    [_setView]
  )

  // set mounted on mount
  useEffect(() => setMounted(true), [setMounted])

  useEffect(() => {
    // protect against loops
    if (!mounted) return

    setMounted(true)
    const [ok, missing] = hasRequiredMeasurements(Design, settings.measurements)
    if (ok) setMissingMeasurements(false)
    // Force the measurements view if we have missing measurements
    else {
      setMissingMeasurements(missing)
      if (view !== 'measies') setView('measies')
    }
  }, [Design, settings.measurements, mounted, view, setView])

  // Helper methods for settings/ui updates
  const update = useMemo(
    () => ({
      settings: (path, val) =>
        setSettings((curSettings) => objUpdate({ ...curSettings }, path, val)),
      ui: (path, val) => setUi((curUi) => objUpdate({ ...curUi }, path, val)),
      toggleSa: () => {
        setSettings((curSettings) => {
          const sa = curSettings.samm || (account.imperial ? 15.3125 : 10)

          if (curSettings.sabool)
            return objUpdate({ ...curSettings }, [
              [['sabool'], 0],
              [['sa'], 0],
              [['samm'], sa],
            ])
          else {
            return objUpdate({ ...curSettings }, [
              [['sabool'], 1],
              [['sa'], sa],
              [['samm'], sa],
            ])
          }
        })
      },
      setControl: controlState.update,
    }),
    [setSettings, setUi, account, controlState]
  )

  // wait for mount. this helps prevent hydration issues
  if (!mounted) return <ModalSpinner />

  // Warn that the design is somehow missing
  if (!Design) return <ErrorView>{t('workbench.noDesignFound')}</ErrorView>

  // Short-circuit errors early
  if (error)
    return (
      <>
        <WorkbenchHeader {...{ view, setView, update }} />
        {error}
        <MobileMenubar />
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
    setSettings,
    ui,
    language,
    DynamicDocs,
    Design,
  }
  let viewContent = null

  switch (view) {
    // Save view
    case 'save':
      viewContent = <SaveView {...viewProps} />
      break
    case 'export':
      viewContent = <ExportView {...viewProps} />
      break
    case 'edit':
      viewContent = <EditView {...viewProps} setSettings={setSettings} />
      break
    case 'measies':
      viewContent = <MeasiesView {...viewProps} {...{ missingMeasurements }} />
      break
    default: {
      const layout = ui.layouts?.[view] || settings.layout || true
      // Generate the pattern here so we can pass it down to both the view and the options menu
      const pattern =
        (Design.patternConfig.measurements.length === 0 || settings.measurements !== undefined) &&
        new Design({ layout, embed: true, ...settings })
      // Return early if the pattern is not initialized yet
      if (typeof pattern.getConfig !== 'function') return null

      const patternConfig = pattern.getConfig()
      if (ui.renderer === 'svg') {
        // Add theme to svg renderer
        pattern.use(pluginI18n, (key) => t(key))
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
    <>
      {!ui.kiosk && <Header />}
      <div className={`flex flex-row min-h-screen ${ui.kiosk ? kioskClasses : ''}`}>
        <WorkbenchHeader {...{ view, setView, update }} />
        <div className="grow">{viewContent}</div>
        <MobileMenubar />
      </div>
    </>
  )
}
