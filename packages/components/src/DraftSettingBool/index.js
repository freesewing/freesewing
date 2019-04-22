import React, { useState } from "react";
import PropTypes from "prop-types";
import FormFieldBool from "../FormFieldBool";
import OptionPreamble from "../OptionPreamble";

const DraftSettingBool = props => {
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
        id={"po-list-" + props.name}
        displayValue={value ? props.labels[1] : props.labels[0]}
        reset={reset}
        showHelp={() =>
          props.triggerAction("showHelp", {
            type: "draftSetting",
            value: props.name
          })
        }
      />
      <FormFieldBool
        name={props.name}
        value={value}
        dflt={props.dflt}
        onChange={update}
        label={"po-bool-" + props.name}
        updateValue={update}
        labels={props.labels}
      />
    </div>
  );
};

DraftSettingBool.propTypes = {
  updateValue: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  dflt: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.string.isRequired
  ]),
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  resetLabel: PropTypes.string,
  docsLabel: PropTypes.string,
  list: PropTypes.object.isRequired
};

DraftSettingBool.defaultProps = {
  title: false,
  desc: false
};

export default DraftSettingBool;
