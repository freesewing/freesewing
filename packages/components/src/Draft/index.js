import React from 'react'
import Svg from './Svg'
import Defs from './Defs'
import Part from './Part'

const Draft = (props) => (
  <Svg
    embed={props.settings.embed}
    width={props.width}
    height={props.height}
    language={props.settings.locale}
    id={props.settings.idPrefix + 'svg'}
    design={props.design || false}
    style={props.style || {}}
    viewBox={props.viewBox}
    className={props.className || 'freesewing draft pattern'}
  >
    <Defs {...props} />
    <g>
      {Object.keys(props.parts).map((name) => (
        <Part
          part={props.parts[name]}
          language={props.settings.locale}
          paperless={props.settings.paperless}
          units={props.settings.units}
          scale={props.settings.scale}
          key={name}
          name={name}
          focus={props.focus || false}
          design={props.design || false}
          raiseEvent={props.raiseEvent}
        />
      ))}
    </g>
  </Svg>
)

export default Draft
