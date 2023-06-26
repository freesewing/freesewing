import { pluginBundle } from '@freesewing/plugin-bundle'

function draftStrapAttachments({
  options,
  Point,
  Path,
  Snippet,
  points,
  paths,
  snippets,
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
  const idealWebbingSize = height / 7.5
  var webbingSize = idealWebbingSize
  if (options.useCommonWebbingSizes) {
    var lowerBound = 6
    var upperBound = idealWebbingSize
    const commonWebbingSizes = [6, 10, 12, 15, 20, 25, 30, 40, 45, 50]
    // get the bigest size smaller than the ideal
    var smallerSizes = commonWebbingSizes.filter(function (webbing) {
      return webbing < idealWebbingSize
    })
    lowerBound = smallerSizes.length >= 1 ? smallerSizes.at(-1) : lowerBound
    // get the smallest size bigger than the ideal
    var largerSizes = commonWebbingSizes.filter(function (webbing) {
      return webbing >= idealWebbingSize
    })
    upperBound = largerSizes.length >= 1 ? largerSizes[0] : upperBound

    // Pick the value closest to ideal defaulting to smaller
    if (upperBound - idealWebbingSize > idealWebbingSize - lowerBound) {
      webbingSize = lowerBound
    } else {
      webbingSize = upperBound
    }
  }

  points.origin = new Point(0, 0)
  points.webbingOpeningBottom = new Point(1.25 * webbingSize, 0)
  points.bagAttachmentTop = new Point(0, 1.25 * webbingSize)
  points.fakeBagCorner = new Point(height, points.bagAttachmentTop.y + (width - taperWidth))
  points.frontFlapBottom = new Point(taperWidth, 0)
  points.bagAttachmentBottom = points.bagAttachmentTop.shiftFractionTowards(
    points.fakeBagCorner,
    0.33
  )

  paths.seam = new Path()
    .move(points.bagAttachmentTop)
    .line(points.bagAttachmentBottom)
    .line(points.webbingOpeningBottom)
    .line(points.origin)
    .close()
    .attr('class', 'fabric')

  // Complete?
  if (complete) {
    macro('cutonfold', {
      from: points.origin,
      to: points.bagAttachmentTop,
    })

    points.label = points.origin.shiftFractionTowards(points.bagAttachmentBottom, 0.55)
    macro('title', {
      at: new Point(webbingSize, webbingSize),
      cutlist: true,
      title: 'Strap Attachment',
      nr: '5',
      scale: 0.3,
    })

    points.webbingCenterNotch = points.origin.shiftFractionTowards(points.webbingOpeningBottom, 0.5)
    points.webbingCenterLabel = points.webbingCenterNotch
      .clone()
      .translate(0, -5)
      .addText(`Center of webbing (${webbingSize}mm)`, 'center text-xs')

    snippets.webbingCenter = new Snippet('notch', points.webbingCenterNotch)

    if (sa) {
      var bagAttachSeam = new Path().move(points.bagAttachmentTop).line(points.bagAttachmentBottom)
      var attachSeamAllowance = bagAttachSeam.offset(sa)
      var bagAttachmentSa = new Path()
        .move(attachSeamAllowance.intersectsX(0)[0])
        .line(attachSeamAllowance.end())
      var restOfSa = new Path()
        .move(points.bagAttachmentBottom)
        .line(points.webbingOpeningBottom)
        .line(points.origin)
        .offset(sa)
      paths.sa = bagAttachmentSa.join(restOfSa).close().setClass('fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.origin,
      to: points.webbingOpeningBottom,
      y: points.origin.y - 2 * sa - 15,
    })
    macro('hd', {
      from: points.origin,
      to: points.bagAttachmentBottom,
      y: points.bagAttachmentBottom.y + 2 * sa + 15,
    })
    macro('vd', {
      from: points.origin,
      to: points.bagAttachmentBottom,
      x: points.bagAttachmentBottom.x + 2 * sa,
    })
  }

  return part
}

export const strapAttachments = {
  name: 'strapAttachments',
  options: {
    size: { pct: 100, min: 15, max: 200, menu: 'style' },
    taperRatio: { pct: 60, min: 50, max: 100, menu: 'style' },
    useCommonWebbingSizes: { bool: true, menu: 'style' },
  },
  plugins: [pluginBundle],
  draft: draftStrapAttachments,
}
