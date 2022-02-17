import React from 'react'
import Pct from '../PatternOptionPercentage'
import Deg from '../PatternOptionDegree'
import Mm from '../PatternOptionMillimeter'
import Bool from '../PatternOptionBool'
import List from '../PatternOptionList'
import Count from '../PatternOptionCount'
import optionType from '@freesewing/utils/optionType'
import optionDefault from '@freesewing/utils/optionDefault'
import { FormattedMessage } from 'react-intl'
import { injectIntl } from 'react-intl'
import OptionSubGroup from '../OptionSubGroup'

const OptionGroup = (props) => {
  const renderOption = (name, sub = false) => {
    let option = props.config.options[name]
    let type = optionType(option)
    let stringKey = `options.${props.config.name}.${name}.`
    let extraProps = {
      name,
      dflt: optionDefault(name, props.config.options[name], props.pattern),
      designDflt: optionDefault(name, props.config.options[name]),
      units: props.units,
      updateValue: props.updateValue,
      raiseEvent: props.raiseEvent,
      title: <FormattedMessage id={stringKey + 'title'} />,
      desc: <FormattedMessage id={stringKey + 'description'} />,
      intl: props.intl,
      pattern: props.config.name,
      key: name,
      noDocs: props.noDocs
    }
    if (
      typeof props.data !== 'undefined' &&
      typeof props.data.settings !== 'undefined' &&
      typeof props.data.settings.options !== 'undefined' &&
      typeof props.data.settings.options[name] !== 'undefined'
    )
      extraProps.value = props.data.settings.options[name]
    else extraProps.value = null

    let noyes = [<FormattedMessage id="app.no" />, <FormattedMessage id="app.yes" />]
    switch (type) {
      case 'pct':
        return <Pct {...option} {...extraProps} />
        break
      case 'deg':
        return <Deg {...option} {...extraProps} />
        break
      case 'mm':
        return <Mm {...option} {...extraProps} units={props.units} />
        break
      case 'bool':
        return <Bool {...option} {...extraProps} labels={noyes} />
        break
      case 'list':
        return <List {...option} {...extraProps} />
        break
      case 'count':
        return <Count {...option} {...extraProps} />
        break
      default:
        throw new Error('Unsupported option type: ' + type)
    }
  }

  return (
    <>
      {props.options.map(nameOrGroup => {
        let output = []
        if (typeof nameOrGroup === 'object') {
          const group = nameOrGroup
          // Subgroup
          for (const subGroup in group) {
            let children = []
            for (const name of group[subGroup]) {
              const option = props.config.options[name]
              if (!props.pattern || !option.hide(props.pattern.settings.options)) {
                children.push(renderOption(name, true))
              }
            }
            output.push(
              <OptionSubGroup
                title={<FormattedMessage id={'optiongroups.' + subGroup} />}
                children={children}
                key={subGroup}
              />
            )
          }
        } else {
          const name = nameOrGroup
          const option = props.config.options[name]
          if (!props.pattern || !option.hide(props.pattern.settings.options)) {
            output.push(renderOption(name))
          }
        }

        return output
      })}
    </>
  )
}

export default injectIntl(OptionGroup)
