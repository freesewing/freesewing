import React from "react";
import PropTypes from "prop-types";
import { defaultGist } from "@freesewing/utils";
import DraftConfigurator from "../../DraftConfigurator";

const Pattern = props => {
  //let pattern = new props.Pattern();

  return (
    <div className="fs-sa">
      <section>
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
