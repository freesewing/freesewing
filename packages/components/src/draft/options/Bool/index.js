import React, { useState } from "react";
import PropTypes from "prop-types";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const Bool = props => {
  const [value, setValue] = useState(props.dflt);
  const toggle = () => {
    props.updateOption(props.name, !value);
    setValue(!value);
  };
  return (
    <RadioGroup onChange={toggle} value={JSON.stringify(value)}>
      <FormControlLabel
        control={<Radio color="primary" />}
        value="false"
        checked={value === "false" ? true : false}
        label={props.labels[0]}
      />
      <FormControlLabel
        control={<Radio color="primary" />}
        value="true"
        checked={value === "true" ? true : false}
        label={props.labels[1]}
      />
    </RadioGroup>
  );
};

Bool.propTypes = {
  dflt: PropTypes.bool,
  labels: PropTypes.arrayOf(PropTypes.string),
  updateOption: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

Bool.defaultProps = {
  dflt: false,
  labels: ["false", "true"]
};

export default Bool;
