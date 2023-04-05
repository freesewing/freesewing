import { draftRingSector } from '@freesewing/sandy'
import { base } from './base.mjs'

function senyaBottom({
  utils,
  store,
  sa,
  points,
  Path,
  paths,
  Snippet,
  snippets,
  options,
  measurements,
  complete,
  paperless,
  macro,
  absoluteOptions,
  part,
  log,
}) {
  let topCircumverence = measurements.waist
  let fullLength = measurements.waistToHips
  let angle = 180 * options.circleRatio
  let radiusWaist = topCircumverence / utils.deg2rad(angle) / 2

  if (angle > 90 && sa) {
    const maxAngle = utils.rad2deg(Math.atan(radiusWaist / sa))
    if (angle > 90 + maxAngle) angle = 90 + maxAngle
  }

  const radiusHem = radiusWaist + fullLength * options.lengthBonus

  const rotation = angle / 2

  paths.seam = draftRingSector(part, rotation, angle, radiusWaist, radiusHem, true).attr(
    'class',
    'fabric'
  )

  points.gridAnchor = points.in2Flipped.clone()

  // Complete pattern?
  if (complete) {
    macro('cutonfold', {
      from: points.in2Flipped,
      to: points.ex2Flipped,
      grainline: true,
    })
    points.logo = points.in2FlippedRotated.shiftFractionTowards(points.ex2FlippedRotated, 0.3)
    snippets.logo = new Snippet('logo', points.logo)

    points.title = points.in2FlippedRotated.shiftFractionTowards(points.ex2FlippedRotated, 0.5)
    macro('title', { at: points.title, nr: 3, title: 'bottom' })

    macro('sprinkle', {
      snippet: 'notch',
      on: ['in1Rotated', 'gridAnchor'],
    })

    if (sa) {
      log.info(`${fullLength * options.lengthBonus * options.hemWidth * -1}`)
      paths.hemBase = new Path()
        .move(points.ex1Rotated)
        .curve(points.ex1CFlippedRotated, points.ex2CFlippedRotated, points.ex2FlippedRotated)
        .curve(points.ex1CFlipped, points.ex2CFlipped, points.ex2Flipped)
        .offset(fullLength * options.lengthBonus * options.hemWidth * -1)
      paths.saBase = new Path()
        .move(points.in2Flipped)
        .curve(points.in2CFlipped, points.in1CFlipped, points.in2FlippedRotated)
        .curve(points.in2CFlippedRotated, points.in1CFlippedRotated, points.in1Rotated)
      paths.saBase = paths.saBase.line(points.ex1Rotated)
      paths.saBase = paths.saBase.offset(sa * -1)

      paths.hemBase.hide()
      paths.saBase.hide()

      paths.sa = new Path()
        .move(points.in2Flipped)
        .line(paths.saBase.start())
        .join(paths.saBase)
        .line(paths.hemBase.start())
        .join(paths.hemBase)
        .line(points.ex2Flipped)
        .attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('vd', {
      from: points.ex2Flipped,
      to: points.in2Flipped,
      x: points.ex2Flipped.x - sa - 15,
    })
    macro('vd', {
      from: points.in2Flipped,
      to: points.center,
      x: points.ex2Flipped.x - sa - 15,
    })
    macro('vd', {
      from: points.ex2Flipped,
      to: points.center,
      x: points.ex2Flipped.x - sa - 30,
    })
    if (options.circleRatio !== 0.5) {
      macro('vd', {
        from: points.ex1Rotated,
        to: points.in1Rotated,
        x:
          options.circleRatio > 0.5 ? points.in1Rotated.x - sa - 15 : points.ex1Rotated.x + sa + 15,
      })
      macro('vd', {
        from: points.in1Rotated,
        to: points.center,
        x:
          options.circleRatio > 0.5 ? points.in1Rotated.x - sa - 15 : points.ex1Rotated.x + sa + 15,
      })
      macro('vd', {
        from: points.ex1Rotated,
        to: points.center,
        x:
          options.circleRatio > 0.5 ? points.in1Rotated.x - sa - 30 : points.ex1Rotated.x + sa + 30,
      })
    }
    snippets.center = new Snippet('bnotch', points.center)
  }
  return part
}

export const bottom = {
  name: 'senya.bottom',
  from: base,
  hideDependencies: true,
  measurements: ['waistToHips'],
  options: {
    lengthBonus: { pct: 110, min: 90, max: 120, menu: 'style' },
    circleRatio: { pct: 50, min: 20, max: 100, menu: 'style' },
    hemWidth: { pct: 10, min: 5, max: 15, menu: 'construction' },
  },
  draft: senyaBottom,
}
