import { backPocket } from './back-pocket.mjs'

function draftBackPocketFlap({
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
  paths.flap = new Path()
    .move(points.flapTopRight)
    .line(points.flapTopLeft)
    .line(points.flapBottomLeft)
    .line(points.flapBottomRight)
    .line(points.flapTopRight)
    .close()

  // Clean up

  // Complete?
  if (complete) {
    points.title = points.pocketTopLeft.shiftFractionTowards(points.chamferLeft, 0.5)
    macro('title', {
      at: points.title,
      nr: 11,
      title: 'backPocketFlap',
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
    macro('vd', {
      from: points.chamferLeft,
      to: points.pocketTopLeft,
      x: 0,
    })
  }

  return part
}

export const backPocketFlap = {
  name: 'collab:backPocketFlap',
  draft: draftBackPocketFlap,
  from: backPocket,
}
