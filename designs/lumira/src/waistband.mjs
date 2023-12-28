import { shape } from './shape.mjs'

export const waistband = {
  name: 'lumira.waistband',
  from: shape,
  draft: ({
    store,
    sa,
    Point,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    options,
    measurements,
    macro,
    log,
    part,
  }) => {
    if (false === options.waistband) {
      return part.hide()
    }

    const backGusset = options.cyclingchamois ? true : options.backgusset

    const waistLength = store.get('waistLength')
    const waistbandSize = store.get('waistbandSize')
    const gussetWidth = options.frontbulge || options.cyclingchamois ? store.get('gussetWidth') : 0

    const topLength = points.backWaist.dist(points.frontWaist)
    const bottomLength = waistLength + gussetWidth
    const magic1 = 0.35

    points.topFront = new Point(Math.min(topLength, bottomLength) / 2, 0)
    points.topBack = new Point(-1 * (Math.min(topLength, bottomLength) / 2), 0)

    const angleBack =
      points.frontWaist.angle(points.backWaist) - points.backWaistband.angle(points.backWaist)
    const angleFront =
      points.frontWaist.angle(points.backWaist) - paths.frontTop.end().angle(points.frontWaist)
    let angle = angleBack - 90 + (90 - angleFront) / 2

    let iter = 0
    let diff = 0
    do {
      points.topFront = points.topFront.shift(180, diff / 2.5)
      points.topBack = points.topBack.shift(0, diff / 1.5)
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
    } while (iter++ < 100 && (diff < -1 || diff > 1))
    if (iter >= 100) {
      log.info('lumira:couldNotCreateWaistCircle')
    }

    points.bottomFront = points.topFront.shift(270 + angle, waistbandSize)
    points.bottomBack = points.topBack.shift(270 - angle, waistbandSize)

    iter = 0
    diff = 0
    do {
      points.bottomFront = points.bottomFront.shift(180, diff / 2.5)
      points.bottomBack = points.bottomBack.shift(0, diff / 1.5)

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
        .hide()

      diff = paths.bottom.length() - bottomLength
    } while (iter++ < 100 && (diff < -1 || diff > 1))
    if (iter >= 100) {
      log.info('lumira:couldNotCreateWaistCircle')
    }

    points.bottomCenter = paths.bottom.shiftAlong(store.get('waistLengthFront'))
    points.bottomCenterCp = paths.bottom.shiftAlong(store.get('waistLengthFront') * 1.1)

    paths.bottomFront = paths.bottom.split(points.bottomCenter)[0]

    points.bottomBackTT = points.topBack.shift(
      270 - angle,
      waistbandSize + (backGusset ? 0 : measurements.crossSeamBack * 0.1)
    )
    points.bottomBack = points.topBack.shift(
      270 - angle,
      waistbandSize + (backGusset ? 0 : measurements.crossSeamBack * 0.1)
    )

    iter = 0
    diff = 0
    do {
      points.bottomBack = points.bottomBack.shift(0, diff)

      points.bottomBackCp = points.bottomBack.shiftFractionTowards(points.bottomCenterCp, 0.7)

      paths.bottomBack = new Path()
        .move(points.bottomCenter)
        .curve(points.bottomCenterCp, points.bottomBackCp, points.bottomBack)

      diff = paths.bottomFront.length() + paths.bottomBack.length() - bottomLength
    } while (iter++ < 100 && (diff < -1 || diff > 1))
    if (iter >= 100) {
      log.info('lumira:couldNotCreateWaistBack')
    }

    paths.seamSA = new Path()
      .move(points.topFront)
      .join(paths.top)
      .line(points.bottomBack)
      .join(paths.bottomBack.reverse())
      .join(paths.bottomFront.reverse())
      .hide()
    paths.seam = new Path()
      .move(points.topFront)
      .join(paths.seamSA)
      .line(points.topFront)
      .close()
      .attr('class', 'fabric')

    if (sa) {
      const seamSA = paths.seamSA.offset(sa)
      paths.sa = new Path()
        .move(points.topFront)
        .line(seamSA.start())
        .join(seamSA)
        .line(points.bottomFront)
        .attr('class', 'fabric sa')
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

    store.cutlist.addCut({ cut: 2, from: 'fabric', onFold: true })

    if (gussetWidth > 0) {
      snippets.gusset = new Snippet('notch', paths.bottom.shiftAlong(gussetWidth))
    }

    let top = paths.top.edge('top')
    if (top.y == points.topFront.y) {
      top = paths.top.edge('bottom')
    }
    let bottom = paths.bottom.edge('bottom')
    if (bottom.y == points.bottomFront.y) {
      bottom = paths.bottom.edge('top')
    }
    macro('hd', {
      id: 'top',
      from: points.topBack,
      to: points.topFront,
      y: Math.min(points.topFront.y, top.y) - sa - 15,
    })
    macro('hd', {
      id: 'bottom',
      from: points.bottomBack,
      to: points.bottomFront,
      y: Math.max(points.bottomFront.y, bottom.y) + sa + 15,
    })
    macro('vd', {
      id: 'top',
      from: points.bottomBack,
      to: top,
      x: top.x - 15,
    })
    macro('vd', {
      id: 'bottom',
      from: points.topFront,
      to: bottom,
      x: top.x + 15,
    })
    macro('ld', {
      id: 'back',
      from: points.topBack,
      to: points.bottomBack,
      d: 15,
    })

    return part
  },
}
