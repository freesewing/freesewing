import React from "react";
import Logo from "./Logo";
import Emblem from "./Emblem";
import css from "./scss/NavBar.scss";
import { FormattedMessage } from "react-intl";

const NavBar = props => {
  const goToHelp = () =>
    (window.location.href =
      "https://freesewing.dev/" + props.locale + "/workbench");

  return (
    <header className={css.navbar}>
      {props.empty ? (
        ""
      ) : (
        <React.Fragment>
          <div className={css.logo}>
            <Logo size={36} />
          </div>
          <a href="https://freesewing.org/" className={css.navbar}>
            <Emblem
              size={20}
              color1="#61dafb"
              color2="#ffffff"
              text1="Free"
              text2="Sewing"
            />
          </a>
          <div className={css.right}>
            {props.pattern ? (
              <React.Fragment>
                <button className={css.navbar} onClick={props.toggleSettings}>
                  <Emblem
                    size={16}
                    text1={<FormattedMessage id="app.settings" />}
                    color1="#fff"
                  />
                </button>
                <button className={css.navbar} onClick={props.clearPattern}>
                  <Emblem size={16} text1={props.pattern} color1="#fff" />
                </button>
              </React.Fragment>
            ) : (
              ""
            )}
            <button className={css.navbar} onClick={props.clearLanguage}>
              <Emblem size={16} text1={props.language} color1="#fff" />
            </button>
            <button className={css.navbar} onClick={goToHelp}>
              <Emblem size={16} text1="?" color1="#fff" />
            </button>
          </div>
        </React.Fragment>
      )}
    </header>
  );
};
export default NavBar;
