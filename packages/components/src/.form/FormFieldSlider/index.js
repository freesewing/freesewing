import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Slider from '@material-ui/core/Slider'
import { withStyles } from '@material-ui/core/styles'

const PaddedSlider = withStyles({
  container: {
    padding: '25px 0'
  },
  track: { height: '4px' },
  thumb: { width: '16px', height: '16px' }
})(Slider)

const FormFieldSlider = props => {
  const [value, setValue] = useState(props.value)
  useEffect(() => {
    if (props.value !== value) setValue(props.value)
  }, [props.value])

  const update = (evt, newValue) => {
    props.updateValue(props.name, newValue, evt)
    setValue(newValue)
  }

  return (
    <PaddedSlider
      value={value}
      min={props.min}
      max={props.max}
      step={props.step}
      onChange={update}
      onChangeCommitted={update}
      classes={{
        track: 'slider-track',
        thumb: 'slider-thumb'
      }}
      aria-labelledby={props.label}
    />
  )
}

FormFieldSlider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  updateValue: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([false])])
}

FormFieldSlider.defaultProps = {
  min: 0,
  max: 100,
  step: 0.1,
  label: false
}

export default FormFieldSlider
