import React, { useState } from "react";
import PropTypes from "prop-types";
import FormFieldSlider from "../FormFieldSlider";
import IconButton from "@material-ui/core/IconButton";
import ResetIcon from "@material-ui/icons/SettingsBackupRestore";
import HelpIcon from "@material-ui/icons/Help";

const PatternOptionPercentage = props => {
  const [value, setValue] = useState(props.dflt);
  const [previousValue, setPreviousValue] = useState(props.dflt);

  const round = val => Math.round(val * 10) / 10;

  const update = (name, newValue, evt) => {
    newValue = round(newValue);
    // Sometimes, when sliding, the rapid succession of updates
    // causes a weird timing issue to result in a value that is NaN.
    // If that's the case, just ignore this update and keep the
    // previous one instead
    if (!isNaN(newValue)) {
      setValue(newValue);
      if (evt.type !== "mousemove") props.updateOption(props.name, newValue);
    } else {
      if (evt.type !== "mousemove") props.updateOption(props.name, value);
    }
  };

  const reset = () => {
    setValue(props.dflt);
    props.updateOption(props.name, props.dflt);
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
    },
    left: {
      flexGrow: 1,
      margin: "0 0.5rem"
    },
    right: { margin: "0 0.5rem" }
  };

  return (
    <div className="pattern-option percentage">
      <div style={styles.container}>
        <div style={styles.left}>
          <h4 id={"po-pct-" + props.name}>{props.title}</h4>
        </div>
        <div style={styles.right}>
          <h4 className={value === props.dflt ? "dflt" : "custom"}>{value}%</h4>
        </div>
      </div>
      <div style={styles.container}>
        <div style={styles.left}>
          <p>{props.desc}</p>
        </div>
        <div style={styles.right}>
          <IconButton
            title={props.resetLabel}
            aria-label={props.resetLabel}
            color="primary"
            disabled={value === props.dflt ? true : false}
            onClick={reset}
          >
            <ResetIcon />
          </IconButton>
          <IconButton
            title={props.docsLabel}
            aria-label={props.docsLabel}
            color="primary"
            onClick={() =>
              props.triggerAction("showHelp", {
                type: "patternOption",
                value: props.name
              })
            }
          >
            <HelpIcon />
          </IconButton>
        </div>
      </div>
      <FormFieldSlider
        name={props.name}
        value={value}
        min={props.min}
        max={props.max}
        step={props.step}
        onChange={update}
        label={"po-pct-" + props.name}
        updateOption={update}
      />
    </div>
  );
};

PatternOptionPercentage.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  updateOption: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  dflt: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  resetLabel: PropTypes.string,
  docsLabel: PropTypes.string
};

PatternOptionPercentage.defaultProps = {
  min: 0,
  max: 100,
  step: 0.1,
  title: false,
  desc: false,
  resetLabel: "♻️",
  docsLabel: "🤔"
};

export default PatternOptionPercentage;
