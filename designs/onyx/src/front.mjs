import { base } from './base.mjs'

function draftFront({
  utils,
  Path,
  Point,
  paths,
  points,
  options,
  part,
  store,
  complete,
  sa,
  macro,
  snippets,
  Snippet,
}) {
  const neckRadius = store.get('neckRadius')

  //  points.neckCenter = points.raglanCenter.shift(270, options.neckBalance * neckRadius)

  points.neckShoulderCorner = utils.beamIntersectsCircle(
    points.neckCenter,
    neckRadius,
    points.raglanCenter,
    points.armpitCorner
  )[1]

  const neckShoulderRadius = points.raglanCenter.dist(points.neckShoulderCorner)
  store.set('frontNeckRadius', neckShoulderRadius)

  points.cfNeck = points.neckCenter.shift(270, neckRadius)

  const necklineAngleAtRaglan = points.cfNeck.angle(points.neckShoulderCorner) * 2
  const necklineArcLength = utils.deg2rad(necklineAngleAtRaglan) * neckRadius
  points.neckCp1 = points.neckShoulderCorner.shift(
    necklineAngleAtRaglan + 180,
    necklineArcLength / 3
  )
  points.neckCp2 = points.cfNeck.shift(0, necklineArcLength / 3)

  const frontNecklineToRaglanAngle = store.get('raglanAngle') - (necklineAngleAtRaglan + 180)
  store.set('frontNecklineToRaglanAngle', frontNecklineToRaglanAngle)

  macro('vd', {
    id: 'hCenterSeam',
    from: points.cfNeck,
    to: points.cfCrotch,
    x: -(sa + 15),
  })
  macro('vd', {
    id: 'hNeck',
    from: points.neckShoulderCorner,
    to: points.cfNeck,
    x: -(sa + 15),
    noStartMarker: true,
    noEndMarker: true,
  })
  macro('vd', {
    id: 'hTotal',
    from: points.neckShoulderCorner,
    to: points.inseamHem,
    x: -(sa + 30),
  })
  macro('vd', {
    id: 'hRaglanSeam',
    from: points.armpitCornerScooped,
    to: points.neckShoulderCorner,
    x: points.armpitCornerScooped.x + (sa + 15),
  })
  macro('hd', {
    id: 'wRaglanSeamStraightPortion',
    from: points.neckShoulderCorner,
    to: points.armpitScoopEnd,
    y: 0 - (sa + 0),
  })
  macro('hd', {
    id: 'wRaglanSeam',
    from: points.neckShoulderCorner,
    to: points.armpitCornerScooped,
    y: 0 - (sa + 15),
  })
  macro('hd', {
    id: 'wNeck',
    from: points.cfNeck,
    to: points.neckShoulderCorner,
    y: 0 - (sa + 15),
    noStartMarker: true,
    noEndMarker: true,
  })
  macro('hd', {
    id: 'wCenterToArmpit',
    from: points.cfNeck,
    to: points.armpitCornerScooped,
    y: 0 - (sa + 30),
  })

  points.cutonfoldFrom = points.cfNeck.shift(0, points.armpitCornerScooped.x / 8)
  points.cutonfoldTo = points.cfCrotch.shift(0, points.armpitCornerScooped.x / 8)
  if (options.frontOnFold) {
    points.cutonfoldFrom.x = 0
    points.cutonfoldTo.x = 0
    macro('cutonfold', {
      from: points.cutonfoldFrom,
      to: points.cutonfoldTo,
      grainline: true,
    })
    store.cutlist.addCut({ cut: 1, from: 'fabric' })
  } else {
    macro('grainline', {
      from: points.cutonfoldFrom,
      to: points.cutonfoldTo,
    })
    store.cutlist.addCut({ cut: 2, from: 'fabric' })
  }

  if (complete && options.zipperPosition === 'front') {
    const zipperLength = store.get('verticalTrunk') * options.zipperLength
    if (zipperLength > 0) {
      points.zipperUpperLeft = points.cfNeck.shift(180, Math.max(sa, 5))
      points.zipperLowerLeft = points.zipperUpperLeft.shift(270, zipperLength)
      points.zipperLowerRight = points.zipperLowerLeft.shift(0, 2 * Math.max(sa, 5))
      points.zipperUpperRight = points.zipperLowerRight.shift(90, zipperLength)

      paths.zipper = new Path()
        .move(points.zipperUpperLeft)
        .line(points.zipperLowerLeft)
        .line(points.zipperLowerRight)
        .line(points.zipperUpperRight)
        .close()
        .setText('onyx:zipper')
        .addClass('various dashed')
    }
  }

  snippets.armpitScoopEnd = new Snippet('notch', points.armpitScoopEnd)

  points.title = new Point(
    points.armpitCorner.x / 2,
    (points.cfCrotch.y + points.armpitCornerScooped.y / 2) / 2
  )
  macro('title', { at: points.title, nr: 1, title: 'front' })

  const neckPath = new Path()
    .move(points.neckShoulderCorner)
    .curve(points.neckCp1, points.neckCp2, points.cfNeck)
  store.set('neckLengthFront', neckPath.length())

  return part
}

export const front = {
  name: 'onyx.front',
  draft: draftFront,
  from: base,
}
