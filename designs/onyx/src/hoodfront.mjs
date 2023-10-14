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
  // Note: Very small values of options.hoodFrontPieceSize cause crashes for unknown reasons if we attempt to draw the part.
  if (options.neckStyle != 'hood' || options.hoodFrontPieceSize < 0.001) return part.hide()

  // Drafter's notes:
  // - Todo: On the main hood piece, implement the options for hood length and height.
  // Hood can be in either 3 pieces (front, left, right), or 2 pieces (left, right). 3-piece construction allows for insertion of ears or other decorations.

  // Half the length around the neck of the hood. This is similar to the calculation for the length of a neckband, but the hood is not pre-stretched.
  const neckHalfCircumference =
    store.get('neckLengthFront') + store.get('neckLengthBack') + store.get('neckLengthSide')
  const neckRadius = store.get('neckRadius')
  const frontDip = neckRadius * options.neckBalance
  const curveDip = store.get('hoodFrontPieceCurve')
  const neckLength = store.get('hoodFrontPieceNeckLength')

  points.hoodFrontPieceBackTop = store.get('hoodFrontPieceBackTop')
  points.hoodFrontPieceFrontTop = store.get('hoodFrontPieceFrontTop')
  points.hoodFrontPieceFrontBottom = store.get('hoodFrontPieceFrontBottom')
  points.hoodFrontPieceBackBottom = store.get('hoodFrontPieceBackBottom')

  // The actual width of the piece, which must be set such that the length along the bottom equals 'neckLength,' imported from hood.mjs.
  let pieceWidth = neckLength
  for (let i = 0; i < 10; i++) {
    points.backTop = new Point(points.hoodFrontPieceBackTop.x, 0)
    points.frontTop = points.backTop.translate(-pieceWidth, 0)
    points.backBottom = new Point(
      points.hoodFrontPieceBackBottom.x,
      points.hoodFrontPieceBackBottom.y - points.hoodFrontPieceBackTop.y
    )
    points.frontBottom = points.backBottom.translate(-pieceWidth, 0)
    points.frontBottom.y = points.hoodFrontPieceFrontBottom.y - points.hoodFrontPieceFrontTop.y
    points.frontBottomCp2 = new Point(
      (points.frontBottom.x * 2) / 3 + (points.backBottom.x * 1) / 3,
      (points.frontBottom.y * 2) / 3 + (points.backBottom.y * 1) / 3 + curveDip
    )
    points.backBottomCp1 = new Point(
      (points.frontBottom.x * 1) / 3 + (points.backBottom.x * 2) / 3,
      (points.frontBottom.y * 1) / 3 + (points.backBottom.y * 2) / 3 + curveDip
    )
    const lengthMultiplier =
      neckLength /
      new Path()
        .move(points.frontBottom)
        .curve(points.frontBottomCp2, points.backBottomCp1, points.backBottom)
        .length()
    pieceWidth *= lengthMultiplier

    if (Math.abs(lengthMultiplier - 1) < 0.00001) break
  }

  points.backTop = new Point(points.hoodFrontPieceBackTop.x, 0)
  points.frontTop = new Point(
    points.hoodFrontPieceFrontTop.x - measurements.head * options.hoodFrontBonus,
    0
  )
  points.frontTop.x = Math.min(points.frontTop.x, points.backTop.x) // Prevents malformed pieces formed when the hoodFrontBonus is too negative and the hoodFrontPieceSize is too small.
  points.frontBottom = new Point(
    points.hoodFrontPieceFrontBottom.x,
    points.hoodFrontPieceFrontBottom.y - points.hoodFrontPieceFrontTop.y
  )
  points.backBottom = new Point(
    points.hoodFrontPieceBackBottom.x,
    points.hoodFrontPieceBackBottom.y - points.hoodFrontPieceBackTop.y
  )

  points.frontTopCp2 = points.frontTop.translate(
    0,
    ((points.frontBottom.y - points.frontTop.y) * 1) / 3
  )
  points.frontBottomCp1 = points.frontBottom.translate(
    0,
    ((points.frontTop.y - points.frontBottom.y) * 1) / 3
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
    .move(points.frontBottom)
    .curve(points.frontBottomCp2, points.backBottomCp1, points.backBottom)
    .line(points.backTop)
    .attr('class', 'fabric')
    .hide(true)

  paths.saHem = new Path()
    .move(points.frontTop)
    .curve(points.frontTopCp2, points.frontBottomCp1, points.frontBottom)
    .attr('class', 'fabric')
    .hide(true)

  paths.foldBase = new Path().move(points.backTop).line(points.frontTop).hide(true)
  paths.seam = paths.saBase.join(paths.foldBase).join(paths.saHem).attr('class', 'fabric')

  if (paperless) {
    macro('vd', {
      id: 'hFrontHeight',
      from: points.frontTop,
      to: points.frontBottom,
      x: points.frontTop.x - (15 + sa),
    })
    macro('vd', {
      id: 'hTotalHeight',
      from: points.frontTop,
      to: paths.saBase.edge('bottom'),
      x: points.frontTop.x - (30 + sa),
    })
    macro('vd', {
      id: 'hBackHeight',
      from: points.backTop,
      to: points.backBottom,
      x: points.backTop.x + (15 + sa),
    })
    macro('hd', {
      id: 'wTopWidth',
      from: points.frontTop,
      to: points.backTop,
      y: points.frontTop.y - (15 + sa),
    })
    macro('pd', {
      id: 'lNeck',
      path: new Path()
        .move(points.frontBottom)
        .curve(points.frontBottomCp2, points.backBottomCp1, points.backBottom),
      d: 15,
    })
  }

  points.cutonfoldFrom = points.frontTop
  points.cutonfoldTo = points.backTop
  macro('cutonfold', {
    from: points.cutonfoldTo,
    to: points.cutonfoldFrom,
    grainline: false,
    reverse: true,
  })

  points.grainlineFrom = points.backTop.shiftFractionTowards(points.frontTop, 0.05)
  points.grainlineTo = new Point(points.grainlineFrom.x, points.backBottom.y)
  macro('grainline', {
    from: points.grainlineFrom,
    to: points.grainlineTo,
  })

  store.cutlist.addCut({ cut: 1 })

  if (complete) {
    points.title = new Point((points.frontBottom.x * 7) / 8, points.frontBottom.y / 2)
    macro('title', { at: points.title, nr: 8, title: 'hoodFront' })

    if (sa) {
      paths.sa = paths.saHem
        .offset(sa * options.hoodHem * 100)
        .join(paths.saBase.offset(sa))
        .line(points.frontTop.translate(-sa * options.hoodHem * 100, 0))
        .attr('class', 'fabric sa')
    }
  }
  return part
}

export const hoodFront = {
  name: 'onyx.hoodFront',
  plugins: [],
  draft: draftHoodFront,
  after: [front, back, raglanSleeve, hood],
  measurements: ['neck', 'chest', 'biceps', 'wrist', 'head'],
  options: {},
}
