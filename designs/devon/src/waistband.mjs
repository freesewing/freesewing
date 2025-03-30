import { frontSidePanel } from './frontsidepanel.mjs'

export const waistband = {
  name: 'devon.waistband',
  from: frontSidePanel,
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

    const hemLength = store.get('hemLength')
    const waistbandWidth = store.get('waistbandWidth')

    console.log({ hemLength: hemLength, waistbandWidth: waistbandWidth })

    points.topLeft = new Point(0, 0)
    points.topRight = new Point(hemLength * 0.5, 0)
    points.bottomLeft = new Point(0, waistbandWidth)
    points.bottomRight = new Point(hemLength * 0.5, waistbandWidth)

    paths.seam = new Path()
      .move(points.topLeft)
      .line(points.bottomLeft)
      .line(points.bottomRight)
      .line(points.topRight)
      .line(points.topLeft)
      .close()
      .attr('class', 'fabric')

    points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    macro('title', { nr: 13, title: 'waistband', at: points.title })

    return part
  },
}
