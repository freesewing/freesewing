import { front } from './front.mjs'
import { back } from './back.mjs'

export function legFromHypotenuseLeg(hypotenuse, leg) {
  return Math.sqrt(hypotenuse * hypotenuse - leg * leg)
}

function draftRaglanSleeve({
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
  sa,
  complete,
  expand,
  macro,
  snippets,
  Snippet,
  scale,
  units,
}) {
  const armholeTweakFactor = options.armholeTweakFactor - options.raglanScoopMagnitude // How much larger to make the armhole as a proportion of the biceps measurement. The constant term is to account for the armhole being a bit wider than the biceps, while subtracting the raglan scoop is to adjust for the extra material that the scoop will insert.
  const bicepsPosition = options.bicepsPosition // How far the biceps measurement is along the arm. 0 means at the armhole. 1 means at the wrist.

  const neckRadius = store.get('neckRadius')
  const adjustedBiceps = measurements.biceps * (1 + options.sleeveEase)
  const adjustedWrist = measurements.wrist * (1 + options.wristEase)

  points.raglanCenter = new Point(0, 0)
  points.neckCenter = points.raglanCenter.shift(180, options.neckBalance * neckRadius)

  const raglanLength = store.get('raglanLength') // Distance from the raglan center/origin to the armholes.
  const scoopDepth = options.raglanScoopMagnitude * raglanLength
  const scoopLength = options.raglanScoopLength * raglanLength
  const widthAtArmhole = (adjustedBiceps / 2) * armholeTweakFactor
  const lengthToArmhole = legFromHypotenuseLeg(raglanLength, widthAtArmhole)

  const sleeveLength = options.sleeveLength * measurements.shoulderToWrist
  // We're modeling the sleeve as a cone narrowing linearly from the top (biceps) to the bottom (wrist). The following interpolates so that we can make short sleeves, long sleeves, or anything in between.
  let sleeveWidth
  if (options.sleeveLength < bicepsPosition) {
    const sleevePercent = 1 - options.sleeveLength / bicepsPosition
    sleeveWidth = ((armholeTweakFactor - 1) * sleevePercent + 1) * adjustedBiceps
  } else {
    const sleevePercent = Math.min(
      (options.sleeveLength - bicepsPosition) / (1 - bicepsPosition),
      1
    ) // Get how far from the biceps to the wrist the sleeve is. Do not taper the sleeve any smaller than the wrist itself, for sleeves that extend past the wrist.
    sleeveWidth = adjustedBiceps * (1 - sleevePercent) + adjustedWrist * sleevePercent // Interpolate
  }
  store.set('sleeveWidth', sleeveWidth) // Needed for the ribbing piece.

  sleeveWidth /= 2 // Takes into account that there is fabric on both sides of the center line.
  const totalLength = lengthToArmhole + sleeveLength

  points.frontArmhole = new Point(-widthAtArmhole, lengthToArmhole)
  points.backArmhole = new Point(widthAtArmhole, lengthToArmhole)

  const frontRaglanAngle = points.raglanCenter.angle(points.frontArmhole)
  const backRaglanAngle = points.raglanCenter.angle(points.backArmhole)

  points.frontSleeve = new Point(-sleeveWidth, totalLength)
  points.backSleeve = new Point(sleeveWidth, totalLength)

  // For short sleeves, an adjustment is needed to account for the scoop making the armhole wider. This adjustment shrinks as the sleeve approaches the biceps, and is unneeded for bicep-length or longer sleeves.
  if (options.sleeveLength < bicepsPosition) {
    const sleevePercent = 1 - options.sleeveLength / bicepsPosition
    points.frontSleeve = points.frontSleeve.shift(frontRaglanAngle - 90, sleevePercent * scoopDepth)
    points.backSleeve = points.backSleeve.shift(backRaglanAngle + 90, sleevePercent * scoopDepth)
  }

  points.frontNeck = points.raglanCenter.shiftTowards(
    points.frontArmhole,
    store.get('frontNeckRadius')
  )
  points.backNeck = points.raglanCenter.shiftTowards(
    points.backArmhole,
    store.get('backNeckRadius')
  )

  const angleFrontNeck = points.neckCenter.angle(points.frontNeck)
  const angleBackNeck = points.neckCenter.angle(points.backNeck)
  const neckSleeveWidth = utils.deg2rad(angleBackNeck - angleFrontNeck) * neckRadius

  const frontNecklineAngle = frontRaglanAngle + (180 - store.get('frontNecklineToRaglanAngle'))
  const backNecklineAngle = backRaglanAngle - (180 - store.get('backNecklineToRaglanAngle'))
  points.neckCp1 = points.backNeck.shift(backNecklineAngle, neckSleeveWidth * (1 / 3))
  points.neckCp2 = points.frontNeck.shift(frontNecklineAngle, neckSleeveWidth * (1 / 3))

  points.frontArmholeScooped = points.frontArmhole.shift(frontRaglanAngle - 90, scoopDepth)
  points.frontArmholeScoopCp1 = points.frontArmhole.shift(
    frontRaglanAngle + 180,
    (1 / 3) * scoopLength
  )
  points.frontArmholeScoopCp2 = points.frontArmhole.shift(
    frontRaglanAngle + 180,
    (2 / 3) * scoopLength
  )
  points.frontArmholeScoopEnd = points.frontArmhole.shift(frontRaglanAngle + 180, scoopLength)

  points.backArmholeScooped = points.backArmhole.shift(backRaglanAngle + 90, scoopDepth)
  points.backArmholeScoopCp1 = points.backArmhole.shift(
    backRaglanAngle + 180,
    (1 / 3) * scoopLength
  )
  points.backArmholeScoopCp2 = points.backArmhole.shift(
    backRaglanAngle + 180,
    (2 / 3) * scoopLength
  )
  points.backArmholeScoopEnd = points.backArmhole.shift(backRaglanAngle + 180, scoopLength)

  paths.saBase = new Path()
    .move(points.backSleeve)
    .line(points.backArmholeScooped)
    .curve(points.backArmholeScoopCp1, points.backArmholeScoopCp2, points.backArmholeScoopEnd)
    .line(points.backNeck)
    .curve(points.neckCp1, points.neckCp2, points.frontNeck)
    .line(points.frontArmholeScoopEnd)
    .curve(points.frontArmholeScoopCp2, points.frontArmholeScoopCp1, points.frontArmholeScooped)
    .line(points.frontSleeve)
    .hide()

  paths.hemBase = new Path().move(points.frontSleeve).line(points.backSleeve).hide()

  paths.seam = paths.saBase.join(paths.hemBase).close().addClass('fabric')

  store.set(
    'neckLengthSide',
    new Path()
      .move(points.backNeck)
      .curve(points.neckCp1, points.neckCp2, points.frontNeck)
      .length()
  )

  macro('vd', {
    id: 'hFrontRaglanSleeveStraightPortion',
    from: points.frontNeck,
    to: points.frontArmholeScoopEnd,
    x: points.frontArmholeScooped.x - (sa + 15),
  })
  macro('vd', {
    id: 'hFrontRaglanSleeveCurvedPortion',
    from: points.frontArmholeScoopEnd,
    to: points.frontArmholeScooped,
    x: points.frontArmholeScooped.x - (sa + 15),
  })
  macro('vd', {
    id: 'hFrontRaglanSleeve',
    from: points.frontNeck,
    to: points.frontArmholeScooped,
    x: points.frontArmholeScooped.x - (sa + 30),
  })
  macro('vd', {
    id: 'hFrontSleeve',
    from: points.frontArmholeScooped,
    to: points.frontSleeve,
    x: points.frontArmholeScooped.x - (sa + 15),
  })
  macro('vd', {
    id: 'hFrontTotal',
    from: points.frontNeck,
    to: points.frontSleeve,
    x: points.frontArmholeScooped.x - (sa + 45),
  })

  macro('vd', {
    id: 'hBackRaglanSleeveStraightPortion',
    from: points.backNeck,
    to: points.backArmholeScoopEnd,
    x: points.backArmholeScooped.x + (sa + 15),
  })
  macro('vd', {
    id: 'hBackRaglanSleeveCurvedPortion',
    from: points.backArmholeScoopEnd,
    to: points.backArmholeScooped,
    x: points.backArmholeScooped.x + (sa + 15),
  })
  macro('vd', {
    id: 'hBackRaglanSleeve',
    from: points.backNeck,
    to: points.backArmholeScooped,
    x: points.backArmholeScooped.x + (sa + 30),
  })
  macro('vd', {
    id: 'hBackSleeve',
    from: points.backArmholeScooped,
    to: points.backSleeve,
    x: points.backArmholeScooped.x + (sa + 15),
  })
  macro('vd', {
    id: 'hBackTotal',
    from: points.backNeck,
    to: points.backSleeve,
    x: points.backArmholeScooped.x + (sa + 45),
  })

  macro('hd', {
    id: 'wFrontSleeve',
    from: points.frontArmholeScooped,
    to: points.frontSleeve,
    y: points.frontSleeve.y + (sa + 15),
    noStartMarker: true,
    noEndMarker: true,
  })
  macro('hd', {
    id: 'wSleeveHem',
    from: points.frontSleeve,
    to: points.backSleeve,
    y: points.frontSleeve.y + (sa + 15),
  })
  macro('hd', {
    id: 'wBackSleeve',
    from: points.backSleeve,
    to: points.backArmholeScooped,
    y: points.backSleeve.y + (sa + 15),
    noStartMarker: true,
    noEndMarker: true,
  })
  macro('hd', {
    id: 'wWidthAtArmpit',
    from: points.frontArmholeScooped,
    to: points.backArmholeScooped,
    y: points.frontSleeve.y + (sa + 30),
  })
  macro('hd', {
    id: 'wWidthAtArmpit2',
    from: points.frontArmholeScooped,
    to: points.backArmholeScooped,
    y: Math.min(points.frontNeck.y, points.backNeck.y) - (sa + 45),
  })

  macro('hd', {
    id: 'wFrontRaglanSleeveCurvedPortion',
    from: points.frontArmholeScooped,
    to: points.frontArmholeScoopEnd,
    y: Math.min(points.frontNeck.y, points.backNeck.y) - (sa + 15),
  })
  macro('hd', {
    id: 'wFrontRaglanSleeveStraightPortion',
    from: points.frontArmholeScoopEnd,
    to: points.frontNeck,
    y: Math.min(points.frontNeck.y, points.backNeck.y) - (sa + 15),
  })
  macro('hd', {
    id: 'wNeck',
    from: points.frontNeck,
    to: points.backNeck,
    y: Math.min(points.frontNeck.y, points.backNeck.y) - (sa + 15),
  })
  macro('hd', {
    id: 'wBackRaglanSleeveStraightPortion',
    from: points.backNeck,
    to: points.backArmholeScoopEnd,
    y: Math.min(points.frontNeck.y, points.backNeck.y) - (sa + 15),
  })
  macro('hd', {
    id: 'wBackRaglanSleeveCurvedPortion',
    from: points.backArmholeScoopEnd,
    to: points.backArmholeScooped,
    y: Math.min(points.frontNeck.y, points.backNeck.y) - (sa + 15),
  })
  macro('hd', {
    id: 'wBackRaglanSleeve',
    from: points.backNeck,
    to: points.backArmholeScooped,
    y: Math.min(points.frontNeck.y, points.backNeck.y) - (sa + 30),
  })
  macro('hd', {
    id: 'wFrontRaglanSleeve',
    from: points.frontArmholeScooped,
    to: points.frontNeck,
    y: Math.min(points.frontNeck.y, points.backNeck.y) - (sa + 30),
  })

  points.grainlineBottom = points.backSleeve.shiftFractionTowards(points.frontSleeve, 0.5)
  points.grainlineTop = points.raglanCenter.shift(270, neckRadius)
  macro('grainline', {
    from: points.grainlineTop,
    to: points.grainlineBottom,
  })

  store.cutlist.addCut({ cut: 2, from: 'fabric' })

  snippets.frontArmholeScoopEnd = new Snippet('notch', points.frontArmholeScoopEnd)
  snippets.backArmholeScoopEnd = new Snippet('bnotch', points.backArmholeScoopEnd)

  points.title = new Point(0, points.backSleeve.y / 3)
  macro('title', { at: points.title, nr: 3, title: 'onyx:raglanSleeve' })

  points.logo = points.title.translate(-20 * scale, 70 * scale)
  snippets.logo = new Snippet('logo', points.logo)
  points.scalebox = new Point(
    points.frontArmholeScooped.x / 2,
    points.frontArmholeScooped.y + 20 * scale
  )
  macro('scalebox', { at: points.scalebox })

  if (complete && !expand) {
    points.sleeveRibbingInstructions = points.title.translate(5, -30 + 35 * scale)
    if (options.sleeveRibbing) {
      points.sleeveRibbingInstructions = points.sleeveRibbingInstructions
        .translate(0, 50)
        .attr('data-text', 'onyx:cutTwoSleeveRibbing')
        .attr('data-text', ':\n')
        .attr(
          'data-text',
          `${units(2 * sa + store.get('sleeveWidth') * options.sleeveRibbingLength)} x ${units(
            2 * (sa + absoluteOptions.sleeveRibbingWidth)
          )}`
        )
    }

    points.neckbandInstructions = points.sleeveRibbingInstructions
    if (options.neckStyle === 'neckband') {
      points.neckbandInstructions = points.neckbandInstructions
        .translate(0, 50)
        .attr('data-text', 'onyx:cutNeckband')
        .attr('data-text', ':\n')
        .attr(
          'data-text',
          `${units(
            2 *
              (sa +
                (store.get('neckLengthFront') +
                  store.get('neckLengthBack') +
                  store.get('neckLengthSide')) *
                  options.neckbandLength)
          )} x ${units(2 * (sa + absoluteOptions.neckbandWidth))}`
        )
    }
  }

  if (sa) {
    paths.sa = paths.saBase
      .offset(sa)
      .join(paths.hemBase.offset(options.sleeveRibbing ? sa : absoluteOptions.sleeveHem))
      .close()
      .addClass('fabric sa')
  }

  return part
}

export const raglanSleeve = {
  name: 'onyx.raglanSleeve',
  after: [front, back],
  draft: draftRaglanSleeve,
  measurements: ['wrist', 'shoulderToWrist'],
  options: {
    bicepsPosition: 0.2,
    // How much ease to put around the wrist. For sleeves that don't reach the wrist, this value is interpolated with sleeveEase.
    wristEase: { pct: 0, min: -30, max: 50, menu: 'fit' },
    // How long the sleeve is. 100 is a long sleeve ending at the wrist. 20 is a typical short sleeve.
    sleeveLength: { pct: 20, min: 0, max: 125, menu: 'style' },
    // Width of the hem at the end of the sleeve, as a multiple of the seam allowance.
    sleeveHem: {
      pct: 200,
      min: 0,
      max: 800,
      toAbs: (pct, settings, mergedOptions) => settings.sa * mergedOptions.sleeveHem,
      menu: (settings, mergedOptions) => (mergedOptions.sleeveRibbing ? false : 'construction'),
    },
  },
}
