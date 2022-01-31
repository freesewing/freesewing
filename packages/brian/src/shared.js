export function s3Notches(part, type) {
  const { snippets, Snippet, points, options } = part.shorthand()
  if (options.s3Armhole !== 0) snippets.shoulderNotch = new Snippet(type, points.shoulder)
  if (options.s3Collar !== 0) snippets.collarNotch = new Snippet(type, points.hps)
}

export function armholeLength(points, Path) {
  return new Path()
    .move(points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
    .length()
}

export function armholeToArmholePitch(points, Path) {
  return new Path()
    .move(points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    .length()
}

export function dimensions(part, side) {
  const { macro, points, Path, sa, paths } = part.shorthand()
  macro('pd', {
    path: new Path()
      .move(points.armhole)
      .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
      .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
      .join(paths[`${side}Armhole`]),
    d: sa + 15,
  })
  macro('pd', {
    path: paths[`${side}Armhole`],
    d: -15,
  })
  let width = Math.max(points.bust.x, points.waist.x, points.hips.x) + sa
  let measurementOffset = (layer) =>  width + 15* layer
  if(points.hem.y > points.hips.y +15) {
    macro('vd', {
      from: points.hem,
      to: points.hips,
      x: measurementOffset(1),
    })
    macro('vd', {
      from: points.hips,
      to: points.waist,
      x: measurementOffset(1),
    })
    macro('vd', {
      from: points.hips,
      to: points.armhole,
      x: measurementOffset(2),
    })
    if(points.hips.x > points.waist.x + 20) {
      macro('hd', {
        from: points.waist,
        to: points.hips,
        y: points.hips.y,
      })
    }
  } else {
    macro('vd', {
      from: points.hem,
      to: points.waist,
      x: measurementOffset(1),
    })
    macro('vd', {
      from: points.hem,
      to: points.armhole,
      x: measurementOffset(2),
    })
    if(points.hem.x > points.waist.x + 20) {
      macro('hd', {
        from: points.waist,
        to: points.hem,
        y: points.hem.y - 5,
      })
    }
  }
  if(points.bust.y > points.armhole.y +15) {
    macro('vd', {
      from: points.waist,
      to: points.bust,
      x: measurementOffset(1),
    })
    macro('vd', {
      from: points.bust,
      to: points.armhole,
      x: measurementOffset(1),
    })
    if(points.bust.x > points.waist.x + 20) {
      macro('hd', {
        from: points.waist,
        to: points.bust,
        y: points.waist.y,
      })
    }
  } else {
    macro('vd', {
      from: points.waist,
      to: points.armhole,
      x: measurementOffset(1),
    })
  }
  if(points.bust.x > points.armhole.x + 20) {
    macro('hd', {
      from: points.armhole,
      to: points.bust,
      y: points.bust.y,
    })
  }
  macro('vd', {
    from: points.armhole,
    to: points.armholePitch,
    x: measurementOffset(1),
  })
  macro('vd', {
    from: points.armholePitch,
    to: points.s3ArmholeSplit,
    x: measurementOffset(1),
  })
  macro('vd', {
    from: points.armhole,
    to: points.s3ArmholeSplit,
    x: measurementOffset(2),
  })
  macro('vd', {
    from: points.s3ArmholeSplit,
    to: points.s3CollarSplit,
    x: measurementOffset(1),
  })
  macro('vd', {
    from: points.hem,
    to: points.s3CollarSplit,
    x: measurementOffset(3),
  })
  macro('ld', { from: points.s3CollarSplit, to: points.s3ArmholeSplit, d: sa + 15 })
}
