import { pluginBundle } from '@freesewing/plugin-bundle'
import { back } from './back.mjs'

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
  const armhole = store.get('armhole')
  const snapPlacketWidth = store.get('SnapPlacketWidth')

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
  points.p4.x = points.p0.x - snapPlacketWidth
  points.p5 = points.p4.shift(270, measurements.waist * options.snapPlacket * 2)
  points.p6 = new Point(0, points.p5.y)

  let diff = 10
  let iter = 1
  do {
    paths.armhole = new Path().move(points.p1).curve(points.p1Cp1, points.p2Cp2, points.p2).hide()

    const armholeLength = paths.armhole.length() * 0.85
    diff = armholeLength - armhole

    if (diff < -1 || diff > 1) {
      points.p1 = points.p0.shift(
        137.39365873630706,
        132.32581976385896 * (ease + 1) * sizeFactor + diff
      )
    }
    iter++
  } while ((diff < -1 || diff > 1) && iter < 100)

  points.shoulder = paths.armhole.shiftFractionAlong(0.15)
  points.snapPlacketOut = points.p4.shift(270, measurements.waist * options.snapPlacket)
  points.snapPlacketIn = new Point(0, points.snapPlacketOut.y)

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

  store.set(
    'FrontNeckOpening',
    new Path().move(points.p0).curve(points.p0Cp1, points.p1Cp2, points.p1).length() * 2
  )
  store.set(
    'FrontLegOpening',
    new Path().move(points.p3).curve(points.p3Cp1, points.p4, points.p4).length()
  )

  macro('cutonfold', {
    from: new Point(0, points.p4.y),
    to: points.p0,
  })

  // Complete?
  if (complete) {
    points.logo = points.p0.shiftFractionTowards(points.p3, 0.5)
    snippets.logo = new Snippet('logo', points.logo)

    macro('title', {
      at: points.logo.shift(-90, waist / 1.7).shift(-180, waist / 4),
      nr: 2,
      title: 'front',
    })

    paths.snapPlacket = new Path()
      .move(points.snapPlacketOut)
      .line(points.snapPlacketIn)
      .addClass('dashed')

    points.snap = points.p5
      .shiftFractionTowards(points.p6, 0.333)
      .shift(90, (measurements.waist * options.snapPlacket) / 2)
    snippets.snap = new Snippet('snap-socket', points.snap)

    if (sa) {
      paths.sa = paths.seamSA.offset(sa).close().trim().attr('class', 'fabric sa')
    }

    snippets.shoulder = new Snippet('notch', points.shoulder)
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.p1,
      to: points.p0,
      y: points.p1.y - sa - 15,
    })
    macro('hd', {
      from: points.p5,
      to: points.p6,
      y: points.p6.y + sa + 15,
    })
    macro('vd', {
      from: points.p1,
      to: points.p0,
      x: points.p0.x + 15,
    })
    macro('vd', {
      from: points.p2,
      to: points.p1,
      x: points.p2.x - sa - 15,
    })
    macro('vd', {
      from: points.p3,
      to: points.p2,
      x: points.p2.x - sa - 15,
    })
    macro('vd', {
      from: points.p4,
      to: points.p3,
      x: points.p3.x - sa - 15,
    })
    macro('vd', {
      from: points.snapPlacketOut,
      to: points.p4,
      x: points.p4.x - sa - 15,
    })
    macro('vd', {
      from: points.p5,
      to: points.snapPlacketOut,
      x: points.p5.x - sa - 15,
    })
    macro('vd', {
      from: points.p0,
      to: points.p6,
      x: points.p6.x + 15,
    })
  }

  store.cutlist.addCut({ material: 'fabric', cut: 1 })

  return part
}

export const front = {
  name: 'front',
  after: back,
  plugins: [pluginBundle],
  draft: draftFront,
}
