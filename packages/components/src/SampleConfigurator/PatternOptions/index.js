import React from "react";
import PropTypes from "prop-types";
import OptionGroup from "../OptionGroup";
import { FormattedMessage } from "react-intl";

const PatternOptions = props => {
  const renderGroup = group => {
    let output = [];
    let children = (
      <ul className="links">
        <OptionGroup
          key={group + "-group"}
          units={props.units}
          config={props.config}
          options={props.config.optionGroups[group]}
          sampleOption={props.sampleOption}
        />
      </ul>
    );
    output.push(
      <li key={group + "-ghead"} className="nodot">
        <h3>
          <FormattedMessage id={"optiongroups." + group} />
        </h3>
        {children}
      </li>
    );

    return output;
  };

  return (
    <ul className="links">
      {Object.keys(props.config.optionGroups).map(group => renderGroup(group))}
    </ul>
  );
};

PatternOptions.propTypes = {
  config: PropTypes.object.isRequired,
  gist: PropTypes.object.isRequired,
  sampleOption: PropTypes.func.isRequired
};

PatternOptions.defaultProps = {};

export default PatternOptions;
