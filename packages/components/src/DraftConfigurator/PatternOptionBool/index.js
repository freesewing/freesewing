import React, { useState } from 'react'
import FormFieldBool from '../../.form/FormFieldBool'
import OptionPreamble from '../OptionPreamble'

const PatternOptionBool = (props) => {
  const [value, setValue] = useState(props.value === null ? props.dflt : props.value)
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

  let option = (
    <FormFieldBool
      name={props.name}
      value={value}
      dflt={props.dflt}
      onChange={update}
      label={'po-bool-' + props.name}
      updateValue={update}
      labels={props.labels}
    />
  )
  return (
    <li className={expanded ? 'expanded' : 'collapsed'}>
      <OptionPreamble
        dflt={props.dflt}
        designDflt={props.designDflt}
        value={value}
        desc={props.desc}
        title={props.title}
        id={'po-list-' + props.name}
        displayValue={value ? props.labels[1] : props.labels[0]}
        toggleExpanded={toggleExpanded}
        expanded={expanded}
        reset={reset}
        patternReset={patternReset}
        showHelp={() =>
          props.raiseEvent('showHelp', {
            type: 'draftSetting',
            value: props.name
          })
        }
        option={option}
        noDocs={props.noDocs}
      />
    </li>
  )
}

export default PatternOptionBool
