import { pluginBundle } from '@freesewing/plugin-bundle'
import { neckband } from './neckband.mjs'
import { front } from './front.mjs'

function draftZipperGuard({
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
  const zipperLength = store.get('zipperLength')
  const zipperGuardWidth = store.get('zipperGuardWidth')
  const neckGuardLength = store.get('neckGuardLength')

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
      from: points.topLeftCorner,
      to: points.bottomLeftCorner,
      x: -(15 + sa),
    })
    macro('hd', {
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
  plugins: [pluginBundle],
  draft: draftZipperGuard,
  after: [front, neckband],
  options: {
    /*
    // How long the neckband should be, as a percentage of the length of the neck hole.
    neckbandLength: { pct: 80, min: 50, max: 100, menu: 'fit' },
    // How wide the neckband should be, as a percentage of the neckband length.
    neckbandWidth: { pct: 7.5, min: 0, max: 50, menu: 'fit' },*/
  },
}
