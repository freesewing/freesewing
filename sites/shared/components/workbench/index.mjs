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
import { ModalSpinner } from 'shared/components/modal/spinner.mjs'
// Views
import { DraftView, ns as draftNs } from 'shared/components/workbench/views/draft/index.mjs'
import { SaveView, ns as saveNs } from 'shared/components/workbench/views/save/index.mjs'

export const ns = ['account', 'workbench', ...draftNs, ...saveNs]

const defaultUi = {
  renderer: 'react',
}

const draftViews = ['draft', 'test']

export const Workbench = ({ design, Design, baseSettings, DynamicDocs, from, set }) => {
  // Hooks
  const { t, i18n } = useTranslation(ns)
  const { language } = i18n
  const { account } = useAccount()

  // State
  const [view, setView] = useView()
  const [settings, setSettings] = useState({ ...baseSettings, embed: true })
  const [ui, setUi] = useState(defaultUi)
  const [error, setError] = useState(false)

  // Effect
  useEffect(() => {
    // Force re-render when baseSettings changes. Required when they are loaded async.
    setSettings({ ...baseSettings, embed: true })
  }, [baseSettings])

  // Helper methods for settings/ui updates
  const update = {
    settings: (path, val) => setSettings(objUpdate({ ...settings }, path, val)),
    ui: (path, val) => setUi(objUpdate({ ...ui }, path, val)),
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
    setView,
    update,
    settings,
    ui,
    language,
    DynamicDocs,
  }
  let viewContent = null

  // Draft view
  if (view === 'draft') {
    // Generate the pattern here so we can pass it down to both the view and the options menu
    const pattern =
      settings.measurements && draftViews.includes(view) ? new Design(settings) : false

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
    viewContent = <DraftView {...viewProps} {...{ pattern, patternConfig }} />
  }

  // Save view
  else if (view === 'save') viewContent = <SaveView {...viewProps} from={from} />

  return (
    <>
      <WorkbenchHeader {...{ view, setView, update }} />
      {viewContent}
    </>
  )
}
