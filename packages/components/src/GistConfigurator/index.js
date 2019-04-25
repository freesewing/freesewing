import React, { useState } from "react";
import PropTypes from "prop-types";
import Pct from "../PatternOptionPercentage";
import Deg from "../PatternOptionDegree";
import Mm from "../PatternOptionMillimeter";
import Bool from "../PatternOptionBool";
import OptionGroup from "../OptionGroup";
import { optionType, gistDefaults } from "../utils";
import { patternInfo, patternList } from "@freesewing/patterns";
import { FormattedMessage, injectIntl } from "react-intl";
import { i18n as languages } from "@freesewing/i18n";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import CollapsedIcon from "@material-ui/icons/ArrowDropDown";
import ExpandedIcon from "@material-ui/icons/ArrowRight";
import PatternOptions from "../PatternOptions";
import DraftSettings from "../DraftSettings";

const GistConfigurator = props => {
  console.log(languages);
  const [gist, setGist] = useState(props.gist);
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
  let dflts = gistDefaults(pattern.config, props.gist);

  return (
    <div className="gist-config">
      <div className="gist-options">
        <h2>
          <FormattedMessage id="app.patternOptions" />
        </h2>
        <PatternOptions
          pattern={props.pattern}
          units={props.units}
          updateValue={update}
          triggerAction={props.triggerAction}
        />
        <h2>
          <FormattedMessage id="app.draftSettings" />
        </h2>
        <DraftSettings
          pattern={props.pattern}
          units={props.units}
          updateValue={update}
          triggerAction={props.triggerAction}
          language={props.intl.locale}
          languages={languages[props.intl.locale]}
        />
      </div>
    </div>
  );
};

GistConfigurator.propTypes = {
  pattern: PropTypes.oneOf(patternList),
  units: PropTypes.oneOf(["metric", "imperial"]).isRequired
};

GistConfigurator.defaultProps = {};

export default injectIntl(GistConfigurator);
