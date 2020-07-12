import React, { useState } from 'react'
import sliderStep from '@freesewing/utils/sliderStep'
import roundMm from '@freesewing/utils/roundMm'
import roundMmUp from '@freesewing/utils/roundMmUp'
import roundMmDown from '@freesewing/utils/roundMmDown'
import formatMm from '@freesewing/utils/formatMm'
import FormFieldSlider from '../../.form/FormFieldSlider'
import OptionPreamble from '../OptionPreamble'

const PatternOptionMillimeter = ({
  title = false,
  desc = false,
  units = 'metric',
  min = 0,
  max = 100,
  updateValue,
  name,
  dflt,
  noDocs
}) => {
  const [val, setVal] = useState(dflt)
  const [previousValue, setPreviousValue] = useState(dflt)
  const [expanded, setExpanded] = useState(false)

  const update = (name, newValue, evt) => {
    newValue = roundMm(newValue, units)
    // Sometimes, when sliding, the rapid succession of updates
    // causes a weird timing issue to result in a value that is NaN.
    // If that's the case, just ignore this update and keep the
    // previous one instead
    if (!isNaN(newValue)) {
      setVal(newValue)
      if (evt.type !== 'mousemove') updateValue(name, newValue)
    } else {
      if (evt.type !== 'mousemove') updateValue(name, val)
    }
  }

  const reset = () => {
    setVal(dflt)
    updateValue(name, dflt)
  }

  const toggleExpanded = () => setExpanded(!expanded)

  let option = (
    <FormFieldSlider
      name={name}
      value={val}
      min={roundMmUp(min, units)}
      max={roundMmDown(max, units)}
      step={sliderStep[units]}
      onChange={update}
      label={'po-mm-' + name}
      updateValue={update}
    />
  )

  return (
    <li>
      <OptionPreamble
        dflt={dflt}
        value={val}
        desc={desc}
        title={title}
        id={'po-mm-' + name}
        displayValue={formatMm(val, units)}
        displayFormat="html"
        reset={reset}
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

export default PatternOptionMillimeter
