import { pluginBundle } from '@freesewing/plugin-bundle'

function draftSidePanel({
  options,
  Point,
  Path,
  points,
  paths,
  complete,
  sa,
  paperless,
  macro,
  part,
}) {
  // Width is halved as this is cut on a fold
  const height = options.size * 300
  const depth = options.size * 150
  points.origin = new Point(depth / 2, 0)
  points.bottomRight = new Point(depth, height)
  points.bottomLeft = new Point(0, height)

  paths.seam = new Path()
    .move(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.origin)
    .close()
    .attr('class', 'fabric')

  // Complete?
  if (complete) {
    points.label = new Point(depth * 0.3, height * 0.8)

    macro('title', {
      at: points.label,
      title: 'Side Panel',
      nr: '4',
    })

    if (sa) {
      var bottomSeam = new Path()
        .move(points.bottomLeft)
        .line(points.bottomRight)
        .offset(2 * sa)
        .addText('Flat fell seam', 'left')
      var sideSeam = new Path()
        .move(points.bottomRight)
        .line(points.origin)
        .line(points.bottomLeft)
        .offset(sa)

      paths.sa = bottomSeam.join(sideSeam).close().setClass('fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + 2 * sa + 15,
    })
    macro('hd', {
      from: points.bottomLeft,
      to: points.origin,
      y: points.origin.y - 2 * sa - 15,
    })
    macro('vd', {
      from: points.origin,
      to: points.bottomRight,
      x: points.bottomRight.x + 2 * sa,
    })
  }

  return part
}

export const sidePanel = {
  name: 'sidePanel',
  options: {
    size: { pct: 100, min: 15, max: 200, menu: 'style' },
    taperRatio: { pct: 60, min: 50, max: 100, menu: 'style' },
    flapHeightRatio: { pct: 83, min: 60, max: 100, menu: 'style' },
    openingRatio: { pct: 66, min: 30, max: 90, menu: 'style' },
  },
  plugins: [pluginBundle],
  draft: draftSidePanel,
}
