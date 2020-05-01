import React, { useState, useEffect } from 'react'
import Slider from '@material-ui/core/Slider'
import { withStyles } from '@material-ui/core/styles'

const PaddedSlider = withStyles({
  container: {
    padding: '25px 0'
  },
  track: { height: '4px' },
  thumb: { width: '16px', height: '16px' }
})(Slider)

const FormFieldSlider = ({
  min = 0,
  max = 100,
  step = 0.1,
  label = false,
  updateValue,
  name,
  value
}) => {
  const [val, setVal] = useState(value)
  useEffect(() => {
    if (value !== val) setVal(value)
  }, [value])

  const update = (evt, newValue) => {
    updateValue(name, newValue, evt)
    setVal(newValue)
  }

  return (
    <PaddedSlider
      value={val}
      min={min}
      max={max}
      step={step}
      onChange={update}
      onChangeCommitted={update}
      classes={{
        track: 'slider-track',
        thumb: 'slider-thumb'
      }}
      aria-labelledby={label}
    />
  )
}

export default FormFieldSlider
