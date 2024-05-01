import { bib } from './bib.mjs'

function draftBibPlacket({
  options,
  absoluteOptions,
  Point,
  Path,
  points,
  paths,
  macro,
  part,
  store,
  scale,
}) {
  if (options.bibPlacketLayers <= 0) return part.hide()

  const bibPlacketLengthTop = store.get('bibPlacketLengthTop') / 2
  const bibPlacketLengthBottom = store.get('bibPlacketLengthBottom') / 2

  points.topRight = new Point(
    bibPlacketLengthTop,
    (-absoluteOptions.bibPlacketWidth * options.bibPlacketLayers) / 2
  )
  points.topLeft = points.topRight.flipX()
  points.bottomRight = points.topRight.flipY()
  if (options.bibPlacketLayers % 2) points.bottomRight.x = bibPlacketLengthBottom
  points.bottomLeft = points.bottomRight.flipX()

  for (let i = 1; i < options.bibPlacketLayers; i++) {
    points[`fold${i}Left`] = points.topLeft.shiftFractionTowards(
      points.bottomLeft,
      i / options.bibPlacketLayers
    )
    i % 2
      ? (points[`fold${i}Left`].x = -bibPlacketLengthBottom)
      : (points[`fold${i}Left`].x = -bibPlacketLengthTop)
    points[`fold${i}Right`] = points.topRight.shiftFractionTowards(
      points.bottomRight,
      i / options.bibPlacketLayers
    )
    i % 2
      ? (points[`fold${i}Right`].x = bibPlacketLengthBottom)
      : (points[`fold${i}Right`].x = bibPlacketLengthTop)
    paths[`fold${i}`] = new Path()
      .move(points[`fold${i}Left`])
      .line(points[`fold${i}Right`])
      .setClass('fabric dashed')
      .addText('opal:fold', 'center')
  }

  paths.seam = new Path().move(points.topRight).line(points.topLeft)
  for (let i = 1; i < options.bibPlacketLayers; i++) {
    paths.seam.line(points[`fold${i}Left`])
  }
  paths.seam.line(points.bottomLeft).line(points.bottomRight)
  for (let i = options.bibPlacketLayers - 1; i > 0; i--) {
    paths.seam.line(points[`fold${i}Right`])
  }
  paths.seam.line(points.topRight).close().setClass('fabric')

  if (options.bibPlacketLayers == 1) {
    points.fold1Left = points.bottomLeft
    points.fold1Right = points.bottomRight
  }

  macro('hd', {
    id: 'wTop',
    from: points.topLeft,
    to: points.topRight,
    y: points.topLeft.y - 15,
  })
  macro('hd', {
    id: 'wDifference',
    from: points.fold1Left,
    to: points.topLeft,
    y: points.topLeft.y - 15,
    noStartMarker: true,
    noEndMarker: true,
  })
  macro('hd', {
    id: 'wBottom',
    from: points.fold1Left,
    to: points.fold1Right,
    y: points.topLeft.y - 30,
  })
  macro('vd', {
    id: 'hSingleFold',
    from: points.topLeft,
    to: points.fold1Left,
    x: points.fold1Left.x - 15,
  })
  macro('vd', {
    id: 'hAllFolds',
    from: points.topLeft,
    to: points.bottomLeft,
    x: points.fold1Left.x - 30,
  })

  points.grainlineTop = points.bottomLeft.shiftFractionTowards(points.topRight, 1 / 16)
  points.grainlineBottom = points.grainlineTop.flipX()

  macro('grainline', {
    from: points.grainlineTop,
    to: points.grainlineBottom,
  })

  store.cutlist.addCut({ cut: 1, from: 'fabric' })

  points.title = new Point(scale * 30, scale * 15)
  macro('title', { at: points.title, nr: 12, title: 'opal:bibPlacket', scale: 0.75 })

  return part
}

export const bibPlacket = {
  name: 'bibPlacket',
  draft: draftBibPlacket,
  after: bib,
}
