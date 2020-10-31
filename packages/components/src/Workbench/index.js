import React, { useState, useEffect } from 'react'
import withGist from '../withGist'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Navbar from './navbar'
import defaultGist from '@freesewing/utils/defaultGist'
import storage from '@freesewing/utils/storage'
import { dark, light } from '@freesewing/mui-theme'
import withLanguage from '../withLanguage'
import DraftPattern from './DraftPattern'
import DraftConfig from './DraftConfig'
import Json from './Json'
import Welcome from './Welcome'
import Measurements from './Measurements'
import DraftIcon from '@material-ui/icons/Gesture'
import TestIcon from '@material-ui/icons/DoneAll'
import MeasurementsIcon from '@material-ui/icons/Height'
import ExportIcon from '@material-ui/icons/ScreenShare'
import { FormattedMessage } from 'react-intl'
import { languages } from '@freesewing/i18n'
import Button from '@material-ui/core/Button'
import UnhideIcon from '@material-ui/icons/ChevronRight'
import SampleConfigurator from '../SampleConfigurator'
import svgattrPlugin from '@freesewing/plugin-svgattr'
import Xport from './Export'

const icons = {
  draft: <DraftIcon />,
  sample: <TestIcon />,
  measurements: <MeasurementsIcon />,
  xport: <ExportIcon />
}

const Workbench = ({
  updateGist,
  setLanguage,
  userLanguage = 'en',
  language = 'en',
  gist,
  importGist,
  freesewing,
  Pattern,
  units = 'metric',
  translations = false,
  addTranslations
}) => {
  const [display, setDisplay] = useState(null)
  const [theme, setTheme] = useState('light')
  const [measurements, setMeasurements] = useState(null)
  const [svgExport, setSvgExport] = useState(false)
  const [viewBox, setViewBox] = useState(false)
  const [hideAside, setHideAside] = useState(false)
  const [design, setDesign] = useState(true)
  const [focus, setFocus] = useState(null)

  const raiseEvent = (type, data) => {
    if (type === 'clearFocusAll') {
      updateGist(false, 'settings', 'only')
      return setFocus(null)
    }
    let f = {}
    if (focus !== null) f = { ...focus }
    if (typeof f[data.part] === 'undefined') f[data.part] = { paths: [], points: [], coords: [] }
    if (type === 'point') f[data.part].points.push(data.name)
    else if (type === 'path') f[data.part].paths.push(data.name)
    else if (type === 'coords') f[data.part].coords.push(data.coords)
    else if (type === 'clearFocus') {
      let i = focus[data.part][data.type].indexOf(data.name)
      f[data.part][data.type].splice(i, 1)
    } else if (type === 'part') updateGist(data, 'settings', 'only')

    setFocus(f)
  }

  // Get config from pattern object
  const config = Pattern.config
  const links = {
    draft: <FormattedMessage id="cfp.draftThing" values={{ thing: config.name }} />,
    sample: <FormattedMessage id="cfp.testThing" values={{ thing: config.name }} />,
    measurements: <FormattedMessage id="app.measurements" />,
    xport: <FormattedMessage id="app.export" />
  }

  // Enable debug in Workbench
  defaultGist.settings.debug = true

  useEffect(() => {
    let m = getMeasurements()
    setMeasurements(m)
    updateGist(m, 'settings', 'measurements')
    setLanguage(userLanguage)
    if (translations) addTranslations(translations)
    console.log('useEffect 1')
  }, [])
  useEffect(() => {
    if (language !== gist.settings.locale) updateGist(language, 'settings', 'locale')
    console.log('useEffect 2')
  }, [language])

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
  //const raiseEvent = (type = null, data = null) => {}

  const MainMenu = () => (
    <ul className="aside-main-menu">
      {Object.keys(icons).map((link) => {
        return (
          <li key={link}>
            <a
              href={`#test`}
              onClick={() => setDisplay(link)}
              className={link === display ? 'active' : ''}
            >
              {icons[link]}
              <span className="text">{links[link]}</span>
            </a>
          </li>
        )
      })}
    </ul>
  )

  const languageButtons = () => (
    <p>
      {Object.keys(languages).map((lang) => {
        return (
          <Button
            key={lang}
            color="primary"
            size="large"
            variant="outlined"
            onClick={() => setLanguage(lang)}
            style={{ margin: '0 0.5rem 0.5rem 0' }}
            disabled={lang === language ? true : false}
          >
            {languages[lang]}
          </Button>
        )
      })}
    </p>
  )

  const styles = {
    unhide: {
      position: 'absolute',
      left: 0,
      top: 0
    }
  }

  let main = null
  let context = null
  let pattern
  switch (display) {
    case 'languages':
      main = (
        <>
          <h1>
            <FormattedMessage id="account.languageTitle" />
          </h1>
          {languageButtons()}
        </>
      )
      context = (
        <ul>
          {Object.keys(languages).map((lang) => {
            return (
              <li key={lang}>
                <a href="#" onClick={() => setLanguage(lang)}>
                  {languages[lang]}
                </a>
              </li>
            )
          })}
        </ul>
      )
      break
    case 'draft':
      if (measurementsMissing()) setDisplay('measurements')
      pattern = new Pattern(gist.settings)
      pattern.draft()
      let patternProps = pattern.getRenderProps()
      main = (
        <DraftPattern
          freesewing={freesewing}
          Pattern={Pattern}
          patternProps={patternProps}
          config={config}
          gist={gist}
          updateGist={updateGist}
          raiseEvent={raiseEvent}
          units={units}
          svgExport={svgExport}
          setSvgExport={setSvgExport}
          theme={theme}
          viewBox={viewBox}
          focus={focus}
          design={design}
        />
      )
      context = (
        <DraftConfig
          freesewing={freesewing}
          Pattern={Pattern}
          patternProps={patternProps}
          config={config}
          gist={gist}
          updateGist={updateGist}
          raiseEvent={raiseEvent}
          units={units}
          svgExport={svgExport}
          setSvgExport={setSvgExport}
          theme={theme}
          viewBox={viewBox}
          setViewBox={setViewBox}
          setHideAside={setHideAside}
          focus={focus}
          setFocus={setFocus}
          design={design}
          setDesign={setDesign}
          pattern={pattern}
        />
      )
      break
    case 'sample':
      if (measurementsMissing()) setDisplay('measurements')
      pattern = new Pattern(gist.settings).use(svgattrPlugin, {
        class: 'freesewing draft'
      })
      try {
        pattern.sample()
      } catch (err) {
        console.log(err)
      }
      main = <div dangerouslySetInnerHTML={{ __html: pattern.render() }} />
      context = (
        <SampleConfigurator
          config={config}
          gist={gist}
          updateGist={updateGist}
          raiseEvent={raiseEvent}
          freesewing={freesewing}
          units={units || 'metric'}
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
    case 'xport':
      main = (
        <Xport
          freesewing={freesewing}
          Pattern={Pattern}
          config={config}
          gist={gist}
          units={units}
          theme={theme}
        />
      )
      break
    case 'json':
      main = <Json gist={gist} />
      break
    default:
      main = (
        <>
          <Welcome language={language} setDisplay={setDisplay} />
          <div style={{ margin: 'auto', textAlign: 'center' }}>{languageButtons()}</div>
        </>
      )
  }

  const themes = { dark, light }

  return (
    <MuiThemeProvider theme={createMuiTheme(themes[theme])}>
      <div
        className={
          theme === 'light' ? 'workbench theme-wrapper light' : 'workbench theme-wrapper dark'
        }
      >
        <Navbar
          display={display}
          setDisplay={setDisplay}
          toggleDarkMode={toggleDarkMode}
          config={config}
        />
        <div className="fs-sa" style={{ position: 'relative' }}>
          {hideAside ? (
            <a href="#" style={styles.unhide} onClick={() => setHideAside(false)}>
              <UnhideIcon />
            </a>
          ) : (
            <aside>
              <div className="sticky">
                <MainMenu />
                <div className="aside-context">{context}</div>
              </div>
            </aside>
          )}
          <section>{main}</section>
        </div>
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
