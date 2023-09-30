import { back } from './back.mjs'
import { sleevePlacketLength } from './options.mjs'

function simonSleevePlacketUnderlap({
  measurements,
  sa,
  Point,
  points,
  Path,
  paths,
  Snippet,
  snippets,
  complete,
  macro,
  options,
  store,
  part,
}) {
  const width = Math.min(store.get('sleevePlacketWidth') / 2, 10)
  const length = measurements.shoulderToWrist * options.sleevePlacketLength

  points.midLeft = new Point(0, 0)
  points.midRight = points.midLeft.shift(0, length)
  points.fold1Left = points.midLeft.shift(90, width)
  points.fold2Left = points.midLeft.shift(-90, width)
  points.fold1Right = points.fold1Left.shift(0, length)
  points.fold2Right = points.fold2Left.shift(0, length)
  points.topLeft = points.midLeft.shift(90, width * 2 - 1.5)
  points.topRight = points.midRight.shift(90, width * 2 - 1.5)
  points.bottomLeft = points.midLeft.shift(-90, width * 2 - 1.5)
  points.bottomRight = points.midRight.shift(-90, width * 2 - 1.5)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.topRight)
    .line(points.bottomRight)
    .line(points.bottomLeft)
    .close()
    .attr('class', 'fabric')

  if (complete)
    paths.folds = new Path()
      .move(points.fold1Left)
      .line(points.fold1Right)
      .move(points.fold2Left)
      .line(points.fold2Right)
      .move(points.midLeft)
      .line(points.midRight)
      .attr('class', 'help')

  if (sa)
    paths.sa = new Path()
      .move(points.bottomLeft)
      .line(points.bottomLeft.shift(180, sa))
      .line(points.topLeft.shift(180, sa))
      .line(points.topLeft)
      .addClass('fabric sa')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 2, from: 'fabric' })

  // Title
  points.title = new Point(length / 8, 0)
  macro('title', {
    at: points.title,
    nr: 9,
    title: 'sleevePlacketUnderlap',
    scale: 0.5,
    append: true,
  })

  // Button
  points.button = new Point(length / 2, width / 2)
  snippets.button = new Snippet('button', points.button)

  // Dimensions
  macro('vd', {
    id: 'wBetweenFolds',
    from: points.fold2Right,
    to: points.fold1Right,
    x: points.topRight.x + 15,
  })
  macro('vd', {
    id: 'hFull',
    from: points.bottomRight,
    to: points.topRight,
    x: points.topRight.x + 30,
  })
  if (complete)
    macro('hd', {
      id: 'wToButton',
      from: points.bottomLeft,
      to: points.button,
      y: points.bottomRight.y + 15,
    })

  macro('hd', {
    id: 'wFull',
    from: points.bottomLeft,
    to: points.bottomRight,
    y: points.bottomRight.y + 30,
  })

  return part
}

export const sleevePlacketUnderlap = {
  name: 'simon.sleevePlacketUnderlap',
  after: back,
  options: {
    sleevePlacketLength,
  },
  draft: simonSleevePlacketUnderlap,
}
