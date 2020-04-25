import React, { useState, useEffect } from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const Bool = ({ dflt = false, labels = ['false', 'true'], value, name, updateValue }) => {
  const [val, setVal] = useState(dflt)
  useEffect(() => {
    if (value !== val) setVal(value)
  }, [value])
  const toggle = () => {
    updateValue(name, !val)
    setVal(!val)
  }

  return (
    <RadioGroup onChange={toggle} value={JSON.stringify(val)}>
      <FormControlLabel
        control={<Radio color="primary" />}
        value="false"
        checked={val === 'true' || val === true || val === 1 ? false : true}
        label={labels[0]}
        className="po-list-item"
      />
      <FormControlLabel
        control={<Radio color="primary" />}
        value="true"
        checked={val === 'true' || val === true || val === 1 ? true : false}
        label={labels[1]}
        className="po-list-item"
      />
    </RadioGroup>
  )
}

export default Bool
