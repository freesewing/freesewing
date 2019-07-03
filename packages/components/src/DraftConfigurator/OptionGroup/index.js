import React from "react";
import PropTypes from "prop-types";
import Pct from "../PatternOptionPercentage";
import Deg from "../PatternOptionDegree";
import Mm from "../PatternOptionMillimeter";
import Bool from "../PatternOptionBool";
import List from "../PatternOptionList";
import Count from "../PatternOptionCount";
import { optionType, optionDefault } from "@freesewing/utils";
import { FormattedMessage } from "react-intl";
import { injectIntl } from "react-intl";

const OptionGroup = props => {
  const renderOption = (name, sub = false) => {
    let option = props.config.options[name];
    let type = optionType(option);
    let stringKey = `options.${props.config.name}.${name}.`;
    let extraProps = {
      name,
      dflt: optionDefault(props.config.options[name], props.gist),
      units: props.units,
      updateValue: props.updateValue,
      raiseEvent: props.raiseEvent,
      title: <FormattedMessage id={stringKey + "title"} />,
      desc: <FormattedMessage id={stringKey + "description"} />,
      intl: props.intl,
      pattern: props.config.name,
      key: name,
      noDocs: props.noDocs
    };
    if (typeof props.gist.settings.options[name] !== "undefined")
      extraProps.value = props.gist.settings.options[name];
    else extraProps.value = null;

    let noyes = [
      <FormattedMessage id="app.no" />,
      <FormattedMessage id="app.yes" />
    ];
    switch (type) {
      case "pct":
        return <Pct {...option} {...extraProps} />;
        break;
      case "deg":
        return <Deg {...option} {...extraProps} />;
        break;
      case "mm":
        return <Mm {...option} {...extraProps} units={props.units} />;
        break;
      case "bool":
        return <Bool {...option} {...extraProps} labels={noyes} />;
        break;
      case "list":
        return <List {...option} {...extraProps} />;
        break;
      case "count":
        return <Count {...option} {...extraProps} />;
        break;
      default:
        throw new Error("Unsupported option type: " + type);
    }
  };

  return (
    <React.Fragment>
      {props.options.map(name => {
        //let key = name;
        let output = [];
        if (typeof name === "object") {
          //key = Object.keys(name).pop();
          // Subgroup
          for (let subGroup of Object.keys(name)) {
            output.push(
              <span key={subGroup + "-title"} className="subheading">
                <FormattedMessage id={"optiongroups." + subGroup} />
              </span>
            );
            let children = [];
            for (let option of name[subGroup])
              children.push(renderOption(option, true));
            output.push(<ul className="config l4">{children}</ul>);
          }
        } else output.push(renderOption(name));

        return output;
      })}
    </React.Fragment>
  );
};

OptionGroup.propTypes = {
  config: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  units: PropTypes.oneOf(["metric", "imperial"]).isRequired
};

OptionGroup.defaultProps = {};

export default injectIntl(OptionGroup);
