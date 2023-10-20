import { base } from './base.mjs'

function draftLegRibbing({
  Path,
  Point,
  paths,
  points,
  options,
  absoluteOptions,
  part,
  store,
  paperless,
  complete,
  sa,
  macro,
  snippets,
  Snippet,
}) {
  if (!options.legRibbing) return part.hide()

  const ribbingLength = store.get('legWidth') * options.legRibbingLength
  const legRibbingWidth = 2 * absoluteOptions.legRibbingWidth

  points.topLeftCorner = new Point(0, 0)
  points.bottomLeftCorner = new Point(0, legRibbingWidth)
  points.bottomRightCorner = new Point(ribbingLength, legRibbingWidth)
  points.topRightCorner = new Point(ribbingLength, 0)

  points.leftCenter = new Point(0, legRibbingWidth / 2)
  points.rightCenter = new Point(ribbingLength, legRibbingWidth / 2)

  paths.saBase = new Path()
    .move(points.bottomLeftCorner)
    .line(points.bottomRightCorner)
    .line(points.topRightCorner)
    .line(points.topLeftCorner)
    .attr('class', 'fabric')
    .hide(true)

  paths.foldBase = new Path().move(points.topLeftCorner).line(points.bottomLeftCorner).hide(true)

  paths.foldLine = new Path()
    .move(points.leftCenter)
    .line(points.rightCenter)
    .attr('class', 'various dashed')
    .attr('data-text', 'Fold Line')
    .attr('data-text-class', 'center')

  paths.seam = paths.saBase.join(paths.foldBase).close().attr('class', 'fabric')

  if (paperless) {
    macro('vd', {
      id: 'vdLegRibbing',
      from: points.topLeftCorner,
      to: points.bottomLeftCorner,
      x: -(sa + 15),
    })
    macro('hd', {
      id: 'hdLegRibbing',
      from: points.topLeftCorner,
      to: points.topRightCorner,
      y: -(sa + 15),
    })
  }

  points.cutonfoldFrom = points.topLeftCorner
  points.cutonfoldTo = points.bottomLeftCorner
  macro('cutonfold', {
    from: points.cutonfoldFrom,
    to: points.cutonfoldTo,
    grainline: true,
  })

  store.cutlist.addCut({ cut: 2, from: 'ribbing' })

  if (complete) {
    points.title = new Point(ribbingLength / 4, legRibbingWidth / 2)
    macro('title', { at: points.title, nr: 11, title: 'legRibbing' })

    if (sa) {
      paths.sa = new Path()
        .move(points.bottomLeftCorner)
        .line(points.bottomLeftCorner.translate(0, sa))
        .line(points.bottomRightCorner.translate(sa, sa))
        .line(points.topRightCorner.translate(sa, -sa))
        .line(points.topLeftCorner.translate(0, -sa))
        .line(points.topLeftCorner)
        .attr('class', 'fabric sa')
    }
  }
  return part
}

export const legRibbing = {
  name: 'onyx.legRibbing',
  plugins: [],
  draft: draftLegRibbing,
  after: [base],
  options: {
    // How wide the leg ribbing should be, in absolute measure.
    legRibbingWidth: {
      pct: 20,
      min: 0,
      max: 100,
      snap: { metric: 5, imperial: 6.35 },
      toAbs: (pct, settings, mergedOptions) => mergedOptions.legRibbingWidth * 200, // Valid range is from 0 to 200mm.
      menu: (settings, mergedOptions) => (mergedOptions.legRibbing ? 'construction' : false),
    },
    // How long the leg ribbing should be, as a percentage of the length around the leg.
    legRibbingLength: {
      pct: 75,
      min: 50,
      max: 100,
      menu: (settings, mergedOptions) => (mergedOptions.legRibbing ? 'construction' : false),
    },
  },
}
