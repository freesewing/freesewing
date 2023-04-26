import { pluginBundle } from '@freesewing/plugin-bundle'

import { strapLeft } from './strapLeft.mjs'

import { strapHeight } from './options.mjs'

function draftStrapRight({
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
  //if using tape/elastic, no need to make straps
  if (options.strapType == 'tape') {
    return part.hide()
  }

  let totalStrapHeight = store.get('totalStrapHeight')

  let rightStrapLength = store.get('righStrapLength')

  points.topLeft = new Point(0, 0)
  points.topRight = new Point(rightStrapLength, 0)
  points.bottomLeft = points.topLeft.translate(0, totalStrapHeight)
  points.bottomRight = points.topRight.translate(0, totalStrapHeight)

  paths.rightStrapBase = new Path()
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
      //don't round the corner for the buckle
    } else if (options.fastenerStyle == 'pressStud' || options.fastenerStyle == 'button') {
      //Round corner and indicate 'male' fasteners
    }

    points.centre = new Point(rightStrapLength / 2, totalStrapHeight / 2)

    //Centreline
    paths.centreLine = new Path()
      .move(points.centre.translate(rightStrapLength * -0.5, 0))
      .line(points.centre.translate(rightStrapLength * 0.5, 0))
      .addClass('note dashed')

    points.title = new Point(rightStrapLength / 2, totalStrapHeight / 2)

    macro('title', {
      at: points.title,
      nr: 7,
      scale: 0.5,
      title: 'RightStrap',
    })

    points.glStart = points.bottomLeft.shiftFractionTowards(points.centre, 0.5)
    points.glEnd = points.bottomRight.shiftFractionTowards(points.centre, 0.5)

    macro('grainline', {
      from: points.glStart,
      to: points.glEnd,
    })

    if (sa) {
      paths.sa = paths.rightStrapBase.offset(sa).close().addClass('sa')
    }
  }

  return part
}

export const strapRight = {
  name: 'cuthbert.strapRight',
  after: [strapLeft],
  draft: draftStrapRight,
  measurements: ['waist'],
  options: {
    strapHeight,
  },
  plugins: [pluginBundle],
}
