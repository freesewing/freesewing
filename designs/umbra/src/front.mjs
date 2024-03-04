import { base } from './base.mjs'

export const front = {
  name: 'umbra.front',
  from: base,
  draft: draftUmbraFront,
}

/*
 * This drafts the front of Umbra, or rather recycles what's needed from base
 */
function draftUmbraFront({
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
  units,
  part,
}) {
  if (store.get('bulge')) {
    paths.seamBase = new Path()
      .move(points.cfBulgeSplit)
      .curve(points.bulgeCpBottom, points.cfGussetBulgeCp, points.cfGussetBulge)
      .line(points.cfBackGussetBulge)
  } else {
    paths.seamBase = new Path().move(points.cfBackGussetBulge)
  }
  paths.seamBase = paths.seamBase
    .line(points.backGussetSplitBulge)
    .join(paths.elasticLegFront)
    .line(points.sideWaistbandFront)
    .curve(points.cfWaistbandDipCp1Front, points.cfWaistbandDipCp2Front, points.cfWaistbandDipFront)
    .hide()
  if (expand) {
    macro('mirror', {
      mirror: [new Point(0, 0), new Point(0, 100)],
      paths: ['seamBase'],
      clone: true,
    })
    paths.seam = paths.seamBase.join(paths.mirroredSeamBase.reverse())
    paths.mirroredSeamBase.hide()

    macro('mirror', {
      mirror: [new Point(0, 0), new Point(0, 100)],
      paths: ['pocketShape', 'zipperCut'],
      points: ['pocketTop'],
      clone: true,
    })
  } else {
    paths.seam = paths.seamBase.clone().close()
  }
  paths.seam.unhide().addClass('fabric')
  if (sa) {
    paths.saBase = new Path()
      .move(points.cfBackGussetBulge)
      .line(points.backGussetSplitBulge)
      .join(paths.elasticLegFront)
      .line(points.sideWaistbandFront)
      .curve(
        points.cfWaistbandDipCp1Front,
        points.cfWaistbandDipCp2Front,
        points.cfWaistbandDipFront
      )
      .hide()

    if (expand) {
      macro('mirror', {
        mirror: [new Point(0, 0), new Point(0, 100)],
        paths: ['saBase'],
        clone: true,
      })
      paths.saBase = paths.saBase.join(paths.mirroredSaBase.reverse()).close().hide()
      paths.sa = paths.saBase.offset(sa).setClass('fabric sa').unhide()
    } else {
      paths.sa = paths.saBase
        .offset(sa)
        .reverse()
        .line(new Point(0, points.cfBackGussetBulge.y))
        .line(points.cfBulgeSplit)
        .reverse()
        .line(points.cfWaistbandDipFront)
        .setClass('fabric sa')
        .unhide()
    }
  }
  store.cutlist.setCut({ cut: 1, from: 'fabric', onFold: !expand })
  store.cutlist.addCut({ cut: 1, from: 'lining', onFold: !expand })
  points.title = points.cfWaistbandDipFront.shift(-45, 20).shift(-90, 40)
  if (expand) {
    macro('grainline', {
      to: store.get('bulge') ? points.cfBulgeSplit : points.cfBackGusset,
      from: points.cfWaistbandDipFront,
    })
  } else {
    macro('cutonfold', {
      to: store.get('bulge') ? points.cfBulgeSplit : points.cfBackGusset,
      from: points.cfWaistbandDipFront,
      grainline: true,
    })
  }
  macro('hd', {
    id: 'wAtWaistband',
    from: points.cfWaistbandDipFront,
    to: points.sideWaistbandFront,
    y: points.sideWaistbandFront.y - sa - 15,
  })

  macro('vd', {
    id: 'grainline',
    from: points.cfWaistbandDipFront,
    to: points.cfBackGussetBulge,
    x: -30,
  })

  if (store.get('bulge')) {
    macro('vd', {
      id: 'grainline2',
      from: points.cfWaistbandDipFront,
      to: points.cfBulgeSplit,
      x: -15,
    })
  }

  macro('vd', {
    id: 'outer',
    from: points.sideWaistbandFront,
    to: points.sideLegFront,
    x: points.sideSeat.x + 15,
  })

  if (options.frontDip !== 0) {
    macro('vd', {
      id: 'outer2',
      from: points.cfWaistbandDipFront,
      to: points.sideLegFront,
      x: points.sideSeat.x,
    })
  }

  macro('vd', {
    id: 'waistbandDip',
    from: points.cfWaistbandDipFront,
    to: points.sideWaistbandFront,
    x: -15,
  })

  macro('vd', {
    id: 'heightToWaist',
    from: points.cfWaistbandDipFront,
    to: points.backGussetSplitBulge,
    x: points.backGussetSplitBulge.x,
  })

  macro('hd', {
    id: 'heightToSideLeg',
    from: points.backGussetSplitBulge,
    to: points.sideLegFront,
    y: points.backGussetSplitBulge.y,
  })

  if (options.bulge >= 2) {
    macro('hd', {
      id: 'bulgeHeight',
      from: points.cfBulgeSplit,
      to: points.cfBackGussetBulge,
      y: points.cfBackGussetBulge.y + 15,
    })
  }

  macro('hd', {
    id: 'backGusset',
    to: points.backGussetSplitBulge,
    from: points.cfBackGussetBulge,
    y: points.cfBackGussetBulge.y + 15,
  })

  let frontCenter = points.sideWaistbandFront.shiftFractionTowards(points.sideLegFront, 0.5)
  snippets.sideFrontCenter = new Snippet('notch', frontCenter)
  if (expand) {
    snippets.sideFrontCenterMirrored = new Snippet(
      'notch',
      new Point(-frontCenter.x, frontCenter.y)
    )
  }

  if (points.pocketSeamBottom) {
    snippets.pocketTop = new Snippet('notch', points.pocketSeamTop)
    snippets.pocketBottom = new Snippet('notch', points.pocketSeamBottom)
    if (expand) {
      snippets.pocketTopMirrored = new Snippet(
        'notch',
        new Point(-points.pocketSeamTop.x, points.pocketSeamTop.y)
      )
      snippets.pocketBottomMirrored = new Snippet(
        'notch',
        new Point(-points.pocketSeamBottom.x, points.pocketSeamBottom.y)
      )
    }
  }

  /*
   * Clean up paths from base
   */
  delete paths.back
  delete paths.front
  delete paths.saBase

  /*
   * Title
   */
  macro('title', {
    at: points.title,
    nr: 1,
    title: 'front',
    notes: [
      'umbra:waistbandMeasure',
      units(store.get('waistbandElasticLength')),
      '\n',
      'umbra:legMeasure',
      units(store.get('legElasticLength')),
    ],
  })

  return part
}
