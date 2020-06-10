export default (part) => {
  let {
    store,
    measurements,
    sa,
    Point,
    points,
    Path,
    paths,
    complete,
    paperless,
    macro,
    options
  } = part.shorthand()
  let front = true
  if (typeof points.cfHem === 'undefined') front = false

  // Fit the hips
  points.hem.x = (measurements.hipsCircumference * (1 + options.hipsEase)) / 4
  points.hipsCp2 = new Point(points.hem.x, front ? points.cfWaist.y : points.cbWaist.y)

  if (options.ribbing) {
    // Adapt length for ribbing
    let ribbingHeight
    if (typeof store.get('ribbingHeight') === 'undefined') {
      ribbingHeight =
        (measurements.hpsToWaistBack + measurements.waistToHips) * options.ribbingHeight
      store.set('ribbingHeight', ribbingHeight)
    } else ribbingHeight = store.get('ribbingHeight')
    points.hem = points.hem.shift(90, ribbingHeight)
    if (front) points.cfHem = points.cfHem.shift(90, ribbingHeight)
    else points.cbHem = points.cbHem.shift(90, ribbingHeight)
  }

  // Paths
  paths.saBase = new Path()
    .move(points.hem)
    .curve_(points.hipsCp2, points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
    .line(points.neck)
  if (front) paths.saBase.curve(points.neckCp2Front, points.cfNeckCp1, points.cfNeck)
  else paths.saBase.curve_(points.neckCp2, points.cbNeck)
  if (front) paths.hemBase = new Path().move(points.cfHem).line(points.hem)
  else paths.hemBase = new Path().move(points.cbHem).line(points.hem)

  paths.saBase.render = false
  paths.hemBase.render = false

  paths.seam = paths.hemBase.join(paths.saBase)
  if (front) paths.seam.line(points.cfHem)
  else paths.seam.line(points.cbHem)
  paths.seam.attr('class', 'fabric')

  // Seam allowance
  if (complete) {
    if (sa) {
      paths.sa = paths.hemBase.offset(sa * (options.ribbing ? 1 : 3)).join(paths.saBase.offset(sa))
      if (front) paths.sa.line(points.cfNeck).move(points.cfHem)
      else paths.sa.line(points.cbNeck).move(points.cbHem)
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
      d: sa + 15
    })
    macro('pd', {
      path: new Path()
        .move(points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder),
      d: -15
    })
    macro('vd', {
      from: points.hips,
      to: points.waist,
      x: points.hips.x + sa + 15
    })
    macro('vd', {
      from: points.hips,
      to: points.armhole,
      x: points.hips.x + sa + 30
    })
    macro('vd', {
      from: points.hips,
      to: points.armholePitch,
      x: points.hips.x + sa + 45
    })
    macro('vd', {
      from: points.hips,
      to: points.shoulder,
      x: points.hips.x + sa + 60
    })
    macro('vd', {
      from: points.hips,
      to: points.neck,
      x: points.hips.x + sa + 75
    })
    macro('ld', { from: points.neck, to: points.shoulder, d: sa + 15 })
  }

  return part
}
