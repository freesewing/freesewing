import React from 'react'
import { FormattedMessage } from 'react-intl'
import PatternOptions from './PatternOptions'
import DraftSettings from './DraftSettings'

const DraftConfigurator = ({
  noDocs = false,
  units = 'metric',
  config = {},
  data = {},
  pattern,
  updatePatternData,
  raiseEvent
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
    <ul className="config l1">
      <li>
        <span>
          <FormattedMessage id="app.designOptions" />
        </span>
        <PatternOptions
          {...childProps}
          updateValue={(name, value) => updatePatternData(value, 'settings', 'options', name)}
        />
      </li>
      <li>
        <span>
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
