import React from 'react'
import {
  withinPartBounds,
  defaultComponents as patternComponents,
} from '@freesewing/react/components/Pattern'

export const PointXray = ({ stackName, pointName, part, point, settings, components, t }) => {
  // Don't include parts outside the part bounding box
  if (!withinPartBounds(point, part)) return null

  /*
   * We use the Point component from Pattern here
   * If we would extract Point from the components passed down,
   * we'd create a recursion loop as the Point we call below
   * would be this very PointXray component.
   */
  const { Point } = patternComponents
  return (
    <>
      <Point {...{ stackName, pointName, part, point, settings, components, t }} />
      <circle
        cx={point.x}
        cy={point.y}
        r={1.5 * (settings.scale || 1)}
        className="stroke-md opacity-70"
      />
    </>
  )
}
