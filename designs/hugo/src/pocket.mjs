import { front } from './front.mjs'

function hugoPocket({
  utils,
  store,
  sa,
  points,
  Path,
  paths,
  complete,
  macro,
  expand,
  snippets,
  part,
}) {
  // Remove clutter
  for (const key in paths) {
    if (key !== 'pocket') delete paths[key]
  }
  for (const key in snippets) delete snippets[key]

  paths.seam = paths.pocket
    .line(points.cfRibbing)
    .line(points.pocketHem)
    .close()
    .attr('class', 'fabric', true)
  paths.seam.unhide()

  paths.saBase = new Path()
    .move(points.cfRibbing)
    .line(points.pocketHem)
    .line(points.pocketTip)
    ._curve(points.pocketTopCp, points.pocketTop)
    .line(points.pocketCf)
    .hide()

  store.set('facingWidth', points.pocketHem.dist(points.pocketTip) / 2)

  let facing = new Path()
    .move(points.pocketTip)
    .curve(points.pocketTip, points.pocketTopCp, points.pocketTop)
    .offset(store.get('facingWidth') * -1)

  points._tmp = facing.shiftAlong(2)
  points.facingEnd = utils.beamsIntersect(
    points._tmp,
    facing.start(),
    points.pocketHem,
    points.pocketTip
  )
  paths.facing = new Path()
    .move(points.facingEnd)
    .line(facing.start())
    .join(facing)
    .attr('class', ' fabric help')
  paths.facing.hide()

  /*
   * paths.facing needs to be available to draft the pocket facing
   * So we can only check for exand here and hide the the part when its off
   * so that the facing can still be drafted
   */
  if (expand) store.flag.preset('expandIsOn')
  else {
    // Expand is on, do not draw the part but flag this to the user
    store.flag.note({
      msg: `hugo:cutPocket`,
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

  if (complete) paths.facing.unhide().addClass('note dashed')

  if (sa) {
    paths.sa = paths.saBase.offset(sa).line(points.pocketCf).move(points.cfRibbing)
    paths.sa.line(paths.sa.start()).attr('class', 'fabric sa')
  }

  /*
   * Annotations
   */
  // cutlist
  store.cutlist.setCut({ cut: 2, from: 'fabric' })

  // Cutonfold
  macro('cutonfold', {
    to: points.cfRibbing,
    from: points.pocketCf,
    grainline: true,
    reverse: true,
  })

  // Title
  points.title = points.cfRibbing.shiftFractionTowards(points.pocketTop, 0.5)
  macro('title', { at: points.title, nr: 4, title: 'pocket' })

  // Dimensions
  macro('hd', {
    id: 'wAtWaist',
    from: points.cfRibbing,
    to: points.pocketHem,
    y: points.cfRibbing.y + 15 + sa,
  })
  macro('hd', {
    id: 'wFull',
    from: points.cfRibbing,
    to: points.pocketTip,
    y: points.cfRibbing.y + 30 + sa,
  })
  macro('vd', {
    id: 'hWaistToTip',
    from: points.pocketHem,
    to: points.pocketTip,
    x: points.pocketTip.x + 15 + sa,
  })
  macro('vd', {
    id: 'hFull',
    from: points.pocketHem,
    to: points.pocketTop,
    x: points.cfRibbing.x - 15 - sa,
  })

  return part
}

export const pocket = {
  name: 'hugo.pocket',
  from: front,
  draft: hugoPocket,
}
