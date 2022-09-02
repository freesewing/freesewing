export default (part) => {
  let { points, Path, store } = part.shorthand()

  switch (store.get('primaryBustDartLocation')) {
    case 600:
      return new Path()
        .move(points.cfNeck)
        .line(points.cfWaist)
        .noop('primary')
        .line(points.waist)
        .line(points.armhole)
        .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .line(points.hps)
        .curve_(points.hpsCp2, points.cfNeck)
      break
    case 700:
      return new Path()
        .move(points.cfNeck)
        .noop('primary')
        .line(points.waist)
        .line(points.armhole)
        .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .line(points.hps)
        .curve_(points.hpsCp2, points.cfNeck)
      break
    case 800:
    case 900:
    case 1000:
      return new Path()
        .move(points.cfNeck)
        .noop('primary')
        .line(points.cfWaist)
        .line(points.waist)
        .line(points.armhole)
        .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .line(points.hps)
        .curve_(points.hpsCp2, points.cfNeck)
      break
    case 1100:
      return new Path()
        .move(points.primaryBustDart1)
        .noop('primary')
        .line(points.cfWaist)
        .line(points.waist)
        .line(points.armhole)
        .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .line(points.hps)
        .curve_(points.hpsCp2, points.primaryBustDart1)
      break
    case 1130:
      return new Path()
        .move(points.cfNeck)
        .line(points.cfWaist)
        .line(points.waist)
        .line(points.armhole)
        .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .line(points.hps)
        .noop('primary')
        .curve_(points.hpsCp2, points.cfNeck)
      break
    case 1200:
    case 1230:
      return new Path()
        .move(points.cfNeck)
        .line(points.cfWaist)
        .line(points.waist)
        .line(points.armhole)
        .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .noop('primary')
        .line(points.hps)
        .curve_(points.hpsCp2, points.cfNeck)
      break
    case 1300:
      return new Path()
        .move(points.cfNeck)
        .line(points.cfWaist)
        .line(points.waist)
        .line(points.armhole)
        .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
        .noop('primary')
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .line(points.hps)
        .curve_(points.hpsCp2, points.cfNeck)
      break
    case 1330:
      return new Path()
        .move(points.cfNeck)
        .line(points.cfWaist)
        .line(points.waist)
        .line(points.armhole)
        .noop('primary')
        .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .line(points.hps)
        .curve_(points.hpsCp2, points.cfNeck)
      break
    case 1400:
    case 1500:
    case 1600:
    case 1700:
      return new Path()
        .move(points.cfNeck)
        .line(points.cfWaist)
        .line(points.waist)
        .noop('primary')
        .line(points.armhole)
        .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
        .line(points.hps)
        .curve_(points.hpsCp2, points.cfNeck)
      break
  }
}
