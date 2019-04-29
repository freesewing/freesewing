import React from "react";
import PropTypes from "prop-types";
import { defaultGist } from "@freesewing/utils";
import DraftConfigurator from "../../DraftConfigurator";

const Pattern = props => {
  //let pattern = new props.Pattern();

  return (
    <div className="fs-sa">
      <section>hi mom</section>
      <aside>
        <div className="sticky">
          <DraftConfigurator
            gist={props.gist}
            info={props.info}
            updateGist={props.updateGist}
            raiseEvent={props.raiseEvent}
          />
        </div>
      </aside>
    </div>
  );
};

Pattern.propTypes = {
  gist: PropTypes.object.isRequired,
  updateGist: PropTypes.func.isRequired,
  info: PropTypes.object.isRequired,
  raiseEvent: PropTypes.func.isRequired,
  Pattern: PropTypes.func.isRequired
};

export default Pattern;
