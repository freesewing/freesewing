import { brimBottom } from './brimbottom.mjs'

function draftFlorentBrimInterfacing({ sa, complete, points, macro, paths, Path, store, part }) {
  paths.hint = paths.seam.clone().attr('class', 'dashed stroke-sm')

  paths.outset = new Path()
    .move(points.tipLeft)
    .curve(points.tipLeftCp2, points.outerMidCp1, points.outerMid)
    .curve(points.outerMidCp2, points.tipRightCp1, points.tipRight)
    .attr('class', 'lining')
  points.outsetStart = paths.outset.shiftAlong(5)
  points.outsetEnd = paths.outset.reverse().shiftAlong(5)
  paths.outset = paths.outset.split(points.outsetStart).pop().split(points.outsetEnd).shift()

  paths.inset = new Path()
    .move(points.tipLeft)
    .curve(points.tipLeftCp1, points.innerMidCp2, points.innerMid)
    .curve(points.innerMidCp1, points.tipRightCp2, points.tipRight)
    .attr('class', 'various')
  points.insetStart = paths.inset.shiftAlong(5)
  points.insetEnd = paths.inset.reverse().shiftAlong(5)
  paths.inset = paths.inset.split(points.insetStart).pop().split(points.insetEnd).shift()
  paths.inset.hide()
  paths.outset.hide()

  if (complete) paths.hint = paths.seam.clone().attr('class', 'dashed stroke-sm')

  paths.seam = paths.outset
    .clone()
    .line(paths.inset.end())
    .join(paths.inset.reverse())
    .line(paths.outset.start())
    .close()
    .addClass('interfacing')

  // Clean up
  for (let i of Object.keys(paths)) {
    if (['seam', 'inset', 'outset'].indexOf(i) === -1) delete paths[i]
  }

  /*
   * Annotations
   */
  store.cutlist.setCut({ cut: 1, from: 'rigidInterfacing' })

  // Grainline
  macro('grainline', {
    from: points.outerMid,
    to: points.innerMid,
  })

  // Title
  points.title = points.innerMid.shiftFractionTowards(points.outerMidCp2, 0.35)
  macro('rmtitle')
  macro('title', {
    at: points.title,
    nr: 5,
    title: 'brimInterfacing',
  })

  // Dimensions
  macro('hd', {
    id: 'wFull',
    from: paths.seam.edge('left'),
    to: paths.seam.edge('right'),
    y: points.tipLeft.y - sa - 15,
  })
  macro('vd', {
    id: 'hBrim',
    text: 'BOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOBs',
    from: paths.outset.edge('bottom'),
    to: paths.inset.edge('bottom'),
    x: points.innerMid.x - 15,
  })
  macro('vd', {
    id: 'hFull',
    from: paths.outset.edge('bottom'),
    to: paths.inset.edge('topRight'),
    x: points.tipRight.x + sa + 18,
  })

  return part
}

export const brimInterfacing = {
  name: 'florent.brimInterfacing',
  from: brimBottom,
  draft: draftFlorentBrimInterfacing,
}
