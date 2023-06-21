import { frontPocketBag } from './front-pocket-bag.mjs'

function draftFrontPocketFacing({
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
    .line(points.frontPocketFacingCenter)
    .line(points.frontPocketFacingSide)
    .line(points.topRight)
    .join(paths.frontWaistSide)
    .line(points.frontPocketBagStart)
    .close()
    .addClass('fabric')

  // Clean up
  delete paths.pocketbagBoundary
  delete paths.pocketfacingBoundary

  // Fix text alignement on side seam
  paths.side = new Path()
    .move(points.frontPocketFacingSide)
    .line(points.topRight)
    .addClass('hidden')
    .addText('sideSeam', 'center fill-note text-sm')
    .attr('data-text-dy', -1)

  // Complete?
  if (complete) {
    macro('title', {
      at: points.title,
      nr: 6,
      title: 'frontPocketFacing',
    })

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (false && paperless) {
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

export const frontPocketFacing = {
  name: 'collab:frontPocketFacing',
  draft: draftFrontPocketFacing,
  from: frontPocketBag,
}
