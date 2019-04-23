import React, { useState } from "react";
import FormFieldChecks from "../FormFieldChecks";
import FormFieldList from "../FormFieldList";
import FormFieldSlider from "../FormFieldSlider";
import { formatMm, roundMm, defaultSa, sliderStep } from "../utils";
import OptionPreamble from "../OptionPreamble";

const DraftSettingOnly = props => {
  const [value, setValue] = useState(props.dflt);
  const [parts, setParts] = useState([]);

  const update = (name, newValue, evt) => {
    setValue(newValue);
    if (newValue === "dflt") props.updateValue("only", false);
    else props.updateValue("only", parts);
  };

  const reset = () => {
    setValue("dflt");
    setParts([]);
    props.updateValue("only", false);
  };

  const updateCustom = (name, newValue, evt) => {
    props.updateValue("only", newValue);
    setParts(newValue);
  };

  const list = {
    dflt: props.labels.dflt,
    custom: props.labels.custom
  };

  return (
    <div className={"pattern-option list"}>
      <OptionPreamble
        dflt="dflt"
        value={value}
        desc={props.desc}
        title={props.title}
        id="po-list-only"
        displayValue={props.labels[value]}
        reset={reset}
        showHelp={() =>
          props.triggerAction("showHelp", {
            type: "draftSetting",
            value: "only"
          })
        }
      />
      <FormFieldList
        name="only"
        value={value}
        dflt={props.dflt}
        onChange={update}
        label="po-list-only"
        updateValue={update}
        list={list}
      />
      {value === "custom" ? (
        <FormFieldChecks
          checks={props.parts}
          name="parts"
          value={value}
          dflt={props.customDflt}
          onChange={updateCustom}
          label="po-list-only"
          updateValue={updateCustom}
          list={list}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default DraftSettingOnly;
