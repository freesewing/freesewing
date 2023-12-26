import { front } from './front.mjs'

function draftBib({
  measurements,
  options,
  absoluteOptions,
  Point,
  Path,
  points,
  paths,
  Snippet,
  snippets,
  sa,
  macro,
  part,
  store,
  scale,
  utils,
}) {
  const waistToWaist = measurements.hpsToWaistFront + measurements.hpsToWaistBack

  points.cfWaist = store
    .get('cfWaist')
    .copy()
    .translate(0, measurements.waistFront * options.bibWaistDrop)
  points.outseamWaist = store.get('waist')

  points.cfWaistCp2 = points.cfWaist.translate(
    (points.cfWaist.dist(points.outseamWaist) * 1) / 3,
    0
  )
  points.outseamTopCp1 = points.cfWaist
    .translate((points.cfWaist.dist(points.outseamWaist) * 1) / 2, 0)
    .shiftFractionTowards(points.outseamWaist, 1 / 3)

  // Adjust the waist seam so that it matches the length of the waist seam on the front piece.
  paths.waistCurve = new Path()
    .move(points.cfWaist)
    .curve(points.cfWaistCp2, points.outseamTopCp1, points.outseamWaist)
    .hide()
  points.outseamWaist = points.outseamWaist.translate(
    points.cfWaist.dx(points.outseamWaist) - paths.waistCurve.length(),
    0
  )

  // Recalculate needed points and paths.
  points.cfWaistCp2 = points.cfWaist.translate(
    (points.cfWaist.dist(points.outseamWaist) * 1) / 3,
    0
  )
  points.outseamTopCp1 = points.cfWaist
    .translate((points.cfWaist.dist(points.outseamWaist) * 1) / 2, 0)
    .shiftFractionTowards(points.outseamWaist, 1 / 3)
  options.bibCenterTaper != 0
    ? (paths.waistCurve = new Path()
        .move(points.cfWaist)
        .curve(points.cfWaistCp2, points.outseamTopCp1, points.outseamWaist)
        .hide())
    : (paths.waistCurve = new Path()
        .move(points.outseamWaist.flipX(points.cfWaist))
        .curve(
          points.outseamTopCp1.flipX(points.cfWaist),
          points.cfWaistCp2.flipX(points.cfWaist),
          points.cfWaist
        )
        .curve(points.cfWaistCp2, points.outseamTopCp1, points.outseamWaist)
        .hide())

  points.outseamTop = points.outseamWaist.translate(0, -waistToWaist * options.outseamHeight)
  points.topSide = new Point(
    points.cfWaist.x * (1 - options.bibWidth) + measurements.waistFront * options.bibCenterTaper,
    -measurements.hpsToWaistFront * options.bibHeight
  )
  points.cfTop = new Point(
    points.cfWaist.x + measurements.waistFront * options.bibCenterTaper,
    -measurements.hpsToWaistFront * options.bibHeight
  )
  store.set('bibFrontHeight', -points.cfTop.y)
  points.cfMax = points.cfWaist.translate(0, (-points.cfWaist.dist(points.cfTop) * 1) / 2)
  points.cfTopCp2 = points.cfTop.shiftFractionTowards(points.cfMax, 2 / 3)
  points.cfWaistCp1 = points.cfWaist.shiftFractionTowards(points.cfMax, 2 / 3)

  points.placketCenterBottom = points.cfTop.translate(0, absoluteOptions.bibPlacketWidth)
  points.placketSideBottom = utils.beamIntersectsY(
    points.topSide,
    points.outseamTop,
    points.placketCenterBottom.y
  )
  if (options.bibPlacketLayers > 0) {
    options.bibCenterTaper != 0
      ? (paths.placket = new Path().move(points.placketCenterBottom).line(points.placketSideBottom))
      : (paths.placket = new Path()
          .move(points.placketSideBottom.flipX(points.placketCenterBottom))
          .line(points.placketSideBottom))
    paths.placket.setClass('fabric dashed')
    paths.placket.addText('opal:bibPlacket', 'center')

    store.set('bibPlacketLengthTop', points.cfTop.dist(points.topSide) * 2)
    store.set(
      'bibPlacketLengthBottom',
      points.placketCenterBottom.dist(points.placketSideBottom) * 2
    )
  }

  points.pocketCenterTop = points.cfWaist.shiftFractionTowards(
    points.cfTop,
    options.pocketBibVerticalPosition + options.pocketBibHeight / 2
  )
  points.pocketCenterBottom = points.pocketCenterTop.translate(
    0,
    points.cfWaist.dist(points.cfTop) * options.pocketBibHeight
  )
  points.pocketSideTop = points.pocketCenterTop.translate(
    points.cfWaist.dx(points.outseamWaist) * options.pocketBibWidth,
    0
  )
  points.pocketSideBottom = points.pocketCenterBottom.translate(
    points.cfWaist.dx(points.outseamWaist) * options.pocketBibWidth,
    0
  )
  points.pocketFeatureSide = points.pocketCenterBottom.translate(
    points.cfWaist.dx(points.outseamWaist) * options.pocketBibFeatureWidth,
    points.cfWaist.dy(points.cfTop) * options.pocketBibFeatureHeight
  )
  if (options.pocketBibStyle === 'hexagon' || options.pocketBibStyle === 'curvedBottom') {
    points.pocketMax = points.pocketSideBottom.copy()
    points.pocketFeatureSide = points.pocketCenterBottom.translate(
      points.cfWaist.dx(points.outseamWaist) * options.pocketBibWidth,
      points.cfWaist.dy(points.cfTop) * options.pocketBibFeatureHeight
    )
    points.pocketSideBottom = points.pocketCenterBottom.translate(
      points.cfWaist.dx(points.pocketSideTop) * options.pocketBibFeatureWidth,
      0
    )

    points.pocketSideBottomCp2 = points.pocketSideBottom.shiftFractionTowards(
      points.pocketMax,
      options.pocketBibFeatureCurve
    )
    points.pocketFeatureSideCp1 = points.pocketFeatureSide.shiftFractionTowards(
      points.pocketMax,
      options.pocketBibFeatureCurve
    )
  }

  if (options.bibCenterTaper != 0) {
    paths.seam = new Path()
      .move(points.cfTop)
      .curve(points.cfTopCp2, points.cfWaistCp1, points.cfWaist)
      .curve(points.cfWaistCp2, points.outseamTopCp1, points.outseamWaist)
      .line(points.outseamTop)
      .addClass('fabric')
    paths.hem = new Path()
      .move(points.outseamTop)
      .line(points.topSide)
      .line(points.cfTop)
      .addClass('fabric')
  } else {
    paths.seam = new Path()
      .move(points.outseamTop.flipX(points.cfWaist))
      .line(points.outseamWaist.flipX(points.cfWaist))
      .curve(
        points.outseamTopCp1.flipX(points.cfWaist),
        points.cfWaistCp2.flipX(points.cfWaist),
        points.cfWaist
      )
      .curve(points.cfWaistCp2, points.outseamTopCp1, points.outseamWaist)
      .line(points.outseamTop)
    paths.hem = new Path()
      .move(points.outseamTop)
      .line(points.topSide)
      .line(points.topSide.flipX(points.cfTop))
      .line(points.outseamTop.flipX(points.cfWaist))
      .addClass('fabric')
  }

  // Draft the pocket.
  if (options.pocketBib) {
    paths.bibPocketHem = new Path()
      .move(points.pocketSideTop)
      .line(
        options.bibPocketOnFold
          ? points.pocketCenterTop
          : points.pocketSideTop.flipX(points.pocketCenterTop)
      )
      .addClass('fabric dashed')

    if (options.pocketBib && options.pocketBibStyle === 'pentagon' && options.bibPocketOnFold)
      paths.bibPocketSeam = new Path()
        .move(points.pocketCenterTop)
        .line(points.pocketCenterBottom)
        .line(points.pocketFeatureSide)
        .line(points.pocketSideTop)
        .addClass('fabric dashed')
    if (options.pocketBib && options.pocketBibStyle === 'pentagon' && !options.bibPocketOnFold)
      paths.bibPocketSeam = new Path()
        .move(points.pocketSideTop.flipX(points.pocketCenterTop))
        .line(points.pocketFeatureSide.flipX(points.pocketCenterTop))
        .line(points.pocketCenterBottom)
        .line(points.pocketFeatureSide)
        .line(points.pocketSideTop)
        .addClass('fabric dashed')
    if (options.pocketBib && options.pocketBibStyle === 'hexagon' && options.bibPocketOnFold)
      paths.bibPocketSeam = new Path()
        .move(points.pocketCenterTop)
        .line(points.pocketCenterBottom)
        .line(points.pocketSideBottom)
        .line(points.pocketFeatureSide)
        .line(points.pocketSideTop)
        .addClass('fabric dashed')
    if (options.pocketBib && options.pocketBibStyle === 'hexagon' && !options.bibPocketOnFold)
      paths.bibPocketSeam = new Path()
        .move(points.pocketSideTop.flipX(points.pocketCenterTop))
        .line(points.pocketFeatureSide.flipX(points.pocketCenterTop))
        .line(points.pocketSideBottom.flipX(points.pocketCenterTop))
        .line(points.pocketSideBottom)
        .line(points.pocketFeatureSide)
        .line(points.pocketSideTop)
        .addClass('fabric dashed')
    if (options.pocketBib && options.pocketBibStyle === 'curvedBottom' && options.bibPocketOnFold)
      paths.bibPocketSeam = new Path()
        .move(points.pocketCenterTop)
        .line(points.pocketCenterBottom)
        .line(points.pocketSideBottom)
        .curve(points.pocketSideBottomCp2, points.pocketFeatureSideCp1, points.pocketFeatureSide)
        .line(points.pocketSideTop)
        .addClass('fabric dashed')
    if (options.pocketBib && options.pocketBibStyle === 'curvedBottom' && !options.bibPocketOnFold)
      paths.bibPocketSeam = new Path()
        .move(points.pocketSideTop.flipX(points.pocketCenterTop))
        .line(points.pocketFeatureSide.flipX(points.pocketCenterTop))
        .curve(
          points.pocketFeatureSideCp1.flipX(points.pocketCenterTop),
          points.pocketSideBottomCp2.flipX(points.pocketCenterTop),
          points.pocketSideBottom.flipX(points.pocketCenterTop)
        )
        .line(points.pocketSideBottom)
        .curve(points.pocketSideBottomCp2, points.pocketFeatureSideCp1, points.pocketFeatureSide)
        .line(points.pocketSideTop)
        .addClass('fabric dashed')
    if (options.pocketBib && options.pocketBibStyle === 'rectangle' && options.bibPocketOnFold)
      paths.bibPocketSeam = new Path()
        .move(points.pocketCenterTop)
        .line(points.pocketCenterBottom)
        .line(points.pocketSideBottom)
        .line(points.pocketSideTop)
        .addClass('fabric dashed')
    if (options.pocketBib && options.pocketBibStyle === 'rectangle' && !options.bibPocketOnFold)
      paths.bibPocketSeam = new Path()
        .move(points.pocketSideTop.flipX(points.pocketCenterTop))
        .line(points.pocketSideBottom.flipX(points.pocketCenterTop))
        .line(points.pocketSideBottom)
        .line(points.pocketSideTop)
        .addClass('fabric dashed')
    if (options.pocketBib && options.bibCenterTaper != 0) {
      paths.bibPocketHem.hide()
      paths.bibPocketSeam.hide()
    }
    store.set(
      'bibPocketCenter',
      points.pocketCenterTop.shiftFractionTowards(points.pocketCenterBottom, 1 / 2)
    )
  }

  if (options.bibCenterTaper != 0)
    points.bibPocketText = points.pocketCenterTop
      .shiftFractionTowards(points.pocketCenterBottom, 1 / 16)
      .addText('opal:pocketBib')
  else
    points.bibPocketText = points.pocketCenterTop
      .shiftFractionTowards(points.pocketCenterBottom, 1 / 16)
      .addText('opal:pocketBib', 'center')

  if (sa) {
    if (options.bibCenterTaper != 0) {
      paths.sa = paths.seam
        .offset(sa)
        .join(paths.hem.offset(absoluteOptions.hemAllowance))
        .close()
        .addClass('fabric sa')
    } else {
      paths.sa = paths.seam
        .offset(sa)
        .join(paths.hem.offset(absoluteOptions.hemAllowance))
        .close()
        .addClass('fabric sa')
    }
  }

  macro('pd', {
    id: 'pWaistCurve',
    path: paths.waistCurve,
  })
  macro('hd', {
    id: 'wBibTrapezoidalPart',
    from: points.topSide,
    to: points.outseamTop,
    y: points.cfTop.y - (absoluteOptions.hemAllowance + 15),
  })
  macro('vd', {
    id: 'hOutseam',
    from: points.outseamTop,
    to: points.outseamWaist,
    x: points.outseamWaist.x + (sa + 15),
  })
  macro('vd', {
    id: 'hBibTrapezoidalPart',
    from: points.topSide,
    to: points.outseamTop,
    x: points.outseamWaist.x + (sa + 15),
  })
  macro('vd', {
    id: 'hOutside',
    from: points.topSide,
    to: points.outseamWaist,
    x: points.outseamWaist.x + (sa + 30),
  })
  macro('vd', {
    id: 'hCurve',
    from: points.outseamWaist,
    to: points.cfWaist,
    x: points.outseamWaist.x + (sa + 15),
    noStartMarker: true,
    noEndMarker: true,
  })
  macro('vd', {
    id: 'hTotal',
    from: points.topSide,
    to: points.cfWaist,
    x: points.outseamWaist.x + (sa + 45),
  })
  if (options.bibCenterTaper != 0) {
    macro('hd', {
      id: 'wTop',
      from: points.cfTop,
      to: points.topSide,
      y: points.cfTop.y - (absoluteOptions.hemAllowance + 15),
    })
    macro('hd', {
      id: 'wTotal',
      from: points.cfTop,
      to: points.outseamTop,
      y: points.cfTop.y - (absoluteOptions.hemAllowance + 30),
    })
  } else {
    macro('hd', {
      id: 'wTop',
      from: points.topSide.flipX(points.cfTop),
      to: points.topSide,
      y: points.topSide.y - (absoluteOptions.hemAllowance + 15),
    })
    macro('hd', {
      id: 'wTotal',
      from: points.outseamTop.flipX(points.cfTop),
      to: points.outseamTop,
      y: points.cfTop.y - (absoluteOptions.hemAllowance + 30),
    })
  }

  points.grainlineTop = points.cfTop
  points.grainlineBottom = points.cfWaist
  macro('grainline', {
    from: points.grainlineTop,
    to: points.grainlineBottom,
  })

  store.cutlist.addCut({ cut: options.bibCenterTaper != 0 ? 2 : 1, from: 'fabric' })

  points.title =
    options.bibCenterTaper != 0
      ? points.cfTop
          .shiftFractionTowards(points.outseamWaist, 1 / 2)
          .translate(scale * -20, scale * 35)
      : points.cfTop.shiftFractionTowards(points.cfWaist, 1 / 2).translate(scale * 20, scale * 15)
  macro('title', { at: points.title, nr: 3, title: 'opal:bib' })
  points.logo = points.title.translate(-scale * 35, scale * 35)
  snippets.logo = new Snippet('logo', points.logo)

  return part
}

export const bib = {
  name: 'bib',
  draft: draftBib,
  options: {
    // How much extra fabric to put in the waist, horizontally, to help the overalls fit around the belly. Larger values work better on larger bellies.
    bibWaistDrop: { pct: 3, min: 0, max: 15, menu: 'fit' },
    // How much extra fabric to put in the center, vertically, to help the overalls fit around the belly, and helps to avoid sagging on the sides of the bib. Larger values work better on larger bellies. A value of 0 causes the bib to be drafted in one piece. Any other value causes it to be drafted in two pieces.
    bibCenterTaper: { pct: 2, min: 0, max: 10, menu: 'fit' },
    // Height of the front bib, as a percentage of the way from the waist to the HPS. Measured from the natural waist.
    bibHeight: { pct: 70, min: 20, max: 90, menu: 'style' },
    // Width of the top of the bib, as a percentage of the waistFront measurement.
    bibWidth: { pct: 50, min: 20, max: 100, menu: 'style' },
    // Set to true to the bib on the fold, or false to draft the full piece.
    bibTwoParts: { bool: true, menu: 'construction' },
    bibPocketOnFold: { bool: false, menu: 'construction' },
    // How wide to make the reinforced placket at the top of the bib.
    bibPlacketWidth: {
      pct: 15,
      min: 0,
      max: 30,
      toAbs: (pct, settings, mergedOptions) =>
        (settings.measurements.waist / 4) * mergedOptions.bibPlacketWidth,
      menu: 'construction',
    },
    bibPlacketLayers: { count: 3, min: 0, max: 8, menu: 'construction' },
    pocketBib: { bool: true, menu: 'style' },
    pocketBibVerticalPosition: { pct: 50, min: 20, max: 80, menu: 'style' },
    pocketBibStyle: {
      dflt: 'pentagon',
      list: ['pentagon', 'hexagon', 'curvedBottom', 'rectangle'],
      menu: 'style',
    },
    pocketBibWidth: { pct: 40, min: 20, max: 80, menu: 'style' },
    pocketBibHeight: { pct: 60, min: 20, max: 80, menu: 'style' },
    // How wide the bottom feature is. For pentagons, this is the width at the widest part as a percent of the bib width, for hexagons and curved bottoms, this is the width of the straight section at the bottom as a percent of the pocket width, and this is ignored for rectangles.
    pocketBibFeatureWidth: { pct: 50, min: 0, max: 80, menu: 'style' },
    // How far up the bottom feature extends. This is ignored for rectangles.
    pocketBibFeatureHeight: { pct: 5, min: 0, max: 20, menu: 'style' },
    // Used for curvedBottom style only.
    pocketBibFeatureCurve: { pct: 50, min: 0, max: 100, menu: 'style' },
  },
  after: front,
}
