import { frontSideDart } from '@freesewing/bella'
import { neckTie } from './neck-tie.mjs'

export const cup = {
  name: 'bee.cup',
  from: frontSideDart,
  hide: {
    from: true,
    inherited: true,
  },
  after: neckTie,
  measurements: ['bustPointToUnderbust'],
  options: {
    //Bee's
    topDepth: { pct: 54, min: 50, max: 80, menu: 'fit' },
    bottomCupDepth: { pct: 8, min: 0, max: 20, menu: 'fit' },
    sideDepth: { pct: 20.6, min: 0, max: 30, menu: 'fit' },
    sideCurve: { pct: 0, min: -50, max: 50, menu: 'fit' },
    frontCurve: { pct: 0, min: -50, max: 50, menu: 'fit' },
    bellaGuide: { bool: false, menu: 'fit' },
    pointedTieEnds: { bool: false, menu: 'style' },
    duoColorTies: { bool: false, menu: 'style' },
    //changed from Bella
    backArmholeCurvature: 0.63,
    backArmholePitchDepth: 0.35,
    backArmholeSlant: 5,
    frontArmholeCurvature: 0.63,
    bustDartCurve: 1,
    bustDartLength: 1,
    waistDartLength: 1,
    backHemSlope: 2.5,
    backNeckCutout: 0.06,
    //catergory changed from Bella
    armholeDepth: { pct: 44, min: 38, max: 46, menu: 'advanced' },
    frontArmholePitchDepth: { pct: 29, max: 31, min: 27, menu: 'advanced' },
    backDartHeight: { pct: 46, min: 38, max: 54, menu: 'advanced' },
    frontShoulderWidth: { pct: 95, max: 98, min: 92, menu: 'advanced' },
    highBustWidth: { pct: 86, max: 92, min: 80, menu: 'advanced' },
  },
  draft: ({
    store,
    sa,
    points,
    Path,
    paths,
    options,
    complete,
    macro,
    utils,
    measurements,
    snippets,
    Snippet,
    absoluteOptions,
    part,
  }) => {
    /*
     * Cleaning up paths and snippets from Bella
     */
    for (let i in paths) delete paths[i]
    for (let i in snippets) delete snippets[i]

    /*
     * Removing macros from Bella
     */
    macro('rmtitle')
    macro('rmscalebox')

    /*
     * Bella alterations
     */
    points.sideHemNew = points.armhole.shiftOutwards(
      points.bustDartTop,
      points.bustDartBottom.dist(points.sideHemInitial)
    )
    points.waistDartRightRotated = points.waistDartRight.rotate(
      store.get('bustDartAngleSide'),
      points.bust
    )
    // Bikini top
    const underbust =
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

    points.bottomEdge = options.crossBackTies
      ? new Path()
          .move(points.lefti)
          .curve_(points.leftControlOffset, points.middleDart)
          .curve_(points.rightControlOffset, points.rightiOffset)
          .edge('bottom')
      : new Path()
          .move(points.frontEdge)
          .curve_(points.leftControl, points.casingDart)
          .curve_(points.rightControl, points.sideEdge)
          .edge('bottom')

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
        .addClass('note help')
        .close()
    }

    paths.seam = options.crossBackTies
      ? new Path()
          .move(points.rightiOffset)
          .curve_(points.sideCurveControl, points.topRight)
          .line(points.topLeft)
          .curve_(points.frontCurveControl, points.lefti)
          .curve_(points.leftControlOffset, points.middleDart)
          .curve_(points.rightControlOffset, points.rightiOffset)
          .close()
      : new Path()
          .move(points.sideEdge)
          .line(points.rightiOffset)
          .curve_(points.sideCurveControl, points.topRight)
          .line(points.topLeft)
          .curve_(points.frontCurveControl, points.lefti)
          .line(points.frontEdge)
          .curve_(points.leftControl, points.casingDart)
          .curve_(points.rightControl, points.sideEdge)
          .close()

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

    /*
     * Annotations
     */
    // Cut list
    // Removing the cutonfold indicator should do the trick, but it does not
    // So I am setting ignoreOnFold below until I fix this
    macro('rmcutonfold')
    store.cutlist.addCut({ cut: 2, material: 'fabric', ignoreOnFold: true })

    points.gridAnchor = points.lefti

    if (options.reversible)
      store.cutlist.addCut({ cut: 2, material: 'altFabric1', ignoreOnFold: true })
    // Grainline
    points.grainlineTop = points.top.shiftFractionTowards(points.bustA, 0.05)
    points.grainlineBottom = points.bustA.shiftFractionTowards(points.top, 0.05)
    macro('grainline', {
      from: points.grainlineTop,
      to: points.grainlineBottom,
    })

    // Notches
    points.frontNotch = new Path()
      .move(points.topLeft)
      .curve_(points.frontCurveControl, points.lefti)
      .shiftFractionAlong(0.5)
    snippets.frontNotch = new Snippet('notch', points.frontNotch)
    snippets.lefti = new Snippet('notch', points.lefti)
    snippets.righti = new Snippet('notch', points.rightiOffset)

    // Title
    macro('title', {
      at: points.grainlineBottom,
      nr: 1,
      title: 'cup',
      scale: 0.7,
    })

    if (!options.crossBackTies) {
      snippets.frontEdge = new Snippet('notch', points.frontEdge)
      snippets.sideEdge = new Snippet('notch', points.sideEdge)
    }

    // Scalebox
    points.scalebox = points.grainlineBottom.shift(180, 30)
    macro('miniscale', { at: points.scalebox })

    // Logo
    points.logo = points.grainlineTop.shiftFractionTowards(points.grainlineBottom, 0.3)
    snippets.logo = new Snippet('logo', points.logo).scale(0.7)

    // Conditional annotations
    if (complete && !options.crossBackTies) {
      paths.casingline = new Path()
        .move(points.lefti)
        .curve_(points.leftControlOffset, points.middleDart)
        .curve_(points.rightControlOffset, points.rightiOffset)
        .attr('class', 'fabric lashed')
        .addText('bee:casingStitchingLine', 'center')
    }
    if (complete && !options.ties) {
      points.neckTieLength = points.grainlineBottom
        .shift(-90, 42)
        .addText('bee:neckTieLength')
        .addText(':')
        .addText(utils.units(store.get('neckTieLength')))
      if (!options.crossBackTies) {
        points.backTieLength = points.grainlineBottom
          .shift(-90, 49)
          .addText('bee:bandTieLength')
          .addText(':')
          .addText(
            utils.units(measurements.underbust + measurements.underbust * options.bandTieLength)
          )
      }
    }

    // Dimensions
    if (!options.crossBackTies) {
      macro('vd', {
        from: points.frontEdge,
        to: points.lefti,
        x: points.frontEdge.x - sa - 15,
        id: 'hCasing',
      })
      macro('vd', {
        from: points.frontEdge,
        to: points.topRight,
        x: points.frontEdge.x - sa - 30,
        id: 'hLeft',
      })
    }
    macro('vd', {
      from: points.lefti,
      to: points.topLeft,
      x: points.frontEdge.x - sa - 15,
      id: 'hNoCasing',
    })
    macro('hd', {
      from: points.topLeft,
      to: points.topRight,
      y: points.topRight.y - sa - 15,
      id: 'tipWidth',
    })
    macro('hd', {
      from: points.lefti,
      to: points.topLeft,
      y: points.topRight.y - sa - 15,
      id: 'wLeftToTip',
    })
    macro('hd', {
      from: points.topRight,
      to: points.rightiOffset,
      y: points.topRight.y - sa - 15,
      id: 'wTipToRight',
    })
    macro('hd', {
      from: points.frontEdge,
      to: options.crossBackTies ? points.rightiOffset : points.sideEdge,
      y: points.topRight.y - sa - 30,
      id: 'wpToRight',
    })
    macro('vd', {
      from: points.topRight,
      to: options.crossBackTies ? points.rightiOffset : points.sideEdge,
      x: points.sideEdge.x + sa + 20,
      id: 'sdfsd',
    })
    if (!options.crossBackTies) {
      macro('vd', {
        id: 'hIncorrectEdgeRight',
        from: points.sideEdge,
        to: points.casingDart,
        x: points.sideEdge.x + sa + 10,
      })
      macro('hd', {
        id: 'wBottomHalfRight',
        from: points.casingDart,
        to: points.sideEdge,
        y: points.casingDart.y + sa + 20,
      })
      macro('hd', {
        id: 'wBottomHalfLeft',
        from: points.frontEdge,
        to: points.casingDart,
        y: points.casingDart.y + sa + 20,
      })
      macro('vd', {
        id: 'hLeft',
        from: points.bottomEdge,
        to: points.topRight,
        x: points.frontEdge.x - sa - 40,
      })
    }
    if (options.crossBackTies) {
      macro('vd', {
        from: points.rightiOffset,
        to: points.bottomEdge,
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
        from: points.bottomEdge,
        to: points.lefti,
        x: points.frontEdge.x - sa - 10,
      })
      macro('vd', {
        from: points.bottomEdge,
        to: points.topRight,
        x: points.frontEdge.x - sa - 30,
      })
    }
    macro('ld', {
      from: points.rightiOffset,
      to: points.righti,
    })

    if (complete && options.crossBackTies) {
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

    return part
  },
}
