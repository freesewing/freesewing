// eslint-disable-next-line no-unused-vars
import React from 'react'

export const Circle = ({ point }) =>
  point.attributes.list['data-circle'].map((r, i) => {
    const circleProps = point.attributes.circleProps
    const extraProps = {}
    for (const prop in circleProps) {
      const val = point.attributes.list[`data-circle-${prop === 'className' ? 'class' : prop}`]
      if (val.length >= i) extraProps[prop] = val[i]
      else extraProps[prop] = val.join(' ')
    }

    return <circle key={r} cx={point.x} cy={point.y} r={r} {...extraProps} />
  })
