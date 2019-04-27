import React, { useState } from "react";
import PropTypes from "prop-types";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const FormFieldChecks = props => {
  const [value, setValue] = useState(props.dflt);

  const toggle = part => {
    let parts = value.slice(0);
    let index = parts.indexOf(part);
    if (index === -1) parts.push(part);
    else parts.splice(index, 1);
    setValue(parts);
    props.updateValue(props.name, parts);
  };

  // Force state update when rerendering due to props change
  // if (props.value !== value) setValue(props.value);

  return (
    <FormGroup>
      {Object.keys(props.checks).map(i => {
        let check = props.checks[i];
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
        );
      })}
    </FormGroup>
  );
};

FormFieldChecks.propTypes = {
  dflt: PropTypes.array,
  checks: PropTypes.object,
  updateValue: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default FormFieldChecks;
