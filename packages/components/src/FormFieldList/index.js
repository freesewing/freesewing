import React, { useState } from "react";
import PropTypes from "prop-types";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const FormFieldList = props => {
  const [value, setValue] = useState(props.dflt);
  const update = evt => {
    props.updateOption(props.name, evt.target.value);
    setValue(evt.target.value);
  };
  return (
    <RadioGroup onChange={update} value={value}>
      {Object.keys(props.list).map((item, index) => (
        <FormControlLabel
          key={item}
          control={<Radio color="primary" />}
          value={item}
          checked={value === item ? true : false}
          label={props.list[item]}
        />
      ))}
    </RadioGroup>
  );
};

FormFieldList.propTypes = {
  dflt: PropTypes.bool,
  list: PropTypes.object,
  updateOption: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default FormFieldList;
