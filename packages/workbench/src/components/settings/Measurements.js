import React from "react";
import Emblem from "../Emblem";
import { FormattedMessage } from "react-intl";
import css from "../scss/Config.scss";

const Measurements = props => {
  const emblem = (t1, t2) => (
    <Emblem text1={t1} text2={t2} color1="#61dafb" color2="#fff" size={20} />
  );

  return (
    <div className={css.config}>
      <table className={css.config}>
        <thead>
          <tr>
            <th>
              <FormattedMessage id="app.measurements" />
            </th>
          </tr>
        </thead>
        <tbody />
      </table>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
};
export default Measurements;
