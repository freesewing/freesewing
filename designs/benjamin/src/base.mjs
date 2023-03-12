import { pluginBundle } from '@freesewing/plugin-bundle'

function draftBenjaminBase({
  store,
  sa,
  Point,
  points,
  Path,
  paths,
  Snippet,
  snippets,
  options,
  measurements,
  complete,
  paperless,
  macro,
  part,
}) {
  if (options.bowStyle === 'square') options.tipWidth = options.knotWidth

  for (let option of [
    'ribbonWidth',
    'bandLength',
    'tipWidth',
    'knotWidth',
    'bowLength',
    'collarEase',
  ])
    store.set(option, measurements.neck * options[option])

  if (options.adjustmentRibbon) {
    store.set('ribbonWidth', Math.max(options.adjustmentRibbonWidth, store.get('ribbonWidth')))
  }
  const ribbon = store.get('ribbonWidth')
  store.set('knotWidth', Math.max(ribbon, store.get('knotWidth')))
  const knot = store.get('knotWidth')
  store.set('tipWidth', Math.max(knot, store.get('tipWidth')))

  // For easy access
  const tip = store.get('tipWidth')
  const band = store.get('bandLength')
  const transition = knot * options.transitionLength
  const bow = store.get('bowLength')

  // Points
  points.bandBottomLeft = new Point(0, ribbon / 2)
  points.bandTopLeft = points.bandBottomLeft.flipY()
  points.bandBottomRight = points.bandBottomLeft.shift(0, band)
  points.bandTopRight = points.bandBottomRight.flipY()

  points.transitionBottomRight = new Point(band + transition, knot / 2)
  points.transitionTopRight = points.transitionBottomRight.flipY()

  points.tip1Bottom = new Point(band + transition + 0.5 * bow, tip / 2)
  points.tip1Top = points.tip1Bottom.flipY()
  points.tip2Bottom = new Point(band + transition + 1.5 * bow, tip / 2)
  points.tip2Top = points.tip2Bottom.flipY()
  points.knotBottom = new Point(band + transition + bow, knot / 2)
  points.knotTop = points.knotBottom.flipY()

  if (options.endStyle === 'pointed' || options.endStyle === 'rounded') {
    points.tip = new Point(points.tip2Bottom.x + points.tip2Bottom.y, 0)
  } else points.tip = new Point(points.tip2Bottom.x, 0)

  points.titleAnchor = new Point(points.tip1Top.x, 0)

  // Paths
  paths.cap = new Path().hide().move(points.tip2Bottom)
  if (options.endStyle === 'straight') {
    paths.cap = new Path().move(points.tip2Bottom).line(points.tip2Top)
  } else if (options.endStyle === 'pointed') {
    paths.cap = new Path().move(points.tip2Bottom).line(points.tip).line(points.tip2Top)
  } else {
    points.roundBottom = new Point(points.tip.x, points.tip2Bottom.y)
    points.roundTop = points.roundBottom.flipY()
    macro('round', {
      from: points.tip2Bottom,
      to: points.tip,
      via: points.roundBottom,
      prefix: 'bottom',
    })
    macro('round', {
      from: points.tip,
      to: points.tip2Top,
      via: points.roundTop,
      prefix: 'top',
    })
    paths.cap = paths.bottomRounded.join(paths.topRounded)
  }

  if (options.bowStyle === 'diamond' || options.bowStyle === 'butterfly') {
    const cpl = options.bowStyle === 'diamond' ? bow / 10 : bow / 4

    points.transitionBottomRightCp2 = points.bandBottomRight.shiftOutwards(
      points.transitionBottomRight,
      cpl
    )
    if (points.transitionBottomRightCp2.y > points.tip1Bottom.y)
      points.transitionBottomRightCp2.y = points.tip1Bottom.y

    points.transitionTopRightCp1 = points.transitionBottomRightCp2.flipY()
    points.tip1TopCp2 = points.tip1Top.shift(180, cpl)
    points.tip1TopCp1 = points.tip1Top.shift(0, cpl)
    points.tip1BottomCp1 = points.tip1Bottom.shift(180, cpl)
    points.tip1BottomCp2 = points.tip1Bottom.shift(0, cpl)
    points.knotTopCp2 = points.knotTop.shift(180, cpl)
    points.knotTopCp1 = points.knotTop.shift(0, cpl)
    points.knotBottomCp2 = points.knotBottom.shift(0, cpl)
    points.knotBottomCp1 = points.knotBottom.shift(180, cpl)
    points.tip2TopCp2 = points.tip2Top.shift(180, cpl)
    points.tip2BottomCp1 = points.tip2Bottom.shift(180, cpl)

    paths.bow = new Path()
      .move(points.bandBottomRight)
      .line(points.transitionBottomRight)
      .curve(points.transitionBottomRightCp2, points.tip1BottomCp1, points.tip1Bottom)
      .curve(points.tip1BottomCp2, points.knotBottomCp1, points.knotBottom)
      .curve(points.knotBottomCp2, points.tip2BottomCp1, points.tip2Bottom)
      .join(paths.cap)
      .line(points.tip2Top)
      .curve(points.tip2TopCp2, points.knotTopCp1, points.knotTop)
      .curve(points.knotTopCp2, points.tip1TopCp1, points.tip1Top)
      .curve(points.tip1TopCp2, points.transitionTopRightCp1, points.transitionTopRight)
      .line(points.bandTopRight)
      .hide()
  } else {
    paths.bow = new Path()
      .move(points.bandBottomRight)
      .line(points.transitionBottomRight)
      .line(points.tip2Bottom)
      .join(paths.cap)
      .line(points.tip2Top)
      .line(points.transitionTopRight)
      .line(points.bandTopRight)
      .hide()
  }

  // Complete?
  if (complete) {
    points.logoAnchor = points.tip.shift(180, 20)
    snippets.logo = new Snippet('logo', points.logoAnchor).attr('data-scale', tip / 120)

    // Paperless?
    if (paperless) {
      let baseY = points.tip2Bottom.y + sa
      macro('hd', {
        from: points.knotBottom,
        to: points.tip2Bottom,
        y: baseY,
      })
      baseY += 15
      if (options.bowStyle === 'butterfly' || options.bowStyle === 'diamond') {
        macro('hd', {
          from: points.tip1Bottom,
          to: points.tip2Bottom,
          y: baseY,
        })
        baseY += 15
        macro('vd', {
          from: points.tip1Bottom,
          to: points.tip1Top,
        })
      }
      macro('hd', {
        from: points.transitionBottomRight,
        to: points.tip2Bottom,
        y: baseY,
      })
      baseY += 15
      macro('hd', {
        from: points.bandBottomRight,
        to: points.tip2Bottom,
        y: baseY,
      })
      baseY += 15
      store.set('baseY', baseY)

      macro('vd', {
        from: points.bandBottomRight,
        to: points.bandTopRight,
      })
      macro('vd', {
        from: points.transitionBottomRight,
        to: points.transitionTopRight,
      })
      macro('vd', {
        from: points.tip2Bottom,
        to: points.tip2Top,
        x: points.tip.x + 15 + sa,
      })
      if (options.endStyle !== 'straight') {
        macro('hd', {
          from: points.tip2Bottom,
          to: points.tip,
          y: points.tip2Bottom.y + 15 + sa,
        })
      }
    }
  }

  return part
}

export const base = {
  name: 'benjamin.base',
  hide: { self: true },
  measurements: ['neck'],
  options: {
    // Static options
    transitionLength: 2, //Twice the knot
    bandLength: 0.17,
    adjustmentRibbonWidth: 20,
    // Fit options
    collarEase: { pct: 3, min: 0, max: 6, menu: 'fit' },
    adjustmentRibbon: { bool: false, menu: 'fit' },
    // Style options
    tipWidth: { pct: 15, min: 0, max: 20, menu: 'style' },
    knotWidth: { pct: 7, min: 5, max: 10, menu: 'style' },
    bowLength: { pct: 28, min: 23, max: 33, menu: 'style' },
    bowStyle: {
      dflt: 'butterfly',
      list: ['diamond', 'butterfly', 'square', 'widesquare'],
      menu: 'style',
    },
    endStyle: {
      dflt: 'straight',
      list: ['straight', 'pointed', 'rounded'],
      menu: 'style',
    },
    ribbonWidth: { pct: 6, min: 5, max: 8, menu: 'style' },
  },
  plugins: [pluginBundle],
  draft: draftBenjaminBase,
}
