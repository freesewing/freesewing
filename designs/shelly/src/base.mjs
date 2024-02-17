import { bustPlugin } from '@freesewing/plugin-bust'

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
  sa,
  macro,
  snippets,
  Snippet,
  scale,
}) {
  const sleeveDiameter =
    (measurements.biceps * options.armholeTweakFactor * (1 + options.sleeveEase)) / Math.PI
  const hipsEase = options.straightSides ? options.chestEase : options.hipsEase

  const armpitYPosition =
    measurements.hpsToWaistBack - measurements.waistToArmpit + sleeveDiameter * options.armpitEase
  const chest =
    (options.straightSides
      ? Math.max(measurements.chest * (1 + options.chestEase), measurements.hips * (1 + hipsEase))
      : measurements.chest * (1 + options.chestEase)) -
    4 * (options.raglanScoopMagnitude * armpitYPosition)
  const bodyLength = options.bodyLength * (measurements.hpsToWaistBack + measurements.waistToHips)
  const neckRadius = (measurements.neck * (1 + options.neckEase)) / (2 * Math.PI)
  const hips = measurements.hips * (1 + hipsEase)

  store.set('neckRadius', neckRadius)

  points.raglanCenter = new Point(0, 0)
  points.neckCenter = points.raglanCenter.shift(270, options.neckBalance * neckRadius)

  points.armpitCorner = new Point(chest / 4, armpitYPosition).translate(
    0,
    Math.max(
      0,
      (measurements.biceps * options.armholeTweakFactor * options.sleeveEase) / (2 * Math.PI)
    )
  )

  points.neckShoulderCorner = utils.beamIntersectsCircle(
    points.neckCenter,
    neckRadius,
    points.raglanCenter,
    points.armpitCorner
  )[1]

  points.cfHem = new Point(0, bodyLength)
  points.sideHem = new Point(hips / 4, bodyLength)
  points.cfNeck = points.neckCenter.shift(270, neckRadius)

  const raglanAngle = points.neckShoulderCorner.angle(points.armpitCorner)
  store.set('raglanAngle', raglanAngle)
  const raglanLength = points.raglanCenter.dist(points.armpitCorner)
  store.set('raglanLength', raglanLength)

  const necklineAngleAtRaglan = points.cfNeck.angle(points.neckShoulderCorner) * 2
  const necklineArcLength = utils.deg2rad(necklineAngleAtRaglan) * neckRadius
  points.neckCP1 = points.neckShoulderCorner.shift(
    necklineAngleAtRaglan + 180,
    necklineArcLength / 3
  )
  points.neckCP2 = points.cfNeck.shift(0, necklineArcLength / 3)

  const frontNecklineToRaglanAngle = raglanAngle - (necklineAngleAtRaglan + 180)
  store.set('frontNecklineToRaglanAngle', frontNecklineToRaglanAngle)

  points.armpitCornerScooped = points.armpitCorner.shift(
    raglanAngle + 90,
    options.raglanScoopMagnitude * raglanLength
  )
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

  // Make the side seams vertical if we're making a tubular shirt. Overrides any hips measurements or options.
  if (options.straightSides)
    points.sideHem.x = Math.max(points.armpitCornerScooped.x, points.sideHem.x)

  // Make sure that the shirt at least reaches the armpits, to ensure that the full raglan seam can be formed. This code should only trigger is someone tries to make a really, _really_ short shirt.
  if (points.sideHem.y < points.armpitCornerScooped.y) {
    points.sideHem.y = points.armpitCornerScooped.y
    points.cfHem.y = points.armpitCornerScooped.y
  }

  const sideAngle = points.sideHem.angle(points.armpitCornerScooped)
  const sideLength = points.sideHem.dist(points.armpitCornerScooped)
  points.sideCp1 = points.sideHem
    .shift(sideAngle, (1 / 3) * sideLength)
    .shift(sideAngle - 90, options.sideShape * sideLength)
  points.sideCp2 = points.armpitCornerScooped
    .shift(sideAngle + 180, (1 / 3) * sideLength)
    .shift(sideAngle - 90, options.sideShape * sideLength)

  paths.saBase = new Path().move(points.sideHem)
  if (options.straightSides) paths.saBase.line(points.armpitCornerScooped)
  else paths.saBase.curve(points.sideCp1, points.sideCp2, points.armpitCornerScooped)
  paths.saBase
    .curve(points.armpitScoopCp1, points.armpitScoopCp2, points.armpitScoopEnd)
    .line(points.neckShoulderCorner)
    .curve(points.neckCP1, points.neckCP2, points.cfNeck)
    .hide()

  paths.foldBase = new Path().move(points.cfNeck).line(points.cfHem).hide()

  paths.hemBase = new Path().move(points.cfHem).line(points.sideHem).hide()

  paths.seam = paths.saBase.join(paths.foldBase).join(paths.hemBase).close().addClass('fabric')

  macro('hd', {
    id: 'wHem',
    from: points.cfHem,
    to: points.sideHem,
    y: points.sideHem.y + (sa + 15),
  })
  macro('vd', {
    id: 'hSide',
    from: points.sideHem,
    to: points.armpitCornerScooped,
    x: Math.max(points.sideHem.x, points.armpitCornerScooped.x) + (15 + sa),
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

  points.cutonfoldFrom = points.cfNeck
  points.cutonfoldTo = points.cfHem
  macro('cutonfold', {
    from: points.cutonfoldFrom,
    to: points.cutonfoldTo,
    grainline: true,
  })

  points.title = new Point(
    points.armpitCorner.x / 2,
    (points.cfHem.y + points.armpitCornerScooped.y / 2) / 2
  )
  macro('title', { at: points.title, nr: 5, title: 'base' })

  points.logo = points.title.shift(-90, 70 * scale)
  snippets.logo = new Snippet('logo', points.logo)

  if (sa) {
    paths.sa = new Path()
      .move(points.cfHem)
      .join(paths.hemBase.offset(sa * options.hemWidth))
      .join(paths.saBase.offset(sa))
      .line(points.cfNeck)
      .addClass('fabric sa')
  }

  return part
}

export const base = {
  name: 'shelly.base',
  plugins: [bustPlugin],
  draft: draftBase,
  hide: { self: true },
  measurements: [
    'biceps',
    'neck',
    'chest',
    'hips',
    'waistToHips',
    'hpsToWaistBack',
    'waistToArmpit',
  ],
  options: {
    // How much ease to give for the neck, as a percentage.
    neckEase: { pct: 50, min: -30, max: 150, menu: 'fit' },
    chestEase: { pct: 0, min: -40, max: 50, menu: 'fit' },
    // If set to true, makes a tubular body based on the chest, ignoring the hips measurements and options.
    straightSides: { bool: true, menu: 'advanced' },
    hipsEase: { pct: 0, min: -30, max: 75, menu: 'advanced' },
    // Shifts the sleeve down the body to give more room to the armpit, as a percentage of the sleeve diameter.
    armpitEase: { pct: 15, min: -20, max: 50, menu: 'fit' },
    bodyLength: { pct: 120, min: 20, max: 300, menu: 'style' },
    // How far the neck hole is shifted towards the front. +100% means it's entirely on the front, -100% means it's entirely on the back, and 0 means the front and back are the same.
    neckBalance: { pct: 40, min: 0, max: 80, menu: 'fit' },
    // Note: The raglan length is the distance between the armpit and where the raglan seams would meet if there were no neckhole. It is used as a base for the following fit options.
    // How long the scoop running down the raglan seam is, as a % of the raglan length.
    raglanScoopLength: { pct: 20, min: 0, max: 50, menu: 'advanced' },
    // How deep the scoop running down the raglan seam is, as a % of the raglan length.
    raglanScoopMagnitude: { pct: 6, min: 0, max: 20, menu: 'advanced' },
    // Length of the hem around the hips, as a multiple of the seam allowance.
    hemWidth: { pct: 200, min: 0, max: 800, menu: 'construction' },
    // How the body curves along the side from the armpit to the side of the hips, as a % of the length of the side seam. Negative values form a concave body and positive values form a convex body.
    sideShape: { pct: 0, min: -20, max: 20, menu: 'advanced' },
    // How much larger to make the armhole as a proportion of the biceps measurement.
    armholeTweakFactor: 1.1,
    // How much ease to put vertically around the armhole and the shoulder joint. Transitions gradually towards wristEase as one goes down the sleeve.
    sleeveEase: { pct: 0, min: -30, max: 50, menu: 'fit' },
  },
  optionalMeasurements: ['highBust'],
}
