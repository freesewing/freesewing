import React, { useState } from "react";
import PropTypes from "prop-types";
import Text from "../Text";
import Circle from "../Circle";

const Snippet = props => {
  const snippetProps = {
    xlinkHref: "#" + props.snippet.def,
    x: props.snippet.anchor.x,
    y: props.snippet.anchor.y
  };
  let scale = props.snippet.attributes.get("data-scale");
  let rotate = props.snippet.attributes.get("data-rotate");
  if (scale || rotate) {
    snippetProps.transform = "";
    if (scale) {
      snippetProps.transform += `translate(${snippetProps.x}, ${
        snippetProps.y
      }) `;
      snippetProps.transform += `scale(${scale}) `;
      snippetProps.transform += `translate(${snippetProps.x *
        -1}, ${snippetProps.y * -1}) `;
    }
    if (rotate) {
      snippetProps.transform += `rotate(${rotate}, ${snippetProps.x}, ${
        snippetProps.y
      }) `;
    }
  }

  return <use {...snippetProps} />;
};

Snippet.propTypes = {
  snippet: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired
};

export default Snippet;
