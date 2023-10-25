import { frontPoints } from './frontpoints.mjs'

export const frontInside = {
  name: 'noble.frontInside',
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

    if (options.dartPosition == 'shoulder') {
      paths.insideSeam = new Path()
        .move(points.cfHem)
        .line(points.waistDartLeft)
        .curve(points.waistDartLeftCp, points.shoulderDartTipCpDownInside, points.shoulderDartTip)
        .line(points.shoulderDartInside)
        .line(points.hps)
        .curve(points.hpsCp2, points.cfNeckCp1, points.cfNeck)

      paths.seam = paths.insideSeam
        .join(new Path().move(points.cfNeck).line(points.cfHem))
        .close()
        .attr('class', 'fabric')

      store.set(
        'shoulderDartTipNotch',
        new Path()
          .move(points.waistDartLeft)
          .curve(points.waistDartLeftCp, points.shoulderDartTipCpDownInside, points.shoulderDartTip)
          .length()
      )
    } else {
      paths.insideSeam = new Path()
        .move(points.cfHem)
        .line(points.waistDartLeft)
        .curve(
          points.waistDartLeftCp,
          points.armholeDartTipCpDownInside,
          points.armholeDartTipInside
        )
        .curve(points.waistCircleInsideCp1, points.armholeCircleInsideCp1, points.armholeDartInside)
        .join(paths.armholeInside)
        .line(points.hps)
        .curve(points.hpsCp2, points.cfNeckCp1, points.cfNeck)

      paths.seam = paths.insideSeam
        .join(new Path().move(points.cfNeck).line(points.cfHem))
        .close()
        .attr('class', 'fabric')

      store.set(
        'shoulderDartTipNotch',
        new Path()
          .move(points.waistDartLeft)
          .curve(
            points.waistDartLeftCp,
            points.armholeDartTipCpDownInside,
            points.armholeDartTipInside
          )
          .length()
      )
    }

    macro('cutonfold', {
      from: points.cfNeck,
      to: points.cfHem,
      grainline: true,
    })

    if (options.dartPosition == 'shoulder') {
      snippets.shoulderDartTip = new Snippet('notch', points.shoulderDartTip)
    } else {
      snippets.shoulderDartTip = new Snippet('notch', points.armholeDartTipInside)
    }
    points.titleAnchor = new Point(points.hpsCp2.x * 0.75, points.cfNeckCp1.y * 1.5)
    macro('title', {
      at: points.titleAnchor,
      nr: 1,
      title: 'frontInside',
    })
    points.gridAnchor = points.hps.clone()

    points.scaleboxAnchor = points.titleAnchor.shift(-90, 90).shift(0, 10)
    macro('scalebox', { at: points.scaleboxAnchor, rotate: 270 })

    if (sa) {
      paths.sa = paths.insideSeam.offset(sa).line(points.cfNeck).attr('class', 'fabric sa')
      paths.sa = paths.sa.move(points.cfHem).line(paths.sa.start())
    }

    let extraOffset = 0
    if (options.dartPosition == 'shoulder') {
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
    } else {
      extraOffset = 10
      macro('hd', {
        from: points.hps,
        to: points.shoulderCp1,
        y: points.hps.y - 35,
        id: 'hpsToShoulder',
      })
      macro('hd', {
        from: points.hps,
        to: points.armholeDartInsideCp2,
        y: points.hps.y - 25,
        id: 'hpsToDart',
      })
      macro('vd', {
        from: points.cfHem,
        to: points.armholeDartInsideCp2,
        x: 0 - 20,
        id: 'hemToDart',
      })
      macro('vd', {
        from: points.cfHem,
        to: points.shoulderCp1,
        x: 0 - 40,
        id: 'hemToShoulder',
      })
      macro('vd', {
        from: points.cfHem,
        to: points.armholeDartTipInside,
        x: 0 - 10,
        id: 'hemToDartTip',
      })
      macro('hd', {
        from: points.cfBust,
        to: points.armholeDartTipInside,
        y: points.cfHem.y + sa + 25,
        id: 'middleToDartTip',
      })
    }

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
