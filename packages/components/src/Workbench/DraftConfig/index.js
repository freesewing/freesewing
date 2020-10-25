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
import HideIcon from '@material-ui/icons/ChevronLeft'
import Events from './Events'

const DraftPattern = (props) => {
  const styles = {
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
  let focusCount = 0
  if (props.focus !== null) {
    for (let p of Object.keys(props.focus)) {
      for (let i in props.focus[p].points) focusCount++
      for (let i in props.focus[p].paths) focusCount++
      for (let i in props.focus[p].coords) focusCount++
    }
  }

  let iconProps = {
    size: 'small',
    style: styles.icon,
    color: 'inherit'
  }
  const color = (check) => (check ? '#40c057' : '#fa5252')

  return (
    <div>
      <div style={{ margin: '1rem auto 0', textAlign: 'center' }}>
        <IconButton onClick={() => props.setHideAside(true)} title="Hide sidebar" {...iconProps}>
          <HideIcon />
        </IconButton>
        <IconButton
          onClick={() => props.setDesign(!props.design)}
          title="Toggle design mode"
          {...iconProps}
        >
          <span style={{ color: color(props.design) }}>
            <DesignIcon />
          </span>
        </IconButton>
        {props.design && (
          <IconButton
            onClick={() => props.raiseEvent('clearFocusAll', null)}
            title="Clear design mode"
            {...iconProps}
          >
            <ClearIcon color="primary" />
          </IconButton>
        )}
        <IconButton
          onClick={() => console.log(props.pattern)}
          title="console.log(pattern)"
          {...iconProps}
        >
          <DumpIcon color="primary" />
        </IconButton>
        |
        <IconButton
          onClick={() => props.updateGist(!props.gist.settings.advanced, 'settings', 'advanced')}
          title="Toggle advanced settings"
          {...iconProps}
        >
          <span style={{ color: color(props.gist.settings.advanced) }}>
            <AdvancedIcon />
          </span>
        </IconButton>
        <IconButton
          onClick={() => props.updateGist(!props.gist.settings.paperless, 'settings', 'paperless')}
          title="Toggle paperless"
          {...iconProps}
        >
          <span style={{ color: color(props.gist.settings.paperless) }}>
            <PaperlessIcon />
          </span>
        </IconButton>
        <IconButton
          onClick={() => props.updateGist(!props.gist.settings.complete, 'settings', 'complete')}
          title="Toggle complete"
          {...iconProps}
        >
          <span style={{ color: color(props.gist.settings.complete) }}>
            <CompleteIcon />
          </span>
        </IconButton>
      </div>
      {props.design && (
        <Design
          focus={props.focus}
          design={props.design}
          raiseEvent={props.raiseEvent}
          parts={props.patternProps.parts}
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
      <div style={{ padding: '5px', marginTop: '1rem' }}>
        <Zoombox patternProps={props.patternProps} setViewBox={props.setViewBox} />
      </div>
    </div>
  )
}

export default DraftPattern
