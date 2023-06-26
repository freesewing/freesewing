import { pluginBundle } from '@freesewing/plugin-bundle'

function draftBackPanel({
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
  const width = (options.size * 500) / 2
  const height = options.size * 300
  const depth = options.size * 150
  const taperWidth = width * options.taperRatio
  points.origin = new Point(0, 0)
  points.topRightCorner = new Point(width, 0)
  points.bottomRightCorner = new Point(taperWidth + depth, height)
  points.baseFlapBackRight = new Point(taperWidth, height)
  points.baseFlapFrontRight = new Point(taperWidth, height + depth)
  points.bottomLeftCorner = new Point(0, height + depth)

  paths.seam = new Path()
    .move(points.bottomLeftCorner)
    .line(points.baseFlapFrontRight)
    .line(points.baseFlapBackRight)
    .line(points.topRightCorner)
    .line(points.origin)
    .close()
    .attr('class', 'fabric')

  // Complete?
  if (complete) {
    macro('cutonfold', {
      from: points.origin,
      to: points.bottomLeftCorner,
    })

    macro('title', {
      at: new Point(taperWidth / 2, height / 2),
      title: 'Back Panel',
      nr: '1',
    })

    paths.foldLine = new Path()
      .move(new Point(0, points.baseFlapBackRight.y))
      .line(points.baseFlapBackRight)
      .setClass('dotted note')
      .addText('Base Fold', 'center note')

    if (sa) {
      var bottomSeam = new Path()
        .move(points.bottomLeftCorner)
        .line(points.baseFlapFrontRight)
        .addText('Flat fell', 'center text-sm')
        .offset(2 * sa)
      var baseFlapSeam = new Path()
        .move(points.baseFlapFrontRight)
        .line(points.baseFlapBackRight)
        .offset(2 * sa)
        .trim()
      var sideSeam = new Path()
        .move(points.baseFlapBackRight)
        .line(points.topRightCorner)
        .offset(sa)
      var topSeam = new Path()
        .move(points.topRightCorner)
        .line(points.origin)
        .offset(2 * sa)
      paths.sa = bottomSeam
        .join(baseFlapSeam)
        .line(points.baseFlapBackRight)
        .join(sideSeam)
        .join(topSeam)
        .trim()
        .setClass('fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.origin,
      to: points.topRightCorner,
      y: -(2 * sa + 15),
    })
    macro('hd', {
      from: points.topRightCorner,
      to: points.bottomRightCorner,
      y: -(2 * sa + 15),
    })
    macro('hd', {
      from: points.bottomRightCorner,
      to: points.baseFlapBackRight,
      y: points.baseFlapFrontRight.y + 2 * sa + 15,
    })
    macro('hd', {
      from: points.baseFlapBackRight,
      to: points.origin,
      y: points.baseFlapFrontRight.y + 2 * sa + 15,
    })
    macro('vd', {
      from: points.origin,
      to: points.bottomRightCorner,
      x: points.bottomRightCorner.x + 2 * sa + 15,
    })
    macro('vd', {
      from: points.bottomRightCorner,
      to: points.baseFlapFrontRight,
      x: points.bottomRightCorner.x + 2 * sa + 15,
    })
  }

  return part
}

export const backPanel = {
  name: 'backPanel',
  options: {
    size: { pct: 100, min: 15, max: 200, menu: 'style' },
    taperRatio: { pct: 60, min: 50, max: 100, menu: 'style' },
  },
  plugins: [pluginBundle],
  draft: draftBackPanel,
}
