export default (part) => {
  let { points, Path, store } = part.shorthand()

  switch (store.get('secondaryBustDartLocation')) {
    case 1330:
      return new Path()
        .move(points.cfNeck)
        .line(points.cfWaist)
        .line(points.waist)
        .line(points.armhole)
        .noop('secondary')
        .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
        .noop('primary')
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .line(points.hps)
        .curve_(points.hpsCp2, points.cfNeck)
      break
    case 1400:
    case 1500:
    case 1600:
      return new Path()
        .move(points.cfNeck)
        .line(points.cfWaist)
        .line(points.waist)
        .line(points.secondaryBustDart1)
        .noop('secondary')
        .line(points.armhole)
        .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
        .noop('primary')
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .line(points.hps)
        .curve_(points.hpsCp2, points.cfNeck)
      break
    case 1700:
      return new Path()
        .move(points.cfNeck)
        .line(points.cfWaist)
        .line(points.waist)
        .noop('secondary')
        .line(points.armhole)
        .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
        .noop('primary')
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .line(points.hps)
        .curve_(points.hpsCp2, points.cfNeck)
      break
    default:
      return new Path()
  }
}
