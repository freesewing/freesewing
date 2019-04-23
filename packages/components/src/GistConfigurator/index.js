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

const GistConfigurator = props => {
  const [gist, setGist] = useState(props.gist || defaultGist);

  const update = (type, name, value) => {
    console.log("updating", type, name, value);
  };

  let pattern = patternInfo[props.pattern];
  let dflts = gistDefaults(pattern.config, gist);

  return (
    <div className="gist-config">
      <div className="gist-options">
        <h2>
          <FormattedMessage id="app.patternOptions" />
        </h2>
        {Object.keys(pattern.optionGroups).map(group => (
          <React.Fragment key={group}>
            <h3 key={group + "-title"}>
              <FormattedMessage id={"optiongroups." + group} />
            </h3>
            <OptionGroup
              key={group + "-group"}
              units={props.units}
              pattern={pattern}
              dflts={dflts}
              options={pattern.optionGroups[group]}
              updateValue={update}
              triggerAction={props.triggerAction}
            />
          </React.Fragment>
        ))}
        <h2>
          <FormattedMessage id="app.draftSettings" />
        </h2>
      </div>
    </div>
  );
};

GistConfigurator.propTypes = {
  pattern: PropTypes.oneOf(patternList),
  units: PropTypes.oneOf(["metric", "imperial"]).isRequired
};

GistConfigurator.defaultProps = {};

export default GistConfigurator;
