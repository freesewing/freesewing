import React, { useState } from 'react'
import FormFieldSlider from '../../.form/FormFieldSlider'
import OptionPreamble from '../OptionPreamble'

const PatternOptionPctDegCount = ({
  min = 0,
  max = 100,
  step = 0.1,
  type = 'pct',
  updateValue,
  name,
  dflt,
  designDflt,
  title,
  desc,
  value,
  raiseEvent,
  noDocs
}) => {
  let factor = 1
  if (type === 'pct') factor = 100
  const round = (val) => Math.round(val * 10) / 10
  const [val, setVal] = useState(value === null ? dflt : round(value * factor))
  const [previousValue, setPreviousValue] = useState(value === null ? dflt : round(value * factor))
  const [expanded, setExpanded] = useState(false)

  const update = (name, newValue, evt) => {
    newValue = round(newValue)
    // Sometimes, when sliding, the rapid succession of updates
    // causes a weird timing issue to result in a value that is NaN.
    // If that's the case, just ignore this update and keep the
    // previous one instead
    if (!isNaN(newValue)) {
      setVal(newValue)
      if (evt.type !== 'mousemove') updateValue(name, newValue / factor)
    } else {
      if (evt.type !== 'mousemove') updateValue(name, value / factor)
    }
  }

  const reset = () => {
    setVal(dflt)
    updateValue(name, dflt / factor)
  }

  const patternReset = () => {
    setVal(designDflt)
    updateValue(name, designDflt / factor)
  }

  const toggleExpanded = () => setExpanded(!expanded)

  let unit = ''
  if (type === 'pct') unit = '%'
  if (type === 'deg') unit = '°'

  let option = (
    <FormFieldSlider
      name={name}
      value={val}
      min={min}
      max={max}
      step={type === 'count' ? 1 : step}
      onChange={update}
      label={'po-' + type + '-' + name}
      updateValue={update}
    />
  )

  return (
    <li className={expanded ? 'expanded' : 'collapsed'}>
      <OptionPreamble
        dflt={dflt}
        designDflt={designDflt}
        value={val}
        desc={desc}
        title={title}
        id={'po-' + type + '-' + name}
        displayValue={val + unit}
        reset={reset}
        patternReset={patternReset}
        toggleExpanded={toggleExpanded}
        expanded={expanded}
        showHelp={() =>
          raiseEvent('showHelp', {
            type: 'patternOption',
            value: name
          })
        }
        option={option}
        noDocs={noDocs}
      />
    </li>
  )
}

export default PatternOptionPctDegCount
