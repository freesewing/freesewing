import React, { useState } from "react";
import PropTypes from "prop-types";
import examples from "@freesewing/examples";
import rendertest from "@freesewing/rendertest";
import i18nPlugin from "@freesewing/plugin-i18n";
import Draft from "../Draft";
import Design from "../Workbench/Design";
import { FormattedMessage } from "react-intl";

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

  const styles = {
    paragraph: {
      padding: "0 1rem"
    }
  };

  pattern.draft();
  const patternProps = pattern.getRenderProps();
  return (
    <figure className={design ? "design" : ""}>
      <Draft
        {...patternProps}
        design={design}
        focus={focus}
        raiseEvent={raiseEvent}
      />
      <figcaption>
        {props.caption}&nbsp;|&nbsp;
        {design ? (
          <React.Fragment>
            <FormattedMessage id="cfp.designModeIsOn" />
            &nbsp; (
            <a href="#logo" onClick={() => setDesign(false)}>
              <FormattedMessage id="cfp.turnOff" />
            </a>
            )
            {focusCount > 0 ? (
              <React.Fragment>
                &ensp; (
                <a
                  href="#logo"
                  onClick={() => raiseEvent("clearFocusAll", null)}
                >
                  <FormattedMessage id="app.reset" />
                </a>
                )
              </React.Fragment>
            ) : null}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <FormattedMessage id="cfp.designModeIsOff" />
            &nbsp; (
            <a href="#logo" onClick={() => setDesign(true)}>
              <FormattedMessage id="cfp.turnOn" />
            </a>
            )
          </React.Fragment>
        )}
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
      </figcaption>
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
