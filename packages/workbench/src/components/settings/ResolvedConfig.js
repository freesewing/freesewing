import React from "react";
import Emblem from "../Emblem";
import { FormattedMessage } from "react-intl";
import css from "../scss/Config.scss";

const ResolvedConfig = props => {
  const emblem = (t1, t2) => (
    <Emblem text1={t1} text2={t2} color1="#61dafb" color2="#fff" size={20} />
  );

  const renderResolvedConfig = () => {
    let c = props.pattern.config;
    let rows = [];
    let list = [];
    if (typeof c.draftOrder !== "undefined") {
      for (let item of c.draftOrder)
        list.push(
          <li>
            <span className={css.val}>{item}</span>
          </li>
        );
      rows.push(
        <tr>
          <td>
            <span className={css.key}>draftOrder:</span>
            <ol className={css.config}>{list}</ol>
          </td>
        </tr>
      );
    } else
      rows.push(
        <tr>
          <td>
            <span className={css.key}>draftOrder:</span>
          </td>
        </tr>
      );
    for (let key of ["resolvedDependencies"]) {
      if (typeof c[key] !== "undefined") {
        let list = [];
        for (let item of Object.keys(c[key])) {
          let values = null;
          if (typeof c[key][item] === "string") {
            list.push(
              <li>
                <span className={css.subkey}>
                  {item}
                  {key === "inject" ? " «" : ":"}
                </span>
                <span className={css.val}>{c[key][item]}</span>
              </li>
            );
          } else if (c[key][item].length > 0) {
            list.push(
              <li>
                <span className={css.subkey}>{item}:</span>
                <span className={css.val}>
                  {c[key][item].map(v => v + " ")}
                </span>
              </li>
            );
          }
        }
        rows.push(
          <tr>
            <td>
              <span className={css.key}>{key}:</span>
              <ul className={css.config}>{list}</ul>
            </td>
          </tr>
        );
      } else
        rows.push(
          <tr>
            <td>
              <span className={css.key}>{key}:</span>
            </td>
          </tr>
        );
    }
    return (
      <table className={css.config}>
        <thead>
          <tr>
            <th>{emblem(c.name, ".config")}</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  };

  return <div className={css.config}>{renderResolvedConfig()}</div>;
};
export default ResolvedConfig;
