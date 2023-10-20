import { body } from './body.mjs'

export const topOfFin = {
  name: 'hi.topOfFin',
  after: body,
  draft: ({ store, sa, Point, points, Path, paths, Snippet, snippets, macro, part }) => {
    const multiplier = store.get('multiplier')

    let topOfFinOpening = store.get('topOfFinOpening')
    const topOfFinOpeningLength = store.get('topOfFinOpeningLength')

    const topOfFin01_02d = 256.9537569065251 * multiplier
    const topOfFin01_02a = 325.46697637215823
    const topOfFin01_03a = 275.4353725228365
    const topOfFin01cp1d = 178.52481158058 * multiplier
    const topOfFin01cp2d = 27.240286624072077 * multiplier
    const topOfFin01cp1a = 346.31732410079576
    const topOfFin01cp2a = 254.05347154462484
    const topOfFin02cp1d = 25.871054481794893 * multiplier
    const topOfFin02cp2d = 12.154549189501026 * multiplier
    const topOfFin02cp1a = 236.80010054081936
    const topOfFin02cp2a = 56.66685795767527
    const topOfFin03cp1d = 39.024661651837555 * multiplier
    const topOfFin03cp2d = 76.08965682877273 * multiplier
    const topOfFin03cp1a = 113.40393219481112
    const topOfFin03cp2a = 22.511206474810457

    let diff = 0
    let iteration = 0
    do {
      points.topOfFin01 = new Point(0, 0)
      points.topOfFin02 = points.topOfFin01.shift(topOfFin01_02a, topOfFin01_02d)
      points.topOfFin03 = points.topOfFin01.shift(topOfFin01_03a, topOfFinOpening) // topOfFin01_03d

      points.topOfFin01cp1 = points.topOfFin01.shift(topOfFin01cp1a, topOfFin01cp1d)
      points.topOfFin01cp2 = points.topOfFin01.shift(topOfFin01cp2a, topOfFin01cp2d)
      points.topOfFin02cp1 = points.topOfFin02.shift(topOfFin02cp1a, topOfFin02cp1d)
      points.topOfFin02cp2 = points.topOfFin02.shift(topOfFin02cp2a, topOfFin02cp2d)
      points.topOfFin03cp1 = points.topOfFin03.shift(topOfFin03cp1a, topOfFin03cp1d)
      points.topOfFin03cp2 = points.topOfFin03.shift(topOfFin03cp2a, topOfFin03cp2d)

      diff =
        topOfFinOpeningLength -
        new Path()
          .move(points.topOfFin03)
          .curve(points.topOfFin03cp1, points.topOfFin01cp2, points.topOfFin01)
          .length()

      topOfFinOpening = topOfFinOpening + diff
      iteration++
    } while (Math.abs(diff) > store.get('tolerance') && iteration < 100)

    paths.seam = new Path()
      .move(points.topOfFin01)
      .curve(points.topOfFin01cp2, points.topOfFin03cp1, points.topOfFin03)
      .curve(points.topOfFin03cp2, points.topOfFin02cp1, points.topOfFin02)
      .curve(points.topOfFin02cp2, points.topOfFin01cp1, points.topOfFin01)
      .close()

    store.set(
      'topOfFinCircumference',
      new Path()
        .move(points.topOfFin01)
        .curve(points.topOfFin01cp1, points.topOfFin02cp2, points.topOfFin02)
        .curve(points.topOfFin02cp1, points.topOfFin03cp2, points.topOfFin03)
        .length()
    )

    store.cutlist.addCut({ cut: 2, material: 'color1UpperBody' })

    paths.body = new Path()
      .move(points.topOfFin01)
      .curve(points.topOfFin01cp2, points.topOfFin03cp1, points.topOfFin03)
      .attr('class', 'hidden')
      .attr('data-text-class', 'text-xs')
    macro('banner', {
      path: paths.body,
      text: 'body',
      dy: 0,
      spaces: 10,
      repeat: 3,
    })

    points.titleAnchor = points.topOfFin01
      .shiftFractionTowards(points.topOfFin02, 0.5)
      .shiftFractionTowards(points.topOfFin03, 0.1)
    points.logoAnchor = points.titleAnchor.shiftFractionTowards(points.topOfFin03, 0.4)
    points.gridAnchor = points.titleAnchor.clone()

    snippets.logo = new Snippet('logo', points.logoAnchor).attr(
      'data-scale',
      (multiplier > 1 ? 1 : multiplier) / 2
    )

    macro('title', {
      at: points.titleAnchor,
      nr: 7,
      title: 'topOfFin',
      scale: (multiplier > 1 ? 1 : multiplier) / 2,
    })

    points.topOfFinLeft = paths.seam.edge('left')
    const tempPath = new Path()
      .move(points.topOfFin02)
      .curve(points.topOfFin02cp1, points.topOfFin03cp2, points.topOfFin03)
    points.topOfFinInsideTop = tempPath.edge('top')
    const tempPoint = tempPath.shiftFractionAlong(0.5)
    points.topOfFinInsideBottom = tempPath.split(tempPoint)[0].edge('bottom')
    points.topOfFinRight = paths.seam.edge('right')

    macro('hd', {
      from: points.topOfFin01,
      to: points.topOfFinRight,
      y: points.topOfFin01.y - sa - 10,
      id: 'topWidth',
    })
    macro('hd', {
      from: points.topOfFin03,
      to: points.topOfFinRight,
      y: points.topOfFin03.y + sa + 20,
      id: 'bottomWidth',
    })
    macro('hd', {
      from: points.topOfFinLeft,
      to: points.topOfFinRight,
      y: points.topOfFin03.y + sa + 10,
      id: 'width',
    })

    macro('vd', {
      from: points.topOfFin03,
      to: points.topOfFin01,
      x: points.topOfFinLeft.x - sa - 10,
      id: 'leftHeight',
    })
    macro('vd', {
      from: points.topOfFin01,
      to: points.topOfFinInsideBottom,
      x: points.topOfFin02.x + sa + 10,
      id: 'rightHeight',
    })
    macro('vd', {
      from: points.topOfFinInsideTop,
      to: points.topOfFin01,
      x: points.topOfFinLeft.x - sa - 20,
      id: 'minHeight',
    })

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }

    return part
  },
}
