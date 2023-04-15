import { frontSideDart } from '@freesewing/bella'
import { neckTie } from './neck-tie.mjs'

export const cup = {
  name: 'bee.cup',
  from: frontSideDart,
  hide: {
    inherited: true,
  },
  after: neckTie,
  options: {
    topDepth: { pct: 54, min: 50, max: 80, menu: 'fit' },
    bottomCupDepth: { pct: 8, min: 0, max: 20, menu: 'fit' },
    sideDepth: { pct: 20.6, min: 0, max: 30, menu: 'fit' },
    sideCurve: { pct: 0, min: -50, max: 50, menu: 'fit' },
    frontCurve: { pct: 0, min: -50, max: 50, menu: 'fit' },
    bellaGuide: { bool: false, menu: 'fit' },
  },
  draft: ({
    store,
    sa,
    Point,
    points,
    Path,
    paths,
    options,
    complete,
    paperless,
    macro,
    utils,
    measurements,
    snippets,
    Snippet,
    absoluteOptions,
    part,
  }) => {
    //inherited from Bella
    let angle = store.get('bustDartAngleSide')
    //removing paths and snippets not required from Bella
    for (let i in paths) delete paths[i]
    for (let i in snippets) delete snippets[i]
    //removing macros not required from Bella
    macro('title', false)
    macro('scalebox', false)
    //bella alterations
    points.sideHemNew = points.armhole.shiftOutwards(
      points.bustDartTop,
      points.bustDartBottom.dist(points.sideHemInitial)
    )
    points.waistDartRightRotated = points.waistDartRight.rotate(angle, points.bust)
    if (options.bellaGuide) {
      paths.bellaGuide = new Path()
        .move(points.sideHemNew)
        .line(points.bustDartTop)
        .line(points.armhole)
        .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
        .curve_(points.armholePitchCp2, points.shoulder)
        .line(points.hps)
        .curve(points.hpsCp2, points.cfNeckCp1, points.cfNeck)
        .line(points.cfHem)
        .line(points.waistDartLeft)
        .line(points.bustA)
        .line(points.waistDartRightRotated)
        .line(points.sideHemNew)
        .attr('class', 'various lashed')
        .close()
    }

    //bikini top
    let underbust =
      measurements.bustPointToUnderbust + measurements.bustPointToUnderbust * options.bottomCupDepth
    points.top = points.bustA.shiftTowards(points.hps, measurements.hpsToBust * options.topDepth)
    points.topLeft = points.top.shift(
      points.top.angle(points.hps) + 90,
      absoluteOptions.neckTieWidth / 2
    )
    points.topRight = points.top.shift(
      points.top.angle(points.hps) - 90,
      absoluteOptions.neckTieWidth / 2
    )
    points.leftDart = points.bustA.shiftTowards(points.waistDartLeft, underbust)
    points.rightDart = points.bustA.shiftTowards(points.waistDartRightRotated, underbust)
    points.lefti = utils.beamsIntersect(
      points.leftDart,
      points.leftDart.shift(points.leftDart.angle(points.bustA) + 90, 10),
      points.cfNeck,
      points.cfHem
    )
    points.righti = utils.beamsIntersect(
      points.rightDart,
      points.rightDart.shift(points.rightDart.angle(points.bustA) - 90, 10),
      points.armhole,
      points.sideHemNew
    )
    points.rightiOffset = points.righti.shiftFractionTowards(points.rightDart, options.sideDepth)
    points.sideEdge = points.rightiOffset.shift(
      points.armhole.angle(points.righti),
      absoluteOptions.bandTieWidth
    )
    points.frontEdge = points.lefti.shift(
      points.cfNeck.angle(points.cfHem),
      absoluteOptions.bandTieWidth
    )
    points.middleDart = points.bustA.shift(
      points.bustA.angle(points.leftDart) +
        (points.bustA.angle(points.rightDart) - points.bustA.angle(points.leftDart)) / 2,
      points.bustA.dist(points.leftDart)
    )
    points.casingDart = points.bustA.shiftOutwards(points.middleDart, absoluteOptions.bandTieWidth)
    points.leftControli = utils.beamsIntersect(
      points.casingDart,
      points.casingDart.shift(points.bustA.angle(points.middleDart) - 90, 10),
      points.cfNeck,
      points.cfHem
    )
    points.rightControli = utils.beamsIntersect(
      points.casingDart,
      points.casingDart.shift(points.bustA.angle(points.middleDart) + 90, 10),
      points.armhole,
      points.sideHemNew
    )
    points.leftControl = points.casingDart.shiftFractionTowards(points.leftControli, 0.5)
    points.rightControl = points.casingDart.shiftFractionTowards(points.rightControli, 0.5)
    points.middleSideFront = points.rightiOffset.shiftFractionTowards(points.topRight, 0.5)
    points.sideCurveControl = points.middleSideFront.shiftFractionTowards(
      points.bustA,
      options.sideCurve
    )
    points.middleFront = points.topLeft.shiftFractionTowards(points.lefti, 0.5)
    points.frontCurveControl = points.middleFront.shiftFractionTowards(
      points.bustA,
      options.frontCurve
    )
    points.leftControlOffset = points.leftControl.shiftTowards(
      points.top,
      absoluteOptions.bandTieWidth
    )
    points.rightControlOffset = points.rightControl.shiftTowards(
      points.top,
      absoluteOptions.bandTieWidth
    )
    if (!options.crossBackTies) {
      paths.seam = new Path()
        .move(points.sideEdge)
        .line(points.rightiOffset)
        .curve_(points.sideCurveControl, points.topRight)
        .line(points.topLeft)
        .curve_(points.frontCurveControl, points.lefti)
        .line(points.frontEdge)
        .curve_(points.leftControl, points.casingDart)
        .curve_(points.rightControl, points.sideEdge)
        .close()
    }
    if (options.crossBackTies) {
      paths.seam = new Path()
        .move(points.rightiOffset)
        .curve_(points.sideCurveControl, points.topRight)
        .line(points.topLeft)
        .curve_(points.frontCurveControl, points.lefti)
        .curve_(points.leftControlOffset, points.middleDart)
        .curve_(points.rightControlOffset, points.rightiOffset)
        .close()
    }
    if (complete) {
      points.grainlineTop = points.top.shiftFractionTowards(points.bustA, 0.05)
      points.grainlineBottom = points.bustA.shiftFractionTowards(points.top, 0.05)
      macro('grainline', {
        from: points.grainlineTop,
        to: points.grainlineBottom,
      })
      paths.frontCurve = new Path()
        .move(points.topLeft)
        .curve_(points.frontCurveControl, points.lefti)
        .hide()
      points.frontNotch = paths.frontCurve.shiftFractionAlong(0.5)
      snippets.frontNotch = new Snippet('notch', points.frontNotch)
      snippets.lefti = new Snippet('notch', points.lefti)
      snippets.righti = new Snippet('notch', points.rightiOffset)
      if (!options.crossBackTies) {
        snippets.frontEdge = new Snippet('notch', points.frontEdge)
        snippets.sideEdge = new Snippet('notch', points.sideEdge)
      }
      points.title = points.grainlineBottom.shift(
        points.bustA.angle(points.top) - 90,
        points.grainlineTo.dist(points.grainlineBottom)
      )
      macro('title', {
        at: points.title,
        nr: 1,
        title: 'cup',
        scale: 0.7,
        rotation: 90 - points.bustA.angle(points.top) - 270,
      })
      points.scalebox = new Point(points.lefti.x + 12.7, points.topLeft.y + 12.7)
      macro('miniscale', { at: points.scalebox })
      if (!options.crossBackTies) {
        paths.casingline = new Path()
          .move(points.lefti)
          .curve_(points.leftControlOffset, points.middleDart)
          .curve_(points.rightControlOffset, points.rightiOffset)
          .attr('class', 'fabric lashed')
          .attr('data-text', 'Casing Stitching Line')
          .attr('data-text-class', 'center')
      }
      points.logo = points.grainlineTop.shiftOutwards(
        points.grainlineBottom,
        points.grainlineTo.dist(points.grainlineBottom) * 9
      )
      snippets.logo = new Snippet('logo', points.logo)
        .attr('data-rotate', 90 - points.bustA.angle(points.top) - 270)
        .attr('data-scale', 0.7)
      if (!options.ties) {
        let neckTieLength = utils.units(store.get('neckTieLength'))
        points.neckTieLength = points.__miniscaleImperialBottomLeft
          .shiftFractionTowards(points.lefti, 1 / 10)
          .attr('data-text', 'Neck Tie Length: ')
          .attr('data-text', neckTieLength)
        if (!options.crossBackTies) {
          let bandTieLength = utils.units(
            measurements.underbust + measurements.underbust * options.bandTieLength
          )
          points.backTieLength = points.__miniscaleImperialBottomLeft
            .shiftFractionTowards(points.lefti, 2 / 10)
            .attr('data-text', 'Band Tie Length: ')
            .attr('data-text', bandTieLength)
        }
      }
      if (sa) {
        paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
      }
      if (paperless) {
        if (!options.crossBackTies) {
          macro('vd', {
            from: points.frontEdge,
            to: points.lefti,
            x: points.frontEdge.x - sa - 20,
          })
        }
        macro('vd', {
          from: points.lefti,
          to: points.topLeft,
          x: points.frontEdge.x - sa - 20,
        })
        macro('vd', {
          from: points.topLeft,
          to: points.topRight,
          x: points.frontEdge.x - sa - 20,
        })
        if (!options.crossBackTies) {
          macro('vd', {
            from: points.frontEdge,
            to: points.topRight,
            x: points.frontEdge.x - sa - 30,
          })
        }
        macro('hd', {
          from: points.topLeft,
          to: points.topRight,
          y: points.topRight.y - sa - 20,
        })
        macro('hd', {
          from: points.lefti,
          to: points.topLeft,
          y: points.topRight.y - sa - 20,
        })
        macro('hd', {
          from: points.topRight,
          to: points.rightiOffset,
          y: points.topRight.y - sa - 20,
        })
        if (!options.crossBackTies) {
          macro('hd', {
            from: points.rightiOffset,
            to: points.sideEdge,
            y: points.topRight.y - sa - 20,
          })
        }
        macro('hd', {
          from: points.frontEdge,
          to: points.rightiOffset,
          y: points.topRight.y - sa - 30,
        })
        if (!options.crossBackTies) {
          macro('hd', {
            from: points.frontEdge,
            to: points.sideEdge,
            y: points.topRight.y - sa - 40,
          })
        }
        macro('vd', {
          from: points.topRight,
          to: points.rightiOffset,
          x: points.sideEdge.x + sa + 20,
        })
        if (!options.crossBackTies) {
          macro('vd', {
            from: points.rightiOffset,
            to: points.sideEdge,
            x: points.sideEdge.x + sa + 20,
          })
          macro('vd', {
            from: points.topRight,
            to: points.sideEdge,
            x: points.sideEdge.x + sa + 30,
          })
          macro('vd', {
            from: points.sideEdge,
            to: points.casingDart,
            x: points.sideEdge.x + sa + 10,
          })
          macro('hd', {
            from: points.sideEdge,
            to: points.casingDart,
            y: points.casingDart.y + sa + 20,
          })
          macro('hd', {
            from: points.casingDart,
            to: points.frontEdge,
            y: points.casingDart.y + sa + 20,
          })
          macro('vd', {
            from: points.casingDart,
            to: points.frontEdge,
            x: points.frontEdge.x - sa - 10,
          })
          macro('vd', {
            from: points.casingDart,
            to: points.topRight,
            x: points.frontEdge.x - sa - 40,
          })
        }
        if (options.crossBackTies) {
          macro('vd', {
            from: points.rightiOffset,
            to: points.middleDart,
            x: points.sideEdge.x + sa + 10,
          })
          macro('hd', {
            from: points.rightiOffset,
            to: points.middleDart,
            y: points.casingDart.y + sa + 20,
          })
          macro('hd', {
            from: points.middleDart,
            to: points.lefti,
            y: points.casingDart.y + sa + 20,
          })
          macro('vd', {
            from: points.middleDart,
            to: points.lefti,
            x: points.frontEdge.x - sa - 10,
          })
          macro('vd', {
            from: points.middleDart,
            to: points.topRight,
            x: points.frontEdge.x - sa - 30,
          })
        }
        macro('ld', {
          from: points.rightiOffset,
          to: points.righti,
        })
      }
      if (options.crossBackTies) {
        paths.curve = new Path()
          .move(points.lefti)
          .curve_(points.leftControlOffset, points.middleDart)
          .curve_(points.rightControlOffset, points.rightiOffset)
          .hide()
        paths.dart = new Path()
          .move(
            points.bustA.shiftOutwards(points.leftDart, points.topRight.dist(points.rightiOffset))
          )
          .line(points.bustA)
          .line(
            points.bustA.shiftOutwards(points.rightDart, points.topRight.dist(points.rightiOffset))
          )
          .hide()
        for (let p of paths.curve.intersects(paths.dart)) {
          points.rightDarti = points.bustA.shiftFractionTowards(p, 1)
        }
        for (let p of paths.curve.reverse().intersects(paths.dart)) {
          points.leftDarti = points.bustA.shiftFractionTowards(p, 1)
        }
        let leftCurve = paths.curve.reverse().split(points.leftDarti)
        for (let i in leftCurve) {
          paths.leftCurve = leftCurve[i].hide()
        }
        let rightCurve = paths.curve.split(points.rightDarti)
        for (let i in rightCurve) {
          paths.rightCurve = rightCurve[i].hide()
        }
        store.set('gatherLength', paths.leftCurve.length() + paths.rightCurve.length())
      }
    }
    return part
  },
}
