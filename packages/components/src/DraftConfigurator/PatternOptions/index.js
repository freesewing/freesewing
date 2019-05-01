import React, { useState } from "react";
import PropTypes from "prop-types";
import Pct from "../PatternOptionPercentage";
import Deg from "../PatternOptionDegree";
import Mm from "../PatternOptionMillimeter";
import Bool from "../PatternOptionBool";
import OptionGroup from "../OptionGroup";
import { optionType } from "@freesewing/utils";
import { FormattedMessage } from "react-intl";
import DownIcon from "@material-ui/icons/KeyboardArrowDown";

const PatternOptions = props => {
  const [expanded, setExpanded] = useState([]);
  const toggleGroup = group => {
    let shown = expanded.slice(0);
    let index = shown.indexOf(group);
    if (index === -1) shown.push(group);
    else shown.splice(index, 1);
    setExpanded(shown);
  };

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
            config={props.config}
            options={props.config.optionGroups[group]}
            updateValue={props.updateValue}
            raiseEvent={props.raiseEvent}
          />
        </ul>
      );
    output.push(
      <li className={open ? "expanded" : "collapsed"} key={group + "-ghead"}>
        <h3 onClick={() => toggleGroup(group)}>
          <DownIcon
            className={"icon-col-exp " + (open ? "expanded" : "collapsed")}
          />
          <FormattedMessage id={"optiongroups." + group} />
        </h3>
        {children}
      </li>
    );

    return output;
  };

  return (
    <ul className="nav l2">
      {Object.keys(props.config.optionGroups).map(group => renderGroup(group))}
    </ul>
  );
};

PatternOptions.propTypes = {
  config: PropTypes.object.isRequired,
  gist: PropTypes.object.isRequired,
  raiseEvent: PropTypes.func
};

PatternOptions.defaultProps = {};

export default PatternOptions;
