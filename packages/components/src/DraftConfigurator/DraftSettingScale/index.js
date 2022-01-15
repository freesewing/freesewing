import React, { useState } from 'react'
import FormFieldSlider from '../../.form/FormFieldSlider'
import sliderStep from '@freesewing/utils/sliderStep'
import OptionPreamble from '../OptionPreamble'

const DraftSettingScale = (props) => {
  const [value, setValue] = useState(props.value === null ? props.dflt : props.value)
  const [expanded, setExpanded] = useState(false)

  const update = (name, newValue, evt) => {
    // Sometimes, when sliding, the rapid succession of updates
    // causes a weird timing issue to result in a value that is NaN.
    // If that's the case, just ignore this update and keep the
    // previous one instead
    if (!isNaN(newValue)) {
      setValue(newValue)
      if (evt.type !== 'mousemove') props.updateValue('scale', newValue)
    } else {
      props.updateValue('scale', value)
    }
  }

  const reset = () => {
    setValue(props.dflt)
    props.updateValue('scale', props.dflt)
  }

  const patternReset = () => {
    setValue(props.designDflt)
    props.updateValue('scale', props.designDflt)
  }

  const toggleExpanded = () => setExpanded(!expanded)

  let option = (
    <FormFieldSlider
      name="scale"
      value={value}
      dflt={props.dflt}
      label="po-slider-scale"
      updateValue={update}
      min={0.05}
      max={5}
      step={sliderStep[props.units]}
    />
  )

  return (
    <li>
      <OptionPreamble
        dflt={props.dflt}
        designDflt={props.designDflt}
        value={value}
        desc={props.desc}
        title={props.title}
        id="po-slider-scale"
        displayValue={value}
        displayFormat="html"
        reset={reset}
        patternReset={patternReset}
        toggleExpanded={toggleExpanded}
        expanded={expanded}
        showHelp={() =>
          props.raiseEvent('showHelp', {
            type: 'draftSetting',
            value: 'scale'
          })
        }
        option={option}
        noDocs={props.noDocs}
      />
    </li>
  )
}

export default DraftSettingScale
