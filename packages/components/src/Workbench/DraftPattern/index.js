import React, { useState } from 'react'
import Draft from '../../Draft'
import Zoombox from '../Zoombox'
import Design from '../Design'
import DraftConfigurator from '../../DraftConfigurator'
import fileSaver from 'file-saver'
import theme from '@freesewing/plugin-theme'
import IconButton from '@material-ui/core/IconButton'
import DesignIcon from '@material-ui/icons/Fingerprint'
import DumpIcon from '@material-ui/icons/LocalSee'
import ClearIcon from '@material-ui/icons/HighlightOff'
import AdvancedIcon from '@material-ui/icons/Policy'
import PaperlessIcon from '@material-ui/icons/Nature'
import CompleteIcon from '@material-ui/icons/Style'
import UnhideIcon from '@material-ui/icons/ChevronLeft'
import HideIcon from '@material-ui/icons/ChevronRight'
import Events from './Events'

const DraftPattern = (props) => {
  const [design, setDesign] = useState(true)
  const [focus, setFocus] = useState(null)
  const [viewBox, setViewBox] = useState(false)
  const [hideAside, setHideAside] = useState(false)

  const raiseEvent = (type, data) => {
    if (type === 'clearFocusAll') {
      props.updateGist(false, 'settings', 'only')
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
    } else if (type === 'part') props.updateGist(data, 'settings', 'only')

    setFocus(f)
  }

  const svgToFile = (svg) => {
    const blob = new Blob([svg], {
      type: 'image/svg+xml;charset=utf-8'
    })
    fileSaver.saveAs(blob, 'freesewing-' + props.config.name + '.svg')
  }

  if (props.svgExport) {
    svgToFile(
      new props.Pattern({
        ...props.gist.settings,
        embed: false
      })
        .use(theme)
        .draft()
        .render()
    )
    props.setSvgExport(false)
  }

  const styles = {
    paragraph: {
      padding: '0 1rem'
    },
    aside: {
      maxWidth: '350px',
      background: 'transparent',
      border: 0,
      fontSize: '90%',
      boxShadow: '0 0 1px #cccc',
      display: hideAside ? 'none' : 'block'
    },
    icon: {
      margin: '0 0.25rem'
    },
    unhide: {
      position: 'absolute',
      top: '76px',
      right: 0,
      background: props.theme === 'dark' ? '#f8f9fa' : '#212529',
      borderTopLeftRadius: '50%',
      borderBottomLeftRadius: '50%',
      width: '26px',
      height: '30px'
    }
  }
  let pattern = new props.Pattern(props.gist.settings)
  pattern.draft()
  let patternProps = pattern.getRenderProps()
  let focusCount = 0
  if (focus !== null) {
    for (let p of Object.keys(focus)) {
      for (let i in focus[p].points) focusCount++
      for (let i in focus[p].paths) focusCount++
      for (let i in focus[p].coords) focusCount++
    }
  }

  let iconProps = {
    size: 'small',
    style: styles.icon,
    color: 'inherit'
  }
  const color = (check) => (check ? '#40c057' : '#fa5252')

  return (
    <div className="fs-sa">
      <section>
        <Draft
          {...patternProps}
          design={design}
          focus={focus}
          raiseEvent={raiseEvent}
          viewBox={viewBox}
          className="freesewing draft shadow"
        />
        <Events events={patternProps.events} />
        {hideAside && (
          <div style={styles.unhide}>
            <IconButton
              onClick={() => setHideAside(false)}
              title="Show sidebar"
              {...iconProps}
              style={{ margin: 0 }}
            >
              <span style={{ color: props.theme === 'dark' ? '#212529' : '#f8f9fa' }}>
                <UnhideIcon />
              </span>
            </IconButton>
          </div>
        )}
      </section>

      <aside style={styles.aside}>
        <div className="sticky">
          <div style={{ padding: '5px' }}>
            <Zoombox patternProps={patternProps} setViewBox={setViewBox} />
          </div>
          <div style={{ margin: '1rem auto 0', textAlign: 'center' }}>
            <IconButton
              onClick={() => setDesign(!design)}
              title="Toggle design mode"
              {...iconProps}
            >
              <span style={{ color: color(design) }}>
                <DesignIcon />
              </span>
            </IconButton>
            {design && (
              <IconButton
                onClick={() => raiseEvent('clearFocusAll', null)}
                title="Clear design mode"
                {...iconProps}
              >
                <ClearIcon color="primary" />
              </IconButton>
            )}
            <IconButton
              onClick={() => console.log(pattern)}
              title="console.log(pattern)"
              {...iconProps}
            >
              <DumpIcon color="primary" />
            </IconButton>
            |
            <IconButton
              onClick={() =>
                props.updateGist(!props.gist.settings.advanced, 'settings', 'advanced')
              }
              title="Toggle advanced settings"
              {...iconProps}
            >
              <span style={{ color: color(props.gist.settings.advanced) }}>
                <AdvancedIcon />
              </span>
            </IconButton>
            <IconButton
              onClick={() =>
                props.updateGist(!props.gist.settings.paperless, 'settings', 'paperless')
              }
              title="Toggle paperless"
              {...iconProps}
            >
              <span style={{ color: color(props.gist.settings.paperless) }}>
                <PaperlessIcon />
              </span>
            </IconButton>
            <IconButton
              onClick={() =>
                props.updateGist(!props.gist.settings.complete, 'settings', 'complete')
              }
              title="Toggle complete"
              {...iconProps}
            >
              <span style={{ color: color(props.gist.settings.complete) }}>
                <CompleteIcon />
              </span>
            </IconButton>
            <IconButton onClick={() => setHideAside(true)} title="Hide sidebar" {...iconProps}>
              <HideIcon />
            </IconButton>
          </div>
          {design && (
            <Design
              focus={focus}
              design={design}
              raiseEvent={raiseEvent}
              parts={patternProps.parts}
            />
          )}
          <DraftConfigurator
            noDocs
            config={props.config}
            data={props.gist}
            updatePatternData={props.updateGist}
            raiseEvent={props.raiseEvent}
            freesewing={props.freesewing}
            units={props.units || 'metric'}
          />
        </div>
      </aside>
    </div>
  )
}

export default DraftPattern
