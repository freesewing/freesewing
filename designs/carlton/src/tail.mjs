import { front } from './front.mjs'
import { back } from './back.mjs'

function draftCarltonTail({
  units,
  sa,
  store,
  complete,
  points,
  macro,
  Point,
  paths,
  Path,
  expand,
  part,
}) {
  const length = store.get('waistToHem') - store.get('beltWidth') / 2

  if (expand) store.flag.preset('expandIsOn')
  else {
    // Expand is on, do not draw the part but flag this to the user
    const extraSa = sa ? 2 * sa : 0
    store.flag.note({
      msg: `carlton:cutTail`,
      notes: [sa ? 'flag:saIncluded' : 'flag:saExcluded', 'flag:partHiddenByExpand'],
      replace: {
        w: units(store.get('cbToDart') * 3 + store.get('dartToSide') + extraSa),
        l: units(length + 2 * extraSa),
      },
      suggest: {
        text: 'flag:show',
        icon: 'expand',
        update: {
          settings: ['expand', 1],
        },
      },
    })
    // Also hint about expand
    store.flag.preset('expandIsOff')

    return part.hide()
  }

  points.cbTop = new Point(0, 0)
  points.fold1Top = points.cbTop.shift(0, store.get('cbToDart') / 2)
  points.fold2Top = points.cbTop.shift(0, store.get('cbToDart'))
  points.fold3Top = points.cbTop.shift(0, store.get('cbToDart') * 2)
  points.fold4Top = points.fold3Top.shift(0, store.get('cbToDart') / 2)
  points.fold5Top = points.fold4Top.shift(0, store.get('cbToDart') / 2)
  points.waistTop = points.fold5Top.shift(0, store.get('dartToSide'))

  for (let i of ['cb', 'fold1', 'fold2', 'fold3', 'fold4', 'fold5', 'waist']) {
    points[i + 'Mid'] = points[i + 'Top'].shift(-90, length / 2)
    points[i + 'Bottom'] = points[i + 'Top'].shift(-90, length)
  }

  paths.seam = new Path()
    .move(points.cbTop)
    .line(points.cbBottom)
    .line(points.waistBottom)
    .line(points.waistTop)
    .line(points.cbTop)
    .addClass('fabric')

  if (complete) {
    paths.folds = new Path()
      .move(points.fold1Top)
      .line(points.fold1Bottom)
      .move(points.fold2Top)
      .line(points.fold2Bottom)
      .move(points.fold3Top)
      .line(points.fold3Bottom)
      .move(points.fold4Top)
      .line(points.fold4Bottom)
      .addClass('fabric help')
    paths.foldEdge = new Path()
      .move(points.fold5Top)
      .line(points.fold5Bottom)
      .addClass('fabric dashed stroke-sm')
  }

  if (sa) {
    const saBase = new Path()
      .move(points.waistBottom)
      .line(points.waistTop)
      .line(points.cbTop)
      .line(points.cbBottom)
    const hemBase = new Path().move(points.cbBottom).line(points.waistBottom)
    paths.sa = saBase
      .offset(sa)
      .join(hemBase.offset(3 * sa))
      .close()
      .addClass('sa fabric')
  }

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.addCut([
    { cut: 2, from: 'fabric' },
    { cut: 2, from: 'lining' },
  ])

  // Title
  points.title = points.cbTop.shiftFractionTowards(points.waistBottom, 0.2)
  macro('title', {
    at: points.title,
    nr: 5,
    title: 'tail',
  })

  // Banner for center back
  macro('banner', {
    path: new Path().move(points.cbBottom).line(points.cbTop),
    text: 'carlton:centerBack',
    classes: 'text-sm center fill-note',
    dy: 7,
    repeat: 66,
  })

  macro('sewtogether', {
    id: 'fold1',
    from: points.cbMid,
    to: points.fold2Mid,
    text: 'foldUnderToAlign',
  })
  macro('pleat', {
    id: 'fold1',
    from: points.fold2Mid,
    to: points.cbMid,
    classes: {
      from: 'stroke-lg note',
      to: 'stroke-lg note',
    },
  })
  macro('sewtogether', {
    id: 'fold2',
    from: points.fold3Mid,
    to: points.fold5Mid,
    text: 'foldUnderToAlign',
  })
  macro('pleat', {
    id: 'fold2',
    from: points.fold3Mid,
    to: points.fold5Mid,
    margin: -35,
    classes: {
      from: 'stroke-lg note',
      to: 'stroke-lg note',
    },
  })

  // Notches
  macro('sprinkle', {
    snippet: 'bnotch',
    on: [
      'fold1Top',
      'fold2Top',
      'fold3Top',
      'fold4Top',
      'fold5Top',
      'fold1Bottom',
      'fold2Bottom',
      'fold3Bottom',
      'fold4Bottom',
      'fold5Bottom',
      'cbMid',
      'fold2Mid',
      'fold3Mid',
      'fold5Mid',
    ],
  })

  // grainline
  macro('grainline', {
    from: points.fold5Bottom.shiftFractionTowards(points.waistBottom, 0.5),
    to: points.fold5Top.shiftFractionTowards(points.waistTop, 0.5),
  })

  // Dimensions
  macro('hd', {
    id: 'wFold1',
    from: points.cbBottom,
    to: points.fold1Bottom,
    y: points.cbBottom.y + 3 * sa + 15,
  })
  macro('hd', {
    id: 'wFold2',
    from: points.cbBottom,
    to: points.fold2Bottom,
    y: points.cbBottom.y + 3 * sa + 30,
  })
  macro('hd', {
    id: 'wFold3',
    from: points.cbBottom,
    to: points.fold3Bottom,
    y: points.cbBottom.y + 3 * sa + 45,
  })
  macro('hd', {
    id: 'wFold4',
    from: points.cbBottom,
    to: points.fold4Bottom,
    y: points.cbBottom.y + 3 * sa + 60,
  })
  macro('hd', {
    id: 'wFull',
    from: points.cbBottom,
    to: points.waistBottom,
    y: points.cbBottom.y + 3 * sa + 75,
  })
  macro('vd', {
    from: points.waistBottom,
    to: points.waistTop,
    x: points.waistTop.x + sa + 15,
  })

  return part
}

export const tail = {
  name: 'carlton.tail',
  after: [front, back],
  draft: draftCarltonTail,
}
