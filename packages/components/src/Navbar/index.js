import React from "react";
import PropTypes from "prop-types";
import Logo from "../Logo";
import Emblem from "../Emblem";
import { FormattedMessage } from "react-intl";

const Navbar = props => {

  const renderNav = nav => {
    let title = nav.title || nav.text;
    let text = typeof nav.text === "string"
      ? <FormattedMessage id={nav.text} />
      : nav.text
    if (nav.type === "component") return nav.component
    return <a href={nav.href} className="nav" title={nav.title}>{text}</a>
  }

  return (
    <header className="navbar">
      <div>
        <div className="logo">{props.logo}</div>
        <div className="emblem">{props.emblem}</div>
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
};

Navbar.defaultProps = {
  navs: {left:[], right: []},
  logo: <Logo size={32} />,
  emblem: <Emblem t1="Free" t2="Sewing" size={20} c1="#74c0fc" c2="#e9ecef"/>
};
export default Navbar;
