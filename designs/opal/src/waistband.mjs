import { front } from './front.mjs'

function draftWaistband({
  options,
  absoluteOptions,
  Point,
  Path,
  points,
  paths,
  sa,
  macro,
  part,
  store,
  scale,
}) {
  const waistDist = store.get('waistDist')
  points.topRight = new Point(
    waistDist,
    (-absoluteOptions.waistbandWidth * options.waistbandLayers) / 2
  )
  points.topLeft = points.topRight.flipX()
  points.bottomRight = points.topRight.flipY()
  points.bottomLeft = points.bottomRight.flipX()

  for (let i = 1; i < options.waistbandLayers; i++) {
    points[`fold${i}Left`] = points.topLeft.shiftFractionTowards(
      points.bottomLeft,
      i / options.waistbandLayers
    )
    points[`fold${i}Right`] = points.topRight.shiftFractionTowards(
      points.bottomRight,
      i / options.waistbandLayers
    )
    paths[`fold${i}`] = new Path()
      .move(points[`fold${i}Left`])
      .line(points[`fold${i}Right`])
      .setClass('fabric dashed')
      .addText('opal:fold', 'center')
  }

  paths.seam = new Path()
    .move(points.topRight)
    .line(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .close()
    .setClass('fabric')

  points.saTopRight = points.topRight.translate(sa, 0)
  points.saTopLeft = points.topLeft.translate(-sa, 0)
  points.saBottomRight = points.bottomRight.translate(sa, 0)
  points.saBottomLeft = points.bottomLeft.translate(-sa, 0)

  if (sa) {
    paths.saRight = new Path()
      .move(points.bottomRight)
      .line(points.saBottomRight)
      .line(points.saTopRight)
      .line(points.topRight)
      .addClass('sa fabric')
    paths.saLeft = new Path()
      .move(points.bottomLeft)
      .line(points.saBottomLeft)
      .line(points.saTopLeft)
      .line(points.topLeft)
      .addClass('sa fabric')
  }

  macro('hd', {
    id: 'wWaistband',
    from: points.topLeft,
    to: points.topRight,
    y: points.topLeft.y - 15,
  })
  macro('vd', {
    id: 'hWaistband',
    from: points.topLeft,
    to: points.bottomLeft,
    x: points.topLeft.x - (sa + 15),
  })

  points.grainlineTop = points.topLeft.shiftFractionTowards(points.bottomRight, 3 / 32)
  points.grainlineBottom = points.grainlineTop.flipY()
  points.grainlineTop2 = new Point((points.topLeft.x * 15) / 16, 0)
  points.grainlineBottom2 = new Point((points.topLeft.x * 11) / 16, 0)
  points.grainText = new Point((points.topLeft.x * 13) / 16, (points.topLeft.y * 1) / 16).addText(
    'opal:grainlineEitherWay',
    'note center'
  )

  macro('grainline', {
    from: points.grainlineTop,
    to: points.grainlineBottom,
    text: null,
  })
  macro('grainline', {
    id: 'grainline2',
    from: points.grainlineTop2,
    to: points.grainlineBottom2,
    text: null,
  })

  store.cutlist.addCut({ cut: 1, from: 'fabric' })

  points.title = new Point(scale * 30, scale * 5)
  macro('title', { at: points.title, nr: 11, title: 'opal:waistband', scale: 0.75 })

  return part
}

export const waistband = {
  name: 'waistband',
  draft: draftWaistband,
  after: front,
}
