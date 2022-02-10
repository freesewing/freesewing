import { useState, useEffect } from 'react'
import useLocalStorage from 'shared/hooks/useLocalStorage.js'
import Layout from 'shared/components/layouts/default'
import Menu from 'shared/components/workbench/menu/index.js'
import Measurements, { Input } from 'shared/components/workbench/measurements/index.js'
import LabDraft from 'shared/components/workbench/draft/index.js'
import set from 'lodash.set'
import unset from 'lodash.unset'
import defaultSettings from 'shared/components/workbench/default-settings.js'
import DraftError from 'shared/components/workbench/draft/error.js'
import theme from 'pkgs/plugin-theme/src/index.js'


// Generates a default pattern gist to start from
const defaultGist = (pattern, locale='en') => {
  const gist = {
  design: pattern.config.name,
  version: pattern.config.version,
  ...defaultSettings
  }
  if (locale) gist.locale = locale

  return gist
}

const hasRequiredMeasurements = (pattern, gist) => {
  for (const m of pattern.config.measurements) {
    if (!gist?.measurements?.[m]) return false
  }

  return true
}

/*
 * This component wraps the workbench and is in charge of
 * keeping the mode & gist state, which will trickly down
 * to all workbench subcomponents
 *
 * mode: What to display (draft, sample, measurements, ...)
 * gist: The runtime pattern configuration
 */
const WorkbenchWrapper = ({ app, pattern }) => {

  // State for display mode and gist
  const [mode, setMode] = useState('measurements')
  const [gist, setGist] = useLocalStorage('gist', defaultGist(pattern, app.locale))

  // If we don't have the requiremed measurements,
  // force mode to measurements
  useEffect(() => {
    if (
      mode !== 'measurements'
      && !hasRequiredMeasurements(pattern, gist)
    ) setMode('measurements')
  })

  /*
   * Update gist method. See lodash.set
   */
  const updateGist = (path, content) => {
    const newGist = {...gist}
    set(newGist, path, content)
    setGist(newGist)
  }
  const unsetGist = (path) => {
    const newGist = {...gist}
    unset(newGist, path)
    setGist(newGist)
  }

  // Generate the draft here so we can pass it to both Menu
  // and LabDraft
  let draft = false
  if (mode === 'draft') {
    draft = new pattern(gist)
    if (gist?.renderer === 'svg') draft.use(theme)
    try { draft.draft() }
    catch(error) {
      console.log('Failed to draft pattern', error)
      return <DraftError error={error} app={app} draft={draft} at={'draft'} />
    }
  }

  // Required props for layout
  const layoutProps = {
    app: app,
    noSearch: true,
    workbench: true,
    AltMenu: <Menu
      app={app}
      pattern={pattern}
      mode={mode}
      setMode={setMode}
      gist={gist}
      updateGist={updateGist}
      unsetGist={unsetGist}
      setGist={setGist}
      draft={draft}
    />
  }



  return (
    <Layout {...layoutProps}>
      {mode === 'measurements' && (
        <Measurements
          app={app}
          pattern={pattern}
          gist={gist}
          updateGist={updateGist}
        />
      )}
      {mode === 'draft' && (
        <LabDraft
          app={app}
          pattern={pattern}
          draft={draft}
          gist={gist}
          updateGist={updateGist}
          unsetGist={unsetGist}
        />
      )}
    </Layout>
  )
}

export default WorkbenchWrapper

