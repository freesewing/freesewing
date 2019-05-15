import React from "react";
import PropTypes from "prop-types";
import Logo from "../Logo";
import Emblem from "../Emblem";
import { FormattedMessage } from "react-intl";

const Navbar = props => {
  const renderNav = (key, nav) => {
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
        <button
          title={title}
          onClick={nav.onClick}
          key={key}
          className={nav.active ? "active" : ""}
        >
          {text}
        </button>
      );
    return (
      <a
        href={nav.href}
        className={nav.active ? "nav active" : "nav"}
        title={title}
        key={key}
      >
        {text}
      </a>
    );
  };

  let homeProps = {
    href: "#home"
  };
  if (typeof props.home === "function") homeProps.onClick = props.home;
  else homeProps.href = props.home;

  let logo = (
    <div className="logo">
      <a id="home" {...homeProps}>
        {props.logo}
      </a>
    </div>
  );
  let emblem = (
    <div className="emblem">
      <a {...homeProps}>{props.emblem}</a>
    </div>
  );

  return (
    <header className="navbar">
      <div>
        <div className="only-xs">
          {Object.keys(props.navs.mleft).map(key =>
            renderNav(key, props.navs.mleft[key])
          )}
        </div>
        <div className="not-xs">
          {logo}
          {emblem}
          {Object.keys(props.navs.left).map(key =>
            renderNav(key, props.navs.left[key])
          )}
        </div>
        <div className="spread">
          <div className="only-xs">
            {logo}
            {emblem}
          </div>
        </div>
        <div className="only-xs">
          {Object.keys(props.navs.mright).map(key =>
            renderNav(key, props.navs.mright[key])
          )}
        </div>
        <div className="not-xs">
          {Object.keys(props.navs.right).map(key =>
            renderNav(key, props.navs.right[key])
          )}
        </div>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  navs: PropTypes.object,
  logo: PropTypes.node,
  emblem: PropTypes.node,
  home: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  toggleMenu: PropTypes.func,
  toggleToc: PropTypes.func
};

Navbar.defaultProps = {
  home: "https://freesewing.org/",
  navs: { left: [], right: [] },
  logo: <Logo embed color="#e9ecef" />,
  emblem: <Emblem />
};
export default Navbar;
