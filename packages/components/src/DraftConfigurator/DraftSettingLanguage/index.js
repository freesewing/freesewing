import React, { useState } from "react";
import PropTypes from "prop-types";
import FormFieldList from "../../.form/FormFieldList";
import OptionPreamble from "../OptionPreamble";
import { injectIntl } from "react-intl";
import { languages } from "@freesewing/i18n";

const DraftSettingLanguage = props => {
  const [value, setValue] = useState(props.intl.locale);
  const [expanded, setExpanded] = useState(false);

  const update = (name, newValue, evt) => {
    props.updateValue(props.name, newValue);
    setValue(newValue);
  };

  const reset = () => {
    setValue(props.intl.locale);
    props.updateValue(props.name, props.intl.locale);
  };
  const toggleExpanded = () => setExpanded(!expanded);

  const option = (
    <FormFieldList
      name={props.name}
      value={value}
      dflt={props.intl.locale}
      onChange={update}
      label={"po-list-" + props.name}
      updateValue={update}
      list={languages[props.intl.locale]}
    />
  );

  return (
    <li>
      <OptionPreamble
        dflt={props.intl.locale}
        value={value}
        desc={props.desc}
        title={props.title}
        id={"po-list-" + props.name}
        displayValue={languages[props.intl.locale][value]}
        reset={reset}
        toggleExpanded={toggleExpanded}
        expanded={expanded}
        showHelp={() =>
          props.raiseEvent("showHelp", {
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
  raiseEvent: PropTypes.func.isRequired,
  updateValue: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  desc: PropTypes.node.isRequired,
  list: PropTypes.object.isRequired
};

export default injectIntl(DraftSettingLanguage);
