import { pantsProto } from './pantsproto.mjs'

export const backPocket = {
  name: 'waralee.backPocket',
  after: pantsProto,
  draft: ({
    options,
    measurements,
    Point,
    Path,
    points,
    paths,
    Snippet,
    snippets,
    macro,
    sa,
    store,
    expand,
    units,
    part,
  }) => {
    if (false == options.backPocket) {
      return part.hide()
    }
    const pocketDepth = options.backPocketDepth * measurements.crotchDepth

    if (!expand) {
      // Expand is off, do not draw the part but flag this to the user
      store.flag.note({
        msg: `waralee:cutBackPocket`,
        replace: {
          width: units(options.backPocketSize * measurements.crotchDepth),
          length: units(pocketDepth + options.backPocketVerticalOffset * measurements.crotchDepth),
        },
        suggest: {
          text: 'flag:show',
          icon: 'expand',
          update: {
            settings: ['expand', 1],
          },
        },
      })
      // Also hint about expand
      store.flag.preset('expand')

      return part.hide()
    }

    points.topLeft = new Point(0, 0)
    points.bottomLeft = points.topLeft.shift(
      270,
      pocketDepth + options.backPocketVerticalOffset * measurements.crotchDepth
    )

    points.topRight = points.topLeft.shift(0, options.backPocketSize * measurements.crotchDepth)
    points.bottomRight = points.topRight.shift(
      270,
      pocketDepth + options.backPocketVerticalOffset * measurements.crotchDepth
    )

    paths.seamSA = new Path()
      .move(points.bottomRight)
      .line(points.topRight)
      .line(points.topLeft)
      .line(points.bottomLeft)
      .hide()
    paths.seam = new Path()
      .move(points.bottomLeft)
      .line(points.bottomRight)
      .join(paths.seamSA)
      .close()
      .addClass('fabric')

    macro('cutonfold', {
      from: points.bottomLeft,
      to: points.bottomRight,
    })

    store.cutlist.addCut({ cut: 2, from: 'lining' })

    points.title = points.topLeft.shift(270, 75).shift(0, 50)
    macro('title', {
      nr: 4,
      at: points.title,
      title: 'backPocket',
    })

    points.logo = points.title.shift(270, 75)
    snippets.logo = new Snippet('logo', points.logo)
    points.text = points.logo.shift(-90, 25).addText('Waralee', 'center')

    if (sa) paths.sa = paths.seamSA.close().offset(sa).addClass('fabric sa')

    macro('hd', {
      id: 1,
      from: points.topLeft,
      to: points.topRight,
      y: points.topLeft.y + 15,
    })
    macro('vd', {
      id: 2,
      from: points.topLeft,
      to: points.bottomLeft,
      x: points.topLeft.x + 15,
    })

    return part
  },
}
