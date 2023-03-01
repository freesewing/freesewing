import { pluginBundle } from '@freesewing/plugin-bundle'

import { back } from './back.mjs'

import { pocketStyle, pocketWidth, pocketHeightRatio, pocketPointRatio } from './options.mjs'

function draftPocket({
  complete,
  macro,
  options,
  paperless,
  Path,
  Point,
  paths,
  points,
  part,
  sa,
  store,
}) {
  let pocketHeight = store.get('pocketHeight')
  let pocketWidth = store.get('pocketWidth')
  let pocketWeltExtraWidth = store.get('pocketWeltExtraWidth')
  let pocketWeltHeight = store.get('pocketWeltHeight')

  //For an internal pocket, create a pocket bag.
  if (options.pocketStyle == 'internal') {
    points.topLeft = new Point(0, 0)
    points.topRight = points.topLeft.translate(pocketWidth + pocketWeltExtraWidth * 2, 0)
    points.bottomLeft = new Point(0, pocketHeight * 2)
    points.bottomRight = new Point(pocketWidth + pocketWeltExtraWidth * 2, pocketHeight * 2)

    points.pocketWeltAnchor = new Point(
      pocketWidth / 2 + pocketWeltExtraWidth,
      pocketWeltExtraWidth + pocketWeltHeight / 2
    )

    points.weltTopLeft = points.pocketWeltAnchor.translate(
      pocketWidth * -0.5,
      pocketWeltHeight * -0.5
    )
    points.weltTopRight = points.pocketWeltAnchor.translate(
      pocketWidth * -0.5,
      pocketWeltHeight * 0.5
    )
    points.weltBottomLeft = points.pocketWeltAnchor.translate(
      pocketWidth * 0.5,
      pocketWeltHeight * -0.5
    )
    points.weltBottomRight = points.pocketWeltAnchor.translate(
      pocketWidth * 0.5,
      pocketWeltHeight * 0.5
    )

    paths.pocketBag = new Path()
      .move(points.topLeft)
      .line(points.bottomLeft)
      .line(points.bottomRight)
      .line(points.topRight)
      .line(points.topLeft)
      .addClass('fabric')

    if (paperless) {
      macro('vd', {
        from: points.topLeft,
        to: points.bottomLeft,
        x: points.bottomLeft.x + sa + 30,
      })

      macro('hd', {
        from: points.bottomLeft,
        to: points.bottomRight,
        y: points.bottomLeft.y - 30,
      })

      // macro('hd', {
      //   from: points.topLeft,
      //   to: points.weltTopLeft,
      //   y: points.weltTopLeft.y + 30,
      // })
    }

    if (complete) {
      points.title = points.topLeft.translate(pocketWidth / 2, pocketHeight)
      macro('title', {
        at: points.title,
        nr: 4,
        scale: 0.25,
        title: 'pocket',
      })

      points.glStart = points.bottomLeft.translate(pocketWidth / 4, points.bottomLeft.y * -0.25)
      points.glEnd = points.bottomRight.translate(pocketWidth * -0.25, points.bottomRight.y * -0.25)

      macro('grainline', {
        from: points.glStart,
        to: points.glEnd,
      })

      paths.pocketWeltInner = new Path()
        .move(points.weltTopLeft)
        .line(points.weltBottomLeft)
        .line(points.weltBottomRight)
        .line(points.weltTopRight)
        .line(points.weltTopLeft)
        .addClass('note')

      paths.pocketWeltCutLine = new Path()
        .move(points.pocketWeltAnchor.translate(pocketWidth * -0.5, 0))
        .line(points.pocketWeltAnchor.translate(pocketWidth * 0.5, 0))
        .addClass('note dotted')

      //paths.pocketWeltOuter = paths.pocketWeltInner.offset(pocketWeltExtraWidth).close().addClass('note dashed')
    }
  } else if (options.pocketStyle == 'external') {
    // For an external pocket, create a shaped pocket

    let pocketPointHeight = pocketHeight * options.pocketPointRatio

    points.topLeft = new Point(0, 0)
    points.topRight = points.topLeft.translate(pocketWidth, 0)

    points.centreBottom = new Point(pocketWidth / 2, pocketHeight)

    points.leftBottom = new Point(0, pocketHeight - pocketPointHeight)
    points.rightBottom = new Point(pocketWidth, pocketHeight - pocketPointHeight)

    paths.pocketBase = new Path()
      .move(points.topLeft)
      .line(points.leftBottom)
      .line(points.centreBottom)
      .line(points.rightBottom)
      .line(points.topRight)
      .hide()

    paths.hemBase = new Path().move(points.topRight).line(points.topLeft).hide()

    paths.seam = paths.pocketBase.join(paths.hemBase).close().addClass('fabric')

    if (paperless) {
      macro('vd', {
        from: points.topLeft,
        to: points.leftBottom,
        x: points.leftBottom.x + sa + 30,
      })

      macro('hd', {
        from: points.leftBottom,
        to: points.rightBottom,
        y: points.leftBottom.y - 30,
      })

      macro('vd', {
        from: points.centreBottom,
        to: points.leftBottom,
        x: points.centreBottom.x + sa + 30,
      })
      macro('hd', {
        from: points.centreBottom,
        to: points.rightBottom,
        y: points.centreBottom.y + 5,
      })
    }

    if (complete) {
      points.title = points.topLeft.translate(pocketWidth / 2, pocketHeight / 3)
      macro('title', {
        at: points.title,
        nr: 4,
        scale: 0.25,
        title: 'pocket',
      })

      points.glStart = points.leftBottom.translate(pocketWidth / 4, points.leftBottom.y * -0.25)
      points.glEnd = points.rightBottom.translate(pocketWidth * -0.25, points.rightBottom.y * -0.25)

      macro('grainline', {
        from: points.glStart,
        to: points.glEnd,
      })

      if (sa) {
        paths.sa = paths.pocketBase
          .offset(sa)
          .join(paths.hemBase.offset(sa * 2))
          .close()
          .addClass('fabric sa')
      }
    }
  } else {
    return part.hide()
  }

  return part
}

export const pocket = {
  name: 'cuthbert.pocket',
  draft: draftPocket,
  after: [back],
  options: {
    pocketStyle,
    pocketWidth,
    pocketHeightRatio,
    pocketPointRatio,
  },
  plugins: [pluginBundle],
}
