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

    // paths.frontTempYoke = new Path().move(points.cfYoke).line(points.frontArmholeYoke)
    // paths.frontPanel = new Path().move(points.frontYokePanel).line(points.frontHemPanel)
    // paths.frontSidePanel = new Path().move(points.frontYokeSidePanel).line(points.frontHemSidePanel)

    // Calculating FBA
    points.frontBustPanel = utils.beamIntersectsY(
      points.frontYokeSidePanel,
      points.frontHemSidePanel,
      points.cfChest.y
    )
    let bustCircleIntersect = utils.circlesIntersect(
      points.frontBustPanel,
      FBA,
      points.shoulder,
      points.shoulder.dist(points.frontBustPanel)
    )
    if (bustCircleIntersect[0].x > bustCircleIntersect[1].x) {
      points.bustFBA = bustCircleIntersect[0]
    } else {
      points.bustFBA = bustCircleIntersect[1]
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

    bustCircleIntersect = utils.circlesIntersect(
      points.frontBustPanel,
      FBA,
      points.frontArmholeYoke,
      points.frontArmholeYoke.dist(points.frontBustPanel)
    )
    if (bustCircleIntersect[0].x > bustCircleIntersect[1].x) {
      points.bustFBA2 = bustCircleIntersect[0].copy()
    } else {
      points.bustFBA2 = bustCircleIntersect[1].copy()
    }

    // paths.original1 = new Path()
    //   .move(points.frontArmholeYoke)
    //   .line(points.frontYokeSidePanel)
    //   .line(points.frontBustPanel)
    //   .line(points.frontSideBust)
    //   .join(paths.frontSidePanelArmhole)
    //   .attr('class', 'note')

    let angleBustArmholeNew =
      points.frontArmholeYoke.angle(points.bustFBA2) -
      points.frontArmholeYoke.angle(points.frontBustPanel)

    const rotate = [
      'frontArmholeYoke',
      'frontYokeSidePanel',
      'frontBustPanel',
      'frontSideBust',
      'armhole',
    ]
    for (let p of rotate) {
      points['step1' + p] = points[p].rotate(angleBustArmholeNew, points.frontArmholeYoke)
    }
    // paths.step1frontSidePanelArmholeTemp = paths.frontSidePanelArmhole.clone()
    // console.log({ paths: JSON.parse(JSON.stringify(paths)) })
    // paths.step1frontSidePanelArmhole = paths.frontSidePanelArmhole
    //   .rotate(angleBustArmholeNew, points.frontArmholeYoke, false)
    //   .attr('class', 'lining')

    // points.step1armhole = paths.step1frontSidePanelArmhole.start()

    // paths.step11 = new Path()
    //   .move(points.step1frontArmholeYoke)
    //   .line(points.step1frontYokeSidePanel)
    //   .line(points.step1frontBustPanel)
    //   .line(points.step1frontSideBust)
    //   .join(paths.step1frontSidePanelArmhole)
    //   .attr('class', 'lining')

    let deltaX = points.bustFBA2.x - points.frontBustPanel.x
    let deltaY = points.bustFBA2.y - points.frontBustPanel.y

    points.step1frontHemSidePanel = points.frontHemSidePanel.translate(deltaX, deltaY)
    points.step1hem = points.hem.translate(deltaX, deltaY)
    points.step1frontSideBust2 = points.frontSideBust.translate(deltaX, deltaY)

    paths.step12 = new Path()
      .move(points.step1hem)
      .line(points.step1frontSideBust2)
      .line(points.bustFBA2)
      .line(points.step1frontHemSidePanel)
      .attr('class', 'lining')

    console.log({ points: JSON.parse(JSON.stringify(points)) })

    points.step1frontSidePanelBustPoint1 = utils.beamsIntersect(
      points.bustFBA2,
      points.step1frontSideBust,
      points.frontYokeSidePanel,
      points.frontHemSidePanel
    )
    points.step1frontSidePanelBustPoint2 = utils.beamsIntersect(
      points.bustFBA2,
      points.step1frontSideBust2,
      points.frontYokeSidePanel,
      points.frontHemSidePanel
    )

    points.step2Hem = points.step1armhole.shiftOutwards(
      points.step1frontSideBust,
      points.step1frontSideBust2.dist(points.step1hem)
    )

    points.step2Hem.addCircle(9)

    let ihem = utils.circlesIntersect(
      points.frontSidePanelBustPoint2,
      points.frontBustPanel.dist(points.frontHemSidePanel),
      points.step2Hem,
      points.step2Hem.dist(points.step1frontHemSidePanel)
    )

    if (ihem[0].x < ihem[1].x) {
      points.newHem = ihem[0].copy()
    } else {
      points.newHem = ihem[1].copy()
    }
    points.newHem.addCircle(3)

    console.log({ in: ihem })

    points.frontHemSidePanel = points.step1frontSidePanelBustPoint2
      .shiftTowards(points.frontHemSidePanel, points.frontBustPanel.dist(points.frontHemSidePanel))
      .rotate(angleBustArmholeNew, points.step1frontSidePanelBustPoint2)
      .addCircle(4)

    console.log({
      len1: points.frontYokeSidePanel.dist(points.frontHemSidePanel),
      len2:
        points.step1frontYokeSidePanel.dist(points.frontSidePanelBustPoint1) +
        points.frontSidePanelBustPoint1.dist(points.newfrontHemSidePanel),
    })

    deltaX = points.step1frontYokeSidePanel.x - points.frontYokeSidePanel.x
    deltaY = points.step1frontYokeSidePanel.y - points.frontYokeSidePanel.y

    const translate = [
      'step1frontSidePanelBustPoint1',
      'step1frontSidePanelBustPoint2',
      'frontHemSidePanel',
    ]
    for (let p of translate) {
      points[p] = points[p].translate(deltaX, deltaY)
    }
    points.step1frontSidePanelBustPoint2 = points.step1frontSidePanelBustPoint1.translate(
      deltaX,
      deltaY
    )
    points.step1frontSidePanelBustPoint1 = points.step1frontSidePanelBustPoint2.translate(
      deltaX,
      deltaY
    )
    points.step1frontHemSidePanel = points.newfrontHemSidePanel.translate(deltaX, deltaY)

    const rotateBack1 = [
      'frontArmholeYoke',
      'frontYokeSidePanel',
      'frontBustPanel',
      'frontSideBust',
      'armhole',
      'frontSidePanelBustPoint1',
      'frontSidePanelBustPoint2',
    ]
    for (let p of rotateBack1) {
      points[p] = points['step1' + p].rotate(angleBustArmholeNew * -1, points.frontArmholeYoke)
    }
    const rotateBack2 = [
      'hem',
      'frontYokeSidePanel',
      'frontBustPanel',
      'frontSideBust',
      'armhole',
      'frontHemSidePanel',
    ]
    for (let p of rotateBack2) {
      points[p] = points['step2' + p].rotate(angleBustArmholeNew * -1, points.frontArmholeYoke)
    }

    paths.newSidePanel = new Path()
      .move(points.frontHemSidePanel)
      .line(points.step2Hem)
      .line(points.step1armhole)
      // .join(paths.step1frontSidePanelArmhole)
      .line(points.step1frontYokeSidePanel)
      .line(points.frontSidePanelBustPoint2)
      .line(points.frontSidePanelBustPoint1)
      .line(points.step2frontHemSidePanel)
      .attr('class', 'contrast')

    console.log({ angle: angleBustArmholeNew })
    console.log({ points: JSON.parse(JSON.stringify(points)) })
    console.log({ paths: JSON.parse(JSON.stringify(paths)) })

    console.log({ frontLength: points.cfNeck.dist(points.cfHem) })

    return part
  },
}
