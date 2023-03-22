import { calculateRatios, backSideBoundary } from './shared.mjs'
import { back as bentBack } from '@freesewing/bent'
import { hidePresets } from '@freesewing/core'
import {
  centerBackDart,
  hipsEase,
  waistEase,
  rollLineCollarHeight,
  reduceWaistStandardFraction,
  reduceWaistDartFraction,
  reduceHipsStandardFraction,
  lengthBonus,
} from './options.mjs'

function jaegerBackBase({ store, points, measurements, options, Point, paths, Path, part }) {
  calculateRatios(part)

  /**
   * Shaping the back seam
   */

  points.cbChest = new Point(0, points.armholePitchCp1.y)
  if (options.centerBackDart > 0) {
    points.cbChestCp1 = points.cbChest.shiftFractionTowards(points.cbNeck, 0.5)
    points.cbNeck = points.cbNeck.shift(0, measurements.chest * options.centerBackDart)
  }
  points.cbChestCp2 = points.cbChest.shift(-90, points.cbChest.dy(points.cbWaist) / 3)
  points.cbWaist = points.cbWaist.shift(
    0,
    store.get('waistReduction') * options.reduceWaistStandardFraction
  )
  points.cbWaistCp1 = points.cbWaist.shift(90, points.cbChest.dy(points.cbWaist) / 3)
  points.cbHips = points.cbHips.shift(
    0,
    store.get('hipsReduction') * options.reduceHipsStandardFraction
  )
  points.cbHem = points.cbHem.shift(
    0,
    store.get('hipsReduction') * options.reduceHipsStandardFraction
  )
  points.cbWaistCp2 = points.cbWaist.shift(-90, points.cbWaist.dy(points.cbHips) / 3)
  points.cbHipsCp1 = points.cbHips.shift(90, points.cbWaist.dy(points.cbHips) / 3)

  /**
   * Shaping the side seam
   */

  backSideBoundary(part)

  // Divide reduction by 4: two side panels x two sides per panel = 4
  points.waist = points.bsWaist.shift(
    180,
    store.get('waistReduction') * options.reduceWaistStandardFraction
  )
  points.waistCp2 = points.waist.shift(90, points.cbChest.dy(points.waist) / 3)
  points.hips = points.bsHips.shift(
    180,
    store.get('hipsReduction') * options.reduceHipsStandardFraction
  )
  points.waistCp1 = points.waist.shift(-90, points.waist.dy(points.hips) / 3)
  points.hipsCp2 = points.hips.shift(90, points.waist.dy(points.hips) / 3)
  points.hem = new Point(points.hips.x, points.hem.y)

  // Store length of back collar
  store.set(
    'backCollarLength',
    new Path().move(points.cbNeck)._curve(points.neckCp2, points.neck).length()
  )

  // Paths
  paths.cb = new Path().move(points.cbNeck)
  if (options.centerBackDart > 0) paths.cb._curve(points.cbChestCp1, points.cbChest)
  else paths.cb.line(points.cbChest)

  paths.cb
    .curve(points.cbChestCp2, points.cbWaistCp1, points.cbWaist)
    .curve(points.cbWaistCp2, points.cbHipsCp1, points.cbHips)
    .line(points.cbHem)
    .attr('class', 'stroke-xl lining')

  paths.bss = new Path()
    .move(points.armholeHollow)
    .curve(points.bsArmholeHollowCp2, points.waistCp2, points.waist)
    .curve(points.waistCp1, points.hipsCp2, points.hips)
    .line(points.hem)
    .attr('class', 'stroke-xl lining')

  return part
}

export const backBase = {
  name: 'jaeger.backBase',
  measurements: ['hips', 'waist'],
  from: bentBack,
  hide: hidePresets.HIDE_ALL,
  options: {
    centerBackDart,
    hipsEase,
    waistEase,
    rollLineCollarHeight,
    reduceWaistStandardFraction,
    reduceWaistDartFraction,
    reduceHipsStandardFraction,
    lengthBonus,
  },
  draft: jaegerBackBase,
}
