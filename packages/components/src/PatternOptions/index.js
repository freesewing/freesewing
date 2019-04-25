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

  return (
    <List subheader={<h3 />} className="pattern-options gist-side">
      {Object.keys(pattern.optionGroups).map(group => {
        let open = true;
        if (expanded.indexOf(group) === -1) open = false;
        return (
          <React.Fragment key={group + "-ghead"}>
            <ListSubheader
              className="optiongroup-heading"
              className={
                (open ? "expanded" : "collapsed") + " optiongroup-heading"
              }
              onClick={() => toggleGroup(group)}
            >
              <h3>
                {open ? (
                  <CollapsedIcon className="collapse-icon" />
                ) : (
                  <ExpandedIcon className="collapse-icon" />
                )}
                <FormattedMessage id={"optiongroups." + group} />
              </h3>
            </ListSubheader>
            {expanded.indexOf(group) === -1 ? null : (
              <OptionGroup
                key={group + "-group"}
                units={props.units}
                pattern={pattern}
                dflts={dflts}
                options={pattern.optionGroups[group]}
                updateValue={props.updateValue}
                triggerAction={props.triggerAction}
              />
            )}
          </React.Fragment>
        );
      })}
    </List>
  );
};

PatternOptions.propTypes = {
  pattern: PropTypes.oneOf(patternList),
  units: PropTypes.oneOf(["metric", "imperial"]).isRequired
};

PatternOptions.defaultProps = {};

export default PatternOptions;
