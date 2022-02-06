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
  macro('vd', {
    from: points.hem,
    to: points.armhole,
    x: points.hips.x + sa + 15,
  })
  macro('vd', {
    from: points.hem,
    to: points.armholePitch,
    x: points.hips.x + sa + 30,
  })
  macro('vd', {
    from: points.hem,
    to: points.s3ArmholeSplit,
    x: points.hips.x + sa + 45,
  })
  macro('vd', {
    from: points.hem,
    to: points.s3CollarSplit,
    x: points.hips.x + sa + 60,
  })
  macro('ld', { from: points.s3CollarSplit, to: points.s3ArmholeSplit, d: sa + 15 })
}
