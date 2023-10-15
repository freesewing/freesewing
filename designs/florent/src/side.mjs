import { top } from './top.mjs'

function draftFlorentSide({ store, sa, points, macro, paths, Path, snippets, Snippet, part }) {
  // Clean up
  for (let i of Object.keys(paths)) {
    if (i !== 'side') delete paths[i]
  }

  paths.seam = paths.side.clone().line(points.foldTop).attr('class', 'fabric')
  paths.seam.unhide()

  if (sa)
    paths.sa = new Path()
      .move(points.foldTop)
      .line(points.foldTop.shift(180, sa))
      .join(paths.side.offset(sa))
      .line(points.foldBottom)
      .addClass('fabric sa')

  /*
   * Annotations
   */
  for (let s in snippets) delete snippets[s]

  // cutlist
  store.cutlist.setCut([
    { cut: 1, from: 'fabric', onFold: true },
    { cut: 1, from: 'lining', onFold: true },
  ])

  // Cutonfold
  macro('cutonfold', {
    from: points.foldBottom,
    to: points.foldTop,
    offset: 15,
    grainline: true,
  })

  // Title
  points.title = points.innerGuide.shiftFractionTowards(points.outerGuide, 0.5)
  macro('title', {
    at: points.title,
    nr: 2,
    title: 'side',
  })

  // Logo
  points.logo = points.tipCp2.shiftFractionTowards(points.outerTopCp1, 0.5)
  snippets.logo = new Snippet('logo', points.logo).attr('data-scale', 0.75)

  // Notches
  points.notch1 = new Path()
    .move(points.tip)
    .curve(points.tipCp1, points.outerTopCp2, points.outerTop)
    .shiftAlong(store.get('topDistanceToFirstNotch'))
  points.notch2 = new Path()
    .move(points.tip)
    .curve(points.tipCp1, points.outerTopCp2, points.outerTop)
    .curve(points.outerTopCp1, points.outerGuideCp2, points.outerGuide)
    .shiftAlong(store.get('topDistanceToSecondNotch'))
  macro('sprinkle', {
    snippet: 'notch',
    on: ['notch1', 'notch2'],
  })

  // Dimensions
  macro('vd', {
    id: 'hFoldToTipRight',
    from: points.tip,
    to: points.foldBottom,
    x: points.tip.x + sa + 15,
  })
  macro('vd', {
    id: 'hFull',
    from: points.outerTop,
    to: points.foldBottom,
    x: points.tip.x + sa + 30,
  })
  macro('hd', {
    id: 'wAtFold',
    from: points.foldTop,
    to: points.foldBottom,
    y: points.foldTop.y - 15,
  })
  macro('hd', {
    id: 'wLeftToBottom',
    from: points.foldTop,
    to: points.outerTop,
    y: points.outerTop.y + sa + 15,
  })
  macro('hd', {
    id: 'wFull',
    from: points.foldTop,
    to: points.tip,
    y: points.outerTop.y + sa + 30,
  })

  return part
}

export const side = {
  name: 'florent.side',
  from: top,
  draft: draftFlorentSide,
}
