export function draftCurvedWaistband({
  utils,
  store,
  sa,
  points,
  Path,
  paths,
  Snippet,
  snippets,
  options,
  macro,
  absoluteOptions,
  part,
}) {
  /**
   * The curved waistband is just a ring sector with external
   * and intenal radius and angle calculated from measurements
   * and options
   */

  // Calculate the angle of the ring sector and the radius of the upper arc
  const an =
    utils.rad2deg(store.get('bottomCircumference') - store.get('topCircumference')) /
    absoluteOptions.waistbandWidth

  const rad = store.get('topCircumference') / utils.deg2rad(an)

  // Extra angle to extend the waistband to overlap according to waistbandOverlap
  const anExtra = utils.rad2deg(
    store.get('waistbandOverlap') / (rad + absoluteOptions.waistbandWidth)
  )

  // Call the RingSector macro to draft the waistband
  const ids = macro('ringsector', {
    angle: an + anExtra,
    insideRadius: rad,
    outsideRadius: rad + absoluteOptions.waistbandWidth,
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

  if (sa) paths.sa = paths.seam.offset(sa).addClass('fabric sa')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 1, from: 'fabric' })

  // Anchor samples to the centre of the waist
  points.gridAnchor = points.in1.clone()

  // Title
  points.title = points.ex2Flipped.shiftFractionTowards(points.ex2, 0.5)
  macro('title', {
    at: points.title,
    nr: 2,
    title: 'curvedWaistband',
    scale: 0.5,
  })

  // Grainline
  macro('grainline', {
    from: points.ex2Flipped,
    to: points.ex2,
  })

  // Buttons / Notches
  if (store.get('waistbandOverlap') >= options.minimumOverlap) {
    points.pivot = points.in2.shiftFractionTowards(points.ex2, 0.5)
    points.button = points.pivot
      .shiftTowards(points.ex2, store.get('waistbandOverlap') / 2)
      .rotate(-90, points.pivot)
    points.buttonhole = points.button.flipX()
    snippets.button = new Snippet('button', points.button)
    snippets.buttonhole = new Snippet('buttonhole', points.buttonhole).rotate(
      points.in2.angle(points.ex2)
    )
    points.centerNotch = new Path()
      .move(points.ex1Rotated)
      .circleSegment(-(an + anExtra), points.center)
      .shiftAlong(store.get('waistbandOverlap') / 2)
    points.buttonNotch = new Path()
      .move(points.ex2Rotated)
      .circleSegment(an + anExtra, points.center)
      .shiftAlong(store.get('waistbandOverlap'))
    macro('sprinkle', {
      snippet: 'notch',
      on: ['centerNotch', 'buttonNotch', 'ex2Flipped'],
    })
  }

  // Dimensions
  macro('hd', {
    id: 'wTop',
    from: points.in2FlippedRotated,
    to: points.in2,
    y: points.in2.y - sa - 15,
  })
  macro('hd', {
    from: points.ex2FlippedRotated,
    id: 'wFull',
    to: points.ex2,
    y: points.in2.y - sa - 30,
  })
  macro('vd', {
    id: 'hFull',
    from: points.ex1,
    to: points.in2,
    x: points.in2.x + sa + 40,
  })
  macro('ld', {
    id: 'lWidth',
    from: points.ex2,
    to: points.in2,
    d: -1 * sa - 15,
  })

  return part
}
