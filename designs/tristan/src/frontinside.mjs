import { frontPoints } from './frontpoints.mjs'

export const frontInside = {
  name: 'tristan.frontInside',
  from: frontPoints,
  draft: ({ store, sa, Point, points, Path, paths, Snippet, snippets, options, macro, part }) => {
    delete points.waistDartHem
    delete points.waistDartRight
    delete points.waistDartRightCp
    delete points.waistDartCpBottom
    delete points.bustDartBottom
    delete points.bustDartCpBottom
    delete points.bustDartTip
    delete points.bustDartTop
    delete points.shoulderDartTipCpDownOutside
    delete points.ex
    delete points.bustB
    delete points.shoulder
    delete points.shoulderDartShoulder
    delete points.shoulderDartOutside
    delete points.pitchMax
    delete points.armholeCpTarget
    delete points.armholePitch
    delete points.armholePitchCp1
    delete points.armholePitchCp2
    delete points.armhole
    delete points.armholeCp2
    delete points.bustDartCpTop
    delete points.bustSide
    delete points.bustDartMiddle
    delete points.bustDartEdge

    const lacing = true == options.lacing && 'front' == options.lacingLocation

    paths.cut = new Path()
      .move(points.strapInside)
      .curve(points.strapInsideCp, points.cfCutCp, lacing ? points.lacingCut : points.cfCut)

    paths.insideSeamTemp = new Path()
      .move(points.waistDartLeft)
      .curve(points.waistDartLeftCp, points.shoulderDartTipCpDownInside, points.shoulderDartTip)
      .line(points.shoulderDartInside)
      .join(paths.cut)
      .hide()

    if (options.hem && !options.peplum) {
      paths.insideSeam = new Path()
        .move(points.waistDartLeftHem)
        .line(points.waistDartLeft)
        .join(paths.insideSeamTemp)
      paths.hemFold = new Path()
        .move(lacing ? points.lacingWaist : points.cfWaist)
        .line(points.waistDartLeft)
        .addClass('note dashed')
        .addText('hem', 'center note')
    } else {
      paths.insideSeam = new Path()
        .move(lacing ? points.lacingWaist : points.cfWaist)
        .line(points.waistDartLeft)
        .join(paths.insideSeamTemp)
    }

    const lacingPath = lacing
      ? new Path().move(points.lacingCut).line(points.lacingWaist)
      : new Path().move(points.cfCut).line(points.cfWaist)
    if (options.hem && !options.peplum) {
      lacingPath.line(points.cfHem)
    }

    paths.seam = paths.insideSeam.clone().join(lacingPath).close().attr('class', 'fabric')

    store.set(
      'shoulderDartTipNotch',
      new Path()
        .move(points.waistDartLeft)
        .curve(points.waistDartLeftCp, points.shoulderDartTipCpDownInside, points.shoulderDartTip)
        .length()
    )

    if (lacing) {
      store.cutlist.addCut({ cut: 2, from: 'fabric' })
      paths.originalSide = new Path()
        .move(points.lacingCut)
        .line(points.cfCut)
        .line(points.cfWaist)
        .line(points.lacingWaist)
        .setClass('note dashed')
      const pGrainLineTo = points.waistDartLeft.shift(135, 10)
      macro('grainline', {
        from: new Point(pGrainLineTo.x, points.cfCut.y),
        to: pGrainLineTo,
        grainline: true,
      })
      const lacingDistance = points.lacingWaist.y - points.lacingCut.y
      if (lacingDistance > 15 * 5) {
        const numberOfEyelets = Math.floor(lacingDistance / 15)
        const eyeletDistance = lacingDistance / (numberOfEyelets + 1)
        for (let i = 0; i < numberOfEyelets; i++) {
          points['eyelet' + i] = new Point(
            points.lacingCut.x + 10,
            points.lacingCut.y + i * eyeletDistance + eyeletDistance
          )
          snippets['eyelet' + i] = new Snippet('eyelet', points['eyelet' + i])
        }
      }
    } else {
      if ('front' == options.zipperLocation) {
        store.cutlist.addCut({ cut: 2, from: 'fabric' })
        macro('grainline', {
          from: points.cfCut.shift(315, 10),
          to: points.cfWaist.shift(45, 10),
          grainline: true,
        })
      } else {
        macro('cutonfold', {
          from: points.cfCut,
          to: points.cfWaist,
          grainline: true,
        })
        store.cutlist.addCut({ cut: 1, from: 'fabric' })
      }
    }

    snippets.shoulderDartTip = new Snippet('notch', points.shoulderDartTip)

    points.titleAnchor = points.waistDartLeft.shiftFractionTowards(
      lacing ? points.lacingCut : points.cfCut,
      0.75
    )
    macro('title', {
      at: points.titleAnchor,
      nr: 1,
      title: 'tristan:frontInside',
    })
    points.gridAnchor = points.hps.clone()

    if (sa) {
      if ('front' == options.zipperLocation) {
        paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
      } else {
        if (options.hem && !options.peplum) {
          paths.sa = new Path()
            .move(points.waistDartLeftHem)
            .join(paths.insideSeam.offset(sa))
            .line(lacing ? points.lacingCut : points.cfCut)
            .attr('class', 'fabric sa')
        } else {
          paths.sa = new Path()
            .move(lacing ? points.lacingWaist : points.cfWaist)
            .join(paths.insideSeam.offset(sa))
            .line(lacing ? points.lacingCut : points.cfCut)
            .attr('class', 'fabric sa')
        }
      }
    }

    macro('hd', {
      from: lacing ? points.lacingWaist : points.cfWaist,
      to: points.shoulderDartInside,
      y: points.hps.y - 25,
      id: 'hpsToDart',
    })
    macro('vd', {
      from: points.cfWaist,
      to: points.shoulderDartInside,
      x: 0 - 30,
      id: 'waistToDart',
    })
    macro('vd', {
      from: points.cfWaist,
      to: points.shoulderDartTip,
      x: 0 - 10,
      id: 'waistToDartTip',
    })
    macro('hd', {
      from: lacing ? points.lacingWaist : points.cfWaist,
      to: points.shoulderDartTip,
      y: points.cfWaist.y + sa + 25,
      id: 'middleToDartTip',
    })

    macro('vd', {
      from: points.cfWaist,
      to: lacing ? points.lacingCut : points.cfCut,
      x: 0 - 20,
      id: 'waistToNeck',
    })
    macro('vd', {
      from: points.cfWaist,
      to: points.strapInside,
      x: 0 - 40,
      id: 'waistToHps',
    })
    macro('hd', {
      from: lacing ? points.lacingWaist : points.cfWaist,
      to: points.waistDartLeft,
      y: points.cfWaist.y + sa + 15,
      id: 'middleToDart',
    })
    macro('hd', {
      from: lacing ? points.lacingCut : points.cfCut,
      to: points.strapInside,
      y: points.strapInside.y - sa - 15,
      id: 'middleToHps',
    })

    return part
  },
}
