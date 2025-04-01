import React, { useState } from 'react'
import {
  withinPartBounds,
  defaultComponents as patternComponents,
} from '@freesewing/react/components/Pattern'
import { H5, H6 } from '@freesewing/react/components/Heading'
import { KeyVal } from '@freesewing/react/components/KeyVal'
import { round } from '@freesewing/utils'

export const PointXray = ({
  stackName,
  pointName,
  part,
  point,
  settings,
  components,
  t,
  drillProps = {},
}) => {
  // Don't include parts outside the part bounding box
  if (!withinPartBounds(point, part)) return null

  const { info = {} } = drillProps

  /*
   * We use the Point component from Pattern here
   * If we would extract Point from the components passed down,
   * we'd create a recursion loop as the Point we call below
   * would be this very PointXray component.
   */
  const { Point } = patternComponents

  return (
    <>
      <Point {...{ stackName, pointName, part, point, settings, components, t, drillProps }} />
      <circle
        cx={point.x}
        cy={point.y}
        r={1.5 * (settings.scale || 1)}
        className="tw-opacity-70 hover:tw-cursor-pointer hover:tw-stroke-lg"
        style={{
          stroke: 'var(--pattern-contrast)',
        }}
      />
      <g className="hover:tw-cursor-pointer tw-opacity-0 hover:tw-opacity-100">
        <circle
          cx={point.x}
          cy={point.y}
          r={5 * (settings.scale || 1)}
          style={{
            stroke: 'none',
            fill: 'var(--pattern-lining)',
          }}
          className="hover:tw-cursor-pointer tw-opacity-0 hover:tw-opacity-30"
          onClick={() =>
            info?.set
              ? info.set(<PointXrayInfo {...{ point, pointName, part, stackName }} />)
              : null
          }
        ></circle>
        <text x={point.x + 3} y={point.y} className="text-sm">
          <tspan>{pointName}</tspan>
          <tspan x={point.x + 3} dy={5}>
            {round(point.x)},{round(point.y)}
          </tspan>
        </text>
      </g>
    </>
  )
}

const PointXrayInfo = ({ point, pointName, stackName, part }) => {
  const [rounded, setRounded] = useState(true)
  const rounder = rounded ? round : (val) => val

  return (
    <div className="tw-max-w-2xl tw-w-full">
      <H5>
        Point <code>{pointName}</code> of <code>{stackName}</code>
      </H5>
      <H6>
        <div className="tw-w-full tw-flex tw-flex-row tw-items-center tw-gap-1 tw-justify-between">
          <span>Coordinates</span>
          <button
            className="tw-daisy-btn tw-daisy-btn-primary tw-daisy-btn-sm tw-daisy-btn-outline"
            onClick={() => setRounded(!rounded)}
          >
            {rounded ? 'Show raw' : 'Show rounded'}
          </button>
        </div>
      </H6>
      <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-1 tw-items-center">
        <KeyVal k="x" val={rounder(point.x)} />
        <KeyVal k="y" val={rounder(point.y)} />
      </div>
      {Object.keys(point.attributes.list).length > 0 ? (
        <>
          <H6>Attributes</H6>
          <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-1 tw-items-center">
            {Object.entries(point.attributes.list).map(([k, val]) => (
              <KeyVal color="secondary" key={k} k={k} val={val} />
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}
