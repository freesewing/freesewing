import { pluginBundle } from '@freesewing/plugin-bundle'

import { side } from './side.mjs'

import {
  fastenerCount,
  fastenerHoleCount,
  fastenerRows,
  fastenerStyle,
  strapExtraLength,
  strapRightPct,
  strapType,
  strapHeight,
} from './options.mjs'

function draftStrapLeft({
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
  //  snippets,
  //  Snippet,
  store,
}) {
  //if using tape/elastic, no need to make straps
  if (options.strapType == 'tape') {
    return part.hide()
  }

  let sideLength = store.get('sideLength')
  let frontWidth = store.get('frontWidth')
  let strapHeight = store.get('strapHeight')

  let totalStrapLength = Math.round(frontWidth * 2 - sideLength * 2)

  totalStrapLength = totalStrapLength * (1 + options.strapExtraLength)
  let totalStrapHeight = strapHeight * 2

  store.set('totalStrapLength', totalStrapLength)
  store.set('totalStrapHeight', totalStrapHeight)

  let righStrapLength = Math.round(totalStrapLength * options.strapRightPct)
  let leftStrapLength = Math.round(totalStrapLength - righStrapLength)
  store.set('righStrapLength', righStrapLength)
  store.set('leftStrapLength', leftStrapLength)

  points.topLeft = new Point(0, 0)
  points.topRight = new Point(leftStrapLength, 0)
  points.bottomLeft = points.topLeft.translate(0, totalStrapHeight)
  points.bottomRight = points.topRight.translate(0, totalStrapHeight)

  paths.leftStrapBase = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .addClass('fabric')

  if (paperless) {
    //overall
    macro('hd', {
      from: points.topLeft,
      to: points.topRight,
      y: 15,
    })

    macro('vd', {
      from: points.topLeft,
      to: points.bottomLeft,
      x: 15,
    })
  }

  if (complete) {
    //Fasterner styles
    //     'button',
    //     'buckle',
    //     'pressStud',
    //     'hook&Bar',
    //     'hook&Eye',
    if (options.fastenerStyle == 'buckle') {
      //don't round the corner for the left buckle
    } else if (options.fastenerStyle == 'pressStud' || options.fastenerStyle == 'button') {
      //Round corner and indicate 'male' fasteners
    }

    points.centre = new Point(leftStrapLength / 2, totalStrapHeight / 2)

    //Centreline
    paths.centreLine = new Path()
      .move(points.centre.translate(leftStrapLength * -0.5, 0))
      .line(points.centre.translate(leftStrapLength * 0.5, 0))
      .addClass('note dashed')

    points.title = new Point(leftStrapLength / 2, totalStrapHeight / 2)

    macro('title', {
      at: points.title,
      nr: 6,
      scale: 0.5,
      title: 'leftStrap',
    })

    points.glStart = points.bottomLeft.shiftFractionTowards(points.centre, 0.5)
    points.glEnd = points.bottomRight.shiftFractionTowards(points.centre, 0.5)

    macro('grainline', {
      from: points.glStart,
      to: points.glEnd,
    })

    if (sa) {
      paths.sa = paths.leftStrapBase.offset(sa).close().addClass('sa')
    }
  }

  return part
}

export const strapLeft = {
  name: 'cuthbert.strapLeft',
  draft: draftStrapLeft,
  after: [side],
  measurements: ['waist'],
  options: {
    fastenerCount,
    fastenerHoleCount,
    fastenerRows,
    fastenerStyle,
    strapExtraLength,
    strapRightPct,
    strapType,
    strapHeight,
  },
  plugins: [pluginBundle],
}
