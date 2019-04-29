import React, { useState } from "react";
import PropTypes from "prop-types";
import Pct from "./PatternOptionPercentage";
import Deg from "./PatternOptionDegree";
import Mm from "./PatternOptionMillimeter";
import Bool from "./PatternOptionBool";
import OptionGroup from "./OptionGroup";
import { optionType, gistDefaults } from "@freesewing/utils";
import { FormattedMessage } from "react-intl";
import PatternOptions from "./PatternOptions";
import DraftSettings from "./DraftSettings";

const DraftConfigurator = props => {
  const [expanded, setExpanded] = useState([]);

  const update = (type, name, value) => {
    console.log("updating", type, name, value);
  };

  const toggleGroup = group => {
    let shown = expanded.slice(0);
    let index = shown.indexOf(group);
    if (index === -1) shown.push(group);
    else shown.splice(index, 1);
    setExpanded(shown);
  };
  let dflts = gistDefaults(props.info.config, props.gist);

  return (
    <ul className="nav l1">
      <li>
        <h2>
          <FormattedMessage id="app.patternOptions" />
        </h2>
        <PatternOptions
          info={props.info}
          gist={props.gist}
          updateValue={(name, value) =>
            props.updateGist(value, "settings", "options", name)
          }
          triggerAction={props.triggerAction}
        />
      </li>
      <li>
        <h2>
          <FormattedMessage id="app.draftSettings" />
        </h2>
        <DraftSettings
          info={props.info}
          gist={props.gist}
          updateValue={(name, value) =>
            props.updateGist(value, "settings", name)
          }
          triggerAction={props.triggerAction}
        />
      </li>
    </ul>
  );
};

DraftConfigurator.propTypes = {};

DraftConfigurator.defaultProps = {};

export default DraftConfigurator;
