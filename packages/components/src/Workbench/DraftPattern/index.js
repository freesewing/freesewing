import React, { useState } from "react";
import PropTypes from "prop-types";
import { defaultGist } from "@freesewing/utils";
import Draft from "../../Draft";
import Design from "../Design";
import DraftConfigurator from "../../DraftConfigurator";
import { strings } from "@freesewing/i18n";
import { FormattedMessage } from "react-intl";
import Prism from "prismjs";

const DraftPattern = props => {
  const [design, setDesign] = useState(true);
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

  const styles = {
    paragraph: {
      padding: "0 1rem"
    }
  };
  let pattern = new props.Pattern(props.gist.settings);
  pattern.draft();
  let patternProps = pattern.getRenderProps();
  let focusCount = 0;
  if (focus !== null) {
    for (let p of Object.keys(focus)) {
      for (let i in focus[p].points) focusCount++;
      for (let i in focus[p].paths) focusCount++;
      for (let i in focus[p].coords) focusCount++;
    }
  }

  let gist = Prism.highlight(
    JSON.stringify(props.gist, null, 2),
    Prism.languages.javascript,
    "javascript"
  );

  return (
    <div className="fs-sa">
      <section>
        <h2>
          <FormattedMessage id="app.pattern" />
        </h2>
        <Draft
          {...patternProps}
          design={design}
          focus={focus}
          raiseEvent={raiseEvent}
        />
        <h2>gist</h2>
        <div className="gatsby-highlight">
          <pre
            className="language-json"
            dangerouslySetInnerHTML={{ __html: gist }}
          />
        </div>
      </section>

      <aside>
        <div className="sticky">
          {design ? (
            <React.Fragment>
              <p style={styles.paragraph}>
                <FormattedMessage id="cfp.designModeIsOn" />
                &nbsp;(
                <a href="#logo" onClick={() => setDesign(false)}>
                  <FormattedMessage id="cfp.turnOff" />
                </a>
                )
                {focusCount > 0 ? (
                  <React.Fragment>
                    &ensp;(
                    <a
                      href="#logo"
                      onClick={() => raiseEvent("clearFocusAll", null)}
                    >
                      <FormattedMessage id="app.reset" />
                    </a>
                    )
                  </React.Fragment>
                ) : null}
              </p>
              <Design
                focus={focus}
                design={design}
                raiseEvent={raiseEvent}
                parts={patternProps.parts}
              />
            </React.Fragment>
          ) : (
            <p style={styles.paragraph}>
              <FormattedMessage id="cfp.designModeIsOff" />
              &nbsp;(
              <a href="#logo" onClick={() => setDesign(true)}>
                <FormattedMessage id="cfp.turnOn" />
              </a>
              )
            </p>
          )}
          <DraftConfigurator
            noDocs
            config={props.config}
            gist={props.gist}
            updateGist={props.updateGist}
            raiseEvent={props.raiseEvent}
            freesewing={props.freesewing}
            units={props.units}
          />
        </div>
      </aside>
    </div>
  );
};

DraftPattern.propTypes = {
  gist: PropTypes.object.isRequired,
  updateGist: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  raiseEvent: PropTypes.func.isRequired,
  Pattern: PropTypes.func.isRequired,
  units: PropTypes.oneOf(["metric", "imperial"])
};

DraftPattern.defaultProps = {
  units: "metric",
  pointInfo: null
};

export default DraftPattern;
