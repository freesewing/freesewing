import { base } from './base.mjs'

export const back = {
  name: 'uma.back',
  from: base,
  draft: draftUmaBack,
}

/*
 * This drafts the front of Uma, or rather recycles what's needed from base
 */
function draftUmaBack({
  Point,
  Path,
  points,
  paths,
  store,
  sa,
  Snippet,
  snippets,
  expand,
  macro,
  part,
}) {
  /*
   * We'll use this list later
   */
  const toFlip = [
    'cfWaistbandDipCpBack',
    'sideWaistbandBack',
    'sideLegBack',
    'backGussetSplitCpTop',
    'backGussetSplitCpBottom',
    'backGussetSplit',
  ]

  /*
   * Depending on the expand setting, we'll draw a full back
   * or one to be cut on the fold
   */
  if (expand) {
    /*
     * Expand is on, show the entire part
     */

    /*
     * We need the flip these points to construct the left half
     */
    for (const pid of toFlip) {
      // Flip new points along X-axis and Y-axis
      points[`${pid}Flipped`] = points[pid].flipX().flipY()
      // Flip existing points along Y-axis
      points[pid] = points[pid].flipY()
    }
    // Also Y-flip these central points
    points.cfWaistbandDipBack = points.cfWaistbandDipBack.flipY()
    points.cfBackGusset = points.cfBackGusset.flipY()

    /*
     * Draw the path
     */
    paths.seam = new Path()
      .move(points.backGussetSplitFlipped)
      .curve(
        points.backGussetSplitCpTopFlipped,
        points.backGussetSplitCpBottomFlipped,
        points.sideLegBackFlipped
      )
      .line(points.sideWaistbandBackFlipped)
      ._curve(points.cfWaistbandDipCpBackFlipped, points.cfWaistbandDipBack)
      .curve_(points.cfWaistbandDipCpBack, points.sideWaistbandBack)
      .line(points.sideLegBack)
      .curve(points.backGussetSplitCpBottom, points.backGussetSplitCpTop, points.backGussetSplit)
      .line(points.backGussetSplitFlipped)
      .close()
      .reverse()
      .addClass('fabric')

    if (sa) paths.sa = paths.seam.offset(sa).addClass('fabric sa')

    /*
     * Set the cutlist info
     */
    store.cutlist.setCut({ cut: 1, from: 'fabric' })

    /*
     * Add grainline
     */
    macro('grainline', {
      from: new Point(0, points.backGussetSplit.y),
      to: points.cfWaistbandDipBack,
    })

    /*
     * Dimensions
     */
    macro('hd', {
      id: 'wAtBottom',
      from: points.backGussetSplitFlipped,
      to: points.backGussetSplit,
      y: points.backGussetSplit.y + sa + 15,
    })
    macro('hd', {
      id: 'wAtLeg',
      from: points.sideLegBackFlipped,
      to: points.sideLegBack,
      y: points.backGussetSplit.y + sa + 30,
    })
    macro('hd', {
      id: 'wAtWaistband',
      from: points.sideWaistbandBackFlipped,
      to: points.sideWaistbandBack,
      y: points.sideWaistbandBack.y - sa - 15,
    })
  } else {
    /*
     * Expand is off, cut on fold
     */
    for (const pid of toFlip) {
      // Flip existing points along Y-axis
      points[pid] = points[pid].flipY()
    }
    // Also Y-flip these central points
    points.cfWaistbandDipBack = points.cfWaistbandDipBack.flipY()
    points.cfBackGusset = points.cfBackGusset.flipY()
    paths.saBase = new Path()
      .move(points.cfWaistbandDipBack)
      .curve_(points.cfWaistbandDipCpBack, points.sideWaistbandBack)
      .line(points.sideLegBack)
      .curve(points.backGussetSplitCpBottom, points.backGussetSplitCpTop, points.backGussetSplit)
      .line(points.cfBackGusset)
      .reverse()
      .hide()

    paths.seam = paths.saBase
      .clone()
      .line(points.cfWaistbandDipBack)
      .close()
      .unhide()
      .addClass('fabric')

    if (sa)
      paths.sa = new Path()
        .move(points.cfBackGusset)
        .join(paths.saBase.offset(sa))
        .line(paths.saBase.end())
        .addClass('fabric sa')

    /*
     * Set the cutlist info
     */
    store.cutlist.setCut({ cut: 1, from: 'fabric', onFold: true })

    /*
     * Add cut on fold indicator
     */
    macro('cutonfold', {
      from: points.cfWaistbandDipBack,
      to: points.cfBackGusset,
      grainline: true,
    })

    /*
     * Dimensions
     */
    macro('hd', {
      id: 'wAtBottom',
      from: points.cfBackGusset,
      to: points.backGussetSplit,
      y: points.cfBackGusset.y + sa + 15,
    })
    macro('hd', {
      id: 'wAtLeg',
      from: points.cfBackGusset,
      to: points.sideLegBack,
      y: points.cfBackGusset.y + sa + 30,
    })
    macro('hd', {
      id: 'wAtTop',
      from: points.cfWaistbandDipBack,
      to: points.sideWaistbandBack,
      y: points.sideWaistbandBack.y - sa - 15,
    })
  }

  /*
   * Dimensions
   */
  macro('vd', {
    id: 'hToLeg',
    from: points.backGussetSplit,
    to: points.sideLegBack,
    x: points.sideLegBack.x + sa + 15,
  })
  macro('vd', {
    id: 'hToCfWaistband',
    from: points.backGussetSplit,
    to: points.cfWaistbandDipBack,
    x: points.sideLegBack.x + sa + 30,
  })
  macro('vd', {
    id: 'hToSideWaistband',
    from: points.backGussetSplit,
    to: points.sideWaistbandBack,
    x: points.sideLegBack.x + sa + 45,
  })

  /*
   * Clean up paths from base
   */
  delete paths.back
  delete paths.front
  delete paths.gusset
  delete paths.frontAndGusset
  delete paths.bulge

  /*
   * Remaining annotations
   */

  /*
   * Title
   */
  points.title = points.cfWaistbandDipBack.shiftFractionTowards(points.backGussetSplitCpTop, 0.5)
  macro('title', {
    at: points.title,
    nr: 3,
    title: 'back',
  })

  /*
   * Logo
   */
  points.logo = points.title.shift(-90, 80)
  snippets.logo = new Snippet('logo', points.logo)

  return part
}
