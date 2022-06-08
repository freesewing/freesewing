export default function (part) {
  let {
    store,
    sa,
    Point,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    options,
    measurements,
    complete,
    paperless,
    macro,
  } = part.shorthand()

   
  let topFinOpening = store.get('topFinOpening')
  let topFinOpeningLength = store.get('topFinOpeningLength')

  let topFin01_02d = 256.9537569065251 * options.size
  let topFin01_02a = 325.46697637215823
  let topFin01_03d = 149.5416276819869 * options.size
  let topFin01_03a = 275.4353725228365
  let topFin01cp1d = 178.52481158058 * options.size
  let topFin01cp2d = 27.240286624072077 * options.size
  let topFin01cp1a = 346.31732410079576
  let topFin01cp2a = 254.05347154462484
  let topFin02cp1d = 25.871054481794893 * options.size
  let topFin02cp2d = 12.154549189501026 * options.size
  let topFin02cp1a = 236.80010054081936
  let topFin02cp2a = 56.66685795767527
  let topFin03cp1d = 39.024661651837555 * options.size
  let topFin03cp2d = 76.08965682877273 * options.size
  let topFin03cp1a = 113.40393219481112
  let topFin03cp2a = 22.511206474810457

  let diff = 0
  let iteration = 0
  do {
    points.topFin01 = new Point(0, 0)
    points.topFin02 = points.topFin01.shift(topFin01_02a, topFin01_02d)
    points.topFin03 = points.topFin01.shift(topFin01_03a, topFinOpening) // topFin01_03d

    points.topFin01cp1 = points.topFin01.shift(topFin01cp1a, topFin01cp1d)
    points.topFin01cp2 = points.topFin01.shift(topFin01cp2a, topFin01cp2d)
    points.topFin02cp1 = points.topFin02.shift(topFin02cp1a, topFin02cp1d)
    points.topFin02cp2 = points.topFin02.shift(topFin02cp2a, topFin02cp2d)
    points.topFin03cp1 = points.topFin03.shift(topFin03cp1a, topFin03cp1d)
    points.topFin03cp2 = points.topFin03.shift(topFin03cp2a, topFin03cp2d)
    diff =
      topFinOpeningLength -
      new Path()
        .move(points.topFin03)
        .curve(points.topFin03cp1, points.topFin01cp2, points.topFin01)
        .length()

    topFinOpening = topFinOpening + diff
    iteration++
  } while ((diff < -1 || diff > 1) && iteration < 100)

  console.log({ iteration: iteration })

    paths.seam = new Path()
    .move(points.topFin01)
    .curve(points.topFin01cp2, points.topFin03cp1, points.topFin03)
    .curve(points.topFin03cp2, points.topFin02cp1, points.topFin02)
    .curve(points.topFin02cp2, points.topFin01cp1, points.topFin01)
    .close()

  console.log({ topFinLength1: store.get('topFinOpeningLength') })
  console.log({
    topFinLength2: new Path()
      .move(points.topFin03)
      .curve(points.topFin03cp1, points.topFin01cp2, points.topFin01)
      .length(),
  })

  store.set(
    'topFinCircumference',
    new Path()
      .move(points.topFin01)
      .curve(points.topFin01cp1, points.topFin02cp2, points.topFin02)
      .curve(points.topFin02cp1, points.topFin03cp2, points.topFin03)
      .length()
  )

  console.log({
    topFinCirc: new Path()
      .move(points.topFin01)
      .curve(points.topFin01cp1, points.topFin02cp2, points.topFin02)
      .curve(points.topFin02cp1, points.topFin03cp2, points.topFin03)
      .length(),
  })

  // Complete?
  if (complete) {
    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  return part
}
