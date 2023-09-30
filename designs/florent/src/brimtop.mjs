import { brimBottom } from './brimbottom.mjs'

function draftFlorentBrimTop({ sa, points, macro, paths, Path, store, part }) {
  paths.hint = new Path()
    .move(points.tipLeft)
    .curve(points.tipLeftCp2, points.outerMidCp1, points.outerMid)
    .curve(points.outerMidCp2, points.tipRightCp1, points.tipRight)
    .attr('class', 'dashed stroke-sm')
  paths.rest = new Path()
    .move(points.tipRight)
    .curve(points.tipRightCp2, points.innerMidCp1, points.innerMid)
    .curve(points.innerMidCp2, points.tipLeftCp1, points.tipLeft)
    .line(paths.seam.start())

  paths.seam = paths.hint.offset(3).join(paths.rest).close().addClass('fabric')

  if (sa)
    paths.sa = paths.hint
      .offset(sa + 3)
      .join(paths.rest.offset(sa))
      .close()
      .addClass('fabric sa')
  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 1, from: 'fabric' })

  // Grainline
  macro('grainline', {
    from: points.outerMid,
    to: points.innerMid,
  })

  // Title
  points.title = points.innerMid.shiftFractionTowards(points.outerMidCp2, 0.35)
  macro('title', {
    at: points.title,
    nr: 4,
    title: 'brimTop',
  })

  // Dimensions
  macro('rmad')
  let bottom = paths.seam.edge('bottom')
  macro('hd', {
    id: 'wFull',
    from: paths.seam.edge('left'),
    to: paths.seam.edge('right'),
    y: points.tipLeft.y - sa - 15,
  })
  macro('vd', {
    id: 'hBrim',
    from: bottom,
    to: points.innerMid,
    x: points.innerMid.x - 15,
  })
  macro('vd', {
    id: 'hFull',
    from: bottom,
    to: points.tipRight,
    x: points.tipRight.x + sa + 18,
  })

  return part
}

export const brimTop = {
  name: 'florent.brimTop',
  from: brimBottom,
  draft: draftFlorentBrimTop,
}
