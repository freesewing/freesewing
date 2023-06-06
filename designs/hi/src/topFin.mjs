import { body } from './body.mjs'

function draftHiTopFin({
  store,
  sa,
  Point,
  points,
  Path,
  paths,
  Snippet,
  snippets,
  options,
  complete,
  paperless,
  macro,
  part,
}) {
  let topFinOpening = store.get('topFinOpening')
  const topFinOpeningLength = store.get('topFinOpeningLength')

  const topFin01_02d = 256.9537569065251 * options.size
  const topFin01_02a = 325.46697637215823
  const topFin01_03a = 275.4353725228365
  const topFin01cp1d = 178.52481158058 * options.size
  const topFin01cp2d = 27.240286624072077 * options.size
  const topFin01cp1a = 346.31732410079576
  const topFin01cp2a = 254.05347154462484
  const topFin02cp1d = 25.871054481794893 * options.size
  const topFin02cp2d = 12.154549189501026 * options.size
  const topFin02cp1a = 236.80010054081936
  const topFin02cp2a = 56.66685795767527
  const topFin03cp1d = 39.024661651837555 * options.size
  const topFin03cp2d = 76.08965682877273 * options.size
  const topFin03cp1a = 113.40393219481112
  const topFin03cp2a = 22.511206474810457

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
  } while (Math.abs(diff) > store.get('tolerance') && iteration < 100)

  paths.seam = new Path()
    .move(points.topFin01)
    .curve(points.topFin01cp2, points.topFin03cp1, points.topFin03)
    .curve(points.topFin03cp2, points.topFin02cp1, points.topFin02)
    .curve(points.topFin02cp2, points.topFin01cp1, points.topFin01)
    .close()

  store.set(
    'topFinCircumference',
    new Path()
      .move(points.topFin01)
      .curve(points.topFin01cp1, points.topFin02cp2, points.topFin02)
      .curve(points.topFin02cp1, points.topFin03cp2, points.topFin03)
      .length()
  )

  store.cutlist.addCut({ material: 'color1UpperBody' })

  // Complete?
  if (complete) {
    paths.body = new Path()
      .move(points.topFin01)
      .curve(points.topFin01cp2, points.topFin03cp1, points.topFin03)
      .attr('class', 'hidden')
      .attr('data-text-class', 'text-xs')
    macro('banner', {
      path: paths.body,
      text: 'body',
      dy: 0,
      spaces: 10,
      repeat: 3,
    })

    points.titleAnchor = points.topFin01
      .shiftFractionTowards(points.topFin02, 0.5)
      .shiftFractionTowards(points.topFin03, 0.1)
    points.logoAnchor = points.titleAnchor.shiftFractionTowards(points.topFin03, 0.4)

    snippets.logo = new Snippet('logo', points.logoAnchor).attr(
      'data-scale',
      (options.size > 1 ? 1 : options.size) / 2
    )

    macro('title', {
      at: points.titleAnchor,
      nr: 7,
      title: 'topFin',
      scale: (options.size > 1 ? 1 : options.size) / 2,
    })

    if (paperless) {
      points.topFinLeft = paths.seam.edge('left')
      const tempPath = new Path()
        .move(points.topFin02)
        .curve(points.topFin02cp1, points.topFin03cp2, points.topFin03)
      points.topFinInsideTop = tempPath.edge('top')
      const tempPoint = tempPath.shiftFractionAlong(0.5)
      points.topFinInsideBottom = tempPath.split(tempPoint)[0].edge('bottom')
      points.topFinRight = paths.seam.edge('right')

      macro('hd', {
        from: points.topFin01,
        to: points.topFinRight,
        y: points.topFin01.y - sa - 10,
        // id: 'smallTop',
        // noStartMarker: true,
        // noEndMarker: true,
      })
      macro('hd', {
        from: points.topFin03,
        to: points.topFinRight,
        y: points.topFin03.y + sa + 20,
      })
      macro('hd', {
        from: points.topFinLeft,
        to: points.topFinRight,
        y: points.topFin03.y + sa + 10,
        // id: 'smallBottom',
        // noStartMarker: true,
        // noEndMarker: true,
      })
      macro('vd', {
        from: points.topFin03,
        to: points.topFin01,
        x: points.topFinLeft.x - sa - 10,
      })
      macro('vd', {
        from: points.topFin01,
        to: points.topFinInsideBottom,
        x: points.topFin02.x + sa + 10,
      })
      macro('vd', {
        from: points.topFinInsideTop,
        to: points.topFin01,
        x: points.topFinLeft.x - sa - 20,
      })
    }
    // if( options.size < 1.5 ) {
    //   paths.smallTop.attr('data-text-class', 'text-xs')
    //   paths.smallBottom.attr('data-text-class', 'text-xs')
    // }

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  return part
}

export const topFin = {
  name: 'hi.topFin',
  after: body,
  draft: draftHiTopFin,
}
