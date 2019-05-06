import React, { useState } from "react";
import PropTypes from "prop-types";
import Path from "../Path";
import Point from "../Point";
import Snippet from "../Snippet";
import { getProps } from "../utils";

const Part = props => {
  console.log(props.part);
  let grid = props.paperless ? (
    <rect
      x={props.part.topLeft.x}
      y={props.part.topLeft.y}
      width={props.part.width}
      height={props.part.height}
      className="grid"
      fill={"url(#grid-" + props.name + ")"}
    />
  ) : null;

  return (
    <g {...getProps(props.part)}>
      {grid}
      {Object.keys(props.part.points).map(name => (
        <Point
          key={name}
          name={name}
          part={props.name}
          language={props.language}
          point={props.part.points[name]}
        />
      ))}
      {Object.keys(props.part.paths).map(name => (
        <Path
          key={name}
          name={name}
          part={props.name}
          language={props.language}
          path={props.part.paths[name]}
        />
      ))}
      {Object.keys(props.part.snippets).map(name => (
        <Snippet key={name} name={name} snippet={props.part.snippets[name]} />
      ))}
    </g>
  );
};

Part.propTypes = {
  part: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  paperless: PropTypes.bool.isRequired,
  units: PropTypes.oneOf(["metric", "imperial"]).isRequired
};

export default Part;
