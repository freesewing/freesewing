import { PartyModeSharp } from '@material-ui/icons'
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

  let seatDepth = (measurements.crotchDepth /* - measurements.waistToHips */) * (1 + options.waistRaise) 

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

  let fPaths = (new Path().move(points.fWaistSide)
  .curve(points.fWaistCrotchCP, points.fHipCrotchCP, points.mHip)).split(points.fCutOutHip)

  points.fCutOutHipCp = fPaths[1].ops[1].cp2.shiftFractionTowards(points.fCutOutHip, 1.25)

  let bPaths = (new Path().move(points.bWaistSide)
  .curve(points.bWaistCrotchCP, points.bHipCrotchCP, points.mHip)).split(points.bCutOutHip)

  points.bCutOutHipCp = bPaths[1].ops[1].cp2.shiftFractionTowards(points.bCutOutHip, 1.25)

  paths.cutout2 = new Path()
    .move(points.bWaistAdjusted)
    .curve(points.bWaistAdjusted, points.bCutOutHipCp, points.bCutOutHip)
    .join(bPaths[1])
    .join(fPaths[1].reverse())
    .curve(points.fCutOutHipCp,points.fWaistAdjusted,points.fWaistAdjusted)
    .attr('class', 'lining')
    .setRender(true)
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
