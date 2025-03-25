// import { front as brianFront } from '@freesewing/brian'
import { back } from './back.mjs'

export const front = {
  name: 'devon.front',
  from: back,
  hide: {
    self: true,
    from: true,
    inherited: true,
  },
  options: {
    // Constants
    frontYokePanelWidth: 0.3,
    frontYokeInsertWidth: 0.4,
    frontYokeSidePanelWidth: 0.3,
    frontHemPanelWidth: 0.32,
    frontHemInsertWidth: 0.12,
    frontHemSidePanelWidth: 0.56,

    // Parameters
  },
  draft: ({
    measurements,
    options,
    store,
    points,
    snippets,
    Point,
    Snippet,
    Path,
    paths,
    utils,
    macro,
    part,
  }) => {
    macro('rmcutonfold')

    const FBA = ((1 + options.chestEase) * (measurements.bust - measurements.highBust)) / 2

    console.log({
      FBA: FBA,
      bust: measurements.bust,
      highBust: measurements.highBust,
      diff: measurements.bust - measurements.highBust,
      chestEase: options.chestEase,
    })

    // Adapt the shoulder line according to the relevant options
    // Don't bother with less than 10% as that's just asking for trouble
    if (options.s3Collar < 0.1 && options.s3Collar > -0.1) {
      points.s3CollarSplit = points.hps
      paths.frontCollar = new Path()
        .move(points.hps)
        .curve(points.neckCp2Front, points.cfNeckCp1, points.cfNeck)
        .hide()
    } else if (options.s3Collar > 0) {
      // Shift shoulder seam forward on the collar side
      points.s3CollarSplit = utils.curveIntersectsY(
        points.hps,
        points.neckCp2Front,
        points.cfNeckCp1,
        points.cfNeck,
        store.get('s3CollarMaxFront') * options.s3Collar
      )
      paths.frontCollar = new Path()
        .move(points.hps)
        .curve(points.neckCp2Front, points.cfNeckCp1, points.cfNeck)
        .split(points.s3CollarSplit)[1]
        .hide()
    } else if (options.s3Collar < 0) {
      // Shift shoulder seam backward on the collar side
      points.s3CollarSplit = utils.curveIntersectsY(
        points.mirroredCbNeck,
        points.mirroredCbNeck,
        points.mirroredNeckCp2,
        points.hps,
        store.get('s3CollarMaxBack') * options.s3Collar
      )
      paths.frontCollar = new Path()
        .move(points.hps)
        .curve_(points.mirroredNeckCp2, points.mirroredCbNeck)
        .split(points.s3CollarSplit)[0]
        .reverse()
        .join(
          new Path().move(points.hps).curve(points.neckCp2Front, points.cfNeckCp1, points.cfNeck)
        )
        .hide()
    }
    if (options.s3Armhole < 0.1 && options.s3Armhole > -0.1) {
      points.s3ArmholeSplit = points.shoulder
      paths.frontArmhole = new Path()
        .move(points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .hide()
    } else if (options.s3Armhole > 0) {
      // Shift shoulder seam forward on the armhole side
      points.s3ArmholeSplit = utils.curveIntersectsY(
        points.shoulder,
        points.shoulderCp1,
        points.armholePitchCp2,
        points.armholePitch,
        store.get('s3ArmholeMax') * options.s3Armhole + points.shoulder.y
      )
      paths.frontArmhole = new Path()
        .move(points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .split(points.s3ArmholeSplit)[0]
        .hide()
    } else if (options.s3Armhole < 0) {
      // Shift shoulder seam forward on the armhole side
      points.s3ArmholeSplit = utils.curveIntersectsY(
        points.shoulder,
        points.mirroredShoulderCp1,
        points.mirroredFrontArmholePitchCp2,
        points.mirroredFrontArmholePitch,
        store.get('s3ArmholeMax') * options.s3Armhole + points.shoulder.y
      )
      paths.frontArmhole = new Path()
        .move(points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .join(
          new Path()
            .move(points.shoulder)
            .curve(
              points.mirroredShoulderCp1,
              points.mirroredFrontArmholePitchCp2,
              points.mirroredFrontArmholePitch
            )
            .split(points.s3ArmholeSplit)[0]
        )
        .hide()
    }
    paths.saBase = new Path()
      .move(points.cfHem)
      .line(points.hem)
      .line(points.armhole)
      .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
      .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
      .join(paths.frontArmhole)
      .line(points.s3CollarSplit)
      .join(paths.frontCollar)

    paths.saBase.hide()
    paths.seam = new Path()
      .move(points.cfNeck)
      .line(points.cfHem)
      .join(paths.saBase)
      .attr('class', 'fabric')

    paths.frontArmholeComplete = new Path()
      .move(points.armhole)
      .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
      .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
      .join(paths.frontArmhole)
      .hide()

    points.frontArmholeYoke = paths.frontArmholeComplete.intersectsY(points.cfYoke.y)[0]

    points.frontYokePanel = points.cfYoke.shiftFractionTowards(
      points.frontArmholeYoke,
      options.frontYokePanelWidth
    )
    points.frontYokeSidePanel = points.frontArmholeYoke.shiftFractionTowards(
      points.cfYoke,
      options.frontYokeSidePanelWidth
    )
    points.frontHemPanel = points.cfHem.shiftFractionTowards(points.hem, options.frontHemPanelWidth)
    points.frontHemSidePanel = points.hem.shiftFractionTowards(
      points.cfHem,
      options.frontHemSidePanelWidth
    )

    paths.frontTempYoke = new Path().move(points.cfYoke).line(points.frontArmholeYoke)
    paths.frontPanel = new Path().move(points.frontYokePanel).line(points.frontHemPanel)
    paths.frontSidePanel = new Path().move(points.frontYokeSidePanel).line(points.frontHemSidePanel)

    points.frontBustPanel = utils.beamIntersectsY(
      points.frontYokeSidePanel,
      points.frontHemSidePanel,
      points.cfChest.y
    )
    let bustCircleInter = utils.circlesIntersect(
      points.frontBustPanel,
      FBA,
      points.shoulder,
      points.shoulder.dist(points.frontBustPanel)
    )
    if (bustCircleInter[0].x > bustCircleInter[1].x) {
      points.bustFBA = bustCircleInter[0].copy()
    } else {
      points.bustFBA = bustCircleInter[1].copy()
    }

    store.set('frontSidePanelUpshift', points.bustFBA.y - points.frontBustPanel.y)

    paths.frontSidePanelArmhole = paths.frontArmholeComplete
      .split(points.frontArmholeYoke)[0]
      .attr('class', 'note')

    points.frontSideBust = utils.beamIntersectsY(
      points.armhole,
      points.hem,
      points.frontBustPanel.y
    )

    bustCircleInter = utils.circlesIntersect(
      points.frontBustPanel,
      FBA,
      points.frontArmholeYoke,
      points.frontArmholeYoke.dist(points.frontBustPanel)
    )
    if (bustCircleInter[0].x > bustCircleInter[1].x) {
      points.bustFBA2 = bustCircleInter[0].copy()
    } else {
      points.bustFBA2 = bustCircleInter[1].copy()
    }

    paths.original1 = new Path()
      .move(points.frontArmholeYoke)
      .line(points.frontYokeSidePanel)
      .line(points.frontBustPanel)
      .line(points.frontSideBust)
      .join(paths.frontSidePanelArmhole)
      .attr('class', 'note')

    let angleBustArmholeNew =
      points.frontArmholeYoke.angle(points.bustFBA2) -
      points.frontArmholeYoke.angle(points.frontBustPanel)

    console.log({ p: paths.frontSidePanelArmhole })
    console.log({ paths: JSON.parse(JSON.stringify(paths)) })

    const rotate = ['frontArmholeYoke', 'frontYokeSidePanel', 'frontBustPanel', 'frontSideBust']
    for (let p of rotate) {
      points['beta' + p] = points[p].rotate(angleBustArmholeNew, points.frontArmholeYoke)
    }
    paths.betaFrontSidePanelArmholeTemp = paths.frontSidePanelArmhole.clone()
    console.log({ paths: JSON.parse(JSON.stringify(paths)) })
    paths.betafrontSidePanelArmhole = paths.frontSidePanelArmhole
      .rotate(angleBustArmholeNew, points.frontArmholeYoke, false)
      .attr('class', 'lining')

    points.betaarmhole = paths.betafrontSidePanelArmhole.start()

    paths.beta1 = new Path()
      .move(points.betafrontArmholeYoke)
      .line(points.betafrontYokeSidePanel)
      .line(points.betafrontBustPanel)
      .line(points.betafrontSideBust)
      .join(paths.betafrontSidePanelArmhole)
      .attr('class', 'lining')

    let deltaX = points.bustFBA2.x - points.frontBustPanel.x
    let deltaY = points.bustFBA2.y - points.frontBustPanel.y

    points.betafrontHemSidePanel = points.frontHemSidePanel.translate(deltaX, deltaY)
    points.betahem = points.hem.translate(deltaX, deltaY)
    points.betafrontSideBust2 = points.frontSideBust.translate(deltaX, deltaY)

    paths.beta2 = new Path()
      .move(points.betahem)
      .line(points.betafrontSideBust2)
      .line(points.bustFBA2)
      .line(points.betafrontHemSidePanel)
      .attr('class', 'lining')

    console.log({ points: JSON.parse(JSON.stringify(points)) })

    points.lineExtending1 = utils.beamsIntersect(
      points.bustFBA2,
      points.betafrontSideBust,
      points.frontYokeSidePanel,
      points.frontHemSidePanel
    )
    points.lineExtending2 = utils.beamsIntersect(
      points.bustFBA2,
      points.betafrontSideBust2,
      points.frontYokeSidePanel,
      points.frontHemSidePanel
    )

    points.newBetaHem = points.betaarmhole.shiftOutwards(
      points.betafrontSideBust,
      points.betafrontSideBust2.dist(points.betahem)
    )

    points.newBetaHem.addCircle(9)

    let ihem = utils.circlesIntersect(
      points.lineExtending2,
      points.frontBustPanel.dist(points.frontHemSidePanel),
      points.newBetaHem,
      points.newBetaHem.dist(points.betafrontHemSidePanel)
    )

    if (ihem[0].x < ihem[1].x) {
      points.newHem = ihem[0].copy()
    } else {
      points.newHem = ihem[1].copy()
    }
    points.newHem.addCircle(3)

    console.log({ in: ihem })

    points.newfrontHemSidePanel = points.lineExtending2
      .shiftTowards(points.frontHemSidePanel, points.frontBustPanel.dist(points.frontHemSidePanel))
      .rotate(angleBustArmholeNew, points.lineExtending2)
      .addCircle(4)

    paths.newSidePanel = new Path()
      .move(points.newfrontHemSidePanel)
      .line(points.newBetaHem)
      .line(points.betaarmhole)
      .join(paths.betafrontSidePanelArmhole)
      .line(points.frontYokeSidePanel)
      .line(points.lineExtending1)
      .line(points.lineExtending2)
      .line(points.newfrontHemSidePanel)
      .attr('class', 'contrast')

    console.log({ angle: angleBustArmholeNew })
    console.log({ points: JSON.parse(JSON.stringify(points)) })
    console.log({ paths: JSON.parse(JSON.stringify(paths)) })

    return part
  },
}
