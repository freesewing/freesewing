import { front } from './front.mjs'

function jaegerChestPiece({
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
      msg: `jaeger:cutChestPiece`,
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

  for (const id in paths) delete paths[id]
  for (const id in snippets) delete snippets[id]

  // Paths
  paths.seam = new Path()
    .move(points.split)
    .curve(points.splitCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
    .line(points.neck)
    .line(points.collarCorner)
    .line(points.notch)
    .line(points.notchEdge)
    ._curve(points.lapelStraightEndCp1, points.lapelStraightEnd)
    .line(points.lapelBreakPoint)
    .curve(points.cutawayPoint, points.waist, points.fsArmhole)
    .close()
    .addClass('canvas')

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 2, from: 'canvas' })

  // Logo
  snippets.logo = new Snippet('logo', points.innerPocketBottomLeft)

  // Grainline
  macro('grainline', {
    from: new Point(points.cfNeck.x, points.lapelBreakPoint.y),
    to: points.cfNeck,
  })

  // Title
  macro('rmtitle')
  macro('title', {
    at: points.title,
    nr: '1c',
    title: 'chestPiece',
  })

  return part
}

export const chestPiece = {
  name: 'jaeger.chestPiece',
  from: front,
  draft: jaegerChestPiece,
}
