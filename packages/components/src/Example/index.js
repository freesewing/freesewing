import React, { useState } from "react";
import PropTypes from "prop-types";
import examples from "@freesewing/examples";
import rendertest from "@freesewing/rendertest";
import i18nPlugin from "@freesewing/plugin-i18n";
import Draft from "../Draft";
import Design from "../Workbench/Design";
import { FormattedMessage } from "react-intl";
import source from "./source";
import IconButton from "@material-ui/core/IconButton";
import DesignIcon from "@material-ui/icons/LocationSearching";
import CodeIcon from "@material-ui/icons/Code";
import ResetIcon from "@material-ui/icons/SettingsBackupRestore";
import Prism from "prismjs";

const Example = props => {
  const [design, setDesign] = useState(false);
  const [code, setCode] = useState(false);
  const [focus, setFocus] = useState(null);

  const raiseEvent = (type, data) => {
    if (type === "clearFocusAll") return setFocus(null);
    let f = {};
    if (focus !== null) f = { ...focus };
    if (typeof f[data.part] === "undefined")
      f[data.part] = { paths: [], points: [], coords: [] };
    if (type === "point") f[data.part].points.push(data.name);
    else if (type === "path") f[data.part].paths.push(data.name);
    else if (type === "coords") f[data.part].coords.push(data.coords);
    else if (type === "clearFocus") {
      let i = focus[data.part][data.type].indexOf(data.name);
      f[data.part][data.type].splice(i, 1);
    }

    setFocus(f);
  };

  let focusCount = 0;
  if (focus !== null) {
    for (let p of Object.keys(focus)) {
      for (let i in focus[p].points) focusCount++;
      for (let i in focus[p].paths) focusCount++;
      for (let i in focus[p].coords) focusCount++;
    }
  }

  const patterns = {
    examples,
    rendertest
  };
  const settings = { options: { ...props.options } };
  if (props.part !== "") settings.only = [props.part];
  const pattern = new patterns[props.pattern](settings);

  pattern.draft();
  const patternProps = pattern.getRenderProps();
  return (
    <figure className={design ? "design example" : "example"}>
      <div className="example">
        <div className="actions">
          {design ? (
            <IconButton
              color="primary"
              variant="contained"
              onClick={() => raiseEvent("clearFocusAll", null)}
            >
              <ResetIcon />
            </IconButton>
          ) : null}
          <IconButton
            color="inherit"
            className={design ? "active" : ""}
            onClick={() => setDesign(!design)}
          >
            <DesignIcon color="inherit" />
          </IconButton>
          <IconButton
            color="inherit"
            className={code ? "active" : ""}
            onClick={() => setCode(!code)}
          >
            <CodeIcon color="inherit" />
          </IconButton>
        </div>
        <Draft
          {...patternProps}
          design={design}
          focus={focus}
          raiseEvent={raiseEvent}
        />
      </div>
      <figcaption>{props.caption}</figcaption>
      {design ? (
        <div className="design">
          <Design
            focus={focus}
            design={design}
            raiseEvent={raiseEvent}
            parts={patternProps.parts}
          />
        </div>
      ) : null}
      {code ? (
        <div className="gatsby-highlight">
          <pre className="language-js">
            <code
              className="language-js"
              dangerouslySetInnerHTML={{
                __html: Prism.highlight(
                  source[props.part].toSource(),
                  Prism.languages.javascript,
                  "javascript"
                )
              }}
            />
          </pre>
        </div>
      ) : null}
    </figure>
  );
};

Example.propTypes = {
  pattern: PropTypes.string,
  design: PropTypes.bool,
  caption: PropTypes.string,
  part: PropTypes.string,
  options: PropTypes.obj
};

Example.defaultProps = {
  pattern: "examples",
  design: false,
  caption: "",
  options: {},
  part: ""
};

export default Example;
