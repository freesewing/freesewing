import { backSideBoundary } from './shared.mjs'
import { front as bentFront } from '@freesewing/bent'
import { hidePresets } from '@freesewing/core'
import {
  hipsEase,
  waistEase,
  centerFrontHemDrop,
  frontPocketPlacement,
  frontPocketWidth,
  frontPocketDepth,
  frontPocketRadius,
  frontDartPlacement,
  sideFrontPlacement,
  rollLineCollarHeight,
  reduceWaistStandardFraction,
  reduceWaistDartFraction,
  reduceHipsStandardFraction,
} from './options.mjs'

function jaegerFrontBase({ store, points, utils, options, Point, paths, Path, part }) {
  /**
   * Add side part from back to front, draw front style line
   */
  backSideBoundary(part, true)

  paths.pathToSplit = new Path()
    .move(points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .attr('class', 'lining stroke-xl')
  points.split = paths.pathToSplit.shiftFractionAlong(0.5)
  let halves = paths.pathToSplit.split(points.split)
  paths.split1 = halves.pop().attr('class', 'lining stroke-xxl')
  paths.split2 = halves.pop().attr('class', 'canvas stroke-xxl')
  // We need to add these control points as we'll rotate them later
  // The path.ops property is where it's at
  points.splitCp2 = paths.split1.ops[1].cp1
  points.armholeHollowCp1 = paths.split1.ops[1].cp2
  // We need to add these control points for the side
  points.sideArmholeCp2 = paths.split2.ops[1].cp1
  points.sideSplitCp1 = paths.split2.ops[1].cp2

  points.fsArmhole = points.split.clone()
  points.fsWaist = new Point(points.waist.x * options.sideFrontPlacement, points.waist.y)
  points.fsWaistCp2 = points.fsWaist.shift(90, points.split.dy(points.waist) / 2)
  points.fsHips = new Point(points.fsWaist.x, points.hips.y)
  points.fsHem = new Point(points.fsWaist.x, points.hem.y)

  /** Uncomment this to see the style line without shaping
   */
  paths.fs = new Path()
    .move(points.fsHem)
    .line(points.fsWaist)
    .curve_(points.fsWaistCp2, points.fsArmhole)
    .attr('class', 'stroke-xl lining lashed')

  /**
   * Shape the front/side seam
   */
  points.waist = points.fsWaist.shift(
    180,
    store.get('waistReduction') * options.reduceWaistStandardFraction
  )
  points.waistCp2 = new Point(points.waist.x, points.fsWaistCp2.y)
  points.hips = points.fsHips.shift(
    180,
    store.get('hipsReduction') * options.reduceHipsStandardFraction
  )
  points.waistCp1 = points.waist.shift(-90, points.waist.dy(points.hips) / 3)
  points.hipsCp2 = points.hips.shift(90, points.waist.dy(points.hips) / 3)
  points.hem = new Point(points.hips.x, points.hem.y)

  points.sideHips = points.hips.flipX(points.fsWaist)
  points.sideHem = points.hem.flipX(points.fsWaist)
  points.sideWaist = points.waist.flipX(points.fsWaist)
  points.sideWaistCp1 = points.waistCp1.flipX(points.fsWaist)
  points.sideWaistCp2 = points.waistCp2.flipX(points.fsWaist)
  points.sideHipsCp2 = points.hipsCp2.flipX(points.fsWaist)

  // Match side seam length by shifting armhole upwards
  let frontLength = new Path()
    .move(points.hem)
    .line(points.hips)
    .curve(points.hipsCp2, points.waistCp1, points.waist)
    .curve_(points.waistCp2, points.split)
    .length()
  let sideLength = new Path()
    .move(points.sideHem)
    .line(points.sideHips)
    .curve(points.sideHipsCp2, points.sideWaistCp1, points.sideWaist)
    .curve_(points.sideWaistCp2, points.split)
    .length()
  points.sideArmhole = points.armhole.shift(90, frontLength - sideLength)
  points.sideArmholeCp2 = points.sideArmholeCp2.shift(90, frontLength - sideLength)
  points.bsArmholeCp2 = points.bsArmholeCp2.shift(90, frontLength - sideLength)

  /**
   * Shape the side/back seam (15% of reduction x 2)
   */
  points.bsWaist = points.bsWaist.shift(
    180,
    store.get('waistReduction') * options.reduceWaistStandardFraction
  )
  points.bsWaistCp2 = new Point(points.bsWaist.x, points.sideWaistCp2.y)
  points.bsWaistCp1 = new Point(points.bsWaist.x, points.sideWaistCp1.y)
  points.bsHips = points.bsHips.shift(
    180,
    store.get('hipsReduction') * options.reduceHipsStandardFraction
  )
  points.bsHipsCp2 = new Point(points.bsHips.x, points.sideHipsCp2.y)
  points.bsHem = new Point(points.bsHips.x, points.sideHem.y)

  /**
   * Drop hem center front
   */
  points.cfHem = points.cfHem.shift(-90, points.cfHem.y * options.centerFrontHemDrop)
  // When the hem slope would end of side and front were sewn together
  points.hemDropEnd = points.hem.shift(0, points.sideHem.dx(points.bsHem))
  points.hem = utils.beamsIntersect(points.cfHem, points.hemDropEnd, points.hips, points.hem)
  points.sideHem = points.hem.flipX(points.fsHem)

  /**
   * Front dart (12.5% of reduction x 2)
   */
  points.dart = new Point(points.waist.x * options.frontDartPlacement, points.waist.y)
  points.dartTop = points.dart.shift(90, points.armhole.dy(points.waist) / 1.5)
  points.dartBottom = points.dart.shift(-90, points.waist.dy(points.hips) / 1.5)
  points.dartRight = points.dart.shift(
    0,
    store.get('waistReduction') * options.reduceWaistDartFraction
  )
  points.dartLeft = points.dartRight.flipX(points.dart)
  points.dartRightCpTop = points.dartRight.shift(90, points.dartTop.dy(points.dart) / 3)
  points.dartLeftCpTop = points.dartRightCpTop.flipX(points.dart)
  points.dartRightCpBottom = points.dartRight.shift(-90, points.dart.dy(points.dartBottom) / 3)
  points.dartLeftCpBottom = points.dartRightCpBottom.flipX(points.dart)

  // Front pocket
  points.frontPocketAnchor = new Point(
    points.hips.x * options.frontPocketPlacement,
    points.dartRightCpBottom.y
  )
  let width = points.hips.x * options.frontPocketWidth
  let depth = width * options.frontPocketDepth
  points.frontPocketTopLeft = points.frontPocketAnchor.shift(180, width / 2)
  points.frontPocketTopRight = points.frontPocketTopLeft.flipX(points.frontPocketAnchor)
  points.frontPocketBottomLeft = points.frontPocketTopLeft.shift(-90, depth)
  points.frontPocketBottomRight = points.frontPocketBottomLeft.flipX(points.frontPocketAnchor)
  store.set('pocketWidth', width)
  store.set('pocketDepth', depth)

  points.frontPocketTopEnd = utils.curveIntersectsY(
    points.waist,
    points.waistCp1,
    points.hipsCp2,
    points.hips,
    points.frontPocketTopLeft.y
  )
  points.frontPocketBottomEnd = utils.beamIntersectsY(
    points.hips,
    points.hem,
    points.frontPocketBottomLeft.y
  )

  paths.dart = new Path()
    .move(points.dartRight)
    .curve_(points.dartRightCpTop, points.dartTop)
    ._curve(points.dartLeftCpTop, points.dartLeft)
    .curve_(points.dartLeftCpBottom, points.dartBottom)
    ._curve(points.dartRightCpBottom, points.dartRight)
    .close()

  paths.frontShaping = new Path()
    .move(points.hem)
    .line(points.hips)
    .curve(points.hipsCp2, points.waistCp1, points.waist)
    .curve_(points.waistCp2, points.split)
    ._curve(points.sideWaistCp2, points.sideWaist)
    .curve(points.sideWaistCp1, points.sideHipsCp2, points.sideHips)
    .line(points.sideHem)
    .attr('class', 'stroke-xxl various lashed')

  paths.sideShaping = new Path()
    .move(points.bsHem)
    .line(points.bsHips)
    .curve(points.bsHipsCp2, points.bsWaistCp1, points.bsWaist)
    .curve_(points.bsWaistCp2, points.bsArmholeHollow)
    .attr('class', 'stroke-xl facing lashed')

  return part
}

export const frontBase = {
  name: 'jaeger.frontBase',
  measurements: ['hips', 'waist'],
  from: bentFront,
  hide: hidePresets.HIDE_ALL,
  options: {
    hipsEase,
    waistEase,
    centerFrontHemDrop,
    frontPocketPlacement,
    frontPocketWidth,
    frontPocketDepth,
    frontPocketRadius,
    frontDartPlacement,
    sideFrontPlacement,
    rollLineCollarHeight,
    reduceWaistStandardFraction,
    reduceWaistDartFraction,
    reduceHipsStandardFraction,
  },
  draft: jaegerFrontBase,
}
