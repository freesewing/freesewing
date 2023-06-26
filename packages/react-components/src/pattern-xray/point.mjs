// Components
import { Point } from '../pattern/point.mjs'
import { withinPartBounds } from '../pattern/utils.mjs'

export const PointXray = ({ stackName, pointName, part, point, settings, components, t }) => {
  // Don't include parts outside the part bounding box
  if (!withinPartBounds(point, part)) return null
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
