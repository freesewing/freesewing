import React, { useState } from "react";
import PropTypes from "prop-types";
import FormFieldList from "../../.form/FormFieldList";
import FormFieldSlider from "../../.form/FormFieldSlider";
import { formatMm, roundMm, defaultSa, sliderStep } from "@freesewing/utils";
import OptionPreamble from "../OptionPreamble";

const DraftSettingSa = props => {
  const [value, setValue] = useState("dflt");
  const [saValue, setSaValue] = useState(defaultSa[props.units]);
  const [customValue, setCustomValue] = useState(10);
  const [expanded, setExpanded] = useState(false);

  const update = (name, newValue, evt) => {
    switch (newValue) {
      case "none":
        props.updateValue("sa", 0);
        setValue(newValue);
        setSaValue(0);
        break;
      case "dflt":
        props.updateValue("sa", defaultSa[props.units]);
        setValue(newValue);
        setSaValue(defaultSa[props.units]);
        break;
      default:
        props.updateValue("sa", customValue);
        setValue(newValue);
        setSaValue(customValue);
        break;
    }
  };

  const reset = () => {
    setValue("dflt");
    setSaValue(defaultSa[props.units]);
    props.updateValue("sa", defaultSa[props.units]);
  };
  const toggleExpanded = () => setExpanded(!expanded);

  const updateCustom = (name, newValue, evt) => {
    newValue = roundMm(newValue);
    // Sometimes, when sliding, the rapid succession of updates
    // causes a weird timing issue to result in a value that is NaN.
    // If that's the case, just ignore this update and keep the
    // previous one instead
    if (!isNaN(newValue)) {
      setSaValue(newValue);
      if (evt.type !== "mousemove") props.updateValue("sa", newValue);
    } else {
      if (evt.type !== "mousemove") props.updateValue("sa", newValue);
    }
  };

  const list = {
    none: props.labels.none,
    dflt: props.labels.dflt,
    custom: props.labels.custom
  };

  let option = (
    <FormFieldList
      name="sa"
      value={value}
      dflt={"dflt"}
      onChange={update}
      label="po-bool-sa"
      updateValue={update}
      list={list}
    />
  );
  if (value === "custom")
    option = (
      <React.Fragment>
        {option}
        <FormFieldSlider
          name="customSa"
          value={saValue}
          dflt={defaultSa[props.units]}
          label="po-bool-sa"
          updateValue={updateCustom}
          min={0}
          max={25.4}
          step={sliderStep[props.units]}
        />
      </React.Fragment>
    );

  return (
    <li>
      <OptionPreamble
        dflt={"dflt"}
        value={value}
        desc={props.desc}
        title={props.title}
        id="po-list-sa"
        displayValue={formatMm(saValue, props.units)}
        displayFormat="html"
        reset={reset}
        toggleExpanded={toggleExpanded}
        expanded={expanded}
        showHelp={() =>
          props.raiseEventAction("showHelp", {
            type: "draftSetting",
            value: "sa"
          })
        }
        option={option}
      />
    </li>
  );
};

DraftSettingSa.propTypes = {
  raiseEvent: PropTypes.func.isRequired,
  updateValue: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  units: PropTypes.oneOf(["metric", "imperial"]).isRequired,
  labels: PropTypes.array
};

DraftSettingSa.defaultProps = {
  // FIXME
};

export default DraftSettingSa;
