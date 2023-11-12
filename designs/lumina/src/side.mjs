import { ipoints } from './ipoints.mjs'

export const side = {
  name: 'lumina.ipoints',
  after: ipoints,
  measurements: [
    'waist',
    'waistBack',
    'hips',
    'seat',
    'seatBack',
    'inseam',
    'waistToSeat',
    'waistToUpperLeg',
    'waistToKnee',
    'waistToHips',
    'waistToFloor',
    'knee',
    'ankle',
    'crossSeam',
    'crossSeamFront',
    'heel',
    'upperLeg',
  ],
  options: {
    size: { pct: 50, min: 10, max: 100, menu: 'fit' },
    crossSeamAngle: 25,
    crotchToKnee: 0.5,
    waistToKneeCP: 0.4,
    kneeToWaistLength: 400,
  },
  draft: ({
    measurements,
    options,
    Point,
    Path,
    points,
    paths,
    Snippet,
    snippets,
    utils,
    log,
    complete,
    sa,
    paperless,
    macro,
    part,
  }) => {
    points.sideWaist = new Point(0, 0)
    points.sideWaistFront = points.sideWaist.shift()
  },
}
