import { lowerTeeth } from './lowerTeeth.mjs'
import { upperTeeth } from './upperTeeth.mjs'

function draftHiMouth({
  store,
  sa,
  Point,
  points,
  Path,
  paths,
  Snippet,
  snippets,
  options,
  complete,
  paperless,
  macro,
  part,
}) {
  const mouth01_02d = 141.93684055893488 * options.size
  const mouth01_02a = 312.8254216093024
  const mouth01_03d = 42.496 * options.size
  const mouth01_03a = 270
  const mouth01cp1d = 38.6204 * options.size
  const mouth01cp1a = 0
  const mouth02cp1d = 59.58739935676417 * options.size
  const mouth02cp2d = 73.53520117766728 * options.size
  const mouth02cp1a = 128.07726051101747
  const mouth02cp2a = 95.21339058299296
  const mouth03cp2d = 33.142 * options.size
  const mouth03cp2a = 0

  points.mouth01 = new Point(0, 0)
  points.mouth02 = points.mouth01.shift(mouth01_02a, mouth01_02d)
  points.mouth03 = points.mouth01.shift(mouth01_03a, mouth01_03d)

  points.mouth01cp1 = points.mouth01.shift(mouth01cp1a, mouth01cp1d)
  points.mouth02cp1 = points.mouth02.shift(mouth02cp1a, mouth02cp1d)
  points.mouth02cp2 = points.mouth02.shift(mouth02cp2a, mouth02cp2d)
  points.mouth03cp2 = points.mouth03.shift(mouth03cp2a, mouth03cp2d)

  points.mouth04 = points.mouth02.flipX()

  points.mouth01cp2 = points.mouth01cp1.flipX()
  points.mouth04cp2 = points.mouth02cp1.flipX()
  points.mouth04cp1 = points.mouth02cp2.flipX()
  points.mouth03cp1 = points.mouth03cp2.flipX()

  paths.aboveMouth = new Path()
    .move(points.mouth02)
    .curve(points.mouth02cp2, points.mouth01cp1, points.mouth01)
    .curve(points.mouth01cp2, points.mouth04cp1, points.mouth04)
    .attr('data-text-class', 'text-xs')
  paths.belly = new Path()
    .move(points.mouth04)
    .curve(points.mouth04cp2, points.mouth03cp1, points.mouth03)
    .curve(points.mouth03cp2, points.mouth02cp1, points.mouth02)
    .attr('data-text-class', 'text-xs')
  paths.seam = new Path().move(points.mouth02).join(paths.aboveMouth).join(paths.belly).close()

  store.set(
    'mouthTopLength',
    new Path()
      .move(points.mouth01)
      .curve(points.mouth01cp1, points.mouth02cp2, points.mouth02)
      .length()
  )
  store.set(
    'mouthBottomLength',
    new Path()
      .move(points.mouth03)
      .curve(points.mouth03cp1, points.mouth04cp2, points.mouth04)
      .length()
  )

  // Complete?
  if (complete) {
    points.mouthUpperTeeth1 = new Path()
      .move(points.mouth01)
      .curve(points.mouth01cp1, points.mouth02cp2, points.mouth02)
      .shiftAlong(store.get('upperTeethLength') / 2)
    points.mouthUpperTeeth2 = new Path()
      .move(points.mouth01)
      .curve(points.mouth01cp2, points.mouth04cp1, points.mouth04)
      .shiftAlong(store.get('upperTeethLength') / 2)
    snippets.mouthUpperTeeth1 = new Snippet('bnotch', points.mouthUpperTeeth1)
    snippets.mouthUpperTeeth2 = new Snippet('bnotch', points.mouthUpperTeeth2)
    points.mouthlowerTeeth1 = new Path()
      .move(points.mouth03)
      .curve(points.mouth03cp1, points.mouth04cp2, points.mouth04)
      .shiftAlong(store.get('lowerTeethLength') / 2)
    points.mouthlowerTeeth2 = new Path()
      .move(points.mouth03)
      .curve(points.mouth03cp2, points.mouth02cp1, points.mouth02)
      .shiftAlong(store.get('lowerTeethLength') / 2)
    snippets.mouthlowerTeeth1 = new Snippet('bnotch', points.mouthlowerTeeth1)
    snippets.mouthlowerTeeth2 = new Snippet('bnotch', points.mouthlowerTeeth2)
    snippets.mouthMidTop = new Snippet('bnotch', points.mouth01)
    snippets.mouthMidBottom = new Snippet('bnotch', points.mouth03)

    macro('banner', {
      path: paths.aboveMouth,
      text: 'aboveMouth',
      dy: 0,
      spaces: 4,
      repeat: 6,
    })
    macro('banner', {
      path: paths.belly,
      text: 'belly',
      dy: 0,
      spaces: 4,
      repeat: 6,
    })

    points.titleAnchor = points.mouth01.shiftFractionTowards(points.mouth02, 0.33)
    points.logoAnchor = points.mouth01.shiftFractionTowards(points.mouth04, 0.3)

    snippets.logo = new Snippet('logo', points.logoAnchor).attr(
      'data-scale',
      (options.size > 1 ? 1 : options.size) / 2
    )

    macro('title', {
      at: points.titleAnchor,
      nr: 4,
      title: 'mouth',
      scale: (options.size > 1 ? 1 : options.size) / 2,
    })

    if (paperless) {
      macro('hd', {
        from: points.mouth03,
        to: points.mouth02,
        y: points.mouth02.y + sa + 10,
      })
      macro('hd', {
        from: points.mouth04,
        to: points.mouth03,
        y: points.mouth02.y + sa + 10,
      })
      macro('vd', {
        from: points.mouth04,
        to: points.mouth03,
        x: points.mouth04.x - sa - 10,
      })
      macro('vd', {
        from: points.mouth03,
        to: points.mouth01,
        x: points.mouth04.x - sa - 10,
      })
    }
    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  return part
}

export const mouth = {
  name: 'hi.mouth',
  after: [lowerTeeth, upperTeeth],
  draft: draftHiMouth,
}
