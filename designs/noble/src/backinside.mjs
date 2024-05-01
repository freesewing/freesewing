import { backPoints } from './backpoints.mjs'

export const backInside = {
  name: 'noble.backInside',
  from: backPoints,
  draft: ({ sa, Point, points, Path, paths, Snippet, snippets, options, macro, store, part }) => {
    if (options.dartPosition != 'shoulder') {
      paths.insideSeam = paths.seam.clone().unhide()
    } else {
      // Hide Bella paths
      for (let key of Object.keys(paths)) paths[key].hide()
      for (let i in snippets) delete snippets[i]

      paths.insideSeam = new Path()
        .move(points.cbNeck)
        .curve_(points.cbNeckCp2, points.waistCenter)
        .line(points.dartBottomLeft)
        .curve(points.dartLeftCp, points.shoulderDartCpDown, points.dartTip)
        .curve(points.shoulderDartCpUp, points.shoulderDart, points.shoulderDart)
        .line(points.hps)
        ._curve(points.cbNeckCp1, points.cbNeck)
        .close()
        .attr('class', 'fabric')
    }

    points.grainlineFrom = new Point(points.hps.x / 2, points.shoulder.y)
    points.grainlineTo = new Point(points.hps.x / 2, points.waistSide.y)
    macro('grainline', {
      from: points.grainlineFrom,
      to: points.grainlineTo,
    })

    snippets.dartTip = new Snippet('notch', points.dartTip)

    store.cutlist.removeCut()
    store.cutlist.addCut({ onFold: false })
    macro('title', {
      at: points.titleAnchor,
      nr: 3,
      title: options.dartPosition != 'shoulder' ? 'back' : 'backInside',
    })
    points.gridAnchor = points.hps.clone()

    if (sa) paths.sa = paths.insideSeam.offset(sa).attr('class', 'fabric sa')

    if (options.dartPosition == 'shoulder') {
      points.shoulderPoint = points.shoulderDart.clone()
    } else {
      points.shoulderPoint = points.shoulder.clone()
    }
    macro('hd', {
      from: points.waistCenter,
      to: points.shoulderPoint,
      y: points.waistCenter.y + sa + 15,
      id: 'middleToShoulder',
    })
    macro('hd', {
      from: points.waistCenter,
      to: points.dartTip,
      y: points.waistCenter.y + sa + 25,
      id: 'middleToDartPoint',
    })
    macro('hd', {
      from: points.waistCenter,
      to: points.dartBottomLeft,
      y: points.waistCenter.y + sa + 35,
      id: 'middleToDart',
    })
    macro('hd', {
      from: points.cbNeck,
      to: points.dartBottomLeft,
      y: points.waistCenter.y + sa + 45,
      id: 'neckToDart',
    })
    macro('hd', {
      from: points.cbNeck,
      to: points.hps,
      y: points.hps.y - sa - 15,
      id: 'neckToHps',
    })
    macro('hd', {
      from: points.hps,
      to: points.shoulderPoint,
      y: points.hps.y - sa - 15,
      id: 'hpsToShoulder',
    })
    if (options.dartPosition != 'shoulder') {
      macro('hd', {
        from: points.dartTip,
        to: points.waistSide,
        y: points.waistCenter.y + sa + 25,
        id: 'dartPointToSide',
      })
      macro('hd', {
        from: points.dartBottomRight,
        to: points.waistSide,
        y: points.waistCenter.y + sa + 35,
        id: 'dartToSide',
      })
      macro('hd', {
        from: points.dartBottomRight,
        to: points.armhole,
        y: points.waistCenter.y + sa + 45,
        id: 'dartToArmhole',
      })
    }

    let extraOffset = 0
    if (options.dartPosition != 'shoulder') {
      macro('vd', {
        from: points.shoulderPoint,
        to: points.waistSide,
        x: points.shoulderPoint.x + sa + 25,
        id: 'sideToShoulder',
      })
      macro('vd', {
        from: points.armhole,
        to: points.waistSide,
        x: points.shoulderPoint.x + sa + 15,
        id: 'sideToArmhole',
      })
      extraOffset = 10
    }

    macro('vd', {
      from: points.shoulderPoint,
      to: points.dartTip,
      x: points.shoulderPoint.x + sa + 15,
      id: 'dartPointToShoulder',
    })
    macro('vd', {
      from: points.shoulderPoint,
      to: points.dartBottomLeft,
      x: points.shoulderPoint.x + sa + 25 + extraOffset,
      id: 'dartToShoulder',
    })
    macro('vd', {
      from: points.shoulderPoint,
      to: points.waistCenter,
      x: points.shoulderPoint.x + sa + 35 + extraOffset,
      id: 'middleToShoulder',
    })
    macro('vd', {
      from: points.hps,
      to: points.waistCenter,
      x: points.shoulderPoint.x + sa + 45 + extraOffset,
      id: 'middleToHps',
    })
    macro('vd', {
      from: points.waistCenter,
      to: points.cbNeck,
      x: points.cbNeck.x - sa - 15,
      id: 'hemToNeck',
    })
    macro('vd', {
      from: points.waistCenter,
      to: points.hps,
      x: points.cbNeck.x - sa - 25,
      id: 'hemToHps',
    })

    return part
  },
}
