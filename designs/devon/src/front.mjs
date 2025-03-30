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
    collarLengthRatio: 3 / 83,

    frontYokePanelWidth: 0.3,
    frontYokeInsertWidth: 0.4,
    frontYokeSidePanelWidth: 0.3,
    frontHemPanelWidth: 0.31,
    frontHemInsertWidth: 0.13,
    frontHemSidePanelWidth: 0.56,

    frontPocketRatio: 0.48,
    collarPoint: 0.33,
    // Parameters
  },
  draft: ({ measurements, options, store, points, Path, paths, utils, macro, part }) => {
    macro('rmcutonfold')

    const FBA =
      ((1 + options.chestEase) *
        ((measurements.bust === undefined ? measurements.chest : measurements.bust) -
          measurements.highBust)) /
      2

    console.log({
      FBA: FBA,
      chest: measurements.chest,
      bust: measurements.bust,
      highBust: measurements.highBust,
      diff: measurements.bust - measurements.highBust,
      chestEase: options.chestEase,
      u: measurements.bust === undefined,
    })

    // let maxFront = Math.max(measurements.waistFront, measurements.seatFront) /2
    let maxFront = Math.max(measurements.hips / 2, measurements.waistFront) / 2
    maxFront *= 1 + options.hemEase

    console.log({
      maxFront: maxFront,
      waistFront: measurements.waistFront / 2,
      seatFront: measurements.seatFront / 2,
      hips: measurements.hips / 4,
      hem: points.cfHem.dist(points.hem),
    })

    console.log({ hemOld: points.hem })
    let hemCircleIntersect = utils.circlesIntersect(
      points.cfHem,
      maxFront,
      points.armhole,
      points.armhole.dist(points.hem)
    )
    if (hemCircleIntersect[0].x > hemCircleIntersect[1].x) {
      points.hem = hemCircleIntersect[0]
    } else {
      points.hem = hemCircleIntersect[1]
    }

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

    // Calculating FBA
    points.frontBustPanel = utils.beamIntersectsY(
      points.frontYokeSidePanel,
      points.frontHemSidePanel,
      points.cfChest.y
    )
    // points.t1 = points.frontBustPanel.copy().addCircle(FBA)
    // points.t2 = points.shoulder.copy().addCircle(points.shoulder.dist(points.frontBustPanel))

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

    console.log({ FBA: FBA, bustCircleIntersect: bustCircleIntersect })
    console.log({ bustFBA: points.bustFBA, frontBustPanel: points.frontBustPanel })

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

    let deltaX = points.bustFBA2.x - points.frontBustPanel.x
    let deltaY = points.bustFBA2.y - points.frontBustPanel.y

    points.step1frontHemSidePanel = points.frontHemSidePanel.translate(deltaX, deltaY)
    points.step1hem = points.hem.translate(deltaX, deltaY)
    points.step1frontSideBust2 = points.frontSideBust.translate(deltaX, deltaY)

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

    points.step2hem = points.step1armhole.shiftOutwards(
      points.step1frontSideBust,
      points.step1frontSideBust2.dist(points.step1hem)
    )

    points.step2frontHemSidePanel = points.step1frontSidePanelBustPoint1
      .shiftTowards(points.frontHemSidePanel, points.frontBustPanel.dist(points.frontHemSidePanel))
      .translate(deltaX, deltaY)
      .rotate(angleBustArmholeNew, points.step1frontSidePanelBustPoint1)

    console.log({ points: JSON.parse(JSON.stringify(points)) })

    console.log({
      len1: points.frontYokeSidePanel.dist(points.frontHemSidePanel),
      len2:
        points.step1frontYokeSidePanel.dist(points.step1frontSidePanelBustPoint1) +
        points.step1frontSidePanelBustPoint1.dist(points.step2frontHemSidePanel),
    })

    if (
      points.step1frontYokeSidePanel.dist(points.step1frontSidePanelBustPoint1) +
        points.step1frontSidePanelBustPoint1.dist(points.step2frontHemSidePanel) -
        points.frontYokeSidePanel.dist(points.frontHemSidePanel) >
      9
    ) {
      store.set('useFBA', true)
      store.set(
        'sidePanelLength',
        points.step1frontYokeSidePanel.dist(points.step1frontSidePanelBustPoint1) +
          points.step1frontSidePanelBustPoint1.dist(points.step2frontHemSidePanel)
      )
      let newY = points.frontYokeSidePanel.shiftTowards(
        points.frontHemSidePanel,
        store.get('sidePanelLength')
      ).y
      let frontHemPanel = points.frontHemPanel.copy()
      let cfHem = points.cfHem.copy()
      frontHemPanel.y = newY
      cfHem.y = newY

      store.set('panelLength', points.frontYokePanel.dist(frontHemPanel))
      store.set('frontLength', points.cfYoke.dist(cfHem))
    } else {
      store.set('useFBA', false)
      store.set('sidePanelLength', points.frontYokeSidePanel.dist(points.frontHemSidePanel))
      store.set('panelLength', points.frontYokePanel.dist(points.frontHemPanel))
      store.set('frontLength', points.cfYoke.dist(points.cfHem))
    }
    console.log({
      sidePanelLength: store.get('sidePanelLength'),
      panelLength: store.get('panelLength'),
      frontLength: store.get('frontLength'),
    })

    console.log({ FBA: store.get('useFBA') })

    if (store.get('useFBA')) {
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
      const rotateBack2 = ['hem', 'frontHemSidePanel']
      for (let p of rotateBack2) {
        points[p] = points['step2' + p].rotate(angleBustArmholeNew * -1, points.frontArmholeYoke)
      }
    }

    points.frontHemSidePanelSaved = points.frontHemSidePanel
    points.frontHemPanel = points.frontYokePanel.shiftTowards(
      points.frontHemPanel,
      store.get('panelLength')
    )
    points.frontHemSidePanel = points.frontYokeSidePanel.shiftTowards(
      points.frontHemSidePanel,
      store.get('sidePanelLength')
    )
    points.cfHem = points.cfYoke.shiftTowards(points.cfHem, store.get('frontLength'))

    store.set('pocketWidth', points.cfYoke.dist(points.frontArmholeYoke) * options.frontPocketRatio)

    console.log({ points: JSON.parse(JSON.stringify(points)) })
    console.log({ paths: JSON.parse(JSON.stringify(paths)) })

    console.log({ frontLength: points.cfNeck.dist(points.cfHem) })

    console.log({
      side: 'front',
      shoulder: points.shoulder.dist(points.neck),
      yoke: points.cfYoke.dist(points.frontArmholeYoke),
      yokeDown: points.cfYoke.dist(points.cfNeck),
      hem: points.cfHem.dist(points.hem),
    })

    store.set(
      'armholeYokeFront',
      paths.frontArmholeComplete.split(points.frontArmholeYoke)[0].length()
    )

    store.set(
      'waistbandWidth',
      options.waistbandWidth *
        (measurements.bust === undefined ? measurements.chest : measurements.bust)
    )
    const frontAdd = store.get('waistbandWidth') * 0.5
    points.frontNeck = points.cfNeck.shift(180, frontAdd)
    points.frontYoke = points.cfYoke.shift(180, frontAdd)
    points.frontHem = points.cfHem.shift(180, frontAdd)

    paths.front = new Path()
      .move(points.cfNeck)
      .line(points.frontNeck)
      .line(points.frontHem)
      .line(points.cfHem)

    const collarLength = paths.backCollar.length() + paths.frontCollar.length()
    store.set('collarLength', collarLength)
    store.set('collarLengthBack', paths.backCollar.length())

    console.log({
      collarLength: collarLength,
      collarLength33: collarLength * 0.33,
      bcl: paths.backCollar.length(),
      fcl: paths.frontCollar.length(),
      cl_bcl: collarLength * 0.33 - paths.backCollar.length(),
      cl_bcl2: (collarLength * 0.33 - paths.backCollar.length()) / 2,
    })
    points.frontCollarPoint = paths.frontCollar
      .reverse()
      .shiftAlong(collarLength * options.collarPoint)

    console.log({ frontpoints: JSON.parse(JSON.stringify(points)) })

    return part
  },
}
