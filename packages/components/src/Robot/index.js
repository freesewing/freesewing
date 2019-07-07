import React from "react";
import PropTypes from "prop-types";
import poses from "./poses";

const Robot = props => {
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      width={props.embed ? "" : props.size}
      height={props.embed ? "" : props.size}
      viewBox={props.viewBox}
    >
      <path
        stroke="none"
        fill={props.color ? props.color : "currentColor"}
        d={poses[props.pose]}
      />
    </svg>
  );
};

Robot.propTypes = {
  size: PropTypes.number,
  viewBox: PropTypes.string,
  pose: PropTypes.string,
  embed: PropTypes.bool
};

Robot.defaultProps = {
  size: 124,
  viewBox: "0 0 500 500",
  className: "",
  pose: "yay",
  color: false
};

export default Robot;
