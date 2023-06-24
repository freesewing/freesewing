import { frontBase, xOnWaist } from './front-base.mjs'

function draftFrontAttachment({
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
  points.foldLeft = new Point(points.waistLeft.x, points.trueBottomRight.y)
  points.foldRight = new Point(points.waistRight.x, points.foldLeft.y)
  points.edgeLeft = points.foldLeft.shift(-90, points.foldLeft.y - points.frontPocketSide.y / 2)
  points.edgeRight = new Point(points.waistRight.x, points.edgeLeft.y)

  // Indicate corners on fold
  points.chamferLeft = points.foldLeft.shiftFractionTowards(
    points.foldRight,
    options.pocketChamferSize
  )
  points.chamferRight = points.foldRight.shiftFractionTowards(
    points.foldLeft,
    options.pocketChamferSize
  )
  points.chamferLeftTop = points.chamferLeft.rotate(90, points.foldLeft)
  points.chamferLeftBottom = points.chamferLeft.rotate(-90, points.foldLeft)
  points.chamferRightTop = new Point(points.foldRight.x, points.chamferLeftTop.y)
  points.chamferRightBottom = new Point(points.foldRight.x, points.chamferLeftBottom.y)

  paths.seam = new Path()
    .move(points.waistLeft)
    .line(points.edgeLeft)
    .line(points.edgeRight)
    .line(points.waistRight)
    .line(points.waistLeft)
    .close()
    .addClass('various')

  // Clean up a bit
  delete paths.corner
  delete paths.hem
  delete paths.side
  delete paths.frontWaist
  delete paths.pocketbag
  delete paths.pocketbagBoundary
  delete paths.pocketfacingBoundary

  // Complete?
  if (complete) {
    // Overwrite title from frontBase
    points.title = points.foldLeft
      .shiftFractionTowards(points.foldRight, 0.2)
      .shift(90, points.foldLeft.y / 2)
    macro('title', {
      at: points.title,
      nr: 8,
      title: 'frontAttachment',
    })

    // Overwrite logo from frontBase
    points.logo = points.title.shift(-70, 70)
    snippets.logo = new Snippet('logo', points.logo)

    paths.fold = new Path().move(points.foldLeft).line(points.foldRight).addClass('help note')
    paths.chamfer = new Path()
      .move(points.chamferLeftTop)
      .line(points.chamferLeft)
      .line(points.chamferLeftBottom)
      .move(points.chamferRightTop)
      .line(points.chamferRight)
      .line(points.chamferRightBottom)
      .addClass('note dashed stroke-sm')

    macro('banner', {
      path: paths.fold,
      text: 'foldHere',
      className: 'text-sm fill-note',
    })

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'various sa')
    }
  }

  // Paperless?
  if (paperless) {
  }

  return part
}

export const frontAttachment = {
  name: 'collab:frontAttachment',
  draft: draftFrontAttachment,
  from: frontBase,
}
