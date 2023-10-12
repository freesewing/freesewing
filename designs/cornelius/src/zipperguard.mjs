import { front } from './front.mjs'

export const zipperguard = {
  name: 'cornelius.zipperguard',
  after: front,
  draft: ({ Point, Path, points, paths, Snippet, snippets, sa, store, macro, part }) => {
    const cc = 0.551915024494 // circle constant

    const halfInch = store.get('halfInch')
    const flyWidth = store.get('flyWidth') * halfInch
    const flyLength = store.get('flyLength')

    points.pA = new Point(0, 0)
    points.pB = points.pA.shift(180, flyWidth)
    points.pC = points.pB.shift(270, flyLength - flyWidth)
    points.pD = points.pA.shift(270, flyLength)
    points.pDcpC = points.pD.shift(180, flyWidth * cc)
    points.pCcpD = points.pC.shift(270, flyWidth * cc)

    paths.seam = new Path()
      .move(points.pA)
      .line(points.pB)
      .line(points.pC)
      .curve(points.pCcpD, points.pDcpC, points.pD)
      .attr('class', 'fabric')

    paths.seam2 = new Path().move(points.pD).line(points.pA).attr('class', 'fabric')

    macro('cutonfold', {
      from: points.pD,
      to: points.pA,
    })

    points.gridAnchor = points.pA.clone()

    store.cutlist.addCut({ cut: 1, from: 'fabric' })

    points.logo = points.pA.shiftFractionTowards(points.pC, 0.5)
    snippets.logo = new Snippet('logo', points.logo)
    points.title = points.logo.shiftFractionTowards(points.pDcpC, 0.5)
    macro('title', {
      nr: 4,
      at: points.title,
      title: 'ZipperGuard',
      align: 'center',
    })

    if (sa) {
      paths.sa = new Path()
        .move(points.pA)
        .line(points.pA.shift(90, sa))
        .join(paths.seam.offset(sa))
        .line(points.pD)
        .attr('class', 'fabric sa')
    }

    macro('hd', {
      id: 1,
      from: points.pB,
      to: points.pA,
      y: points.pA.y - sa - 15,
    })
    macro('vd', {
      id: 2,
      from: points.pA,
      to: points.pD,
      x: points.pA.x + 15,
    })

    return part
  },
}
