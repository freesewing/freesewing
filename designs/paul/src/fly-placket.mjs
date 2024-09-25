import { flyFacing } from './fly-facing.mjs'

function draftPaulFlyPlacket({
  points,
  paths,
  Point,
  Path,
  Snippet,
  macro,
  options,
  snippets,
  store,
  sa,
  part,
}) {
  if (options.flyStyle !== 'buttons' && options.flyStyle !== 'visibleButtons') {
    return part.hide()
  }

  macro('mirror', {
    mirror: [points.styleWaistIn, points.flyBottom],
    points: ['flyTop', 'flyCurveStart', 'flyCurveCp2', 'flyCurveCp1'],
  })
  macro('rmgrainline')

  let topStitchDist = (1 - options.flyWidth) * 8

  points.top = points.styleWaistIn.translate(options.placketOffset, 0)
  points.bottom = points.flyBottom.translate(options.placketOffset, 0)

  points.upperCenter = points.styleWaistIn
    .shiftFractionTowards(points.mirroredFlyTop, 0.5)
    .shiftTowards(points.styleWaistIn, topStitchDist / 2)
  points.lowerCenter = points.flyExtensionBottom
    .shiftFractionTowards(points.mirroredFlyCurveStart, 0.5)
    .shiftTowards(points.flyBottom, topStitchDist / 2)
  points.upperButton = points.upperCenter
  points.lowerButton = new Point(points.upperButton.x, points.lowerCenter.y)

  let buttons = options.buttons * 1
  for (let i = 0; i < buttons; i++) {
    let frac = (i + 0.5) / buttons
    points['button' + i] = points.upperButton.shiftFractionTowards(points.lowerButton, frac)
    snippets['button' + i] = new Snippet('buttonhole', points['button' + i])
      .attr('data-scale', 1.5)
      .attr('data-rotate', 90)
  }

  if (options.flyStyle !== 'buttons') {
    return part.hide()
  }

  paths.seam = new Path()
    .move(points.bottom)
    .curve(points.mirroredFlyCurveCp1, points.mirroredFlyCurveCp2, points.mirroredFlyCurveStart)
    .line(points.mirroredFlyTop)
    .line(points.top)
    .close()
    .addClass('fabric')

  if (sa)
    paths.sa = new Path()
      .move(points.mirroredFlyTop)
      .line(points.mirroredFlyTop.translate(0, -sa))
      .line(points.top.translate(0, -sa))
      // .line(points.flyTop.translate(0, -sa))
      .line(points.top)
      .addClass('fabric sa')

  // if (complete) {
  //   paths.fold = new Path()
  //     .move(points.styleWaistIn)
  //     .line(points.flyBottom)
  //     .attr('class', 'fabric help')
  // }

  /*
   * Annotations
   */
  // Cut list
  store.cutlist.setCut({ cut: 1, from: 'fabric', onFold: true })

  // Cut on fold
  macro('cutonfold', {
    from: points.top,
    to: points.bottom,
    grainline: true,
    offset: 10,
  })

  // Title
  points.titleAnchor = points.upperCenter.shiftFractionTowards(points.lowerCenter, 0.5)
  macro('title', {
    at: points.titleAnchor,
    nr: 10,
    title: 'flyPlacket',
    align: 'center',
    scale: 0.5,
  })

  macro('bartackAlong', {
    path: new Path()
      .move(points.bottom)
      .curve(points.mirroredFlyCurveCp1, points.mirroredFlyCurveCp2, points.mirroredFlyCurveStart)
      .line(points.mirroredFlyTop)
      .offset(-2.5),
    width: 5,
    density: 1,
  })

  macro('vd', {
    id: 'vRight',
    from: points.top,
    to: points.bottom,
    x: points.top.x - 10,
  })
  macro('hd', {
    id: 'hTop',
    from: points.top,
    to: points.mirroredFlyTop,
    y: points.mirroredFlyTop.y - 10,
  })

  return part
}

export const flyPlacket = {
  name: 'paul.flyPlacket',
  from: flyFacing,
  options: {
    buttons: {
      count: 3,
      min: 1,
      max: 5,
      menu: (_, mergedOptions) => (mergedOptions.flyStyle !== 'zipper' ? 'construction' : false),
    },
    flyStyle: {
      dflt: 'buttons',
      list: ['buttons', 'visibleButtons', 'zipper'],
      menu: 'construction',
    },
    placketOffset: 1.5,
  },
  draft: draftPaulFlyPlacket,
}
