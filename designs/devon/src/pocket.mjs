import { front } from './front.mjs'

export const pocket = {
  name: 'devon.pocket',
  from: front,
  hide: {
    self: true,
    from: true,
    inherited: true,
  },
  options: {
    // Constants
    pocketHeightRatio: 13.5 / 12,
    pocketSideHeightRatio: 11.5 / 12,
    pocketLowerWidthRatio: 10.5 / 12,
    // Parameters
  },
  draft: ({ Point, points, Path, paths, macro, options, store, part }) => {
    for (const i in paths) {
      delete paths[i]
    }
    for (const i in points) {
      delete points[i]
    }

    const pocketWidth = store.get('pocketWidth')

    points.topLeft = new Point(0, 0)
    points.topRight = new Point(pocketWidth, 0)
    points.bottomLeft = points.topLeft
      .shiftFractionTowards(
        points.topRight,
        (pocketWidth * (1 - options.pocketLowerWidthRatio)) / 100
      )
      .shift(270, pocketWidth * options.pocketSideHeightRatio)
    points.bottomRight = points.topLeft
      .shiftFractionTowards(points.topRight, (pocketWidth * options.pocketLowerWidthRatio) / 100)
      .shift(270, pocketWidth * options.pocketSideHeightRatio)
    points.bottomMiddle = points.topLeft
      .shiftFractionTowards(points.topRight, 0.5)
      .shift(270, pocketWidth * options.pocketHeightRatio)

    paths.seam = new Path()
      .move(points.topLeft)
      .line(points.bottomLeft)
      .line(points.bottomMiddle)
      .line(points.bottomRight)
      .line(points.topRight)
      .line(points.topLeft)
      .close()
      .attr('class', 'fabric')

    points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    macro('title', { nr: 10, title: 'pocket', at: points.title })

    return part
  },
}
