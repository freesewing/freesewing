import React, { useState } from "react";
import PropTypes from "prop-types";
import FormFieldList from "../FormFieldList";
import OptionPreamble from "../OptionPreamble";

const PatternOptionList = props => {
  const [value, setValue] = useState(props.dflt);

  const update = (name, newValue, evt) => {
    props.updateValue(props.name, newValue);
    setValue(newValue);
  };

  const reset = () => {
    setValue(props.dflt);
    props.updateValue(props.name, props.dflt);
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
    <div className={"pattern-option list"}>
      <OptionPreamble
        dflt={props.dflt}
        value={value}
        desc={props.desc}
        title={props.title}
        id={"po-list-" + props.name}
        displayValue={props.list[value]}
        reset={reset}
        showHelp={() =>
          props.triggerAction("showHelp", {
            type: "patternOption",
            value: props.name
          })
        }
      />
      <FormFieldList
        name={props.name}
        value={value}
        dflt={props.dflt}
        onChange={update}
        label={"po-list-" + props.name}
        updateValue={update}
        list={props.list}
      />
    </div>
  );
};

PatternOptionList.propTypes = {
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

PatternOptionList.defaultProps = {
  title: false,
  desc: false
};

export default PatternOptionList;
