import { back } from './back.mjs'

function draftPaulYoke({ points, paths, Path, complete, macro, snippets, store, sa, log, part }) {
  for (let id in paths) if (id !== 'outseam') delete paths[id]
  for (let id in snippets) delete snippets[id]

  let yokeCpDist = points.yokeOutRotated.dist(points.yokeIn) * 0.2
  let yokeCpAngle = points.yokeOutRotated.angle(points.yokeIn)
  points.yokeCp1 = points.dartTip.shift(yokeCpAngle, yokeCpDist)
  points.yokeCp2 = points.dartTip.shift(yokeCpAngle + 180, yokeCpDist)

  let waistCpDist = points.styleWaistOutRotated.dist(points.styleWaistIn) * 0.2
  let waistCpAngle = points.styleWaistOutRotated.angle(points.styleWaistIn)
  points.waistCp1 = points.backDartLeft.shift(waistCpAngle, waistCpDist)
  points.waistCp2 = points.backDartLeft.shift(waistCpAngle + 180, waistCpDist)

  function adjustPoint(pointId, pathCreator, expectedLength, stopAngle) {
    log.debug(`adjusting ${pointId} position`)
    for (let i = 0; i < 4; i++) {
      let tmp = pathCreator()
      let length = tmp.length()
      log.debug(`actual length: ${length}, expected length: ${expectedLength}`)
      let delta = expectedLength - length
      points[pointId] = points[pointId].shift(stopAngle, delta)
    }
  }

  points.originalYokeOutRotated = points.yokeOutRotated.clone()

  // correct the seam lengths, so we match the back part and the waistband
  let drawYokeBottom = () =>
    new Path()
      .move(points.yokeIn)
      .curve_(points.yokeCp1, points.dartTip)
      .curve_(points.yokeCp2, points.yokeOutRotated)
  adjustPoint(
    'yokeOutRotated',
    drawYokeBottom,
    store.get('yokeBottom'),
    points.yokeCp2.angle(points.yokeOutRotated)
  )

  // adjust styleWaistOutRotated point (shift it the same distance)
  points.styleWaistOutRotated = points.styleWaistOutRotated.translate(
    points.originalYokeOutRotated.dx(points.yokeOutRotated),
    points.originalYokeOutRotated.dy(points.yokeOutRotated)
  )

  let drawWaistband = () => {
    let dist = points.styleWaistIn.dist(points.backDartLeft) * 0.5
    points.waistCpIn = points.styleWaistIn
      .shiftTowards(points.yokeIn, dist)
      .rotate(90, points.styleWaistIn)
    return new Path()
      .move(points.styleWaistIn)
      .curve(points.waistCpIn, points.waistCp1, points.backDartLeft)
      .curve_(points.waistCp2, points.styleWaistOutRotated)
  }
  adjustPoint(
    'styleWaistIn',
    drawWaistband,
    store.get('waistbandBack'),
    points.waistCp1.angle(points.styleWaistIn)
  )

  paths.yoke = new Path()
    .move(points.styleWaistIn)
    .line(points.yokeIn)
    .join(drawYokeBottom())
    .line(points.styleWaistOutRotated)
    .join(drawWaistband().reverse())
    .close()
    .setClass('fabric')

  if (sa) {
    paths.sa = macro('sa', { paths: ['yoke'] })
  }

  if (complete) {
    let inseamAngle = points.styleWaistIn.angle(points.yokeIn)
    let waistAngle = points.styleWaistIn.angle(points.waistCpIn)
    points.arrowStart = points.styleWaistIn.shift(inseamAngle, 20).shift(waistAngle, 20)
    points.arrowTip1 = points.styleWaistIn.shift(inseamAngle, 9).shift(waistAngle, 3)
    points.arrowTip2 = points.styleWaistIn.shift(inseamAngle, 3).shift(waistAngle, 9)
    paths.arrow = new Path()
      .move(points.arrowStart)
      .line(points.styleWaistIn)
      .line(points.arrowTip1)
      .line(points.arrowTip2)
      .line(points.styleWaistIn)
      .addClass('fill-note note')
  }

  points.titleAnchor = points.styleWaistIn
    .shiftFractionTowards(points.dartTip, 0.5)
    .shiftFractionTowards(points.yokeIn, 0.3)
  macro('title', {
    at: points.titleAnchor,
    nr: 5,
    scale: 0.5,
    title: 'yoke',
    align: 'center',
  })

  macro('grainline', {
    from: points.backDartLeft,
    to: points.dartTip,
  })

  macro('pd', {
    id: 'pWaistband',
    path: drawWaistband(),
    d: -10,
  })
  macro('pd', {
    id: 'pBottom',
    path: drawYokeBottom(),
  })
  macro('ld', {
    id: 'lInseam',
    from: points.yokeIn,
    to: points.styleWaistIn,
    d: 10,
  })
  macro('ld', {
    id: 'lOutseam',
    from: points.styleWaistOutRotated,
    to: points.yokeOutRotated,
    d: 10,
  })

  return part
}

export const yoke = {
  name: 'paul.yoke',
  from: back,
  options: {},
  draft: draftPaulYoke,
}
