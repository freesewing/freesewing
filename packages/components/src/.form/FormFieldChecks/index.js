import React, { useState } from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

const FormFieldChecks = (props) => {
  const [value, setValue] = useState(props.dflt ? props.dflt : [])

  const toggle = (part) => {
    let parts = value.slice(0)
    let index = parts.indexOf(part)
    if (index === -1) parts.push(part)
    else parts.splice(index, 1)
    setValue(parts)
    props.updateValue(props.name, parts)
  }

  return (
    <FormGroup>
      {Object.keys(props.checks).map((i) => {
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={value.indexOf(i) === -1 ? false : true}
                onChange={() => toggle(i)}
                value={i}
              />
            }
            label={props.checks[i]}
            key={i}
            className="po-list-item"
          />
        )
      })}
    </FormGroup>
  )
}

export default FormFieldChecks
