import { base } from './base.mjs'

function draftBack({ points, paths, Snippet, snippets, sa, macro, store, part }) {
  paths.front.hide()
  paths.side.hide()
  paths.back.addClass('fabric')

  points.titleAnchor = points.cbBand
    .shiftFractionTowards(points.cbNeck, 0.8)
    .shiftFractionTowards(points.sbBand, 0.8)

  snippets.backJoin = new Snippet('bnotch', points.backJoin)

  store.cutlist.setCut({ cut: 2, from: 'fabric', onFold: true })

  macro('title', {
    at: points.titleAnchor,
    nr: 2,
    title: 'back',
    scale: 0.5,
  })

  if (sa) {
    paths.sa = macro('sa', {
      paths: ['backSideJoin', 'backBand', null, 'backStrap', null],
    })
  }

  macro('cutonfold', {
    from: points.cbBand,
    to: points.cbNeck,
    grainline: true,
  })

  macro('pd', {
    id: 'backBand',
    path: paths.backBand,
    d: sa + 15,
  })

  macro('pd', {
    id: 'backSideJoin',
    path: paths.backSideJoin,
    d: sa + 15,
  })

  macro('pd', {
    id: 'backStrap',
    path: paths.backStrap.reverse(),
    d: -sa - 15,
  })

  macro('vd', {
    id: 'backFold',
    from: points.cbNeck,
    to: points.cbBand,
    x: points.cbBand.x + 15,
  })

  macro('vd', {
    id: 'backNeck',
    from: points.strapBackLeft,
    to: points.cbNeck,
    x: points.cbBand.x + 15,
  })

  macro('vd', {
    id: 'backSide',
    from: points.strapBackRight,
    to: points.sbArmpitDartRight,
    x: Math.min(points.strapBackRight.x, points.sbArmpitDartRight.x) - 15,
  })

  macro('hd', {
    id: 'backNeck',
    from: points.strapBackLeft,
    to: points.cbNeck,
    y: points.strapBackLeft.y - 15,
  })

  return part
}

export const back = {
  name: 'sabrina.back',
  from: base,
  hide: { from: true },
  draft: draftBack,
}
