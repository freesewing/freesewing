import { back } from './back.mjs'

function draftCharlieBackPocketBag({
  points,
  Point,
  paths,
  Path,
  complete,
  store,
  macro,
  snippets,
  Snippet,
  sa,
  part,
}) {
  points.leftNotch = new Point(store.get('backPocketWidth') / -2, 0)
  points.rightNotch = points.leftNotch.flipX()
  points.waistbandLeft = new Point(points.leftNotch.x, store.get('backPocketToWaistband') * -1)
  points.waistbandRight = points.waistbandLeft.flipX()
  points.curveStartLeft = new Point(points.leftNotch.x * 1.2, points.leftNotch.y)
  points.curveStartRight = points.curveStartLeft.flipX()
  points.cpLeft = points.curveStartLeft.shift(90, store.get('backPocketToWaistband') / 2)
  points.cpRight = points.cpLeft.flipX()
  points.foldLeft = new Point(
    points.curveStartLeft.x,
    points.leftNotch.y + store.get('backPocketDepth')
  )
  points.foldRight = points.foldLeft.flipX()
  points.bottomLeft = new Point(
    points.curveStartLeft.x,
    points.foldLeft.y + store.get('backPocketDepth')
  )
  points.bottomRight = points.bottomLeft.flipX()

  // Anchor for sampling/grid
  points.anchor = points.waistbandLeft.shiftFractionTowards(points.waistbandRight, 0.5)

  paths.seam = new Path()
    .move(points.waistbandRight)
    .line(points.waistbandLeft)
    ._curve(points.cpLeft, points.curveStartLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.curveStartRight)
    .curve_(points.cpRight, points.waistbandRight)
    .close()
    .addClass('lining')

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'lining sa')

  if (complete) {
    paths.opening = new Path()
      .move(points.leftNotch)
      .line(points.rightNotch)
      .addClass('note dashed')
    paths.fold = new Path().move(points.foldLeft).line(points.foldRight).addClass('lining help')
  }

  /*
   * Annotations
   */
  // Cut list
  store.cutlist.setCut({ cut: 2, from: 'lining' })

  // Title
  points.titleAnchor = points.rightNotch.shiftFractionTowards(points.foldLeft, 0.5)
  macro('title', {
    at: points.titleAnchor,
    nr: 5,
    title: 'backPocketBag',
  })

  // Logo
  points.logoAnchor = points.foldLeft.shiftFractionTowards(points.bottomRight, 0.5)
  snippets.logo = new Snippet('logo', points.logoAnchor)

  // Grainline
  points.grainlineTop = points.waistbandLeft.shiftFractionTowards(points.waistbandRight, 0.15)
  points.grainlineBottom = new Point(points.grainlineTop.x, points.bottomLeft.y)
  macro('grainline', {
    from: points.grainlineTop,
    to: points.grainlineBottom,
  })

  // Dimensions
  macro('hd', {
    id: 'wFull',
    from: points.bottomLeft,
    to: points.bottomRight,
    y: points.bottomLeft.y + 15,
  })
  macro('vd', {
    id: 'hToFold',
    from: points.bottomRight,
    to: points.foldRight,
    x: points.foldRight.x + 15,
  })
  macro('vd', {
    id: 'hToOpenning',
    from: points.bottomRight,
    to: points.rightNotch,
    x: points.foldRight.x + 30,
  })
  macro('vd', {
    id: 'hFull',
    from: points.bottomRight,
    to: points.waistbandRight,
    x: points.foldRight.x + 45,
  })
  macro('hd', {
    id: 'wtop',
    from: points.waistbandLeft,
    to: points.waistbandRight,
    y: points.waistbandLeft.y - sa - 15,
  })

  return part
}

export const backPocketBag = {
  name: 'charlie.backPocketBag',
  after: back,
  draft: draftCharlieBackPocketBag,
}
