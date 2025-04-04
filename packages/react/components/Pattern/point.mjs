// eslint-disable-next-line no-unused-vars
import React from 'react'
import { withinPartBounds } from './utils.mjs'

export const Point = ({ stackName, partName, pointName, part, point, components, strings }) => {
  /*
   * Don't include points outside the part bounding box
   * Unless the `data-render-always` attribute is set
   */
  if (!withinPartBounds(point, part) && !point.attributes.list['data-render-always']) return null

  // Get potentially swizzled components
  const { Circle, Text } = components

  return point.attributes ? (
    <>
      {point.attributes.text ? (
        <Text {...{ point, pointName, partName, stackName, strings }} />
      ) : null}
      {point.attributes.circle ? <Circle point={point} /> : null}
    </>
  ) : null
}
