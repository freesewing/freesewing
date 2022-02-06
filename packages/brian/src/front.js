import * as shared from './shared'

export default (part) => {
  let {
    store,
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
    utils,
  } = part.shorthand()

  // Re-use points for deeper armhole at the front
  points.armholePitchCp1 = points.frontArmholePitchCp1
  points.armholePitch = points.frontArmholePitch
  points.armholePitchCp2 = points.frontArmholePitchCp2

  // Adapt the shoulder line according to the relevant options
  if (options.s3Collar === 0) {
    points.s3CollarSplit = points.hps
    paths.frontCollar = new Path()
      .move(points.hps)
      .curve(points.neckCp2Front, points.cfNeckCp1, points.cfNeck)
      .setRender(false)
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
      .setRender(false)
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
      .join(new Path().move(points.hps).curve(points.neckCp2Front, points.cfNeckCp1, points.cfNeck))
      .setRender(false)
  }
  if (options.s3Armhole === 0) {
    points.s3ArmholeSplit = points.shoulder
    paths.frontArmhole = new Path()
      .move(points.armholePitch)
      .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
      .setRender(false)
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
      .setRender(false)
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
      .setRender(false)
  }

  // Rename cb (center back) to cf (center front)
  for (let key of ['Shoulder', 'Armhole', 'Waist', 'Hips', 'Hem']) {
    points[`cf${key}`] = new Point(points[`cb${key}`].x, points[`cb${key}`].y)
    delete points[`cb${key}`]
  }
  // Front neckline points
  points.neckCp2 = new Point(points.neckCp2Front.x, points.neckCp2Front.y)

  // Seamline
  paths.saBase = new Path()
    .move(points.cfHem)
    .line(points.hem)
    .line(points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    .join(paths.frontArmhole)
    .line(points.s3CollarSplit)
    .join(paths.frontCollar)

  paths.saBase.render = false
  paths.seam = new Path()
    .move(points.cfNeck)
    .line(points.cfHem)
    .join(paths.saBase)
    .attr('class', 'fabric')

  // Store lengths to fit sleeve
  store.set('frontArmholeLength', shared.armholeLength(points, Path))
  store.set('frontArmholeToArmholePitch', shared.armholeToArmholePitch(points, Path))

  // Complete pattern?
  if (complete) {
    macro('cutonfold', {
      from: points.cfNeck,
      to: points.cfHips,
      grainline: true,
    })
    macro('title', { at: points.title, nr: 1, title: 'front' })
    snippets.armholePitchNotch = new Snippet('notch', points.armholePitch)
    paths.waist = new Path().move(points.cfWaist).line(points.waist).attr('class', 'help')
    if (sa) {
      paths.sa = paths.saBase
        .offset(sa)
        .attr('class', 'fabric sa')
        .line(points.cfNeck)
        .move(points.cfHips)
      paths.sa.line(paths.sa.start())
    }

    // Add notches if the shoulder seam is shifted
    shared.s3Notches(part, 'notch')
  }

  // Paperless?
  if (paperless) {
    shared.dimensions(part, 'front')
    macro('hd', {
      from: points.cfHips,
      to: points.hips,
      y: points.hem.y + sa + 15,
    })
    macro('vd', {
      from: points.cfHem,
      to: points.cfWaist,
      x: points.cfHips.x - sa - 15,
    })
    macro('vd', {
      from: points.cfHem,
      to: points.cfNeck,
      x: points.cfHips.x - sa - 30,
    })
    macro('hd', {
      from: points.cfNeck,
      to: points.s3CollarSplit,
      y: points.s3CollarSplit.y - sa - 15,
    })
    macro('hd', {
      from: points.cfNeck,
      to: points.s3ArmholeSplit,
      y: points.s3CollarSplit.y - sa - 30,
    })
  }

  return part
}
