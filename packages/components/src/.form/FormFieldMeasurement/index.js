import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import InvalidIcon from '@material-ui/icons/Warning'
import InputAdornment from '@material-ui/core/InputAdornment'
import roundMm from '@freesewing/utils/roundMm'
import isDegMeasurement from '@freesewing/utils/isDegMeasurement'
import { injectIntl } from 'react-intl'

const FormFieldMeasurement = (props) => {
  const initialValue = (name, val) => (isDegMeasurement(name) ? val : roundMm(val / 10))

  const [value, setValue] = useState(initialValue(props.name, props.value))
  useEffect(() => {
    if (!isNaN(props.value))
      setValue(isDegMeasurement(props.name) ? props.value : roundMm(props.value / 10))
  }, [props.value])

  const update = (evt) => {
    setValue(evt.target.value)
    if (evt.target.value.slice(-1) !== '.') {
      props.updateValue(props.name, evt.target.value * (isDegMeasurement(props.name) ? 1 : 10))
    }
  }

  const suffix = (name) => (isDegMeasurement(name) ? '°' : props.units === 'imperial' ? '"' : 'cm')

  return (
    <TextField
      id={props.name}
      fullWidth={true}
      label={props.intl.formatMessage({ id: props.label })}
      margin="normal"
      variant="outlined"
      value={value}
      type="text"
      onChange={update}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {isNaN(props.value) ? (
              <InvalidIcon color="error" />
            ) : (
              <IconButton classes={{ label: 'color-success' }} size="small">
                {suffix(props.name)}
              </IconButton>
            )}
          </InputAdornment>
        )
      }}
    />
  )
}

export default injectIntl(FormFieldMeasurement)
