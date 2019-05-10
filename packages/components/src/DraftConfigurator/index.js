import React, { useState } from "react";
import PropTypes from "prop-types";
import Pct from "./PatternOptionPercentage";
import Deg from "./PatternOptionDegree";
import Mm from "./PatternOptionMillimeter";
import Bool from "./PatternOptionBool";
import OptionGroup from "./OptionGroup";
import { optionType } from "@freesewing/utils";
import { FormattedMessage } from "react-intl";
import PatternOptions from "./PatternOptions";
import DraftSettings from "./DraftSettings";

const DraftConfigurator = props => {
  const [expanded, setExpanded] = useState([]);

  const toggleGroup = group => {
    let shown = expanded.slice(0);
    let index = shown.indexOf(group);
    if (index === -1) shown.push(group);
    else shown.splice(index, 1);
    setExpanded(shown);
  };
  console.log("dc props", props);
  return (
    <ul className="nav l1">
      <li>
        <h2>
          <FormattedMessage id="app.patternOptions" />
        </h2>
        <PatternOptions
          noDocs={props.noDocs}
          config={props.config}
          gist={props.gist}
          updateValue={(name, value) =>
            props.updateGist(value, "settings", "options", name)
          }
          raiseEvent={props.raiseEvent}
          units={props.units}
        />
      </li>
      <li>
        <h2>
          <FormattedMessage id="app.draftSettings" />
        </h2>
        <DraftSettings
          noDocs={props.noDocs}
          config={props.config}
          gist={props.gist}
          updateValue={(name, value) =>
            props.updateGist(value, "settings", name)
          }
          raiseEvent={props.raiseEvent}
          units={props.units}
        />
      </li>
    </ul>
  );
};

DraftConfigurator.propTypes = {
  units: PropTypes.oneOf(["metric", "imperial"]).isRequired
};

DraftConfigurator.defaultProps = {
  noDocs: false
};

export default DraftConfigurator;
