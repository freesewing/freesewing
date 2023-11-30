import { shape } from './shape.mjs'

export const waistband = {
  name: 'lumira.waistband',
  from: shape,
  draft: ({ store, sa, Point, points, Path, paths, Snippet, snippets, options, macro, part }) => {
    if (false == options.waistband) {
      return part.hide()
    }

    const waistLength = store.get('waistLength')
    const waistbandSize = store.get('waistbandSize')
    const gussetWidth = options.frontbulge ? store.get('gussetWidth') : 0

    const topLength = points.backWaist.dist(points.frontWaist)
    const bottomLength = waistLength + gussetWidth
    const magic1 = 0.35

    points.topFront = new Point(Math.min(topLength, bottomLength) / 2, 0)
    points.topBack = new Point(-1 * (Math.min(topLength, bottomLength) / 2), 0)
    // points.topFront = new Point(topLength *.5, 0)
    // points.topBack = new Point(topLength *-.5, 0)

    const angleBack =
      points.frontWaist.angle(points.backWaist) - points.backWaistband.angle(points.backWaist)
    const angleFront =
      points.frontWaist.angle(points.backWaist) - paths.frontTop.end().angle(points.frontWaist)
    var angle = angleBack - 90 + (90 - angleFront) / 2
    console.log({ angleFront: angleFront, angleBack: angleBack, angle: angle })

    var iter = 0
    var diff = 0
    do {
      points.topFront = points.topFront.shift(180, diff / 2)
      points.topBack = points.topBack.shift(0, diff / 2)
      points.topFrontCp = points.topFront.shift(
        180 + angle,
        points.topBack.dist(points.topFront) * magic1
      )
      points.topBackCp = points.topBack.shift(
        0 - angle,
        points.topBack.dist(points.topFront) * magic1
      )
      paths.top = new Path()
        .move(points.topFront)
        .curve(points.topFrontCp, points.topBackCp, points.topBack)
      diff = paths.top.length() - topLength
      console.log({ i: iter, d: diff })
    } while (iter++ < 100 && (diff < -1 || diff > 1))

    points.bottomFront = points.topFront.shift(270 + angle, waistbandSize)
    points.bottomBack = points.topBack.shift(270 - angle, waistbandSize)

    iter = 0
    diff = 0
    do {
      points.bottomFront = points.bottomFront.shift(180, diff / 2)
      points.bottomBack = points.bottomBack.shift(0, diff / 2)
      points.bottomFrontCp = points.bottomFront.shift(
        180 + angle,
        points.bottomBack.dist(points.bottomFront) * magic1
      )
      points.bottomBackCp = points.bottomBack.shift(
        0 - angle,
        points.bottomBack.dist(points.bottomFront) * magic1
      )

      paths.bottom = new Path()
        .move(points.bottomFront)
        .curve(points.bottomFrontCp, points.bottomBackCp, points.bottomBack)

      diff = paths.bottom.length() - bottomLength
      console.log({ i: iter, d: diff })
    } while (iter++ < 100 && (diff < -1 || diff > 1))

    paths.seam = new Path()
      .move(points.topFront)
      .join(paths.top)
      .line(points.bottomBack)
      .join(paths.bottom.reverse())
      .line(points.topFront)
      .close()

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }

    points.title = points.bottomFront.shiftFractionTowards(points.topBack, 0.5)
    macro('title', {
      at: points.title,
      nr: 3,
      title: 'waistband',
      align: 'center',
      scale: 0.3,
    })

    macro('cutonfold', {
      from: points.bottomFront,
      to: points.topFront,
    })

    store.cutlist.addCut({ cut: 1, from: 'fabric', onFold: true })

    if (gussetWidth > 0) {
      snippets.gusset = new Snippet('notch', paths.bottom.shiftAlong(gussetWidth))
    }

    return part
  },
}
