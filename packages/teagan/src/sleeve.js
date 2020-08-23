import { dimensions } from './shared'

export default function (part) {
  let {
    store,
    sa,
    Point,
    points,
    Path,
    paths,
    options,
    complete,
    paperless,
    macro,
    utils,
    units,
    measurements
  } = part.shorthand()

  let height = points.bicepsRight.x * options.sleeveLength
  let width = measurements.biceps * (1 + options.bicepsEase) * (1 + options.sleeveEase)
  if (width > points.bicepsRight.x * 2) width = points.bicepsRight.x * 2
  points.hemLeft = new Point(width / -2, height)
  points.hemRight = new Point(width / 2, height)

  paths.sleevecap = new Path()
    .move(points.bicepsRight)
    .curve(points.bicepsRight, points.capQ1Cp1, points.capQ1)
    .curve(points.capQ1Cp2, points.capQ2Cp1, points.capQ2)
    .curve(points.capQ2Cp2, points.capQ3Cp1, points.capQ3)
    .curve(points.capQ3Cp2, points.capQ4Cp1, points.capQ4)
    .curve(points.capQ4Cp2, points.bicepsLeft, points.bicepsLeft)
    .line(points.hemLeft)
    .line(points.hemRight)
    .line(points.bicepsRight)

  let target = store.get('frontArmholeLength') + store.get('backArmholeLength')
  let ist = paths.sleevecap.length()
  console.log({ target, ist })

  return part

  // Complete pattern?
  if (complete) {
    macro('cutonfold', {
      from: points.cfNeck,
      to: points.cfHem,
      grainline: true
    })

    macro('title', { at: points.title, nr: 2, title: 'back' })
    points.scaleboxAnchor = points.scalebox = points.title.shift(90, 100)
    macro('scalebox', { at: points.scalebox })
  }

  // Paperless?
  if (paperless) {
    //dimensions(macro, points, sa)
    //macro('vd', {
    //  from: points.cbHem,
    //  to: points.cbNeck,
    //  x: points.cbHem.x - sa - 15
    //})
  }

  return part
}
