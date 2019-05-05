import React, { useState } from "react";
import PropTypes from "prop-types";
import Path from "../Path";
import Point from "../Point";
import { getProps } from "../utils";

const Part = props => {
  return (
    <g {...getProps(props.part)}>
      {Object.keys(props.part.points).map(name => (
        <Point
          key={name}
          name={name}
          language={props.language}
          point={props.part.points[name]}
        />
      ))}
      {Object.keys(props.part.paths).map(name => (
        <Path key={name} name={name} path={props.part.paths[name]} />
      ))}
    </g>
  );
};

Part.propTypes = {
  part: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired
};

export default Part;
