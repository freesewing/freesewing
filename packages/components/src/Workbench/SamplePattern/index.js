import React from "react";
import PropTypes from "prop-types";
import { defaultGist } from "@freesewing/utils";
import Draft from "../../Draft";
import SampleConfigurator from "../../SampleConfigurator";
import svgattrPlugin from "@freesewing/plugin-svgattr";
import { strings } from "@freesewing/i18n";
import { FormattedMessage } from "react-intl";

const SamplePattern = props => {
  let pattern = new props.Pattern(props.gist.settings).use(svgattrPlugin, {
    class: "freesewing draft"
  });
  try {
    pattern.sample();
  } catch (err) {
    console.log(err);
  }
  return (
    <div className="fs-sa">
      <section>
        <h2>
          <FormattedMessage id="app.pattern" />
        </h2>
        <div dangerouslySetInnerHTML={{ __html: pattern.render() }} />
        <h2>gist</h2>
        <pre>{JSON.stringify(props.gist, null, 2)}</pre>
      </section>

      <aside>
        <div className="sticky">
          <SampleConfigurator
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

SamplePattern.propTypes = {
  gist: PropTypes.object.isRequired,
  updateGist: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  raiseEvent: PropTypes.func.isRequired,
  Pattern: PropTypes.func.isRequired,
  units: PropTypes.oneOf(["metric", "imperial"])
};

SamplePattern.defaultProps = {
  units: "metric",
  pointInfo: null
};

export default SamplePattern;
