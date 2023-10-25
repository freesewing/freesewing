import { frontpoints } from './frontpoints.mjs'

export const pocket = {
  name: 'cornelius.pocket',
  from: frontpoints,
  draft: ({ Path, points, paths, Snippet, snippets, sa, store, macro, part }) => {
    const halfInch = store.get('halfInch')

    paths.waistSeam = paths.waistSeam.split(points.pocketFacingTL)[0].hide()

    paths.sideSeam = paths.sideSeam.split(points.pocketFacingBR)[1].hide()

    points.brCPtl = points.pocketFacingBR.shift(
      points.pocketFacingBR.angle(points.pocketSide) + 90,
      halfInch * 3
    )
    points.tlCPbr = points.pocketFacingTL.shift(
      points.pocketFacingTL.angle(points.pocketWaist) - 90,
      halfInch * 6
    )

    paths.facingInside = new Path()
      .move(points.pocketFacingTL)
      .curve(points.tlCPbr, points.brCPtl, points.pocketFacingBR)
      .hide()

    paths.pocketFold = new Path()
      .move(points.pocketTL)
      .line(points.pocketBL)
      .attr('class', 'fabric dashed')

    points.pocketBLcpBR = points.pocketBL.shift(
      0,
      points.pocketBL.dist(points.pocketFacingBR) * 0.75
    )
    points.pocketBRcpBL = points.pocketFacingBR.shift(
      180,
      points.pocketBL.dist(points.pocketFacingBR) * 0.35
    )

    // Mirror a bunch of points
    points.mpocketBLcpBR = points.pocketBLcpBR.flipX(points.pocketTL)
    points.mpocketBRcpBL = points.pocketBRcpBL.flipX(points.pocketTL)
    points.mpocketFacingBR = points.pocketFacingBR.flipX(points.pocketTL)
    points.mpocketSide = points.pocketSide.flipX(points.pocketTL)
    points.mpocketWaist = points.pocketWaist.flipX(points.pocketTL)

    paths.pocketBottom = new Path()
      .move(points.mpocketFacingBR)
      .curve(points.mpocketBRcpBL, points.mpocketBLcpBR, points.pocketBL)
      .curve(points.pocketBLcpBR, points.pocketBRcpBL, points.pocketFacingBR)
      .attr('class', 'fabric')

    paths.seam = paths.waistSeam
      .line(points.mpocketWaist)
      .line(points.mpocketSide)
      .join(paths.pocketBottom)
      .join(paths.sideSeam)
      .close()
      .attr('class', 'fabric')

    snippets.n1 = new Snippet('notch', points.pocketWaist)
    snippets.n2 = new Snippet('notch', points.pocketSide)
    snippets.n3 = new Snippet('notch', points.mpocketWaist)
    snippets.n4 = new Snippet('notch', points.mpocketSide)

    points.gridAnchor = points.pocketTL.clone()

    store.cutlist.addCut({ cut: 2, from: 'lining' })

    points.logo = points.pocketSide.shiftFractionTowards(points.pocketTL, 0.5)
    snippets.logo = new Snippet('logo', points.logo)
    points.title = points.logo.shift(270, 50)
    macro('title', {
      nr: 2,
      at: points.title,
      title: 'Pocket',
      align: 'center',
    })

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }

    macro('hd', {
      id: 1,
      from: points.mpocketFacingBR,
      to: points.mpocketWaist,
      y: points.pU.y - sa - 15,
    })
    macro('hd', {
      id: 2,
      from: points.mpocketWaist,
      to: points.pocketTL,
      y: points.pU.y - sa - 15,
    })
    macro('hd', {
      id: 3,
      from: points.pocketTL,
      to: points.pocketWaist,
      y: points.pU.y - sa - 15,
    })
    macro('hd', {
      id: 4,
      from: points.pocketWaist,
      to: points.pU,
      y: points.pU.y - sa - 15,
    })
    macro('hd', {
      id: 5,
      from: points.pU,
      to: points.pocketFacingBR,
      y: points.pU.y - sa - 15,
    })
    macro('hd', {
      id: 6,
      from: points.pocketFacingTL,
      to: points.pocketWaist,
      y: points.pU.y - sa - 15,
    })
    macro('vd', {
      id: 7,
      from: points.pU,
      to: points.pocketSide,
      x: points.pocketSide.x + sa + 15,
    })
    macro('vd', {
      id: 8,
      from: points.pocketTL,
      to: points.pocketBL,
      x: points.pocketTL.x + 15,
    })
    macro('vd', {
      id: 9,
      from: points.pocketSide,
      to: points.mpocketWaist,
      x: points.pocketSide.x + sa + 15,
    })
    macro('vd', {
      id: 10,
      from: points.pocketSide,
      to: points.pocketFacingBR,
      x: points.pocketSide.x + sa + 15,
    })
    macro('vd', {
      id: 11,
      from: points.mpocketWaist,
      to: points.mpocketSide,
      x: points.mpocketSide.x - sa - 15,
    })
    macro('vd', {
      id: 12,
      from: points.mpocketSide,
      to: points.mpocketFacingBR,
      x: points.mpocketSide.x - sa - 15,
    })

    return part
  },
}
