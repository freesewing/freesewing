import React, { useState } from "react";
import PropTypes from "prop-types";
import { gistDefaults } from "../utils";
import { patternInfo, patternList } from "@freesewing/patterns";
import { FormattedMessage } from "react-intl";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import CollapsedIcon from "@material-ui/icons/KeyboardArrowDown";
import ExpandedIcon from "@material-ui/icons/ArrowRight";
import DraftSettingSa from "../DraftSettingSa";
import DraftSettingMargin from "../DraftSettingMargin";
import DraftSettingComplete from "../DraftSettingComplete";
import DraftSettingPaperless from "../DraftSettingPaperless";
import DraftSettingUnits from "../DraftSettingUnits";
import DraftSettingLanguage from "../DraftSettingLanguage";
import DraftSettingOnly from "../DraftSettingOnly";

const DraftSettings = props => {
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

  let noyes = [
    <FormattedMessage id="app.no" />,
    <FormattedMessage id="app.yes" />
  ];
  let units = {
    metric: <FormattedMessage id="app.metricUnits" />,
    imperial: <FormattedMessage id="app.imperialUnits" />
  };

  const addProps = setting => {
    const labels = {
      sa: {
        none: <FormattedMessage id="app.noSeamAllowance" />,
        dflt: <FormattedMessage id="app.standardSeamAllowance" />,
        custom: <FormattedMessage id="app.customSeamAllowance" />
      },
      only: {
        dflt: <FormattedMessage id="app.default" />,
        custom: <FormattedMessage id="app.custom" />
      },
      paperless: noyes,
      complete: noyes
    };
    let childProps = {
      triggerAction: props.triggerAction,
      updateValue: props.updateValue,
      units: props.units,
      key: setting,
      name: setting,
      labels: labels[setting]
    };
    childProps.title = (
      <FormattedMessage id={"settings." + setting + ".title"} />
    );
    childProps.desc = (
      <FormattedMessage id={"settings." + setting + ".description"} />
    );
    if (setting === "only") {
      childProps.dflt = "dflt";
      childProps.customDflt = [];
      childProps.parts = {};
      for (let part of pattern.parts)
        childProps.parts[part] = <FormattedMessage id={"parts." + part} />;
    }

    return childProps;
  };

  let groups = {
    preferences: [
      <DraftSettingSa {...addProps("sa")} />,
      <DraftSettingPaperless {...addProps("paperless")} dflt={false} />,
      <DraftSettingComplete {...addProps("complete")} dflt={true} />
    ],
    advanced: [
      <DraftSettingOnly {...addProps("only")} />,
      <DraftSettingMargin {...addProps("margin")} dflt={2} />,
      <DraftSettingUnits
        {...addProps("units")}
        dflt={props.units}
        list={units}
      />,
      <DraftSettingLanguage
        {...addProps("locale")}
        dflt={props.language}
        languages={props.languages}
      />
    ]
  };

  return (
    <ul className="nav l2">
      {Object.keys(groups).map(group => {
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
            {expanded.indexOf(group) === -1
              ? null
              : groups[group].map(component => component)}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

DraftSettings.propTypes = {
  pattern: PropTypes.oneOf(patternList),
  units: PropTypes.oneOf(["metric", "imperial"]).isRequired
};

DraftSettings.defaultProps = {};

export default DraftSettings;
