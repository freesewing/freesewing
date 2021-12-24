import React from 'react'
import Svg from './Svg'
import Defs from './Defs'
import Part from './Part'

const Pattern = (props) => (
  <Svg
    embed={props.settings.embed}
    width={props.width}
    height={props.height}
    language={props.settings.locale}
    id={props.settings.idPrefix + 'svg'}
    design={props.design || false}
    style={props.style || {}}
    viewBox={props.viewBox}
    className={props.className || 'freesewing pattern'}
  >
    <Defs {...props} />
    <style>{`:root { --pattern-scale: ${props.settings.scale || 1}}`}</style>
    <g>
      {Object.keys(props.parts).map((name) => (
        <Part
          part={props.parts[name]}
          language={props.settings.locale}
          paperless={props.settings.paperless}
          units={props.settings.units}
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

export default Pattern
