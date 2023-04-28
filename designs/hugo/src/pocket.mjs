import { front } from './front.mjs'

function hugoPocket({
  utils,
  store,
  sa,
  points,
  Path,
  paths,
  complete,
  paperless,
  macro,
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

  // Complete pattern?
  if (complete) {
    paths.facing.unhide()
    macro('cutonfold', {
      from: points.pocketCf,
      to: points.cfRibbing,
      grainline: true,
    })
    points.title = points.cfRibbing.shiftFractionTowards(points.pocketTop, 0.5)
    macro('title', { at: points.title, nr: 4, title: 'pocket' })
    if (sa) {
      paths.sa = paths.saBase.offset(sa).line(points.pocketCf).move(points.cfRibbing)
      paths.sa.line(paths.sa.start()).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.cfRibbing,
      to: points.pocketTop,
      y: points.cfRibbing.y + 15 + sa,
    })
    macro('hd', {
      from: points.cfRibbing,
      to: points.pocketTip,
      y: points.cfRibbing.y + 30 + sa,
    })
    macro('vd', {
      from: points.pocketHem,
      to: points.pocketTip,
      x: points.pocketTip.x + 15 + sa,
    })
    macro('vd', {
      from: points.pocketHem,
      to: points.pocketTop,
      x: points.cfRibbing.x - 15 - sa,
    })
  }

  return part
}

export const pocket = {
  name: 'hugo.pocket',
  from: front,
  draft: hugoPocket,
}
