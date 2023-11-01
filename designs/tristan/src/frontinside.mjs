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

    paths.insideSeam = new Path()
      .move(lacing ? points.lacingHem : points.cfHem)
      .line(points.waistDartLeft)
      .curve(points.waistDartLeftCp, points.shoulderDartTipCpDownInside, points.shoulderDartTip)
      .line(points.shoulderDartInside)
      .join(paths.cut)

    paths.seam = paths.insideSeam
      .join(
        lacing
          ? new Path().move(points.lacingCut).line(points.lacingHem)
          : new Path().move(points.cfCut).line(points.cfHem)
      )
      .close()
      .attr('class', 'fabric')

    store.set(
      'shoulderDartTipNotch',
      new Path()
        .move(points.waistDartLeft)
        .curve(points.waistDartLeftCp, points.shoulderDartTipCpDownInside, points.shoulderDartTip)
        .length()
    )

    if ('front' != options.zipperLocation) {
      macro('cutonfold', {
        from: points.cfCut,
        to: points.cfHem,
        grainline: true,
      })
    }

    if (lacing) {
      paths.originalSide = new Path()
        .move(points.lacingCut)
        .line(points.cfCut)
        .line(points.cfHem)
        .line(points.lacingHem)
        .setClass('note dashed')
    }

    snippets.shoulderDartTip = new Snippet('notch', points.shoulderDartTip)

    points.titleAnchor = points.waistDartLeft.shiftFractionTowards(
      lacing ? points.lacingCut : points.cfCut,
      0.75
    )
    macro('title', {
      at: points.titleAnchor,
      nr: 1,
      title: 'frontInside',
    })
    points.gridAnchor = points.hps.clone()

    points.scaleboxAnchor = points.titleAnchor.shift(-90, 90).shift(0, 10)
    // macro('scalebox', { at: points.scaleboxAnchor, rotate: 270 })

    if (sa) {
      if ('front' == options.zipperLocation) {
        paths.sa = paths.seam
          .offset(sa)
          .line(lacing ? points.lacingCut : points.cfCut)
          .attr('class', 'fabric sa')
      } else {
        paths.sa = paths.insideSeam.offset(sa).line(points.cfCut).attr('class', 'fabric sa')
        paths.sa = paths.sa.move(points.cfHem).line(paths.sa.start())
      }
    }

    let extraOffset = 0
    macro('hd', {
      from: points.cfNeck,
      to: points.shoulderDartInside,
      y: points.hps.y - 25,
      id: 'hpsToDart',
    })
    macro('vd', {
      from: points.cfHem,
      to: points.shoulderDartInside,
      x: 0 - 30,
      id: 'hemToDart',
    })
    macro('vd', {
      from: points.cfHem,
      to: points.shoulderDartTip,
      x: 0 - 10,
      id: 'hemToDartTip',
    })
    macro('hd', {
      from: points.cfBust,
      to: points.shoulderDartTip,
      y: points.cfHem.y + sa + 25,
      id: 'middleToDartTip',
    })

    macro('vd', {
      from: points.cfHem,
      to: points.cfNeck,
      x: 0 - 20 - extraOffset,
      id: 'hemToNeck',
    })
    macro('vd', {
      from: points.cfHem,
      to: points.hps,
      x: 0 - 40 - extraOffset,
      id: 'hemToHps',
    })
    macro('hd', {
      from: points.cfHem,
      to: points.waistDartLeft,
      y: points.cfHem.y + sa + 15,
      id: 'middleToDart',
    })
    macro('hd', {
      from: points.cfNeck,
      to: points.hps,
      y: points.hps.y - sa - 15,
      id: 'middleToHps',
    })

    return part
  },
}
