import { base } from './base.mjs'

function draftFront({ points, paths, Snippet, snippets, sa, macro, store, part }) {
  paths.back.hide()
  paths.side.hide()
  paths.front.addClass('fabric')

  points.titleAnchor = points.bustPoint.shiftFractionTowards(points.strapFrontLeft, 0.3)

  store.cutlist.setCut({ cut: 2, from: 'fabric', onFold: true })

  macro('title', {
    at: points.titleAnchor,
    nr: 1,
    title: 'front',
    scale: 0.5,
  })

  snippets.bustPoint = new Snippet('notch', points.bustPoint)
  snippets.frontJoin = new Snippet('notch', points.frontJoin)

  if (sa) {
    paths.sa = macro('sa', {
      paths: ['frontBand', 'frontSideJoin', null, 'frontStrap', null],
    })
  }

  macro('cutonfold', {
    from: points.cfNeck,
    to: points.cfBand,
    grainline: true,
  })

  macro('pd', {
    id: 'frontBand',
    path: paths.frontBand,
    d: sa + 15,
  })

  macro('pd', {
    id: 'frontSideJoin',
    path: paths.frontSideJoin,
    d: sa + 15,
  })

  macro('pd', {
    id: 'frontStrap',
    path: paths.frontStrap.reverse(),
    d: -sa - 15,
  })

  macro('vd', {
    id: 'frontFold',
    from: points.cfNeck,
    to: points.cfBand,
    x: -15,
  })

  macro('vd', {
    id: 'frontNeck',
    from: points.strapFrontLeft,
    to: points.cfNeck,
    x: -15,
  })

  macro('vd', {
    id: 'frontSide',
    from: points.strapFrontRight,
    to: points.sfArmpitDartRight,
    x: Math.max(points.strapFrontRight.x, points.sfArmpitDartRight.x) + 15,
  })

  macro('hd', {
    id: 'frontNeck',
    from: points.cfNeck,
    to: points.strapFrontLeft,
    y: points.strapFrontLeft.y - 15,
  })

  return part
}

export const front = {
  name: 'sabrina.front',
  from: base,
  hide: { from: true },
  draft: draftFront,
}
