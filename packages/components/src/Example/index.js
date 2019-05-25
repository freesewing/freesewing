import React, { useState } from "react";
import PropTypes from "prop-types";
import examples from "@freesewing/examples";
import rendertest from "@freesewing/rendertest";
import Draft from "../Draft";
import Design from "../Workbench/Design";
import IconButton from "@material-ui/core/IconButton";
import ResetIcon from "@material-ui/icons/SettingsBackupRestore";
import Switch from "@material-ui/core/Switch";

const Example = props => {
  const [design, setDesign] = useState(false);
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
        {props.design ? (
          <div className="actions">
            {design ? (
              <IconButton
                color="primary"
                onClick={() => raiseEvent("clearFocusAll", null)}
              >
                <ResetIcon />
              </IconButton>
            ) : null}
            <Switch
              checked={design}
              onChange={() => setDesign(!design)}
              value={design}
              color="primary"
            />
          </div>
        ) : null}
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
  design: true,
  caption: "",
  options: {},
  part: ""
};

export default Example;
