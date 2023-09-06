import { front } from './front.mjs'

export const pocket = {
  name: 'albert.pocket',
  after: front,
  draft: ({ Point, Path, points, paths, Snippet, snippets, sa, macro, store, part }) => {
    let pocketSize = store.get('pocketSize')
    let hemWidth = store.get('hemWidth')

    points.topLeft = new Point(0, 0)
    points.topRight = new Point(pocketSize, 0)
    points.topLeftHem = points.topLeft.shift(270, hemWidth)
    points.topRightHem = points.topRight.shift(270, hemWidth)
    points.bottomLeft = points.topLeftHem.shift(270, pocketSize)
    points.bottomRight = points.topRightHem.shift(270, pocketSize)

    points.topCOF = points.topLeft.shift(270, pocketSize / 5)
    points.bottomCOF = points.bottomLeft.shift(90, pocketSize / 5)

    paths.seam = new Path()
      .move(points.bottomLeft)
      .line(points.bottomRight)
      .line(points.topRight)
      .line(points.topLeft)
      .close()
      .attr('class', 'fabric')

    paths.all = paths.seam.clone().line(points.bottomLeft).close().attr('class', 'fabric')

    paths.topHem = new Path()
      .move(points.topLeftHem)
      .line(points.topRightHem.shift(0, sa))
      .attr('class', 'various dashed')
      .attr('data-text', 'hem')
      .attr('data-text-class', 'text-xs center')

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

    /*
     * Annotations
     */

    // Cut on fold
    macro('cutonfold', {
      from: points.topCOF,
      to: points.bottomCOF,
      reverse: true,
    })

    // Logo
    points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    snippets.logo = new Snippet('logo', points.logo)

    // Title
    points.title = points.logo.shift(-90, 45)
    macro('title', {
      nr: 3,
      at: points.title,
      title: 'Pocket',
    })

    // Dimensions
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + sa + 15,
      id: 'width',
    })
    macro('vd', {
      from: points.bottomLeft,
      to: points.topLeft,
      x: points.topLeft.x - 15,
      id: 'height',
    })

    return part
  },
}
