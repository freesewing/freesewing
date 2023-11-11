import { base } from './base.mjs'
import { waistlineHeight } from './shared.mjs'
import { ringsectorPlugin } from '@freesewing/plugin-ringsector'

function senyaBottom({
  utils,
  sa,
  points,
  Path,
  paths,
  Snippet,
  snippets,
  options,
  measurements,
  macro,
  part,
}) {
  let topCircumverence = measurements.underbust
  let fullLength =
    measurements.hpsToWaistBack -
    waistlineHeight(
      measurements.waistToUnderbust,
      measurements.hpsToWaistBack,
      options.lowerWaistline
    ) +
    measurements.waistToHips
  let angle = 180 * options.circleRatio
  let radiusMidriffTop = topCircumverence / utils.deg2rad(angle) / 2

  if (angle > 90 && sa) {
    const maxAngle = utils.rad2deg(Math.atan(radiusMidriffTop / sa))
    if (angle > 90 + maxAngle) angle = 90 + maxAngle
  }

  const radiusHem = radiusMidriffTop + fullLength * options.lengthBonus

  const ids = macro('ringsector', {
    angle: angle,
    insideRadius: radiusMidriffTop,
    outsideRadius: radiusHem,
    rotate: true,
  })
  const pathId = ids.paths.path
  paths.seam = paths[pathId].clone().addClass('fabric')
  paths[pathId].hide()

  for (const [shortId, uid] of Object.entries(ids.points)) {
    points[shortId] = points[uid].copy()
  }

  points.gridAnchor = points.in2Flipped.clone()

  macro('cutonfold', {
    from: points.in2Flipped,
    to: points.ex2Flipped,
    grainline: true,
  })
  points.logo = points.in2FlippedRotated.shiftFractionTowards(points.ex2FlippedRotated, -0.1)
  snippets.logo = new Snippet('logo', points.logo)

  points.title = points.in2FlippedRotated.shiftFractionTowards(points.ex2FlippedRotated, -0.5)
  macro('title', { at: points.title, nr: 3, title: 'bottom' })

  macro('sprinkle', {
    snippet: 'notch',
    on: ['in1Rotated', 'gridAnchor'],
  })

  if (sa) {
    paths.hemBase = new Path()
      .move(points.ex2Flipped)
      .curve(points.ex2cFlipped, points.ex1cFlipped, points.ex1)
      .curve(points.ex1c, points.ex2c, points.ex2)
      .offset(fullLength * options.lengthBonus * options.hemWidth)
    paths.saBase = new Path()
      .move(points.in2)
      .curve(points.in2c, points.in1c, points.in1)
      .curve(points.in1cFlipped, points.in2cFlipped, points.in2Flipped)
    paths.saBase = new Path().move(points.ex2).line(points.ex2).join(paths.saBase)
    paths.saBase = paths.saBase.offset(sa)

    paths.hemBase.hide()
    paths.saBase.hide()

    paths.sa = new Path()
      .move(points.ex2Flipped)
      .line(paths.hemBase.start())
      .join(paths.hemBase)
      .line(paths.saBase.start())
      .join(paths.saBase)
      .line(points.in2Flipped)
      .attr('class', 'fabric sa')
  }

  macro('vd', {
    id: 'foldToCenter',
    from: points.ex2Flipped,
    to: points.in2Flipped,
    x: points.ex2Flipped.x - sa - 15,
  })
  macro('vd', {
    id: 'fold',
    from: points.in2Flipped,
    to: points.center,
    x: points.ex2Flipped.x - sa - 15,
  })
  macro('vd', {
    id: 'inner',
    from: points.ex2Flipped,
    to: points.center,
    x: points.ex2Flipped.x - sa - 30,
  })
  if (options.circleRatio !== 0.5) {
    macro('vd', {
      id: 'supposedlyTopToOpeningRight',
      from: points.ex1Rotated,
      to: points.in1Rotated,
      x: options.circleRatio > 0.5 ? points.in1Rotated.x - sa - 15 : points.ex1Rotated.x + sa + 15,
    })
    macro('vd', {
      id: 'supposedlyOpeningRightToCenter',
      from: points.in1Rotated,
      to: points.center,
      x: options.circleRatio > 0.5 ? points.in1Rotated.x - sa - 15 : points.ex1Rotated.x + sa + 15,
    })
    macro('vd', {
      id: 'supposedlyHemRightToCenter',
      from: points.ex1Rotated,
      to: points.center,
      x: options.circleRatio > 0.5 ? points.in1Rotated.x - sa - 30 : points.ex1Rotated.x + sa + 30,
    })
  }
  snippets.center = new Snippet('bnotch', points.center)
  return part
}

export const bottom = {
  name: 'senya.bottom',
  from: base,
  hide: 'HIDE_TREE',
  measurements: ['waistToHips'],
  options: {
    lengthBonus: { pct: 110, min: 90, max: 120, menu: 'style' },
    circleRatio: { pct: 50, min: 20, max: 90, menu: 'style' },
    hemWidth: { pct: 10, min: 5, max: 15, menu: 'construction' },
  },
  plugins: ringsectorPlugin,
  draft: senyaBottom,
}
