import { draftRingSector } from './shared.mjs'
import { pctBasedOn } from '@freesewing/core'
import { pluginBundle } from '@freesewing/plugin-bundle'
import { elastics } from '@freesewing/snapseries'

function sandySkirt({
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
}) {
  // Circumference of the top of the waistband, calculated from the waistbandPosition option
  store.set(
    'topCircumference',
    options.waistbandPosition * measurements.hips +
      (1 - options.waistbandPosition) * measurements.waist
  )
  // Circumference of the bottom of the waistband
  if (options.waistbandShape === 'curved') {
    // If the waistband is curved, the bottom circumference is calculated from the measurements
    store.set(
      'bottomCircumference',
      store.get('topCircumference') +
        (absoluteOptions.waistbandWidth * (measurements.hips - measurements.waist)) /
          measurements.waistToHips
    )
  } else {
    // If the waistband is straight, the bottom circumference is the same as the top circumference
    store.set('bottomCircumference', store.get('topCircumference'))
  }

  // Overlap of the waistband
  store.set('waistbandOverlap', store.get('topCircumference') * options.waistbandOverlap)

  // The top circumference of the skirt corresponds to the bottom circumference of the waistband, plus the extraWaist option for gathering/pleating
  store.set('skirtCircumference', store.get('bottomCircumference') * (1 + options.gathering))

  // The length from the top of the skirt to the floor (max length available)
  store.set(
    'fullLength',
    measurements.waistToFloor - measurements.waistToHips * options.waistbandPosition
  )

  let radiusWaist, an
  if (options.seamlessFullCircle) {
    /**
     * If the seamless full circle option is selected, the angle
     * is 90º, and the radius of the waist arc is half than if
     * it's not selected, because in this case the fabric is cut
     * in a double fold
     */
    an = 90
    radiusWaist = store.get('skirtCircumference') / utils.deg2rad(an) / 4
  } else {
    /**
     * If the seamless full circle option is not selected, the
     * angle is calculated using the circlePercent option
     */
    an = 180 * options.circleRatio
    radiusWaist = store.get('skirtCircumference') / utils.deg2rad(an) / 2

    /**
     * If the angle is too large, the seam allowance can fall out
     * of the fold of the fabric, so we limit the angle to a
     * maximum angle calculated so the seam allowance fits in the
     * fabric
     */
    if (an > 90 && an !== 180 && sa) {
      const maxAn = utils.rad2deg(Math.atan(radiusWaist / sa))
      if (an > 90 + maxAn) an = 90 + maxAn
    }
  }
  /**
   * The radius of the hem arc is the radius of the waist
   * arc with the length of the skirt added
   */
  const radiusHem =
    radiusWaist + store.get('fullLength') * options.lengthBonus - absoluteOptions.waistbandWidth

  /**
   * The ring sector will be rotated an angle an/2 so we
   * display the part with one edge of the skirt vertical
   */
  const rot = an / 2

  // Call draftRingSector to draft the part
  paths.seam = draftRingSector(part, rot, an, radiusWaist, radiusHem, true).attr('class', 'fabric')

  // Anchor samples to the centre of the waist
  points.gridAnchor = points.in2Flipped.clone()

  // Complete pattern?
  if (complete) {
    macro('cutonfold', {
      from: points.in2Flipped,
      to: points.ex2Flipped,
      grainline: true,
    })
    if (options.seamlessFullCircle) {
      macro('cutonfold', {
        from: points.ex1Rotated,
        to: points.in1Rotated,
        prefix: 'double',
      })
    }
    points.logo = points.in2FlippedRotated.shiftFractionTowards(points.ex2FlippedRotated, 0.3)
    snippets.logo = new Snippet('logo', points.logo)

    points.title = points.in2FlippedRotated.shiftFractionTowards(points.ex2FlippedRotated, 0.5)
    macro('title', { at: points.title, nr: 1, title: 'skirt' })

    points.scalebox = points.in2FlippedRotated.shiftFractionTowards(points.ex2FlippedRotated, 0.7)
    macro('scalebox', { at: points.scalebox })

    macro('sprinkle', {
      snippet: 'notch',
      on: ['in1Rotated', 'gridAnchor'],
    })

    if (sa) {
      paths.hemBase = new Path()
        .move(points.ex1Rotated)
        .curve(points.ex1CFlippedRotated, points.ex2CFlippedRotated, points.ex2FlippedRotated)
        .curve(points.ex1CFlipped, points.ex2CFlipped, points.ex2Flipped)
        .offset(store.get('fullLength') * options.lengthBonus * options.hemWidth * -1)
      paths.saBase = new Path()
        .move(points.in2Flipped)
        .curve(points.in2CFlipped, points.in1CFlipped, points.in2FlippedRotated)
        .curve(points.in2CFlippedRotated, points.in1CFlippedRotated, points.in1Rotated)
      if (!options.seamlessFullCircle && an !== 180)
        paths.saBase = paths.saBase.line(points.ex1Rotated)
      paths.saBase = paths.saBase.offset(sa * -1)

      paths.hemBase.hide()
      paths.saBase.hide()

      if (options.seamlessFullCircle) {
        paths.sa = new Path()
          .move(points.in2Flipped)
          .line(paths.saBase.start())
          .join(paths.saBase)
          .line(points.in1Rotated)
          .move(points.ex1Rotated)
          .line(paths.hemBase.start())
          .join(paths.hemBase)
          .line(points.ex2Flipped)
          .attr('class', 'fabric sa')
      } else {
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

export const skirt = {
  name: 'sandy.skirt',
  measurements: ['waist', 'waistToFloor', 'waistToHips', 'hips'],
  plugins: pluginBundle,
  options: {
    minimumOverlap: 15, // Lower than this and we don't draw a button
    seamlessFullCircle: { bool: false, menu: 'construction' },
    waistbandWidth: {
      pct: 4,
      min: 1,
      max: 8,
      snap: elastics,
      ...pctBasedOn('waistToFloor'),
      menu: 'style',
    },
    waistbandPosition: { pct: 50, min: 0, max: 100, menu: 'fit' },
    lengthBonus: { pct: 50, min: 10, max: 100, menu: 'style' },
    circleRatio: { pct: 50, min: 20, max: 100, menu: 'style' },
    waistbandOverlap: { pct: 3, min: 0, max: 15, menu: 'style' },
    gathering: { pct: 0, min: 0, max: 200, menu: 'style' },
    hemWidth: { pct: 2, min: 1, max: 10, menu: 'construction' },
    waistbandShape: {
      list: ['straight', 'curved'],
      dflt: 'straight',
      menu: 'fit',
    },
  },
  draft: sandySkirt,
}
