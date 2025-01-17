import { pocketBag } from './pocket-bag.mjs'
import { shiftAndExtend } from './utils.mjs'

function draftPaulPocketFacing({
  points,
  paths,
  Path,
  macro,
  snippets,
  store,
  sa,
  options,
  utils,
  part,
}) {
  if (!options.frontPockets || !options.pocketFacing) {
    // no return here since we might need the construction for the pocketTrim part
    part.hide()
  }

  for (let id in paths) if (id !== 'outseam' && id !== 'pocketCurve') delete paths[id]
  for (let id in snippets) delete snippets[id]

  let height = store.get('pocketOpeningHeight')
  const bonusHeight = height * (1 + options.pocketFacingBonus)
  points.pocketFacingBottomCorner = shiftAndExtend(paths.outseam, bonusHeight)
  points.pocketFacingCenterBottomCorner = shiftAndExtend(
    paths.outseam,
    bonusHeight / 2 + height / 2
  )
  points.pocketFacingRightCorner = points.styleWaistOut.shiftFractionTowards(
    points.flyTop,
    options.pocketOpeningWidth * (1 + options.pocketFacingBonus)
  )
  points.pocketFacingInnerCorner = points.pocketFacingBottomCorner.translate(
    points.styleWaistOut.dx(points.pocketFacingRightCorner),
    points.styleWaistOut.dy(points.pocketFacingRightCorner)
  )

  points.pocketFacingTop = points.pocketTop.shiftTowards(
    points.styleWaistOut,
    -bonusHeight + height
  )
  points.pocketFacingCenterTop = points.pocketTop.shiftTowards(
    points.styleWaistOut,
    (-bonusHeight + height) / 2
  )
  paths.outerFacingCurve = paths.pocketCurve
    .reverse()
    .offset(bonusHeight - height)
    .line(points.pocketFacingTop)
    .hide()

  const intersects = paths.outerFacingCurve.intersects(paths.outseam)
  if (intersects.length > 0) {
    paths.outerFacingCurve = paths.outerFacingCurve.split(intersects[0])[1].hide()
  }

  paths.centerFacingCurve = paths.pocketCurve
    .reverse()
    .offset((bonusHeight - height) / 2)
    .line(points.pocketFacingCenterTop)
    .hide()

  const intersects2 = paths.centerFacingCurve.intersects(paths.outseam)
  if (intersects2.length > 0) {
    paths.centerFacingCurve = paths.centerFacingCurve.split(intersects2[0])[1].hide()
  }

  const outseam = paths.outseam.split(points.pocketFacingBottomCorner)[0]
  paths.pocketFacingCurve = macro('join', {
    paths: [
      new Path().move(paths.outerFacingCurve.end()).line(points.styleWaistOut),
      outseam,
      paths.outerFacingCurve.clone().unhide(),
    ],
  }).setClass('fabric')

  if (sa) {
    paths.sa = macro('sa', {
      paths: [
        new Path().move(paths.outerFacingCurve.end()).line(points.styleWaistOut).join(outseam),
        null,
      ],
    })
  }

  // Title
  points.center = points.styleWaistOut.shiftFractionTowards(points.pocketFacingInnerCorner, 0.5)

  points.grainlineTop = points.styleWaistOut.shiftFractionTowards(
    points.pocketFacingRightCorner,
    0.3
  )
  points.grainlineBottom = utils.beamIntersectsX(
    points.pocketFacingInnerCorner,
    points.pocketFacingBottomCorner,
    points.grainlineTop.x
  )

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
    at: points.center,
    nr: 12,
    title: 'pocketFacing',
    align: 'center',
  })

  macro('grainline', {
    from: points.grainlineTop,
    to: points.grainlineBottom,
  })

  macro('bartackAlong', {
    path: paths.outerFacingCurve.offset(-2.5),
    width: 5,
    density: 1,
  })

  macro('ld', {
    id: 'lWidth',
    from: points.styleWaistOut,
    to: points.pocketFacingTop,
    d: 10,
  })
  macro('ld', {
    id: 'lHeight',
    from: points.pocketFacingBottomCorner,
    to: points.styleWaistOut,
    d: 10,
  })

  return part
}

export const pocketFacing = {
  name: 'paul.pocketFacing',
  from: pocketBag,
  options: {
    pocketFacing: {
      bool: true,
      menu: (_, mergedOptions) => (mergedOptions.frontPockets ? 'construction' : false),
    },
    pocketFacingBonus: 0.4,
  },
  draft: draftPaulPocketFacing,
}
