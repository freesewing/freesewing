export default (part) => {
  let { points, Path, store } = part.shorthand()

  switch (store.get('secondaryBustDartLocation')) {
    case 1130:
      return new Path()
        .move(points.primaryBustDart1)
        .noop('primary')
        .line(points.cfWaist)
        .line(points.waist)
        .line(points.armhole)
        .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .line(points.hps)
        .noop('secondary')
        .curve_(points.hpsCp2, points.primaryBustDart1)
      break
    case 1200:
      return new Path()
        .move(points.primaryBustDart1)
        .noop('primary')
        .line(points.cfWaist)
        .line(points.waist)
        .line(points.armhole)
        .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .line(points.secondaryBustDart1)
        .noop('secondary')
        .line(points.hps)
        .curve_(points.hpsCp2, points.primaryBustDart1)
      break
    case 1230:
      return new Path()
        .move(points.primaryBustDart1)
        .noop('primary')
        .line(points.cfWaist)
        .line(points.waist)
        .line(points.armhole)
        .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .noop('secondary')
        .line(points.hps)
        .curve_(points.hpsCp2, points.primaryBustDart1)
      break
    case 1300:
      return new Path()
        .move(points.primaryBustDart1)
        .noop('primary')
        .line(points.cfWaist)
        .line(points.waist)
        .line(points.armhole)
        .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
        .noop('secondary')
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .line(points.hps)
        .curve_(points.hpsCp2, points.primaryBustDart1)
      break
    case 1330:
      return new Path()
        .move(points.primaryBustDart1)
        .noop('primary')
        .line(points.cfWaist)
        .line(points.waist)
        .line(points.armhole)
        .noop('secondary')
        .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .line(points.hps)
        .curve_(points.hpsCp2, points.primaryBustDart1)
      break
    case 1400:
    case 1500:
    case 1600:
      return new Path()
        .move(points.primaryBustDart1)
        .noop('primary')
        .line(points.cfWaist)
        .line(points.waist)
        .line(points.secondaryBustDart1)
        .noop('secondary')
        .line(points.armhole)
        .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .line(points.hps)
        .curve_(points.hpsCp2, points.primaryBustDart1)
      break
    case 1700:
      return new Path()
        .move(points.primaryBustDart1)
        .noop('primary')
        .line(points.cfWaist)
        .line(points.waist)
        .noop('secondary')
        .line(points.armhole)
        .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .line(points.hps)
        .curve_(points.hpsCp2, points.primaryBustDart1)
      break
    default:
      return new Path()
  }
}
