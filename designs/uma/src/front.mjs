import { base } from './base.mjs'

export const front = {
  name: 'uma.front',
  from: base,
  draft: draftUmaFront,
}

/*
 * This drafts the front of Uma, or rather recycles what's needed from base
 */
function draftUmaFront({
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
   * Does the user have/want a bulge?
   */
  if (store.get('bulge')) {
    /*
     * Return the bulge version of the front which means that:
     * - Front and gusset together form one part
     * - Front cannot be cut on the fold
     */
    paths.seam = paths.bulge.clone().setClass('fabric')
    delete paths.bulge
    delete paths.back
    delete paths.frontAndGusset

    if (sa) paths.sa = paths.seam.offset(sa).addClass('fabric sa')

    /*
     * Set the cutlist info
     */
    store.cutlist.setCut([
      { cut: 2, from: 'fabric' },
      { cut: 2, from: 'lining' },
    ])

    /*
     * Set title and logo anchor
     */
    points.title = new Point(points.sideLegCp.x / 2, points.sideLegCp.y)
    points.logo = points.title.shift(210, 60)

    /*
     * Add grainline
     */
    macro('grainline', {
      from: new Point(points.logo.x, points.backGussetSplitBulge.y),
      to: new Point(points.logo.x, points.cfWaistbandDip.y),
    })

    /*
     * Dimensions
     */
    macro('hd', {
      id: 'wAtTop',
      from: points.cfWaistbandDip,
      to: points.sideWaistband,
      y: points.sideWaistband.y - sa - 15,
    })
    macro('hd', {
      id: 'wFull',
      from: points.cfWaistbandDip,
      to: points.sideLeg,
      y: points.sideWaistband.y - sa - 30,
    })
    macro('hd', {
      id: 'wWedge',
      from: points.cfWaistbandDip,
      to: points.cfMiddleBulge,
      y: points.cfMiddleBulge.y + sa + 15,
    })
    macro('hd', {
      id: 'wTusk',
      from: points.cfWaistbandDip,
      to: points.backGussetSplitBulge,
      y: points.cfMiddleBulge.y + sa + 30,
    })
    macro('vd', {
      id: 'hToCf',
      from: points.cfMiddleBulge,
      to: points.cfWaistbandDip,
      x: points.cfWaistbandDip.x - sa - 15,
    })
    macro('vd', {
      id: 'hFull',
      from: points.cfMiddleBulge,
      to: points.sideWaistband,
      x: points.cfWaistbandDip.x - sa - 30,
    })
    macro('vd', {
      id: 'hSide',
      from: points.sideLeg,
      to: points.sideWaistband,
      x: points.sideWaistband.x + sa + 15,
    })
  } else {
    /*
     * Return the regular version of the front which means that:
     * - Front and gusset are different parts
     * - Front can be cut on the fold
     */

    if (expand) {
      /*
       * Expand is on, show the entire part
       */

      /*
       * We need the flip these points to construct the left half
       */
      for (const pid of [
        'cfWaistbandDipCp',
        'sideWaistband',
        'sideLeg',
        'sideLegCp',
        'frontGussetSplitCpBottom',
        'frontGussetSplitCpTop',
        'frontGussetSplit',
      ])
        points[`${pid}Flipped`] = points[pid].flipX()

      /*
       * Draw the path
       */
      paths.seam = new Path()
        .move(points.cfWaistbandDip)
        .curve_(points.cfWaistbandDipCpFlipped, points.sideWaistbandFlipped)
        .line(points.sideLegFlipped)
        .curve(
          points.frontGussetSplitCpTopFlipped,
          points.frontGussetSplitCpBottomFlipped,
          points.frontGussetSplitFlipped
        )
        .line(points.frontGussetSplit)
        .curve(points.frontGussetSplitCpBottom, points.frontGussetSplitCpTop, points.sideLeg)
        .line(points.sideWaistband)
        ._curve(points.cfWaistbandDipCp, points.cfWaistbandDip)
        .close()
        .addClass('fabric')
      if (sa) paths.sa = paths.seam.offset(sa).addClass('fabric sa')

      /*
       * Set the cutlist info
       */
      store.cutlist.setCut({ cut: 1, from: 'fabric' })

      /*
       * Set title and logo anchor
       */
      points.title = points.cfSeat.copy()
      points.logo = points.title.shift(30, 60)

      /*
       * Add grainline
       */
      macro('grainline', {
        from: points.cfFrontGusset,
        to: points.cfWaistbandDip,
      })

      /*
       * Dimensions
       */
      macro('hd', {
        id: 'wAtBottom',
        from: points.frontGussetSplitFlipped,
        to: points.frontGussetSplit,
        y: points.frontGussetSplit.y + sa + 15,
      })
      macro('hd', {
        id: 'wAtLeg',
        from: points.sideLegFlipped,
        to: points.sideLeg,
        y: points.frontGussetSplit.y + sa + 30,
      })
      macro('hd', {
        id: 'wAtWaistband',
        from: points.sideWaistbandFlipped,
        to: points.sideWaistband,
        y: points.sideWaistband.y - sa - 15,
      })
    } else {
      /*
       * Expand is off, cut on fold
       */
      paths.saBase = new Path()
        .move(points.cfFrontGusset)
        .line(points.frontGussetSplit)
        .curve(points.frontGussetSplitCpBottom, points.frontGussetSplitCpTop, points.sideLeg)
        .line(points.sideWaistband)
        ._curve(points.cfWaistbandDipCp, points.cfWaistbandDip)
        .hide()

      paths.seam = paths.saBase
        .clone()
        .line(points.cfFrontGusset)
        .close()
        .unhide()
        .addClass('fabric')

      if (sa)
        paths.sa = new Path()
          .move(points.cfFrontGusset)
          .join(paths.saBase.offset(sa))
          .line(paths.saBase.end())
          .setClass('fabric sa')
          .unhide()

      /*
       * Set the cutlist info
       */
      store.cutlist.setCut({ cut: 1, from: 'fabric', onFold: true })

      /*
       * Set title and logo anchor
       */
      points.title = new Point(points.frontGussetSplit.x / 3, points.cfSeat.y)
      points.logo = points.title.shift(30, 60)

      /*
       * Add cut on fold indicator
       */
      macro('cutonfold', {
        to: points.cfFrontGusset,
        from: points.cfWaistbandDip,
        grainline: true,
      })

      /*
       * Dimensions
       */
      macro('hd', {
        id: 'wAtBottom',
        from: points.cfFrontGusset,
        to: points.frontGussetSplit,
        y: points.frontGussetSplit.y + sa + 15,
      })
      macro('hd', {
        id: 'wAtLeg',
        from: points.cfFrontGusset,
        to: points.sideLeg,
        y: points.frontGussetSplit.y + sa + 30,
      })
      macro('hd', {
        id: 'wAtWaistband',
        from: points.cfWaistbandDip,
        to: points.sideWaistband,
        y: points.sideWaistband.y - sa - 15,
      })
    }

    /*
     * Dimensions
     */
    macro('vd', {
      id: 'hToSideLeg',
      from: points.frontGussetSplit,
      to: points.sideLeg,
      x: points.sideLeg.x + sa + 15,
    })
    macro('vd', {
      id: 'hToWaistbandDip',
      from: points.frontGussetSplit,
      to: points.cfWaistbandDip,
      x: points.sideLeg.x + sa + 30,
    })
    macro('vd', {
      id: 'hFull',
      from: points.frontGussetSplit,
      to: points.sideWaistband,
      x: points.sideLeg.x + sa + 45,
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
    nr: 1,
    title: 'front',
  })

  /*
   * Logo
   */
  snippets.logo = new Snippet('logo', points.logo)

  return part
}
