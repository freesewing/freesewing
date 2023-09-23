import { base } from './base.mjs'

export const gusset = {
  name: 'uma.gusset',
  from: base,
  draft: draftUmaGusset,
}

/*
 * This drafts the front of Uma, or rather recycles what's needed from base
 */
function draftUmaGusset({ Path, points, paths, store, sa, expand, macro, part }) {
  /*
   * Does the user have/want a bulge?
   * If so, there is no gusset.
   */
  if (store.get('bulge')) return part.hide()
  else {
    /*
     * Depending on the expand setting, we'll draw a full gusset
     * or one to be cut on the fold
     */
    if (expand) {
      /*
       * Expand is on, show the entire part
       */

      /*
       * We need the flip these points to construct the left half
       */
      for (const pid of [
        'frontGussetSplit',
        'gussetFrontSplitCpBottom',
        'gussetFrontSplitCpTop',
        'sideMiddle',
        'gussetBackSplitCpTop',
        'gussetBackSplitCpBottom',
        'backGussetSplit',
      ])
        points[`${pid}Flipped`] = points[pid].flipX()

      /*
       * Draw the path
       */
      paths.seam = new Path()
        .move(points.cfFrontGusset)
        .line(points.frontGussetSplitFlipped)
        .curve(
          points.gussetFrontSplitCpTopFlipped,
          points.gussetFrontSplitCpBottomFlipped,
          points.sideMiddleFlipped
        )
        .curve(
          points.gussetBackSplitCpTopFlipped,
          points.gussetBackSplitCpBottomFlipped,
          points.backGussetSplitFlipped
        )
        .line(points.backGussetSplit)
        .curve(points.gussetBackSplitCpBottom, points.gussetBackSplitCpTop, points.sideMiddle)
        .curve(
          points.gussetFrontSplitCpBottom,
          points.gussetFrontSplitCpTop,
          points.frontGussetSplit
        )
        .line(points.cfFrontGusset)
        .close()
        .addClass('fabric')
      if (sa) paths.sa = paths.seam.offset(sa).addClass('fabric sa')

      /*
       * Set the cutlist info
       */
      store.cutlist.setCut({ cut: 2, from: 'fabric' })

      /*
       * Set title anchor
       */
      points.title = points.cfFrontGusset.shiftFractionTowards(points.cfMiddle, 0.5)

      /*
       * Add grainline
       */
      macro('grainline', {
        from: points.cfBackGusset,
        to: points.cfFrontGusset,
      })

      /*
       * Dimensions
       */
      macro('hd', {
        id: 'wAtMiddle',
        from: points.sideMiddleFlipped,
        to: points.sideMiddle,
      })
      macro('hd', {
        id: 'wAtTop',
        from: points.frontGussetSplitFlipped,
        to: points.frontGussetSplit,
        y: points.frontGussetSplit.y - sa - 15,
      })
      macro('hd', {
        id: 'wAtBottom',
        from: points.backGussetSplitFlipped,
        to: points.backGussetSplit,
        y: points.backGussetSplit.y + sa + 15,
      })
    } else {
      /*
       * Expand is off, cut on fold
       */
      paths.saBase = new Path()
        .move(points.cfBackGusset)
        .line(points.backGussetSplit)
        .curve(points.gussetBackSplitCpBottom, points.gussetBackSplitCpTop, points.sideMiddle)
        .curve(
          points.gussetFrontSplitCpBottom,
          points.gussetFrontSplitCpTop,
          points.frontGussetSplit
        )
        .line(points.cfFrontGusset)

      paths.seam = paths.saBase
        .clone()
        .line(points.cfBackGusset)
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
      store.cutlist.setCut({ cut: 2, from: 'fabric', onFold: true })

      /*
       * Set title anchor
       */
      points.title = points.cfFrontGusset.shiftFractionTowards(points.sideMiddle, 0.5)

      /*
       * Add cut on fold indicator
       */
      macro('cutonfold', {
        to: points.cfBackGusset,
        from: points.cfFrontGusset,
        grainline: true,
      })

      /*
       * Dimensions
       */
      macro('hd', {
        id: 'wAtMiddle',
        from: points.cfMiddle,
        to: points.sideMiddle,
      })
      macro('hd', {
        id: 'wAtBottom',
        from: points.cfBackGusset,
        to: points.backGussetSplit,
        y: points.backGussetSplit.y + sa + 15,
      })
      macro('hd', {
        id: 'wAtTop',
        from: points.cfFrontGusset,
        to: points.frontGussetSplit,
        y: points.frontGussetSplit.y - sa - 15,
      })
    }

    /*
     * Dimensions
     */
    const x = Math.max(points.frontGussetSplit.x, points.backGussetSplit.x)
    macro('vd', {
      id: 'hToMiddle',
      from: points.backGussetSplit,
      to: points.sideMiddle,
      x: x + sa + 15,
    })
    macro('vd', {
      id: 'hFromMiddle',
      from: points.sideMiddle,
      to: points.frontGussetSplit,
      x: x + sa + 15,
    })
    macro('vd', {
      id: 'hFull',
      from: points.backGussetSplit,
      to: points.frontGussetSplit,
      x: x + sa + 30,
    })
  }

  /*
   * Clean up paths from base
   */
  delete paths.back
  delete paths.front
  delete paths.gusset

  /*
   * Remaining annotations
   */

  /*
   * Title
   */
  macro('title', {
    at: points.title,
    nr: 2,
    title: 'gusset',
    scale: 0.666,
  })

  return part
}
