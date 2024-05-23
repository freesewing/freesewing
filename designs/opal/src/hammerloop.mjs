import { back } from './back.mjs'

function draftHammerLoop({ options, Point, Path, points, paths, sa, macro, part, store, scale }) {
  if (!options.hammerLoop) return part.hide()

  const hammerLoopLength = store.get('hammerLoopLength') * options.hammerLoopLengthFactor
  const hammerLoopWidth = store.get('hammerLoopWidth')

  points.topLeftInside = new Point(-hammerLoopLength / 2, -hammerLoopWidth / 2)
  points.bottomLeftInside = new Point(-hammerLoopLength / 2, hammerLoopWidth / 2)
  points.bottomRightInside = new Point(hammerLoopLength / 2, hammerLoopWidth / 2)
  points.topRightInside = new Point(hammerLoopLength / 2, -hammerLoopWidth / 2)

  points.bottomLeftFold1 = points.bottomLeftInside.translate(
    0,
    hammerLoopWidth * options.hammerLoopFirstFold
  )
  points.bottomRightFold1 = points.bottomRightInside.translate(
    0,
    hammerLoopWidth * options.hammerLoopFirstFold
  )
  points.topLeftFold1 = points.topLeftInside.translate(
    0,
    -hammerLoopWidth * options.hammerLoopFirstFold
  )
  points.topRightFold1 = points.topRightInside.translate(
    0,
    -hammerLoopWidth * options.hammerLoopFirstFold
  )
  points.topLeftFold2 = points.topLeftFold1.translate(
    0,
    -hammerLoopWidth * options.hammerLoopSecondFold
  )
  points.topRightFold2 = points.topRightFold1.translate(
    0,
    -hammerLoopWidth * options.hammerLoopSecondFold
  )

  points.saTopLeft = points.topLeftFold2.translate(-sa, 0)
  points.saBottomLeft = points.bottomLeftFold1.translate(-sa, 0)
  points.saTopRight = points.topRightFold2.translate(sa, 0)
  points.saBottomRight = points.bottomRightFold1.translate(sa, 0)

  paths.hammerLoop = new Path()
    .move(points.topLeftFold2)
    .line(points.bottomLeftFold1)
    .line(points.bottomRightFold1)
    .line(points.topRightFold2)
    .line(points.topLeftFold2)
    .close()
    .addClass('fabric')

  paths.bottomInside = new Path()
    .move(points.bottomLeftInside)
    .line(points.bottomRightInside)
    .addClass('fabric dashed')
    .addText('opal:fold', 'center')
  paths.topInside = new Path()
    .move(points.topLeftInside)
    .line(points.topRightInside)
    .addClass('fabric dashed')
    .addText('opal:fold', 'center')
  paths.topFold1 = new Path()
    .move(points.topLeftFold1)
    .line(points.topRightFold1)
    .addClass('fabric dashed')
    .addText('opal:fold', 'center')

  if (sa) {
    paths.saLeft = new Path()
      .move(points.topLeftFold2)
      .line(points.saTopLeft)
      .line(points.saBottomLeft)
      .line(points.bottomLeftFold1)
      .addClass('fabric sa')
    paths.saRight = new Path()
      .move(points.topRightFold2)
      .line(points.saTopRight)
      .line(points.saBottomRight)
      .line(points.bottomRightFold1)
      .addClass('fabric sa')
  }

  macro('hd', {
    id: 'wWidth',
    from: points.topLeftFold2,
    to: points.topRightFold2,
    y: points.topLeftFold2.y - 15,
  })
  macro('vd', {
    id: 'hBase',
    from: points.topRightInside,
    to: points.bottomRightInside,
    x: points.topRightFold2.x + (sa + 15),
    noStartMarker: true,
    noEndMarker: true,
  })
  macro('vd', {
    id: 'hFoldBottom',
    from: points.bottomRightInside,
    to: points.bottomRightFold1,
    x: points.topRightFold2.x + (sa + 15),
    noStartMarker: true,
    noEndMarker: true,
  })
  macro('vd', {
    id: 'hFoldTop1',
    from: points.topRightFold1,
    to: points.topRightInside,
    x: points.topRightFold2.x + (sa + 15),
    noStartMarker: true,
    noEndMarker: true,
  })
  macro('vd', {
    id: 'hFoldTop2',
    from: points.topRightFold2,
    to: points.topRightFold1,
    x: points.topRightFold2.x + (sa + 15),
    noStartMarker: true,
    noEndMarker: true,
  })
  macro('vd', {
    id: 'hTotal',
    from: points.topRightFold2,
    to: points.bottomRightFold1,
    x: points.topRightFold2.x + (sa + 30),
  })

  points.title = points.topLeftFold2
    .shiftFractionTowards(points.bottomLeftFold1, 0.5)
    .translate(scale * 5, 0)
  macro('title', { at: points.title, nr: 10, title: 'opal:hammerLoop', scale: 0.4 })

  return part
}

export const hammerLoop = {
  name: 'HammerLoop',
  draft: draftHammerLoop,
  after: back,
  options: { hammerLoopLengthFactor: 1 },
}
