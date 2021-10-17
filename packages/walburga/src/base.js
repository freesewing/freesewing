export default function (part) {
  const {
    Point,
    points,
    Path,
    paths,
    measurements,
    options,
    macro,
    complete,
    snippets,
    Snippet,
    sa,
    paperless,
    store,
    utils,
  } = part.shorthand()

  // define some variables
  const hem_pos =
    options.length === 'toKnee'
      ? measurements.waistToKnee
      : options.length === 'toMidLeg'
      ? measurements.waistToKnee / 1.3
      : measurements.waistToFloor * 0.95

  const hiplength = measurements.hpsToWaistBack + measurements.waistToHips
  const hwidth = (measurements.shoulderToShoulder / 2) * options.widthBonus
  const length = (measurements.hpsToWaistBack + hem_pos) * options.lengthBonus
  const hhead = (measurements.head / 4) * options.headRatio
  const goldenRatio = 1.618033

  store.set('hhead', hhead)
  store.set('goldenRatio', goldenRatio)

  // make points
  points.top = new Point(0, 0)
  points.bottom = new Point(0, length)
  points.topLeft = points.top.shift(0, -hwidth)
  points.bottomLeft = points.bottom.shift(0, points.bottom.dx(points.topLeft))
  points.headLeft = points.top.shift(180, hhead)
  points.bottomMiddle = points.bottom.shiftFractionTowards(points.bottomLeft, 0.5)
  points.hips = points.top.shift(-90, hiplength)
  points.hipsLeft = points.hips.shift(0, points.bottom.dx(points.bottomLeft))

  points.triangle = points.bottom.shift(90, points.bottomLeft.dx(points.bottom) / goldenRatio) // golderatio proportinal to width
  points.triangleLeft = points.triangle.shift(0, points.bottom.dx(points.bottomLeft))

  // draw paths
  paths.seamBase = new Path()
    .move(points.headLeft)
    .line(points.topLeft)
    .line(points.triangleLeft)
    .line(points.bottomMiddle)
    .line(points.triangle)
    .setRender(false)
  paths.seam = new Path()
    .move(points.top)
    .line(points.topLeft)
    .join(paths.seamBase)
    .line(points.top)
    .close()
    .attr('class', 'fabric')

  // Complete?
  if (complete) {
    // notches
    if (options.neckline === false) snippets.hl = new Snippet('notch', points.headLeft)

    // cut on fold
    macro('cutonfold', {
      from: points.triangle,
      to: points.top,
      grainline: true,
    })

    // logo & title
    points.logo = points.top.shift(45, points.bottom.dy(points.top) / 5)
    snippets.logo = new Snippet('logo', points.logo)
    points.title = points.logo.shift(90, points.bottom.dy(points.top) / 4)
    macro('title', {
      at: points.title,
      nr: 1,
      title: 'wappenrock-base',
    })
    points.__titleNr.attr('data-text-class', 'center')
    points.__titleName.attr('data-text-class', 'center')
    points.__titlePattern.attr('data-text-class', 'center')

    // scalebox
    points.scalebox = points.title.shift(90, points.bottom.dy(points.top) / 5)
    macro('scalebox', { at: points.scalebox })

    // seam allowance
    if (sa) {
      const angle = points.bottomMiddle.angle(points.triangle)
      // Using noop/insop so we can adapt the start later
      paths.saBase = new Path()
        .noop('start')
        .move(points.topLeft.shift(90, sa))
        .line(points.topLeft.shift(180, sa))
        .line(points.triangleLeft.shift(180, sa))
        .line(points.triangleLeft.shift(180 + angle, sa))
        .line(points.bottomMiddle.shift(180 + angle, sa))
        .line(points.bottomMiddle.shift(270 + angle, sa))
        .line(
          utils.beamIntersectsX(
            points.bottomMiddle.shift(270 + angle, sa),
            points.triangle.shift(270 + angle, sa),
            points.triangle.x
          )
        )
        .line(points.triangle)
        .setRender(false)

      // Insop the start
      paths.sa = paths.saBase
        .insop(
          'start',
          new Path()
            .move(points.top)
            .line(points.top.shift(90, sa))
            .line(points.topLeft.shift(90, sa))
        )
        .attr('class', 'fabric sa')
        .setRender(true)
    }

    // Paperless?
    if (paperless) {
      macro('vd', {
        from: points.top,
        to: points.bottom,
        x: points.bottom.x + 10,
      })
      macro('vd', {
        from: points.triangleLeft,
        to: points.bottomLeft,
        x: points.bottomLeft.x - 10,
      })

      macro('vd', {
        from: points.topLeft,
        to: points.triangleLeft,
        x: points.bottomLeft.x - 10,
      })

      macro('hd', {
        from: points.topLeft,
        to: points.top,
        y: points.top.y + 15,
      })

      macro('hd', {
        from: points.headLeft,
        to: points.top,
        y: points.top.y - 15,
      })
      macro('hd', {
        from: points.topLeft,
        to: points.headLeft,
        y: points.top.y - 15,
      })
      macro('hd', {
        from: points.triangleLeft,
        to: points.bottomMiddle,
        y: points.triangleLeft.y,
      })
      macro('vd', {
        from: points.hipsLeft,
        to: points.triangleLeft,
        x: points.triangleLeft.x + 5,
      })
      macro('ld', {
        from: points.triangleLeft,
        to: points.bottomMiddle,
        d: -10,
      })
    }
  }
  return part
}
