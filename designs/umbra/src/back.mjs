import { base } from './base.mjs'

export const back = {
  name: 'umbra.back',
  from: base,
  draft: draftUmbraBack,
}

/*
 * This drafts the back of Umbra, or rather recycles what's needed from base
 */
function draftUmbraBack({
  Point,
  Path,
  points,
  paths,
  store,
  sa,
  Snippet,
  snippets,
  options,
  expand,
  macro,
  part,
}) {
  /*
   * We'll use this list later
   */
  const toFlip = [
    'cfWaistbandDipCp1Back',
    'cfWaistbandDipCp2Back',
    'sideWaistbandBack',
    'sideLegBack',
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

    if (options.flipBack) {
      /*
       * We need the flip these points to construct the left half
       */
      for (const pid of toFlip) {
        // Flip existing points along Y-axis
        points[pid] = points[pid].flipY()
      }
      // Also Y-flip these central points
      points.cfWaistbandDipBack = points.cfWaistbandDipBack.flipY()
      points.cfBackGusset = points.cfBackGusset.flipY()
    }

    /*
     * Draw the path
     */
    if (options.flipBack) {
      macro('mirror', {
        mirror: [new Point(0, 0), new Point(100, 0)],
        paths: ['back'],
        clone: true,
      })
    } else {
      paths.mirroredBack = paths.back.reverse()
    }
    macro('mirror', {
      mirror: [new Point(0, 0), new Point(0, 100)],
      paths: ['mirroredBack'],
      clone: true,
    })
    paths.seam = paths.mirroredBack.join(paths.mirroredMirroredBack.reverse()).addClass('fabric')
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
  } else {
    if (options.flipBack) {
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
    } else {
      paths.saBase = paths.back
    }

    paths.seam = paths.saBase
      .clone()
      .line(points.cfWaistbandDipBack)
      .close()
      .unhide()
      .addClass('fabric')

    if (sa) {
      paths.sa = new Path()
        .move(points.cfBackGusset)
        .join(paths.saBase.offset(sa))
        .line(paths.saBase.end())
        .addClass('fabric sa')
    }

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
  }

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
  if (options.backDip !== 0) {
    macro('vd', {
      id: 'hToSideWaistband',
      from: points.backGussetSplit,
      to: points.sideWaistbandBack,
      x: points.sideLegBack.x + sa + 45,
    })
  }

  let backCenter = points.sideWaistbandBack.shiftFractionTowards(points.sideLegBack, 0.5)
  snippets.sideBackCenter = new Snippet('notch', backCenter)
  if (expand) {
    snippets.sideBackCenterMirrored = new Snippet('notch', new Point(-backCenter.x, backCenter.y))
  }

  /*
   * Clean up paths from base
   */
  delete paths.back
  delete paths.front
  delete paths.gusset
  delete paths.frontAndGusset
  delete paths.bulge
  delete paths.pocketHeight
  delete paths.saBase
  delete paths.pocketShape
  delete paths.zipper
  delete paths.mirroredZipper
  delete paths.zipperCut

  /*
   * Title
   */
  if (options.flipBack) {
    points.title = points.cfWaistbandDipBack.shift(0, 20).shift(-90, 50)
  } else {
    points.title = points.cfWaistbandDipBack.shift(0, 20).shift(90, 50)
  }

  macro('title', {
    at: points.title,
    nr: 2,
    title: 'back',
  })

  /*
   * Logo
   */
  points.logo = points.title.shiftFractionTowards(points.sideLegBack, 0.6).shift(-90, 20)
  snippets.logo = new Snippet('logo', points.logo)

  return part
}
