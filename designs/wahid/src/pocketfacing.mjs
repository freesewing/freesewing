import { front } from './front.mjs'

function wahidPocketFacing({
  points,
  Point,
  paths,
  Path,
  measurements,
  options,
  macro,
  complete,
  paperless,
  store,
  part,
}) {

  const pw = measurements.hips * options.pocketWidth // Pocket width
  const pwh = pw * options.weltHeight // Pocket welt height
  const ph = store.get('pocketBagLength') + pwh // Pocket height
  points.topLeft = new Point(0, 0)
  points.topRight = new Point(pw + 30, 0)
  points.bottomLeft = new Point(0, ph + 10)
  points.bottomRight = new Point(points.topRight.x, points.bottomLeft.y)
  points.notchLeft = new Point(15, 10)
  points.notchRight = new Point(pw + 15, 10)
  macro('round', {
    from: points.topLeft,
    to: points.bottomRight,
    via: points.bottomLeft,
    radius: pw / 8,
    render: false,
    prefix: 'roundLeft',
  })
  macro('round', {
    from: points.bottomLeft,
    to: points.topRight,
    via: points.bottomRight,
    radius: pw / 8,
    render: false,
    prefix: 'roundRight',
  })
  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.roundLeftStart)
    .curve(points.roundLeftCp1, points.roundLeftCp2, points.roundLeftEnd)
    .line(points.roundRightStart)
    .curve(points.roundRightCp1, points.roundRightCp2, points.roundRightEnd)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')
  if (complete) {
    points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    macro('title', {
      nr: 6,
      title: 'pocketFacing',
      at: points.title,
    })
    //Grainline
    let grainlineVariableShift = points.topLeft.dist(points.topRight) * 0.1
    points.grainlineFromPocketFacing = new Point(points.topLeft.x, points.topLeft.y).shift(
      0,
      grainlineVariableShift
    )
    points.grainlineToPocketFacing = new Point(points.topLeft.x, points.topLeft.y)
      .shift(0, grainlineVariableShift)
      .shift(-90, ph)
    points.grainlineToPocketFacingRotated = points.grainlineToPocketFacing.rotate(
      options.pocketAngle,
      points.grainlineFromPocketFacing
    )
    macro('grainline', {
      from: points.grainlineFromPocketFacing,
      to: points.grainlineToPocketFacingRotated,
    })
    macro('sprinkle', {
      snippet: 'notch',
      on: ['notchLeft', 'notchRight'],
    })
    paths.cutline = new Path()
      .move(points.notchLeft)
      .line(points.notchRight)
      .attr('class', 'fabric stroke-sm dashed')
  }
  if (paperless) {
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + 15,
    })
    macro('vd', {
      from: points.bottomRight,
      to: points.topRight,
      x: points.topRight.x + 15,
    })
  }
  return part
}

export const pocketFacing = {
  name: 'wahid.pocketFacing',
  after: front,
  draft: wahidPocketFacing,
}
