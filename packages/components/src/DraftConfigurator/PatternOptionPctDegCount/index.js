import React, { useState } from 'react'
import PropTypes from 'prop-types'
import FormFieldSlider from '../../.form/FormFieldSlider'
import OptionPreamble from '../OptionPreamble'

const PatternOptionPctDegCount = props => {
  let factor = 1
  if (props.type === 'pct') factor = 100
  const round = val => Math.round(val * 10) / 10
  const [value, setValue] = useState(
    props.value === null ? props.dflt : round(props.value * factor)
  )
  const [previousValue, setPreviousValue] = useState(
    props.value === null ? props.dflt : round(props.value * factor)
  )
  const [expanded, setExpanded] = useState(false)

  const update = (name, newValue, evt) => {
    newValue = round(newValue)
    // Sometimes, when sliding, the rapid succession of updates
    // causes a weird timing issue to result in a value that is NaN.
    // If that's the case, just ignore this update and keep the
    // previous one instead
    if (!isNaN(newValue)) {
      setValue(newValue)
      if (evt.type !== 'mousemove') props.updateValue(props.name, newValue / factor)
    } else {
      if (evt.type !== 'mousemove') props.updateValue(props.name, value / factor)
    }
  }

  const reset = () => {
    setValue(props.dflt)
    props.updateValue(props.name, props.dflt / factor)
  }

  const patternReset = () => {
    setValue(props.patternDflt)
    props.updateValue(props.name, props.patternDflt / factor)
  }

  const toggleExpanded = () => setExpanded(!expanded)

  let unit = ''
  if (props.type === 'pct') unit = '%'
  if (props.type === 'deg') unit = '°'

  let option = (
    <FormFieldSlider
      name={props.name}
      value={value}
      min={props.min}
      max={props.max}
      step={props.type === 'count' ? 1 : props.step}
      onChange={update}
      label={'po-' + props.type + '-' + props.name}
      updateValue={update}
    />
  )

  return (
    <li>
      <OptionPreamble
        dflt={props.dflt}
        patternDflt={props.patternDflt}
        value={value}
        desc={props.desc}
        title={props.title}
        id={'po-' + props.type + '-' + props.name}
        displayValue={value + unit}
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

PatternOptionPctDegCount.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  updateValue: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  dflt: PropTypes.number.isRequired,
  title: PropTypes.node.isRequired,
  desc: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['pct', 'deg', 'count'])
}

PatternOptionPctDegCount.defaultProps = {
  min: 0,
  max: 100,
  step: 0.1,
  type: 'pct'
}

export default PatternOptionPctDegCount
