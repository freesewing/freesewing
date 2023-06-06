import React from 'react'

export const Grid = ({ stack, stackName }) => (
  <rect
    x={stack.topLeft.x}
    y={stack.topLeft.y}
    width={stack.width}
    height={stack.height}
    className="grid"
    fill={'url(#grid-' + stackName + ')'}
  />
)
