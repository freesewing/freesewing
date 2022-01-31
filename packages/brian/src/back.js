import * as shared from './shared'

export default (part) => {
  let {
    store,
    sa,
    points,
    Path,
    Point,
    paths,
    Snippet,
    snippets,
    complete,
    paperless,
    macro,
    options,
    measurements,
    utils,
  } = part.shorthand()

  points.anchor = points.cbHem.clone()

  // Adapt the shoulder seam according to the relevant options
  // Note: s3 stands for Shoulder Seam Shift
  if (options.s3Collar === 0) {
    points.s3CollarSplit = points.hps
    paths.backCollar = new Path()
      .move(points.hps)
      .curve_(points.neckCp2, points.cbNeck)
      .setRender(false)
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
      .setRender(false)
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
      .setRender(false)
  }
  if (options.s3Armhole === 0) {
    points.s3ArmholeSplit = points.shoulder
    paths.backArmhole = new Path()
      .move(points.armholePitch)
      .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
      .setRender(false)
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
      .setRender(false)
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
      .setRender(false)
  }

  // Paths
  paths.hemBase = new Path()
    .move(points.cbHem)
    .line(points.hem)
    .setRender(false)

  paths.bArmhole = new Path()
    .move(points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    .join(paths.backArmhole)
    .setRender(false)

  if( points.armhole.y < points.bust.y) {
    paths.bBust = new Path()
      .move(points.waist)
      .curve(points.waistCp2, points.bustCp1, points.bust)
      .curve_(points.bustCp2, points.armhole)
      .setRender(false)
  } else {
    paths.bBust = new Path()
      .move(points.waist)
      .curve(points.waistCp2, points.bustCp1, points.armhole)
      .setRender(false)
  }

  paths.saBase = new Path()
    .move(points.hem)
    .line(points.hips)
    .curve(points.hipsCp2, points.waistCp1, points.waist)
    .join(paths.bBust)
    .join(paths.bArmhole)
    .line(points.s3CollarSplit)
    .join(paths.backCollar)
    .setRender(false)

  paths.seam = new Path()
    .move(points.cbNeck)
    .line(points.cbHem)
    .join(paths.hemBase)
    .join(paths.saBase)
    .close()
    .attr('class', 'fabric')

  // Store lengths to fit sleeve
  store.set('backArmholeLength', shared.armholeLength(points, Path))
  store.set('backArmholeToArmholePitch', shared.armholeToArmholePitch(points, Path))

  // Complete pattern?
  if (complete) {
    macro('cutonfold', {
      from: points.cbNeck,
      to: points.cbHem,
      grainline: true,
    })

    macro('title', { at: points.title, nr: 2, title: 'back' })
    snippets.armholePitchNotch = new Snippet('bnotch', points.armholePitch)
    snippets.waistNotch = new Snippet('bnotch', points.waist)
    if(points.bust.y - 10 > points.armhole.y) {
      snippets.bustNotch = new Snippet('bnotch', points.bust)
    }
    paths.waist = new Path().move(points.cbWaist).line(points.waist).attr('class', 'help')
    paths.hips = new Path().move(points.cbHips).line(points.hips).attr('class', 'help')
    if (sa) {
      paths.sa = paths.saBase
        .offset(sa)
        .attr('class', 'fabric sa')
        .line(points.cbNeck)
        .move(points.cbHem)
      paths.sa.line(paths.sa.start())
    }

    // Add notches if the shoulder seam is shifted
    shared.s3Notches(part, 'bnotch')
  }

  // Paperless?
  if (paperless) {
    shared.dimensions(part, 'back')

    macro('vd', {
      from: points.cbHem,
      to: points.cbNeck,
      x: points.cbHem.x - sa - 15,
    })
    macro('vd', {
      from: points.cbNeck,
      to: points.s3CollarSplit,
      x: points.cbHem.x - sa - 15,
    })
    macro('hd', {
      from: points.cbHem,
      to: points.hem,
      y: points.hem.y + sa + 15,
    })
    let width = Math.max(points.bust.x, points.waist.x, points.hips.x) + sa
    if(width > points.hem.x) {
      macro('hd', {
        from: points.cbHem,
        to: new Point(width, points.hem.y),
        y: points.hem.y + sa + 30,
      })
    }
    macro('hd', {
      from: points.cbNeck,
      to: points.s3CollarSplit,
      y: points.s3CollarSplit.y - sa - 15,
    })
    macro('hd', {
      from: points.cbNeck,
      to: points.s3ArmholeSplit,
      y: points.s3CollarSplit.y - sa - 30,
    })
  }

  return part
}
