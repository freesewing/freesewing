import { pluginBundle } from '@freesewing/plugin-bundle'

function draftFrontOrganiserBase({
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
  // Width is *not halved* as this is not cut on fold unlike most other pattern
  // pieces
  const width = options.size * 500
  const height = options.size * 300
  const taperWidth = width * options.taperRatio
  const openingWidth = taperWidth * options.openingRatio
  const openingHeight = height * options.openingRatio

  points.origin = new Point(0, 0)
  points.bottomRight = new Point(openingWidth, openingHeight * 0.9)
  points.bottomLeft = new Point(0, openingHeight * 0.9)
  points.topRight = new Point(openingWidth, 0)

  paths.seam = new Path()
    .move(points.origin)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.origin)
    .close()
    .setClass('fabric')

  // Complete?
  if (complete) {
    points.label = new Point(openingWidth / 4, openingHeight / 2)
    macro('title', {
      at: points.label,
      title: 'Organiser Base',
      nr: '7',
    })

    if (sa) {
      paths.sa = paths.seam.offset(2 * sa).setClass('fabric sa')
      paths.leftHem = new Path()
        .move(points.bottomLeft)
        .line(points.origin)
        .addText('Rolled Hem', 'center')
      paths.RighHem = new Path()
        .move(points.topRight)
        .line(points.bottomRight)
        .addText('Rolled Hem', 'center')
      paths.topHem = new Path()
        .move(points.origin)
        .line(points.topRight)
        .addText('Rolled Hem', 'center')
      paths.bottomSeam = new Path()
        .move(points.bottomRight)
        .line(points.bottomLeft)
        .addText('Baste into Front Panel SA', 'center')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.origin,
      to: points.bottomRight,
      y: points.origin.y - 2 * sa - 15,
    })
    macro('vd', {
      from: points.origin,
      to: points.bottomRight,
      x: points.bottomRight.x + 2 * sa + 15,
    })
  }

  return part
}

export const frontOrganiserBase = {
  name: 'frontOrganiserBase',
  options: {
    size: { pct: 100, min: 15, max: 200, menu: 'style' },
    taperRatio: { pct: 60, min: 50, max: 100, menu: 'style' },
    flapHeightRatio: { pct: 83, min: 60, max: 100, menu: 'style' },
    openingRatio: { pct: 66, min: 30, max: 90, menu: 'style' },
  },
  plugins: [pluginBundle],
  draft: draftFrontOrganiserBase,
}
