import React from "react";
import logoPathString from "./logo-path";

const Snippets = props => {
  const fill = { fill: "currentColor", stroke: "none" };
  const stroke = { fill: "none", stroke: "currentColor" };
  return [
    <g id="notch" className="snippet notch" key="notch">
      <circle cy="0" cx="0" r="1.4" {...fill} />
      <circle cy="0" cx="0" r="2.8" {...stroke} />
    </g>,
    <g id="bnotch" className="snippet bnotch" key="bnotch">
      <path d="M -1.1 -1.1 L 1.1 1.1 M 1.1 -1.1 L -1.1 1.1" {...stroke} />
      <circle cy="0" cx="0" r="2.8" {...stroke} />
    </g>,
    <g id="button" className="snippet button" key="button">
      <circle cx="0" cy="0" r="3.4" {...stroke} /> />
      <circle cx="-1" cy="-1" r="0.5" {...fill} />
      <circle cx="1" cy="-1" r="0.5" {...fill} />
      <circle cx="1" cy="1" r="0.5" {...fill} />
      <circle cx="-1" cy="1" r="0.5" {...fill} />
    </g>,
    <g id="buttonhole" className="snippet buttonhole" key="buttonhole">
      <path d="M -1,-5 L 1,-5 L 1,5 L -1,5 z" {...stroke} />
      <path
        d="M -1,-5 L 1,-5 L 1,-4 L -1,-4 z M -1,5 L 1,5 L 1,4 L -1,4 z"
        {...fill}
      />
    </g>,
    <g
      id="logo"
      className="snippet logo"
      transform="translate(-23 -36)"
      key="logo"
    >
      <path d={logoPathString} {...fill} />
    </g>
  ];
};

export default Snippets;
