import { front } from './front.mjs'
import { back } from './back.mjs'
import { pluginBundle } from '@freesewing/plugin-bundle'

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
  part,
  store,
  paperless,
  complete,
  sa,
  macro,
  snippets,
  Snippet,
  scale,
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
  points.neckCP1 = points.backNeck.shift(backNecklineAngle, neckSleeveWidth * (1 / 3))
  points.neckCP2 = points.frontNeck.shift(frontNecklineAngle, neckSleeveWidth * (1 / 3))

  points.frontArmholeScooped = points.frontArmhole.shift(frontRaglanAngle - 90, scoopDepth)
  points.frontArmholeScoopCP1 = points.frontArmhole.shift(
    frontRaglanAngle + 180,
    (1 / 3) * scoopLength
  )
  points.frontArmholeScoopCP2 = points.frontArmhole.shift(
    frontRaglanAngle + 180,
    (2 / 3) * scoopLength
  )
  points.frontArmholeScoopEnd = points.frontArmhole.shift(frontRaglanAngle + 180, scoopLength)

  points.backArmholeScooped = points.backArmhole.shift(backRaglanAngle + 90, scoopDepth)
  points.backArmholeScoopCP1 = points.backArmhole.shift(
    backRaglanAngle + 180,
    (1 / 3) * scoopLength
  )
  points.backArmholeScoopCP2 = points.backArmhole.shift(
    backRaglanAngle + 180,
    (2 / 3) * scoopLength
  )
  points.backArmholeScoopEnd = points.backArmhole.shift(backRaglanAngle + 180, scoopLength)

  paths.saBase = new Path()
    .move(points.backSleeve)
    .line(points.backArmholeScooped)
    .curve(points.backArmholeScoopCP1, points.backArmholeScoopCP2, points.backArmholeScoopEnd)
    .line(points.backNeck)
    .curve(points.neckCP1, points.neckCP2, points.frontNeck)
    .line(points.frontArmholeScoopEnd)
    .curve(points.frontArmholeScoopCP2, points.frontArmholeScoopCP1, points.frontArmholeScooped)
    .line(points.frontSleeve)
    .hide(true)

  paths.hemBase = new Path().move(points.frontSleeve).line(points.backSleeve).hide(true)

  paths.seam = paths.saBase.join(paths.hemBase).close().attr('class', 'fabric')

  if (paperless) {
    macro('vd', {
      from: points.frontNeck,
      to: points.frontArmholeScoopEnd,
      x: points.frontArmholeScooped.x - (15 + sa),
    })
    macro('vd', {
      from: points.frontArmholeScoopEnd,
      to: points.frontArmholeScooped,
      x: points.frontArmholeScooped.x - (15 + sa),
    })
    macro('vd', {
      from: points.frontNeck,
      to: points.frontArmholeScooped,
      x: points.frontArmholeScooped.x - (30 + sa),
    })
    macro('vd', {
      from: points.frontArmholeScooped,
      to: points.frontSleeve,
      x: points.frontArmholeScooped.x - (15 + sa),
    })
    macro('vd', {
      from: points.frontNeck,
      to: points.frontSleeve,
      x: points.frontArmholeScooped.x - (45 + sa),
    })

    macro('hd', {
      from: points.frontArmholeScooped,
      to: points.frontSleeve,
      y: points.frontSleeve.y + (15 + sa),
      noStartMarker: true,
      noEndMarker: true,
    })
    macro('hd', {
      from: points.frontSleeve,
      to: points.backSleeve,
      y: points.frontSleeve.y + (15 + sa),
    })
    macro('hd', {
      from: points.backSleeve,
      to: points.backArmholeScooped,
      y: points.backSleeve.y + (15 + sa),
      noStartMarker: true,
      noEndMarker: true,
    })
    macro('hd', {
      from: points.frontArmholeScooped,
      to: points.backArmholeScooped,
      y: points.frontSleeve.y + (30 + sa),
    })

    macro('vd', {
      from: points.backNeck,
      to: points.backArmholeScoopEnd,
      x: points.backArmholeScooped.x + (15 + sa),
    })
    macro('vd', {
      from: points.backArmholeScoopEnd,
      to: points.backArmholeScooped,
      x: points.backArmholeScooped.x + (15 + sa),
    })
    macro('vd', {
      from: points.backNeck,
      to: points.backArmholeScooped,
      x: points.backArmholeScooped.x + (30 + sa),
    })
    macro('vd', {
      from: points.backArmholeScooped,
      to: points.backSleeve,
      x: points.backArmholeScooped.x + (15 + sa),
    })
    macro('vd', {
      from: points.backNeck,
      to: points.backSleeve,
      x: points.backArmholeScooped.x + (45 + sa),
    })

    macro('hd', {
      from: points.frontArmholeScooped,
      to: points.frontArmholeScoopEnd,
      y: Math.min(points.frontNeck.y, points.backNeck.y) - (15 + sa),
    })
    macro('hd', {
      from: points.frontArmholeScoopEnd,
      to: points.frontNeck,
      y: Math.min(points.frontNeck.y, points.backNeck.y) - (15 + sa),
    })
    macro('hd', {
      from: points.frontNeck,
      to: points.backNeck,
      y: Math.min(points.frontNeck.y, points.backNeck.y) - (15 + sa),
    })
    macro('hd', {
      from: points.backNeck,
      to: points.backArmholeScoopEnd,
      y: Math.min(points.frontNeck.y, points.backNeck.y) - (15 + sa),
    })
    macro('hd', {
      from: points.backArmholeScoopEnd,
      to: points.backArmholeScooped,
      y: Math.min(points.frontNeck.y, points.backNeck.y) - (15 + sa),
    })
    macro('hd', {
      from: points.backNeck,
      to: points.backArmholeScooped,
      y: Math.min(points.frontNeck.y, points.backNeck.y) - (30 + sa),
    })
    macro('hd', {
      from: points.frontArmholeScooped,
      to: points.frontNeck,
      y: Math.min(points.frontNeck.y, points.backNeck.y) - (30 + sa),
    })
    macro('hd', {
      from: points.frontArmholeScooped,
      to: points.backArmholeScooped,
      y: Math.min(points.frontNeck.y, points.backNeck.y) - (45 + sa),
    })
  }

  points.grainlineBottom = points.backSleeve.shiftFractionTowards(points.frontSleeve, 0.5)
  points.grainlineTop = points.raglanCenter.shift(270, neckRadius)
  macro('grainline', {
    from: points.grainlineTop,
    to: points.grainlineBottom,
  })

  if (complete) {
    snippets.frontArmholeScoopEnd = new Snippet('notch', points.frontArmholeScoopEnd)
    snippets.backArmholeScoopEnd = new Snippet('bnotch', points.backArmholeScoopEnd)

    points.title = new Point(0, points.backSleeve.y / 3)
    macro('title', { at: points.title, nr: 3, title: 'sleeve' })

    points.logo = points.title.shift(-90, 70 * scale)
    snippets.logo = new Snippet('logo', points.logo)
    points.scalebox = points.logo.shift(-90, 70 * scale)
    macro('scalebox', { at: points.scalebox })

    if (sa) {
      paths.sa = paths.saBase
        .offset(sa)
        .join(paths.hemBase.offset(sa * options.sleeveHem * 100))
        .close()
        .attr('class', 'fabric sa')
    }
  }

  const neckPath = new Path()
    .move(points.backNeck)
    .curve(points.neckCP1, points.neckCP2, points.frontNeck)
  store.set('neckLengthSide', neckPath.length())

  return part
}

export const raglanSleeve = {
  name: 'shelly.raglanSleeve',
  after: [front, back],
  plugins: [pluginBundle],
  draft: draftRaglanSleeve,
  measurements: ['neck', 'chest', 'biceps', 'wrist', 'shoulderToWrist'],
  options: {
    // How much larger to make the armhole as a proportion of the biceps measurement.
    armholeTweakFactor: 1.1,
    bicepsPosition: 0.2,
    // How much ease to put vertically around the armhole and the shoulder joint. Transitions gradually towards wristEase as one goes down the sleeve.
    sleeveEase: { pct: 0, min: -30, max: 50, menu: 'fit' },
    // How much ease to put around the wrist. For sleeves that don't reach the wrist, this value is interpolated with sleeveEase.
    wristEase: { pct: 0, min: -30, max: 50, menu: 'fit' },
    // How long the sleeve is. 100 is a long sleeve ending at the wrist. 20 is a typical short sleeve.
    sleeveLength: { pct: 20, min: 0, max: 125, menu: 'style' },
    // Length of the hem at the end of the sleeve, as a multiple of the seam allowance.
    sleeveHem: { pct: 2, min: 0, max: 8, menu: 'construction' },
  },
}
