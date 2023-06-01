import React from 'react'

export const Grid = ({ part, partName, settings }) => (
  <rect
    x={part.topLeft.x}
    y={part.topLeft.y}
    width={part.width}
    height={part.height}
    className="grid"
    fill={'url(#grid-' + partName + ')'}
  />
)
