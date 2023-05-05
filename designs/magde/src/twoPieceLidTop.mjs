import { pluginBundle } from '@freesewing/plugin-bundle'

function draftTwoPieceLidTop({
  options,
  Point,
  Path,
  Snippet,
  points,
  paths,
  complete,
  sa,
  snippets,
  paperless,
  macro,
  part,
}) {
  // Width is halved as this is cut on a fold
  const width = (options.size * 500) / 2
  const height = options.size * 300
  const velcroWidth = options.size * 30
  const taperWidth = width * options.taperRatio
  const lidFlapHeight = height * options.flapHeightRatio
  const lidFlapWidth = taperWidth * 0.8
  const openingWidth = taperWidth * options.openingRatio
  points.origin = new Point(0, 0)
  points.lidTopRight = new Point(lidFlapWidth, 0)
  points.lidBottomRight = new Point(width, lidFlapHeight)
  points.lidBottomLeft = new Point(0, lidFlapHeight)
  points.lidSeamRight = points.lidTopRight.shiftFractionTowards(points.lidBottomRight, 0.2)
  points.lidSeamLeft = new Point(0, points.lidSeamRight.y)

  paths.seam = new Path()
    .move(points.lidBottomLeft)
    .line(points.lidBottomRight)
    .line(points.lidSeamRight)
    .line(points.lidSeamLeft)
    .close()
    .attr('class', 'fabric')

  // Complete?
  if (complete) {
    macro('cutonfold', {
      from: points.lidSeamLeft,
      to: points.lidBottomLeft,
    })

    points.label = new Point(lidFlapWidth / 2, lidFlapHeight / 2)

    macro('title', {
      at: points.label,
      title: 'Lid Top - Two Piece',
      nr: '3.1',
    })
    points.notchPoint = new Point(openingWidth + velcroWidth / 2, points.lidSeamLeft.y).addText(
      'Webbing Notch',
      'center'
    )
    snippets.webbingNotch = new Snippet('bnotch', points.notchPoint)

    if (sa) {
      paths.topSa = new Path()
        .move(points.lidSeamRight)
        .join(
          new Path()
            .move(points.lidSeamRight)
            .line(points.lidSeamLeft)
            .offset(2 * sa)
        )
        .setClass('fabric sa')
      paths.bottomSa = new Path()
        .move(points.lidBottomLeft)
        .line(points.lidBottomRight)
        .offset(2 * sa)
        .line(points.lidBottomRight)
        .setClass('fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.origin,
      to: points.lidSeamRight,
      y: points.lidSeamLeft.y - 2 * sa - 15,
    })
    macro('hd', {
      from: points.lidSeamRight,
      to: points.lidBottomRight,
      y: points.lidSeamLeft.y - 2 * sa - 15,
    })
    macro('hd', {
      from: points.lidBottomRight,
      to: points.lidBottomLeft,
      y: points.lidBottomLeft.y + 2 * sa + 15,
    })
    macro('vd', {
      from: points.lidSeamRight,
      to: points.lidBottomRight,
      x: points.lidBottomRight.x + 2 * sa,
    })
  }

  if (options.onePieceLid) part.hide()
  return part
}

export const twoPieceLidTop = {
  name: 'twoPieceLidTop',
  options: {
    size: { pct: 100, min: 15, max: 200, menu: 'style' },
    taperRatio: { pct: 60, min: 50, max: 100, menu: 'style' },
    flapHeightRatio: { pct: 83, min: 60, max: 100, menu: 'style' },
    openingRatio: { pct: 66, min: 30, max: 90, menu: 'style' },
    onePieceLid: { bool: false, menu: 'style' },
  },
  plugins: [pluginBundle],
  draft: draftTwoPieceLidTop,
}
