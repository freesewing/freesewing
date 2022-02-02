import React from 'react'
import Zoombox from '../Zoombox'
import Design from '../Design'
import DraftConfigurator from '../../DraftConfigurator'
import DesignIcon from '@material-ui/icons/Fingerprint'
import DumpIcon from '@material-ui/icons/LocalSee'
import ClearIcon from '@material-ui/icons/HighlightOff'
import AdvancedIcon from '@material-ui/icons/Policy'
import PaperlessIcon from '@material-ui/icons/Nature'
import CompleteIcon from '@material-ui/icons/Style'
import { FormattedMessage } from 'react-intl'
import ActionsIcon from '@material-ui/icons/PlayCircleOutline'
import Switch from '@material-ui/core/Switch';

const DraftPattern = (props) => {

  let focusCount = 0
  if (props.focus !== null) {
    for (let p of Object.keys(props.focus)) {
      for (let i in props.focus[p].points) focusCount++
      for (let i in props.focus[p].paths) focusCount++
      for (let i in props.focus[p].coords) focusCount++
    }
  }

  return (
    <ul id='draft-config'>
      <li>
        <span title='Actions'>
          <ActionsIcon />
          <FormattedMessage id="app.actions" />
        </span>
        <ul className="config level-1">
          <li className={`action toggle ${props.design ? 'on' : 'off'}`}>
            <span onClick={() => props.setDesign(!props.design)} title='Toggle design mode'>
              <DesignIcon />
              <FormattedMessage
                id={ props.design ? 'cfp.thingIsEnabled' : 'cfp.thingIsDisabled' }
                values={{ thing: <FormattedMessage id='cfp.designMode' /> }}
              />
              <Switch
                color="primary"
                name="design"
                checked={props.design}
                onChange={() => props.setDesign(!props.design)}
              />
            </span>
          </li>
          <li className={`action toggle ${props.gist.settings.advanced ? 'on' : 'off'}`}>
            <span onClick={() => props.updateGist(!props.gist.settings.advanced, 'settings', 'advanced')} title='Toggle advanced settings'>
              <AdvancedIcon />
              <FormattedMessage
                id={ props.gist.settings.advanced ? 'cfp.thingIsEnabled' : 'cfp.thingIsDisabled' }
                values={{ thing: <FormattedMessage id='settings.advanced.title' /> }}
              />
              <Switch
                color="primary"
                name="advanced"
                checked={props.gist.settings.advanced || false}
                onClick={() => props.updateGist(!props.gist.settings.advanced, 'settings', 'advanced')}
              />
            </span>
          </li>
          <li className={`action toggle ${props.gist.settings.paperless ? 'on' : 'off'}`}>
            <span onClick={() => props.updateGist(!props.gist.settings.paperless, 'settings', 'paperless')} title='Toggle paperless'>
              <PaperlessIcon />
              <FormattedMessage
                id={ props.gist.settings.paperless ? 'cfp.thingIsEnabled' : 'cfp.thingIsDisabled' }
                values={{ thing: <FormattedMessage id='settings.paperless.title' /> }}
              />
              <Switch
                color="primary"
                name="paperless"
                checked={props.gist.settings.paperless}
                onChange={() => props.updateGist(!props.gist.settings.paperless, 'settings', 'paperless')}
              />
            </span>
          </li>
          <li className={`action toggle ${props.gist.settings.complete ? 'on' : 'off'}`}>
            <span onClick={() => props.updateGist(!props.gist.settings.complete, 'settings', 'complete')} title='Toggle complete'>
              <CompleteIcon />
              <FormattedMessage
                id={ props.gist.settings.complete ? 'cfp.thingIsEnabled' : 'cfp.thingIsDisabled' }
                values={{ thing: <FormattedMessage id='settings.complete.title' /> }}
              />
              <Switch
                color="primary"
                name="complete"
                checked={props.gist.settings.complete}
                onChange={() => props.updateGist(!props.gist.settings.complete, 'settings', 'complete')}
              />
            </span>
          </li>
          <li className="action">
            <span onClick={() => console.log(props.pattern)} title='Log pattern object to console'>
              <DumpIcon color="primary" />
              console.log(pattern)
            </span>
          </li>
          {props.design && (
            <li className="action">
              <span onClick={() => props.raiseEvent('clearFocusAll', null)} title='Clear design mode'>
                <ClearIcon color="primary" />
                <FormattedMessage id="cfp.clearDesignMode" />
              </span>
            </li>
          )}
        </ul>
      </li>
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
        pattern={props.pattern}
        units={props.units || 'metric'}
      />
      <li className='zoombox'>
        <Zoombox patternProps={props.patternProps} setViewBox={props.setViewBox} />
      </li>
    </ul>
  )
}

export default DraftPattern
