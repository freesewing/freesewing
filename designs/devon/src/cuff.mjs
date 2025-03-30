import { sleeve } from './sleeve.mjs'

export const cuff = {
  name: 'devon.cuff',
  after: sleeve,
  hide: {
    self: true,
    from: true,
    inherited: true,
  },
  options: {
    // Constants
    // Parameters
  },
  draft: ({ Point, points, Path, paths, macro, options, store, part }) => {
    for (const i in paths) {
      delete paths[i]
    }
    for (const i in points) {
      delete points[i]
    }

    const cuffLength = store.get('cuffLength')
    const cuffWidth = store.get('cuffWidth')

    console.log({ cuffLength: cuffLength, cuffWidth: cuffWidth })

    points.topLeft = new Point(0, 0)
    points.topRight = new Point(cuffLength * 0.5, 0)
    points.bottomLeft = new Point(0, cuffWidth)
    points.bottomRight = new Point(cuffLength * 0.5, cuffWidth)

    paths.seam = new Path()
      .move(points.topLeft)
      .line(points.bottomLeft)
      .line(points.bottomRight)
      .line(points.topRight)
      .line(points.topLeft)
      .close()
      .attr('class', 'fabric')

    points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    macro('title', { nr: 14, title: 'cuff', at: points.title })

    return part
  },
}
