import { base } from '@freesewing/brian'
import { waistband } from './waistband.mjs'
import {
  adjustSidePoints,
  constructBackHem,
  constructBackPoints,
  correctArmHole,
  createArmHoles,
  plotSideLineMeasurements,
} from './shared.mjs'
import { sleeve } from './sleeve.mjs'

export const back = {
  name: 'bibi.back',
  from: base,
  measurements: ['hips', 'waist', 'hpsToWaistBack', 'chest', 'seat', 'seatBack', 'waistToSeat'],
  optionalMeasurements: ['bustSpan', 'highBust', 'waistToUnderbust', 'waistToKnee', 'waistToFloor'],
  hide: { from: true },
  after: [waistband, sleeve],
  options: {},
  draft: bibiBack,
}

function bibiBack({
  store,
  sa,
  Point,
  points,
  Path,
  paths,
  Snippet,
  snippets,
  options,
  absoluteOptions,
  macro,
  complete,
  part,
}) {
  // Hide Brian paths
  for (const key of Object.keys(paths)) paths[key].hide()

  // Re-use points for deeper armhole at the front
  points.armholePitchCp1 = points.backArmholePitchCp1
  points.armholePitch = points.backArmholePitch
  points.armholePitchCp2 = points.backArmholePitchCp2

  // clean up some unnecessary/confusing points
  delete points.frontArmholePitchCp1
  delete points.frontArmholePitch
  delete points.frontArmholePitchCp2
  delete points.backArmholePitchCp1
  delete points.backArmholePitch
  delete points.backArmholePitchCp2
  delete points.cfNeck
  delete points.cfNeckCp1

  constructBackPoints(part)

  adjustSidePoints(part)

  correctArmHole(part)

  constructBackHem(part, options.useWaistRibbing ? -store.get('ribbingHeight') : 0)

  store.set('backSideSeamLength', paths.sideSeam.length())

  const strapWidth = options.sleeves ? 0 : options.strapWidth
  points.neck = points.hps.shiftFractionTowards(
    points.shoulder,
    options.necklineWidth * (1 - strapWidth)
  )

  points.cbNeck = new Point(
    0,
    points.neck.y + options.backNeckCutout * points.neck.dy(points.cbChest)
  )
  points.cbNeckCp1 = points.cbNeck.shift(0, points.neck.x * options.backNeckBend)
  points.neckCp2 = points.neck
    .shiftTowards(points.shoulder, points.neck.dy(points.cbNeck) * (0.2 + options.backNeckBend))
    .rotate(-90, points.neck)

  paths.backNeck = new Path()
    .move(points.neck)
    .curve(points.neckCp2, points.cbNeckCp1, points.cbNeck)
    .addClass('fabric')
  createArmHoles(part, strapWidth, options.armholeCurveBack, options.armholeDropBack, 'bnotch')

  paths.centerLine = new Path().move(points.cbNeck).line(points.cbHem).addClass('fabric')

  store.set(
    'gatherAreaStart',
    Math.min(points.armhole.dy(points.cbWaist) / 10, paths.sideSeam.length() * 0.1)
  )
  store.set(
    'gatherAreaLength',
    Math.min(paths.sideSeam.length() * 0.8, points.armhole.dy(points.cbWaist) * 0.5)
  )

  store.set('armholeSizeBack', paths.armhole.length())
  store.set('neckSizeBack', paths.backNeck.length())

  const reverse = paths.sideSeam.reverse()
  snippets.gatherAreaStart = new Snippet('notch', reverse.shiftAlong(store.get('gatherAreaStart')))
  snippets.gatherAreaBack = new Snippet(
    'notch',
    reverse.shiftAlong(store.get('gatherAreaStart') + store.get('gatherAreaLength'))
  )

  if (sa) {
    paths.sa = new Path()
      .move(points.cbHem)
      .join(paths.hem.offset(sa * (options.useWaistRibbing ? 1 : 3)))
      .join(paths.sideSeam.offset(sa))
      .join(paths.armhole.offset(sa * (store.separateSleeves ? 1 : 0)))
      .join(paths.shoulder.offset(sa))
      .line(points.neck)
      .attr('class', 'fabric sa')
  }

  macro('cutonfold', {
    from: points.cbNeck,
    to: points.cbHem,
    grainline: true,
  })

  delete snippets.logo

  points.title = points.cbHem.shift(45, 60)

  macro('title', { at: points.title, nr: 2, title: 'back' })

  if (complete) {
    if (points.hem.y > points.waist.y)
      paths.waist = new Path().move(points.cbWaist).line(points.waist).attr('class', 'help')

    if (!store.separateSleeves) {
      paths.armholeBinding = paths.armhole
        .offset(-absoluteOptions.bindingHeight)
        .addClass('various help')
    }
    paths.neckBinding = paths.backNeck
      .offset(-absoluteOptions.bindingHeight)
      .addClass('various help')
  }
  macro('pd', {
    id: 'pArmhole',
    path: paths.armhole.reverse(),
    d: -1 * sa - 15,
  })

  macro('pd', {
    id: 'pNeck',
    path: paths.backNeck.reverse(),
    d: -1 * sa - 15,
  })

  macro('pd', {
    id: 'pShoulder',
    path: paths.shoulder.reverse(),
    d: -1 * sa - 15,
  })

  macro('hd', {
    id: 'wAtHem',
    from: points.cbHem,
    to: points.hem,
    y: points.cbHem.y + sa * 2.5 + 15,
  })

  macro('vd', {
    id: 'hHemToNeck',
    from: points.cbHem,
    to: points.cbNeck,
    x: points.cbHem.x - sa - 15,
  })

  macro('vd', {
    id: 'hShoulderToArmhole',
    from: points.shoulder,
    to: points.armhole,
    x: points.armhole.x + sa + 15,
  })

  macro('vd', {
    id: 'hSide',
    from: points.armhole,
    to: points.hem,
    x: points.hem.x + sa + 15,
  })

  macro('vd', {
    id: 'hNeckToArmhole',
    from: points.neck,
    to: points.armhole,
    x: points.armhole.x + sa + 30,
  })

  plotSideLineMeasurements(part, paths.sideSeam)

  return part
}
