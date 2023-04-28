import { front } from './front.mjs'
import { back } from './back.mjs'

function draftCarltonTail({
  units,
  paperless,
  sa,
  store,
  complete,
  points,
  macro,
  Point,
  paths,
  Path,
  part,
}) {
  let length = store.get('waistToHem') - store.get('beltWidth') / 2

  points.cbTop = new Point(0, 0)
  points.fold1Top = points.cbTop.shift(0, store.get('cbToDart') / 2)
  points.fold2Top = points.cbTop.shift(0, store.get('cbToDart'))
  points.fold3Top = points.cbTop.shift(0, store.get('cbToDart') * 2)
  points.fold4Top = points.fold3Top.shift(0, store.get('cbToDart') / 2)
  points.fold5Top = points.fold4Top.shift(0, store.get('cbToDart') / 2)
  points.waistTop = points.fold5Top.shift(0, store.get('dartToSide'))

  // 12cm will do as we're just drawing a rectangle.
  // But check that lenght > 12cm because doll clothes.
  let drawnLength = length < 120 ? length : 120

  for (let i of ['cb', 'fold1', 'fold2', 'fold3', 'fold4', 'fold5', 'waist']) {
    points[i + 'Bottom'] = points[i + 'Top'].shift(-90, drawnLength)
    if (i === 'cb' || i === 'waist') {
      points[i + 'MidTop'] = points[i + 'Top'].shift(-90, drawnLength * 0.4)
      points[i + 'MidBottom'] = points[i + 'Top'].shift(-90, drawnLength * 0.6)
    }
  }

  paths.seam = new Path()
    .move(points.cbTop)
    .line(points.cbMidTop)
    .move(points.cbMidBottom)
    .line(points.cbBottom)
    .line(points.waistBottom)
    .line(points.waistMidBottom)
    .move(points.waistMidTop)
    .line(points.waistTop)
    .line(points.cbTop)
    .attr('class', 'fabric')

  paths.folds = new Path()
    .move(points.fold1Top)
    .line(points.fold1Bottom)
    .move(points.fold2Top)
    .line(points.fold2Bottom)
    .move(points.fold3Top)
    .line(points.fold3Bottom)
    .move(points.fold4Top)
    .line(points.fold4Bottom)
    .attr('class', 'lashed')

  paths.hint = new Path()
    .move(points.cbMidTop)
    .line(points.cbMidBottom)
    .move(points.waistMidBottom)
    .line(points.waistMidTop)
    .move(points.fold5Top)
    .line(points.fold5Bottom)
    .attr('class', 'fabric dashed')

  store.cutlist.addCut()
  store.cutlist.addCut({ material: 'lining' })

  if (complete) {
    points.title = points.fold4Top.shiftFractionTowards(points.waistBottom, 0.5)
    macro('title', {
      at: points.title,
      nr: 5,
      title: 'tail',
    })

    macro('grainline', {
      from: points.fold2Bottom.shift(0, 10),
      to: points.fold2Top.shift(0, 10),
    })

    if (sa) paths.sa = paths.seam.offset(sa).close().attr('class', 'fabric sa')
    macro('vd', {
      from: points.fold4Bottom.shift(0, 15),
      to: points.fold4Top.shift(0, 15),
      text: units(length),
    })

    if (paperless) {
      macro('hd', {
        from: points.cbBottom,
        to: points.fold1Bottom,
        y: points.cbBottom.y + sa + 15,
      })
      macro('hd', {
        from: points.fold1Bottom,
        to: points.fold2Bottom,
        y: points.cbBottom.y + sa + 15,
      })
      macro('hd', {
        from: points.fold2Bottom,
        to: points.fold3Bottom,
        y: points.cbBottom.y + sa + 15,
      })
      macro('hd', {
        from: points.fold3Bottom,
        to: points.fold4Bottom,
        y: points.cbBottom.y + sa + 15,
      })
      macro('hd', {
        from: points.fold4Bottom,
        to: points.fold5Bottom,
        y: points.cbBottom.y + sa + 15,
      })
      macro('hd', {
        from: points.fold5Bottom,
        to: points.waistBottom,
        y: points.cbBottom.y + sa + 15,
      })
      macro('hd', {
        from: points.cbBottom,
        to: points.waistBottom,
        y: points.cbBottom.y + sa + 30,
      })
    }
  }

  return part
}

export const tail = {
  name: 'carlton.tail',
  after: [front, back],
  draft: draftCarltonTail,
}
