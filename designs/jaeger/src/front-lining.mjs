import { front } from './front.mjs'

function jaegerFrontLining({
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
      msg: `jaeger:cutFrontLining`,
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
    .move(points.roundStart)
    .curve(points.roundCp1, points.roundCp2, points.roundEnd)
    .split(points.facingBottom)[1]
    .line(points.hem)
    .line(points.hips)
    .curve(points.hipsCp2, points.waistCp1, points.waist)
    .curve_(points.waistCp2, points.split)
    .curve(points.splitCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
    .line(points.facingTop)
    .line(points.facingBottom)
    .close()
    .addClass('lining')

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 2, from: 'lining' })

  // Logo
  points.logo = new Point(points.chestPocketBottomRight.x, points.lapelBreakPoint.y)
  snippets.logo = new Snippet('logo', points.logo)

  // Title
  points.title = new Point(points.chestPocketBottom.x, points.lapelStraightEnd.y)
  macro('title', {
    at: points.title,
    nr: '1b',
    title: 'frontLining',
  })

  // Grainline
  macro('grainline', {
    from: new Point(points.facingTop.x, points.hem.y),
    to: points.facingTop,
  })

  return part
}

export const frontLining = {
  name: 'jaeger.frontLining',
  from: front,
  draft: jaegerFrontLining,
}
