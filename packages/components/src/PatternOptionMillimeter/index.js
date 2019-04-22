import React, { useState } from "react";
import PropTypes from "prop-types";
import FormFieldSlider from "../FormFieldSlider";
import OptionPreamble from "../OptionPreamble";

const PatternOptionMillimeter = props => {
  const [value, setValue] = useState(props.dflt);
  const [previousValue, setPreviousValue] = useState(props.dflt);

  const smallestImperialStep = 0.396875;

  const round = val => {
    if (props.units === "imperial") {
      return Math.round(val * 1000000) / 1000000;
    } else return Math.round(val * 10) / 10;
  };
  const roundDown = val => {
    if (props.units === "imperial") {
      return val - (val % smallestImperialStep);
    } else return Math.floor(val * 10) / 10;
  };
  const roundUp = val => {
    if (props.units === "imperial") {
      return val - (val % 0.396875);
    } else return Math.ceil(val * 10) / 10;
  };

  const update = (name, newValue, evt) => {
    newValue = round(newValue);
    // Sometimes, when sliding, the rapid succession of updates
    // causes a weird timing issue to result in a value that is NaN.
    // If that's the case, just ignore this update and keep the
    // previous one instead
    if (!isNaN(newValue)) {
      setValue(newValue);
      if (evt.type !== "mousemove") props.updateValue(props.name, newValue);
    } else {
      if (evt.type !== "mousemove") props.updateValue(props.name, value);
    }
  };

  const reset = () => {
    setValue(props.dflt);
    props.updateValue(props.name, props.dflt);
  };

  const formatValue = val => {
    val = round(val);
    if (props.units === "imperial") {
      if (val == 0) return 0 + '"';
      let negative = "";
      let inches = "";
      let rest = "";
      let fraction = val / 25.4;
      if (fraction < 0) {
        fraction = fraction * -1;
        negative = "-";
      }
      if (Math.abs(fraction) < 1) {
        inches = "";
        rest = fraction;
      } else {
        inches = Math.floor(fraction);
        rest = fraction - inches;
      }
      inches += " ";
      let fraction128 = Math.round(rest * 128);
      // eslint-disable-next-line
      if (fraction128 == 0) return negative + inches;
      // eslint-disable-next-line
      if (fraction128 % 64 == 0)
        return negative + inches + fraction128 / 64 + "/2";
      // eslint-disable-next-line
      if (fraction128 % 32 == 0)
        return negative + inches + fraction128 / 32 + "/2";
      // eslint-disable-next-line
      if (fraction128 % 16 == 0)
        return negative + inches + fraction128 / 16 + "/8";
      // eslint-disable-next-line
      if (fraction128 % 8 == 0)
        return negative + inches + fraction128 / 8 + "/16";
      // eslint-disable-next-line
      if (fraction128 % 4 == 0)
        return negative + inches + fraction128 / 4 + "/32";
      // eslint-disable-next-line
      if (fraction128 % 2 == 0)
        return negative + inches + fraction128 / 2 + "/64";
      else return negative + fraction;
    } else return val + "cm";
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
    <div className="pattern-option millimeter">
      <OptionPreamble
        dflt={props.dflt}
        value={value}
        desc={props.desc}
        title={props.title}
        id={"po-mm-" + props.name}
        displayValue={formatValue(value)}
        reset={reset}
        showHelp={() =>
          props.triggerAction("showHelp", {
            type: "patternOption",
            value: props.name
          })
        }
      />
      <FormFieldSlider
        name={props.name}
        value={value}
        min={roundUp(props.min)}
        max={roundDown(props.max)}
        step={props.units === "imperial" ? smallestImperialStep : 0.1}
        onChange={update}
        label={"po-mm-" + props.name}
        updateValue={update}
      />
    </div>
  );
};

PatternOptionMillimeter.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  updateValue: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  dflt: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  resetLabel: PropTypes.string,
  docsLabel: PropTypes.string,
  units: PropTypes.oneOf(["metric", "imperial"]).isRequired
};

PatternOptionMillimeter.defaultProps = {
  min: 0,
  max: 100,
  title: false,
  desc: false
};

export default PatternOptionMillimeter;
