import * as shared from './shared.mjs'
import { front } from './front.mjs'
import { back } from './back.mjs'
import { pluginBundle } from '@freesewing/plugin-bundle'
import { pluginAnnotations } from '@freesewing/plugin-annotations'

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
}) {
  let armholeFudgeFactor = 1.1 - options.raglanScoopMagnitude // How much larger to make the armhole as a proportion of the biceps measurement. The constant term is to account for the armpit being a bit wider than the biceps, while subtracting the raglan scoop is to adjust for the extra material that the scoop will insert.
  let bicepsPosition = 0.2 // How far the biceps measurement is along the arm. 0 means at the armhole. 1 means at the wrist.

  let adjustedNeckRadius = (measurements.neck * (1 + options.neckEase)) / (2 * Math.PI)
  let adjustedBiceps = measurements.biceps * (1 + options.sleeveEase)
  let adjustedWrist = measurements.wrist * (1 + options.wristEase)

  points.raglanCenter = new Point(0, 0)
  points.neckCenter = points.raglanCenter.shift(180, options.neckOffset * adjustedNeckRadius)
  let raglanAngle = store.get('raglanAngle') // Retrieve the angle used for the front and back pieces.

  let raglanLength = store.get('raglanLength') // Distance from the raglan center/origin to the armpits.
  let scoopDepth = options.raglanScoopMagnitude * raglanLength
  let scoopLength = options.raglanScoopLength * raglanLength
  let widthAtArmhole = (adjustedBiceps / 2) * armholeFudgeFactor
  let lengthAtArmhole = shared.legFromHypotenuseLeg(raglanLength, widthAtArmhole)

  let sleeveLength = options.sleeveLength * measurements.shoulderToWrist
  // We're modeling the sleeve as a cone narrowing linearly from the top (biceps) to the bottom (wrist). The following interpolates so that we can make short sleeves, long sleeves, or anything in between.
  let sleeveWidth
  if (options.sleeveLength < bicepsPosition) {
    let sleevePercent = 1 - options.sleeveLength / bicepsPosition
    sleeveWidth = ((armholeFudgeFactor - 1) * sleevePercent + 1) * adjustedBiceps
  } else {
    let sleevePercent = Math.min((options.sleeveLength - bicepsPosition) / (1 - bicepsPosition), 1) // Get how far from the biceps to the wrist the sleeve is. Do not taper the sleeve any smaller than the wrist itself, for sleeves that extend past the wrist.
    sleeveWidth = adjustedBiceps * (1 - sleevePercent) + adjustedWrist * sleevePercent // Interpolate
  }

  sleeveWidth /= 2 // Takes into account that there is fabric on both sides of the center line.
  let totalLength = lengthAtArmhole + sleeveLength

  points.frontArmpit = new Point(-widthAtArmhole, lengthAtArmhole)
  points.backArmpit = new Point(widthAtArmhole, lengthAtArmhole)

  let frontRaglanAngle = points.raglanCenter.angle(points.frontArmpit)
  let backRaglanAngle = points.raglanCenter.angle(points.backArmpit)

  points.frontSleeve = new Point(-sleeveWidth, totalLength)
  points.backSleeve = new Point(sleeveWidth, totalLength)

  // For short sleeves, an adjustment is needed to account for the scoop making the armhole wider. This adjustment shrinks as the sleeve approaches the biceps, and is unneeded for bicep-length or longer sleeves.
  if (options.sleeveLength < bicepsPosition) {
    let sleevePercent = 1 - options.sleeveLength / bicepsPosition
    points.frontSleeve = points.frontSleeve.shift(frontRaglanAngle - 90, sleevePercent * scoopDepth)
    points.backSleeve = points.backSleeve.shift(backRaglanAngle + 90, sleevePercent * scoopDepth)
  }

  points.frontNeck = utils.beamIntersectsCircle(
    points.neckCenter,
    adjustedNeckRadius,
    points.raglanCenter,
    points.frontArmpit
  )[0]
  points.backNeck = utils.beamIntersectsCircle(
    points.neckCenter,
    adjustedNeckRadius,
    points.raglanCenter,
    points.backArmpit
  )[1]

  let angleFrontNeck = points.neckCenter.angle(points.frontNeck)
  let angleBackNeck = points.neckCenter.angle(points.backNeck)
  let neckSleeveWidth = utils.deg2rad(angleBackNeck - angleFrontNeck) * adjustedNeckRadius

  let frontNecklineAngle = frontRaglanAngle + (180 - store.get('frontNecklineToRaglanAngle'))
  let backNecklineAngle = backRaglanAngle - (180 - store.get('backNecklineToRaglanAngle'))
  points.neckCp1 = points.backNeck.shift(backNecklineAngle, neckSleeveWidth * 0.33333)
  points.neckCp2 = points.frontNeck.shift(frontNecklineAngle, neckSleeveWidth * 0.33333)

  points.frontArmpitScooped = points.frontArmpit.shift(frontRaglanAngle - 90, scoopDepth)
  points.frontArmpitScoopCp1 = points.frontArmpit.shift(
    frontRaglanAngle + 180,
    0.33333 * scoopLength
  )
  points.frontArmpitScoopCp2 = points.frontArmpit.shift(
    frontRaglanAngle + 180,
    0.66666 * scoopLength
  )
  points.frontArmpitScoopEnd = points.frontArmpit.shift(frontRaglanAngle + 180, scoopLength)

  points.backArmpitScooped = points.backArmpit.shift(backRaglanAngle + 90, scoopDepth)
  points.backArmpitScoopCp1 = points.backArmpit.shift(backRaglanAngle + 180, 0.33333 * scoopLength)
  points.backArmpitScoopCp2 = points.backArmpit.shift(backRaglanAngle + 180, 0.66666 * scoopLength)
  points.backArmpitScoopEnd = points.backArmpit.shift(backRaglanAngle + 180, scoopLength)

  paths.raglanSleeveSA = new Path()
    .move(points.backSleeve)
    .line(points.backArmpitScooped)
    .curve(points.backArmpitScoopCp1, points.backArmpitScoopCp2, points.backArmpitScoopEnd)
    .line(points.backNeck)
    .curve(points.neckCp1, points.neckCp2, points.frontNeck)
    .line(points.frontArmpitScoopEnd)
    .curve(points.frontArmpitScoopCp2, points.frontArmpitScoopCp1, points.frontArmpitScooped)
    .line(points.frontSleeve)
    .setHidden(true)

  paths.raglanSleeveHem = new Path()
    .move(points.frontSleeve)
    .line(points.backSleeve)
    .setHidden(true)

  paths.seam = paths.raglanSleeveSA.join(paths.raglanSleeveHem).close().attr('class', 'fabric')

  if (paperless) {
    macro('vd', {
      from: points.frontNeck,
      to: points.frontArmpitScoopEnd,
      x: points.frontArmpitScooped.x - (15 + sa),
    })
    macro('vd', {
      from: points.frontArmpitScoopEnd,
      to: points.frontArmpitScooped,
      x: points.frontArmpitScooped.x - (15 + sa),
    })
    macro('vd', {
      from: points.frontNeck,
      to: points.frontArmpitScooped,
      x: points.frontArmpitScooped.x - (30 + sa),
    })
    macro('vd', {
      from: points.frontArmpitScooped,
      to: points.frontSleeve,
      x: points.frontArmpitScooped.x - (15 + sa),
    })
    macro('vd', {
      from: points.frontNeck,
      to: points.frontSleeve,
      x: points.frontArmpitScooped.x - (45 + sa),
    })

    macro('hd', {
      from: points.frontArmpitScooped,
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
      to: points.backArmpitScooped,
      y: points.backSleeve.y + (15 + sa),
      noStartMarker: true,
      noEndMarker: true,
    })
    macro('hd', {
      from: points.frontArmpitScooped,
      to: points.backArmpitScooped,
      y: points.frontSleeve.y + (30 + sa),
    })

    macro('vd', {
      from: points.backNeck,
      to: points.backArmpitScoopEnd,
      x: points.backArmpitScooped.x + (15 + sa),
    })
    macro('vd', {
      from: points.backArmpitScoopEnd,
      to: points.backArmpitScooped,
      x: points.backArmpitScooped.x + (15 + sa),
    })
    macro('vd', {
      from: points.backNeck,
      to: points.backArmpitScooped,
      x: points.backArmpitScooped.x + (30 + sa),
    })
    macro('vd', {
      from: points.backArmpitScooped,
      to: points.backSleeve,
      x: points.backArmpitScooped.x + (15 + sa),
    })
    macro('vd', {
      from: points.backNeck,
      to: points.backSleeve,
      x: points.backArmpitScooped.x + (45 + sa),
    })

    macro('hd', {
      from: points.frontArmpitScooped,
      to: points.frontArmpitScoopEnd,
      y: Math.max(points.frontNeck.y, points.backNeck.y) - (15 + sa),
    })
    macro('hd', {
      from: points.frontArmpitScoopEnd,
      to: points.frontNeck,
      y: Math.max(points.frontNeck.y, points.backNeck.y) - (15 + sa),
    })
    macro('hd', {
      from: points.frontNeck,
      to: points.backNeck,
      y: Math.max(points.frontNeck.y, points.backNeck.y) - (15 + sa),
    })
    macro('hd', {
      from: points.backNeck,
      to: points.backArmpitScoopEnd,
      y: Math.max(points.frontNeck.y, points.backNeck.y) - (15 + sa),
    })
    macro('hd', {
      from: points.backArmpitScoopEnd,
      to: points.backArmpitScooped,
      y: Math.max(points.frontNeck.y, points.backNeck.y) - (15 + sa),
    })
    macro('hd', {
      from: points.backNeck,
      to: points.backArmpitScooped,
      y: Math.max(points.frontNeck.y, points.backNeck.y) - (30 + sa),
    })
    macro('hd', {
      from: points.frontArmpitScooped,
      to: points.frontNeck,
      y: Math.max(points.frontNeck.y, points.backNeck.y) - (30 + sa),
    })
    macro('hd', {
      from: points.frontArmpitScooped,
      to: points.backArmpitScooped,
      y: Math.max(points.frontNeck.y, points.backNeck.y) - (45 + sa),
    })
  }

  if (complete) {
    points.grainlineBottom = points.backSleeve.shiftFractionTowards(points.frontSleeve, 0.5)
    points.grainlineTop = points.raglanCenter.shift(270, adjustedNeckRadius)

    macro('grainline', {
      from: points.grainlineTop,
      to: points.grainlineBottom,
    })

    points.title = new Point(0, points.backSleeve.y / 3)
    macro('title', { at: points.title, nr: 3, title: 'sleeve' })

    points.logo = points.title.shift(-90, 70)
    snippets.logo = new Snippet('logo', points.logo)
    points.scalebox = points.logo.shift(-90, 70)
    macro('scalebox', { at: points.scalebox })

    if (sa) {
      paths.sa = paths.raglanSleeveSA
        .offset(sa)
        .join(paths.raglanSleeveHem.offset(sa * options.sleeveHem))
        .close()
        .attr('class', 'fabric sa')
    }
  }

  return part
}

export const raglanSleeve = {
  name: 'shelly.raglanSleeve',
  after: [front, back],
  plugins: [pluginBundle, pluginAnnotations],
  draft: draftRaglanSleeve,
  measurements: ['neck', 'chest', 'biceps', 'wrist', 'shoulderToWrist'],
  options: {
    // How much ease to put vertically around the armpit and the shoulder joint. Transitions gradually towards wristEase as one goes down the sleeve.
    sleeveEase: { pct: 0, min: -30, max: 50, menu: 'fit' },
    // How much ease to put around the wrist. For sleeves that don't reach the wrist, this value is interpolated with sleeveEase.
    wristEase: { pct: 0, min: -30, max: 50, menu: 'fit' },
    // How long the sleeve is. 100 is a long sleeve ending at the wrist. 20 is a typical short sleeve.
    sleeveLength: { pct: 20, min: 0, max: 125, menu: 'style' },
    // Length of the hem at the end of the sleeve, as a percent of the seam allowance.
    sleeveHem: { pct: 200, min: 0, max: 800, menu: 'style' },
  },
}
