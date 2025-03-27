import { pocket } from './pocket.mjs'

export const pocketflap = {
  name: 'devon.pocketflap',
  from: pocket,
  hide: {
    self: true,
    from: true,
    inherited: true,
  },
  options: {
    // Constants
    pocketflapHeightRatio: 6.5 / 12,
    pocketflapSideHeightRatio: 3.5 / 12,
    // Parameters
  },
  draft: ({ points, Path, paths, macro, options, store, part }) => {
    const pocketWidth = store.get('pocketWidth')

    // points.topLeft = new Point(0, 0)
    // points.topRight = new Point(pocketWidth,0)
    points.bottomLeft = points.topLeft.shift(270, pocketWidth * options.pocketflapSideHeightRatio)
    points.bottomRight = points.topRight.shift(270, pocketWidth * options.pocketflapSideHeightRatio)
    points.bottomMiddle = points.topLeft
      .shiftFractionTowards(points.topRight, 0.5)
      .shift(270, pocketWidth * options.pocketflapHeightRatio)

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
    macro('title', { nr: 9, title: 'pocketflap', at: points.title })

    return part
  },
}
