import { init } from './init.mjs'
import { back } from './back.mjs'

function draftBruceInset({
  store,
  sa,
  Point,
  points,
  Path,
  paths,
  complete,
  macro,
  Snippet,
  snippets,
  part,
}) {
  // Initialize
  init(part)

  // height is 73.5%
  points.topLeft = new Point(0, 0)
  points.bottomLeft = points.topLeft.shift(-90, store.get('heightInset'))
  points.bottomRight = new Point(store.get('legInset'), points.bottomLeft.y)
  points.tip = new Point(points.bottomRight.x * 1.111, points.bottomRight.y - store.get('gusset'))
  points.tip = points.bottomRight.shiftTowards(
    points.tip,
    store.get('crotchSeamLength') - store.get('gusset') * (1 - store.get('gussetInsetRatio'))
  )
  points.tipCpTop = new Point(store.get('gusset') * 1.2, 0)
  points.tipCpBottom = points.tip.shift(
    points.bottomRight.angle(points.tip) + 90,
    store.get('gusset') * 1.5
  )

  // Store cuve length
  store.set(
    'curve',
    new Path().move(points.tip).curve(points.tipCpBottom, points.tipCpTop, points.topLeft).length()
  )

  // Path
  paths.saBase = new Path()
    .move(points.bottomRight)
    .line(points.tip)
    .curve(points.tipCpBottom, points.tipCpTop, points.topLeft)
    .line(points.bottomLeft)
    .hide()
  paths.hemBase = new Path().move(points.bottomLeft).line(points.bottomRight).hide()
  paths.seam = paths.saBase.join(paths.hemBase).close().attr('class', 'fabric')

  if (sa)
    paths.sa = paths.saBase
      .offset(sa)
      .join(paths.hemBase.offset(sa * 2))
      .close()
      .attr('class', 'fabric sa')

  /*
   * Annotations
   */

  // Cut list
  store.cutlist.addCut({ cut: 2, from: 'fabric' })

  // Title
  points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
  macro('title', {
    at: points.title.shift(-90, 15),
    nr: 4,
    title: 'inset',
  })

  // Grainline
  macro('grainline', {
    from: points.bottomLeft.shift(0, 15),
    to: points.topLeft.shift(0, 15),
  })

  // Notches
  snippets.notch = new Snippet(
    'notch',
    new Path()
      .move(points.tip)
      .curve(points.tipCpBottom, points.tipCpTop, points.topLeft)
      .shiftFractionAlong(0.5)
  )

  if (complete) {
    paths.sideNote = new Path().move(points.bottomLeft).line(points.topLeft).addClass('hidden')
    paths.gussetNote = new Path().move(points.bottomRight).line(points.tip).addClass('hidden')
    paths.curveNote = new Path()
      .move(points.tip)
      .curve(points.tipCpBottom, points.tipCpTop, points.topLeft)
      .addClass('hidden')
    macro('banner', {
      id: 'side',
      path: paths.sideNote,
      text: '#',
      dy: 7,
      classes: 'text-sm fill-note center',
    })
    macro('banner', {
      id: 'gusset',
      path: paths.gussetNote,
      text: '*',
      classes: 'text-sm fill-note center',
    })
    macro('banner', {
      id: 'curve',
      path: paths.curveNote,
      text: '~',
      classes: 'text-sm fill-note center',
    })
  }

  // Dimensions
  macro('vd', {
    id: 'hFull',
    from: points.bottomLeft,
    to: points.topLeft,
    x: points.topLeft.x - 15 - sa,
  })
  macro('vd', {
    id: 'hGusset',
    from: points.bottomRight,
    to: points.tip,
    x: points.tip.x + 15 + sa,
  })
  macro('hd', {
    id: 'wLeg',
    from: points.bottomLeft,
    to: points.bottomRight,
    y: points.bottomRight.y + 15 + sa,
  })
  macro('hd', {
    id: 'wFull',
    from: points.bottomLeft,
    to: points.tip,
    y: points.bottomRight.y + 30 + sa,
  })

  return part
}

export const inset = {
  name: 'bruce.inset',
  after: back,
  draft: draftBruceInset,
}
