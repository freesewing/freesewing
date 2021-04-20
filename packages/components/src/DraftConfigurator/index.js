import React from 'react'
import { FormattedMessage } from 'react-intl'
import PatternOptions from './PatternOptions'
import DraftSettings from './DraftSettings'
import TuneIcon from '@material-ui/icons/Tune'
import WrenchIcon from '@material-ui/icons/Build'
import PlayIcon from '@material-ui/icons/PlayCircleOutline'

const DraftConfigurator = ({
  noDocs = false,
  units = 'metric',
  config = {},
  data = {},
  pattern,
  updatePatternData,
  raiseEvent,
  actions = false
}) => {
  let childProps = {
    noDocs,
    units,
    config,
    data,
    pattern,
    raiseEvent
  }
  return (
    <ul id="draft-config">
      {actions && (
        <li>
          <span>
            <PlayIcon />
            <FormattedMessage id="app.actions" />
          </span>
          <ul className="config level-1">{actions}</ul>
        </li>
      )}
      <li>
        <span>
          <TuneIcon />
          <FormattedMessage id="app.designOptions" />
        </span>
        <PatternOptions
          {...childProps}
          updateValue={(name, value) => updatePatternData(value, 'settings', 'options', name)}
        />
      </li>
      <li>
        <span>
          <WrenchIcon />
          <FormattedMessage id="app.patternOptions" />
        </span>
        <DraftSettings
          {...childProps}
          updateValue={(name, value) => updatePatternData(value, 'settings', name)}
        />
      </li>
    </ul>
  )
}

export default DraftConfigurator
