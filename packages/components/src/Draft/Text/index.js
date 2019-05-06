import React, { useState } from "react";
import PropTypes from "prop-types";
import { strings } from "@freesewing/i18n";

const Text = props => {
  let text = [];
  // Handle translation
  let translated = "";
  for (let string of props.point.attributes.getAsArray("data-text")) {
    if (strings[props.language]["plugin." + string])
      translated += strings[props.language]["plugin." + string];
    else translated += string;
    translated += " ";
  }
  // Handle muti-line text
  if (translated.indexOf("\n") !== -1) {
    let key = 0;
    let lines = translated.split("\n");
    text.push(<tspan key={"tspan-" + key}>{lines.shift()}</tspan>);
    for (let line of lines) {
      key++;
      text.push(
        <tspan
          key={"tspan-" + key}
          x={props.point.x}
          dy={props.point.attributes.get("data-text-lineheight") || 12}
        >
          {line}
        </tspan>
      );
    }
  } else text.push(<tspan key="tspan-1">{translated}</tspan>);
  return (
    <text
      x={props.point.x}
      y={props.point.y}
      {...props.point.attributes.asPropsIfPrefixIs("data-text-")}
    >
      {text}
    </text>
  );
};

Text.propTypes = {
  point: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired
};

export default Text;
