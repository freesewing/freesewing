import React, { useState } from "react";
import FormFieldList from "../FormFieldList";
import OptionPreamble from "../OptionPreamble";

const DraftSettingUnits = props => {
  const [value, setValue] = useState(props.dflt);

  const update = (name, newValue, evt) => {
    props.updateValue(props.name, newValue);
    setValue(newValue);
  };

  const reset = () => {
    setValue(props.dflt);
    props.updateValue(props.name, props.dflt);
  };

  return (
    <div className={"pattern-option list"}>
      <OptionPreamble
        dflt={props.dflt}
        value={value}
        desc={props.desc}
        title={props.title}
        id="po-list-units"
        displayValue={props.list[value]}
        reset={reset}
        showHelp={() =>
          props.triggerAction("showHelp", {
            type: "draftSetting",
            value: "units"
          })
        }
      />
      <FormFieldList
        name="units"
        value={value}
        dflt={props.dflt}
        onChange={update}
        label="po-bool-units"
        updateValue={update}
        list={props.list}
      />
    </div>
  );
};

export default DraftSettingUnits;
