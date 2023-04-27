import { backPoints } from './backpoints.mjs'

function nobleBackInside({
  sa,
  Point,
  points,
  Path,
  paths,
  Snippet,
  snippets,
  options,
  complete,
  paperless,
  macro,
  part,
}) {
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

  ;(points.grainlineFrom = new Point(points.hps.x / 2, points.shoulder.y)),
    (points.grainlineTo = new Point(points.hps.x / 2, points.waistSide.y)),
    macro('grainline', {
      from: points.grainlineFrom,
      to: points.grainlineTo,
    })

  if (complete) {
    snippets.dartTip = new Snippet('notch', points.dartTip)

    macro('title', {
      at: points.titleAnchor,
      nr: 3,
      title: options.dartPosition != 'shoulder' ? 'Back' : 'Inside Back',
    })

    if (sa) paths.sa = paths.insideSeam.offset(sa).attr('class', 'fabric sa')

    if (paperless) {
      if (options.dartPosition == 'shoulder') {
        points.shoulderPoint = points.shoulderDart.clone()
      } else {
        points.shoulderPoint = points.shoulder.clone()
      }
      macro('hd', {
        from: points.waistCenter,
        to: points.shoulderPoint,
        y: points.waistCenter.y + sa + 15,
      })
      macro('hd', {
        from: points.waistCenter,
        to: points.dartTip,
        y: points.waistCenter.y + sa + 25,
      })
      macro('hd', {
        from: points.waistCenter,
        to: points.dartBottomLeft,
        y: points.waistCenter.y + sa + 35,
      })
      macro('hd', {
        from: points.cbNeck,
        to: points.dartBottomLeft,
        y: points.waistCenter.y + sa + 45,
      })
      macro('hd', {
        from: points.cbNeck,
        to: points.hps,
        y: points.hps.y - sa - 15,
      })
      macro('hd', {
        from: points.hps,
        to: points.shoulderPoint,
        y: points.hps.y - sa - 15,
      })
      if (options.dartPosition != 'shoulder') {
        macro('hd', {
          from: points.dartTip,
          to: points.waistSide,
          y: points.waistCenter.y + sa + 25,
        })
        macro('hd', {
          from: points.dartBottomRight,
          to: points.waistSide,
          y: points.waistCenter.y + sa + 35,
        })
        macro('hd', {
          from: points.dartBottomRight,
          to: points.armhole,
          y: points.waistCenter.y + sa + 45,
        })
      }

      let extraOffset = 0
      if (options.dartPosition != 'shoulder') {
        macro('vd', {
          from: points.shoulderPoint,
          to: points.waistSide,
          x: points.shoulderPoint.x + sa + 25,
        })
        macro('vd', {
          from: points.armhole,
          to: points.waistSide,
          x: points.shoulderPoint.x + sa + 15,
        })
        extraOffset = 10
      }

      macro('vd', {
        from: points.shoulderPoint,
        to: points.dartTip,
        x: points.shoulderPoint.x + sa + 15,
      })
      macro('vd', {
        from: points.shoulderPoint,
        to: points.dartBottomLeft,
        x: points.shoulderPoint.x + sa + 25 + extraOffset,
      })
      macro('vd', {
        from: points.shoulderPoint,
        to: points.waistCenter,
        x: points.shoulderPoint.x + sa + 35 + extraOffset,
      })
      macro('vd', {
        from: points.hps,
        to: points.waistCenter,
        x: points.shoulderPoint.x + sa + 45 + extraOffset,
      })
      macro('vd', {
        from: points.waistCenter,
        to: points.cbNeck,
        x: points.cbNeck.x - sa - 15,
      })
      macro('vd', {
        from: points.waistCenter,
        to: points.hps,
        x: points.cbNeck.x - sa - 25,
      })
    }
  }

  return part
}

export const backInside = {
  name: 'noble.backInside',
  from: backPoints,
  draft: nobleBackInside,
}
