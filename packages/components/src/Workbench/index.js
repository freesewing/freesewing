import React, { useState, useEffect } from 'react'
import withGist from '../withGist'
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles'
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
import { FormattedMessage } from 'react-intl'
import { languages } from '@freesewing/i18n'
import Button from '@material-ui/core/Button'
import UnhideIcon from '@material-ui/icons/ChevronRight'
import SampleConfigurator from '../SampleConfigurator'
import svgattrPlugin from '@freesewing/plugin-svgattr'
import Xport from './Export'
import axios from 'axios'
import yaml from 'yaml'
import Footer from './Footer'
import sass from './style.scss'

const extraTranslations = {}

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
  addTranslations,
  recreate = false,
}) => {

  if (translations) {
    for (let key in translations) extraTranslations[key] = translations[key]
  }

  const [display, setDisplay] = useState(null)
  const [theme, setTheme] = useState('light')
  const [measurements, setMeasurements] = useState(null)
  const [svgExport, setSvgExport] = useState(false)
  const [viewBox, setViewBox] = useState(false)
  const [hideAside, setHideAside] = useState(false)
  const [design, setDesign] = useState(true)
  const [focus, setFocus] = useState(null)
  const [error, setError] = useState(null)

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

  // Enable debug in Workbench
  defaultGist.settings.debug = true

  useEffect(() => {
    if (recreate) {
      // Recreating from existing pattern config
      axios
        .get(`https://api.github.com/gists/${recreate.id}`)
        .then((res) => {
          if (res.data.files['pattern.yaml'].content) {
            let g = yaml.parse(res.data.files['pattern.yaml'].content)
            if (g.design !== Pattern.config.name) {
              setError(
                `You tried loading a configuration for ${g.design} into a ${Pattern.config.name} development environment`
              )
              setDisplay('error')
            }
            setMeasurements(g.settings.measurements)
            updateGist(g.settings, 'settings')
            setLanguage(g.settings.locale)
          } else {
            setError('This gist does not seem to be a valid pattern configuration')
            setDisplay('error')
          }
        })
        .catch((err) => {
          setError(err)
          setDisplay('error')
        })
    } else {
      let m = getMeasurements()
      setMeasurements(m)
      updateGist(m, 'settings', 'measurements')
      setLanguage(userLanguage)
    }
    if (translations) addTranslations(translations)
  }, [])
  useEffect(() => {
    if (language !== gist.settings.locale) updateGist(language, 'settings', 'locale')
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
      if (typeof measurements[m] === 'undefined') {
        console.log('measurement missing', m.measurements)
        return true
      }
    }

    return false
  }
  const toggleDarkMode = () => {
    if (theme === 'light') setTheme('dark')
    else setTheme('light')
  }
  //const raiseEvent = (type = null, data = null) => {}

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
  let preMenu = null
  let pattern
  switch (display) {
    case 'languages':
      main = (
        <div style={{textAlign: 'center'}}>
          <h1>
            <FormattedMessage id="account.languageTitle" />
          </h1>
          {languageButtons()}
        </div>
      )
      break
    case 'draft':
      if (measurementsMissing()) {
        setDisplay('measurements')
        break
      }
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
      preMenu = (
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
      if (measurementsMissing()) {
        setDisplay('measurements')
        break
      }
      preMenu = (
        <SampleConfigurator
          config={config}
          gist={gist}
          updateGist={updateGist}
          raiseEvent={raiseEvent}
          freesewing={freesewing}
          units={units || 'metric'}
        />
      )
      if (!gist.settings.sample) main = null
      else {
        pattern = new Pattern({
          ...gist.settings,
          embed: true
        }).use(svgattrPlugin, {
          class: 'freesewing draft'
        })
        try {
          pattern.sample()
        } catch (err) {
          console.log(err)
        }
        main = <div dangerouslySetInnerHTML={{ __html: pattern.render() }} />
      }
      break
    case 'measurements':
      main = (
        <Measurements
          measurements={measurements}
          required={config.measurements}
          optional={config.optionalMeasurements}
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
          <div style={{textAlign: 'center'}}>{languageButtons()}</div>
        </>
      )
  }

  const themes = { dark, light }

  return (
    <MuiThemeProvider theme={createTheme(themes[theme])}>
      <style>
        {`:root { --freesewing-pattern-scale: ${gist.settings.scale || 1}px; }`}
        {sass}
      </style>
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
          theme={theme}
          language={language}
        />
        {(['draft', 'sample'].indexOf(display) !== -1)
          ? (
            <div className="layout-wrapper">
              <div className="layout">
                {hideAside ? (
                  <a href="#" style={styles.unhide} onClick={() => setHideAside(false)}>
                    <UnhideIcon />
                  </a>
                ) : (
                  <aside>
                    <div className="sticky">
                      {preMenu}
                    </div>
                  </aside>
                )}
                <section>{main}</section>
              </div>
            </div>
          ) : <div className='fill'><div className='inner'>{main}</div></div> }
        <Footer />
      </div>
    </MuiThemeProvider>
  )
}

export default withLanguage(
  withGist(Workbench, {
    gist: defaultGist,
    store: true
  }),
  'en', false, extraTranslations
)
