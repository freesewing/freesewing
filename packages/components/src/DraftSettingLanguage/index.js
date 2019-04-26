import React, { useState } from "react";
import PropTypes from "prop-types";
import FormFieldList from "../FormFieldList";
import OptionPreamble from "../OptionPreamble";

const DraftSettingLanguage = props => {
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

  const option = (
    <FormFieldList
      name={props.name}
      value={value}
      dflt={props.dflt}
      onChange={update}
      label={"po-list-" + props.name}
      updateValue={update}
      list={props.languages}
    />
  );

  return (
    <li>
      <OptionPreamble
        dflt={props.dflt}
        value={value}
        desc={props.desc}
        title={props.title}
        id={"po-list-" + props.name}
        displayValue={props.languages[value]}
        reset={reset}
        toggleExpanded={toggleExpanded}
        expanded={expanded}
        showHelp={() =>
          props.triggerAction("showHelp", {
            type: "draftSetting",
            value: props.name
          })
        }
        option={option}
      />
    </li>
  );
};

DraftSettingLanguage.propTypes = {
  triggerAction: PropTypes.func.isRequired,
  updateValue: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  dflt: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.string.isRequired
  ]),
  title: PropTypes.node.isRequired,
  desc: PropTypes.node.isRequired,
  list: PropTypes.object.isRequired
};

export default DraftSettingLanguage;
