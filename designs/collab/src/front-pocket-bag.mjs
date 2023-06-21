import { frontBase, xOnWaist } from './front-base.mjs'

function draftFrontPocketBag({
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
  paths.seam = new Path()
    .move(points.frontPocketBagStart)
    .line(points.frontPocketBagHem)
    .line(points.trueBottomRight)
    .line(points.topRight)
    .join(paths.frontWaistSide)
    .line(points.frontPocketBagStart)
    .close()
    .addClass('various')

  // Clean up a bit
  delete paths.corner
  delete paths.hem
  delete paths.frontWaist
  delete paths.pocketbag

  // Complete?
  if (complete) {
    // Overwrite title from frontBase
    points.title = new Point(
      points.frontPocketFacingCenter.x * 1.5,
      points.frontPocketFacingCenter.y / 1.5
    )
    macro('title', {
      at: points.title,
      nr: 5,
      title: 'frontPocketBag',
    })

    // Overwrite logo from frontBase
    points.logo = points.title.shift(12, 100)
    snippets.logo = new Snippet('logo', points.logo)
    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.topLeft,
      to: points.topRight,
      y: points.topLeft.y - sa - 15,
    })
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + sa + 15,
    })
  }

  return part
}

export const frontPocketBag = {
  name: 'collab:frontPocketBag',
  draft: draftFrontPocketBag,
  from: frontBase,
}
