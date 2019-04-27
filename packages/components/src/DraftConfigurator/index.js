import React, { useState } from "react";
import PropTypes from "prop-types";
import Pct from "./PatternOptionPercentage";
import Deg from "./PatternOptionDegree";
import Mm from "./PatternOptionMillimeter";
import Bool from "./PatternOptionBool";
import OptionGroup from "./OptionGroup";
import { optionType, gistDefaults } from "../.utils";
import { patternInfo, patternList } from "@freesewing/patterns";
import { FormattedMessage } from "react-intl";
import PatternOptions from "./PatternOptions";
import DraftSettings from "./DraftSettings";
//import DraftActions from "DraftActions";
import withGist from "../withGist";

const DraftConfigurator = props => {
  const [gist, setGist] = useState(props.gist.get);
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
  let pattern = patternInfo[props.pattern];
  let dflts = gistDefaults(pattern.config, props.gist.get);

  return (
    <ul className="nav l1">
      <li>
        <h2>
          <FormattedMessage id="app.patternOptions" />
        </h2>
        <PatternOptions
          pattern={props.pattern}
          units={props.units}
          updateValue={(name, value) => props.gist.set(value, 'settings', 'options', name)}
          triggerAction={props.triggerAction}
        />
      </li>
      <li>
        <h2>
          <FormattedMessage id="app.draftSettings" />
        </h2>
        <DraftSettings
          pattern={props.pattern}
          units={props.units}
          updateValue={(name, value) => props.gist.set(value, 'settings', name)}
          triggerAction={props.triggerAction}
        />
      </li>
    </ul>
  );
};

DraftConfigurator.propTypes = {
  pattern: PropTypes.oneOf(patternList),
  units: PropTypes.oneOf(["metric", "imperial"]).isRequired
};

DraftConfigurator.defaultProps = {};

export default withGist(DraftConfigurator, {gist: {}, store: "yes"});
