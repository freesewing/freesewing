import React, { useState } from "react";
import FormFieldList from "../../.form/FormFieldList";
import OptionPreamble from "../OptionPreamble";

const DraftSettingUnits = props => {
  const [value, setValue] = useState(props.dflt);
  const [expanded, setExpanded] = useState(false);

  const update = (name, newValue, evt) => {
    props.updateValue(props.name, newValue);
    setValue(newValue);
  };

  const reset = () => {
    setValue(props.dflt);
    props.updateValue(props.name, props.dflt);
  };

  const toggleExpanded = () => setExpanded(!expanded);

  let option = (
    <FormFieldList
      name="units"
      value={value}
      dflt={props.dflt}
      onChange={update}
      label="po-bool-units"
      updateValue={update}
      list={props.list}
    />
  );

  return (
    <li>
      <OptionPreamble
        dflt={props.dflt}
        value={value}
        desc={props.desc}
        title={props.title}
        id="po-list-units"
        displayValue={props.list[value]}
        reset={reset}
        toggleExpanded={toggleExpanded}
        expanded={expanded}
        showHelp={() =>
          props.triggerAction("showHelp", {
            type: "draftSetting",
            value: "units"
          })
        }
        option={option}
      />
    </li>
  );
};

export default DraftSettingUnits;
