import React from 'react'
import { FormattedMessage } from 'react-intl'
import { injectIntl } from 'react-intl'

const OptionGroup = (props) => {
  return (
    <React.Fragment>
      {props.options.map((name) => {
        let output = []
        if (typeof name === 'object') {
          // Subgroup
          for (let subGroup of Object.keys(name)) {
            output.push(
              <h5 key={subGroup + '-title'}>
                <FormattedMessage id={'optiongroups.' + subGroup} />
              </h5>
            )
            let children = []
            for (let option of name[subGroup])
              children.push(
                <li>
                  <a
                    href="#logo"
                    onClick={() => props.sampleOption(option)}
                    className={props.activeOption === option ? 'active' : ''}
                  >
                    <FormattedMessage
                      id={'options.' + props.config.name + '.' + option + '.title'}
                    />
                  </a>
                </li>
              )
            output.push(<ul style={{ paddingLeft: '1rem' }}>{children}</ul>)
          }
        } else
          output.push(
            <li>
              <a
                href="#logo"
                onClick={() => props.sampleOption(name)}
                className={props.activeOption === name ? 'active' : ''}
              >
                <FormattedMessage id={'options.' + props.config.name + '.' + name + '.title'} />
              </a>
            </li>
          )

        return output
      })}
    </React.Fragment>
  )
}

export default injectIntl(OptionGroup)
