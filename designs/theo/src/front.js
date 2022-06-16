export default function (part) {
  let {
    store,
    sa,
    Point,
    points,
    Path,
    paths,
    options,
    complete,
    paperless,
    macro,
    utils,
    measurements,
    snippets,
    raise,
  } = part.shorthand()

  // Let's warn about some common issues
  if ((measurements.crotchDepth - measurements.waistToHips) / measurements.hips < 0.15)
    raise.warning(
      'There is little vertical space to draw the cross seam. Perhaps double-check the seath depth and waist to hips measurements'
    )

  // Clean up inheritedpaths & snippets
  for (let id in paths) delete paths[id]
  for (let id in snippets) delete snippets[id]

  points[1] = new Point(
    points[0].x,
    measurements.crotchDepth - measurements.waistToHips - options.waistbandWidth + 10
  )
  points[2] = new Point(points[0].x, points[1].y + measurements.inseam + store.get('lengthBonus'))
  points[3] = new Point(points[0].x, points[1].y + measurements.inseam / 2 + 50)
  points[4] = new Point(
    points[0].x,
    points[1].y - (measurements.crotchDepth - measurements.waistToHips) / 4
  )
  points[5] = new Point(points[0].x - measurements.seat / 8 + 10, points[1].y)
  points[501] = points[5].shift(135, 30)
  points[502] = points[501].shift(45, 30)
  points[503] = points[501].shift(-135, 30)
  points[6] = new Point(points[5].x, points[4].y)
  points[7] = new Point(points[5].x, points[0].y)
  points[8] = new Point(points[6].x + measurements.seat / 4 + 20, points[6].y)
  points[801] = new Point(
    points[8].x,
    points[8].y - (measurements.crotchDepth - measurements.waistToHips) / 4
  )
  points[802] = new Point(
    points[8].x,
    points[8].y + (measurements.crotchDepth - measurements.waistToHips) / 4
  )
  points[9] = new Point(
    points[5].x - measurements.seat / 16 - 5 + store.get('backReduction'),
    points[5].y
  )
  points[10] = new Point(points[7].x + 10, points[7].y)
  points[1001] = points[10].shiftTowards(points[6], 10)
  points[1002] = new Point(points[0].x, points[1001].y)
  points[11] = new Point(points[10].x + measurements.hips / 4 + 25, points[10].y)
  points[12] = new Point(points[2].x + store.get('legWidth') / 2, points[2].y)
  points[1201] = new Point(points[12].x, points[12].y - 50)
  points[13] = points[12].flipX()
  points[1301] = points[1201].flipX()
  points[14] = new Point(points[3].x + store.get('legWidth') / 2 + 15, points[3].y)
  points[1401] = points[12].shiftOutwards(points[14], points[1].dy(points[3]) / 2)
  points[1402] = points[1401].flipX()

  points[15] = points[14].flipX()
  points[40] = new Path().move(points[1001]).curve_(points[1002], points[11]).shiftAlong(50)
  points[41] = new Point(
    points[40].x + points[1001].dx(points[6]),
    points[40].y + points[1001].dy(points[6])
  )
  let tmp = new Path().move(points[6])._curve(points[502], points[501])
  points[42] = tmp.shiftAlong(tmp.length() / 2)
  points[43] = points[42].shift(-35, 10)
  points['43beam'] = points[42].shift(-35, 40) // We use this to find curve intersection later
  points[44] = points[43].shift(0, 20)
  points[45] = points[40].shiftOutwards(points[41], 20)

  points[-1001] = new Path().move(points[1001]).curve_(points[1002], points[11]).shiftAlong(10)
  points[-100101] = points[-1001].shift(points[1001].angle(points[6]), 10)
  points[-1002] = points[1002].shift(90, -10)
  points[-11] = new Path().move(points[11])._curve(points[801], points[8]).shiftAlong(10)
  points[-1101] = new Path().move(points[11])._curve(points[1002], points[1001]).shiftAlong(10)
  points[-1102] = new Point(
    points[-1101].x + points[11].dx(points[-11]),
    points[-1101].y + points[11].dy(points[-11])
  )
  points[-801] = points[801].shift(0, -10)
  points[-8] = points[8].shift(0, -10)
  points[-802] = points[802].shift(0, -10)
  points[-1401] = points[1401].shift(points[1401].angle(points[14]) + 90, -10)
  points[-14] = points[14].shift(points[1401].angle(points[14]) + 90, -10)
  points[-1201] = points[1201].shift(0, -10)
  points[-12] = points[12].shift(0, -10)
  points[-13] = points[13].shift(0, 10)
  points[-1301] = points[1301].shift(0, 10)
  points[-15] = points[-14].flipX()
  points[-1402] = points[-1401].flipX()
  points[-901] = new Path().move(points[9])._curve(points[503], points[501]).shiftAlong(10)
  points[-902] = new Path().move(points[9])._curve(points[1402], points[15]).shiftAlong(10)
  points[-9] = new Point(
    points[-902].x + points[9].dx(points[-901]),
    points[-902].y + points[9].dy(points[-901])
  )
  points[-501] = points[501].shift(points[503].angle(points[502]) - 90, 10)
  points[-502] = points[502].shift(points[503].angle(points[502]) - 90, 10)
  points[-503] = points[503].shift(points[503].angle(points[502]) - 90, 10)
  points[-6] = points[6].shift(points[6].angle(points[1001]) - 90, 10)
  points[-40] = points[40].shiftTowards(points[41], 10)

  // Smooth fly curve a bit at -6
  points['-6cp'] = points[-100101].shiftOutwards(points[-6], points[-6].dist(points[-502]) / 2)

  // Make sure fly ends on curve
  let pretipX = utils.lineIntersectsCurve(
    points[42],
    points['43beam'],
    points[-501],
    points[-502],
    points['-6cp'],
    points[-6]
  )
  // If we found mulitple points, that's not a great sign.
  // But at least we need a point instead of an array things we break
  if (Array.isArray(points.flyPretipX)) points.flyPretipX = pretipX.pop()
  // If we found no points then we're screwed
  if (points.flyPreTip) points.flyPretipX = pretipX
  else {
    raise.warning(`
      Unable to determine fly end

      We improvised to prevent the pattern from falling apart.
      But this is almost certainly going to be a bad pattern since we're in uncharted territory.
    `)
    points.flyPretipX = new Path()
      .move(points[-6])
      .curve(points['-6cp'], points[-502], points[-501])
      .shiftFractionAlong(0.75)
  }

  points[43] = points.flyPretipX.clone()
  // Slant pocket
  points[60] = new Path().move(points[-1102])._curve(points[-1002], points[-100101]).shiftAlong(50)
  let curve = new Path().move(points[-1102])._curve(points[-801], points[-8])
  let len = curve.length()
  if (len >= 190) points[61] = curve.shiftAlong(190)
  else
    points[61] = new Path()
      .move(points[-8])
      .curve(points[-802], points[-1401], points[-14])
      .shiftAlong(190 - len)

  // Paths
  // This is the original Aldrich path, which includes seam allowance
  paths.aldrich = new Path()
    .move(points[9])
    ._curve(points[503], points[501])
    .curve_(points[502], points[6])
    .line(points[1001])
    .curve_(points[1002], points[11])
    ._curve(points[801], points[8])
    .curve(points[802], points[1401], points[14])
    ._curve(points[1201], points[12])
    .line(points[13])
    .curve_(points[1301], points[15])
    .curve_(points[1402], points[9])
    .close()

  // This is the path we use, no seam allowance
  paths.hemBase = new Path().move(points[-12]).line(points[-13])
  paths.saBase = new Path()
    .move(points[-13])
    .curve_(points[-1301], points[-15])
    .curve_(points[-1402], points[-9])
    ._curve(points[-503], points[-501])
    .curve(points[-502], points['-6cp'], points[-6])
    .line(points[-100101])
    .curve_(points[-1002], points[-1102])
    ._curve(points[-801], points[-8])
    .curve(points[-802], points[-1401], points[-14])
    ._curve(points[-1201], points[-12])

  paths.seam = paths.hemBase.clone().join(paths.saBase).close().attr('class', 'fabric')

  paths.aldrich.render = false
  paths.hemBase.render = false
  paths.saBase.render = false

  // Complete pattern?
  if (complete) {
    if (sa) {
      paths.sa = paths.hemBase
        .offset(-3 * sa)
        .join(paths.saBase.offset(-1 * sa))
        .close()
        .attr('class', 'fabric sa')
    }
    paths.fly = new Path()
      .move(points[43])
      .curve(points[44], points[45], points[41])
      .line(points[-40])
      .attr('class', 'fabric dashed')
    paths.pocket = new Path().move(points[60]).line(points[61]).attr('class', 'fabric dashed')
    paths.lining = new Path().move(points[-14]).line(points[-15]).attr('class', 'lining dashed')
    macro('title', { at: points.title, title: 'front', nr: 2 })
    macro('sprinkle', {
      snippet: 'notch',
      on: [60, 61, 43],
    })
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points[-9],
      to: points[-100101],
      y: points[-1102].y - sa - 15,
    })
    macro('hd', {
      from: points[-100101],
      to: points[-1102],
      y: points[-1102].y - sa - 15,
    })
    macro('hd', {
      from: points[-9],
      to: points[-1102],
      y: points[-1102].y - sa - 15,
    })
    macro('hd', {
      from: points[-9],
      to: points[-8],
      y: points[-1102].y - sa - 30,
    })
    macro('vd', {
      from: points[-9],
      to: points[-100101],
      x: points[-9].x - sa - 15,
    })
    macro('vd', {
      from: points[-9],
      to: points[-1102],
      x: points[-9].x - sa - 30,
    })
    macro('vd', {
      from: points[-13],
      to: points[-9],
      x: points[-9].x - sa - 30,
    })
    macro('vd', {
      from: points[-12],
      to: points[-1102],
      x: points[-8].x + sa + 15,
    })
    macro('hd', {
      from: points[-13],
      to: points[-12],
      y: points[-12].y + 3 * sa + 15,
    })
  }

  return part
}
