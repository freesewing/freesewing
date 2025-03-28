// import { back as brianBack } from '@freesewing/brian'
import { base } from './base.mjs'

export const back = {
  name: 'devon.back',
  from: base,
  hide: {
    self: true,
    from: true,
    inherited: true,
  },
  options: {
    backYokePanelWidth: 0.33,
    backHemPanelWidth: 0.6,
  },
  draft: ({
    measurements,
    options,
    store,
    points,
    // snippets,
    // Point,
    // Snippet,
    Path,
    paths,
    utils,
    // macro,
    part,
  }) => {
    // let maxBack = Math.max(measurements.waistBack, measurements.seatBack) /2
    let maxBack = Math.max(measurements.hips / 2, measurements.waistBack) / 2
    maxBack *= 1 + options.hemEase

    console.log({
      maxBack: maxBack,
      waistBack: measurements.waistBack / 2,
      seatBack: measurements.seatBack / 2,
      hips: measurements.hips / 4,
      hem: points.cfHem.dist(points.hem),
    })

    console.log({ hemOld: points.hem })
    let hemCircleIntersect = utils.circlesIntersect(
      points.cfHem,
      maxBack,
      points.armhole,
      points.armhole.dist(points.hem)
    )
    if (hemCircleIntersect[0].x > hemCircleIntersect[1].x) {
      points.hem = hemCircleIntersect[0]
    } else {
      points.hem = hemCircleIntersect[1]
    }

    // Adapt the shoulder seam according to the relevant options
    // Note: s3 stands for Shoulder Seam Shift
    // Don't bother with less than 10% as that's just asking for trouble
    if (options.s3Collar < 0.1 && options.s3Collar > -0.1) {
      points.s3CollarSplit = points.hps
      paths.backCollar = new Path().move(points.hps).curve_(points.neckCp2, points.cbNeck).hide()
    } else if (options.s3Collar > 0) {
      // Shift shoulder seam forward on the collar side
      points.s3CollarSplit = utils.curveIntersectsY(
        points.hps,
        points.mirroredNeckCp2Front,
        points.mirroredCfNeckCp1,
        points.mirroredCfNeck,
        store.get('s3CollarMaxFront') * -1 * options.s3Collar
      )
      paths.backCollar = new Path()
        .move(points.hps)
        ._curve(points.mirroredNeckCp2Front, points.mirroredCfNeckCp1, points.mirroredCfNeck)
        .split(points.s3CollarSplit)[0]
        .reverse()
        .join(new Path().move(points.hps).curve_(points.neckCp2, points.cbNeck))
        .hide()
    } else if (options.s3Collar < 0) {
      // Shift shoulder seam backward on the collar side
      points.s3CollarSplit = utils.curveIntersectsY(
        points.hps,
        points.neckCp2,
        points.cbNeck,
        points.cbNeck,
        store.get('s3CollarMaxBack') * -1 * options.s3Collar
      )
      paths.backCollar = new Path()
        .move(points.cbNeck)
        ._curve(points.neckCp2, points.neck)
        .split(points.s3CollarSplit)[0]
        .reverse()
        .hide()
    }
    // Don't bother with less than 10% as that's just asking for trouble
    if (options.s3Armhole < 0.1 && options.s3Armhole > -0.1) {
      points.s3ArmholeSplit = points.shoulder
      paths.backArmhole = new Path()
        .move(points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .hide()
    } else if (options.s3Armhole > 0) {
      // Shift shoulder seam forward on the armhole side
      points.s3ArmholeSplit = utils.curveIntersectsY(
        points.shoulder,
        points.mirroredShoulderCp1,
        points.mirroredFrontArmholePitchCp2,
        points.mirroredFrontArmholePitch,
        store.get('s3ArmholeMax') * -1 * options.s3Armhole + points.shoulder.y
      )
      paths.backArmhole = new Path()
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
    } else if (options.s3Armhole < 0) {
      // Shift shoulder seam backward on the armhole side
      points.s3ArmholeSplit = utils.curveIntersectsY(
        points.shoulder,
        points.shoulderCp1,
        points.armholePitchCp2,
        points.armholePitch,
        store.get('s3ArmholeMax') * -1 * options.s3Armhole + points.shoulder.y
      )
      paths.backArmhole = new Path()
        .move(points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .split(points.s3ArmholeSplit)[0]
        .hide()
    }

    // Seamline
    // paths.saBase = new Path()
    //   .move(points.cbHem)
    //   .line(points.hem)
    //   .line(points.armhole)
    //   .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    //   .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    //   .join(paths.backArmhole)
    //   .line(points.s3CollarSplit)
    //   .join(paths.backCollar)
    //   .hide()
    // paths.seam = new Path()
    //   .move(points.cbNeck)
    //   .line(points.cbHips)
    //   .join(paths.saBase)
    //   .attr('class', 'fabric')

    paths.backArmholeComplete = new Path()
      .move(points.armhole)
      .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
      .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
      .join(paths.backArmhole)
      .hide()

    points.backArmholeYoke = paths.backArmholeComplete.intersectsY(points.cbYoke.y)[0]

    points.backYokePanel = points.backArmholeYoke.shiftFractionTowards(
      points.cbYoke,
      options.backYokePanelWidth
    )
    points.backHemPanel = points.hem.shiftFractionTowards(points.cbHem, options.backHemPanelWidth)

    console.log({
      side: 'back',
      shoulder: points.shoulder.dist(points.neck),
      yoke: points.cbYoke.dist(points.backArmholeYoke),
      yokeDown: points.cbYoke.y,
      hem: points.cbHem.dist(points.hem),
    })

    store.set(
      'armholeYokeBack',
      paths.backArmholeComplete.split(points.backArmholeYoke)[0].length()
    )

    return part
  },
}
