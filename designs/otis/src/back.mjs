import { pluginBundle } from '@freesewing/plugin-bundle'
import { adjustPoints, consoleLogPoints } from './utils.mjs'

function draftBack({
  options,
  Point,
  Path,
  points,
  paths,
  Snippet,
  snippets,
  complete,
  sa,
  paperless,
  macro,
  part,
}) {
  const w = 500 * options.size
  points.topLeft = new Point(0, 0)
  points.topRight = new Point(w, 0)
  points.bottomLeft = new Point(0, w / 2)
  points.bottomRight = new Point(w, w / 2)

  paths.box = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  points.p0 = new Point(98.8897, 26.2563)
  points.p0Cp1 = new Point(79.9137, 26.1003)
  points.p1 = new Point(71.8287, 11.5563)
  points.p1Cp1 = new Point(77.2407, 45.9003)
  points.p1Cp2 = new Point(94.0117, 18.4603)
  points.p2 = new Point(64.6117, 51.8473)
  points.p2Cp2 = new Point(74.1667, 51.5803)
  points.p3 = new Point(65.0127, 104.899)
  points.p3Cp1 = new Point(73.8997, 108.708)
  points.p4 = new Point(78.1927, 122.214)
  points.p4Cp1 = new Point(81.0847, 128.471)
  points.p4Cp2 = new Point(74.1497, 113.469)
  points.p5 = new Point(90.0697, 135.368)
  points.p5Cp1 = new Point(90.0027, 146.394)
  points.p5Cp2 = new Point(83.4547, 135.135)
  points.p6 = new Point(90.0697, 146.325)
  points.p7 = new Point(98.8227, 146.325)

  paths.seam = new Path()
    .move(points.p0)
    .curve(points.p0Cp1, points.p1Cp2, points.p1)
    .curve(points.p1Cp1, points.p2Cp2, points.p2)
    .line(points.p3)
    .curve(points.p3Cp1, points.p4Cp2, points.p4)
    .curve(points.p4Cp1, points.p5Cp2, points.p5)
    .line(points.p5)
    .line(points.p6)
    .line(points.p7)
    .line(points.p0)
    .close()

  adjustPoints(points, points.p0)
  consoleLogPoints(points)

  // Complete?
  if (complete) {
    points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    snippets.logo = new Snippet('logo', points.logo)
    points.text = points.logo
      .shift(-90, w / 8)
      .attr('data-text', 'hello')
      .attr('data-text-class', 'center')

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + sa + 15,
    })
    macro('vd', {
      from: points.bottomRight,
      to: points.topRight,
      x: points.topRight.x + sa + 15,
    })
  }

  return part
}

export const back = {
  name: 'back',
  measurements: ['waist'],
  options: {
    size: { pct: 50, min: 10, max: 100, menu: 'fit' },
  },
  plugins: [pluginBundle],
  draft: draftBack,
}
