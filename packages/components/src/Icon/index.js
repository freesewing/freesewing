import React from "react";
import PropTypes from "prop-types";
import icons from "./icons";

const Icon = props => {
  return (
    <svg
      style={props.style}
      className={props.className}
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
  icon: PropTypes.string,
  style: PropTypes.object
};

Icon.defaultProps = {
  size: 24,
  viewBox: "0 0 24 24",
  className: "",
  icon: "github",
  color: false,
  style: {}
};

export default Icon;
