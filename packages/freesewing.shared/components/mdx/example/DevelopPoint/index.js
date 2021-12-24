import React from 'react'

const DevelopPoint = (props) => (
  <g className={props.className}>
    <circle cx={props.point.x} cy={props.point.y} r="2" className="center" />
    <circle
      cx={props.point.x}
      cy={props.point.y}
      r="7.5"
      className="hovertrap"
      onClick={() =>
        props.raiseEvent('point', {
          point: props.point,
          name: props.name,
          part: props.part
        })
      }
    />
  </g>
)

export default DevelopPoint
