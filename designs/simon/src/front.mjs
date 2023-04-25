import { calculateReduction } from './shared.mjs'
import { front as brianFront } from '@freesewing/brian'
import { back } from './back.mjs'
import {
  backDarts,
  backDartShaping,
  buttonFreeLength,
  extraTopButton,
  seperateButtonPlacket,
  seperateButtonholePlacket,
  buttons,
  ffsa,
} from './options.mjs'

function simonFront({
  store,
  measurements,
  sa,
  Point,
  points,
  Path,
  paths,
  complete,
  macro,
  snippets,
  options,
  part,
}) {
  // Clean up
  for (const i in paths) {
    if (['frontArmhole', 'frontCollar'].indexOf(i) === -1) delete paths[i]
  }
  for (const i in snippets) {
    if (i.indexOf('otch')) delete snippets[i]
  }

  macro('cutonfold', false)

  // Populare store with data we need
  calculateReduction(part)
  store.set(
    'frontArmholeLength',
    new Path()
      .move(points.armhole)
      .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
      .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
      .join(paths.frontArmhole)
      .length()
  )

  // Hip shaping
  points.hips = points.hips.shift(180, store.get('hipsReduction') / 4)
  points.hem = points.hem.shift(180, store.get('hipsReduction') / 4)

  // Waist shaping
  let reduce = store.get('waistReduction')
  if (store.get('backDarts')) reduce = (reduce * (1 - options.backDartShaping)) / 4
  else reduce = reduce / 4
  points.waist = points.waist.shift(180, reduce)
  points.waistCp1 = points.waist.shift(-90, measurements.waistToHips * 0.5)
  points.waistCp2 = points.waist.shift(90, points.armhole.dy(points.waist) / 2)
  points.hipsCp2 = points.hips.shift(90, points.waist.dy(points.hips) / 4)

  // Never make the hips more narrow than the waist because that looks silly
  if (points.hem.x < points.waist.x) {
    points.hem.x = points.waist.x
    points.hips.x = points.waist.x
    points.hipsCp2.x = points.waist.x
  }

  // Draft hem
  paths.saBaseFromHips = new Path()
    .move(points.hips)
    .curve(points.hipsCp2, points.waistCp1, points.waist)
    .curve_(points.waistCp2, points.armhole)
  paths.saBaseFromArmhole = new Path()
    .move(points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    .join(paths.frontArmhole)
    .line(points.s3CollarSplit)
    .join(paths.frontCollar)
  switch (options.hemStyle) {
    case 'baseball':
      points.bballStart = points.cfHem.shiftFractionTowards(points.hem, 0.5)
      points.bballEnd = points.hem.shiftFractionTowards(points.hips, options.hemCurve)
      points.bballCp1 = points.bballStart.shiftFractionTowards(points.hem, 0.5)
      points.bballCp2 = new Point(points.bballCp1.x, points.bballEnd.y)
      paths.saBase = new Path().move(points.bballEnd).line(points.hips).join(paths.saBaseFromHips)
      paths.hemBase = new Path()
        .move(points.cfHem)
        .line(points.bballStart)
        .curve(points.bballCp1, points.bballCp2, points.bballEnd)
      break
    case 'slashed':
      macro('round', {
        from: points.hips,
        to: points.cfHem,
        via: points.hem,
        radius: points.hips.dist(points.hem) * options.hemCurve,
        prefix: 'slash',
      })
      paths.saBase = new Path().move(points.hips).join(paths.saBaseFromHips)
      paths.hemBase = new Path()
        .move(points.cfHem)
        .line(points.slashEnd)
        .curve(points.slashCp2, points.slashCp1, points.slashStart)
      break
    default:
      paths.saBase = new Path().move(points.hem).line(points.hips).join(paths.saBaseFromHips)
      paths.hemBase = new Path().move(points.cfHem).line(points.hem)
  }

  // Paths
  paths.saBase.hide()
  paths.saBaseFromHips.hide()
  paths.saBaseFromArmhole.hide()
  paths.hemBase.hide()
  paths.seam = paths.hemBase
    .join(paths.saBase)
    .join(paths.saBaseFromArmhole)
    .attr('class', 'fabric')

  // Complete pattern?
  if (complete) {
    const grainlineDistance = (points.hem.x - points.cfHem.x) * 0.2
    macro('grainline', {
      from: points.cfHem.shift(0, grainlineDistance),
      to: points.cfNeck.shift(0, grainlineDistance),
    })
    macro('title', { at: points.title, nr: 'X', title: 'front' })
    macro('sprinkle', {
      snippet: 'notch',
      on: ['waist', 'armholePitch', 'hips', 'cfHips', 'cfWaist', 'armhole', 'cfArmhole'],
    })

    if (sa) {
      paths.saFrench = paths.saBase.offset(sa * options.ffsa).attr('class', 'fabric sa')
      macro('banner', {
        path: paths.saFrench,
        text: 'flatFelledSeamAllowance',
        repeat: 30,
      })
      paths.saFromArmhole = paths.saBaseFromArmhole.offset(sa).attr('class', 'fabric sa')
      paths.hemSa = paths.hemBase.offset(sa * 3).attr('class', 'fabric sa')
      macro('banner', {
        path: paths.hemSa,
        text: ['hem', ': 3x', 'seamAllowance'],
      })
      paths.saConnect = new Path()
        .move(paths.hemSa.end())
        .line(paths.saFrench.start())
        .move(paths.saFrench.end())
        .line(paths.saFromArmhole.start())
        .attr('class', 'fabric sa')
      delete paths.sa
    }
  }

  return part
}

export const front = {
  name: 'simon.front',
  from: brianFront,
  after: back,
  hide: {
    self: true,
    from: true,
    inherited: true,
  },
  options: {
    backDarts,
    backDartShaping,
    buttonFreeLength,
    extraTopButton,
    seperateButtonPlacket,
    seperateButtonholePlacket,
    buttons,
    ffsa,
  },
  draft: simonFront,
}
