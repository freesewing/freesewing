import { pluginBundle } from '@freesewing/plugin-bundle'

import {
  frontHeightRatio,
  frontTaperTopStartRatio,
  frontTaperBottomStartRatio,
  frontSideStartRatio,
  pocketHeightRatio,
  pocketStyle,
  pocketWeltExtra,
  pocketWeltHeight,
  pocketWidth,
  sideHeightRatio,
} from './options.mjs'

function draftBack({
  complete,
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
  // global/re-used settings

  let frontWidth = Math.round(measurements.waist * 0.25) //Total front width is 1/2 the waist, but as we are cutting on the fold, this should be 25%
  let frontHeight = Math.round(frontWidth * 2 * options.frontHeightRatio)

  store.set('frontWidth', frontWidth)
  store.set('frontHeight', frontHeight)

  let sideHeight = Math.round(frontHeight * options.sideHeightRatio)
  store.set('sideHeight', sideHeight)

  let pocketWidth = Math.round(frontWidth * options.pocketWidth)
  let pocketHeight = Math.round(pocketWidth * options.pocketHeightRatio)
  let pocketWeltHeight = Math.round(pocketHeight * options.pocketWeltHeight)
  let pocketWeltExtraWidth = Math.round(pocketWidth * options.pocketWeltExtra)

  store.set('pocketWidth', pocketWidth)
  store.set('pocketHeight', pocketHeight)
  store.set('pocketWeltHeight', pocketWeltHeight)
  store.set('pocketWeltExtraWidth', pocketWeltExtraWidth)

  //Build main shape of the Cummerbund

  points.top = new Point(0, 0)
  points.bottom = new Point(0, frontHeight)
  points.centreLeft = new Point(0, frontHeight / 2)
  points.middle = new Point(frontHeight / 2, frontWidth / 2)

  points.topRightTaperStart = new Point(frontWidth * options.frontTaperTopStartRatio, 0)

  store.set('topRightTaperStartX', points.topRightTaperStart.x)

  let sideTopHeight = (frontHeight - sideHeight) * options.frontSideStartRatio

  points.rightSideTop = new Point(frontWidth, sideTopHeight)
  points.rightSideBottom = new Point(frontWidth, sideTopHeight + sideHeight)

  points.topRightTaperCp = new Point(
    points.topRightTaperStart.x + (points.rightSideTop.x - points.topRightTaperStart.x) / 2,
    0
  )

  points.bottomRightTaperStart = new Point(
    frontWidth * options.frontTaperBottomStartRatio,
    frontHeight
  )
  points.bottomRightTaperCp = new Point(
    points.bottomRightTaperStart.x +
      (points.rightSideBottom.x - points.bottomRightTaperStart.x) / 2,
    frontHeight
  )

  store.set('bottomrRightTaperStartX', points.bottomRightTaperStart.x)

  // Construct Seam

  paths.frontSeam = new Path()
    .move(points.bottom)
    .line(points.bottomRightTaperStart)
    ._curve(points.bottomRightTaperCp, points.rightSideBottom)
    .line(points.rightSideTop)
    ._curve(points.topRightTaperCp, points.topRightTaperStart)
    .line(points.top)
    .close()
    .addClass('fabric')

  if (paperless) {
    //overall
    macro('hd', {
      from: points.top,
      to: points.rightSideTop,
      y: 15,
    })

    macro('vd', {
      from: points.top,
      to: points.bottom,
      y: -15,
    })

    //Side
    macro('vd', {
      from: points.rightSideTop,
      to: points.rightSideBottom,
      y: points.rightSideTop.y + 15,
      x: points.rightSideTop.x + 15,
    })
    macro('vd', {
      from: points.top,
      to: points.rightSideTop,
      y: points.rightSideTop.y + 15,
      x: points.rightSideTop.x + 15,
    })
    macro('vd', {
      from: points.bottom,
      to: points.rightSideBottom,
      y: points.rightSideBottom.y + 15,
      x: points.rightSideBottom.x + 15,
    })

    //taper
    macro('hd', {
      from: points.top,
      to: points.topRightTaperStart,
      y: -15,
    })

    macro('hd', {
      from: points.bottom,
      to: points.bottomRightTaperStart,
      y: points.bottom.y - 15,
    })
  }

  if (complete) {
    //Pocket Placement

    if (options.pocketStyle != 'none') {
      //Todo: make more configuration

      //Place centre of pocket marker centred between left edge and the taper start (to ensure it will fit)

      points.pocketAnchor = new Point(
        points.topRightTaperStart.x / 2,
        (frontHeight - pocketHeight) / 2
      )

      paths.pocketAnchor = new Path()
        .move(points.pocketAnchor.translate((-1 * pocketWidth) / 2, 0))
        .line(points.pocketAnchor.translate(pocketWidth / 2, 0))
        .addText('pocket', 'center')
        .addClass('note dashed')

      // If an inner pocket, draw the opening the same as the welt

      //if an outer, just draw the top line
    }

    //mark start/end of side
    paths.topSideGuide = new Path()
      .move(points.rightSideTop)
      .line(new Point(0, points.rightSideTop.y))
      .addClass('note dotted')

    paths.bottomSideGuide = new Path()
      .move(points.rightSideBottom)
      .line(new Point(0, points.rightSideBottom.y))
      .addClass('note dotted')

    points.title = new Point(frontWidth / 2, frontHeight * 0.33)

    paths.frontSeamSa = paths.frontSeam.offset(sa).attr('class', 'fabric sa')

    macro('title', {
      at: points.title,
      nr: 1,
      scale: 0.5,
      title: 'back',
    })

    macro('cutonfold', {
      from: points.top,
      to: points.bottom,
      grainline: false,
    })

    points.glStart = points.centreLeft.translate(frontWidth / 3, 0)
    points.glEnd = points.glStart.translate(frontWidth / 3, 0)

    macro('grainline', {
      from: points.glStart,
      to: points.glEnd,
    })

    //Notches
    snippets.upperNotch = new Snippet('notch', points.rightSideTop.translate(0, sideHeight / 4))
    snippets.lowerNotch = new Snippet(
      'notch',
      points.rightSideBottom.translate(0, (-1 * sideHeight) / 4)
    )

    //Logo
    snippets.logo = new Snippet(
      'logo',
      points.rightSideBottom.shiftFractionTowards(points.title, 0.5)
    )
  }

  return part
}

export const back = {
  name: 'cuthbert.back',
  draft: draftBack,
  measurements: ['waist'],
  options: {
    frontHeightRatio,
    frontTaperTopStartRatio,
    frontTaperBottomStartRatio,
    frontSideStartRatio,
    pocketHeightRatio,
    pocketStyle,
    pocketWeltExtra,
    pocketWeltHeight,
    pocketWidth,
    sideHeightRatio,
  },
  plugins: [pluginBundle],
}
