export default function (part) {
  let { store, Point, points, Path, paths, measurements, options, complete, sa, paperless, macro } =
    part.shorthand()

  let headCircumference = measurements.head + (measurements.head*options.headEase)
  let headRadius = headCircumference / 2 / Math.PI
<<<<<<< HEAD
  let visorWidth = headCircumference*options.visorWidth
  let visorRadius = (headRadius / Math.sin((options.visorAngle * Math.PI) / 180))
  let sectorAngle = (Math.PI / 3)*options.visorLength
=======
  let visorRadius = headRadius / Math.sin((options.visorAngle * Math.PI) / 180)
  let sectorAngle = (Math.PI / 3) * options.visorLength
>>>>>>> 08fac92c3c6221d66153cf6acdc469aee6a849f6
  let visorSectorAngle = (sectorAngle * headRadius) / visorRadius
  let cpDistance =
    ((4 / 3) * visorRadius * (1 - Math.cos(visorSectorAngle / 2))) / Math.sin(visorSectorAngle / 2)

  points.origin = new Point(0, 0)
  points.in1 = new Point(0, 0)
  points.in2 = points.in1.shift(
    (90 / Math.PI) * visorSectorAngle,
    2 * visorRadius * Math.sin(visorSectorAngle / 2)
  )
  //test circle
  //points.circleCentre = points.in1.shift(90,headRadius)
  //.attr("data-circle",headRadius)
  //points.circle60 = points.circleCentre.shift(-30,headRadius)
  //
  points.in1C = points.in1.shift(0, cpDistance)
  points.in2C = points.in2.shift(180 + (180 / Math.PI) * visorSectorAngle, cpDistance)
  points.in1CFlipped = points.in1C.flipX()
  points.in2Flipped = points.in2.flipX()
  points.in2CFlipped = points.in2C.flipX()

<<<<<<< HEAD
  points.ex1 = points.in1.shift(-90, visorWidth)
  points.ex1C = points.ex1.shift(0, 0.5 * points.in2.x)
  points.ex2C = points.in2.shift(
    -90,
    (points.ex1.y - points.in2.y) * (2 / (1 + Math.exp(-visorWidth / 15)) - 1)
=======
  store.set('visorWidth', measurements.head * options.visorWidth)
  points.ex1 = points.in1.shift(-90, store.get('visorWidth'))
  points.ex1C = points.ex1.shift(0, 0.5 * points.in2.x)
  points.ex2C = points.in2.shift(
    -90,
    (points.ex1.y - points.in2.y) * (2 / (1 + Math.exp(store.get('visorWidth') / -15)) - 1)
>>>>>>> 08fac92c3c6221d66153cf6acdc469aee6a849f6
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
    macro('title', { at: points.ex1.shift(45, 20), nr: 2, title: 'visor', scale: 0.4 })

    if (sa) {
      paths.saInner = new Path()
        .move(points.in2Flipped)
        .curve(points.in2CFlipped, points.in1CFlipped, points.in1)
        .curve(points.in1C, points.in2C, points.in2)
        .offset(sa * -2)
        .attr('class', 'fabric sa')
      points.sa1 = new Point(points.in2Flipped.x - sa, paths.saInner.start().y)
      points.sa2 = new Point(points.in2.x + sa, paths.saInner.start().y)
      paths.sa = new Path()
        .move(points.in2)
        .curve(points.ex2C, points.ex1C, points.ex1)
        .curve(points.ex1CFlipped, points.ex2CFlipped, points.in2Flipped)
        .offset(sa * -1)
        .line(points.sa1)
        .join(paths.saInner)
        .line(points.sa2)
        .close()
        .attr('class', 'fabric sa')
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
