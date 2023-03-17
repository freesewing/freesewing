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

  points.p0 = new Point(0, 0)
  points.p0Cp2 = points.p0.shift(0, 84.74633802080332 * (ease + 1))
  points.p1 = points.p0.shift(270, 117 * (ease + 1))
  points.p2 = points.p1.shift(0, 121 * (ease + 1))
  points.p3 = points.p0.shift(331.96514949510785, 145.46831943365956 * (ease + 1))
  points.p3Cp1 = points.p3.shift(181.24017302101714, 69.4545599851181 * (ease + 1))

  let diff = 10
  let iter = 1
  do {
    paths.armhole = new Path().move(points.p3).curve(points.p3Cp1, points.p0Cp2, points.p0).hide()

    diff = armhole - paths.armhole.length()
    console.log({ diffa: diff })
    if (diff < -1 || diff > 1) {
      points.p3 = points.p0.shift(331.96514949510785, 145.46831943365956 * (ease + 1) + diff)
    }
    iter++
  } while ((diff < -1 || diff > 1) & (iter < 100))

  points.p1hm = points.p1.shift(90, 117 * (ease + 1) * hem)
  points.p2hm = utils.beamIntersectsY(points.p2, points.p3, points.p1hm.y)
  points.p1h = points.p1hm.flipY(points.p1)
  points.p2h = points.p2hm.flipY(points.p2)

  paths.seamSA = new Path()
    .move(points.p1h)
    .line(points.p2h)
    .line(points.p2)
    .line(points.p3)
    .curve(points.p3Cp1, points.p0Cp2, points.p0)
    .hide()

  paths.seam = paths.seamSA.clone().line(points.p1).line(points.p0).close().unhide()

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
      paths.sa = paths.seamSA.offset(sa).close().attr('class', 'fabric sa')
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
