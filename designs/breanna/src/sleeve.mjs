import { sleeveCap } from './sleevecap.mjs'
import { front } from './front.mjs'
import { frontBase } from './front-base.mjs'
import { back } from './back.mjs'

function draftBreannaSleeve(params) {
  const {
    store,
    sa,
    measurements,
    options,
    Point,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    complete,
    paperless,
    macro,
    part,
  } = params

  // Wrist
  let top = paths.sleevecap.edge('topLeft').y
  points.centerWrist = new Point(
    0,
    top +
      measurements.shoulderToWrist * (1 + options.sleeveLengthBonus) * (1 + options.verticalEase)
  )
  points.wristRight = points.centerWrist.shift(0, (measurements.wrist * (1 + options.cuffEase)) / 2)
  points.wristLeft = points.wristRight.rotate(180, points.centerWrist)
  points.sleeveTip = paths.sleevecap.shiftFractionAlong(0.5)

  // Adjust seam length
  points.wristRight = points.bicepsRight.shiftTowards(
    points.wristRight,
    points.bicepsLeft.dist(points.wristLeft)
  )

  // Paths
  paths.sleevecap.hide()
  paths.seam = new Path()
    .move(points.bicepsLeft)
    .line(points.wristLeft)
    .line(points.wristRight)
    .line(points.bicepsRight)
    .join(paths.sleevecap)
    .close()
    .attr('class', 'fabric')

  // Anchor point for sampling
  points.gridAnchor = new Point(0, 0)

  store.cutlist.addCut()

  // Complete pattern?
  if (complete) {
    points.logo = points.centerBiceps.shiftFractionTowards(points.centerWrist, 0.3)
    snippets.logo = new Snippet('logo', points.logo)
    macro('title', { at: points.centerBiceps, nr: 3, title: 'sleeve' })
    macro('grainline', { from: points.centerWrist, to: points.centerBiceps })
    points.scaleboxAnchor = points.scalebox = points.centerBiceps.shiftFractionTowards(
      points.centerWrist,
      0.5
    )
    macro('scalebox', { at: points.scalebox })

    // Figure out where notches go
    let q1 = new Path().move(points.bicepsRight)._curve(points.capQ1Cp1, points.capQ1)
    let q1Len = q1.length()
    let frontTarget = store.get('frontArmholeToArmholePitch')
    if (q1Len === frontTarget) points.frontNotch = points.capQ1.clone()
    else if (q1Len > frontTarget) points.frontNotch = q1.shiftAlong(frontTarget)
    else {
      let q2 = new Path()
        .move(points.capQ1)
        .curve(points.capQ1Cp2, points.capQ2Cp1, points.capQ2)
        .curve(points.capQ2Cp2, points.capQ3Cp1, points.capQ3)
      points.frontNotch = q2.shiftAlong(frontTarget - q1Len)
    }
    let q4 = new Path().move(points.bicepsLeft)._curve(points.capQ4Cp2, points.capQ4)
    let q4Len = q4.length()
    let backTarget = store.get('backArmholeToArmholePitch')
    if (q4Len === backTarget) points.backNotch = points.capQ4.clone()
    else if (q4Len > backTarget) points.backNotch = q4.shiftAlong(backTarget)
    else {
      let q3 = new Path()
        .move(points.capQ4)
        .curve(points.capQ4Cp1, points.capQ3Cp2, points.capQ3)
        .curve(points.capQ3Cp1, points.capQ2Cp2, points.capQ2)
      points.backNotch = q3.shiftAlong(backTarget - q4Len)
    }
    snippets.frontNotch = new Snippet('notch', points.frontNotch)
    snippets.backNotch = new Snippet('bnotch', points.backNotch)

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
  }

  // Paperless?
  if (paperless) {
    macro('vd', {
      from: points.wristLeft,
      to: points.bicepsLeft,
      x: points.bicepsLeft.x - sa - 15,
    })
    macro('vd', {
      from: points.wristLeft,
      to: points.sleeveTip,
      x: points.bicepsLeft.x - sa - 30,
    })
    macro('hd', {
      from: points.bicepsLeft,
      to: points.bicepsRight,
      y: points.sleeveTip.y - sa - 30,
    })
    macro('hd', {
      from: points.wristLeft,
      to: points.wristRight,
      y: points.wristLeft.y + sa + 30,
    })
    macro('pd', {
      path: paths.sleevecap.reverse(),
      d: -1 * sa - 15,
    })
  }
  return part
}

export const sleeve = {
  name: 'breanna.sleeve',
  from: sleeveCap,
  after: [front, frontBase, back],
  measurements: ['shoulderToWrist', 'wrist'],
  options: {
    cuffEase: { pct: 20, min: 0, max: 50, menu: 'fit' },
    sleeveLengthBonus: { pct: 0, min: -40, max: 10, menu: 'style' },
  },
  draft: draftBreannaSleeve,
}
