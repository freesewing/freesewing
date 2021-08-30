export default function (part) {
  let { Point, points, Path, paths, measurements, options, complete, sa, paperless, macro } =
    part.shorthand()

  let headRadius = measurements.head / 2 / Math.PI
  let brimRadius = headRadius / Math.sin((options.brimAngle * Math.PI) / 180)
  let sectorAngle = Math.PI / 3
  let brimSectorAngle = (sectorAngle * headRadius) / brimRadius
  let cpDistance =
    ((4 / 3) * brimRadius * (1 - Math.cos(brimSectorAngle / 2))) / Math.sin(brimSectorAngle / 2)

  points.origin = new Point(0, 0)
  points.in1 = new Point(0, 0)
  points.in2 = points.in1.shift(
    (90 / Math.PI) * brimSectorAngle,
    2 * brimRadius * Math.sin(brimSectorAngle / 2)
  )
  points.in1C = points.in1.shift(0, cpDistance)
  points.in2C = points.in2.shift(180 + (180 / Math.PI) * brimSectorAngle, cpDistance)
  points.in1CFlipped = points.in1C.flipX()
  points.in2Flipped = points.in2.flipX()
  points.in2CFlipped = points.in2C.flipX()

  points.ex1 = points.in1.shift(-90, options.brimWidth)
  points.ex1C = points.ex1.shift(0, 0.5 * points.in2.x)
  points.ex2C = points.in2.shift(
    -90,
    (points.ex1.y - points.in2.y) * (2 / (1 + Math.exp(-options.brimWidth / 15)) - 1)
  )
  points.ex1CFlipped = points.ex1C.flipX()
  points.ex2CFlipped = points.ex2C.flipX()

  paths.seam = new Path()
    .move(points.in2Flipped)
    .curve(points.in2CFlipped, points.in1CFlipped, points.in1)
    .curve(points.in1C, points.in2C, points.in2)
    .curve(points.ex2C, points.ex1C, points.ex1)
    .curve(points.ex1CFlipped, points.ex2CFlipped, points.in2Flipped)
    .close()

  // Complete?
  if (complete) {
    macro('grainline', { from: points.in1, to: points.ex1 })
    macro('title', { at: points.ex1.shift(45, 20), nr: 2, title: 'brim', scale: 0.4 })

    if (sa) {
      paths.sa = paths.seam.offset(sa * -1).attr('class', 'fabric sa')
    }

    // Paperless?
    if (paperless) {
      macro('hd', {
        from: points.in2Flipped,
        to: points.in2,
        y: points.ex1.y + 15 + sa,
      })
      macro('vd', {
        from: points.ex1,
        to: points.in1,
        x: points.in2Flipped.x - 15 - sa,
      })
      macro('vd', {
        from: points.ex1,
        to: points.in2Flipped,
        x: points.in2Flipped.x - 30 - sa,
      })
    }
  }
  return part
}
