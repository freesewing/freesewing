import { useState, useEffect } from 'react'
import useLocalStorage from 'shared/hooks/useLocalStorage.js'
import Layout from 'shared/components/layouts/default'
import Menu from 'shared/components/workbench/menu.js'
import Measurements, { Input } from 'shared/components/workbench/measurements.js'
import set from 'lodash.set'

// Generates a default pattern gist to start from
const defaultGist = (pattern, language='en') => ({
  design: pattern.config.name,
  version: pattern.config.version,
  settings: {
    sa: 0,
    complete: true,
    paperless: false,
    units: 'metric',
    locale: language,
    margin: 2,
    debug: true,
  }
})

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
  const [mode, setMode] = useState(null)
  const [gist, setGist] = useLocalStorage('gist', defaultGist(pattern, app.language))

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

  // Required props for layout
  const layoutProps = {
    app: app,
    noSearch: true,
    workbench: true,
    AltMenu: <Menu app={app} pattern={pattern} mode={mode} setMode={setMode} gist={gist} updateGist={updateGist} />
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
      <pre>{JSON.stringify(mode, null, 2)}</pre>
      <pre>{JSON.stringify(gist, null, 2)}</pre>
    </Layout>
  )
}

export default WorkbenchWrapper

