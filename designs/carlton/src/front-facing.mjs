import { front } from './front.mjs'

function draftCarltonFrontFacing({
  sa,
  snippets,
  Snippet,
  store,
  points,
  macro,
  expand,
  paths,
  Path,
  part,
}) {
  if (expand) store.flag.preset('expandIsOn')
  else {
    // Expand is on, do not draw the part but flag this to the user
    store.flag.note({
      msg: `carlton:cutFrontFacing`,
      notes: 'flag:partHiddenByExpand',
      suggest: {
        text: 'flag:show',
        icon: 'expand',
        update: {
          settings: ['expand', 1],
        },
      },
    })
    // Also hint about expand
    store.flag.preset('expandIsOff')

    return part.hide()
  }

  paths.seam = new Path()
    .move(points.hemEdge)
    .line(points.flbHem)
    .line(points.flbTop)
    .join(paths.frontCollar.split(points.flbTop)[1])
    .line(points.collarTip)
    ._curve(points.lapelStraightEndCp1, points.lapelStraightEnd)
    .line(points.hemEdge)
    .close()
    .addClass('fabric')

  if (sa) paths.sa = paths.seam.offset(sa).addClass('fabric sa')

  // Clean up
  macro('rmad')
  for (const id in paths) {
    if (!['seam', 'sa'].includes(id)) delete paths[id]
  }
  for (const id in snippets) delete snippets[id]

  /*
   * Annotations
   */
  // Cut list
  store.cutlist.removeCut()
  store.cutlist.addCut({ cut: 2, from: 'fabric' })

  // Title
  points.title = points.cfNeck.shift(-90, 180)
  macro('title', {
    at: points.title,
    nr: '1a',
    title: 'frontFacing',
    align: 'center',
  })

  // Logo
  points.logo = points.title.shift(-90, 100)
  snippets.logo = new Snippet('logo', points.logo)

  // Grainline
  macro('grainline', {
    from: points.cfHem,
    to: points.cfNeck,
  })

  // Dimensions
  macro('hd', {
    id: 'wTop',
    from: points.collarTip,
    to: points.flbTop,
    y: points.flbTop.y - sa - 15,
  })
  macro('hd', {
    id: 'wFull',
    from: points.rollLineStart,
    to: points.flbTop,
    y: points.flbTop.y - sa - 30,
  })
  macro('vd', {
    id: 'hHemToCollar',
    from: points.hemEdge,
    to: points.collarTip,
    x: points.hemEdge.x - sa - 15,
  })
  macro('vd', {
    id: 'hFull',
    from: points.hemEdge,
    to: points.flbTop,
    x: points.hemEdge.x - sa - 30,
  })
  return part
}

export const frontFacing = {
  name: 'carlton.frontFacing',
  from: front,
  draft: draftCarltonFrontFacing,
}
