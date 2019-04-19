import React from "react";
import Logo from "./Logo";
import Emblem from "./Emblem";
import { i18n } from "@freesewing/i18n";
import { version } from "../../package.json";
import { FormattedMessage } from "react-intl";
import css from "./css/ButtonPicker.css";

const ButtonPicker = props => (
  <section>
    <div className={css.box}>
      <Logo size={250}/>
      { props.msgKey
        ? <h1><FormattedMessage id={props.msgKey} /></h1>
        : <div><Emblem size={52} color1="#61dafb" color2="#ffffff" text1="Free" text2="Sewing"/></div>
      }
      <div className={css.buttons}>
        {props.keys.map((key) => (
          <button key={key} className={css.picker} onClick={() => props.setChoice(key)}>
            <Emblem size={21} color1="#ffffff" text1={props.values[key]} text2=""/>
          </button>
        )
        )}
      </div>
    </div>
    <footer className={css.picker}>
      Freesewing workbench v{version}
      <br />
      <a className={css.link} href="https://freesewing.org">
        <Emblem size={16} color1="#61dafb" color2="#ffffff" text1="freesewing" text2=".org"/>
      </a>
      |
      <a className={css.link} href="https://freesewing.dev">
        <Emblem size={16} color1="#61dafb" color2="#ffffff" text1="freesewing" text2=".dev"/>
      </a>
    </footer>
  </section>
);

export default ButtonPicker;
