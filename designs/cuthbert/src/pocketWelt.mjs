import { pluginBundle } from '@freesewing/plugin-bundle'

import { back } from './back.mjs'

import { pocketInclude, pocketStyle, pocketWidth, pocketHeightRatio } from './options.mjs'

function draftPocketWelt({
  complete,
  log,
  macro,
  measurements,
  options,
  paperless,
  Path,
  Point,
  paths,
  points,
  part,
  store,
}) {
  //Don't need a welt for an external pocket
  if (options.pocketStyle != 'internal') return part.hide()

  let pocketHeight = store.get('pocketHeight')
  let pocketWidth = store.get('pocketWidth')
  let pocketWeltExtraWidth = store.get('pocketWeltExtraWidth')
  let pocketWeltHeight = store.get('pocketWeltHeight')

  points.pocketWeltAnchor = new Point(
    pocketWidth / 2 + pocketWeltExtraWidth,
    pocketWeltExtraWidth + pocketWeltHeight / 2
  )

  points.weltTopLeft = points.pocketWeltAnchor.translate(
    pocketWidth * -0.5,
    pocketWeltHeight * -0.5
  )
  points.weltTopRight = points.weltTopLeft.translate(pocketWidth, 0)
  points.weltBottomLeft = points.weltTopLeft.translate(0, pocketWeltHeight)
  points.weltBottomRight = points.weltTopRight.translate(0, pocketWeltHeight)

  // points.weltTopRight = points.pocketWeltAnchor.translate(pocketWidth * -0.5, pocketWeltHeight * 0.5)
  // points.weltBottomLeft = points.pocketWeltAnchor.translate(pocketWidth * 0.5, pocketWeltHeight * -0.5)
  // points.weltBottomRight = points.pocketWeltAnchor.translate(pocketWidth * 0.5, pocketWeltHeight * 0.5)

  points.trueWeltTopLeft = points.weltTopLeft.translate(
    pocketWeltExtraWidth * -1,
    pocketWeltExtraWidth * -1
  )
  points.trueWeltTopRight = points.weltTopRight.translate(
    pocketWeltExtraWidth,
    pocketWeltExtraWidth * -1
  )
  points.trueWeltBottomLeft = points.weltBottomLeft.translate(
    pocketWeltExtraWidth * -1,
    pocketWeltExtraWidth
  )
  points.trueWeltBottomRight = points.weltBottomRight.translate(
    pocketWeltExtraWidth,
    pocketWeltExtraWidth
  )

  paths.weltOpeningBase = new Path()
    .move(points.weltBottomRight)
    .line(points.weltBottomLeft)
    .line(points.weltTopLeft)
    .line(points.weltTopRight)
    .line(points.weltBottomRight)
    .addClass('fabric')

  // paths.weltOutline = paths.weltOpeningBase.offset(pocketWeltExtraWidth)
  //     .close()
  //     .addClass('fabric')

  paths.weltOutline = new Path()
    .move(points.trueWeltTopLeft)
    .line(points.trueWeltBottomLeft)
    .line(points.trueWeltBottomRight)
    .line(points.trueWeltTopRight)
    .line(points.trueWeltTopLeft)
    .addClass('fabric')

  if (paperless) {
    macro('vd', {
      from: points.trueWeltTopLeft,
      to: points.trueWeltBottomLeft,
      x: points.trueWeltBottomLeft.x + pocketWeltExtraWidth,
    })

    macro('hd', {
      from: points.trueWeltBottomLeft,
      to: points.trueWeltBottomRight,
      y: points.trueWeltBottomLeft.y - pocketWeltExtraWidth,
    })

    macro('vd', {
      from: points.trueWeltTopLeft,
      to: points.weltTopLeft,
      x: points.trueWeltTopLeft.x + pocketWeltExtraWidth,
    })

    macro('hd', {
      from: points.trueWeltTopLeft,
      to: points.weltTopLeft,
      x: points.trueWeltTopLeft.x + pocketWeltExtraWidth,
    })
  }

  if (complete) {
    paths.weltCutLine = new Path()
      .move(points.weltTopLeft)
      .line(points.weltTopLeft.translate(pocketWeltHeight, pocketWeltHeight / 2))
      .line(points.weltBottomLeft)
      .move(points.weltTopLeft.translate(0, pocketWeltHeight / 2))
      .line(points.weltTopRight.translate(0, pocketWeltHeight / 2))
      .move(points.weltTopRight)
      .line(points.weltTopRight.translate(pocketWeltHeight * -1, pocketWeltHeight / 2))
      .addClass('note dotted')

    points.title = points.pocketWeltAnchor.translate(pocketWidth / 2, pocketWeltHeight)
    macro('title', {
      at: points.title,
      nr: 5,
      scale: 0.25,
      title: 'pocketWelt',
    })

    points.glStart = points.pocketWeltAnchor.shiftFractionTowards(points.trueWeltBottomLeft, 0.5)
    points.glEnd = points.pocketWeltAnchor.shiftFractionTowards(points.trueWeltBottomRight, 0.5)

    macro('grainline', {
      from: points.glStart,
      to: points.glEnd,
    })
  }

  return part
}

export const pocketWelt = {
  name: 'cuthbert.pocketWelt',
  after: [back],
  draft: draftPocketWelt,
  options: {
    pocketInclude,
    pocketStyle,
    pocketWidth,
    pocketHeightRatio,
  },
  plugins: [pluginBundle],
}
