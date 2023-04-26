import { pluginBundle } from '@freesewing/plugin-bundle'

function draftLidLiner({
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
  points.lidTopRight = new Point(lidFlapWidth, 0)
  points.lidBottomRight = new Point(width, lidFlapHeight)
  points.lidBottomLeft = new Point(0, lidFlapHeight)

  paths.seam = new Path()
    .move(points.lidBottomLeft)
    .line(points.lidBottomRight)
    .line(points.lidTopRight)
    .line(points.origin)
    .close()
    .attr('class', 'lining')

  // Complete?
  if (complete) {
    macro('cutonfold', {
      from: points.origin,
      to: points.lidBottomLeft,
    })

    points.label = new Point(lidFlapWidth / 2, lidFlapHeight / 2)

    macro('title', {
      at: points.label,
      title: 'Lid Liner',
      nr: '6',
    })

    points.velcroPoint = new Path()
      .move(new Point(0, 0.1 * height))
      .line(new Point(points.lidBottomRight.x, 0.1 * height))
      .intersects(new Path().move(points.lidTopRight).line(points.lidBottomRight))[0]
    paths.velcro = new Path()
      .move(new Point(0, points.velcroPoint.y))
      .line(points.velcroPoint)
      .line(points.lidTopRight)
      .line(points.origin)
      .close()
      .setClass('various fill-various')
    paths.velcroLabel = new Path()
      .move(new Point(0, points.velcroPoint.y / 1.5))
      .line(new Point(points.velcroPoint.x, points.velcroPoint.y / 1.5))
      .addText('Velcro hook', 'text-note center')
      .addClass('no-stroke')
    if (sa) {
      paths.sa = new Path()
        .move(points.lidBottomLeft)
        .line(points.lidBottomRight)
        .offset(2 * sa)
        .addText('Flat fell seam', 'left')
        .line(points.lidBottomRight)
        .setClass('lining sa')
    }
    var topBindingLineRough = new Path().move(points.lidTopRight).line(points.origin).offset(-sa)
    var sideBindingLineRough = new Path()
      .move(points.lidBottomRight)
      .line(points.lidTopRight)
      .offset(-sa)
    paths.boundLine = new Path()
      .move(sideBindingLineRough.intersectsY(lidFlapHeight)[0])
      .line(topBindingLineRough.intersects(sideBindingLineRough)[0])
      .line(topBindingLineRough.end())
      .addText('Bind with tape once finished', 'center')
      .setClass('lining sa')
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.origin,
      to: points.lidTopRight,
      y: points.origin.y - 2 * sa - 15,
    })
    macro('hd', {
      from: points.lidTopRight,
      to: points.lidBottomRight,
      y: points.origin.y - 2 * sa - 15,
    })
    macro('hd', {
      from: points.lidBottomRight,
      to: points.lidBottomLeft,
      y: points.lidBottomLeft.y + 2 * sa + 15,
    })
    macro('vd', {
      from: points.origin,
      to: points.lidBottomRight,
      x: points.lidBottomRight.x + 2 * sa + 15,
    })
  }

  return part
}

export const lidLiner = {
  name: 'lidLiner',
  options: {
    size: { pct: 100, min: 15, max: 200, menu: 'style' },
    taperRatio: { pct: 60, min: 50, max: 100, menu: 'style' },
    flapHeightRatio: { pct: 83, min: 60, max: 100, menu: 'style' },
    openingRatio: { pct: 66, min: 30, max: 90, menu: 'style' },
  },
  plugins: [pluginBundle],
  draft: draftLidLiner,
}
