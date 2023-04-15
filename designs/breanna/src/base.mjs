function draftBreannaBase({ store, points, Point, measurements, options, utils, part }) {
  // HPS
  points.hps = new Point((measurements.neck * (1 + options.collarEase)) / options.collarFactor, 0)

  // Shoulder point using shoulderSlope degree measurement
  store.set('shoulderEase', (measurements.shoulderToShoulder * options.shoulderEase) / 2)
  points.shoulder = utils.beamsIntersect(
    points.hps,
    points.hps.shift(measurements.shoulderSlope * -1, 100),
    new Point(measurements.shoulderToShoulder / 2 + store.get('shoulderEase'), -100),
    new Point(measurements.shoulderToShoulder / 2 + store.get('shoulderEase'), 100)
  )

  // Center back axis
  points.cbHps = new Point(0, 0)
  points.cbNeck = new Point(0, options.backNeckCutout * measurements.neck)
  points.cbWaist = new Point(0, measurements.hpsToWaistBack * (1 + options.verticalEase))
  points.cbHips = new Point(
    0,
    (measurements.hpsToWaistBack + measurements.waistToHips) * (1 + options.verticalEase)
  )

  // Now take shoulder slope reduction into account
  points.shoulder.y -= (points.shoulder.y - points.cbHps.y) * options.shoulderSlopeReduction
  // Shoulder should never be higher than HPS
  if (points.shoulder.y < points.cbHps.y) points.shoulder = new Point(points.shoulder.x, 0)
  points.shoulderNoEase = points.shoulder.clone()

  // Neckline control point
  points.hpsCp2 = utils.beamIntersectsY(
    points.hps,
    points.hps.shiftTowards(points.shoulder, 10).rotate(-90, points.hps),
    points.cbNeck.y
  )

  // Waist at side seam
  points.waist = points.cbWaist.shift(0, (measurements.waist * (1 + options.waistEase)) / 4)

  // Armhhole
  points.armhole = new Point(
    ((measurements.highBust - measurements.highBustFront) * (1 + options.chestEase)) / 2,
    (points.shoulder.y + measurements.biceps * options.armholeDepthBase) *
      options.armholeDepthFactor *
      (1 + options.verticalEase) *
      (1 + options.bicepsEase)
  )
  points.armholePitch = new Point(
    points.shoulder.x * options.acrossBackFactor,
    points.armhole.y / 2
  )
  points.armholeCp2 = utils.beamIntersectsX(
    points.armhole,
    points.armhole.shift(points.armhole.angle(points.waist) - 90, 10),
    points.armholePitch.x
  )
  points.shoulderCp1 = points.shoulder
    .shiftTowards(points.hps, points.shoulder.dist(points.armholePitch) / 8)
    .rotate(90, points.shoulder)
  points.armholePitchCp2 = points.armholePitch.shift(
    90,
    points.shoulder.dist(points.armholePitch) / 3
  )
  points.armholePitchCp1 = points.armholePitchCp2.rotate(180, points.armholePitch)

  return part
}

export const base = {
  name: 'breanna.base',
  hide: { self: true },
  measurements: [
    'biceps',
    'bustFront',
    'bustSpan',
    'highBust',
    'highBustFront',
    'hpsToBust',
    'hpsToWaistBack',
    'hpsToWaistFront',
    'waist',
    'waistToHips',
    'neck',
    'shoulderToShoulder',
    'shoulderSlope',
  ],
  options: {
    // Constants
    collarFactor: 4.8,
    armholeDepthBase: 0.6,
    shoulderSeamLength: 0.95, // 1 tends to be slightly off-shoulder
    sleeveWidthGuarantee: 0.9,
    breannaFitSleeve: true,
    breannaFitCollar: true,

    // Booleans
    shoulderDart: { bool: false, menu: 'fit' },
    waistDart: { bool: true, menu: 'fit' },

    // Lists
    primaryBustDart: {
      list: [
        '06:00',
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '13:00',
        '13:30',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
      ],
      dflt: '06:00',
      doNotTranslate: true,
      menu: 'style',
    },
    secondaryBustDart: {
      list: [
        'none',
        '06:00',
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '13:00',
        '13:30',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
      ],
      dflt: '13:30',
      doNotTranslate: true,
      menu: 'style',
    },

    // Percentages
    acrossBackFactor: { pct: 96, min: 93, max: 100, menu: 'advanced' },
    armholeDepthFactor: { pct: 100, min: 80, max: 120, menu: 'advanced' },
    backNeckCutout: { pct: 5, min: 2, max: 8, menu: 'advanced' },
    shoulderDartSize: { pct: 7, min: 4, max: 10, menu: 'fit' },
    shoulderDartLength: { pct: 85, min: 60, max: 100, menu: 'fit' },
    waistDartSize: { pct: 10, min: 4, max: 15, menu: 'fit' },
    waistDartLength: { pct: 85, min: 60, max: 100, menu: 'fit' },
    verticalEase: { pct: 2, min: 0, max: 8, menu: 'fit' },
    frontArmholeDeeper: { pct: 1, min: 0, max: 5, menu: 'advanced' },
    shoulderEase: { pct: 0, min: 0, max: 4, menu: 'fit' },
    collarEase: { pct: 3.5, min: 0, max: 10, menu: 'fit' },
    chestEase: { pct: 10, min: 5, max: 20, menu: 'fit' },
    waistEase: { pct: 10, min: 5, max: 20, menu: 'fit' },
    primaryBustDartShaping: { pct: 50, min: 25, max: 75, menu: 'style' },
    primaryBustDartLength: { pct: 85, min: 65, max: 95, menu: 'style' },
    secondaryBustDartLength: { pct: 85, min: 65, max: 95, menu: 'style' },
    shoulderSlopeReduction: { pct: 0, min: 0, max: 100, menu: 'advanced' },
    frontScyeDart: { pct: 25, min: 0, max: 45, menu: 'fit' },
  },
  draft: draftBreannaBase,
}
