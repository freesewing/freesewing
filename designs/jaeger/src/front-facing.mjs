import { front } from './front.mjs'

function jaegerFrontFacing({
  sa,
  snippets,
  Snippet,
  store,
  points,
  expand,
  macro,
  Point,
  paths,
  Path,
  part,
}) {
  if (expand) store.flag.preset('expandIsOn')
  else {
    // Expand is on, do not draw the part but flag this to the user
    store.flag.note({
      msg: `jaeger:cutFrontFacing`,
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
  const bump = new Path()
    .move(points.ipfeStartStart)
    .curve(points.ipfeStartCp1, points.ipfeStartCp2, points.ipfeStartEnd)
    .line(points.ipfeTopRightStart)
    .curve(points.ipfeTopRightCp1, points.ipfeTopRightCp2, points.ipfeTopRightEnd)
    .curve(points.ipfeBottomRightCp2, points.ipfeBottomRightCp1, points.ipfeBottomRightStart)
    .line(points.ipfeEndEnd)
    .curve(points.ipfeEndCp2, points.ipfeEndCp1, points.ipfeEnd)
  paths.seam = new Path()
    .move(points.facingTop)
    .line(points.neck)
    .line(points.collarCorner)
    .line(points.notch)
    .line(points.notchEdge)
    ._curve(points.lapelStraightEndCp1, points.lapelStraightEnd)
    .line(points.cutawayPoint)
    .curve(points.cutawayPointCp2, points.roundStartCp1, points.roundStart)
    .join(
      new Path()
        .move(points.roundStart)
        .curve(points.roundCp1, points.roundCp2, points.roundEnd)
        .split(points.facingBottom)[0]
    )
    .line(points.ipfeEnd)
    .join(bump.reverse())
    .line(points.facingTop)
    .addClass('fabric')

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 2, from: 'fabric' })

  // Logo
  points.logo = new Point(points.cfNeckCp1.x, points.lapelBreakPoint.y)
  snippets.logo = new Snippet('logo', points.logo)

  // Title
  points.title = new Point(points.cfNeckCp1.x, points.lapelStraightEnd.y)
  macro('title', {
    at: points.title,
    nr: '1a',
    title: 'frontFacing',
    align: 'center',
  })

  // Grainline
  macro('grainline', {
    from: points.cfHips,
    to: new Point(points.cfArmhole.x, points.collarCorner.y),
  })

  return part
}

export const frontFacing = {
  name: 'jaeger.frontFacing',
  from: front,
  draft: jaegerFrontFacing,
}
