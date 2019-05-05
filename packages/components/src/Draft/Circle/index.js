import React, { useState } from "react";
import PropTypes from "prop-types";

const Circle = props => {
  return null;
  let foo = (
    <circle
      cx={props.point.x}
      cy={props.point.y}
      r={props.point.attributes.get("data-circle")}
      {...props.point.attributes.asPropsIfPrefixIs("data-circle-")}
    />
  );
};

Circle.propTypes = {
  point: PropTypes.object.isRequired
};

export default Circle;
