import React from "react";
import PropTypes from "prop-types";
import Logo from "../Logo";
import Emblem from "../Emblem";
import { FormattedMessage } from "react-intl";

const Navbar = props => {
  const renderNav = nav => {
    let title = nav.title || nav.text;
    let text =
      typeof nav.text === "string" ? (
        <FormattedMessage id={nav.text} />
      ) : (
        nav.text
      );
    if (nav.type === "component") return nav.component;
    else if (nav.type === "button")
      return (
        <button title={title} onClick={nav.onClick}>
          {text}
        </button>
      );
    return (
      <a href={nav.href} className="nav" title={title}>
        {text}
      </a>
    );
  };

  return (
    <header className="navbar">
      <div>
        <div className="logo">
          <a href={props.home}>{props.logo}</a>
        </div>
        <div className="emblem">
          <a href={props.home}>{props.emblem}</a>
        </div>
        {props.navs.left.map(nav => renderNav(nav))}
        <div className="spread" />
        {props.navs.right.map(nav => renderNav(nav))}
      </div>
    </header>
  );
};

Navbar.propTypes = {
  navs: PropTypes.object,
  logo: PropTypes.node,
  emblem: PropTypes.node,
  home: PropTypes.string
};

Navbar.defaultProps = {
  home: "https://freesewing.org/",
  navs: { left: [], right: [] },
  logo: <Logo size={32} color="#e9ecef" />,
  emblem: <Emblem t1="Free" t2="Sewing" size={20} c1="#74c0fc" c2="#e9ecef" />
};
export default Navbar;
