import { pluginBundle } from '@freesewing/plugin-bundle'

function draftInternalOrganiser({
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
  const taperWidth = width * options.taperRatio
  const lidFlapHeight = height * options.flapHeightRatio
  const lidFlapWidth = taperWidth * 0.8
  points.origin = new Point(0, 0)
  var fakeBottom = new Point(taperWidth, height)
  var fakeTop = new Point(width, 0)
  var projectedTopRight = fakeBottom.shiftFractionTowards(fakeTop, 0.7)
  var organiserHeight = fakeBottom.y - projectedTopRight.y

  points.organiserTopRight = new Point(projectedTopRight.x, 0)
  points.organiserBottomRight = new Point(taperWidth, organiserHeight)
  points.organiserBottomLeft = new Point(0, organiserHeight)

  paths.seam = new Path()
    .move(points.organiserBottomLeft)
    .line(points.organiserBottomRight)
    .line(points.organiserTopRight)
    .line(points.origin)
    .close()
    .attr('class', 'lining')

  // Complete?
  if (complete) {
    macro('cutonfold', {
      from: points.origin,
      to: points.organiserBottomLeft,
    })

    points.label = new Point(lidFlapWidth / 2, lidFlapHeight / 2)

    macro('title', {
      at: points.label,
      title: 'Internal Organiser',
      nr: '9',
    })

    if (sa) {
      var sideSa = new Path()
        .move(points.organiserBottomLeft)
        .line(points.organiserBottomRight)
        .line(points.organiserTopRight)
        .offset(sa)
      var topChannel = new Path()
        .move(points.organiserTopRight)
        .line(points.origin)
        .offset(3 * sa)
      paths.sa = sideSa.join(topChannel).setClass('lining sa')
      paths.channelLabel = new Path()
        .move(points.origin)
        .line(points.organiserTopRight)
        .addText('Elastic Channel')
        .setClass('no-stroke')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.origin,
      to: points.organiserTopRight,
      y: points.origin.y - 2 * sa - 15,
    })
    macro('hd', {
      from: points.organiserBottomLeft,
      to: points.organiserBottomRight,
      y: points.organiserBottomLeft.y + 2 * sa + 15,
    })
    macro('vd', {
      from: points.origin,
      to: points.organiserBottomRight,
      x: points.organiserTopRight.x + 2 * sa + 15,
    })
  }

  return part
}

export const internalOrganiser = {
  name: 'internalOrganiser',
  options: {
    size: { pct: 100, min: 15, max: 200, menu: 'style' },
    taperRatio: { pct: 60, min: 50, max: 100, menu: 'style' },
    flapHeightRatio: { pct: 83, min: 60, max: 100, menu: 'style' },
    openingRatio: { pct: 66, min: 30, max: 90, menu: 'style' },
  },
  plugins: [pluginBundle],
  draft: draftInternalOrganiser,
}
