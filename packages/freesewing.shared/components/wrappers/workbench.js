import { useEffect } from 'react'
import useLocalStorage from 'shared/hooks/useLocalStorage.js'
import Layout from 'shared/components/layouts/default'
import Menu from 'shared/components/workbench/menu/index.js'
import set from 'lodash.set'
import unset from 'lodash.unset'
import defaultSettings from 'shared/components/workbench/default-settings.js'
import DraftError from 'shared/components/workbench/draft/error.js'
import theme from 'pkgs/plugin-theme/src/index.js'

// Views
import Measurements from 'shared/components/workbench/measurements/index.js'
import LabDraft from 'shared/components/workbench/draft/index.js'
import LabSample from 'shared/components/workbench/sample.js'
import GistAsJson from 'shared/components/workbench/json.js'
import GistAsYaml from 'shared/components/workbench/yaml.js'
import DraftEvents from 'shared/components/workbench/events.js'

const views = {
  measurements: Measurements,
  draft: LabDraft,
  test: LabSample,
  export: () => <p>TODO</p>,
  events: DraftEvents,
  yaml: GistAsYaml,
  json: GistAsJson,
  welcome: () => <p>TODO</p>,
}

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
 * keeping the gist state, which will trickly down
 * to all workbench subcomponents
 */
const WorkbenchWrapper = ({ app, pattern }) => {

  // State for gist
  const [gist, setGist] = useLocalStorage(`${pattern.config.name}_gist`, defaultGist(pattern, app.locale))

  // If we don't have the required measurements,
  // force view to measurements
  useEffect(() => {
    if (
      gist?._state?.view !== 'measurements'
      && !hasRequiredMeasurements(pattern, gist)
    ) updateGist(['_state', 'view'], 'measurements')
  })

  // Helper methods to manage the gist state
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

  // Generate the draft here so we can pass it down
  let draft = false
  if (['draft', 'events', 'test'].indexOf(gist?._state?.view) !== -1) {
    draft = new pattern(gist)
    if (gist?.renderer === 'svg') draft.use(theme)
    try {
      if (gist._state.view !== 'test') draft.draft()
    }
    catch(error) {
      console.log('Failed to draft pattern', error)
      return <DraftError error={error} app={app} draft={draft} at={'draft'} />
    }
  }

  // Props to pass down
  const componentProps = { app, pattern, gist, updateGist, unsetGist, setGist, draft }
  // Required props for layout
  const layoutProps = {
    app: app,
    noSearch: true,
    workbench: true,
    AltMenu: <Menu {...componentProps }/>
  }

  const Component = views[gist?._state?.view]
    ? views[gist._state.view]
    : views.welcome

  return  <Layout {...layoutProps}>
            <Component {...componentProps} />
          </Layout>
}

export default WorkbenchWrapper

