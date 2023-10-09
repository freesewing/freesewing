import { front } from './front.mjs'

function draftCarltonFrontLining({
  sa,
  snippets,
  Snippet,
  store,
  points,
  macro,
  Point,
  expand,
  paths,
  Path,
  part,
}) {
  if (expand) store.flag.preset('expandIsOn')
  else {
    // Expand is on, do not draw the part but flag this to the user
    store.flag.note({
      msg: `carlton:cutFrontLining`,
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
    .move(points.flbHem)
    .line(points.hem)
    .line(points.seat)
    .curve(points.seatCp2, points.waistCp1, points.waist)
    .curve_(points.waistCp2, points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    .join(paths.frontArmhole)
    .line(points.s3CollarSplit)
    .join(paths.frontCollar.split(points.flbTop)[0])
    .line(points.flbHem)
    .close()
    .addClass('lining')

  if (sa) paths.sa = paths.seam.offset(sa).addClass('lining sa')

  // Clean up
  macro('rmad')

  macro('rmbanner', 'flbFacing')
  macro('rmbanner', 'flbLining')
  for (const id in paths) {
    if (!['seam', 'sa'].includes(id)) delete paths[id]
  }
  for (const id in snippets) delete snippets[id]

  /*
   * Annotations
   */
  // Cut list
  store.cutlist.removeCut()
  store.cutlist.addCut({ cut: 2, from: 'lining' })

  // Title
  points.title = points.flbTop.shiftFractionTowards(points.seat, 0.5)
  macro('rmtitle')
  macro('title', {
    at: points.title,
    nr: '1b',
    title: 'frontLining',
    align: 'center',
  })

  // Logo
  points.logo = points.title.shift(-90, 100)
  snippets.logo = new Snippet('logo', points.logo)

  // Grainline
  points.grainlineTop = points.flbTop.shift(0, 30)
  points.grainlineBottom = new Point(points.grainlineTop.x, points.hemEdge.y)
  macro('grainline', {
    from: points.grainlineBottom,
    to: points.grainlineTop,
  })

  // Dimensions
  macro('hd', {
    id: 'wToHps',
    from: points.flbTop,
    to: points.s3CollarSplit,
    y: points.s3CollarSplit.y - sa - 15,
  })
  macro('hd', {
    id: 'wToHps',
    from: points.flbTop,
    to: points.s3CollarSplit,
    y: points.s3CollarSplit.y - sa - 15,
  })
  macro('hd', {
    id: 'wToShoulder',
    from: points.flbTop,
    to: points.s3ArmholeSplit,
    y: points.s3CollarSplit.y - sa - 30,
  })
  macro('hd', {
    id: 'wToArmhole',
    from: points.flbTop,
    to: points.armhole,
    y: points.s3CollarSplit.y - sa - 45,
  })
  macro('hd', {
    id: 'wToSeat',
    from: points.flbTop,
    to: points.seat,
    y: points.s3CollarSplit.y - sa - 60,
  })
  macro('vd', {
    id: 'hToCollar',
    from: points.flbHem,
    to: points.flbTop,
    x: points.flbTop.x - sa - 15,
  })
  macro('vd', {
    id: 'hFull',
    from: points.flbHem,
    to: points.s3CollarSplit,
    x: points.flbTop.x - sa - 30,
  })

  return part
}

export const frontLining = {
  name: 'carlton.frontLining',
  from: front,
  draft: draftCarltonFrontLining,
}
