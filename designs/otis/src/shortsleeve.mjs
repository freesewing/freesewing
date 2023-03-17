import { pluginBundle } from '@freesewing/plugin-bundle'
import { back } from './back.mjs'

import {
  adjustPoints,
  consoleLogPoints,
  scalePoints,
  addPoint,
  addPointX,
  addPointY,
  makeRelativePoints,
} from './utils.mjs'

function draftShortsleeve({
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
  measurements,
  store,
  macro,
  utils,
  part,
}) {
  const hem = options.hem
  const waist = store.get('waist')
  const ease = store.get('ease')
  const armhole = store.get('armhole')
  const sideseam = store.get('sideseam')
  store.set('hem', 117 * (ease + 1) * hem)

  // points.p0 = new Point(28.8651,217.02)
  // points.p1 = new Point(31.7721,216.886)
  // points.p2 = new Point(46.8391,218.623)
  // points.p2Cp1 = new Point(46.4601,201.116)
  // points.p3Cp2 = new Point(64.1311,207.617)
  // points.p3 = new Point(64.0771,184.144)
  // points.p4 = new Point(28.8651,184.144)

  // points.p0 = new Point(0,0)
  // points.p1 = new Point(13.144291199999985,-0.6058944000000659)
  // points.p2 = new Point(81.2712384,7.248124799999911)
  // points.p2Cp1 = new Point(79.55755199999999,-71.91152639999999)
  // points.p3Cp2 = new Point(159.45874560000004,-42.516604800000096)
  // points.p3 = new Point(159.21457920000003,-148.65212160000004)
  // points.p4 = new Point(0,-148.65212160000004)

  points.p0 = new Point(0, 0)
  points.p0Cp2 = new Point(0.24416640000001166, 96.61051679999994)
  points.p1 = new Point(-149.68957920000003, 0)
  points.p2 = new Point(-149.68957920000003, 139.12712160000004)
  points.p3 = new Point(-136.54528800000003, 138.52122719999997)
  points.p4 = new Point(-77.94334080000003, 146.37524639999995)
  points.p4Cp1 = new Point(-79.65702720000004, 67.21559520000005)
  adjustPoints(points, points.p0)
  consoleLogPoints(points)

  makeRelativePoints(Point, points, points.p0, waist, ease)

  // points.cp0 = points.p0.clone()
  // points.cp1 = points.p1.clone()
  // points.cp2 = points.p2.clone()
  // points.cp2Cp1 = points.p2Cp1.clone()
  // points.cp3Cp2 = points.p3Cp2.clone()
  // points.cp3 = points.p3.clone()
  // points.cp4 = points.p4.clone()

  // adjustPoints(points, points.p0)

  points.rp0 = new Point(0, 0)
  points.rp0Cp2 = points.rp0.shift(270, 84.74633802080332 * (ease + 1))
  points.rp1 = points.rp0.shift(180, 117 * (ease + 1))
  // points.rp2 = points.rp0.shift(222.90554129891476,179.2638371337618 * (ease + 1))
  points.rp2 = points.rp1.shift(270, 121 * (ease + 1))
  // points.rp3 = points.p0.shift(225.41157692113333,170.61966359722516 * (ease + 1))
  points.rp3 = points.rp0.shift(241.96514949510785, 145.46831943365956 * (ease + 1))
  points.rp3Cp1 = points.rp3.shift(91.24017302101714, 69.4545599851181 * (ease + 1))

  let diff = 10
  let iter = 1
  do {
    paths.armhole = new Path()
      .move(points.rp3)
      .curve(points.rp3Cp1, points.rp0Cp2, points.rp0)
      .hide()

    diff = armhole - paths.armhole.length()
    console.log({ diffa: diff })
    if (diff < -1 || diff > 1) {
      points.rp3 = points.rp0.shift(241.96514949510785, 145.46831943365956 * (ease + 1) + diff)
    }
    iter++
  } while ((diff < -1 || diff > 1) & (iter < 100))

  points.rp1hm = points.rp1.shift(0, 117 * (ease + 1) * hem)
  points.rp2hm = utils.beamIntersectsX(points.rp2, points.rp3, points.rp1hm.x)
  points.rp1h = points.rp1hm.flipX(points.rp1)
  points.rp2h = points.rp2hm.flipX(points.rp2)

  paths.seam = new Path()
    .move(points.p0)
    .line(points.p1)
    .line(points.p2)
    .line(points.p3)
    .line(points.p4)
    .curve(points.p4Cp1, points.p0Cp2, points.p0)
    .close()

  paths.seam2 = new Path()
    .move(points.rp0)
    .line(points.rp1)
    .line(points.rp1h)
    .line(points.rp2h)
    .line(points.rp2)
    // .line(points.rp3)
    .line(points.rp3)
    .curve(points.rp3Cp1, points.rp0Cp2, points.rp0)
    .close()
    .attr('class', 'lining')

  // scalePoints(points, 4.5216)

  // adjustPoints(points, points.p0)

  // consoleLogPoints(points)

  // Complete?
  if (complete) {
    // points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    // snippets.logo = new Snippet('logo', points.logo)
    // points.text = points.logo
    //   .shift(-90, w / 8)
    //   .attr('data-text', 'hello')
    //   .attr('data-text-class', 'center')

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

export const shortsleeve = {
  name: 'shortsleeve',
  after: back,
  options: {
    hem: { pct: 10, min: 0, max: 30, menu: 'advanced' },
  },
  plugins: [pluginBundle],
  draft: draftShortsleeve,
}
