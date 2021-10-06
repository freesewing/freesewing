export default function (part) {
  let {
    paperless,
    sa,
    snippets,
    Snippet,
    utils,
    complete,
    points,
    measurements,
    options,
    macro,
    paths,
    Path,
  } = part.shorthand()

  // Double back vent
  if (options.backVent === 2) {
    let ventY = points.bsHips.y - points.bsWaistCp1.dy(points.bsHips) * options.backVentLength
    // Vent tip
    points.ventStart = utils.curveIntersectsY(
      points.bsHips,
      points.bsHipsCp2,
      points.bsWaistCp1,
      points.bsWaist,
      ventY
    )
    paths.ventBase = new Path()
      .move(points.bsWaist)
      .curve(points.bsWaistCp1, points.bsHipsCp2, points.bsHips)
      .split(points.ventStart)
      .pop()
      .line(points.bsHem)
    paths.vent = paths.ventBase.offset(measurements.neck / -10)
    //paths.vent.render = false;
    points.ventSlopeStart = utils.lineIntersectsCurve(
      paths.vent.start(),
      paths.vent.start().shift(170, measurements.neck / 5),
      points.bsHips,
      points.bsHipsCp2,
      points.bsWaistCp1,
      points.bsWaist
    )
    // Mirror slope on vent
    points.ventHem = utils
      .beamIntersectsX(points.sideHem, paths.vent.end(), paths.vent.end().flipX(points.bsHem).x)
      .flipX(points.bsHem)
  }

  // Clean up - Remove this to understand what's going on
  for (let i of Object.keys(paths)) if (i !== 'vent') delete paths[i]
  for (let i of Object.keys(snippets)) delete snippets[i]

  // Anchor for sampling
  points.anchor = points.sideHem.clone()

  // Paths
  paths.hemBase = new Path().move(points.sideHem).line(points.bsHem)
  if (options.backVent === 2) {
    paths.hemBase.line(points.ventHem).line(paths.vent.end())
    paths.saBase = paths.vent
      .clone()
      .reverse()
      .line(points.ventSlopeStart)
      .join(
        new Path()
          .move(points.bsHips)
          .curve(points.bsHipsCp2, points.bsWaistCp1, points.bsWaist)
          .split(points.ventSlopeStart)
          .pop()
      )
  } else {
    paths.saBase = new Path()
      .move(points.bsHem)
      .line(points.bsHips)
      .curve(points.bsHipsCp2, points.bsWaistCp1, points.bsWaist)
  }
  paths.saBase = paths.saBase
    .curve_(points.bsWaistCp2, points.bsArmholeHollow)
    .curve(points.bsArmholeHollowCp1, points.bsArmholeCp2, points.sideArmhole)
    .curve(points.sideArmholeCp2, points.sideSplitCp1, points.fsArmhole)
    ._curve(points.sideWaistCp2, points.sideWaist)
    .curve(points.sideWaistCp1, points.sideHipsCp2, points.sideHips)
    .line(points.sideHem)

  paths.seam = paths.saBase.clone().join(paths.hemBase).close().attr('class', 'fabric')

  if (complete) {
    // Logo
    points.logo = points.sideHips.shiftFractionTowards(points.bsHips, 0.5)
    snippets.logo = new Snippet('logo', points.logo)
    // Notches
    macro('sprinkle', {
      snippet: 'notch',
      on: ['sideWaist', 'bsWaist'],
    })
    points.title = points.sideWaistCp2.shiftFractionTowards(points.bsWaistCp2, 0.5)
    macro('title', {
      at: points.title,
      nr: 3,
      title: 'side',
    })

    if (sa) {
      paths.sa = paths.saBase
        .clone()
        .offset(sa)
        .join(paths.hemBase.offset(sa * 3))
        .close()
        .attr('class', 'fabric sa')
    }

    if (paperless) {
      macro('ld', {
        from: points.sideWaist,
        to: points.bsWaist,
      })
      macro('hd', {
        from: points.sideHem,
        to: points.bsHem,
        y: points.sideHem.y + 3 * sa + 15,
      })
      macro('hd', {
        from: points.fsArmhole,
        to: points.bsArmholeHollow,
        y: points.bsArmholeHollow.y - sa - 15,
      })
      macro('vd', {
        from: points.bsHem,
        to: points.bsHips,
        x: points.bsHips.x + sa + 15,
      })
      macro('vd', {
        from: points.bsHem,
        to: points.bsWaist,
        x: points.bsHips.x + sa + 30,
      })
      macro('vd', {
        from: points.bsHem,
        to: points.bsArmholeHollow,
        x: points.bsHips.x + sa + 45,
      })
      macro('vd', {
        from: points.sideHem,
        to: points.bsArmholeHollow,
        x: points.bsHips.x + sa + 60,
      })
      macro('vd', {
        from: points.sideHem,
        to: points.sideWaist,
        x: points.sideHem.x - sa - 15,
      })
      macro('vd', {
        from: points.sideWaist,
        to: points.fsArmhole,
        x: points.sideHem.x - sa - 15,
      })
    }
  }

  return part
}
