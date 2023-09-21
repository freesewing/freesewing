import { pluginBundle } from '@freesewing/plugin-bundle'
import { front } from './front.mjs'
import { back } from './back.mjs'
import { raglanSleeve } from './raglansleeve.mjs'
import { hood } from './hood.mjs'

function draftHoodFront({
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
  if (options.neckStyle != 'hood' || options.hoodFrontPieceSize <= 0) return part.hide()

  // Drafter's notes:
  // - Todo: On the main hood piece, implement the options for hood length and height.
  // - Todo: Level the front piece, then add a curve to the bottom to account for the curve of the neck and the curve of the top.
  // Hood can be in either 3 pieces (front, left, right), or 2 pieces (left, right). 3-piece construction allows for insertion of ears or other decorations.

  // Half the length around the neck of the hood. This is similar to the calculation for the length of a neckband, but the hood is not pre-stretched.
  const neckHalfCircumference =
    store.get('neckLengthFront') + store.get('neckLengthBack') + store.get('neckLengthSide')
  const neckRadius = store.get('neckRadius')
  const frontDip = neckRadius * options.neckBalance
  const curveDip = store.get('hoodFrontPieceCurve')

  // How high the deepest part of the hood is, as a function of the head circumference and measured from the center of the neckline.
  const hoodBackHeight = 0.4 * measurements.head
  // How high the top of the hood is.
  const hoodTopHeight = 0.6 * measurements.head
  // How high the front of the hood is.
  const hoodFrontHeight = 0.52 * measurements.head

  points.hoodFrontPieceBackTop = store.get('hoodFrontPieceBackTop')
  points.hoodFrontPieceFrontTop = store.get('hoodFrontPieceFrontTop')
  points.hoodFrontPieceFrontBottom = store.get('hoodFrontPieceFrontBottom')
  points.hoodFrontPieceBackBottom = store.get('hoodFrontPieceBackBottom')

  points.backTop = new Point(points.hoodFrontPieceBackTop.x, 0)
  points.frontTop = new Point(points.hoodFrontPieceFrontTop.x, 0)
  points.frontBottom = new Point(
    points.hoodFrontPieceFrontBottom.x,
    points.hoodFrontPieceFrontBottom.y - points.hoodFrontPieceFrontTop.y
  )
  points.backBottom = new Point(
    points.hoodFrontPieceBackBottom.x,
    points.hoodFrontPieceBackBottom.y - points.hoodFrontPieceBackTop.y
  )

  points.frontBottomCp2 = new Point(
    (points.frontBottom.x * 2) / 3 + (points.backBottom.x * 1) / 3,
    (points.frontBottom.y * 2) / 3 + (points.backBottom.y * 1) / 3 + curveDip
  )
  points.backBottomCp1 = new Point(
    (points.frontBottom.x * 1) / 3 + (points.backBottom.x * 2) / 3,
    (points.frontBottom.y * 1) / 3 + (points.backBottom.y * 2) / 3 + curveDip
  )

  paths.saBase = new Path()
    .move(points.frontTop)
    .line(points.frontBottom)
    .curve(points.frontBottomCp2, points.backBottomCp1, points.backBottom)
    .line(points.backTop)
    .attr('class', 'fabric')
    .hide(true)

  paths.foldBase = new Path().move(points.backTop).line(points.frontTop).hide(true)
  paths.seam = paths.saBase.join(paths.foldBase).close().attr('class', 'fabric')

  /*
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
*/

  points.cutonfoldFrom = points.frontTop
  points.cutonfoldTo = points.backTop
  macro('cutonfold', {
    from: points.cutonfoldTo,
    to: points.cutonfoldFrom,
    grainline: true,
  })

  store.cutlist.addCut({ cut: 1 })

  if (complete) {
    points.title = new Point((points.frontBottom.x * 7) / 8, points.frontBottom.y / 2)
    macro('title', { at: points.title, nr: 8, title: 'hoodFront' })

    if (sa) {
      paths.sa = new Path()
        .move(points.frontTop)
        .join(paths.saBase.offset(sa))
        .line(points.frontTop)
        .attr('class', 'fabric sa')
    }
  }
  return part
}

export const hoodFront = {
  name: 'onyx.hoodFront',
  plugins: [pluginBundle],
  draft: draftHoodFront,
  after: [front, back, raglanSleeve, hood],
  measurements: ['neck', 'chest', 'biceps', 'wrist', 'head'],
  options: {},
}
