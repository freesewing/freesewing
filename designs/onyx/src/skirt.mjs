import { front } from './front.mjs'
import { back } from './back.mjs'

function draftSkirt({
  Path,
  Point,
  paths,
  points,
  measurements,
  options,
  part,
  store,
  paperless,
  complete,
  sa,
  macro,
  snippets,
  Snippet,
}) {
  if (!options.swimSkirt) return part.hide()

  // We really don't want the skirt to be smaller than the suit itself, so do a little sanity check here.
  const skirtWidth = measurements.waist * Math.max(options.waistEase, options.skirtWidth)
  const skirtLength = measurements.waistToUpperLeg * options.skirtLength

  points.topLeftCorner = new Point(0, 0)
  points.bottomLeftCorner = new Point(0, skirtLength)
  points.bottomRightCorner = new Point(skirtWidth / 2, skirtLength)
  points.topRightCorner = new Point(skirtWidth / 2, 0)

  paths.hemBase = new Path()
    .move(points.bottomLeftCorner)
    .line(points.bottomRightCorner)
    .attr('class', 'fabric')
    .hide(true)

  paths.saBase = new Path()
    .move(points.bottomRightCorner)
    .line(points.topRightCorner)
    .attr('class', 'fabric')
    .hide(true)

  paths.waistBase = new Path()
    .move(points.topRightCorner)
    .line(points.topLeftCorner)
    .attr('class', 'fabric')
    .hide(true)

  paths.foldBase = new Path().move(points.topLeftCorner).line(points.bottomLeftCorner).hide(true)

  paths.seam = paths.hemBase
    .join(paths.saBase)
    .join(paths.waistBase)
    .join(paths.foldBase)
    .close()
    .attr('class', 'fabric')

  if (paperless) {
    macro('vd', {
      id: 'hSkirt',
      from: points.topLeftCorner,
      to: points.bottomLeftCorner,
      x: -(15 + sa),
    })
    macro('hd', {
      id: 'wSkirt',
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

  store.cutlist.addCut({ cut: 1 })

  if (complete) {
    points.title = new Point(skirtWidth / 4, skirtLength / 2)
    macro('title', { at: points.title, nr: 9, title: 'swim skirt' })

    if (sa) {
      paths.sa = new Path()
        .move(points.bottomLeftCorner)
        .line(points.bottomLeftCorner.translate(0, sa * options.skirtHem * 100))
        .line(points.bottomRightCorner.translate(sa, sa * options.skirtHem * 100))
        .line(points.topRightCorner.translate(sa, -sa * options.skirtWaistband * 100))
        .line(points.topLeftCorner.translate(0, -sa * options.skirtWaistband * 100))
        .line(points.topLeftCorner)
        .attr('class', 'fabric sa')
    }
  }

  return part
}

export const skirt = {
  name: 'onyx.skirt',
  plugins: [],
  draft: draftSkirt,
  after: [front, back],
  options: {
    // How wide the skirt will be, as a percentage of waist measurement. It will be this width at the bottom, and gathered at the top down to 100%.
    skirtWidth: {
      pct: 160,
      min: 100,
      max: 250,
      menu: (settings, mergedOptions) => (mergedOptions.swimSkirt ? 'style' : false),
    },
    // How long the skirt will be, as a percentage of waistToUpperLeg.
    skirtLength: {
      pct: 100,
      min: 20,
      max: 500,
      menu: (settings, mergedOptions) => (mergedOptions.swimSkirt ? 'style' : false),
    },
    // How wide to make the waistband connection, in multiples of the seam allowance.
    skirtWaistband: {
      pct: 2,
      min: 0,
      max: 8,
      menu: (settings, mergedOptions) => (mergedOptions.swimSkirt ? 'construction' : false),
    },
    // How wide to make the bottom hem, in multiples of the seam allowance.
    skirtHem: {
      pct: 2,
      min: 0,
      max: 8,
      menu: (settings, mergedOptions) => (mergedOptions.swimSkirt ? 'construction' : false),
    },
  },
}
