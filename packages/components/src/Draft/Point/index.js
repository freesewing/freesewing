import React, { useState } from "react";
import PropTypes from "prop-types";
import Text from "../Text";
import Circle from "../Circle";

const Point = props => {
  const output = [];
  if (props.point.attributes.get("data-text"))
    output.push(<Text {...props} key={"point-" + props.name} />);
  if (props.point.attributes.get("data-circle"))
    output.push(<Circle point={props.point} key={"circle-" + props.name} />);
  if (output.length < 1) return null;
  else return output;
};

Point.propTypes = {
  point: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired
};

export default Point;
