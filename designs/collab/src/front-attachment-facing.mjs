import { frontAttachment } from './front-attachment.mjs'

function draftFrontAttachmentFacing({
  Point,
  points,
  Path,
  paths,
  store,
  part,
  measurements,
  options,
  complete,
  sa,
  paperless,
  snippets,
  Snippet,
  macro,
  absoluteOptions,
  utils,
}) {
  points.waistLeft = points.topRight.shiftFractionTowards(
    points.frontPocketStart,
    options.frontAttachmentWidth
  )
  points.waistRight = points.frontPocketStart.shiftFractionTowards(points.topRight, 0.95)
  points.startLeft = new Point(points.waistLeft.x, points.frontPocketCurveStart.y)
  points.startRight = new Point(points.waistRight.x, points.frontPocketCurveStart.y)
  points.edgeLeft = points.foldLeft.shiftFractionTowards(points.startLeft, -0.4)
  points.edgeRight = new Point(points.waistRight.x, points.edgeLeft.y)

  paths.seam = new Path()
    .move(points.startLeft)
    .line(points.edgeLeft)
    .line(points.edgeRight)
    .line(points.startRight)
    .line(points.startLeft)
    .close()

  // Complete?
  if (complete) {
    // Overwrite title from frontBase
    points.title = points.waistLeft
      .shiftFractionTowards(points.waistRight, 0.1)
      .shift(-90, points.foldRight.y / 1.5)
    macro('title', {
      at: points.title,
      nr: 9,
      title: 'frontAttachmentFacing',
    })

    // Overwrite logo from frontBase
    points.logo = points.title.shift(-70, 70)
    snippets.logo = new Snippet('logo', points.logo).scale(0.666)

    paths.fold = new Path().move(points.foldLeft).line(points.foldRight).addClass('help note')
    macro('banner', {
      path: paths.fold,
      text: 'foldHere',
      className: 'text-sm fill-note',
    })

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
  }

  return part
}

export const frontAttachmentFacing = {
  name: 'collab:frontAttachmentFacing',
  draft: draftFrontAttachmentFacing,
  from: frontAttachment,
}
