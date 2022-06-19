import { CreateCrotchPoints } from './util'

export default function (part) {
  let {
    options,
    measurements,
    Point,
    Path,
    points,
    paths,
    Snippet,
    snippets,
    complete,
    sa,
    paperless,
    macro,
  } = part.shorthand()

  let seatDepth = (measurements.crotchDepth - measurements.waistToHips) * (1 + options.waistRaise)

  points.mWaist = new Point(0, 0)
  points.mHip = points.mWaist.shift(270, seatDepth)

  CreateCrotchPoints(part)

  points.mWaist1 = new Point(points.mWaist.x, points.fWaistSide.y)
  points.mWaist2 = new Point(points.mWaist.x, points.bWaistSide.y)

  paths.seam = new Path()
    .move(points.mWaist1)
    .line(points.fWaistSide)
    .curve(points.fWaistCrotchCP, points.fHipCrotchCP, points.mHip)
    .curve(points.bHipCrotchCP, points.bWaistCrotchCP, points.bWaistSide)
    .line(points.mWaist2)
    .line(points.mWaist1)
    .close()
    .attr('class', 'fabric')

  // Complete?
  if (complete) {
    points.logo = points.mWaist.shift(270, 75)
    snippets.logo = new Snippet('logo', points.logo)
    points.title = points.logo.shift(-90, 55)
    macro('title', {
      nr: 2,
      at: points.title,
      title: 'cutout',
    })

    if (sa) {
      paths.seamAlternate = new Path()
        .move(points.bWaistSide)
        .curve(points.bWaistCrotchCP, points.bHipCrotchCP, points.mHip)
        .curve(points.fHipCrotchCP, points.fWaistCrotchCP, points.fWaistSide)

      paths.sa = paths.seamAlternate.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.fWaistSide,
      to: points.mWaist,
      y: points.mWaist.y,
    })
    macro('hd', {
      from: points.mWaist,
      to: points.bWaistSide,
      y: points.mWaist.y,
    })
    macro('vd', {
      from: points.mWaist1,
      to: points.mHip,
      x: points.mWaist.x,
    })
    macro('vd', {
      from: points.mWaist2,
      to: points.mWaist1,
      x: points.mWaist.x + 15,
    })
  }

  return part
}
