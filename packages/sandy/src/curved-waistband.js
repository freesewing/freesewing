import draftRingSector from './shared'

export default function (part) {
  /**
   * The curved waistband is just a ring sector with external
   * and intenal radius and angle calculated from measurements
   * and options
   */
  const {
    utils,
    store,
    sa,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    options,
    complete,
    paperless,
    macro,
    absoluteOptions,
  } = part.shorthand()

  // Calculate the angle of the ring sector and the radius of the upper arc
  const an =
    utils.rad2deg(store.get('bottomCircumference') - store.get('topCircumference')) /
    absoluteOptions.waistbandWidth

  const rad = store.get('topCircumference') / utils.deg2rad(an)

  // Extra angle to extend the waistband to overlap according to waistbandOverlap
  const anExtra = utils.rad2deg(
    store.get('waistbandOverlap') / (rad + absoluteOptions.waistbandWidth)
  )

  // The curved waistband is shown with no rotation
  const rot = 0
  // Call draftRingSector to draft the part
  paths.seam = draftRingSector(
    part,
    rot,
    an + anExtra,
    rad,
    rad + absoluteOptions.waistbandWidth
  ).attr('class', 'fabric')

  // Anchor samples to the centre of the waist
  points.gridAnchor = points.in1.clone()

  // Complete pattern?
  if (complete) {
    points.title = points.in1Rotated.shiftFractionTowards(points.ex1Rotated, 0.5).shift(0, 25)
    macro('title', {
      at: points.title,
      nr: 2,
      title: 'curvedWaistband',
      scale: 0.5,
    })
    points.grainlineFrom = utils.curveIntersectsY(
      points.ex2FlippedRotated,
      points.ex2CFlippedRotated,
      points.ex1CFlippedRotated,
      points.ex1Rotated,
      points.title.y
    )
    points.grainlineTo = points.grainlineFrom.flipX()
    macro('grainline', {
      from: points.grainlineFrom,
      to: points.grainlineTo,
    })

    if (store.get('waistbandOverlap') >= options.minimumOverlap) {
      points.pivot = points.in2Rotated.shiftFractionTowards(points.ex2Rotated, 0.5)
      points.button = points.pivot
        .shiftTowards(points.ex2Rotated, store.get('waistbandOverlap') / 2)
        .rotate(-90, points.pivot)
      points.buttonhole = points.button.flipX()
      snippets.button = new Snippet('button', points.button)
      snippets.buttonhole = new Snippet('buttonhole', points.buttonhole).attr(
        'data-rotate',
        -1 * points.ex2FlippedRotated.angle(points.in2FlippedRotated)
      )
      points.centerNotch = new Path()
        .move(points.ex1Rotated)
        .curve(points.ex1CFlippedRotated, points.ex2CFlippedRotated, points.ex2FlippedRotated)
        .shiftAlong(store.get('waistbandOverlap') / 2)
      points.buttonNotch = new Path()
        .move(points.ex2Rotated)
        .curve(points.ex2CRotated, points.ex1CRotated, points.ex1Rotated)
        .shiftAlong(store.get('waistbandOverlap'))
      macro('sprinkle', {
        snippet: 'notch',
        on: ['centerNotch', 'buttonNotch', 'ex2FlippedRotated'],
      })
    }

    if (sa) paths.sa = paths.seam.offset(sa * -1).attr('class', 'fabric sa')
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.in2FlippedRotated,
      to: points.in2Rotated,
      y: points.in2Rotated.y - sa - 15,
    })
    macro('hd', {
      from: points.ex2FlippedRotated,
      to: points.ex2Rotated,
      y: points.in2Rotated.y - sa - 30,
    })
    macro('vd', {
      from: points.ex1Rotated,
      to: points.in2Rotated,
      x: points.in2Rotated.x + sa + 30,
    })
    macro('ld', {
      from: points.ex2Rotated,
      to: points.in2Rotated,
      d: -1 * sa - 15,
    })
  }

  return part
}
