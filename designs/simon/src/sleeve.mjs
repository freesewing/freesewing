import { front } from './front.mjs'
import { sleeve as brianSleeve } from '@freesewing/brian'
import { hidePresets } from '@freesewing/core'
import {
  cuffOverlap,
  cuffDrape,
  cuffEase,
  cuffLength,
  cuffStyle,
  sleeveLengthBonus,
  sleevePlacketLength,
} from './options.mjs'

function simonSleeve({
  measurements,
  sa,
  Point,
  points,
  Path,
  paths,
  complete,
  paperless,
  macro,
  options,
  snippets,
  Snippet,
  store,
  part,
}) {
  // Update the back armhole notch because the one from Brian is not correct
  points.backNotch = paths.sleevecap.reverse().shiftAlong(store.get('backArmholeToArmholePitch'))

  // Remove inherited paths, snippets, and scalebox
  for (const p in paths) delete paths[p]
  for (const s in snippets) delete snippets[s]
  macro('scalebox', false)

  // Determine the sleeve length
  const len = measurements.shoulderToWrist * (1 + options.sleeveLengthBonus)
  paths.sleevecap = new Path()
    .move(points.bicepsRight)
    ._curve(points.capQ1Cp1, points.capQ1)
    .curve(points.capQ1Cp2, points.capQ2Cp1, points.capQ2)
    .curve(points.capQ2Cp2, points.capQ3Cp1, points.capQ3)
    .curve(points.capQ3Cp2, points.capQ4Cp1, points.capQ4)
    .curve_(points.capQ4Cp2, points.bicepsLeft)
    .hide()
  points.top = new Point(0, paths.sleevecap.edge('top').y)
  points.bottom = points.top.shift(-90, len)

  // Sleeve width depends on cuff style
  let width = measurements.wrist * (1 + options.cuffEase + options.cuffOverlap)
  if (
    options.cuffStyle === 'straightFrenchCuff' ||
    options.cuffStyle === 'roundedFrenchCuff' ||
    options.cuffStyle === 'angledFrenchCuff'
  )
    width = measurements.wrist * (1 + options.cuffEase + options.cuffOverlap * 1.5)
  const cuffLength = measurements.shoulderToWrist * options.cuffLength
  points.wristRight = points.bottom.shift(0, width / 2).shift(90, cuffLength)
  points.wristLeft = points.wristRight.flipX()

  points.cuffMid = new Point(0, points.wristLeft.y)
  points.cuffLeftMid = points.cuffMid.shiftFractionTowards(points.wristLeft, 0.5)
  points.cuffRightMid = points.cuffMid.shiftFractionTowards(points.wristRight, 0.5)
  points.cuffLeftCusp = points.cuffLeftMid.shift(90, width / 50)
  points.cuffRightCusp = points.cuffRightMid.shift(-90, width / 50)
  points.cuffLeftCuspCp1 = points.cuffLeftCusp.shift(180, width / 10)
  points.cuffLeftCuspCp2 = points.cuffLeftCusp.shift(0, width / 10)
  points.cuffRightCuspCp1 = points.cuffRightCusp.shift(180, width / 10)
  points.cuffRightCuspCp2 = points.cuffRightCusp.shift(0, width / 10)

  // Cuff pleats
  const drape = options.cuffDrape * measurements.shoulderToWrist
  let pleats = 0
  const pleatLength = measurements.shoulderToWrist * 0.15
  if (drape > 0) {
    const shiftRight = [
      'cuffRightCuspCp1',
      'cuffRightCusp',
      'cuffRightCuspCp2',
      'wristRight',
      'cuffRightMid',
    ]
    const shiftLeft = ['cuffLeftCuspCp1', 'cuffLeftCusp', 'cuffLeftCuspCp2', 'wristLeft']
    if (drape > 20) pleats = 2
    else pleats = 1
    for (const id of shiftRight) points[id] = points[id].shift(0, drape / (2 * pleats))
    for (const id of shiftLeft) points[id] = points[id].shift(180, drape / (2 * pleats))
    points.cuffPleat1Fold = points.cuffMid.shift(0, drape / (2 * pleats))
    points.cuffPleat1Edge = points.cuffMid.shift(0, drape / pleats)
    points.cuffMidTop = points.cuffMid.shift(90, pleatLength)
    points.cuffPleat1FoldTop = points.cuffPleat1Fold.shift(90, pleatLength)
    points.cuffPleat1EdgeTop = points.cuffPleat1Edge.shift(90, pleatLength)
    if (pleats === 2) {
      const moreRight = ['cuffRightCuspCp2', 'wristRight']
      const shift = shiftRight.concat(shiftLeft)
      for (const id of shift) {
        if (moreRight.indexOf(id) === -1) points[id] = points[id].shift(180, drape / 4)
        else points[id] = points[id].shift(0, drape / 4)
      }
      points.cuffPleat2Fold = points.cuffRightCusp.shift(0, drape / 4)
      points.cuffPleat2Edge = points.cuffRightCusp.shift(0, drape / 2)
      points.cuffPleat2FoldTop = points.cuffPleat2Fold.shift(90, pleatLength)
      points.cuffPleat2EdgeTop = points.cuffPleat2Edge.shift(90, pleatLength)
      points.cuffPleat2Top = points.cuffRightCusp.shift(90, pleatLength)
    }
  }

  paths.frenchBase = new Path()
    .move(points.wristRight)
    .line(points.bicepsRight)
    ._curve(points.capQ1Cp1, points.capQ1)
    .curve(points.capQ1Cp2, points.capQ2Cp1, points.capQ2)
    .curve(points.capQ2Cp2, points.capQ3Cp1, points.capQ3)
    .curve(points.capQ3Cp2, points.capQ4Cp1, points.capQ4)
    .curve_(points.capQ4Cp2, points.bicepsLeft)
  paths.frenchBase.hide()

  paths.saBase = new Path().move(points.bicepsLeft).line(points.wristLeft)
  paths.saBase.hide()

  paths.cuffBase = new Path()
    .move(points.wristLeft)
    ._curve(points.cuffLeftCuspCp1, points.cuffLeftCusp)
  if (pleats > 0) {
    paths.cuffBase.curve_(points.cuffLeftCuspCp2, points.cuffMid).line(points.cuffPleat1Edge)
  }
  paths.cuffBase._curve(points.cuffRightCuspCp1, points.cuffRightCusp)
  if (pleats === 2) paths.cuffBase.line(points.cuffPleat2Edge)
  paths.cuffBase.curve_(points.cuffRightCuspCp2, points.wristRight)
  paths.cuffBase.hide()

  paths.seam = paths.frenchBase
    .clone()
    .line(points.wristLeft)
    .join(paths.cuffBase)
    .attr('class', 'fabric')

  // Complete pattern?
  if (complete) {
    snippets.backNotch = new Snippet('bnotch', points.backNotch)
    snippets.frontNotch = new Snippet('notch', points.frontNotch)
    points.placketEnd = points.cuffLeftCusp.shift(
      90,
      options.sleevePlacketLength * measurements.shoulderToWrist
    )
    paths.placketCut = new Path()
      .move(points.cuffLeftCusp)
      .line(points.placketEnd)
      .attr('class', 'fabric')
    if (pleats > 0) {
      paths.pleats = new Path()
        .move(points.cuffMid)
        .line(points.cuffMidTop)
        .move(points.cuffPleat1Fold)
        .line(points.cuffPleat1FoldTop)
        .move(points.cuffPleat1Edge)
        .line(points.cuffPleat1EdgeTop)
      if (pleats === 2) {
        paths.pleats
          .move(points.cuffRightCusp)
          .line(points.cuffPleat2Top)
          .move(points.cuffPleat2Fold)
          .line(points.cuffPleat2FoldTop)
          .move(points.cuffPleat2Edge)
          .line(points.cuffPleat2EdgeTop)
      }
      paths.pleats.attr('class', 'dotted')
    }
    macro('title', { at: points.centerBiceps, nr: 5, title: 'sleeve' })
    macro('grainline', {
      from: points.cuffMid,
      to: new Point(points.cuffMid.x, points.sleeveTip.y),
    })

    if (sa) {
      paths.sa = paths.frenchBase.offset(sa * options.ffsa)
      paths.frenchSa = paths.sa.clone().attr('class', 'hidden')
      paths.sa = paths.sa
        .join(paths.saBase.offset(sa))
        .join(paths.cuffBase.offset(sa))
        .close()
        .attr('class', 'fabric sa')
      macro('banner', {
        path: paths.frenchSa,
        text: 'flatFelledSeamAllowance',
        repeat: 30,
      })
    }
  }

  // Paperless?
  if (paperless) {
    if (complete) {
      macro('hd', {
        from: points.backNotch,
        to: points.sleeveTip,
        y: points.sleeveTip.y - 15 - sa * options.ffsa,
      })
      macro('hd', {
        from: points.sleeveTip,
        to: points.frontNotch,
        y: points.sleeveTip.y - 15 - sa * options.ffsa,
      })
    }
    macro('hd', {
      from: points.bicepsLeft,
      to: points.sleeveTip,
      y: points.sleeveTip.y - 30 - sa * options.ffsa,
    })
    macro('hd', {
      from: points.sleeveTip,
      to: points.bicepsRight,
      y: points.sleeveTip.y - 30 - sa * options.ffsa,
    })
    macro('hd', {
      from: points.bicepsLeft,
      to: points.bicepsRight,
      y: points.sleeveTip.y - 45 - sa * options.ffsa,
    })
    macro('pd', {
      path: new Path()
        .move(points.bicepsRight)
        ._curve(points.capQ1Cp1, points.capQ1)
        .curve(points.capQ1Cp2, points.capQ2Cp1, points.capQ2)
        .curve(points.capQ2Cp2, points.capQ3Cp1, points.capQ3)
        .curve(points.capQ3Cp2, points.capQ4Cp1, points.capQ4)
        .curve_(points.capQ4Cp2, points.bicepsLeft)
        .reverse(),
      d: 15,
    })
    macro('vd', {
      from: points.wristRight,
      to: points.bicepsRight,
      x: points.bicepsRight.x + 15 + sa * options.ffsa,
    })
    if (complete) {
      macro('vd', {
        from: points.bicepsRight,
        to: points.frontNotch,
        x: points.bicepsRight.x + 15 + sa * options.ffsa,
      })
      macro('vd', {
        from: points.bicepsLeft,
        to: points.backNotch,
        x: points.bicepsLeft.x - 15 - sa,
      })
      macro('vd', {
        from: points.cuffLeftCusp,
        to: points.placketEnd,
        x: points.placketEnd.x - 15,
      })
    }
    macro('vd', {
      from: points.bicepsRight,
      to: points.sleeveTip,
      x: points.bicepsRight.x + 30 + sa * options.ffsa,
    })
    macro('hd', {
      from: points.wristLeft,
      to: points.wristRight,
      y: points.wristLeft.y + 15 + sa,
    })
    if (pleats > 0) {
      macro('hd', {
        from: points.cuffMidTop,
        to: points.cuffPleat1EdgeTop,
        y: points.cuffMidTop.y - 15,
      })
      if (pleats === 2) {
        macro('hd', {
          from: points.cuffPleat2Top,
          to: points.cuffPleat2EdgeTop,
          y: points.cuffPleat2Top.y - 15,
        })
      }
    }
  }

  return part
}

export const sleeve = {
  name: 'simon.sleeve',
  from: brianSleeve,
  after: front,
  hide: hidePresets.HIDE_TREE,
  options: {
    cuffOverlap,
    cuffDrape,
    cuffEase,
    cuffLength,
    cuffStyle,
    sleeveLengthBonus,
    sleevePlacketLength,
  },
  draft: simonSleeve,
}
