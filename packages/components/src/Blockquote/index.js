import React from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";

const Blockquote = ({ type, children, style }) => {
  return (
    <blockquote className={type} style={style}>
      {children}
      <Icon icon={type} className={"icon " + type} />
    </blockquote>
  );
};

Blockquote.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node,
  style: PropTypes.object
};

Blockquote.defaultProps = {
  type: "note",
  children: null,
  style: {}
};
export default Blockquote;
