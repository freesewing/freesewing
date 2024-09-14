import { frontPoints } from './frontpoints.mjs'
import { frontInside } from './frontinside.mjs'

export const frontOutside = {
  name: 'tristan.frontOutside',
  from: frontPoints,
  after: frontInside,
  draft: ({ store, sa, points, Path, paths, Snippet, snippets, options, macro, part }) => {
    delete points.bustDartTop
    delete points.bustSide
    delete points.bustDartMiddle
    delete points.bustDartBottom
    delete points.bustDartCpBottom
    delete points.bustB
    delete points.bustDartEdge

    paths.cut = new Path()
      .move(points.armhole)
      .curve(points.armholeCutCp, points.strapOutsideCp, points.strapOutside)
      .hide()

    paths.armhole = new Path()
      .move(points.armhole)
      .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
      .curve_(points.armholePitchCp2, points.shoulder)
      .hide()

    if (options.hem && !options.peplum) {
      paths.hem = new Path()
        .move(points.waistDartRight)
        .line(points.waistDartRightHem)
        .line(points.sideWaistHem)
        .line(points.sideWaist)
        .hide()
      paths.hemFold = new Path()
        .move(points.waistDartRight)
        .line(points.sideWaist)
        .addClass('note dashed')
        .addText('hem', 'center note')
    } else {
      paths.hem = new Path().move(points.waistDartRight).line(points.sideWaist).hide()
    }

    paths.seamSA = new Path()
      .move(points.sideWaist)
      .line(points.armhole)
      .join(paths.cut)
      .line(points.shoulderDartOutside)
      .join(paths.princessSeam)
      .line(points.waistDartRight)
      .hide()

    paths.seam = paths.seamSA.clone().join(paths.hem).close().unhide().attr('class', 'fabric')

    points.grainTop = points.armhole.shift(225, 20)
    points.grainBottom = points.sideWaistInitial.shift(135, 20)
    macro('grainline', {
      from: points.grainBottom,
      to: points.grainTop,
    })

    store.cutlist.addCut({ cut: 2, from: 'fabric' })

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
      title: 'tristan:frontOutside',
    })
    points.gridAnchor = points.armholeCpTarget.clone()

    points.scaleboxAnchor = points.titleAnchor.shiftFractionTowards(points.sideWaist, 0.5)
    points.scaleboxAnchor.x = points.titleAnchor.x
    macro('miniscale', { at: points.scaleboxAnchor })

    if (sa) {
      if (options.hem && !options.peplum) {
        paths.sa = new Path()
          .move(points.sideWaistHem)
          .join(
            new Path()
              .move(points.sideWaistHem)
              .join(paths.seamSA)
              .line(points.waistDartRightHem)
              .offset(sa)
          )
          .line(points.waistDartRightHem)
          .attr('class', 'fabric sa')
      } else {
        paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
      }
    }

    const pLeft = paths.princessSeam.edge('left')
    macro('hd', {
      from: points.waistDartRight,
      to: points.armholeOutsidePitchCp1,
      y: points.sideWaistInitial.y + sa + 35,
      id: 'dartToArmhole',
    })
    macro('hd', {
      from: points.waistDartRight,
      to: points.sideWaistInitial,
      y: points.sideWaistInitial.y + sa + 25,
      id: 'dartToSide',
    })
    macro('hd', {
      from: pLeft,
      to: points.sideWaistInitial,
      y: points.sideWaistInitial.y + sa + 15,
      id: 'leftToSide',
    })
    macro('hd', {
      from: points.shoulderDartOutside,
      to: points.strapOutside,
      y: points.shoulderDartOutside.y - sa - 15,
      id: 'dartToShoulder',
    })
    macro('hd', {
      from: points.snippet,
      to: points.strapOutside,
      y: points.shoulderDartOutside.y - sa - 25,
      id: 'dartPointToShoulder',
    })
    macro('hd', {
      from: pLeft,
      to: points.strapOutside,
      y: points.shoulderDartOutside.y - sa - 35,
      id: 'leftToShoulder',
    })

    macro('vd', {
      from: points.armholeOutsidePitchCp1,
      to: points.sideWaistInitial,
      x: points.sideWaistInitial.x + sa + 15,
      id: 'waistToArmhole',
    })
    macro('vd', {
      from: points.waistDartRight,
      to: pLeft,
      x: pLeft.x - sa - 15,
      id: 'waistToLeft',
    })
    macro('vd', {
      from: points.strapOutside,
      to: points.sideWaistInitial,
      x: points.sideWaistInitial.x + sa + 25,
      id: 'waistToShoulder',
    })
    macro('vd', {
      from: points.shoulderDartOutside,
      to: points.sideWaistInitial,
      x: points.shoulderDartOutside.x,
      id: 'sideWaistToShoulderDart',
    })
    macro('vd', {
      from: points.waistDartRight,
      to: points.shoulderDartOutside,
      x: pLeft.x - sa - 25,
      id: 'waistToShoulderDart',
    })
    macro('vd', {
      from: points.snippet,
      to: points.shoulderDartOutside,
      x: pLeft.x - sa - 15,
      id: 'shoulderDartToDartPoint',
    })

    return part
  },
}
