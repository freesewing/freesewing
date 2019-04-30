import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import DraftSettingSa from "../DraftSettingSa";
import DraftSettingMargin from "../DraftSettingMargin";
import DraftSettingComplete from "../DraftSettingComplete";
import DraftSettingPaperless from "../DraftSettingPaperless";
import DraftSettingUnits from "../DraftSettingUnits";
import DraftSettingLanguage from "../DraftSettingLanguage";
import DraftSettingOnly from "../DraftSettingOnly";
import DownIcon from "@material-ui/icons/KeyboardArrowDown";

const DraftSettings = props => {
  const [expanded, setExpanded] = useState([]);
  const toggleGroup = group => {
    let shown = expanded.slice(0);
    let index = shown.indexOf(group);
    if (index === -1) shown.push(group);
    else shown.splice(index, 1);
    setExpanded(shown);
  };

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
      raiseEvent: props.raiseEvent,
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
      for (let part of props.config.parts) // HERE
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
      <DraftSettingLanguage {...addProps("locale")} />
    ]
  };

  return (
    <ul className="nav l2">
      {Object.keys(groups).map(group => {
        let open = true;
        if (expanded.indexOf(group) === -1) open = false;
        let children = null;
        if (open) children = groups[group].map(component => component);
        return (
          <React.Fragment>
            <li
              className={open ? "expanded" : "collapsed"}
              key={group + "-ghead"}
            >
              <h3 onClick={() => toggleGroup(group)}>
                <DownIcon
                  className={
                    "icon-col-exp " + (open ? "expanded" : "collapsed")
                  }
                />
                <FormattedMessage id={"optiongroups." + group} />
              </h3>
            </li>
            {children}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

DraftSettings.propTypes = {
  info: PropTypes.object.isRequired,
  gist: PropTypes.object.isRequired
};

DraftSettings.defaultProps = {};

export default DraftSettings;
