import { front } from './front.mjs'
import { shiftAndExtend } from './utils.mjs'

function draftPaulPocketBag({
  points,
  measurements,
  paths,
  Path,
  macro,
  snippets,
  store,
  sa,
  options,
  complete,
  part,
  expand,
}) {
  if (!options.frontPockets) {
    return part.hide()
  }

  for (let id in paths) if (id !== 'outseam' && id !== 'pocketCurve') delete paths[id]
  for (let id in snippets) delete snippets[id]

  let height = store.get('pocketOpeningHeight')

  let pocketDepth = measurements.waistToUpperLeg * options.pocketDepth
  let pocketBagSlant = 1 - options.pocketBagSlant
  points.pocketBagTop = points.pocketTop.shiftFractionTowards(points.flyTop, options.pocketBagWidth)
  points.pocketBagLeft = shiftAndExtend(paths.outseam, height + pocketDepth * pocketBagSlant)
  points.pocketBagBottom = points.pocketBagTop.shift(
    points.styleWaistOut.angle(points.styleWaistIn) - 90,
    pocketDepth + height
  )

  paths.outseamA = paths.outseam.split(points.pocketBagLeft)[0].hide()
  try {
    paths.outseamB = paths.outseamA.split(points.pocketLeft)[1].hide()
  } catch (e) {
    paths.outseamB = paths.outseamA
  }
  try {
    paths.outseamC = paths.outseamA.split(points.pocketLeft)[0].hide()
  } catch (e) {
    paths.outseamC = paths.outseamA
  }

  macro('mirror', {
    points: ['pocketBagTop', 'pocketBagLeft', 'styleWaistOut'],
    paths: ['outseamA'],
    mirror: [points.pocketBagTop, points.pocketBagBottom],
  })

  if (expand) {
    paths.pocketBagBottom = new Path()
      .move(points.pocketBagLeft)
      .line(points.pocketBagBottom)
      .line(points.mirroredPocketBagLeft)
      .hide()

    paths.pocketBagUpper = paths.mirroredOutseamA
      .reverse()
      .line(points.mirroredStyleWaistOut)
      .line(points.pocketBagTop)
      .line(points.pocketTop)
      .join(paths.pocketCurve)
      .join(paths.outseamB)
      .hide()

    paths.pocketBagCurve = paths.pocketBagBottom
      .join(paths.pocketBagUpper)
      .close()
      .addClass('lining')

    if (sa) {
      paths.sa = macro('sa', {
        paths: ['pocketBagUpper', { p: 'pocketBagBottom', offset: sa * 2 }],
        class: 'lining sa',
      })

      paths.saMark = paths.pocketBagBottom.offset(sa).addClass('sa mark')
    }

    if (complete) {
      paths.center = new Path()
        .move(points.pocketBagTop)
        .line(points.pocketBagBottom)
        .addClass('lining help')
    }

    macro('grainline', {
      from: points.pocketBagTop.shiftTowards(points.styleWaistOut, 10),
      to: points.pocketBagBottom.shiftTowards(points.pocketBagLeft, 10),
    })
  } else {
    paths.pocketBagBottom = new Path()
      .move(paths.outseamB.end())
      .line(points.pocketBagBottom)
      .hide()

    paths.saBase = new Path()
      .move(points.pocketBagTop)
      .line(points.pocketTop)
      .join(paths.pocketCurve)
      .join(paths.outseamB)
      .hide()

    paths.pocketBagCurve = paths.saBase
      .clone()
      .line(points.pocketBagBottom)
      .close()
      .unhide()
      .addClass('lining')

    paths.alternativeCurve = new Path()
      .move(points.pocketTop)
      .join(paths.outseamC)
      .addClass('lining')

    if (sa) {
      paths.sa = macro('sa', {
        paths: ['saBase', { p: 'pocketBagBottom', offset: 2 * sa }, null],
        class: 'lining sa',
      })
      paths.sa2 = macro('sa', {
        paths: ['alternativeCurve', null],
        class: 'lining sa',
      })
      paths.saMark = paths.pocketBagBottom.offset(sa).addClass('sa mark')
    }

    macro('cutonfold', {
      from: points.pocketBagBottom,
      to: points.pocketBagTop,
      grainline: true,
    })
  }

  store.cutlist.setCut({ cut: 2, from: 'lining', onFold: !expand })

  // Title
  points.titleAnchor = points.pocketCorner.shiftFractionTowards(points.pocketBagLeft, 0.5)
  macro('title', {
    at: points.titleAnchor,
    nr: 11,
    title: 'pocketBag',
    align: 'center',
  })

  macro('ld', {
    id: 'wPocket',
    from: points.styleWaistOut,
    to: points.pocketTop,
    d: expand ? 0 : 10,
  })
  macro('ld', {
    id: 'hPocket',
    from: points.styleWaistOut,
    to: points.pocketLeft,
    d: expand ? 0 : -10,
  })
  macro('ld', {
    id: 'vCenter',
    from: points.pocketBagTop,
    to: points.pocketBagBottom,
    d: 10,
  })
  macro('ld', {
    id: 'hTop',
    from: points.styleWaistOut,
    to: points.pocketBagTop,
    d: 10,
  })
  macro('ld', {
    id: 'hBottom',
    from: points.pocketBagLeft,
    to: points.pocketBagBottom,
    d: -10,
  })
  macro('pd', {
    id: 'pOutseam',
    path: paths.outseamB,
  })

  return part
}

export const pocketBag = {
  name: 'paul.pocketBag',
  from: front,
  options: {
    pocketBagSlant: { pct: 0, min: -30, max: 30, menu: 'style.frontPockets' },
    pocketBagWidth: { pct: 90, min: 10, max: 100, menu: 'style.frontPockets' },
  },
  draft: draftPaulPocketBag,
}
