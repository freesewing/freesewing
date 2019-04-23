import React from "react";
import { FormattedMessage } from "react-intl";
import { strings } from "@freesewing/i18n";

const Complete = props => {
  let complete, incomplete;
  if (props.gist.complete) complete = "checked";
  else incomplete = "checked";
  return (
    <div className="option draft">
      <header>
        <h5 className="do-title"><FormattedMessage id="settings.complete.title" /></h5>
        <p className="do-description"><FormattedMessage id="settings.complete.description" /></p>
      </header>
      <ul className="radio">
        <li>
          <label>
            <input
              type="radio"
              name="complete"
              value={1}
              onChange={evt => props.updateGist("complete", true)}
              checked={props.gist.complete}
            />
            <FormattedMessage id="app.yes" />
          </label>
        </li>
        <li>
          <label>
            <input
              type="radio"
              name="complete"
              value={0}
              onChange={evt => props.updateGist("complete", false)}
              checked={props.gist.complete}
            />
            <FormattedMessage id="app.no" />
          </label>
        </li>
      </ul>
    </div>
  );
}
export default Complete;
