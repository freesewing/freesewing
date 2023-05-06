import { pluginBundle } from '@freesewing/plugin-bundle'
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
}) {
  if (options.straightSides) options.hipsEase = options.chestEase

  const armholeYPosition = measurements.hpsToWaistBack - measurements.waistToArmhole
  let chest = measurements.chest
  if (options.straightSides)
    chest = Math.max(
      measurements.chest * (1 + options.chestEase),
      measurements.hips * (1 + options.hipsEase)
    )
  chest -= 4 * (options.raglanScoopMagnitude * armholeYPosition)
  const bodyLength = options.bodyLength * (measurements.hpsToWaistBack + measurements.waistToHips)
  const neckRadius = (measurements.neck * (1 + options.neckEase)) / (2 * Math.PI)
  const hips = measurements.hips * (1 + options.hipsEase)

  store.set('neckRadius', neckRadius)

  points.raglanCenter = new Point(0, 0)
  points.neckCenter = points.raglanCenter.shift(270, options.neckBalance * neckRadius)

  points.armholeCorner = new Point(chest / 4, armholeYPosition)

  points.neckShoulderCorner = utils.beamIntersectsCircle(
    points.neckCenter,
    neckRadius,
    points.raglanCenter,
    points.armholeCorner
  )[1]

  points.cfHem = new Point(0, bodyLength)
  points.sideHem = new Point(hips / 4, bodyLength)
  points.cfNeck = points.neckCenter.shift(270, neckRadius)

  const raglanAngle = points.neckShoulderCorner.angle(points.armholeCorner)
  store.set('raglanAngle', raglanAngle)
  const raglanLength = points.raglanCenter.dist(points.armholeCorner)
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

  points.armholeCornerScooped = points.armholeCorner.shift(
    raglanAngle + 90,
    options.raglanScoopMagnitude * raglanLength
  )
  points.armholeScoopCp1 = points.armholeCorner.shift(
    raglanAngle + 180,
    (1 / 3) * options.raglanScoopLength * raglanLength
  )
  points.armholeScoopCp2 = points.armholeCorner.shift(
    raglanAngle + 180,
    (2 / 3) * options.raglanScoopLength * raglanLength
  )
  points.armholeScoopEnd = points.armholeCorner.shift(
    raglanAngle + 180,
    options.raglanScoopLength * raglanLength
  )

  // Make the side seams vertical if we're making a tubular shirt. Overrides any hips measurements or options.
  if (options.straightSides)
    points.sideHem.x = Math.max(points.armholeCornerScooped.x, points.sideHem.x)

  // Make sure that the shirt at least reaches the armholes, to ensure that the full raglan seam can be formed. This code should only trigger is someone tries to make a really, _really_ short shirt.
  if (points.sideHem.y < points.armholeCornerScooped.y) {
    points.sideHem.y = points.armholeCornerScooped.y
    points.cfHem.y = points.armholeCornerScooped.y
  }

  const sideAngle = points.sideHem.angle(points.armholeCornerScooped)
  const sideLength = points.sideHem.dist(points.armholeCornerScooped)
  points.sideCp1 = points.sideHem
    .shift(sideAngle, (1 / 3) * sideLength)
    .shift(sideAngle - 90, options.sideShape * sideLength)
  points.sideCp2 = points.armholeCornerScooped
    .shift(sideAngle + 180, (1 / 3) * sideLength)
    .shift(sideAngle - 90, options.sideShape * sideLength)

  const drawSide = () => {
    if (options.straightSides)
      return new Path().move(points.sideHem).line(points.armholeCornerScooped)
    else
      return new Path()
        .move(points.sideHem)
        .curve(points.sideCp1, points.sideCp2, points.armholeCornerScooped)
  }

  paths.saBase = drawSide()
    .curve(points.armholeScoopCp1, points.armholeScoopCp2, points.armholeScoopEnd)
    .line(points.neckShoulderCorner)
    .curve(points.neckCP1, points.neckCP2, points.cfNeck)
    .hide(true)

  paths.foldBase = new Path().move(points.cfNeck).line(points.cfHem).hide(true)

  paths.hemBase = new Path().move(points.cfHem).line(points.sideHem).hide(true)

  paths.seam = paths.saBase.join(paths.foldBase).join(paths.hemBase).close().attr('class', 'fabric')

  if (paperless) {
    macro('hd', {
      from: points.cfHem,
      to: points.sideHem,
      y: points.sideHem.y + (sa + 15),
    })
    macro('vd', {
      from: points.sideHem,
      to: points.armholeCornerScooped,
      x: Math.max(points.sideHem.x, points.armholeCornerScooped.x) + (15 + sa),
    })
    macro('vd', {
      from: points.armholeCornerScooped,
      to: points.armholeScoopEnd,
      x: points.armholeCornerScooped.x + (30 + sa),
    })
    macro('hd', {
      from: points.armholeScoopEnd,
      to: points.armholeCornerScooped,
      y: 0 - (sa + 0),
    })
  }

  if (complete) {
    points.cutonfoldFrom = points.cfNeck
    points.cutonfoldTo = points.cfHem
    macro('cutonfold', {
      from: points.cutonfoldFrom,
      to: points.cutonfoldTo,
      grainline: true,
    })

    points.title = new Point(
      points.armholeCorner.x / 2,
      (points.cfHem.y + points.armholeCornerScooped.y / 2) / 2
    )
    macro('title', { at: points.title, nr: 5, title: 'base' })

    points.logo = points.title.shift(-90, 70)
    snippets.logo = new Snippet('logo', points.logo)

    if (sa) {
      paths.sa = new Path()
        .move(points.cfHem)
        .join(paths.hemBase.offset(sa * options.hemWidth * 100))
        .join(paths.saBase.offset(sa))
        .line(points.cfNeck)
        .attr('class', 'fabric sa')
    }
  }

  return part
}

export const base = {
  name: 'shelly.base',
  plugins: [pluginBundle, bustPlugin],
  draft: draftBase,
  hide: { self: true },
  measurements: ['neck', 'chest', 'hips', 'waistToHips', 'hpsToWaistBack', 'waistToArmhole'],
  options: {
    // How much ease to give for the neck, as a percentage.
    neckEase: { pct: 50, min: -30, max: 150, menu: 'fit' },
    chestEase: { pct: 0, min: -40, max: 50, menu: 'fit' },
    // If set to true, makes a tubular body based on the chest, ignoring the hips measurements and options.
    straightSides: { bool: true, menu: 'advanced' },
    hipsEase: { pct: 0, min: -30, max: 75, menu: 'advanced' },
    bodyLength: { pct: 120, min: 20, max: 300, menu: 'style' },
    // How far the neck hole is shifted towards the front. +100% means it's entirely on the front, -100% means it's entirely on the back, and 0 means the front and back are the same.
    neckBalance: { pct: 40, min: 0, max: 80, menu: 'fit' },
    // Note: The raglan length is the distance between the armhole and where the raglan seams would meet if there were no neckhole. It is used as a base for the following fit options.
    // How long the scoop running down the raglan seam is, as a % of the raglan length.
    raglanScoopLength: { pct: 20, min: 0, max: 50, menu: 'advanced' },
    // How deep the scoop running down the raglan seam is, as a % of the raglan length.
    raglanScoopMagnitude: { pct: 6, min: 0, max: 20, menu: 'advanced' },
    // Length of the hem around the hips, as a multiple of the seam allowance.
    hemWidth: { pct: 2, min: 0, max: 8, menu: 'construction' },
    // How the body curves along the side from the armhole to the side of the hips, as a % of the length of the side seam. Negative values form a concave body and positive values form a convex body.
    sideShape: { pct: 0, min: -20, max: 20, menu: 'advanced' },
  },
  optionalMeasurements: ['highBust'],
}
