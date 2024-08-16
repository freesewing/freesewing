import { pctBasedOn } from '@freesewing/core'
import { elastics } from '@freesewing/snapseries'
import { ringsectorPlugin } from '@freesewing/plugin-ringsector'

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

  let radiusWaist, angle
  if (options.seamlessFullCircle) {
    /**
     * If the seamless full circle option is selected, the angle
     * is 90º, and the radius of the waist arc is half than if
     * it's not selected, because in this case the fabric is cut
     * in a double fold
     */
    angle = 90
    radiusWaist = store.get('skirtCircumference') / utils.deg2rad(angle) / 4
  } else {
    /**
     * If the seamless full circle option is not selected, the
     * angle is calculated using the circlePercent option
     */
    const totalAngle = 180 * options.circleRatio
    angle = totalAngle / options.panels
    radiusWaist = store.get('skirtCircumference') / utils.deg2rad(totalAngle) / 2

    /**
     * If the angle is too large, the seam allowance can fall out
     * of the fold of the fabric, so we limit the angle to a
     * maximum angle calculated so the seam allowance fits in the
     * fabric
     */
    if (angle > 90 && sa) {
      const maxAngle = utils.rad2deg(Math.atan(radiusWaist / sa))
      if (angle > 90 + maxAngle) angle = 90 + maxAngle
    }
  }
  /**
   * The radius of the hem arc is the radius of the waist
   * arc with the length of the skirt added
   */
  const radiusHem =
    radiusWaist + store.get('fullLength') * options.lengthBonus - absoluteOptions.waistbandWidth

  // Call the RingSector macro to draft the part
  const ids = macro('ringsector', {
    angle: angle,
    insideRadius: radiusWaist,
    outsideRadius: radiusHem,
    rotate: true,
  })
  const pathId = ids.paths.path
  paths.seam = paths[pathId].clone().addClass('fabric')
  paths[pathId].hide()

  /*
   * Macros ensure they can be used more than once in a part, and will generate unique (and complex)
   * point names. Since we're only calling the macro once here, we will simplify these names
   */
  for (const [shortId, uid] of Object.entries(ids.points)) {
    points[shortId] = points[uid].copy()
    // Some points are rotated, we need those too
    if (points[uid + 'Rotated']) points[shortId + 'Rotated'] = points[uid + 'Rotated'].copy()
  }

  // Anchor samples to the centre of the waist
  points.gridAnchor = points.in2Flipped.clone()

  if (sa) {
    paths.hemBase = new Path()
      .move(points.ex2Flipped)
      .circleSegment(angle, points.center)
      .offset(store.get('fullLength') * options.lengthBonus * options.hemWidth)
    paths.saBase = new Path().move(points.in2).circleSegment(-angle, points.center)

    if (!options.seamlessFullCircle)
      paths.saBase = new Path().move(points.ex2).line(points.ex2).join(paths.saBase)
    paths.saBase = paths.saBase.offset(sa)

    paths.hemBase.hide()
    paths.saBase.hide()

    if (options.seamlessFullCircle) {
      paths.sa = new Path()
        .move(points.ex2Flipped)
        .line(paths.hemBase.start())
        .join(paths.hemBase)
        .line(points.ex2)
        .move(points.in2)
        .line(paths.saBase.start())
        .join(paths.saBase)
        .line(points.in2Flipped)
        .attr('class', 'fabric sa')
    } else {
      paths.sa = new Path()
        .move(points.ex2Flipped)
        .line(paths.hemBase.start())
        .join(paths.hemBase)
        .line(paths.saBase.start())
        .join(paths.saBase)
        .line(points.in2Flipped)
        .attr('class', 'fabric sa')
    }
  }

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({
    cut: options.seamlessFullCircle ? 1 : Number(options.panels),
    from: 'fabric',
    onFold: true,
    identical: true,
  })

  // Cutonfold
  macro('cutonfold', {
    from: points.in2Flipped,
    to: points.ex2Flipped,
    grainline: true,
  })
  if (options.seamlessFullCircle) {
    macro('cutonfold', {
      from: points.ex2,
      to: points.in2,
      id: 'double',
      reverse: true,
    })
  }

  // Logo
  points.logo = points.in2FlippedRotated.shiftFractionTowards(
    points.ex2FlippedRotated,
    options.seamlessFullCircle ? 0.3 : 0.1
  )
  snippets.logo = new Snippet('logo', points.logo)

  // Title
  points.title = points.in2FlippedRotated.shiftFractionTowards(
    points.ex2FlippedRotated,
    options.seamlessFullCircle ? 0.5 : 0.25
  )
  macro('title', { at: points.title, nr: 1, title: 'skirt' })

  // Scalebox
  points.scalebox = points.in2FlippedRotated.shiftFractionTowards(
    points.ex2FlippedRotated,
    options.seamlessFullCircle ? 0.7 : 0.45
  )
  macro('scalebox', { at: points.scalebox })

  // Notches
  macro('sprinkle', {
    snippet: 'notch',
    on: ['in2', 'gridAnchor'],
  })
  snippets.center = new Snippet('bnotch', points.center)

  // Dimensions
  macro('vd', {
    id: 'hLeft',
    from: points.ex2Flipped,
    to: points.in2Flipped,
    x: points.ex2Flipped.x - sa - 15,
  })
  macro('vd', {
    id: 'hToOpeningLeft',
    from: points.in2Flipped,
    to: points.center,
    x: points.ex2Flipped.x - sa - 15,
  })
  macro('vd', {
    id: 'hFull',
    from: points.ex2Flipped,
    to: points.center,
    x: points.ex2Flipped.x - sa - 30,
  })
  if (angle !== 90) {
    macro('vd', {
      id: 'hTopToOpeningRight',
      from: points.ex2,
      to: points.in2,
      x: angle > 90 ? points.in2.x - sa - 15 : points.ex2.x + sa + 15,
    })
    macro('vd', {
      id: 'hOpeningRightToCenter',
      from: points.in2,
      to: points.center,
      x: angle > 90 ? points.in2.x - sa - 15 : points.ex2.x + sa + 15,
    })
    macro('vd', {
      id: 'hHemRightToCenter',
      from: points.ex2,
      to: points.center,
      x: angle > 90 ? points.in2.x - sa - 30 : points.ex2.x + sa + 30,
    })
    macro('hd', {
      id: 'wHemToOpeningRight',
      from: points.ex2,
      to: points.in2,
      y: angle < 90 ? points.center.y - sa - 15 : points.ex2.y - sa - 15,
    })
    macro('hd', {
      id: 'wOpeningRightToCenter',
      from: points.center,
      to: points.in2,
      y: angle < 90 ? points.center.y - sa - 15 : points.ex2.y - sa - 15,
    })
    macro('hd', {
      id: 'wHemToCenter',
      from: points.center,
      to: points.ex2,
      y: angle < 90 ? points.center.y - sa - 30 : points.ex2.y - sa - 30,
    })
  }

  return part
}

export const skirt = {
  name: 'sandy.skirt',
  measurements: ['waist', 'waistToFloor', 'waistToHips', 'hips'],
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
    panels: { count: 1, min: 1, max: 8, menu: 'construction' },
  },
  plugins: ringsectorPlugin,
  draft: sandySkirt,
}
