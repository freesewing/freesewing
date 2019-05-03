import React from "react";
import PropTypes from "prop-types";
import { defaultGist } from "@freesewing/utils";
import DraftConfigurator from "../../DraftConfigurator";

const Pattern = props => {
  let pattern = new props.Pattern(props.gist);
  return (
    <div className="fs-sa">
      <section>
        <div dangerouslySetInnerHTML={{ __hmtl: pattern.draft().render() }} />
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

Pattern.propTypes = {
  gist: PropTypes.object.isRequired,
  updateGist: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  raiseEvent: PropTypes.func.isRequired,
  Pattern: PropTypes.func.isRequired,
  units: PropTypes.oneOf(["metric", "imperial"]).isRequired
};

export default Pattern;
