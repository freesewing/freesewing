import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";
import FormFieldMeasurement from "../../.form/FormFieldMeasurement";
import models from "@freesewing/models";

const Measurements = props => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      minHeight: "70vh"
    },
    chooser: {
      width: "100%",
      maxWidth: "500px",
      margin: "auto",
      alignSelf: "center"
    }
  };

  const getValue = m => {
    if (props.measurements === null) return "";
    if (typeof props.measurements[m] === "undefined") return "";
    return props.measurements[m];
  };

  if (props.required.length < 1)
    return (
      <div style={styles.container}>
        <div style={styles.chooser}>
          <h2>
            <FormattedMessage id="app.requiredMeasurements" />
          </h2>
          <h3>
            <FormattedMessage id="cfp.noRequiredMeasurements" />
          </h3>
          <p>
            <FormattedHTMLMessage id="cfp.howtoAddMeasurements" />
          </p>
          <p>
            <FormattedMessage id="cfp.seeDocsAt" />
            &nbsp;
            <a
              href={
                "https://" + props.language + "/.freesewing.dev/core/config"
              }
            >
              {props.language}.freesewing.dev/core/config
            </a>
          </p>
        </div>
      </div>
    );
  return (
    <div style={styles.container}>
      <div style={styles.chooser}>
        <h2>
          <FormattedMessage id="app.requiredMeasurements" />
        </h2>
        <p>
          <FormattedMessage id="cfp.youCan" />
        </p>
        <ul>
          <li>
            <a href="#manual">
              <FormattedMessage id="cfp.enterMeasurements" />
            </a>
          </li>
          <li>
            <a href="#preload">
              <FormattedMessage id="cfp.preloadMeasurements" />
            </a>
          </li>
        </ul>
        <h3 id="manual">
          <FormattedMessage id="cfp.enterMeasurements" />
        </h3>
        {props.required.map(m => (
          <FormFieldMeasurement
            key={m}
            name={m}
            units={props.units}
            value={getValue(m)}
            label={"measurements." + m}
            updateValue={props.updateMeasurement}
          />
        ))}
        <h3 id="preload">
          <FormattedMessage id="cfp.preloadMeasurements" />
        </h3>
        <h4>
          <FormattedMessage id="app.withoutBreasts" />
        </h4>
        <ul>
          {Object.keys(models).map(m => (
            <li key={m}>
              <Button onClick={() => props.preloadMeasurements(models[m])}>
                <FormattedMessage id="cfp.size" />
                &nbsp;
                {m.slice(-2)}
              </Button>
            </li>
          ))}
        </ul>
        <h4>
          <FormattedMessage id="app.withBreasts" />
        </h4>
        <p>FIXME</p>
      </div>
    </div>
  );
};

Measurements.propTypes = {
  measuremnents: PropTypes.object.isRequired,
  required: PropTypes.array.isRequired,
  units: PropTypes.oneOf(["metric", "imperial"]),
  updateMeasurement: PropTypes.func.isRequired,
  preloadMeasurements: PropTypes.func.isRequired
};

export default Measurements;
