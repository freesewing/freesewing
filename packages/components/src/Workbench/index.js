import React, { useState, useEffect } from 'react'
import withGist from '../withGist'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Navbar from '../Navbar'
import defaultGist from '@freesewing/utils/defaultGist'
import storage from '@freesewing/utils/storage'
import { dark, light } from '@freesewing/mui-theme'
import withLanguage from '../withLanguage'
import LanguageIcon from '@material-ui/icons/Translate'
import DarkModeIcon from '@material-ui/icons/Brightness3'
import LanguageChooser from './LanguageChooser'
import DraftPattern from './DraftPattern'
import Json from './Json'
import SamplePattern from './SamplePattern'
import Welcome from './Welcome'
import Measurements from './Measurements'

const Workbench = ({
  updateGist,
  setLanguage,
  userLanguage = 'en',
  language = 'en',
  gist,
  importGist,
  config,
  freesewing,
  Pattern,
  units = 'metric',
  translations = false,
  addTranslations
}) => {
  const [display, setDisplay] = useState(null)
  const [pattern, setPattern] = useState(false)
  const [theme, setTheme] = useState('light')
  const [measurements, setMeasurements] = useState(null)
  const [svgExport, setSvgExport] = useState(false)

  // Enable debug in Workbench
  defaultGist.settings.debug = true

  useEffect(() => {
    let m = getMeasurements()
    setMeasurements(m)
    updateGist(m, 'settings', 'measurements')
    setDisplay(getDisplay())
    setLanguage(userLanguage)
    if (translations) addTranslations(translations)
  }, [])
  useEffect(() => {
    if (language !== gist.settings.locale) updateGist(language, 'settings', 'locale')
  }, [language])

  const getDisplay = () => storage.get(config.name + '-display')
  const saveDisplay = (d) => {
    setDisplay(d)
    storage.set(config.name + '-display', d)
  }
  const getMeasurements = () => storage.get(config.name + '-measurements')
  const saveMeasurements = (data) => {
    storage.set(config.name + '-measurements', data)
    updateGist(data, 'settings', 'measurements')
  }
  const updateMeasurement = (name, val) => {
    let updatedMeasurements = { ...measurements }
    updatedMeasurements[name] = val
    setMeasurements(updatedMeasurements)
    saveMeasurements(updatedMeasurements)
  }
  const preloadMeasurements = (model) => {
    let updatedMeasurements = {
      ...measurements,
      ...model
    }
    setMeasurements(updatedMeasurements)
    saveMeasurements(updatedMeasurements)
  }
  const measurementsMissing = () => {
    let required = config.measurements
    if (required.length < 1) return false
    if (measurements === null) return true
    for (let m of required) {
      if (typeof measurements[m] === 'undefined') return true
    }

    return false
  }
  const toggleDarkMode = () => {
    if (theme === 'light') setTheme('dark')
    else setTheme('light')
  }
  const raiseEvent = (type = null, data = null) => {}

  const navs = {
    left: {
      draft: {
        type: 'button',
        onClick: () => saveDisplay('draft'),
        text: 'cfp.draftYourPattern',
        active: display === 'draft' ? true : false
      },
      sample: {
        type: 'button',
        onClick: () => saveDisplay('sample'),
        text: 'cfp.testYourPattern',
        active: display === 'sample' ? true : false
      },
      measurements: {
        type: 'button',
        onClick: () => saveDisplay('measurements'),
        text: 'app.measurements',
        active: display === 'measurements' ? true : false
      },
      json: {
        type: 'button',
        onClick: () => saveDisplay('json'),
        text: ['JSON'],
        active: display === 'json' ? true : false
      }
    },
    right: {
      version: {
        type: 'link',
        href: 'https://github.com/freesewing/freesewing/releases',
        text: ['v' + freesewing.version]
      },
      language: {
        type: 'button',
        onClick: () => saveDisplay('languages'),
        text: <LanguageIcon className="nav-icon" />,
        title: 'Languages',
        active: display === 'languages' ? true : false
      },
      dark: {
        type: 'button',
        onClick: toggleDarkMode,
        text: <DarkModeIcon className="nav-icon moon" />,
        title: 'Toggle dark mode'
      }
    }
  }
  if (display === 'draft' && !measurementsMissing())
    navs.left.svgExport = {
      type: 'button',
      onClick: () => setSvgExport(true),
      text: 'app.export',
      active: false
    }
  // FIXME:
  navs.mleft = navs.left
  navs.mright = navs.right
  let main = null
  switch (display) {
    case 'languages':
      main = <LanguageChooser setLanguage={setLanguage} setDisplay={saveDisplay} />
      break
    case 'draft':
      if (measurementsMissing()) saveDisplay('measurements')
      main = (
        <DraftPattern
          freesewing={freesewing}
          Pattern={Pattern}
          config={config}
          gist={gist}
          updateGist={updateGist}
          raiseEvent={raiseEvent}
          units={units}
          svgExport={svgExport}
          setSvgExport={setSvgExport}
          theme={theme}
        />
      )
      break
    case 'sample':
      if (measurementsMissing()) saveDisplay('measurements')
      main = (
        <SamplePattern
          freesewing={freesewing}
          Pattern={Pattern}
          config={config}
          gist={gist}
          updateGist={updateGist}
          raiseEvent={raiseEvent}
          units={units}
        />
      )
      break
    case 'measurements':
      main = (
        <Measurements
          measurements={measurements}
          required={config.measurements}
          units={units}
          updateMeasurement={updateMeasurement}
          preloadMeasurements={preloadMeasurements}
          language={language}
        />
      )
      break
    case 'json':
      main = <Json gist={gist} />
      break
    case 'inspect':
      main = (
        <InspectPattern
          freesewing={freesewing}
          Pattern={Pattern}
          config={config}
          gist={gist}
          updateGist={updateGist}
          raiseEvent={raiseEvent}
          units={units}
          svgExport={svgExport}
          setSvgExport={setSvgExport}
        />
      )
      break
    default:
      main = <Welcome language={language} setDisplay={saveDisplay} />
  }

  const themes = { dark, light }

  return (
    <MuiThemeProvider theme={createMuiTheme(themes[theme])}>
      <div
        className={
          theme === 'light' ? 'workbench theme-wrapper light' : 'workbench theme-wrapper dark'
        }
      >
        {display !== 'welcome' ? <Navbar navs={navs} home={() => saveDisplay('welcome')} /> : null}
        {main}
      </div>
    </MuiThemeProvider>
  )
}

export default withLanguage(
  withGist(Workbench, {
    gist: defaultGist,
    store: true
  }),
  'en'
)
