export const ghost = {
  name: 'gozer.ghost',
  measurements: ['hpsToWaistBack', 'waistToFloor', 'head'],
  draft: ({ measurements, Point, points, Snippet, snippets, sa, macro, part }) => {
    const eyeSize = measurements.head * 0.0416
    const size =
      measurements.hpsToWaistBack + measurements.waistToFloor + measurements.head / Math.PI

    points.middle = new Point(0, 0).addCircle(size, 'fabric')

    points.eyeLine = points.middle.shift(270, measurements.head / Math.PI / 2)
    points.eyeLeft = points.eyeLine.shift(180, measurements.head * 0.13)
    points.eyeRight = points.eyeLine.shift(0, measurements.head * 0.13)
    points.left = new Point(-1 * size, 0)
    points.right = new Point(size, 0)

    points.eyeLeft.addCircle(eyeSize)
    points.eyeRight.addCircle(eyeSize)

    points.title = points.middle.shift(270, size * 0.65)
    macro('title', {
      nr: 1,
      at: points.title,
      title: 'Gozer',
      align: 'center',
    })
    points.logo = points.middle.shift(270, size * 0.5)
    snippets.logo = new Snippet('logo', points.logo)

    if (sa) {
      points.sa = new Point(0, 0).addCircle(size + sa, 'fabric sa')
    }

    macro('hd', {
      from: points.left,
      to: points.right,
      id: 'width',
      y: points.right.y,
    })
    macro('hd', {
      from: points.eyeLeft,
      to: points.middle,
      id: 'eye',
      y: points.eyeLeft.y,
    })
    macro('vd', {
      from: points.eyeLeft,
      to: points.middle,
      id: 'eye',
      x: points.eyeLeft.x,
    })

    return part
  },
}
