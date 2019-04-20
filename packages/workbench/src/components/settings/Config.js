import React from "react";
import Emblem from "../Emblem";
import { FormattedMessage } from "react-intl";
import css from "../scss/Config.scss";

const Config = props => {
  console.log(props.pattern);
  const emblem = (t1, t2) => (
    <Emblem text1={t1} text2={t2} color1="#61dafb" color2="#fff" size={20} />
  );

  const renderConfig = () => {
    let c = props.pattern.config;
    let rows = [];
    for (let key of ["name", "version"])
      rows.push(
        <tr>
          <td>
            <span className={css.key}>{key}:</span>
            <span className={css.val}>{c[key]}</span>
          </td>
        </tr>
      );
    for (let key of ["measurements", "parts", "hide"]) {
      let list = [];
      if (typeof c[key] !== "undefined") {
        for (let item of c[key])
          list.push(
            <li>
              <span className={css.val}>{item}</span>
            </li>
          );
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
    for (let key of ["dependencies", "inject"]) {
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
            <th>{emblem("config", ".js")}</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  };

  return <div className={css.config}>{renderConfig()}</div>;
};
export default Config;
