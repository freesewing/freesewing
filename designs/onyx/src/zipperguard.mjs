import { base } from './base.mjs'

function draftZipperGuard({
  Path,
  Point,
  paths,
  points,
  options,
  absoluteOptions,
  expand,
  part,
  store,
  sa,
  macro,
}) {
  if (!expand || options.zipperPosition === 'none') return part.hide()

  const zipperGuardWidth = absoluteOptions.zipperGuardWidth
  const neckGuardLength =
    options.neckStyle == 'neckband'
      ? store.get('verticalTrunk') * options.neckGuardLength
      : options.zipperGuardTapeCoverMaterial * zipperGuardWidth

  // How much extra material to put at the bottom of the zipper guard, to cover the parts below the zipper stop.
  const zipperGuardLength =
    absoluteOptions.zipperLength +
    neckGuardLength +
    zipperGuardWidth * options.zipperGuardTapeCoverMaterial

  points.topLeftCorner = new Point(0, 0)
  points.bottomLeftCorner = new Point(0, zipperGuardLength)
  points.bottomRightCorner = new Point(zipperGuardWidth, zipperGuardLength)
  points.topRightCorner = new Point(zipperGuardWidth, 0)

  paths.saBase = new Path()
    .move(points.bottomLeftCorner)
    .line(points.bottomRightCorner)
    .line(points.topRightCorner)
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
  macro('title', { at: points.title, nr: 6, title: 'onyx:zipperGuard' })

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
}
