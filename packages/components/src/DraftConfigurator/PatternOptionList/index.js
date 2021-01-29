import React, { useState } from 'react'
import FormFieldList from '../../.form/FormFieldList'
import OptionPreamble from '../OptionPreamble'

const PatternOptionList = (props) => {
  const [value, setValue] = useState(props.dflt)
  const [expanded, setExpanded] = useState(false)

  const update = (name, newValue, evt) => {
    props.updateValue(props.name, newValue)
    setValue(newValue)
  }

  const reset = () => {
    setValue(props.dflt)
    props.updateValue(props.name, props.dflt)
  }

  const patternReset = () => {
    setValue(props.designDflt)
    props.updateValue(props.name, props.designDflt)
  }

  const toggleExpanded = () => setExpanded(!expanded)

  // Add translations
  let stringKey = `options.${props.pattern}.${props.name}.options.`
  let list = {}
  for (let item of props.list)
    list[item] = props.intl.formatMessage({
      id: stringKey + item,
      defaultMessage: item
    })
  let option = (
    <FormFieldList
      name={props.name}
      value={value}
      dflt={props.dflt}
      designDflt={props.designDflt}
      onChange={update}
      label={'po-list-' + props.name}
      updateValue={update}
      list={list}
    />
  )
  return (
    <li className={expanded ? 'expanded' : 'collapsed'}>
      <OptionPreamble
        dflt={props.dflt}
        value={value}
        desc={props.desc}
        title={props.title}
        id={'po-list-' + props.name}
        displayValue={list[value]}
        reset={reset}
        patternReset={patternReset}
        toggleExpanded={toggleExpanded}
        expanded={expanded}
        showHelp={() =>
          props.raiseEvent('showHelp', {
            type: 'patternOption',
            value: props.name
          })
        }
        option={option}
        noDocs={props.noDocs}
      />
    </li>
  )
}

export default PatternOptionList
