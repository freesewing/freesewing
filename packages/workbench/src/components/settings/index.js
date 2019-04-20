import React from "react";
import Emblem from "../Emblem";
import { FormattedMessage } from "react-intl";
import css from "../scss/Settings.scss";
import Config from "./Config";
import ResolvedConfig from "./ResolvedConfig";
import Options from "./Options";
import Measurements from "./Measurements";
import Complete from "./options/draft-complete";

const Settings = props => {
  let pattern = new props.freesewing.patterns[props.pattern]();
  return (
    <section>
      <div className={css.wrapper}>
        <Options pattern={pattern} />
        <Measurements pattern={pattern} />
        <div>
          <Complete
            pattern={props.pattern}
            gist={{
              complete: false
            }}
            updateGist={props.updateGist}
          />
        </div>
      </div>
    </section>
  );
};

//<Config pattern={pattern} />
//<ResolvedConfig pattern={pattern} />

export default Settings;
