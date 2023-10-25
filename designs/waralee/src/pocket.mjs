import { cbqc } from '@freesewing/core'
import { pantsProto } from './pantsproto.mjs'

export const pocket = {
  name: 'waralee.pocket',
  from: pantsProto,
  draft: ({ options, Point, Path, points, paths, Snippet, snippets, sa, macro, store, part }) => {
    if (false == options.frontPocket) {
      return part.hide()
    }

    const frontPocketSize = store.get('frontPocketSize')

    if ('welt' != options.frontPocketStyle) {
      points.topLeft = new Point(0, 0)
      points.topRight = points.topLeft.shift(0, frontPocketSize)
      points.bottomLeft = points.topLeft.shift(270, frontPocketSize * 1.5)
      points.bottomRight = points.topRight.shift(270, frontPocketSize * 1.5)

      points.bottomLeftCornerUp = points.bottomLeft.shift(90, frontPocketSize / 4)
      points.bottomLeftCornerUpCp1 = points.bottomLeftCornerUp.shift(
        270,
        (frontPocketSize / 4) * cbqc
      )
      points.bottomLeftCornerOver = points.bottomLeft.shift(0, frontPocketSize / 4)
      points.bottomLeftCornerOverCp2 = points.bottomLeftCornerOver.shift(
        180,
        (frontPocketSize / 4) * cbqc
      )
      points.bottomRightCornerUp = points.bottomRight.shift(90, frontPocketSize / 4)
      points.bottomRightCornerUpCp2 = points.bottomRightCornerUp.shift(
        270,
        (frontPocketSize / 4) * cbqc
      )
      points.bottomRightCornerOver = points.bottomRight.shift(180, frontPocketSize / 4)
      points.bottomRightCornerOverCp1 = points.bottomRightCornerOver.shift(
        0,
        (frontPocketSize / 4) * cbqc
      )

      paths.seam = new Path()
        .move(points.topLeft)
        .line(points.bottomLeftCornerUp)
        .curve(
          points.bottomLeftCornerUpCp1,
          points.bottomLeftCornerOverCp2,
          points.bottomLeftCornerOver
        )
        .line(points.bottomRightCornerOver)
        .curve(
          points.bottomRightCornerOverCp1,
          points.bottomRightCornerUpCp2,
          points.bottomRightCornerUp
        )
        .line(points.topRight)
        .line(points.topLeft)
        .close()
        .addClass('fabric')

      paths.sa = paths.seam.offset(sa).addClass('fabric sa')
    } else {
      paths.frontPocketSeam.unhide().setClass('fabric')

      if (sa) {
        paths.sa = paths.frontPocketSeamSA.offset(sa).close().addClass('fabric sa')
      }

      paths.frontPocket.unhide().setClass('mark')

      macro('cutonfold', {
        from: points.frontPocketBottomRight,
        to: points.frontPocketTopRight,
      })
    }

    store.cutlist.addCut({ cut: 2, from: 'lining' })

    points.title = points.frontPocketTopLeft.shift(270, 75).shift(0, 50)
    macro('title', {
      nr: 3,
      at: points.title,
      title: 'pocket',
    })

    points.logo = points.title.shift(270, 75)
    snippets.logo = new Snippet('logo', points.logo)
    points.text = points.logo.shift(-90, 25).addText('Waralee', 'center')

    if ('welt' == options.frontPocketStyle) {
      macro('hd', {
        id: 1,
        from: points.frontPocketTopLeft,
        to: points.frontPocketTopRight,
        y: points.frontPocketTopLeft.y - sa - 15,
      })
      macro('hd', {
        id: 2,
        from: points.frontPocketBottomLeft,
        to: points.frontPocketBottomRight,
        y: points.frontPocketBottomRight.y + sa + 15,
      })
      macro('vd', {
        id: 3,
        from: points.frontPocketBottomLeft,
        to: points.frontPocketTopLeft,
        x: points.frontPocketBottomLeft.x - sa - 15,
      })
      macro('vd', {
        id: 4,
        from: points.frontPocketTopRight,
        to: points.frontPocketBottomRight,
        x: points.frontPocketBottomRight.x + 15,
      })
      macro('vd', {
        id: 5,
        from: points.frontPocketBottomRight,
        to: points.frontPocketBottomLeft,
        x: points.frontPocketBottomLeft.x - sa - 15,
      })
    } else {
      macro('hd', {
        id: 6,
        from: points.topLeft,
        to: points.topRight,
        y: points.topLeft.y + 15,
      })
      macro('vd', {
        id: 7,
        from: points.bottomLeftCornerOver,
        to: points.topLeft,
        x: points.bottomLeftCornerOver.x,
      })
    }

    return part
  },
}
