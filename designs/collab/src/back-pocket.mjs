import { back } from './back.mjs'

function draftBackPocket({
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
  // Draw the pocket
  points.waistCenter = points.topLeft.shiftFractionTowards(points.topRight, 0.5)
  points.hemCenter = new Point(points.waistCenter.x, points.bottomRight.y)
  points.pocketBottomRight = points.hemCenter.shiftFractionTowards(points.bottomRight, 0.75)
  points.pocketBottomLeft = points.hemCenter.shiftFractionTowards(points.bottomRight, -0.75)
  points.pocketTopRight = points.pocketBottomRight.shift(
    -90,
    points.pocketBottomRight.dy(points.topRight) * options.backPocketHeight
  )
  points.pocketTopLeft = new Point(points.pocketBottomLeft.x, points.pocketTopRight.y)

  // Indicate corners on fold
  points.chamferLeft = points.pocketBottomLeft.shiftFractionTowards(
    points.pocketBottomRight,
    options.pocketChamferSize
  )
  points.chamferRight = points.pocketBottomRight.shiftFractionTowards(
    points.pocketBottomLeft,
    options.pocketChamferSize
  )
  points.chamferLeftTop = points.chamferLeft.rotate(90, points.pocketBottomLeft)
  points.chamferRightTop = new Point(points.pocketBottomRight.x, points.chamferLeftTop.y)

  // Draw the pocket flap
  points.flapTopLeft = points.pocketTopRight.shiftFractionTowards(points.pocketTopLeft, 1.02)
  points.flapTopRight = points.pocketTopLeft.shiftFractionTowards(points.pocketTopRight, 1.02)
  points.flapBottomLeft = points.flapTopLeft.shift(
    -90,
    points.flapTopLeft.dy(points.pocketBottomLeft) / 3
  )
  points.flapBottomRight = points.flapTopRight.shift(
    -90,
    points.flapTopLeft.dy(points.pocketBottomLeft) / 4
  )

  // Paths
  paths.backSeam = paths.seam
  paths.backSeam.hide()

  paths.seam = new Path()
    .move(points.pocketTopLeft)
    .line(points.chamferLeftTop)
    .line(points.chamferLeft)
    .line(points.chamferRight)
    .line(points.chamferRightTop)
    .line(points.pocketTopRight)
    .line(points.pocketTopLeft)
    .close()
    .addClass('fabric')

  // Clean up
  delete paths.cb
  delete paths.hem
  delete paths.hipLine
  delete paths.side

  // Complete?
  if (complete) {
    points.title = points.pocketTopLeft.shiftFractionTowards(points.chamferLeft, 0.5)
    macro('title', {
      at: points.title,
      nr: 10,
      title: 'backPocket',
    })

    // Overwrite logo from frontBase
    points.logo = points.title.shift(20, 80)
    snippets.logo = new Snippet('logo', points.logo).scale(0.5)

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
  }

  return part
}

export const backPocket = {
  name: 'collab:backPocket',
  draft: draftBackPocket,
  from: back,
}
