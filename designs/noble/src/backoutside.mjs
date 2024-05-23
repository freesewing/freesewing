import { backPoints } from './backpoints.mjs'

export const backOutside = {
  name: 'noble.backOutside',
  from: backPoints,
  draft: ({ sa, Point, points, Path, paths, Snippet, snippets, options, macro, store, part }) => {
    if (options.dartPosition != 'shoulder') {
      return part
    }

    paths.dart = new Path()
      .move(points.shoulderDart)
      .curve(points.shoulderDart, points.shoulderDartCpUp, points.dartTip)
      .curve(points.shoulderDartCpDown, points.dartRightCp, points.dartBottomRight)
      .hide()

    paths.outsideSeam = new Path()
      .move(points.dartBottomRight)
      .line(points.waistSide)
      .curve_(points.waistSideCp2, points.armhole)
      .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
      .curve_(points.armholePitchCp2, points.shoulder)
      .line(points.shoulderDart)
      .join(paths.dart)
      .close()
      .attr('class', 'fabric')

    points.grainlineFrom = new Point(
      Math.max(points.shoulderDart.x, points.dartBottomRight.x),
      points.shoulder.y
    )
    points.grainlineTo = new Point(
      points.grainlineFrom.x,
      points.waistSide.y - (points.waistSide.y - points.shoulder.y) * 0.4
    )

    macro('grainline', {
      from: points.grainlineFrom,
      to: points.grainlineTo,
    })

    snippets.dartTip = new Snippet('notch', points.dartTip)

    store.cutlist.removeCut()
    store.cutlist.addCut({ onFold: false })
    points.titleAnchor = points.dartBottomRight
      .shiftFractionTowards(points.waistSide, 0.1)
      .shiftFractionTowards(points.shoulder, 0.3)
    macro('title', {
      at: points.titleAnchor,
      nr: 4,
      title: 'backOutside',
    })
    points.gridAnchor = points.armholeCpTarget.clone()

    if (sa) paths.sa = paths.outsideSeam.offset(sa).attr('class', 'fabric sa')

    let pLeft = paths.dart.edge('left')
    macro('hd', {
      from: pLeft,
      to: points.waistSide,
      y: points.waistCenter.y + sa + 15,
      id: 'leftToSide',
    })
    macro('hd', {
      from: points.dartBottomRight,
      to: points.armhole,
      y: points.waistCenter.y + sa + 25,
      id: 'dartToArmhole',
    })
    macro('hd', {
      from: points.dartTip,
      to: points.waistSide,
      y: points.waistCenter.y + sa + 35,
      id: 'leftToSide',
    })
    macro('hd', {
      from: points.dartBottomRight,
      to: points.waistSide,
      y: points.waistCenter.y + sa + 45,
      id: 'dartToSide',
    })
    macro('hd', {
      from: pLeft,
      to: points.shoulder,
      y: points.shoulderDart.y - sa - 15,
      id: 'leftToShoulder',
    })
    macro('hd', {
      from: points.shoulderDart,
      to: points.shoulder,
      y: points.shoulderDart.y - sa - 25,
      id: 'dartToShoulder',
    })
    macro('hd', {
      from: points.shoulderDart,
      to: points.armhole,
      y: points.shoulderDart.y - sa - 35,
      id: 'dartToArmhole',
    })

    macro('vd', {
      from: points.shoulder,
      to: points.dartTip,
      x: points.armhole.x + sa + 15,
      id: 'dartPointToShoulder',
    })
    macro('vd', {
      from: points.armhole,
      to: points.waistSide,
      x: points.armhole.x + sa + 15,
      id: 'sideToArmhole',
    })
    macro('vd', {
      from: points.shoulder,
      to: points.waistSide,
      x: points.armhole.x + sa + 25,
      id: 'sideToShoulder',
    })
    macro('vd', {
      from: points.shoulder,
      to: points.dartBottomRight,
      x: points.armhole.x + sa + 35,
      id: 'dartToShoulder',
    })
    macro('vd', {
      from: points.shoulderDart,
      to: points.dartBottomRight,
      x: points.armhole.x + sa + 45,
      id: 'dartToDart',
    })

    return part
  },
}
