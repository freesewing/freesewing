import { pocketFacing } from './pocket-facing.mjs'

function draftPaulPocketTrim({ points, paths, Path, macro, store, sa, options, part }) {
  if (!options.frontPockets || !options.pocketTrim) {
    return part.hide()
  }

  paths.saBase = new Path()
    .move(points.pocketFacingCenterTop)
    .join(paths.pocketCurve)
    .line(points.pocketFacingCenterBottomCorner)
    .hide()

  paths.pocketFacingCurve = paths.centerFacingCurve
    .clone()
    .join(paths.saBase)
    .close()
    .setClass('fabric')

  if (sa) {
    paths.sa = macro('sa', {
      paths: ['saBase', null],
    })
  }

  points.grainlineTop = points.pocketTop.shiftFractionTowards(points.pocketFacingCenterTop, 0.25)
  points.grainlineBottom = paths.centerFacingCurve.intersectsX(points.grainlineTop.x)[0]

  // straighten part
  // const rotAngle = -points.styleWaistOut.angle(points.pocketFacingRightCorner)
  // paths.pocketFacingCurve = paths.pocketFacingCurve
  //   .rotate(rotAngle, points.center)
  //   .addClass('fabric')
  // if (sa) paths.sa = paths.sa.rotate(rotAngle, points.center).addClass('fabric sa')
  // points.grainlineTop = points.grainlineTop.rotate(rotAngle, points.center)
  // points.grainlineBottom = points.grainlineBottom.rotate(rotAngle, points.center)

  store.cutlist.setCut({ cut: 2, from: 'fabric' })

  macro('title', {
    at: points.pocketTop.shiftFractionTowards(points.grainlineBottom, 0.25),
    nr: 13,
    title: 'pocketTrim',
    align: 'left',
    scale: 0.25,
  })

  macro('grainline', {
    from: points.grainlineTop,
    to: points.grainlineBottom,
  })

  macro('bartackAlong', {
    path: paths.centerFacingCurve.offset(-2.5),
    width: 5,
    density: 1,
  })

  macro('ld', {
    id: 'wPocket',
    from: points.styleWaistOut,
    to: points.pocketTop,
    d: 0,
  })
  macro('ld', {
    id: 'hPocket',
    to: points.styleWaistOut,
    from: points.pocketLeft,
    d: 0,
  })
  macro('ld', {
    id: 'lWidth',
    from: points.styleWaistOut,
    to: points.pocketFacingCenterTop,
    d: 10,
  })
  macro('ld', {
    id: 'lHeight',
    from: points.pocketFacingCenterBottomCorner,
    to: points.styleWaistOut,
    d: 10,
  })

  return part
}

export const pocketTrim = {
  name: 'paul.pocketTrim',
  from: pocketFacing,
  options: {
    pocketTrim: {
      bool: true,
      menu: (_, mergedOptions) => (mergedOptions.frontPockets ? 'construction' : false),
    },
  },
  draft: draftPaulPocketTrim,
}
