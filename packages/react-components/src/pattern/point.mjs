// eslint-disable-next-line no-unused-vars
import React from 'react'
import { withinPartBounds } from './utils.mjs'

export const Point = ({ stackName, partName, pointName, part, point, components, t }) => {
  // Don't include points outside the part bounding box
  if (!withinPartBounds(point, part)) return null

  // Get potentially swizzled components
  const { Circle, Text } = components

  return point.attributes ? (
    <>
      {point.attributes.text ? <Text {...{ point, pointName, partName, stackName, t }} /> : null}
      {point.attributes.circle ? <Circle point={point} /> : null}
    </>
  ) : null
}
