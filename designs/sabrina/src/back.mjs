import { base } from './base.mjs'

function draftBack({ points, paths, Snippet, snippets, sa, macro, store, part }) {
  paths.front.hide()
  paths.side.hide()
  paths.back.addClass('fabric')

  // macro('mirror', {
  //   clone: true,
  //   mirror: [
  //     points.cbNeck.shiftFractionTowards(points.cfNeck, 0.5),
  //     points.cbBand.shiftFractionTowards(points.cfBand, 0.5),
  //   ],
  //   paths: ['back', 'backSideJoin', 'backBand', 'backStrap'],
  //   points: Object.keys(points),
  // })
  //
  // // mirror plugin doesn't reverse paths
  // paths.mirroredBack = paths.mirroredBack.reverse().addClass('fabric')
  // paths.mirroredBackSideJoin = paths.mirroredBackSideJoin.reverse().hide()
  // paths.mirroredBackBand = paths.mirroredBackBand.reverse().hide()
  // paths.mirroredBackStrap = paths.mirroredBackStrap.reverse().hide()

  points.titleAnchor = points.cbBand.shiftFractionTowards(points.cbNeck, 0.1).translate(-80, 0)

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
