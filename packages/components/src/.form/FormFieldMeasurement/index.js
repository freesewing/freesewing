import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import InvalidIcon from '@material-ui/icons/Warning'
import InputAdornment from '@material-ui/core/InputAdornment'
import roundMm from '@freesewing/utils/roundMm'
import { injectIntl } from 'react-intl'

const FormFieldMeasurement = (props) => {
  let [value, setValue] = useState(roundMm(props.value / 10))
  useEffect(() => {
    if (!isNaN(props.value)) setValue(roundMm(props.value / 10))
  }, [props.value])

  const update = (evt) => {
    setValue(evt.target.value)
    if (evt.target.value.slice(-1) !== '.') {
      props.updateValue(props.name, evt.target.value * 10)
    }
  }

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
                {props.units === 'imperial' ? '"' : 'cm'}
              </IconButton>
            )}
          </InputAdornment>
        )
      }}
    />
  )
}

export default injectIntl(FormFieldMeasurement)
