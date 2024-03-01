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
    macro('mirror', {
      mirror: [new Point(0, 0), new Point(100, 0)],
      paths: ['back'],
      clone: true,
    })
    macro('mirror', {
      mirror: [new Point(0, 0), new Point(0, 100)],
      paths: ['mirroredBack'],
      clone: true,
    })
    paths.seam = paths.mirroredBack.join(paths.mirroredMirroredBack.reverse())
    paths.mirroredBack.hide()
    paths.mirroredMirroredBack.hide()

    if (sa) paths.sa = paths.seam.offset(sa * -1).addClass('fabric sa')

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
    macro('mirror', {
      mirror: [new Point(0, 0), new Point(100, 0)],
      paths: ['back'],
      clone: true,
    })
    paths.mirroredBack.hide()
    paths.saBase = paths.mirroredBack.reverse().hide()

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
