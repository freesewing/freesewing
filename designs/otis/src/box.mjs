import { pluginBundle } from '@freesewing/plugin-bundle'

function draftBox({
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
  points.p1 = new Point(98.8227, 146.325)
  points.p2 = new Point(90.0027, 146.394)
  points.p3 = new Point(90.0697, 135.368)
  points.p4 = new Point(83.4547, 135.135)
  points.p5 = new Point(81.0847, 128.471)
  points.p6 = new Point(78.1927, 122.214)
  points.p7 = new Point(74.1497, 113.469)
  points.p8 = new Point(73.8997, 108.708)
  points.p9 = new Point(65.0127, 104.899)
  points.p10 = new Point(64.6117, 51.8473)
  points.p11 = new Point(74.1667, 51.5803)
  points.p12 = new Point(77.2407, 45.9003)
  points.p13 = new Point(71.8287, 11.5563)
  points.p14 = new Point(94.0117, 18.4603)
  points.p15 = new Point(79.9137, 26.1003)
  points.p16 = new Point(98.8897, 26.2563)

  paths.seam = new Path()
    .move(points.p0)
    .line(points.p1)
    .line(points.p2)
    .line(points.p3)
    .curve(points.p4, points.p5, points.p6)
    .curve(points.p7, points.p8, points.p9)
    .line(points.p10)
    .curve(points.p11, points.p12, points.p13)
    .curve(points.p14, points.p15, points.p16)
    .close()

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

export const box = {
  name: 'box',
  options: {
    size: { pct: 50, min: 10, max: 100, menu: 'fit' },
  },
  plugins: [pluginBundle],
  draft: draftBox,
}
