import { frontPocketBag } from './front-pocket-bag.mjs'

/*
 * This is the exported part object
 */
export const frontPocketFacing = {
  name: 'collab:frontPocketFacing', // The name in design::part format
  draft: draftFrontPocketFacing, // The method to call to draft this part
  from: frontPocketBag, // Draft this starting from the (imported) frontPocketBag part
}

/*
 * This function drafts the front pocket facing of the skirt
 */
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
}) {
  /*
   * Clean up what we don't need
   */
  delete paths.pocketbagBoundary
  delete paths.pocketfacingBoundary
  macro('rmad') // Removes all dimensions

  /*
   * The seam line
   */
  paths.seam = new Path()
    .move(points.frontPocketBagStart)
    .line(points.frontPocketFacingCenter)
    .line(points.frontPocketFacingSide)
    .line(points.topRight)
    .join(paths.frontWaistSide)
    .line(points.frontPocketBagStart)
    .close()
    .addClass('fabric')

  /*
   * Fix text alignement on the side seam
   */
  paths.side = new Path()
    .move(points.frontPocketFacingSide)
    .line(points.topRight)
    .addClass('hidden')
    .addText('sideSeam', 'center fill-note text-sm')
    .attr('data-text-dy', -1)

  // Complete?
  if (complete) {
    /*
     * Add the title
     */
    macro('title', {
      at: points.title,
      nr: 6,
      title: 'frontPocketFacing',
    })

    /*
     * Add cut-on-fold indicator
     */
    macro('cutonfold', {
      from: points.frontPocketBagStart,
      to: points.frontPocketFacingCenter,
      grainline: true,
    })

    /*
     * Only add SA when requested
     */
    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
  }

  /*
   * Only add dimensions for paperless when requested
   */
  if (paperless) {
    macro('hd', {
      from: points.frontPocketFacingCenter,
      to: points.frontPocketFacingSide,
      y: points.frontPocketFacingCenter.y + sa + 15,
    })
    macro('hd', {
      from: points.frontPocketBagStart,
      to: points.topRight,
      y: points.topRight.y - sa - 15,
    })
    macro('vd', {
      from: points.frontPocketFacingCenter,
      to: points.frontPocketBagStart,
      x: points.frontPocketFacingCenter.x - sa - 15,
    })
  }

  return part
}
