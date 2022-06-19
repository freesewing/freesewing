export default function (part) {
  let {
    paperless,
    sa,
    snippets,
    Snippet,
    utils,
    store,
    complete,
    points,
    measurements,
    options,
    macro,
    Point,
    paths,
    Path,
  } = part.shorthand()

  // Back vent(s)
  let ventY = points.cbHips.y - points.cbWaistCp2.dy(points.cbHips) * options.backVentLength
  if (options.backVent === 1) {
    // Single back vent
    // Vent tip
    points.ventStart = utils.curveIntersectsY(
      points.cbHips,
      points.cbHipsCp1,
      points.cbWaistCp2,
      points.cbWaist,
      ventY
    )
    paths.ventBase = new Path()
      .move(points.cbWaist)
      .curve(points.cbWaistCp2, points.cbHipsCp1, points.cbHips)
      .split(points.ventStart)
      .pop()
      .line(points.cbHem)
    paths.vent = paths.ventBase.offset(measurements.neck / 10)
    paths.vent.render = false
    points.ventSlopeStart = utils.lineIntersectsCurve(
      paths.vent.start(),
      paths.vent.start().shift(10, measurements.neck / 5),
      points.cbHips,
      points.cbHipsCp1,
      points.cbWaistCp2,
      points.cbWaist
    )
  } else if (options.backVent === 2) {
    // Double back vent
    // Vent tip
    points.ventStart = utils.curveIntersectsY(
      points.hips,
      points.hipsCp2,
      points.waistCp1,
      points.waist,
      ventY
    )
    paths.ventBase = new Path()
      .move(points.waist)
      .curve(points.waistCp1, points.hipsCp2, points.hips)
      .split(points.ventStart)
      .pop()
      .line(points.hem)
    paths.vent = paths.ventBase.offset(measurements.neck / -10)
    paths.vent.render = false
    points.ventSlopeStart = utils.lineIntersectsCurve(
      paths.vent.start(),
      paths.vent.start().shift(170, measurements.neck / 5),
      points.hips,
      points.hipsCp2,
      points.waistCp1,
      points.waist
    )
  }

  // Store shoulder slope
  store.set('shoulderSlope', Math.abs(points.neck.angle(points.shoulder) - 360))

  // Clean up - Remove this to understand what's going on
  for (let i of Object.keys(paths)) if (i !== 'vent') delete paths[i]
  for (let i of Object.keys(snippets)) delete snippets[i]

  // Paths
  if (options.backVent === 2) {
    paths.saBase = paths.vent
      .clone()
      .reverse()
      .line(points.ventSlopeStart)
      .join(
        new Path()
          .move(points.hips)
          .curve(points.hipsCp2, points.waistCp1, points.waist)
          .split(points.ventSlopeStart)
          .pop()
      )
    paths.saBase.render = true
  } else {
    paths.saBase = new Path()
      .move(points.hem)
      .line(points.hips)
      .curve(points.hipsCp2, points.waistCp1, points.waist)
  }
  paths.saBase
    .curve(points.waistCp2, points.bsArmholeHollowCp2, points.bsArmholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
    .line(points.neck)
    .curve_(points.neckCp2, points.cbNeck)
  if (options.centerBackDart > 0)
    paths.saBase = paths.saBase._curve(points.cbChestCp1, points.cbChest)
  else paths.saBase = paths.saBase.line(points.cbChest)
  paths.saBase = paths.saBase.curve(points.cbChestCp2, points.cbWaistCp1, points.cbWaist)
  if (options.backVent === 1) {
    paths.saBase = paths.saBase
      .join(
        new Path()
          .move(points.cbWaist)
          .curve(points.cbWaistCp2, points.cbHipsCp1, points.cbHips)
          .line(points.cbHem)
          .split(points.ventSlopeStart)
          .shift()
      )
      .line(paths.vent.start())
      .join(paths.vent)
  } else {
    paths.saBase.curve(points.cbWaistCp2, points.cbHipsCp1, points.cbHips).line(points.cbHem)
  }
  paths.saBase.render = false

  if (options.backVent === 2) paths.hemBase = new Path().move(points.cbHem).line(paths.vent.end())
  else if (options.backVent === 1)
    paths.hemBase = new Path().move(paths.vent.end()).line(points.hem)
  else paths.hemBase = new Path().move(points.cbHem).line(points.hem)
  paths.hemBase.render = false

  paths.seam = paths.saBase.join(paths.hemBase).attr('class', 'fabric')

  if (complete) {
    // Logo
    points.logo = new Point(points.title.x, points.armholeHollow.y)
    snippets.logo = new Snippet('logo', points.logo)
    // Notches
    macro('sprinkle', {
      snippet: 'notch',
      on: ['neck', 'shoulder', 'armholePitch', 'cbWaist', 'waist'],
    })
    // Grainline
    macro('grainline', {
      from: new Point(points.neck.x, points.hips.y),
      to: points.neck,
    })

    if (sa) {
      paths.sa = paths.saBase
        .offset(sa)
        .join(paths.hemBase.offset(sa * 3))
        .close()
        .attr('class', 'fabric sa')
    }

    if (paperless) {
      macro('hd', {
        from: points.cbNeck,
        to: points.neck,
        y: points.neck.y - 15 - sa,
      })
      macro('hd', {
        from: points.cbChest,
        to: points.neck,
        y: points.neck.y - 30 - sa,
      })
      macro('hd', {
        from: points.cbChest,
        to: points.armholePitch,
        y: points.neck.y - 45 - sa,
      })
      macro('hd', {
        from: points.cbChest,
        to: points.shoulder,
        y: points.neck.y - 60 - sa,
      })
      macro('hd', {
        from: points.cbChest,
        to: points.bsArmholeHollow,
        y: points.neck.y - 75 - sa,
      })
      macro('vd', {
        from: points.bsArmholeHollow,
        to: points.armholePitch,
        x: points.bsArmholeHollow.x + sa + 15,
      })
      macro('vd', {
        from: points.bsArmholeHollow,
        to: points.shoulder,
        x: points.bsArmholeHollow.x + sa + 30,
      })
      macro('vd', {
        from: points.hem,
        to: points.hips,
        x: points.hem.x + sa + 15,
      })
      macro('vd', {
        from: points.hem,
        to: points.waist,
        x: points.hem.x + sa + 30,
      })
      macro('vd', {
        from: points.hem,
        to: points.bsArmholeHollow,
        x: points.hem.x + sa + 45,
      })
      macro('hd', {
        from: paths.vent.start(),
        to: points.ventSlopeStart,
        y: points.ventSlopeStart.y + 25,
      })
      macro('hd', {
        from: paths.vent.end(),
        to: points.hem,
        y: points.hem.y + 3 * sa + 15,
      })
      macro('vd', {
        from: paths.vent.end(),
        to: paths.vent.start(),
        x: paths.vent.end().x - sa - 15,
      })
      macro('vd', {
        from: paths.vent.end(),
        to: points.ventSlopeStart,
        x: paths.vent.end().x - sa - 30,
      })
      macro('vd', {
        from: paths.vent.end(),
        to: points.cbWaist,
        x: paths.vent.end().x - sa - 45,
      })
      macro('vd', {
        from: paths.vent.end(),
        to: points.cbChest,
        x: paths.vent.end().x - sa - 60,
      })
      macro('vd', {
        from: paths.vent.end(),
        to: points.cbNeck,
        x: paths.vent.end().x - sa - 75,
      })
      macro('vd', {
        from: paths.vent.end(),
        to: points.neck,
        x: paths.vent.end().x - sa - 90,
      })
      macro('ld', {
        from: points.cbWaist,
        to: points.waist,
      })
      macro('ld', {
        from: points.neck,
        to: points.shoulder,
        d: -15,
      })
    }
  }

  return part
}
