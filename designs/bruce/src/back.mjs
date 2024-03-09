import { init } from './init.mjs'

function draftBruceBack({
  store,
  sa,
  Point,
  points,
  Path,
  paths,
  Snippet,
  snippets,
  complete,
  macro,
  utils,
  part,
}) {
  // Initialize
  init(part)

  // Center back
  points.zero = new Point(0, 0)
  points.center = points.zero.shift(90, store.get('rise'))

  // Side top
  points.sideRight = new Point(store.get('hipsBack') / 2, points.center.y)

  // Gusset
  points.gussetTop = points.center.shift(-90, store.get('riseLength'))
  points.gussetBottom = points.gussetTop.shift(-90, store.get('gusset') + store.get('legBonus'))
  points.gussetRight = points.gussetBottom.shift(0, (store.get('gusset') * store.get('xScale')) / 2)
  points.gussetCpRight = new Point(points.gussetRight.x, points.gussetTop.y)

  // Find leg edge
  let isect = utils.circlesIntersect(
    points.gussetRight,
    store.get('legBack'),
    points.sideRight,
    store.get('fullLength')
  )
  points.legRight = isect[1]
  points.legLeft = points.legRight.flipX(points.center)

  // Store back seam length and (half of the) crotch seam length
  store.set('backSeamLength', points.sideRight.dist(points.legRight))
  store.set(
    'crotchSeamLength',
    new Path()
      .move(points.gussetTop)
      .curve(points.gussetCpRight, points.gussetRight, points.gussetRight)
      .length()
  )

  // Handle back rise
  points.center = points.center.shift(90, store.get('backRise'))
  points.sideRight = points.sideRight.shift(90, store.get('sideRise'))
  points.centerCpRight = new Point(points.sideRight.x / 2, points.center.y)
  points.centerCpLeft = points.centerCpRight.flipX()

  paths.seam = new Path()
    .move(points.gussetTop)
    .curve(points.gussetCpRight, points.gussetRight, points.gussetRight)
    .line(points.legRight)
    .line(points.sideRight)
    .curve(points.sideRight, points.centerCpRight, points.center)
    .line(points.gussetTop)
    .close()
    .attr('class', 'fabric')

  if (sa) {
    let sa1 = new Path()
      .move(points.legRight)
      .line(points.sideRight)
      .curve(points.sideRight, points.centerCpRight, points.center)
      .offset(sa)
    let sa2 = new Path()
      .move(points.gussetTop)
      .curve(points.gussetCpRight, points.gussetRight, points.gussetRight)
      .offset(sa)
    let hemSa = new Path()
      .move(points.gussetRight)
      .line(points.legRight)
      .offset(sa * 2)
    paths.sa = new Path()
      .move(points.gussetTop)
      .line(sa2.start())
      .join(sa2)
      .join(hemSa)
      .join(sa1)
      .line(points.center)
      .attr('class', 'fabric sa')
  }

  /*
   * Annotations
   */
  // Cut list
  store.cutlist.addCut({ cut: 1, from: 'fabric', onFold: true })

  // Title
  points.title = new Point(points.sideRight.x * 0.6, points.gussetTop.y * 0.6)
  macro('title', {
    at: points.title,
    nr: 1,
    title: 'back',
  })

  // Cut on fold
  macro('cutonfold', {
    from: points.center,
    to: points.gussetTop,
    grainline: true,
  })

  // Logo
  snippets.logo = new Snippet('logo', points.title.shift(90, 50))
  snippets.backNotch = new Snippet(
    'bnotch',
    points.sideRight.shiftFractionTowards(points.legRight, 0.5)
  )

  if (complete) {
    paths.sideNote = new Path().move(points.legRight).line(points.sideRight).addClass('hidden')
    macro('banner', {
      id: 'side',
      path: paths.sideNote,
      text: '&',
      classes: 'text-sm fill-note center',
    })
    paths.gussetNote = new Path()
      .move(points.gussetTop)
      .curve_(points.gussetCpRight, points.gussetRight)
      .addClass('hidden')
    macro('banner', {
      id: 'gusset',
      path: paths.gussetNote,
      text: '*',
      classes: 'text-sm fill-note center',
    })
  }

  // Dimensions
  macro('vd', {
    id: 'hCbCrotchToCbWaist',
    from: points.gussetTop,
    to: points.center,
    x: points.center.x - 15,
  })
  macro('vd', {
    id: 'hFull',
    from: points.gussetRight,
    to: points.center,
    x: points.center.x - 30,
  })
  macro('vd', {
    id: 'hSideHemToSideWaist',
    from: points.legRight,
    to: points.sideRight,
    x: points.legRight.x + 15 + sa,
  })
  macro('vd', {
    id: 'hSideHemToCbWaist',
    from: points.legRight,
    to: points.center,
    x: points.legRight.x + 30 + sa,
  })
  macro('hd', {
    id: 'wCbWaistToSideWaist',
    from: points.center,
    to: points.sideRight,
    y: points.center.y - 15 - sa,
  })
  macro('hd', {
    id: 'wCbCrotchToInnerLeg',
    from: points.gussetTop,
    to: points.gussetRight,
    y: points.gussetRight.y + 15 + sa * 2,
  })
  macro('hd', {
    id: 'wFull',
    from: points.gussetTop,
    to: points.legRight,
    y: points.gussetRight.y + 30 + sa * 2,
  })
  macro('ld', {
    id: 'lLegOpening',
    from: points.gussetRight,
    to: points.legRight,
    d: -15 - sa * 2,
  })

  return part
}

export const back = {
  name: 'bruce.back',
  measurements: ['hips', 'upperLeg', 'waistToHips', 'waistToUpperLeg'],
  options: {
    // Constants
    /* Ratio of different parts at the hips */
    hipRatioFront: 0.245,
    hipRatioBack: 0.315,
    /** Ratio of different parts at the legs */
    legRatioInset: 0.3,
    legRatioBack: 0.32,
    /** Gusset widht in relation to waist = 6.66% */
    gussetRatio: 0.0666,
    /** Part of crotch seam length that is attached
     * to the inset (rest goes in the tusks) */
    gussetInsetRatio: 0.6,
    /** Height distribution between inset and front */
    heightRatioInset: 0.65,
    // Degrees
    bulge: { deg: 20, min: 0, max: 40, menu: 'fit' },
    // Percentages
    legBonus: { pct: 0, min: -10, max: 20, menu: 'style' },
    rise: { pct: 10, min: 0, max: 25, menu: 'style' },
    stretch: { pct: 15, min: 5, max: 25, menu: 'fit' },
    legStretch: { pct: 40, min: 25, max: 45, menu: 'fit' },
    backRise: { pct: 5, min: 0, max: 10, menu: 'fit' },
  },
  draft: draftBruceBack,
}
