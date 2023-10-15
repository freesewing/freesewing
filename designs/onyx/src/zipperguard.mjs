import { neckband } from './neckband.mjs'
import { front } from './front.mjs'

function draftZipperGuard({
  Path,
  Point,
  paths,
  points,
  measurements,
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
  const verticalTrunk = store.get('verticalTrunk')
  const zipperLength = verticalTrunk * options.zipperLength
  const zipperGuardWidth = absoluteOptions.zipperGuardWidth
  const neckGuardLength = verticalTrunk * options.neckGuardLength

  // How much extra material to put at the bottom of the zipper guard, to cover the parts below the zipper stop.
  const zipperGuardBottomMaterial = 0.75
  const zipperGuardLength =
    zipperLength + neckGuardLength + zipperGuardWidth * zipperGuardBottomMaterial

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
    .attr('class', 'fabric')
    .hide(true)

  paths.foldBase = new Path().move(points.topLeftCorner).line(points.bottomLeftCorner).hide(true)

  paths.seam = paths.saBase.join(paths.foldBase).close().attr('class', 'fabric')

  if (paperless) {
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
    points.title = new Point(zipperGuardWidth / 2, zipperGuardLength / 2)
    macro('title', { at: points.title, nr: 6, title: 'zipper guard' })

    if (sa) {
      paths.sa = new Path()
        .move(points.bottomLeftCorner)
        .join(paths.saBase.offset(sa))
        .line(points.topLeftCorner)
        .attr('class', 'fabric sa')
    }
  }

  return part
}

export const zipperGuard = {
  name: 'onyx.zipperGuard',
  plugins: [],
  draft: draftZipperGuard,
  after: [front, neckband],
  options: {
    zipperGuardWidth: {
      pct: 50,
      min: 0,
      max: 100,
      snap: { metric: 5, imperial: 6.35 },
      toAbs: (pct) => pct * 100, // Valid range is from 0 to 100mm.
      menu: 'construction',
    },
    // How far to have the zipper guard extend past the neckline so it can be wrapped around the zipper slider and pull to keep it from digging into the wearer's neck. Important on any compression garments/swimwear.
    neckGuardLength: { pct: 2, min: 0, max: 5, menu: 'construction' },
  },
}
