import { pluginBundle } from '@freesewing/plugin-bundle'

function draftTwoPieceLidBottom({
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
  points.lidSeamRight = points.lidTopRight.shiftFractionTowards(points.lidBottomRight, 0.25)
  points.lidSeamLeft = new Point(0, points.lidSeamRight.y)

  paths.seam = new Path()
    .move(points.lidSeamLeft)
    .line(points.lidSeamRight)
    .line(points.lidTopRight)
    .line(points.origin)
    .close()
    .attr('class', 'fabric')

  // Complete?
  if (complete) {
    // macro('cutonfold', {
    //   from: points.lidTopLeft,
    //   to: points.lidSeamLeft,
    // })

    points.label = new Point(points.lidSeamRight.x / 3, points.lidSeamRight.y / 1.5)

    macro('title', {
      at: points.label,
      title: 'Lid Bottom - Two Piece',
      nr: '3.2',
      scale: 0.4,
    })
    if (sa) {
      var bindingLineSideRough = new Path()
        .move(points.lidSeamRight)
        .line(points.lidTopRight)
        .offset(-sa)
      var bindingLineTopRough = new Path().move(points.lidTopRight).line(points.origin).offset(-sa)
      // points.tmp1 = bindingLineSideRough.intersectsY(points.lidSeamRight.y)[0]
      paths.bindingLine = new Path()
        .move(bindingLineSideRough.intersectsY(points.lidSeamLeft.y)[0])
        .line(bindingLineSideRough.intersects(bindingLineTopRough)[0])
        .line(bindingLineTopRough.end())
        .addClass('fabric sa')
      paths.sa = new Path()
        .move(points.lidSeamLeft)
        .line(points.lidSeamRight)
        .offset(2 * sa)
        .line(points.lidSeamRight)
        .setClass('fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.origin,
      to: points.lidSeamRight,
      y: points.origin.y - 2 * sa - 15,
    })
    macro('hd', {
      from: points.lidTopRight,
      to: points.lidSeamRight,
      y: points.origin.y - 2 * sa - 15,
    })
    macro('hd', {
      from: points.lidSeamRight,
      to: points.lidSeamLeft,
      y: points.lidSeamLeft.y + 2 * sa + 15,
    })
    macro('vd', {
      from: points.origin,
      to: points.lidSeamLeft,
      x: points.lidSeamRight.x + 2 * sa,
    })
  }
  if (options.onePieceLid) part.hide()
  return part
}

export const twoPieceLidBottom = {
  name: 'twoPieceLidBottom',
  options: {
    size: { pct: 100, min: 15, max: 200, menu: 'style' },
    taperRatio: { pct: 60, min: 50, max: 100, menu: 'style' },
    flapHeightRatio: { pct: 83, min: 60, max: 100, menu: 'style' },
    openingRatio: { pct: 66, min: 30, max: 90, menu: 'style' },
    onePieceLid: { bool: false, menu: 'style' },
  },
  plugins: [pluginBundle],
  draft: draftTwoPieceLidBottom,
}
