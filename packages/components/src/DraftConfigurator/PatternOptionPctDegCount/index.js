import React, { useState } from "react";
import PropTypes from "prop-types";
import FormFieldSlider from "../../.form/FormFieldSlider";
import OptionPreamble from "../OptionPreamble";

const PatternOptionPctDegCount = props => {
  const [value, setValue] = useState(props.dflt);
  const [previousValue, setPreviousValue] = useState(props.dflt);
  const [expanded, setExpanded] = useState(false);

  const round = val => Math.round(val * 10) / 10;

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

  const toggleExpanded = () => setExpanded(!expanded);

  let unit = "";
  if (props.type === "pct") unit = "%";
  if (props.type === "deg") unit = "°";

  let option = (
    <FormFieldSlider
      name={props.name}
      value={value}
      min={props.min}
      max={props.max}
      step={props.type === "count" ? 1 : props.step}
      onChange={update}
      label={"po-" + props.type + "-" + props.name}
      updateValue={update}
    />)

  return (
    <li>
      <OptionPreamble
        dflt={props.dflt}
        value={value}
        desc={props.desc}
        title={props.title}
        id={"po-" + props.type + "-" + props.name}
        displayValue={value + unit}
        reset={reset}
        toggleExpanded={toggleExpanded}
        expanded={expanded}
        showHelp={() =>
          props.triggerAction("showHelp", {
            type: "patternOption",
            value: props.name
          })
        }
        option={option}
      />
    </li>
  );
};

PatternOptionPctDegCount.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  updateValue: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  dflt: PropTypes.number.isRequired,
  title: PropTypes.node.isRequired,
  desc: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["pct", "deg", "count"])
};

PatternOptionPctDegCount.defaultProps = {
  min: 0,
  max: 100,
  step: 0.1,
  type: "pct"
};

export default PatternOptionPctDegCount;
