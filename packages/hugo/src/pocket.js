export default function (part) {
  // Remove clutter
  const pocket = part.paths.pocket
  part.paths = {}
  part.snippets = {}

  const { utils, store, sa, points, Path, paths, complete, paperless, macro } = part.shorthand()

  paths.seam = pocket
    .line(points.cfRibbing)
    .line(points.pocketHem)
    .close()
    .attr('class', 'fabric', true)
  paths.seam.render = true

  paths.saBase = new Path()
    .move(points.cfRibbing)
    .line(points.pocketHem)
    .join(paths.seam
      .split(points.pocketCf)
      .shift()
    )
    .setRender(false)

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
  paths.facing.render = false

  // Complete pattern?
  if (complete) {
    paths.facing.render = true
    macro('cutonfold', {
      from: points.pocketCf,
      to: points.cfRibbing,
      grainline: true,
    })
    points.title = points.cfRibbing.shiftFractionTowards(points.pocketTop, 0.5)
    macro('title', { at: points.title, nr: 4, title: 'pocket' })
    if (sa) {
      paths.sa = paths.saBase.offset(sa)
        .line(points.pocketCf)
        .move(points.cfRibbing)
      paths.sa.line(paths.sa.start())
        .attr('class', 'fabric sa')
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
