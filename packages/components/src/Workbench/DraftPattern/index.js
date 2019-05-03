import React from "react";
import PropTypes from "prop-types";
import { defaultGist } from "@freesewing/utils";
import DraftConfigurator from "../../DraftConfigurator";
import themePlugin from "@freesewing/plugin-theme";
import svgattrPlugin from "@freesewing/plugin-svgattr";
import i18nPlugin from "@freesewing/plugin-i18n";
import validatePlugin from "@freesewing/plugin-validate";
import designerPlugin from "@freesewing/plugin-designer";
import { strings } from "@freesewing/i18n";
import { FormattedMessage } from "react-intl";

const DraftPattern = props => {
  let pattern = new props.Pattern(props.gist.settings)
    .use(themePlugin)
    .use(svgattrPlugin, { class: "freesewing draft" })
    .use(i18nPlugin, { strings: strings })
    .use(validatePlugin)
    .use(designerPlugin, props.raiseEvent);
  pattern.draft();
  console.dir({ pattern });

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
          <DraftConfigurator
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
