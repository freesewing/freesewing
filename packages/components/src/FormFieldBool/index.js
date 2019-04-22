import React, { useState } from "react";
import PropTypes from "prop-types";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const Bool = props => {
  const [value, setValue] = useState(props.dflt);
  const toggle = () => {
    props.updateValue(props.name, !value);
    setValue(!value);
  };
  // Force state update when rerendering due to props change
  if (props.value !== value) setValue(props.value);

  return (
    <RadioGroup onChange={toggle} value={JSON.stringify(value)}>
      <FormControlLabel
        control={<Radio color="primary" />}
        value="false"
        checked={value === "false" ? true : false}
        label={props.labels[0]}
        className="po-list-item"
      />
      <FormControlLabel
        control={<Radio color="primary" />}
        value="true"
        checked={value === "true" ? true : false}
        label={props.labels[1]}
        className="po-list-item"
      />
    </RadioGroup>
  );
};

Bool.propTypes = {
  dflt: PropTypes.bool,
  labels: PropTypes.arrayOf(PropTypes.string),
  updateValue: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

Bool.defaultProps = {
  dflt: false,
  labels: ["false", "true"]
};

export default Bool;
