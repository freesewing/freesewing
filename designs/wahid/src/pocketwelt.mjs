import { pocketWidth, pocketAngle, weltHeight } from './options.mjs'

function wahidPocketWelt({
  points,
  Point,
  paths,
  Path,
  measurements,
  options,
  macro,
  complete,
  paperless,
  part,
}) {

  const pw = measurements.hips * options.pocketWidth // Pocket width
  const pwh = pw * options.weltHeight // Pocket welt height
  points.topLeft = new Point(0, 0)
  points.topRight = new Point(pw + 30, 0)
  points.bottomLeft = new Point(0, pwh * 2 + 20)
  points.bottomRight = new Point(points.topRight.x, points.bottomLeft.y)
  points.notchLeft = new Point(15, 10)
  points.notchRight = new Point(pw + 15, 10)
  points.midLeft = new Point(0, pwh + 10)
  points.midRight = new Point(pw + 30, pwh + 10)
  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')
  if (complete) {
    points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    macro('title', {
      nr: 5,
      title: 'pocketWelt',
      at: points.title,
    })
    //Grainline
    let grainlineVariableShift = points.topLeft.dist(points.topRight) * 0.1

    points.grainlineFromWelt = new Point(points.topLeft.x, points.topLeft.y).shift(
      0,
      grainlineVariableShift
    )
    points.grainlineToWelt = new Point(points.topLeft.x, points.topLeft.y)
      .shift(0, grainlineVariableShift)
      .shift(-90, pwh * 2 + 20)
    points.grainlineToWeltRotated = points.grainlineToWelt.rotate(
      options.pocketAngle,
      points.grainlineFromWelt
    )

    macro('grainline', {
      from: points.grainlineFromWelt,
      to: points.grainlineToWeltRotated,
    })
    macro('sprinkle', {
      snippet: 'notch',
      on: ['notchLeft', 'notchRight'],
    })
    paths.cutline = new Path()
      .move(points.notchLeft)
      .line(points.notchRight)
      .attr('class', 'fabric stroke-sm dashed')
    paths.foldline = new Path()
      .move(points.midLeft)
      .line(points.midRight)
      .attr('class', 'hint dotted')
  }
  if (paperless) {
    macro('hd', {
      from: points.notchLeft,
      to: points.notchRight,
      y: points.bottomLeft.y + 15,
    })
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + 30,
    })
    macro('vd', {
      from: points.midRight,
      to: points.notchRight,
      x: points.midRight.x + 15,
    })
    macro('vd', {
      from: points.midRight,
      to: points.topRight,
      x: points.midRight.x + 30,
    })
    macro('vd', {
      from: points.bottomRight,
      to: points.topRight,
      x: points.midRight.x + 45,
    })
  }
  return part
}

export const pocketWelt = {
  name: 'wahid.pocketWelt',
  measurements: ['hips'],
  options: {
    pocketWidth,
    pocketAngle,
    weltHeight,
  },
  draft: wahidPocketWelt,
}
