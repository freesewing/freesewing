import { back } from './back.mjs'

function draftCarltonBackStay({
  sa,
  snippets,
  Snippet,
  store,
  points,
  macro,
  expand,
  Point,
  paths,
  Path,
  part,
}) {
  if (expand) store.flag.preset('expandIsOn')
  else {
    // Expand is on, do not draw the part but flag this to the user
    store.flag.note({
      msg: `carlton:cutBackStay`,
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
    .move(points.bpStart)
    .curve(points.bsCp1, points.bsCp2, points.bpEnd)
    .line(points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    .join(paths.backArmhole)
    .line(points.s3CollarSplit)
    .join(paths.backCollar)
    .line(points.bpStart)
    .close()
    .addClass('canvas')

  if (sa) paths.sa = paths.seam.offset(sa).addClass('canvas sa')

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
  store.cutlist.addCut({ cut: 1, from: 'canvas', onFold: true })

  // Title
  macro('rmtitle')
  macro('title', {
    at: points.title,
    nr: '2a',
    title: 'backStay',
  })

  // Grainline
  macro('cutonfold', {
    from: points.cbNeck,
    to: points.bpStart,
    grainline: true,
    reverse: true,
  })

  // Logo
  points.logo = new Point(points.s3CollarSplit.x, points.title.y / 2)
  snippets.logo = new Snippet('logo', points.logo)

  // Dimensions
  macro('vd', {
    id: 'hBottomToArmhole',
    from: points.bpEnd,
    to: points.armhole,
    x: points.armhole.x + 15 + sa,
  })
  macro('vd', {
    id: 'hBottomToShoulder',
    from: points.bpEnd,
    to: points.s3ArmholeSplit,
    x: points.armhole.x + 30 + sa,
  })
  macro('vd', {
    id: 'hFull',
    from: points.bpEnd,
    to: points.s3CollarSplit,
    x: points.armhole.x + 45 + sa,
  })
  macro('hd', {
    id: 'wNeckOpening',
    from: points.cbNeck,
    to: points.s3CollarSplit,
    y: points.s3CollarSplit.y - 15 - sa,
  })
  macro('hd', {
    id: 'wCbToArmholePitch',
    from: points.cbNeck,
    to: points.armholePitch,
    y: points.s3CollarSplit.y - 30 - sa,
  })
  macro('hd', {
    id: 'wCbToShoulder',
    from: points.cbNeck,
    to: points.shoulder,
    y: points.s3CollarSplit.y - 45 - sa,
  })
  macro('hd', {
    id: 'wFull',
    from: points.cbNeck,
    to: points.armhole,
    y: points.s3CollarSplit.y - 60 - sa,
  })
  macro('vd', {
    id: 'hToCenter',
    from: points.bpEnd,
    to: points.bpStart,
    x: points.bpStart.x - 15 + sa,
  })
  macro('vd', {
    id: 'hToNeck',
    from: points.bpEnd,
    to: points.cbNeck,
    x: points.bpStart.x - 30 + sa,
  })

  return part
}

export const backStay = {
  name: 'carlton.backStay',
  from: back,
  draft: draftCarltonBackStay,
}
