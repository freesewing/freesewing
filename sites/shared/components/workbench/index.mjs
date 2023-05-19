// Hooks
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useView } from 'shared/hooks/use-view.mjs'
import { useAccount } from 'shared/hooks/use-account.mjs'
// Dependencies
import { pluginTheme } from '@freesewing/plugin-theme'
import { pluginI18n } from '@freesewing/plugin-i18n'
import { objUpdate } from 'shared/utils.mjs'
// Components
import { WorkbenchHeader } from './header.mjs'
import { ErrorView } from 'shared/components/error/view.mjs'
// Views
import { DraftView, ns as draftNs } from 'shared/components/workbench/views/draft/index.mjs'

export const ns = ['workbench', ...draftNs]

const loadDefaultSettings = ({ locale = 'en', units = 'metric' }) => ({
  units,
  locale,
  embed: true,
})

const defaultUi = {
  renderer: 'react',
}

const draftViews = ['draft', 'test']

export const Workbench = ({ design, Design, set = false, DynamicDocs = false }) => {
  // Hooks
  const { t, i18n } = useTranslation(ns)
  const { language } = i18n
  const { account } = useAccount()

  const defaultSettings = loadDefaultSettings({
    units: account.imperial ? 'imperial' : 'metric',
    locale: language,
  })
  if (set) defaultSettings.measurements = set.measies

  // State
  const [view, setView] = useView()
  const [settings, setSettings] = useState({ ...defaultSettings, embed: true })
  const [ui, setUi] = useState({ ...defaultUi })
  const [error, setError] = useState(false)

  // Effects
  useEffect(() => {
    if (set.measies) update.settings('measurements', set.measies)
  }, [set])

  // Don't bother without a set or Design
  if (!set || !Design) return null

  // Short-circuit errors early
  if (error)
    return (
      <>
        <WorkbenchHeader setView={setView} />
        {error}
      </>
    )

  // Helper methods for settings/ui updates
  const update = {
    settings: (path, val) => setSettings(objUpdate({ ...settings }, path, val)),
    ui: (path, val) => setUi(objUpdate({ ...ui }, path, val)),
  }

  // Generate the pattern here so we can pass it down to both the view and the options menu
  const pattern = draftViews.includes(view) ? new Design(settings) : false

  // Return early if the pattern is not initialized yet
  if (typeof pattern.getConfig !== 'function') return null

  const patternConfig = pattern.getConfig()

  if (ui.renderer === 'svg') {
    // Add theme to svg renderer
    pattern.use(pluginI18n, { t })
    pattern.use(pluginTheme, { skipGrid: ['pages'] })
  }

  // Draft the pattern or die trying
  try {
    pattern.draft()
  } catch (error) {
    console.log(error)
    setError(<ErrorView>{JSON.stringify(error)}</ErrorView>)
  }

  return (
    <>
      <WorkbenchHeader setView={setView} view={view} />
      {view === 'draft' && (
        <DraftView
          {...{
            design,
            pattern,
            patternConfig,
            setView,
            update,
            settings,
            ui,
            language,
            DynamicDocs,
          }}
          account={account}
        />
      )}
    </>
  )
}
