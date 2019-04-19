import React from "react";
import Emblem from "../Emblem";
import { FormattedMessage } from "react-intl";
import css from "../css/Config.css";

const Options = props => {
  const emblem = (t1, t2) =>
    <Emblem text1={t1} text2={t2} color1="#61dafb" color2="#fff" size={20}/>

  const renderOptions = () => {
    let c = props.pattern.config;
    let rows = [];
    if (typeof c.options !== "undefined") {
      let list = [];
      for (let item of Object.keys(c.options).sort()) {
        let values = null;
        if (typeof c.options[item] === "boolean") {
          rows.push(<tr><td>
            <span className={css.key}>{item}:</span>
            <span className={css.true}>{c.options[item] ? "TRUE" : "FALSE"}</span>
          </td></tr>);
        } else if (typeof c.options[item] !== "object") {
          rows.push(<tr><td>
            <span className={css.key}>{item}:</span>
            <span className={css.val}>{c.options[item]}</span>
          </td></tr>);
        } else {
          if (typeof c.options[item].pct !== "undefined") {
            rows.push(<tr><td>
              <span className={css.key}>{item}:</span>
              <span className={css.val}>
                {c.options[item].min}%
                {" / "}
                <b>{c.options[item].pct}%</b>
                {" / "}
                {c.options[item].max}%
              </span>
            </td></tr>);
          } else if (typeof c.options[item].deg !== "undefined") {
            rows.push(<tr><td>
              <span className={css.key}>{item}:</span>
              <span className={css.val}>
                {c.options[item].min}&deg;
                {" / "}
                <b>{c.options[item].deg}&deg;</b>
                {" / "}
                {c.options[item].max}&deg;
              </span>
            </td></tr>);
          } else if (typeof c.options[item].mm !== "undefined") {
            rows.push(<tr><td>
              <span className={css.key}>{item}:</span>
              <span className={css.val}>
                {c.options[item].min}mm;
                {" / "}
                <b>{c.options[item].mm}mm</b>
                {" / "}
                {c.options[item].max}mm
              </span>
            </td></tr>);
          } else if (typeof c.options[item].bool !== "undefined") {
            rows.push(<tr><td>
              <span className={css.key}>{item}:</span>
              {c.options[item].bool
                ? <React.Fragment><span className={css.true}>TRUE</span><span> / FALSE</span></React.Fragment>
                : <React.Fragment><span>TRUE / </span><span className={css.false}>FALSE</span></React.Fragment>
              }
            </td></tr>);
          } else if (typeof c.options[item].list !== "undefined") {
            let list = [];
            for (let opt of c.options[item].list) {
              if (opt === c.options[item].dflt) list.push(<li><b>{opt}</b> &laquo;</li>);
              else list.push(<li>{opt}</li>);
            }
            rows.push(<tr><td>
              <span className={css.key}>{item}:</span>
              <ul className={css.config}>{list}</ul>
            </td></tr>);
          } else {
            rows.push(<tr><td>
              <span className={css.key}>{item}:</span>
              <span className={css.val}>FIXME</span>
            </td></tr>);
          }
        }
      }
    } else return null;
    return (
      <table className={css.config}>
        <thead>
          <tr><th>{emblem(c.name+".config",".options")}</th></tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }

  return (
    <div className={css.config}>
      {renderOptions()}
    </div>
  );
}
export default Options;
