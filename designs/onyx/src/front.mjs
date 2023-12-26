import { base } from './base.mjs'

function draftFront({
  utils,
  Path,
  Point,
  paths,
  points,
  measurements,
  options,
  absoluteOptions,
  part,
  store,
  complete,
  sa,
  expand,
  units,
  macro,
  snippets,
  Snippet,
  scale,
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
  store.set(
    'neckLengthFront',
    new Path()
      .move(points.neckShoulderCorner)
      .curve(points.neckCp1, points.neckCp2, points.cfNeck)
      .length()
  )

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

  points.title = new Point(points.armpitCorner.x / 4, points.armpitCornerScooped.y + 50 * scale)
  macro('title', { at: points.title, nr: 1, title: 'onyx:front' })
  points.logo = points.title.translate(32 * scale, -40 * scale)
  snippets.logo = new Snippet('logo', points.logo)

  if (complete && !expand) {
    points.skirtInstructions = points.title.translate(0, -30 + 35 * scale)
    if (options.skirt) {
      points.skirtInstructions = points.skirtInstructions
        .translate(0, 50)
        .attr('data-text', 'onyx:cutOneSkirt')
        .attr('data-text', ':\n')
        .attr(
          'data-text',
          `${units(
            2 * sa + measurements.waist * Math.max(options.waistEase, options.skirtWidth)
          )} x ${units(
            measurements.waistToUpperLeg * options.skirtLength +
              absoluteOptions.skirtHem +
              absoluteOptions.skirtWaistband
          )}`
        )
    }

    points.legRibbingInstructions = points.skirtInstructions
    if (options.legRibbing) {
      points.legRibbingInstructions = points.legRibbingInstructions
        .translate(0, 50)
        .attr('data-text', 'onyx:cutTwoLegRibbing')
        .attr('data-text', ':\n')
        .attr(
          'data-text',
          `${units(2 * sa + store.get('legWidth') * options.legRibbingLength)} x ${units(
            2 * (sa + absoluteOptions.legRibbingWidth)
          )}`
        )
    }

    points.crotchGussetInstructions = points.legRibbingInstructions
    points.crotchGussetInstructions = points.crotchGussetInstructions
      .translate(0, 50)
      .attr('data-text', 'onyx:cutOneCrotchGusset')
      .attr('data-text', ':\n')
      .attr(
        'data-text',
        `${units(2 * sa + store.get('crotchGussetWidth'))} x ${units(
          (options.legRibbing ? 2 * sa : 2 * absoluteOptions.legHem) +
            store.get('crotchGussetLength')
        )}`
      )

    points.zipperGuardInstructions = points.crotchGussetInstructions
    const zipperGuardWidth = absoluteOptions.zipperGuardWidth
    const neckGuardLength =
      options.neckStyle == 'neckband'
        ? store.get('verticalTrunk') * options.neckGuardLength
        : options.zipperGuardTapeCoverMaterial * zipperGuardWidth
    // How much extra material to put at the bottom of the zipper guard, to cover the parts below the zipper stop.
    const zipperGuardLength =
      absoluteOptions.zipperLength +
      neckGuardLength +
      zipperGuardWidth * options.zipperGuardTapeCoverMaterial
    points.zipperGuardInstructions = points.zipperGuardInstructions
      .translate(0, 50)
      .attr('data-text', 'onyx:cutOneZipperGuard')
      .attr('data-text', ':\n')
      .attr(
        'data-text',
        `${units(2 * (sa + zipperGuardWidth))} x ${units(2 * sa + zipperGuardLength)}`
      )
  }

  if (options.zipperPosition === 'front' && options.frontOnFold) {
    store.flag.note({
      msg: `onyx:frontOnFoldZipper`,
    })
  }

  return part
}

export const front = {
  name: 'onyx.front',
  draft: draftFront,
  from: base,
}
