import React from "react";
import PropTypes from "prop-types";
import Svg from "./Svg";
import Defs from "./Defs";
import Part from "./Part";

const Draft = props => (
  <Svg
    embed={props.settings.embed}
    width={props.width}
    height={props.height}
    language={props.settings.locale}
    id={props.settings.idPrefix + "svg"}
  >
    <Defs
      units={props.settings.units}
      parts={props.parts}
      paperless={props.settings.paperless}
      design={props.design}
    />
    <g>
      {Object.keys(props.parts).map(name => (
        <Part
          part={props.parts[name]}
          language={props.settings.locale}
          paperless={props.settings.paperless}
          units={props.settings.units}
          key={name}
          name={name}
          focus={props.focus}
          design={props.design}
          raiseEvent={props.raiseEvent}
        />
      ))}
    </g>
  </Svg>
);

Draft.propTypes = {
  parts: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  design: PropTypes.bool
};

Draft.defaultProps = {
  design: false,
  focus: false
};

export default Draft;
