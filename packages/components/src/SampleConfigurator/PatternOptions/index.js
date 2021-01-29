import React from 'react'
import OptionGroup from '../OptionGroup'
import { FormattedMessage } from 'react-intl'

const PatternOptions = (props) => {
  const renderGroup = (group) => {
    let output = []
    let children = (
      <ul>
        <OptionGroup
          key={group + '-group'}
          units={props.units}
          config={props.config}
          options={props.config.optionGroups[group]}
          sampleOption={props.sampleOption}
          activeOption={props.activeOption}
        />
      </ul>
    )
    output.push(
      <li key={group + '-ghead'}>
        <h6>
          <FormattedMessage id={'optiongroups.' + group} />
        </h6>
        {children}
      </li>
    )

    return output
  }

  return <ul>{Object.keys(props.config.optionGroups).map((group) => renderGroup(group))}</ul>
}

export default PatternOptions
