import { brimBottom } from './brimbottom.mjs'

function draftFlorentBrimTop({ paperless, sa, complete, points, macro, paths, Path, part }) {
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

  paths.seam = paths.hint.offset(3).join(paths.rest).close().attr('class', 'fabric')

  macro('grainline', {
    from: points.outerMid,
    to: points.innerMid,
  })

  if (complete) {
    points.title = points.innerMid.shiftFractionTowards(points.outerMidCp2, 0.35)
    macro('title', {
      at: points.title,
      nr: 4,
      title: 'brimTop',
    })

    if (sa)
      paths.sa = paths.hint
        .offset(sa + 3)
        .join(paths.rest.offset(sa))
        .close()
        .attr('class', 'fabric sa')

    if (paperless) {
      let bottom = paths.seam.edge('bottom')
      macro('hd', {
        from: paths.seam.edge('left'),
        to: paths.seam.edge('right'),
        y: points.tipLeft.y - sa - 15,
      })
      macro('vd', {
        from: bottom,
        to: points.innerMid,
        x: points.innerMid.x - 15,
      })
      macro('vd', {
        from: bottom,
        to: points.tipRight,
        x: points.tipRight.x + sa + 18,
      })
    }
  }

  return part
}

export const brimTop = {
  name: 'florent.brimTop',
  from: brimBottom,
  draft: draftFlorentBrimTop,
}
