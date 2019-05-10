import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InvalidIcon from "@material-ui/icons/Warning";
import InputAdornment from "@material-ui/core/InputAdornment";
import { measurementAsMm, formatMm } from "@freesewing/utils";
import { injectIntl } from "react-intl";

const FormFieldMeasurement = props => {
  const update = evt => {
    props.updateValue(
      props.name,
      measurementAsMm(evt.target.value, props.units)
    );
  };

  return (
    <TextField
      id={props.name}
      fullWidth={true}
      label={props.intl.formatMessage({ id: props.label })}
      margin="normal"
      variant="outlined"
      value={formatMm(props.value, props.units, "text")}
      type="text"
      onChange={update}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {measurementAsMm(props.value, props.units) === false ? (
              <InvalidIcon color="error" />
            ) : (
              <IconButton classes={{ label: "color-success" }} size="small">
                {props.units === "imperial" ? '"' : "cm"}
              </IconButton>
            )}
          </InputAdornment>
        )
      }}
    />
  );
};

FormFieldMeasurement.propTypes = {
  updateValue: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  units: PropTypes.oneOf(["metric", "imperial"])
};

FormFieldMeasurement.defaultProps = {};

export default injectIntl(FormFieldMeasurement);
