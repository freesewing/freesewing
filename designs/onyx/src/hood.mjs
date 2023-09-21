import { pluginBundle } from '@freesewing/plugin-bundle'
import { front } from './front.mjs'
import { back } from './back.mjs'
import { raglanSleeve } from './raglansleeve.mjs'

function draftHood({
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
  if (options.neckStyle != 'hood') return part.hide()

  // Drafter's notes:
  // - Todo: Shorten the back piece in cases where there is a front piece.
  // Hood can be in either 3 pieces (front, left, right), or 2 pieces (left, right). 3-piece construction allows for insertion of ears or other decorations.

  // Half the length around the neck of the hood. This is similar to the calculation for the length of a neckband, but the hood is not pre-stretched.
  const neckHalfCircumference =
    store.get('neckLengthFront') + store.get('neckLengthBack') + store.get('neckLengthSide')
  const neckRadius = store.get('neckRadius')
  const frontDip = neckRadius * options.neckBalance

  // How high the deepest part of the hood is, as a function of the head circumference and measured from the center of the neckline.
  const hoodBackHeight = 0.4 * measurements.head
  // How high the top of the hood is.
  const hoodTopHeight = 0.6 * measurements.head
  // How high the front of the hood is.
  const hoodFrontHeight = 0.52 * measurements.head

  // Rescale the front piece size option to go from -1 for no front piece, to +1 for a hypothetical front-piece only pattern.
  const sideSeamPosition = options.hoodFrontPieceSize * 2 - 1
  const sideSeamPositionRadians = (sideSeamPosition * Math.PI) / 2

  // Calculate how wide the neck should be made so that the actual path length (along the curve) matches the length of the neck on the body of the garment.
  let hoodWidth = neckHalfCircumference
  for (let i = 0; i < 10; i++) {
    points.frontNeck = new Point(-hoodWidth / 2, frontDip)
    points.backNeck = new Point(hoodWidth / 2, -frontDip)
    points.frontNeckCp2 = new Point(-hoodWidth / 6, frontDip)
    points.backNeckCp1 = new Point(hoodWidth / 6, -frontDip)
    const lengthMultiplier =
      neckHalfCircumference /
      new Path()
        .move(points.frontNeck)
        .curve(points.frontNeckCp2, points.backNeckCp1, points.backNeck)
        .length()
    hoodWidth *= lengthMultiplier

    if (Math.abs(lengthMultiplier - 1) < 0.00001) break
  }

  points.frontNeck = new Point(
    (hoodWidth / 2) * sideSeamPosition,
    -frontDip * Math.sin(sideSeamPositionRadians)
  )
  points.backNeck = new Point(hoodWidth / 2, -frontDip)
  points.backHead = new Point(measurements.head / 4, -hoodBackHeight)
  points.centerTop = new Point(0, -hoodTopHeight)
  points.frontTop = new Point(
    (hoodWidth / 2) * sideSeamPosition,
    (hoodTopHeight - hoodFrontHeight) * (sideSeamPosition * sideSeamPosition) - hoodTopHeight
  )

  points.frontNeckCp2 = points.frontNeck.translate(
    (hoodWidth * (1 - options.hoodFrontPieceSize)) / 3,
    ((frontDip * (1 - options.hoodFrontPieceSize)) / 3) *
      Math.PI *
      -Math.cos(sideSeamPositionRadians)
  )
  points.backNeckCp1 = points.backNeck.translate(
    (-hoodWidth * (1 - options.hoodFrontPieceSize)) / 3,
    0
  )
  points.backNeckCp2 = new Point(hoodWidth / 2, (-frontDip * 2) / 3 + (-hoodBackHeight * 1) / 3)
  points.backHeadCp1 = new Point(
    measurements.head / 4,
    (-frontDip * 1) / 3 + (-hoodBackHeight * 2) / 3
  )
  points.backHeadCp2 = new Point(
    measurements.head / 4,
    (points.backHead.y * 1) / 3 + (points.centerTop.y * 2) / 3
  )
  points.centerTopCp1 = new Point(measurements.head / 12, -hoodTopHeight)
  points.centerTopCp2 = new Point((hoodWidth / 4) * sideSeamPosition, -hoodTopHeight)

  paths.saBase = new Path()
    .move(points.frontNeck)
    .curve(points.frontNeckCp2, points.backNeckCp1, points.backNeck)
    .curve(points.backNeckCp2, points.backHeadCp1, points.backHead)
    .curve(points.backHeadCp2, points.centerTopCp1, points.centerTop)
    .curve(points.centerTopCp2, points.frontTop, points.frontTop)
    .attr('class', 'fabric')
    .hide(true)

  paths.foldBase = new Path().move(points.frontTop).line(points.frontNeck).hide(true)

  paths.seam = paths.saBase.join(paths.foldBase).close().attr('class', 'fabric')

  if (paperless) {
    macro('vd', {
      from: points.backHead,
      to: points.centerTop,
      x: points.backHead.x + (15 + sa),
    })
    macro('vd', {
      from: points.backNeck,
      to: points.backHead,
      x: points.backHead.x + (15 + sa),
    })
    macro('vd', {
      from: points.frontNeck,
      to: points.backNeck,
      x: points.backHead.x + (15 + sa),
    })
    macro('vd', {
      from: points.backNeck,
      to: points.centerTop,
      x: points.backHead.x + (30 + sa),
    })
    macro('vd', {
      from: points.frontNeck,
      to: points.centerTop,
      x: points.backHead.x + (45 + sa),
    })
    macro('vd', {
      from: points.frontNeck,
      to: points.frontTop,
      x: points.frontTop.x - (15 + sa),
    })
    macro('hd', {
      from: points.centerTop,
      to: points.backHead,
      y: points.centerTop.y - (sa + 15),
    })
    macro('hd', {
      from: points.frontTop,
      to: points.centerTop,
      y: points.centerTop.y - (sa + 15),
    })
    macro('hd', {
      from: points.frontTop,
      to: points.backHead,
      y: points.centerTop.y - (sa + 30),
    })
    macro('hd', {
      from: points.frontNeck,
      to: points.backNeck,
      y: points.frontNeck.y + (sa + 15),
    })
  }

  points.grainlineBottom = new Point(0, -0.03 * measurements.head).shift(
    0,
    0.03 * neckHalfCircumference
  )
  points.grainlineTop = points.centerTop
    .shift(270, 0.03 * measurements.head)
    .shift(0, 0.03 * neckHalfCircumference)
  macro('grainline', {
    from: points.grainlineTop,
    to: points.grainlineBottom,
  })

  store.cutlist.addCut({ cut: 2 })

  if (complete) {
    points.title = new Point(neckHalfCircumference / 6, -measurements.head * 0.3)
    macro('title', { at: points.title, nr: 7, title: 'hood' })

    if (sa) {
      paths.sa = paths.saBase
        .offset(sa)
        .join(
          paths.foldBase.offset(sa * (options.hoodFrontPieceSize > 0 ? 1 : options.hoodHem * 100))
        )
        .close()
        .attr('class', 'fabric sa')
    }
  }

  if (options.hoodFrontPieceSize > 0) {
    store.set('hoodFrontPieceBackTop', points.frontTop)
    store.set('hoodFrontPieceFrontTop', new Point(-hoodWidth / 2, -hoodFrontHeight))
    store.set('hoodFrontPieceFrontBottom', new Point(-hoodWidth / 2, frontDip))
    store.set('hoodFrontPieceBackBottom', points.frontNeck)

    store.set(
      'hoodFrontPieceCurve',
      ((frontDip + (hoodTopHeight - hoodFrontHeight)) *
        options.hoodFrontPieceSize *
        options.hoodFrontPieceSize *
        4) /
        3
    )
  }

  return part
}

export const hood = {
  name: 'onyx.hood',
  plugins: [pluginBundle],
  draft: draftHood,
  after: [front, back, raglanSleeve],
  measurements: ['neck', 'chest', 'biceps', 'wrist', 'head'],
  options: {
    // Width of the hem at the front of the hood, as a multiple of the seam allowance.
    hoodHem: { pct: 2, min: 0, max: 8, menu: 'construction' },
    // How much of the hood is composed of the front piece, versus the two back pieces. 50 divides it evenly, while larger values make for a larger front piece.
    hoodFrontPieceSize: { pct: 50, min: 0, max: 50, menu: 'style' },
  },
}
