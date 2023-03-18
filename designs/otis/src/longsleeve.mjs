import { pluginBundle } from '@freesewing/plugin-bundle'
import { shortsleeve } from './shortsleeve.mjs'

import {
  adjustPoints,
  consoleLogPoints,
  scalePoints,
  addPoint,
  addPointX,
  addPointY,
  makeRelativePoints,
} from './utils.mjs'

function draftLongsleeve({
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
  const waist = store.get('waist')
  const ease = store.get('ease')
  const sizeFactor = store.get('sizeFactor')
  const sideseam = store.get('sideseam')
  const hem = store.get('hem')

  for (const p in paths) {
    paths[p].hide()
  }

  paths.short = paths.seam.clone().attr('class', 'note dashed')

  points.p1 = points.p0.shift(270, 293.7625802105263 * (ease + 1) * sizeFactor)
  points.p2 = points.p0.shift(284.345521471841, 303.21713769055657 * (ease + 1) * sizeFactor)
  points.p2Cp1 = points.p0.shift(290.01156103077165, 229.3425471399697 * (ease + 1) * sizeFactor)
  points.p3Cp2 = points.p0.shift(303.17727589125565, 174.25165593501407 * (ease + 1) * sizeFactor)

  points.p1hm = points.p1.shift(90, hem)
  points.p2hm = utils.curveIntersectsY(
    points.p2,
    points.p2Cp1,
    points.p3Cp2,
    points.p3,
    points.p1hm.y
  )
  points.p1h = points.p1hm.flipY(points.p1)
  points.p2h = points.p2hm.flipY(points.p2)

  paths.seamSA = new Path()
    .move(points.p1h)
    .line(points.p2h)
    .line(points.p2)
    .curve(points.p2Cp1, points.p3Cp2, points.p3)
    .curve(points.p3Cp1, points.p0Cp2, points.p0)
    .hide()

  paths.seam = paths.seamSA.clone().line(points.p1).line(points.p0).close().unhide()

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
    macro('cutonfold', {
      from: points.p0,
      to: points.p1h,
    })
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

export const longsleeve = {
  name: 'longsleeve',
  from: shortsleeve,
  plugins: [pluginBundle],
  draft: draftLongsleeve,
}
