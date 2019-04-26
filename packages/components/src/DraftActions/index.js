import React, { useState } from "react";
import PropTypes from "prop-types";
import { gistDefaults } from "../utils";
import { patternInfo, patternList } from "@freesewing/patterns";
import { FormattedMessage } from "react-intl";
import List from "@material-ui/core/List";
import DraftSettingSa from "../DraftSettingSa";
import DraftSettingMargin from "../DraftSettingMargin";
import DraftSettingComplete from "../DraftSettingComplete";
import DraftSettingPaperless from "../DraftSettingPaperless";
import DraftSettingUnits from "../DraftSettingUnits";
import DraftSettingLanguage from "../DraftSettingLanguage";
import DraftSettingOnly from "../DraftSettingOnly";
import DownIcon from "@material-ui/icons/KeyboardArrowDown";

const DraftActions = props => {
  const [expanded, setExpanded] = useState([]);

  const toggleGroup = group => {
    let shown = expanded.slice(0);
    let index = shown.indexOf(group);
    if (index === -1) shown.push(group);
    else shown.splice(index, 1);
    setExpanded(shown);
  };

  let paperSizes = ["A4", "Letter", "A3", "Tabloid", "A2", "A1", "A0"];
  let groups = {
    saveDraft: [
      <li>
        <FormattedMessage id="app.saveDraftToYourAccount" />
      </li>,
      <li>
        <FormattedMessage id="app.saveGistAsJSON" />
      </li>,
      <li>
        <FormattedMessage id="app.saveGistAsYAML" />
      </li>,
      <li>
        <FormattedMessage id="app.saveSvg" />
      </li>
    ],
    exportDraft: [
      <li>
        <FormattedMessage id="app.exportDraft" />: PDF
      </li>,
      paperSizes.map(size => (
        <li>
          <FormattedMessage id="app.exportTiledPdf" />: {size}
        </li>
      ))
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
                <FormattedMessage id={"app." + group} />
              </h3>
            </li>
            {children}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

DraftActions.propTypes = {};

DraftActions.defaultProps = {};

export default DraftActions;
