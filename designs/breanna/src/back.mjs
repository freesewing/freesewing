import { base } from './base.mjs'
import { pluginBundle } from '@freesewing/plugin-bundle'

function draftBreannaBack({
  sa,
  points,
  Path,
  paths,
  Snippet,
  snippets,
  complete,
  paperless,
  macro,
  Point,
  options,
  utils,
  store,
  part,
}) {
  // Shoulder dart
  if (options.shoulderDart) {
    points.shoulderDartCenter = points.hps.shiftFractionTowards(points.shoulder, 0.5)
    points.shoulderDartTarget = utils.beamIntersectsY(
      points.shoulderDartCenter,
      points.hps.rotate(90, points.shoulderDartCenter),
      points.armholePitch.y
    )
    points.shoulderDart2 = points.shoulderDartCenter.shiftFractionTowards(
      points.hps,
      options.shoulderDartSize
    )
    points.shoulderDart1 = points.shoulderDart2.rotate(180, points.shoulderDartCenter)
    points.shoulderDartTip = points.shoulderDartCenter.shiftFractionTowards(
      points.shoulderDartTarget,
      options.shoulderDartLength
    )
    points.shoulderDartEdge = utils.beamsIntersect(
      points.shoulderDart1,
      points.shoulderDartTip.rotate(90, points.shoulderDart1),
      points.shoulderDart2,
      points.shoulderDartTip.rotate(90, points.shoulderDart2)
    )
    let angle = points.hps.angle(points.shoulder)
    let extra = points.shoulderDart1.dist(points.shoulderDart2)
    points.shoulder = points.shoulder.shift(angle, extra)
    points.shoulderCp1 = points.shoulderCp1.shift(angle, extra)
    points.armholePitch = utils.beamIntersectsY(
      points.armholePitchCp1,
      points.shoulderCp1,
      points.armholePitch.y
    )
    points.armholePitchCp2 = points.armholePitchCp1.rotate(180, points.armholePitch)
  }

  // Waist dart
  if (options.waistDart) {
    points.waistDartCenter = points.cbWaist.shift(
      0,
      points.waist.x / 2 + points.waist.x * options.waistDartSize
    )
    points.waistDartTarget = new Point(points.waistDartCenter.x, points.armhole.y * 1.1)
    points.waistDartTip = points.waistDartCenter.shiftFractionTowards(
      points.waistDartTarget,
      options.waistDartLength
    )
    points.waistDart1 = points.waistDartCenter.shift(
      180,
      (points.waist.x * options.waistDartSize) / 2
    )
    points.waistDart2 = points.waistDart1.rotate(180, points.waistDartCenter)
    points.waist = points.waist.shift(0, points.waist.x * options.waistDartSize)
    points.waistDartEdge = utils.beamsIntersect(
      points.waistDart1,
      points.waistDartTarget.rotate(90, points.waistDart1),
      points.waistDart2,
      points.waistDartTarget.rotate(90, points.waistDart2)
    )
  }

  // Paths
  paths.seam = new Path()
    .move(points.cbNeck)
    .line(points.cbWaist)
    .noop('waistDart')
    .line(points.waist)
    .line(points.armhole)
    .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
    .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
    .noop('shoulderDart')
    .line(points.hps)
    .curve_(points.hpsCp2, points.cbNeck)
  paths.saBase = paths.seam.clone()

  // Insert darts
  if (options.waistDart) {
    let dart = new Path().line(points.waistDart1).line(points.waistDartTip).line(points.waistDart2)
    paths.seam = paths.seam.insop('waistDart', dart)
    let saDart = new Path()
      .line(points.waistDart1)
      .line(points.waistDartEdge)
      .line(points.waistDart2)
    paths.saBase = paths.saBase.insop('waistDart', saDart)
    paths.waistDartHint = new Path()
      .move(points.waistDart1)
      .line(points.waistDartEdge)
      .line(points.waistDart2)
      .attr('class', 'fabric dotted stroke-sm')
  }

  // Shoulder dart
  if (options.shoulderDart) {
    let dart = new Path()
      .line(points.shoulderDart2)
      .line(points.shoulderDartTip)
      .line(points.shoulderDart1)
    paths.seam = paths.seam.insop('shoulderDart', dart)
    let saDart = new Path()
      .line(points.shoulderDart1)
      .line(points.shoulderDartEdge)
      .line(points.shoulderDart2)
    paths.saBase = paths.saBase.insop('shoulderDart', saDart)
    paths.shoulderDartHint = new Path()
      .move(points.shoulderDart1)
      .line(points.shoulderDartEdge)
      .line(points.shoulderDart2)
      .attr('class', 'fabric dotted stroke-sm')
  }

  paths.seam.close().attr('class', 'fabric')
  paths.saBase.close()
  paths.saBase.hide()

  // Store data
  if (options.shoulderDart) {
    store.set(
      'backShoulderSeamLength',
      points.hps.dist(points.shoulderDart1) + points.shoulder.dist(points.shoulderDart2)
    )
  } else {
    store.set('backShoulderSeamLength', points.hps.dist(points.shoulder))
  }
  if (options.waistDart) {
    store.set(
      'backWaistLength',
      2 * (points.cbWaist.dist(points.waistDart1) + points.waistDart2.dist(points.waist))
    )
  } else {
    store.set('backWaistLength', 2 * points.cbWaist.dist(points.waist))
  }
  store.set(
    'backArmholeToArmholePitch',
    new Path()
      .move(points.armhole)
      .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
      .length()
  )
  store.set(
    'backArmholeLength',
    new Path()
      .move(points.armholePitch)
      .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
      .length() + store.get('backArmholeToArmholePitch')
  )
  store.set('backSideSeamLength', points.armhole.dist(points.waist))
  store.set(
    'backCollarLength',
    new Path().move(points.cbNeck)._curve(points.hpsCp2, points.hps).length() * 2
  )

  // Anchor point
  points.gridAnchor = points.cbNeck.clone()

  store.cutlist.addCut()

  // Complete pattern?
  if (complete) {
    // Title
    points.title = new Point(points.armhole.x / 4, points.armhole.y - 60)
    macro('title', { nr: 1, title: 'back', at: points.title })

    // Logo
    points.logo = new Point(points.armhole.x / 1.5, points.armhole.y)
    snippets.logo = new Snippet('logo', points.logo)

    // Notch
    snippets.armholePitch = new Snippet('bnotch', points.armholePitch)

    // Grainline
    const grainlineDistance = (points.armhole.x - points.cbNeck.x) * 0.1
    macro('grainline', {
      from: points.cbNeck.shift(0, grainlineDistance),
      to: points.cbWaist.shift(0, grainlineDistance),
    })

    if (sa) paths.sa = paths.saBase.offset(sa).attr('class', 'sa')
  }

  // Paperless?
  if (paperless) {
    macro('vd', {
      from: points.cbWaist,
      to: points.cbNeck,
      x: -15 - sa,
    })
    if (options.waistDart) {
      let y = points.waist.y + 15 + sa
      macro('hd', {
        from: points.cbWaist,
        to: points.waistDart1,
        y,
      })
      macro('hd', {
        from: points.cbWaist,
        to: points.waistDartEdge,
        y: y + 15,
      })
      macro('hd', {
        from: points.cbWaist,
        to: points.waistDart2,
        y: y + 30,
      })
      macro('hd', {
        from: points.cbWaist,
        to: points.waist,
        y: y + 45,
      })
      macro('hd', {
        from: points.cbWaist,
        to: points.armhole,
        y: y + 60,
      })
      macro('vd', {
        from: points.waistDart2,
        to: points.waistDartTip,
        x: points.waistDart2.x + 15,
      })
    } else {
      let y = points.waist.y + 15 + sa
      macro('hd', {
        from: points.cbWaist,
        to: points.waist,
        y: points.waist.y + 15 + sa,
      })
      macro('hd', {
        from: points.cbWaist,
        to: points.armhole,
        y: y + 30,
      })
    }
    let x = points.armhole.x + 15 + sa
    macro('vd', {
      from: points.waist,
      to: points.armhole,
      x,
    })
    macro('vd', {
      from: points.waist,
      to: points.armholePitch,
      x: x + 15,
    })
    macro('vd', {
      from: points.waist,
      to: points.shoulder,
      x: x + 30,
    })
    macro('vd', {
      from: points.waist,
      to: points.hps,
      x: x + 45,
    })
    macro('hd', {
      from: points.cbNeck,
      to: points.armholePitch,
      y: points.armholePitch.y + 25,
    })
    macro('hd', {
      from: points.cbNeck,
      to: points.hps,
      y: points.hps.y - sa - 15,
    })
    macro('hd', {
      from: points.cbNeck,
      to: points.shoulder,
      y: points.hps.y - sa - 30,
    })
  }

  return part
}

export const back = {
  from: base,
  name: 'breanna.back',
  plugins: [pluginBundle],
  draft: draftBreannaBack,
}
