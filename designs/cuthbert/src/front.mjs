import { pluginBundle } from '@freesewing/plugin-bundle'

import { back } from './back.mjs'

import {
  frontPleats,
  frontHeightRatio,
  frontTaperTopStartRatio,
  frontTaperBottomStartRatio,
  frontSideStartRatio,
  sideHeightRatio,
} from './options.mjs'

function draftFront({
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
  snippets,
  store,
}) {
  // Remove inherited paths, snippets, and scalebox
  for (const p in paths) delete paths[p]
  for (const s in snippets) delete snippets[s]
  macro('scalebox', false)

  // Pattern "Shared/Global" Points/paths ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  let frontWidth = store.get('frontWidth')
  let frontHeight = store.get('frontHeight')
  let sideHeight = store.get('sideHeight')

  points.top = new Point(0, 0)

  points.centreLeft = new Point(0, frontHeight / 2)
  points.middle = new Point(frontHeight / 2, frontWidth / 2)

  let topRightTaperStartX = store.get('topRightTaperStartX')

  points.topRightTaperStart = new Point(topRightTaperStartX, 0)

  let sideTopHeight = (frontHeight - sideHeight) * options.frontSideStartRatio

  // If 1 pleats, it's just a single piece of fabric
  let pleatHeight = options.frontPleats == 0 ? 0 : sideHeight / options.frontPleats // Knife/Box Pleat = Pleat top + 2 underfolds - Don't create pleats for top & Bottom taper, only side

  let totalPleatsHeight = pleatHeight + (options.frontPleats - 1) * pleatHeight * 3 // Height of fabric for all pleats. All pleats except the first needs 3 * pleatHeight of fabric to construct

  points.leftBottom = new Point(0, totalPleatsHeight + frontHeight - sideHeight)

  points.rightSideTop = new Point(frontWidth, sideTopHeight)
  points.rightSideBottom = new Point(frontWidth, sideTopHeight + totalPleatsHeight)

  points.topRightTaperCp = new Point(
    points.topRightTaperStart.x + (points.rightSideTop.x - points.topRightTaperStart.x) / 2,
    0
  )

  points.bottomRightTaperStart = new Point(
    frontWidth * options.frontTaperBottomStartRatio,
    points.leftBottom.y
  )
  points.bottomRightTaperCp = new Point(
    points.bottomRightTaperStart.x +
      (points.rightSideBottom.x - points.bottomRightTaperStart.x) / 2,
    points.leftBottom.y
  )

  store.set('bottomrRightTaperStartX', points.bottomRightTaperStart.x)

  // Construct Seam

  paths.frontSeam = new Path()
    .move(points.top)
    .line(points.topRightTaperStart)
    .curve_(points.topRightTaperCp, points.rightSideTop)
    .line(points.rightSideBottom)
    .curve_(points.bottomRightTaperCp, points.bottomRightTaperStart)
    .line(points.leftBottom)
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
      to: points.leftBottom,
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
      from: points.leftBottom,
      to: points.rightSideBottom,
      y: points.rightSideBottom.y + 15,
      x: points.rightSideBottom.x + 15,
    })

    // taper
    macro('hd', {
      from: points.top,
      to: points.topRightTaperStart,
      y: -15,
    })

    macro('hd', {
      from: points.leftBottom,
      to: points.bottomRightTaperStart,
      y: points.leftBottom.y - 15,
    })
  }

  if (complete) {
    if (options.frontPleats > 1) {
      for (let curPleat = 1; curPleat < options.frontPleats; curPleat++) {
        let pleatTargetPathName = 'pleatTarget' + curPleat
        let pleatNextTopPathName = 'pleatNextTop' + curPleat
        let pleatFoldPathName = 'pleatFold' + curPleat

        let curPleatFoldTargetY =
          (curPleat - 1) * 3 * pleatHeight + pleatHeight + points.rightSideTop.y //
        let curPleatFoldLineY = curPleatFoldTargetY + pleatHeight
        let nextPleatTopLineY = curPleatFoldLineY + pleatHeight

        paths[pleatTargetPathName] = new Path()
        paths[pleatNextTopPathName] = new Path()
        paths[pleatFoldPathName] = new Path()

        paths[pleatTargetPathName]
          .move(new Point(0, curPleatFoldTargetY))
          .line(new Point(frontWidth, curPleatFoldTargetY))
          .addClass('note')

        paths[pleatFoldPathName]
          .move(new Point(0, curPleatFoldLineY))
          .line(new Point(frontWidth, curPleatFoldLineY))
          .addClass('mark dashed')

        paths[pleatNextTopPathName]
          .move(new Point(0, nextPleatTopLineY))
          .line(new Point(frontWidth, nextPleatTopLineY))
          .addClass('contrast dotted')

        macro('banner', {
          path: paths[pleatFoldPathName],
          text: 'fold',
          dy: 0,
          repeat: 50,
          className: 'text-xs italic',
        })
      }

      points.basteStart = points.rightSideTop.translate(frontWidth * -0.025, 0)
      points.basteEnd = points.rightSideBottom.translate(frontWidth * -0.025, 0)

      paths.baste = new Path()
        .move(points.basteStart)
        .line(points.basteEnd)
        .addText('baste', 'center')
        .addClass('fabric help')
    }

    macro('cutonfold', {
      from: points.top,
      to: points.leftBottom,
      grainline: false,
    })

    //mark start/end of side
    paths.topSideGuide = new Path()
      .move(points.rightSideTop)
      .line(new Point(0, points.rightSideTop.y))
      .addClass('note dotted')

    paths.bottomSideGuide = new Path()
      .move(points.rightSideBottom)
      .line(new Point(0, points.rightSideBottom.y))
      .addClass('note dotted')

    points.title = new Point(frontWidth * 0.33, points.rightSideTop.y)
    macro('title', {
      at: points.title,
      nr: 2,
      scale: 0.5,
      title: 'front',
    })

    points.glStart = points.rightSideBottom.translate(
      frontWidth * -0.66,
      points.rightSideTop.y * 0.5
    )
    points.glEnd = points.glStart.translate(frontWidth / 3, 0)

    macro('grainline', {
      from: points.glStart,
      to: points.glEnd,
    })

    if (sa) {
      paths.frontSeamSa = paths.frontSeam.offset(sa * -1).attr('class', 'sa')
    }
  }

  return part
}

export const front = {
  name: 'cuthbert.front',
  after: [back],
  draft: draftFront,
  measurements: ['waist'],
  options: {
    frontPleats,
    frontHeightRatio,
    frontTaperTopStartRatio,
    frontTaperBottomStartRatio,
    frontSideStartRatio,
    sideHeightRatio,
  },
  plugins: [pluginBundle],
}
