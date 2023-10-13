import { withCondition as bustPlugin } from '@freesewing/plugin-bust'

function draftBase({
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
  const hpsToWaist =
    (measurements.hpsToWaistBack + measurements.hpsToWaistFront) / 2 +
    measurements.waistToArmpit * options.outseamEase
  const hpsToHips = hpsToWaist + measurements.waistToHips * (1 + options.outseamEase)
  const hpsToSeat = hpsToWaist + measurements.waistToSeat * (1 + options.outseamEase)
  const hpsToUpperLeg = hpsToWaist + measurements.waistToUpperLeg * (1 + options.outseamEase)
  const waistToArmpit = measurements.waistToArmpit * (1 + options.outseamEase)
  const rawHpsToWaist = (measurements.hpsToWaistBack + measurements.hpsToWaistFront) / 2
  const verticalTrunk = (rawHpsToWaist * 2 + measurements.crossSeam) * (1 + options.centerSeamEase)
  store.set('verticalTrunk', verticalTrunk)
  const crotchGussetWidth = verticalTrunk * options.crotchGussetWidth
  store.set('crotchGussetWidth', crotchGussetWidth)
  const zipperLength = verticalTrunk * options.zipperLength
  store.set('zipperLength', zipperLength)
  const zipperGuardWidth = verticalTrunk * options.zipperGuardWidth
  store.set('zipperGuardWidth', zipperGuardWidth)
  const neckGuardLength = verticalTrunk * options.neckGuardLength
  store.set('neckGuardLength', neckGuardLength)

  const legLength = options.legLength * measurements.inseam
  const totalLength = hpsToUpperLeg + legLength

  const armpitYPosition = hpsToWaist - waistToArmpit
  let chest = measurements.chest * (1 + options.chestEase)
  chest -= 4 * (options.raglanScoopMagnitude * armpitYPosition)
  const neckRadius = (measurements.neck * (1 + options.neckEase)) / (2 * Math.PI)
  const upperLeg = measurements.upperLeg * (1 + options.upperLegEase)
  const seat = measurements.seat * (1 + options.seatEase)
  const hips = measurements.hips * (1 + options.hipsEase)
  const waist = measurements.waist * (1 + options.waistEase)
  const crotchScoopWidth = verticalTrunk * options.crotchScoopWidth
  const crotchScoopLength = verticalTrunk * options.crotchScoopLength

  // Don't taper legs beyond ankle-length.
  const anklePosition = 0.91 // Guestimate based on my own ankle, as a % of the distance from the crotch fork to the floor.
  const adjustedLegLength = Math.min(1, options.legLength / anklePosition)
  let legHemCircumference =
    (1 + options.legHemEase) *
    (adjustedLegLength * measurements.ankle + (1 - adjustedLegLength) * measurements.upperLeg)
  legHemCircumference -= crotchGussetWidth
  //  const grainlinePosition = seat / 8 + crotchScoopWidth / 2

  store.set('neckRadius', neckRadius)

  // Pattern Points
  points.raglanCenter = new Point(0, 0)
  points.neckCenter = points.raglanCenter.shift(270, options.neckBalance * neckRadius)

  points.armpitCorner = new Point(chest / 4, armpitYPosition)

  points.neckShoulderCorner = utils.beamIntersectsCircle(
    points.neckCenter,
    neckRadius,
    points.raglanCenter,
    points.armpitCorner
  )[1]

  points.cfNeck = points.neckCenter.shift(270, neckRadius)
  points.cfCrotch = new Point(0, (verticalTrunk - crotchGussetWidth) / 2)
  points.crotchEnd = new Point(crotchScoopWidth, points.cfCrotch.y + crotchScoopLength)
  points.upperLeg = new Point(upperLeg / 2 - crotchGussetWidth / 2, hpsToUpperLeg)
  const legBalance =
    (points.upperLeg.x - points.crotchEnd.x - legHemCircumference / 2) *
    (1 - options.legTaperPosition)
  points.inseamHem = new Point(
    points.upperLeg.x - legHemCircumference / 2 - legBalance,
    totalLength
  )
  points.outseamHem = new Point(points.upperLeg.x - legBalance, totalLength)
  points.seat = new Point(seat / 4, hpsToSeat)
  points.hips = new Point(hips / 4, hpsToHips)
  points.waist = new Point(waist / 4, hpsToWaist)

  const raglanAngle = points.neckShoulderCorner.angle(points.armpitCorner)
  store.set('raglanAngle', raglanAngle)
  const raglanLength = points.raglanCenter.dist(points.armpitCorner)
  store.set('raglanLength', raglanLength)

  points.armpitCornerScooped = points.armpitCorner.shift(
    raglanAngle + 90,
    options.raglanScoopMagnitude * raglanLength
  )

  // Control Points
  points.cfCrotchCp2 = points.cfCrotch.shift(0, crotchScoopWidth / 2)
  points.crotchEndCp1 = points.crotchEnd.shift(
    points.inseamHem.angle(points.crotchEnd),
    crotchScoopLength / 2
  )

  const hemSeatDirection = points.outseamHem.angle(points.seat)
  points.upperLegCp1 = points.upperLeg.shift(
    hemSeatDirection + 180,
    points.upperLeg.dist(points.seat) / 3
  )
  points.upperLegCp2 = points.upperLeg.shift(
    hemSeatDirection,
    points.upperLeg.dist(points.seat) / 3
  )
  const upperLegHipsDirection = points.upperLeg.angle(points.hips)
  points.seatCp1 = points.seat.shift(
    upperLegHipsDirection + 180,
    points.seat.dist(points.upperLeg) / 3
  )
  points.seatCp2 = points.seat.shift(upperLegHipsDirection, points.seat.dist(points.hips) / 3)
  const seatWaistDirection = points.seat.angle(points.waist)
  points.hipsCp1 = points.hips.shift(seatWaistDirection + 180, points.hips.dist(points.seat) / 3)
  points.hipsCp2 = points.hips.shift(seatWaistDirection, points.hips.dist(points.waist) / 3)
  const waistArmpitDirection = points.hips.angle(points.armpitCornerScooped)
  points.waistCp1 = points.waist.shift(
    waistArmpitDirection + 180,
    points.waist.dist(points.hips) / 3
  )
  points.waistCp2 = points.waist.shift(
    waistArmpitDirection,
    points.waist.dist(points.armpitCornerScooped) / 3
  )

  const necklineAngleAtRaglan = points.cfNeck.angle(points.neckShoulderCorner) * 2
  const necklineArcLength = utils.deg2rad(necklineAngleAtRaglan) * neckRadius
  points.neckCp1 = points.neckShoulderCorner.shift(
    necklineAngleAtRaglan + 180,
    necklineArcLength / 3
  )
  points.neckCp2 = points.cfNeck.shift(0, necklineArcLength / 3)

  const frontNecklineToRaglanAngle = raglanAngle - (necklineAngleAtRaglan + 180)
  store.set('frontNecklineToRaglanAngle', frontNecklineToRaglanAngle)

  points.armpitScoopCp1 = points.armpitCorner.shift(
    raglanAngle + 180,
    (1 / 3) * options.raglanScoopLength * raglanLength
  )
  points.armpitScoopCp2 = points.armpitCorner.shift(
    raglanAngle + 180,
    (2 / 3) * options.raglanScoopLength * raglanLength
  )
  points.armpitScoopEnd = points.armpitCorner.shift(
    raglanAngle + 180,
    options.raglanScoopLength * raglanLength
  )

  paths.saBase = new Path()
    .move(points.outseamHem)
    .curve(points.outseamHem, points.upperLegCp1, points.upperLeg)
    .curve(points.upperLegCp2, points.seatCp1, points.seat)
    .curve(points.seatCp2, points.hipsCp1, points.hips)
    .curve(points.hipsCp2, points.waistCp1, points.waist)
    .curve(points.waistCp2, points.armpitCornerScooped, points.armpitCornerScooped)
    .curve(points.armpitScoopCp1, points.armpitScoopCp2, points.armpitScoopEnd)
    .line(points.neckShoulderCorner)
    .curve(points.neckCp1, points.neckCp2, points.cfNeck)

  if (options.frontOnFold) {
    paths.saBase.hide(true)
    paths.foldBase = new Path().move(points.cfNeck).line(points.cfCrotch).hide(true)
    paths.inseamBase = new Path()
      .move(points.cfCrotch)
      .curve(points.cfCrotchCp2, points.crotchEndCp1, points.crotchEnd)
      .line(points.inseamHem)
      .hide(true)
  } else {
    paths.saBase
      .line(points.cfCrotch)
      .curve(points.cfCrotchCp2, points.crotchEndCp1, points.crotchEnd)
      .line(points.inseamHem)
      .hide(true)
  }

  paths.hemBase = new Path().move(points.inseamHem).line(points.outseamHem).hide(true)

  const crotchGussetLength =
    new Path()
      .move(points.cfCrotch)
      .curve(points.cfCrotchCp2, points.crotchEndCp1, points.crotchEnd)
      .line(points.inseamHem)
      .hide(true)
      .length() * 2
  store.set('crotchGussetLength', crotchGussetLength)

  if (options.frontOnFold)
    paths.seam = paths.saBase
      .join(paths.foldBase)
      .join(paths.inseamBase)
      .join(paths.hemBase)
      .close()
      .attr('class', 'fabric')
  else paths.seam = paths.saBase.join(paths.hemBase).close().attr('class', 'fabric')

  if (paperless) {
    macro('hd', {
      id: 'wCrotch',
      from: points.cfCrotch,
      to: points.inseamHem,
      y: points.outseamHem.y + (sa + 15),
    })
    macro('hd', {
      id: 'wLegHem',
      from: points.inseamHem,
      to: points.outseamHem,
      y: points.outseamHem.y + (sa + 15),
    })
    macro('hd', {
      id: 'wCenterToOutseam',
      from: points.cfCrotch,
      to: points.outseamHem,
      y: points.outseamHem.y + (sa + 30),
    })
    macro('hd', {
      id: 'wTotalWidth',
      from: points.cfCrotch,
      to: paths.seam.edge('right'),
      y: points.outseamHem.y + (sa + 45),
    })
    macro('vd', {
      id: 'hInseam',
      from: points.cfCrotch,
      to: points.inseamHem,
      x: 0 - (sa + 15),
    })
    macro('vd', {
      id: 'hOutseam',
      from: points.outseamHem,
      to: points.armpitCornerScooped,
      x: Math.max(points.outseamHem.x, points.armpitCornerScooped.x) + (15 + sa),
    })
    macro('vd', {
      id: 'hArmpitScoop',
      from: points.armpitCornerScooped,
      to: points.armpitScoopEnd,
      x: points.armpitCornerScooped.x + (30 + sa),
    })
    macro('hd', {
      id: 'wArmpitScoop',
      from: points.armpitScoopEnd,
      to: points.armpitCornerScooped,
      y: 0 - (sa + 0),
    })
  }

  if (complete) {
    points.title = new Point(
      points.armpitCorner.x / 2,
      (points.cfCrotch.y + points.armpitCornerScooped.y / 2) / 2
    )
    macro('title', { at: points.title, nr: 5, title: 'base' })

    points.logo = points.title.shift(-90, 70 * scale)
    snippets.logo = new Snippet('logo', points.logo)

    if (sa) {
      paths.sa = new Path()
        .move(points.inseamHem.shift(270, sa * options.legHem * 100))
        .join(paths.hemBase.offset(sa * options.legHem * 100))
        .join(paths.saBase.offset(sa))
        .attr('class', 'fabric sa')
      if (options.frontOnFold) {
        paths.sa.line(points.cfNeck)
        paths.sa2 = new Path()
          .move(points.cfCrotch)
          .join(paths.inseamBase.offset(sa))
          .line(points.inseamHem.shift(270, sa * options.legHem * 100))
          .attr('class', 'fabric sa')
      } else paths.sa.close()
    }
  }

  return part
}

export const base = {
  name: 'onyx.base',
  plugins: [bustPlugin],
  draft: draftBase,
  hide: { self: true },
  measurements: [
    'neck',
    'chest',
    'waist',
    'hips',
    'seat',
    'waistToHips',
    'hpsToWaistBack',
    'hpsToWaistFront',
    'waistToSeat',
    'crossSeam',
    'waistToArmpit',
    'inseam',
    'upperLeg',
    'waistToUpperLeg',
    'ankle',
  ],
  options: {
    // Choose either a neckband or a hood to go at the neck of the garment.
    neckStyle: { dflt: 'neckband', list: ['neckband', 'hood'], menu: 'style' },
    // How much ease to give for the neck, as a percentage.
    neckEase: { pct: 50, min: -30, max: 150, menu: 'fit' },
    chestEase: { pct: 0, min: -40, max: 50, menu: 'fit' },
    waistEase: { pct: 0, min: -40, max: 50, menu: 'fit' },
    hipsEase: { pct: 0, min: -40, max: 50, menu: 'fit' },
    seatEase: { pct: 0, min: -40, max: 50, menu: 'fit' },
    upperLegEase: { pct: 0, min: -40, max: 50, menu: 'fit' },
    // How much ease to have where the leg ends, wherever that may be.
    legHemEase: { pct: 0, min: -40, max: 100, menu: 'fit' },
    // How much vertical ease (stretch out/compress) to put in the center seams/crotch.
    centerSeamEase: { pct: 0, min: -20, max: 50, menu: 'fit' },
    // How much vertical ease (stretch out/compress) to put in the outseam, from the armpit to the upper leg (use legLength to adjust below that point, and sleeveEase for the armhole). Will generally be zero or slightly positive for wovens, and slightly negative for stretch fabrics.
    outseamEase: { pct: 0, min: -20, max: 5, menu: 'fit' },
    // How long the legs on the garment are. 20-60% for shorts, 100% for pants that touch the floor.
    legLength: { pct: 20, min: 0, max: 120, menu: 'style' },
    // How far the neck hole is shifted towards the front. +100% means it's entirely on the front, -100% means it's entirely on the back, and 0 means the front and back are the same.
    neckBalance: { pct: 40, min: 0, max: 80, menu: 'fit' },
    // Note: The raglan length is the distance between the armpit and where the raglan seams would meet if there were no neckhole. It is used as a base for the following fit options.
    // How long the scoop running down the raglan seam is, as a % of the raglan length.
    raglanScoopLength: { pct: 20, min: 0, max: 50, menu: 'advanced' },
    // How deep the scoop running down the raglan seam is, as a % of the raglan length.
    raglanScoopMagnitude: { pct: 6, min: 0, max: 20, menu: 'advanced' },
    // How steep and deep the scoops on the crotch gusset are, in degrees. Larger values give more room. Zero forms a straight angle on the gusset and two right angles on the front pieces. Positive values shrink the angle on the gusset by twice the value and grow the angle on the front pieces by the value.
    // Width of the hem around the hips, as a multiple of the seam allowance.
    legHem: { pct: 2, min: 0, max: 8, menu: 'construction' },
    // How wide the scoop to each side of the crotch sweeps (excluding the gusset, as a % of the verticalTrunk.
    crotchScoopWidth: { pct: 1.5, min: 1, max: 5, menu: 'advanced' },
    crotchScoopLength: { pct: 4, min: 3, max: 15, menu: 'advanced' },
    // How wide the crotch gusset is, as a % of the verticalTrunk. This measurement determines how much room there is in the crotch and rear-end of the garment.
    crotchGussetWidth: { pct: 5, min: 2, max: 10, menu: 'fit' },
    // 100% produces a straight outseam and has the inseam taper outwards. 0% has the inseam drop straight down (after the scoop) and the outseam tapers in.
    legTaperPosition: { pct: 50, min: 0, max: 100, menu: 'advanced' },
    frontOnFold: { bool: false, menu: 'construction' },
    backOnFold: { bool: true, menu: 'construction' },
    // How long the zipper will be, as a % of the verticalTrunk. Longer zippers will make the garment easier to don and doff, but zippers do not stretch. Leotards and wide-necked stretch clothes can do with no zipper at all. Swimwear should have a zipper length no more than 20% since zippers do not stretch. Onesie pajamas can have much longer zippers (40%-50%).
    zipperLength: { pct: 20, min: 0, max: 50, menu: 'construction' },
    // How wide to make the section of fabric keeping the zipper away from the wearer's skin. Optional on onesie pajamas. Crucial on swimwear.
    zipperGuardWidth: { pct: 2, min: 0, max: 5, menu: 'construction' },
    // How far to have the zipper guard extend past the neckline so it can be wrapped around the zipper slider and pull to keep it from digging into the wearer's neck. Important on any compression garments/swimwear.
    neckGuardLength: { pct: 2, min: 0, max: 5, menu: 'construction' },
  },
  optionalMeasurements: ['highBust'],
}
