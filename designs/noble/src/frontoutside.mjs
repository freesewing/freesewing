import { frontPoints } from './frontpoints.mjs'
import { frontInside } from './frontinside.mjs'

function nobleFrontOutside({
  store,
  sa,
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
  delete points.bustDartTop
  delete points.bustSide
  delete points.bustDartMiddle
  delete points.bustDartBottom
  delete points.bustDartCpBottom
  delete points.bustB
  delete points.bustDartEdge
  macro('cutonfold', false)

  if (options.dartPosition == 'shoulder') {
    paths.princessSeam = new Path()
      .move(points.shoulderDartOutside)
      .curve(
        points.shoulderDartTipCpDownOutside,
        points.waistUpDartRightCpUp,
        points.waistUpDartRight
      )
      .curve(points.waistUpDartRightCpDown, points.waistCpUp, points.waistDartRight)
      .hide()
    paths.armhole = new Path()
      .move(points.armhole)
      .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
      .curve_(points.armholePitchCp2, points.shoulder)
      .hide()

    paths.seam = new Path()
      .move(points.waistDartRight)
      .line(points.sideHem)
      .line(points.armhole)
      .join(paths.armhole)
      .line(points.shoulderDartOutside)
      .join(paths.princessSeam)
      .close()
      .attr('class', 'fabric')
  } else {
    paths.princessSeam = new Path()
      .move(points.armholeDartOutside)
      .curve(points.armholeCircleOutsideCp1, points.waistCircleOutsideCp1, points.waistUpDartRight)
      .curve(points.waistUpDartRightCpDown, points.waistCpUp, points.waistDartRight)
      .hide()

    paths.seam = new Path()
      .move(points.waistDartRight)
      .line(points.sideHem)
      .line(points.armhole)
      .join(paths.armholeOutside.reverse())
      .join(paths.princessSeam)
      .close()
      .attr('class', 'fabric')
  }

  points.grainTop = points.armhole.shift(225, 20)
  points.grainBottom = points.sideHemInitial.shift(135, 20)
  macro('grainline', {
    from: points.grainBottom,
    to: points.grainTop,
  })

  store.cutlist.removeCut()
  store.cutlist.addCut()

  if (complete) {
    points.snippet = paths.princessSeam.shiftAlong(
      paths.princessSeam.length() - store.get('shoulderDartTipNotch')
    )
    snippets.shoulderDartTip = new Snippet('notch', points.snippet)

    points.titleAnchor = points.waistDartRight
      .shiftFractionTowards(points.armhole, 0.3)
      .shiftFractionTowards(points.shoulderDartOutside, 0.2)
    macro('title', {
      at: points.titleAnchor,
      nr: 2,
      title: 'Outside Front',
    })

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

    if (paperless) {
      let pLeft = paths.princessSeam.edge('left')
      macro('hd', {
        from: points.waistDartRight,
        to: points.armholeOutsidePitchCp1,
        y: points.sideHemInitial.y + sa + 35,
      })
      macro('hd', {
        from: points.waistDartRight,
        to: points.sideHemInitial,
        y: points.sideHemInitial.y + sa + 25,
      })
      macro('hd', {
        from: pLeft,
        to: points.sideHemInitial,
        y: points.sideHemInitial.y + sa + 15,
      })

      macro('vd', {
        from: points.armholeOutsidePitchCp1,
        to: points.sideHemInitial,
        x: points.sideHemInitial.x + sa + 15,
      })
      macro('vd', {
        from: points.waistDartRight,
        to: pLeft,
        x: pLeft.x - sa - 15,
      })

      if (options.dartPosition == 'shoulder') {
        macro('hd', {
          from: points.shoulderDartOutside,
          to: points.shoulder,
          y: points.shoulderDartOutside.y - sa - 15,
        })
        macro('hd', {
          from: points.snippet,
          to: points.shoulder,
          y: points.shoulderDartOutside.y - sa - 25,
        })
        macro('hd', {
          from: pLeft,
          to: points.shoulder,
          y: points.shoulderDartOutside.y - sa - 35,
        })
        macro('hd', {
          from: points.waistDartRight,
          to: points.shoulder,
          y: points.sideHemInitial.y + sa + 45,
        })
        macro('vd', {
          from: points.shoulder,
          to: points.sideHemInitial,
          x: points.shoulder.x, //+sa + 15,
        })
        macro('vd', {
          from: points.shoulderDartOutside,
          to: points.sideHemInitial,
          x: points.shoulder.x + sa + 15,
        })
        macro('vd', {
          from: points.waistDartRight,
          to: points.shoulderDartOutside,
          x: pLeft.x - sa - 25,
        })
        macro('vd', {
          from: points.snippet,
          to: points.shoulderDartOutside,
          x: pLeft.x - sa - 15,
        })

        let pArmholeLeft = paths.armhole.edge('left')
        macro('hd', {
          from: points.waistDartRight,
          to: pArmholeLeft,
          y: points.sideHemInitial.y + sa + 5,
        })
        macro('vd', {
          from: pArmholeLeft,
          to: points.sideHemInitial,
          x: points.sideHemInitial.x + sa + 25,
        })
      } else {
        let pTop = paths.princessSeam.edge('top')
        macro('hd', {
          from: pLeft,
          to: points.armholeOutsidePitchCp1,
          y: pTop.y - sa - 35,
        })
        macro('hd', {
          from: pLeft,
          to: points.armholeDartOutside,
          y: pTop.y - sa - 25,
        })
        macro('hd', {
          from: pLeft,
          to: pTop,
          y: pTop.y - sa - 15,
        })
        macro('vd', {
          from: points.waistDartRight,
          to: pTop,
          x: pLeft.x - sa - 25,
        })
        macro('vd', {
          from: points.snippet,
          to: pTop,
          x: pLeft.x - sa - 15,
        })
        macro('vd', {
          from: points.armholeDartOutside,
          to: points.sideHemInitial,
          x: points.sideHemInitial.x + sa + 25,
        })
        macro('vd', {
          from: pTop,
          to: points.sideHemInitial,
          x: points.sideHemInitial.x + sa + 35,
        })
      }
    }
  }

  return part
}

export const frontOutside = {
  name: 'noble.frontOutside',
  from: frontPoints,
  after: frontInside,
  draft: nobleFrontOutside,
}
