export default (part) => {
  let {
    measurements,
    sa,
    points,
    Path,
    paths,
    complete,
    paperless,
    macro,
    options,
    Snippet,
    snippets,
  } = part.shorthand()
  let front = true
  if (typeof points.cfHem === 'undefined') front = false

  for (let id in paths) delete paths[id]

  //  Waist shaping
  points.waist.x = (measurements.waist * (1 + options.waistEase)) / 4
  points.hips.x = (measurements.hips * (1 + options.hipsEase)) / 4
  points.hem.x = points.hips.x
  points.hipsCp2 = points.hips.shift(90, measurements.waistToHips / 3)
  points.waistCp1 = points.waist.shift(-90, measurements.waistToHips / 3)
  points.waistCp2 = points.waist.shift(90, measurements.hpsToWaistBack / 4)

  // Rotating whole armhole for front
  let rotateThese = [
    'armholeCp2',
    'armholeHollowCp1',
    'armholeHollow',
    'armholeHollowCp2',
    'armholePitchCp1',
    'armholePitch',
    'armholePitchCp2',
    'shoulderCp1',
    'shoulder',
    'neck',
  ]
  if (front)
    for (let p of rotateThese) points[p] = points[p].rotate(-options.drapeAngle, points.armhole)

  // Neckline shaping
  points.neck = points.neck.shiftFractionTowards(points.shoulder, 1 - options.shoulderSeamLength)
  points.neckCp2.y = 1.2 * points.shoulder.y
  points.cbNeck.y = 1.2 * points.shoulder.y
  points.neckCp2Front = points.neck.shiftTowards(points.shoulder, -points.shoulder.x / 4)
  points.cfNeck.y = points.neckCp2Front.y + 0.7 * (points.neckCp2Front.y - points.neck.y)
  points.cfNeckCp1 = points.cfNeck.shift(0, points.shoulder.x / 4)

  if (front) {
    points.cNeck = points.cfNeck
    points.cHem = points.cfHem
    points.neckCp2 = points.neckCp2Front
  } else {
    points.cNeck = points.cbNeck
    points.cHem = points.cbHem
    points.cfNeckCp1 = points.cNeck
  }

  // Paths
  paths.saBase = new Path()
    .move(points.hem)
    .line(points.hips)
    .curve(points.hipsCp2, points.waistCp1, points.waist)
    .curve_(points.waistCp2, points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
    .line(points.neck)
    .curve(points.neckCp2, points.cfNeckCp1, points.cNeck)

  paths.hemBase = new Path().move(points.cHem).line(points.hem)

  paths.saBase.render = false
  paths.hemBase.render = false

  paths.seam = paths.hemBase.join(paths.saBase).line(points.cHem)

  // Complete
  if (complete) {
    snippets.shoulderSeamEndNotch = new Snippet('notch', points.neck)
    if (front) snippets.armholePitchNotch = new Snippet('notch', points.armholePitch)

    macro('cutonfold', false)
    macro('cutonfold', {
      from: points.cNeck,
      to: points.cHem,
      grainline: true,
    })

    if (sa) {
      paths.sa = paths.hemBase.offset(sa * 3).join(paths.saBase.offset(sa))
      paths.sa.line(points.cNeck).move(points.cHem)
      paths.sa.line(paths.sa.start())
      paths.sa.attr('class', 'fabric sa')
    }
  }

  // Paperless
  if (paperless) {
    macro('pd', {
      path: new Path()
        .move(points.armhole)
        .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
        .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder),
      d: sa + 15,
    })
    macro('pd', {
      path: new Path()
        .move(points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder),
      d: -15,
    })
    macro('vd', {
      from: points.hips,
      to: points.waist,
      x: points.hips.x + sa + 15,
    })
    macro('vd', {
      from: points.hips,
      to: points.armhole,
      x: points.hips.x + sa + 30,
    })
    macro('vd', {
      from: points.hips,
      to: points.armholePitch,
      x: points.hips.x + sa + 45,
    })
    macro('vd', {
      from: points.hips,
      to: points.shoulder,
      x: points.hips.x + sa + 60,
    })
    macro('vd', {
      from: points.hips,
      to: points.neck,
      x: points.hips.x + sa + 75,
    })
    macro('ld', { from: points.neck, to: points.shoulder, d: sa + 15 })
    macro('vd', {
      from: points.cHem,
      to: points.cNeck,
      x: points.cHem.x - 15,
    })
    macro('hd', {
      from: points.cHem,
      to: points.hem,
      y: points.cHem.y + 3 * sa + 15,
    })
    macro('pd', {
      path: new Path().move(points.cNeck).curve(points.cfNeckCp1, points.neckCp2, points.neck),
      d: -sa - 15,
    })
  }

  return part
}
