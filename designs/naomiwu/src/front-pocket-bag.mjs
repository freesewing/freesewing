import { frontBase } from './front-base.mjs'

/*
 * This is the exported part object
 */
export const frontPocketBag = {
  name: 'naomiwu.frontPocketBag', // The name in design::part format
  draft: draftFrontPocketBag, // The method to call to draft this part
  from: frontBase, // Draft this starting from the (imported) frontBase part
}

/*
 * This function drafts the front pocket bag of the skirt
 */
function draftFrontPocketBag({
  Point,
  points,
  Path,
  paths,
  part,
  store,
  sa,
  snippets,
  Snippet,
  macro,
}) {
  /*
   * Remove paths we don't need
   */
  delete paths.corner
  delete paths.hem
  delete paths.frontWaist
  delete paths.pocketbag

  /*
   * The seam line
   */
  paths.seam = new Path()
    .move(points.frontPocketBagStart)
    .line(points.frontPocketBagHem)
    .line(points.trueBottomRight)
    .line(points.topRight)
    .join(paths.frontWaistSide)
    .line(points.frontPocketBagStart)
    .close()
    .addClass('various')

  /*
   * Add SA only when requested
   */
  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

  /*
   * Annotations
   */

  // Cutlist
  store.cutlist.setCut({ cut: 2, from: 'lining', onFold: true })

  /*
   * Overwrite title from frontBase
   */
  points.title = new Point(
    points.frontPocketFacingCenter.x * 1.5,
    points.frontPocketFacingCenter.y / 1.5
  )
  macro('title', {
    at: points.title,
    nr: 5,
    title: 'frontPocketBag',
  })

  /*
   * Overwrite logo from frontBase
   */
  points.logo = points.title.shift(12, 100)
  snippets.logo = new Snippet('logo', points.logo)

  /*
   * Add a cut-on-fold indicator
   */
  macro('cutonfold', {
    from: points.frontPocketBagStart,
    to: points.frontPocketBagHem,
    grainline: true,
  })

  /*
   * Dimensions
   */
  macro('hd', {
    id: 'wAtTop',
    from: points.frontPocketBagStart,
    to: points.topRight,
    y: points.topLeft.y - sa - 15,
  })
  macro('hd', {
    id: 'wAtBottom',
    from: points.frontPocketBagHem,
    to: points.bottomRight,
    y: points.bottomLeft.y + sa + 15,
  })
  macro('vd', {
    id: 'hFull',
    from: points.frontPocketBagHem,
    to: points.frontPocketBagStart,
    x: points.frontPocketBagHem.x - sa - 15,
  })

  return part
}
