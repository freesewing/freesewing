import { base } from './base.mjs'

function draftZipperGuard({
  Path,
  Point,
  paths,
  points,
  options,
  absoluteOptions,
  part,
  store,
  sa,
  macro,
}) {
  if (options.zipperPosition === 'none') return part.hide()

  const zipperGuardTapeCoverMaterial = 0.75

  const verticalTrunk = store.get('verticalTrunk')
  const zipperLength = absoluteOptions.zipperLength
  const zipperGuardWidth = absoluteOptions.zipperGuardWidth
  const neckGuardLength =
    options.neckStyle == 'neckband'
      ? verticalTrunk * options.neckGuardLength
      : zipperGuardTapeCoverMaterial * zipperGuardWidth

  // How much extra material to put at the bottom of the zipper guard, to cover the parts below the zipper stop.
  const zipperGuardLength =
    zipperLength + neckGuardLength + zipperGuardWidth * zipperGuardTapeCoverMaterial

  points.topLeftCorner = new Point(0, 0)
  points.bottomLeftCorner = new Point(0, zipperGuardLength)
  points.bottomRightCorner = new Point(zipperGuardWidth, zipperGuardLength)
  points.topRightCorner = new Point(zipperGuardWidth, 0)
  //  points.neckGuardBaseRight = new Point(zipperGuardWidth, neckGuardLength)
  //  points.neckGuardCp = new Point(zipperGuardWidth, 0)

  paths.saBase = new Path()
    .move(points.bottomLeftCorner)
    .line(points.bottomRightCorner)
    //    .line(points.neckGuardBaseRight)
    .line(points.topRightCorner)
    //    .curve(points.neckGuardCp, points.neckGuardCp, points.topLeftCorner)
    .line(points.topLeftCorner)
    .addClass('fabric')
    .hide()

  paths.foldBase = new Path().move(points.topLeftCorner).line(points.bottomLeftCorner).hide()

  paths.seam = paths.saBase.join(paths.foldBase).close().addClass('fabric')

  macro('vd', {
    id: 'hZipperGuard',
    from: points.topLeftCorner,
    to: points.bottomLeftCorner,
    x: -(sa + 15),
  })
  macro('hd', {
    id: 'wZipperGuard',
    from: points.topLeftCorner,
    to: points.topRightCorner,
    y: -(sa + 15),
  })

  points.cutonfoldFrom = points.topLeftCorner
  points.cutonfoldTo = points.bottomLeftCorner
  macro('cutonfold', {
    from: points.cutonfoldFrom,
    to: points.cutonfoldTo,
    grainline: true,
  })

  store.cutlist.addCut({ cut: 1, from: 'fabric' })

  points.title = new Point(zipperGuardWidth / 2, zipperGuardLength / 2)
  macro('title', { at: points.title, nr: 6, title: 'zipper guard' })

  if (sa) {
    paths.sa = new Path()
      .move(points.bottomLeftCorner)
      .line(points.bottomLeftCorner.translate(0, sa))
      .line(points.bottomRightCorner.translate(sa, sa))
      .line(points.topRightCorner.translate(sa, -sa))
      .line(points.topLeftCorner.translate(0, -sa))
      .line(points.topLeftCorner)
      .addClass('fabric sa')
  }

  return part
}

export const zipperGuard = {
  name: 'onyx.zipperGuard',
  plugins: [],
  draft: draftZipperGuard,
  after: [base],
  options: {
    zipperGuardWidth: {
      pct: 50,
      min: 0,
      max: 100,
      snap: { metric: 5, imperial: 6.35 },
      toAbs: (pct, settings, mergedOptions) => mergedOptions.zipperGuardWidth * 100, // Valid range is from 0 to 100mm.
      menu: 'construction',
    },
    // How far to have the zipper guard extend past the neckline so it can be wrapped around the zipper slider and pull to keep it from digging into the wearer's neck. Important on any compression garments/swimwear.
    neckGuardLength: {
      pct: 2,
      min: 0,
      max: 5,
      toAbs: (pct, settings, mergedOptions) =>
        (settings.measurements.hpsToWaistFront +
          settings.measurements.hpsToWaistBack +
          settings.measurements.crossSeam) *
        mergedOptions.neckGuardLength,
      menu: (settings, mergedOptions) =>
        mergedOptions.neckStyle == 'neckband' ? 'construction' : false,
    },
  },
}
