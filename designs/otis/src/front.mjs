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

function draftFront({
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
  part,
}) {
  const waist = store.get('waist')
  const ease = store.get('ease')
  const sizeFactor = store.get('sizeFactor')
  const sideseam = store.get('sideseam')
  const armhole = store.get('armhole')

  points.p0 = new Point(0, 0)
  points.p0Cp1 = points.p0.shift(180, 69.64248775236683 * (ease + 1) * sizeFactor)
  points.p1 = points.p0.shift(137.39365873630706, 132.32581976385896 * (ease + 1) * sizeFactor)
  points.p1Cp1 = points.p1.shift(275.68130162148066, 95.6099938788659 * (ease + 1) * sizeFactor)
  points.p1Cp2 = points.p1.shift(334.5320444890682, 74.98871362703433 * (ease + 1) * sizeFactor)
  points.p2 = points.p0.shift(208.92817996505278, 145.1854377221146 * (ease + 1) * sizeFactor)
  points.p2Cp2 = points.p2.shift(356.8730716127121, 43.74056201237602 * (ease + 1) * sizeFactor)
  points.p3 = points.p0.shift(244.49016929788834, 295.05507494424813 * (ease + 1) * sizeFactor)
  points.p3Cp1 = points.p3.shift(0, 18.248785709538428 * (ease + 1) * sizeFactor)
  points.p4 = points.p0.shift(265.3666986326574, 309.97788995830655 * (ease + 1) * sizeFactor)
  points.p5 = points.p0.shift(265.91499446139534, 351.4982585965382 * (ease + 1) * sizeFactor)
  points.p6 = points.p0.shift(270, 350.6052631578947 * (ease + 1) * sizeFactor)

  let diff = 10
  let iter = 1
  do {
    paths.armhole = new Path().move(points.p1).curve(points.p1Cp1, points.p2Cp2, points.p2).hide()

    const armholeLength = paths.armhole.length() * 0.85
    diff = armholeLength - armhole
    console.log({ diff: diff })

    if (diff < -1 || diff > 1) {
      points.p1 = points.p0.shift(
        137.39365873630706,
        132.32581976385896 * (ease + 1) * sizeFactor + diff
      )
    }
    iter++
  } while ((diff < -1 || diff > 1) & (iter < 100))

  points.shoulder = paths.armhole.shiftFractionAlong(0.15)

  paths.seamSA = new Path()
    .move(points.p0)
    .curve(points.p0Cp1, points.p1Cp2, points.p1)
    .curve(points.p1Cp1, points.p2Cp2, points.p2)
    .line(points.p3)
    .curve(points.p3Cp1, points.p4, points.p4)
    .line(points.p5)
    .line(points.p6)
    .hide()

  paths.seam = paths.seamSA.clone().line(points.p0).close().unhide()

  // makeRelativePoints(Point, points, points.p0, waist, ease)

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

    snippets.shoulder = new Snippet('notch', points.shoulder)

    macro('cutonfold', {
      from: points.p6,
      to: points.p0,
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

export const front = {
  name: 'front',
  after: back,
  plugins: [pluginBundle],
  draft: draftFront,
}
