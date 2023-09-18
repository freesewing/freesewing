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
    //Constants
    backArmholeCurvature: 0.63, //altered from Bella
    backArmholePitchDepth: 0.35, //altered from Bella
    backArmholeSlant: 5, //altered from Bella
    frontArmholeCurvature: 0.63, //altered from Bella
    bustDartCurve: 1, //altered from Bella
    bustDartLength: 1, //altered from Bella
    waistDartLength: 1, //altered from Bella
    backHemSlope: 2.5, //altered from Bella
    backNeckCutout: 0.06, //altered from Bella
    //Fit
    topDepth: { pct: 54, min: 50, max: 80, menu: 'fit' },
    bottomCupDepth: { pct: 8, min: 0, max: 20, menu: 'fit' },
    sideDepth: { pct: 20.6, min: 0, max: 30, menu: 'fit' },
    sideCurve: { pct: 0, min: -50, max: 50, menu: 'fit' },
    frontCurve: { pct: 0, min: -50, max: 50, menu: 'fit' },
    bellaGuide: { bool: false, menu: 'fit' },
    //Advanced
    armholeDepth: { pct: 44, min: 38, max: 46, menu: 'advanced.bellaArmhole' }, //catergory changed from Bella
    frontArmholePitchDepth: { pct: 29, max: 31, min: 27, menu: 'advanced.bellaArmhole' }, //catergory changed from Bella
    backDartHeight: { pct: 46, min: 38, max: 54, menu: 'advanced.bellaDarts' }, //catergory changed from Bella
    frontShoulderWidth: { pct: 95, max: 98, min: 92, menu: 'advanced.bellaAdvanced' }, //catergory changed from Bella
    highBustWidth: { pct: 86, max: 92, min: 80, menu: 'advanced.bellaAdvanced' }, //catergory changed from Bella
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
    //removing paths and snippets not required from Bella
    for (const i in paths) delete paths[i]
    for (const i in snippets) delete snippets[i]
    //removing macros not required from Bella
    macro('title', false)
    macro('scalebox', false)
    //measurements
    const cupWidth = measurements.bustPointToUnderbust * (1 + options.bottomCupDepth)
    let bandTieWidth = absoluteOptions.bandTieWidth
    if (options.crossBackTies) {
      bandTieWidth = 0
    }
    //rotate to close bust dart
    points.bustDartClosed = points.bustDartTop

    const rot = ['waistDartRightCp', 'waistDartRight', 'sideHemInitial']
    for (const p of rot) points[p] = points[p].rotate(store.get('bustDartAngleSide'), points.bust)

    points.sideHem = utils.beamsIntersect(
      points.waistDartRight,
      points.sideHemInitial,
      points.armhole,
      points.bustDartClosed
    )
    //guide
    if (options.bellaGuide) {
      paths.bellaGuide = new Path()
        .move(points.sideHem)
        .line(points.bustDartTop)
        .line(points.armhole)
        .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
        .curve_(points.armholePitchCp2, points.shoulder)
        .line(points.hps)
        .curve(points.hpsCp2, points.cfNeckCp1, points.cfNeck)
        .line(points.cfHem)
        .line(points.waistDartLeft)
        .line(points.bust)
        .line(points.waistDartRight)
        .line(points.sideHem)
        .attr('class', 'various lashed')
        .close()
    }

    //bikini top
    points.topMid = points.bust.shiftTowards(points.hps, measurements.hpsToBust * options.topDepth)
    points.topLeft = points.topMid.shift(
      points.topMid.angle(points.hps) + 90,
      absoluteOptions.neckTieWidth / 2
    )
    points.topRight = points.topMid.shift(
      points.topMid.angle(points.hps) - 90,
      absoluteOptions.neckTieWidth / 2
    )
    points.leftDart = points.bust.shiftTowards(points.waistDartLeft, cupWidth)
    points.rightDart = points.bust.shiftTowards(points.waistDartRight, cupWidth)
    points.bottomLeft = utils.beamsIntersect(
      points.leftDart,
      points.bust.rotate(90, points.leftDart),
      points.cfNeck,
      points.cfHem
    )
    points.bottomRightAnchor = utils.beamsIntersect(
      points.rightDart,
      points.bust.rotate(-90, points.rightDart),
      points.armhole,
      points.sideHem
    )
    points.bottomRight = points.bottomRightAnchor.shiftFractionTowards(
      points.rightDart,
      options.sideDepth
    )
    points.sideEdge = points.bottomRight.shift(points.armhole.angle(points.sideHem), bandTieWidth)
    points.frontEdge = points.bottomLeft.shift(points.cfNeck.angle(points.cfHem), bandTieWidth)
    points.bottomDart = points.bust.shift(
      points.bust.angle(points.leftDart) +
        (points.bust.angle(points.rightDart) - points.bust.angle(points.leftDart)) / 2,
      points.bust.dist(points.leftDart)
    )
    points.dartEdge = points.bust.shiftOutwards(points.bottomDart, bandTieWidth)
    points.frontEdgeCp2 = utils.beamsIntersect(
      points.dartEdge,
      points.dartEdge.shift(points.bust.angle(points.bottomDart) - 90, 10),
      points.cfNeck,
      points.cfHem
    )
    points.sideEdgeCp2Target = utils.beamsIntersect(
      points.dartEdge,
      points.dartEdge.shift(points.bust.angle(points.bottomDart) + 90, 10),
      points.armhole,
      points.sideHem
    )
    points.frontEdgeCp2 = points.dartEdge.shiftFractionTowards(points.frontEdgeCp2, 0.5)
    points.sideEdgeCp1 = points.dartEdge.shiftFractionTowards(points.sideEdgeCp2Target, 0.5)
    points.middleSideFront = points.bottomRight.shiftFractionTowards(points.topRight, 0.5)
    points.bottomRightCp2 = points.middleSideFront.shiftFractionTowards(
      points.bust,
      options.sideCurve
    )
    points.middleFront = points.topLeft.shiftFractionTowards(points.bottomLeft, 0.5)
    points.bottomLeftCp1 = points.middleFront.shiftFractionTowards(points.bust, options.frontCurve)
    points.bottomLeftCp2 = points.frontEdgeCp2.shiftTowards(points.topMid, bandTieWidth)
    points.bottomRightCp1 = points.sideEdgeCp1.shiftTowards(points.topMid, bandTieWidth)
    //paths
    paths.seam = new Path()
      .move(points.sideEdge)
      .line(points.bottomRight)
      .curve_(points.bottomRightCp2, points.topRight)
      .line(points.topLeft)
      .curve_(points.bottomLeftCp1, points.bottomLeft)
      .line(points.frontEdge)
      .curve_(points.frontEdgeCp2, points.dartEdge)
      .curve_(points.sideEdgeCp1, points.sideEdge)
      .close()
    //stores
    if (options.crossBackTies) {
      points.leftSplit = utils.lineIntersectsCurve(
        points.bust,
        points.waistDartLeft,
        points.frontEdge,
        points.frontEdgeCp2,
        points.dartEdge,
        points.dartEdge
      )
      points.rightSplit = utils.lineIntersectsCurve(
        points.bust,
        points.waistDartRight,
        points.dartEdge,
        points.sideEdgeCp1,
        points.sideEdge,
        points.sideEdge
      )
      paths.bottomCurve = new Path()
        .move(points.bottomLeft)
        .line(points.frontEdge)
        .curve_(points.frontEdgeCp2, points.dartEdge)
        .curve_(points.sideEdgeCp1, points.sideEdge)
        .hide()
      store.set(
        'cupWidth',
        paths.bottomCurve.split(points.leftSplit)[0].length() +
          paths.bottomCurve.split(points.rightSplit)[1].length()
      )
    }

    if (complete) {
      //grainline
      points.grainlineFrom = points.topMid.shiftFractionTowards(points.bust, 0.05)
      points.grainlineTo = points.bust.shiftFractionTowards(points.topMid, 0.05)
      macro('grainline', {
        from: points.grainlineFrom,
        to: points.grainlineTo,
      })
      //notches
      paths.frontCurve = new Path()
        .move(points.topLeft)
        .curve_(points.bottomLeftCp1, points.bottomLeft)
        .hide()
      points.frontNotch = paths.frontCurve.shiftFractionAlong(0.5)
      macro('sprinkle', {
        snippet: 'notch',
        on: ['frontNotch', 'bottomLeft', 'bottomRight'],
      })
      if (!options.crossBackTies) {
        macro('sprinkle', {
          snippet: 'notch',
          on: ['frontEdge', 'sideEdge'],
        })
        //casingLine
        paths.casingline = new Path()
          .move(points.bottomLeft)
          .curve_(points.bottomLeftCp2, points.bottomDart)
          .curve_(points.bottomRightCp1, points.bottomRight)
          .attr('class', 'fabric lashed')
          .attr('data-text', 'Casing Stitching Line')
          .attr('data-text-class', 'center')
      }
      //title
      points.title = points.bottomLeftCp1.shiftFractionTowards(points.bottomRight, 0.5)
      macro('title', {
        at: points.title,
        nr: 1,
        title: 'cup',
        scale: 0.7,
      })
      //scalebox
      points.scalebox = new Point(points.bottomLeft.x + 12.7, points.topLeft.y + 12.7)
      macro('miniscale', { at: points.scalebox })
      //logo
      points.logo = points.bust.shiftFractionTowards(points.bottomDart, 0.5)
      snippets.logo = new Snippet('logo', points.logo).attr('data-scale', 0.7)
      if (!options.ties) {
        points.neckTieLength = points.topLeft
          .shiftFractionTowards(points.bottomLeft, 0.7)
          .attr('data-text', 'Neck Tie Length: ' + utils.units(store.get('neckTieLength')))
        if (!options.crossBackTies) {
          points.backTieLength = points.topLeft
            .shiftFractionTowards(points.bottomLeft, 0.8)
            .attr(
              'data-text',
              'Band Tie Length: ' +
                utils.units(measurements.underbust * (1 + options.bandTieLength))
            )
        }
      }
      if (sa) {
        paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
      }
    }
    if (paperless) {
      //vertical distances
      macro('vd', {
        from: points.bottomLeft,
        to: paths.seam.bbox().bottomRight,
        x: points.bottomLeft.x - sa - 15,
      })
      macro('vd', {
        from: points.topMid,
        to: points.bottomLeft,
        x: points.bottomLeft.x - sa - 15,
      })
      macro('vd', {
        from: points.topRight,
        to: paths.seam.bbox().bottomRight,
        x: points.bottomLeft.x - sa - 30,
      })
      macro('vd', {
        from: points.topRight,
        to: points.bottomRight,
        x: points.sideEdge.x + sa + 15,
      })
      macro('vd', {
        from: points.sideEdge,
        to: paths.seam.bbox().bottomRight,
        x: points.sideEdge.x + sa + 15,
      })
      macro('vd', {
        from: points.topRight,
        to: paths.seam.bbox().bottomRight,
        x: points.sideEdge.x + sa + 30,
      })
      macro('vd', {
        from: points.topMid,
        to: points.dartEdge,
        x: points.topMid.x,
      })
      //horizontal distances
      macro('hd', {
        from: points.bottomLeft,
        to: points.topLeft,
        y: points.topLeft.y - sa - 15,
      })
      macro('hd', {
        from: points.topLeft,
        to: points.topRight,
        y: points.topRight.y - sa - 30,
      })
      macro('hd', {
        from: points.topRight,
        to: points.bottomRight,
        y: points.topRight.y - sa - 15,
      })
      macro('hd', {
        from: points.bottomLeft,
        to: points.sideEdge,
        y: points.topRight.y - sa - 45,
      })
      macro('hd', {
        from: points.topMid,
        to: points.dartEdge,
        y: points.dartEdge.y,
      })
      macro('hd', {
        from: points.frontEdge,
        to: points.dartEdge,
        y: points.dartEdge.y + sa + 15,
      })
      macro('hd', {
        from: points.dartEdge,
        to: paths.seam.bbox().bottomRight,
        y: points.dartEdge.y + sa + 15,
      })
      macro('hd', {
        from: points.frontEdge,
        to: paths.seam.bbox().bottomRight,
        y: points.dartEdge.y + sa + 30,
      })
      //linear distances
      macro('ld', {
        from: points.topLeft,
        to: points.topRight,
        d: sa + 15,
      })
      macro('ld', {
        from: points.topMid,
        to: points.dartEdge,
      })
      //crossBackTies distances
      if (!options.crossBackTies) {
        macro('vd', {
          from: points.bottomLeft,
          to: points.frontEdge,
          x: points.bottomLeft.x - sa - 15,
        })
        macro('vd', {
          from: points.bottomRight,
          to: points.sideEdge,
          x: points.sideEdge.x + sa + 15,
        })
        macro('hd', {
          from: points.bottomRight,
          to: points.sideEdge,
          y: points.topRight.y - sa - 15,
        })
      }
    }
    return part
  },
}
