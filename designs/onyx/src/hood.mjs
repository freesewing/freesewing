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
  // - Todo: Widen/Shorten Front piece to match neckline length.
  // Hood can be in either 3 pieces (front, left, right), or 2 pieces (left, right). 3-piece construction allows for insertion of ears or other decorations.

  // Half the length around the neck of the hood. This is similar to the calculation for the length of a neckband, but the hood is not pre-stretched.
  const neckHalfCircumference =
    store.get('neckLengthFront') + store.get('neckLengthBack') + store.get('neckLengthSide')
  const neckRadius = store.get('neckRadius')
  const frontDip = neckRadius * options.neckBalance

  // How high the deepest part of the hood is, as a function of the head circumference and measured from the center of the neckline.
  const hoodBackHeight = 0.4 * measurements.head * options.hoodHeight
  // How high the top of the hood is.
  const hoodTopHeight = 0.6 * measurements.head * options.hoodHeight
  // How high the front of the hood is.
  const hoodFrontHeight = (0.6 - options.hoodFrontDip) * measurements.head * options.hoodHeight

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
  points.backHead = new Point((measurements.head / 4) * options.hoodDepth, -hoodBackHeight)
  points.centerTop = new Point(0, -hoodTopHeight)
  points.frontTop = new Point(
    (hoodWidth / 2) * sideSeamPosition,
    (hoodTopHeight - hoodFrontHeight) * (sideSeamPosition * sideSeamPosition) - hoodTopHeight
  )

  if (options.hoodFrontPieceSize < 0.001)
    points.frontTop.x -= measurements.head * options.hoodFrontBonus

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
    (measurements.head / 4) * options.hoodDepth,
    (-frontDip * 1) / 3 + (-hoodBackHeight * 2) / 3
  )
  points.backHeadCp2 = new Point(
    (measurements.head / 4) * options.hoodDepth,
    (points.backHead.y * 1) / 3 + (points.centerTop.y * 2) / 3
  )
  points.centerTopCp1 = new Point((measurements.head / 12) * options.hoodDepth, -hoodTopHeight)
  points.centerTopCp2 = new Point(
    (points.centerTop.x * 2) / 3 + (points.frontTop.x * 2) / 5,
    points.centerTop.y
  )
  points.frontTopCp1 = new Point(
    (points.centerTop.x * 1) / 6 + (points.frontTop.x * 5) / 6,
    (points.centerTop.y * 1) / 3 + (points.frontTop.y * 2) / 3
  )

  paths.saBase = new Path()
    .move(points.frontNeck)
    .curve(points.frontNeckCp2, points.backNeckCp1, points.backNeck)
    .curve(points.backNeckCp2, points.backHeadCp1, points.backHead)
    .curve(points.backHeadCp2, points.centerTopCp1, points.centerTop)
    .curve(points.centerTopCp2, points.frontTopCp1, points.frontTop)
    .attr('class', 'fabric')
    .hide(true)

  paths.hemBase = new Path().move(points.frontTop).line(points.frontNeck).hide(true)

  paths.seam = paths.saBase.join(paths.hemBase).close().attr('class', 'fabric')

  if (paperless) {
    macro('vd', {
      id: 'hBackToTop',
      from: points.backHead,
      to: points.centerTop,
      x: points.backHead.x + (sa + 15),
    })
    macro('vd', {
      id: 'hNeckToBack',
      from: points.backNeck,
      to: points.backHead,
      x: points.backHead.x + (sa + 15),
    })
    macro('vd', {
      id: 'hNeck',
      from: points.frontNeck,
      to: points.backNeck,
      x: points.backHead.x + (sa + 15),
    })
    macro('vd', {
      id: 'hBackNeckToTop',
      from: points.backNeck,
      to: points.centerTop,
      x: points.backHead.x + (sa + 30),
    })
    macro('vd', {
      id: 'hTotalHeight',
      from: points.frontNeck,
      to: points.centerTop,
      x: points.backHead.x + (sa + 45),
    })
    macro('vd', {
      id: 'hFront',
      from: points.frontNeck,
      to: points.frontTop,
      x: points.frontTop.x - (sa + 15),
    })
    macro('hd', {
      id: 'wTopToBack',
      from: points.centerTop,
      to: points.backHead,
      y: points.centerTop.y - (sa + 15),
    })
    macro('hd', {
      id: 'wFrontToTop',
      from: points.frontTop,
      to: points.centerTop,
      y: points.centerTop.y - (sa + 15),
    })
    macro('hd', {
      id: 'wFrontToBack',
      from: points.frontTop,
      to: points.backHead,
      y: points.centerTop.y - (sa + 30),
    })
    macro('hd', {
      id: 'wNeck',
      from: points.frontNeck,
      to: points.backNeck,
      y: points.frontNeck.y + (sa + 15),
    })
    macro('pd', {
      id: 'lNeck',
      path: new Path()
        .move(points.frontNeck)
        .curve(points.frontNeckCp2, points.backNeckCp1, points.backNeck),
      d: 15,
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
          paths.hemBase.offset(sa * (options.hoodFrontPieceSize > 0 ? 1 : options.hoodHem * 100))
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

    store.set('hoodFrontPieceNeckLength', neckHalfCircumference * options.hoodFrontPieceSize)
  }

  return part
}

export const hood = {
  name: 'onyx.hood',
  plugins: [],
  draft: draftHood,
  after: [front, back, raglanSleeve],
  measurements: ['neck', 'chest', 'biceps', 'wrist', 'head'],
  options: {
    // How roomy the hood in the back of the head.
    hoodDepth: {
      pct: 120,
      min: 70,
      max: 180,
      menu: (settings, mergedOptions) => (mergedOptions.neckStyle == 'hood' ? 'fit' : false),
    },
    // How tall the hood is.
    hoodHeight: {
      pct: 100,
      min: 70,
      max: 140,
      menu: (settings, mergedOptions) => (mergedOptions.neckStyle == 'hood' ? 'fit' : false),
    },
    // How much the hood dips in the front.
    hoodFrontDip: {
      pct: 8,
      min: 0,
      max: 20,
      menu: (settings, mergedOptions) => (mergedOptions.neckStyle == 'hood' ? 'style' : false),
    },
    // Width of the hem at the front of the hood, as a multiple of the seam allowance.
    hoodHem: {
      pct: 2,
      min: 0,
      max: 8,
      menu: (settings, mergedOptions) =>
        mergedOptions.neckStyle == 'hood' ? 'construction' : false,
    },
    // How far forward the top of the hood extends.
    hoodFrontBonus: {
      pct: 0,
      min: -8,
      max: 10,
      menu: (settings, mergedOptions) => (mergedOptions.neckStyle == 'hood' ? 'style' : false),
    },
    // How much of the hood is composed of the front piece, versus the two back pieces. 50 divides it evenly, while larger values make for a larger front piece.
    hoodFrontPieceSize: {
      pct: 50,
      min: 0,
      max: 50,
      menu: (settings, mergedOptions) => (mergedOptions.neckStyle == 'hood' ? 'style' : false),
    },
  },
}
