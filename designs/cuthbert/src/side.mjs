import { pluginBundle } from '@freesewing/plugin-bundle'

import { back } from './back.mjs'

import {
  sideLengthRatio,
  sideHeightRatio,
  sideOpening,
  sideStrapTopRatio,
  sideHorizontalTaperRatio,
  strapHeight,
} from './options.mjs'

function draftSide({
  complete,
  // log,
  macro,
  measurements,
  options,
  paperless,
  Path,
  Point,
  paths,
  points,
  part,
  sa,
  snippets,
  Snippet,
  store,
}) {
  let sideHeight = store.get('sideHeight')

  let sideLength = Math.round(measurements.waist * options.sideLengthRatio)
  store.set('sideLength', sideLength)

  // log.info ("sideHeight:" + sideHeight )
  // log.info ("strapWidth:" + options.strapHeight )
  // log.info ("sideStrapTopRatio:" + options.sideStrapTopRatio )

  let strapHeight = sideHeight * options.strapHeight
  store.set('strapHeight', strapHeight)

  let strapStartY = (sideHeight - strapHeight) * options.sideStrapTopRatio

  points.sideTopLeft = new Point(0, 0)
  points.sideBottomLeft = new Point(0, sideHeight)

  // log.info ("sideLength:" + sideLength )
  // log.info ("YY:" + (strapStartY + options.strapHeight))

  points.strapTop = new Point(sideLength, strapStartY)
  points.strapBottom = new Point(sideLength, strapStartY + strapHeight)

  points.centreLeft = new Point(0, points.strapBottom.y - points.strapTop.y + strapHeight / 2)
  points.centreRight = new Point(
    sideLength,
    points.strapBottom.y - points.strapTop.y + strapHeight / 2
  )

  //TODO: Check if strap is bigger than the side and flip the Control points accordingly

  points.sideTopTaperCP = new Point(
    options.sideHorizontalTaperRatio * sideLength,
    points.strapTop.y
  )
  points.sideBottomTaperCP = new Point(points.sideTopTaperCP.x, points.strapBottom.y) //(points.strapBottom.y - points.strapBottom.y))

  paths.sideSeamBase = new Path()
    .move(points.strapBottom)
    .line(points.strapTop)
    ._curve(points.sideTopTaperCP, points.sideTopLeft)
    .line(points.sideBottomLeft)
    ._curve(points.sideBottomTaperCP, points.strapBottom)
    .addClass('fabric')

  if (options.sideOpening) {
    //create the additional hem lines
    paths.hemBase
  }

  if (paperless) {
    //overall
    macro('vd', {
      from: points.sideTopLeft,
      to: points.sideBottomLeft,
      x: sideLength * 0.125,
    })

    macro('hd', {
      from: points.sideTopLeft,
      to: points.strapTop,
      y: sideHeight * 0.125,
    })

    //Strap
    macro('vd', {
      from: points.sideTopLeft,
      to: points.strapTop,
      x: sideLength * 0.875,
    })

    macro('vd', {
      from: points.strapTop,
      to: points.strapBottom,
      x: sideLength * 0.875,
    })

    macro('vd', {
      from: points.strapBottom,
      to: points.sideBottomLeft,
      x: sideLength * 0.875,
    })
  }

  if (complete) {
    points.title = new Point(sideLength * 0.25, sideHeight / 2)

    macro('title', {
      at: points.title,
      nr: 3,
      scale: 0.5,
      title: 'side',
    })

    paths.sideSeamSa = paths.sideSeamBase.offset(sa).close().attr('class', 'fabric sa')

    macro('grainline', {
      from: points.centreLeft,
      to: points.centreRight,
    })

    //Notches
    snippets.upperNotch = new Snippet('notch', points.sideTopLeft.translate(0, sideHeight / 4))
    snippets.lowerNotch = new Snippet(
      'notch',
      points.sideBottomLeft.translate(0, (-1 * sideHeight) / 4)
    )
  }

  return part
}

export const side = {
  name: 'cuthbert.side',
  after: [back],
  draft: draftSide,
  measurements: ['waist'],
  options: {
    sideLengthRatio,
    sideHeightRatio,
    sideOpening,
    sideStrapTopRatio,
    sideHorizontalTaperRatio,
    strapHeight,
  },
  plugins: [pluginBundle],
}
