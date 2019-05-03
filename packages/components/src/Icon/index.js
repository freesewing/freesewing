import React from "react";
import PropTypes from "prop-types";
import icons from "./icons";

const Icon = props => {
  return (
    <svg
      className={props.classes}
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox={props.viewBox}
    >
      <path
        stroke="none"
        fill={props.color ? props.color : "currentColor"}
        d={icons[props.icon]}
      />
    </svg>
  );
};

Icon.propTypes = {
  size: PropTypes.number,
  viewBox: PropTypes.string,
  pathString: PropTypes.string.isRequired
};

Icon.defaultProps = {
  size: 24,
  viewBox: "0 0 24 24",
  className: "",
  icon: "github",
  color: false
};

export default Icon;
