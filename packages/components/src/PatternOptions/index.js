import React, { useState } from "react";
import PropTypes from "prop-types";
import Pct from "../PatternOptionPercentage";
import Deg from "../PatternOptionDegree";
import Mm from "../PatternOptionMillimeter";
import Bool from "../PatternOptionBool";
import OptionGroup from "../OptionGroup";
import { optionType, defaultGist, gistDefaults } from "../utils";
import { patternInfo, patternList } from "@freesewing/patterns";
import { FormattedMessage } from "react-intl";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import CollapsedIcon from "@material-ui/icons/ArrowDropDown";
import ExpandedIcon from "@material-ui/icons/ArrowRight";

const PatternOptions = props => {
  const [expanded, setExpanded] = useState([]);

  const toggleGroup = group => {
    let shown = expanded.slice(0);
    let index = shown.indexOf(group);
    if (index === -1) shown.push(group);
    else shown.splice(index, 1);
    setExpanded(shown);
  };

  let pattern = patternInfo[props.pattern];
  let dflts = gistDefaults(pattern.config, props.gist);

  const renderGroup = group => {
    let open = true;
    if (expanded.indexOf(group) === -1) open = false;
    let output = [];
    let children = null;
    if (expanded.indexOf(group) !== -1)
      children = (
        <ul className="nav l3">
          <OptionGroup
            key={group + "-group"}
            units={props.units}
            pattern={pattern}
            dflts={dflts}
            options={pattern.optionGroups[group]}
            updateValue={props.updateValue}
            triggerAction={props.triggerAction}
          />
        </ul>
      );
    output.push(
      <li className={open ? "expanded" : "collapsed"} key={group + "-ghead"}>
        <h3 onClick={() => toggleGroup(group)}>
          {open ? (
            <CollapsedIcon className="collapse-icon" />
          ) : (
            <ExpandedIcon className="collapse-icon" />
          )}
          <FormattedMessage id={"optiongroups." + group} />
        </h3>
        {children}
      </li>
    );

    return output;
  };

  return (
    <ul className="nav l2">
      {Object.keys(pattern.optionGroups).map(group => renderGroup(group))}
    </ul>
  );
};

PatternOptions.propTypes = {
  pattern: PropTypes.oneOf(patternList),
  units: PropTypes.oneOf(["metric", "imperial"]).isRequired
};

PatternOptions.defaultProps = {};

export default PatternOptions;
