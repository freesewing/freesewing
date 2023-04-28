import * as shared from './shared.mjs'
import { pluginBundle } from '@freesewing/plugin-bundle'
import { pluginCutlist } from '@freesewing/plugin-cutlist'

function draftFront({
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
  let adjustedChest = measurements.chest * (1 + options.chestEase)
  // Reduce the chest measurement by the horizontal size of the raglan scoop, since the scoop is generated outwards and will add to the chest width.
  adjustedChest -= 4 * (options.raglanScoopMagnitude * measurements.hpsToBust)
  let adjustedNeckRadius = (measurements.neck * (1 + options.neckEase)) / (2 * Math.PI)
  let adjustedHips = measurements.hips * (1 + options.hipsEase)

  points.raglanCenter = new Point(0, 0)
  points.neckCenter = points.raglanCenter.shift(270, options.neckOffset * adjustedNeckRadius)

  points.armpitCorner = new Point(adjustedChest / 4, measurements.hpsToBust)

  points.neckShoulderCorner = utils.beamIntersectsCircle(
    points.neckCenter,
    adjustedNeckRadius,
    points.raglanCenter,
    points.armpitCorner
  )[1]

  points.bottomCenterCorner = new Point(
    0,
    options.bodyLength * (measurements.hpsToWaistBack + measurements.waistToHips)
  )
  points.bottomSideCorner = new Point(
    adjustedHips / 4,
    options.bodyLength * (measurements.hpsToWaistBack + measurements.waistToHips)
  )
  points.neckCenterCorner = points.neckCenter.shift(270, adjustedNeckRadius)

  let raglanAngle = points.neckShoulderCorner.angle(points.armpitCorner)
  store.set('raglanAngle', raglanAngle)
  let raglanLength = points.raglanCenter.dist(points.armpitCorner)
  store.set('raglanLength', raglanLength)

  let necklineAngleAtRaglan = points.neckCenterCorner.angle(points.neckShoulderCorner) * 2
  let necklineArcLength = utils.deg2rad(necklineAngleAtRaglan) * adjustedNeckRadius
  points.shoulderNeckCp1 = points.neckShoulderCorner.shift(
    necklineAngleAtRaglan + 180,
    necklineArcLength / 3
  )
  points.shoulderNeckCp2 = points.neckCenterCorner.shift(0, necklineArcLength / 3)

  let frontNecklineToRaglanAngle = raglanAngle - (necklineAngleAtRaglan + 180)
  store.set('frontNecklineToRaglanAngle', frontNecklineToRaglanAngle)

  points.armpitCornerScooped = points.armpitCorner.shift(
    raglanAngle + 90,
    options.raglanScoopMagnitude * raglanLength
  )
  points.armpitScoopCp1 = points.armpitCorner.shift(
    raglanAngle + 180,
    0.33333 * options.raglanScoopLength * raglanLength
  )
  points.armpitScoopCp2 = points.armpitCorner.shift(
    raglanAngle + 180,
    0.66666 * options.raglanScoopLength * raglanLength
  )
  points.armpitScoopEnd = points.armpitCorner.shift(
    raglanAngle + 180,
    options.raglanScoopLength * raglanLength
  )

  // Make sure that the shirt at least reaches the armpits, to ensure that the full raglan seam can be formed. This code should only trigger is someone tries to make a really, _really_ short shirt.
  if (points.bottomSideCorner.y < points.armpitCornerScooped.y) {
    points.bottomSideCorner.y = points.armpitCornerScooped.y
    points.bottomCenterCorner.y = points.armpitCornerScooped.y
  }

  let sideAngle = points.bottomSideCorner.angle(points.armpitCornerScooped)
  let sideLength = points.bottomSideCorner.dist(points.armpitCornerScooped)
  points.sideCp1 = points.bottomSideCorner
    .shift(sideAngle, 0.33333 * sideLength)
    .shift(sideAngle - 90, options.sideShape * sideLength)
  points.sideCp2 = points.armpitCornerScooped
    .shift(sideAngle + 180, 0.33333 * sideLength)
    .shift(sideAngle - 90, options.sideShape * sideLength)

  paths.frontSA = new Path()
    .move(points.bottomSideCorner)
    //    .line(points.armpitCornerScooped)
    .curve(points.sideCp1, points.sideCp2, points.armpitCornerScooped)
    .curve(points.armpitScoopCp1, points.armpitScoopCp2, points.armpitScoopEnd)
    .line(points.neckShoulderCorner)
    .curve(points.shoulderNeckCp1, points.shoulderNeckCp2, points.neckCenterCorner)
    .setHidden(true)

  paths.frontNone = new Path()
    .move(points.neckCenterCorner)
    .line(points.bottomCenterCorner)
    .setHidden(true)

  paths.frontHem = new Path()
    .move(points.bottomCenterCorner)
    .line(points.bottomSideCorner)
    .setHidden(true)

  paths.seam = paths.frontSA
    .join(paths.frontNone)
    .join(paths.frontHem)
    .close()
    .attr('class', 'fabric')

  if (paperless) {
    macro('vd', {
      from: points.neckCenterCorner,
      to: points.bottomCenterCorner,
      x: -(15 + sa),
    })
    macro('vd', {
      from: points.neckShoulderCorner,
      to: points.neckCenterCorner,
      x: -(15 + sa),
      noStartMarker: true,
      noEndMarker: true,
    })
    macro('vd', {
      from: points.neckShoulderCorner,
      to: points.bottomCenterCorner,
      x: -(30 + sa),
    })
    macro('hd', {
      from: points.bottomCenterCorner,
      to: points.bottomSideCorner,
      y: points.bottomSideCorner.y + (sa + 15),
    })
    macro('vd', {
      from: points.bottomSideCorner,
      to: points.armpitCornerScooped,
      x: Math.max(points.bottomSideCorner.x, points.armpitCornerScooped.x) + (15 + sa),
    })
    macro('vd', {
      from: points.armpitCornerScooped,
      to: points.neckShoulderCorner,
      x: points.armpitCornerScooped.x + (15 + sa),
    })
    macro('vd', {
      from: points.armpitCornerScooped,
      to: points.armpitScoopEnd,
      x: points.armpitCornerScooped.x + (30 + sa),
    })
    macro('hd', {
      from: points.armpitScoopEnd,
      to: points.armpitCornerScooped,
      y: points.neckShoulderCorner.y - (sa + 15),
    })
    macro('hd', {
      from: points.neckShoulderCorner,
      to: points.armpitScoopEnd,
      y: points.neckShoulderCorner.y - (sa + 15),
    })
    macro('hd', {
      from: points.neckShoulderCorner,
      to: points.armpitCornerScooped,
      y: points.neckShoulderCorner.y - (sa + 30),
    })
    macro('hd', {
      from: points.neckCenterCorner,
      to: points.neckShoulderCorner,
      y: points.neckShoulderCorner.y - (sa + 15),
      noStartMarker: true,
      noEndMarker: true,
    })
    macro('hd', {
      from: points.neckCenterCorner,
      to: points.armpitCornerScooped,
      y: points.neckShoulderCorner.y - (sa + 45),
    })
  }

  if (complete) {
    macro('cutonfold', {
      from: points.neckCenterCorner,
      to: points.bottomCenterCorner,
      grainline: true,
    })

    points.title = new Point(points.armpitCorner.x / 2, points.bottomCenterCorner.y / 2)
    macro('title', { at: points.title, nr: 1, title: 'front' })

    points.logo = points.title.shift(-90, 70)
    snippets.logo = new Snippet('logo', points.logo)

    if (sa) {
      paths.sa = paths.frontSA
        .offset(sa)
        .join(paths.frontHem.offset(sa * options.bodyHem))
        .close()
        .attr('class', 'fabric sa')
    }
  }

  return part
}

export const front = {
  name: 'shelly.front',
  plugins: [pluginBundle, pluginCutlist],
  draft: draftFront,
  measurements: ['neck', 'chest', 'hips', 'hpsToBust', 'waistToHips', 'hpsToWaistBack'],
  options: {
    // How much ease to give for the neck, as a percentage.
    neckEase: { pct: 0, min: -30, max: 100, menu: 'fit' },
    chestEase: { pct: 0, min: -30, max: 50, menu: 'fit' },
    hipsEase: { pct: 0, min: -30, max: 75, menu: 'fit' },
    bodyLength: { pct: 100, min: 20, max: 300, menu: 'style' },
    // How far the neck hole is shifted towards the front. +100% means it's entirely on the front, -100% means it's entirely on the back, and 0 means the front and back are the same.
    neckOffset: { pct: 40, min: 0, max: 80, menu: 'fit' },
    // Note: The raglan length is the distance between the armpit and where the raglan seams would meet if there were no neckhole. It is used as a base for the following fit options.
    // How long the scoop running down the raglan seam is, as a % of the raglan length.
    raglanScoopLength: { pct: 20, min: 0, max: 50, menu: 'fit' },
    // How deep the scoop running down the raglan seam is, as a % of the raglan length.
    raglanScoopMagnitude: { pct: 6, min: 0, max: 20, menu: 'fit' },
    // Length of the hem around the hips, as a percent of the seam allowance.
    bodyHem: { pct: 200, min: 0, max: 800, menu: 'style' },
    // How the body curves along the side from the armpit to the side of the hips, as a % of the length of the side seam. Negative values form a concave body and positive values form a convex body.
    sideShape: { pct: 0, min: -20, max: 20, menu: 'style' },
  },
}
