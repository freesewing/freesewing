import { base } from './base.mjs'

function draftBack({
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
  const raglanAngle = store.get('raglanAngle')
  const neckRadius = store.get('neckRadius')

  points.neckCenter = points.raglanCenter.shift(270, -options.neckBalance * neckRadius)

  points.neckShoulderCorner = utils.beamIntersectsCircle(
    points.neckCenter,
    neckRadius,
    points.raglanCenter,
    points.armpitCorner
  )[1]

  const neckShoulderRadius = points.raglanCenter.dist(points.neckShoulderCorner)
  store.set('backNeckRadius', neckShoulderRadius)

  points.cfNeck = points.neckCenter.shift(270, neckRadius)

  const necklineAngleAtRaglan = points.cfNeck.angle(points.neckShoulderCorner) * 2
  const necklineArcLength = utils.deg2rad(necklineAngleAtRaglan) * neckRadius
  points.neckCP1 = points.neckShoulderCorner.shift(
    necklineAngleAtRaglan + 180,
    necklineArcLength / 3
  )
  points.neckCP2 = points.cfNeck.shift(0, necklineArcLength / 3)

  const backNecklineToRaglanAngle = raglanAngle - (necklineAngleAtRaglan + 180)
  store.set('backNecklineToRaglanAngle', backNecklineToRaglanAngle)

  paths.saBase = new Path().move(points.sideHem)
  if (options.straightSides) paths.saBase.line(points.armpitCornerScooped)
  else paths.saBase.curve(points.sideCp1, points.sideCp2, points.armpitCornerScooped)
  paths.saBase
    .curve(points.armpitScoopCp1, points.armpitScoopCp2, points.armpitScoopEnd)
    .line(points.neckShoulderCorner)
    .curve(points.neckCP1, points.neckCP2, points.cfNeck)
    .hide(true)

  paths.foldBase = new Path().move(points.cfNeck).line(points.cfHem).hide(true)

  paths.hemBase = new Path().move(points.cfHem).line(points.sideHem).hide(true)

  paths.seam = paths.saBase.join(paths.foldBase).join(paths.hemBase).close().attr('class', 'fabric')

  if (paperless) {
    macro('vd', {
      id: 'hCenterSeam',
      from: points.cfNeck,
      to: points.cfHem,
      x: -(15 + sa),
    })
    macro('vd', {
      id: 'hNeck',
      from: points.neckShoulderCorner,
      to: points.cfNeck,
      x: -(15 + sa),
      noStartMarker: true,
      noEndMarker: true,
    })
    macro('vd', {
      id: 'hTotal',
      from: points.neckShoulderCorner,
      to: points.cfHem,
      x: -(30 + sa),
    })
    macro('vd', {
      id: 'hRaglanSeam',
      from: points.armpitCornerScooped,
      to: points.neckShoulderCorner,
      x: points.armpitCornerScooped.x + (15 + sa),
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
  }

  store.cutlist.addCut({ cut: 1 })

  if (complete) {
    snippets.armpitScoopEnd = new Snippet('bnotch', points.armpitScoopEnd)

    points.title = new Point(
      points.armpitCorner.x / 2,
      (points.cfHem.y + points.armpitCornerScooped.y / 2) / 2
    )
    macro('title', { at: points.title, nr: 2, title: 'back' })

    if (sa) {
      paths.sa = new Path()
        .move(points.cfHem)
        .join(paths.hemBase.offset(sa * options.hemWidth))
        .join(paths.saBase.offset(sa))
        .line(points.cfNeck)
        .attr('class', 'fabric sa')
    }
  }

  const neckPath = new Path()
    .move(points.neckShoulderCorner)
    .curve(points.neckCP1, points.neckCP2, points.cfNeck)
  store.set('neckLengthBack', neckPath.length())

  return part
}

export const back = {
  name: 'shelly.back',
  plugins: [],
  draft: draftBack,
  from: base,
  measurements: ['neck', 'chest', 'hips', 'waistToHips', 'hpsToWaistBack'],
}
