import React, { useState } from "react";
import PropTypes from "prop-types";

const Svg = props => {
  let attributes = {
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:svg": "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    xmlLang: props.language,
    viewBox: `0 0 ${props.width} ${props.height}`,
    className: props.className
  };

  if (!props.embed) {
    attributes.width = props.width;
    attributes.height = props.height;
  }

  return <svg {...attributes}>{props.children}</svg>;
};

Svg.propTypes = {
  attributes: PropTypes.object,
  embed: PropTypes.bool,
  languages: PropTypes.string,
  className: PropTypes.string,
  design: PropTypes.bool
};

Svg.defaultProps = {
  embed: true,
  design: false,
  language: "en",
  className: "freesewing draft"
};

export default Svg;
