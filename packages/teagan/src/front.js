import { dimensions } from './shared'

export default function (part) {
  let {
    utils,
    store,
    sa,
    Point,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    options,
    measurements,
    complete,
    paperless,
    macro
  } = part.shorthand()

  // Hide Brian paths
  for (let key of Object.keys(paths)) paths[key].render = false

  // Adapt fit to waist
  let width
  if (measurements.waist > measurements.hips)
    width = (measurements.waist * (1 + options.hipsEase)) / 4
  else width = (measurements.hips * (1 + options.hipsEase)) / 4
  points.hem.x = width
  points.hips.x = width
  points.waist.x = width
  points.waistCp2 = points.waist.shift(90, points.armhole.dy(points.waist) / 3)

  // Clone cb (center back) into cf (center front)
  for (let key of ['Neck', 'Shoulder', 'Armhole', 'Hips', 'Hem']) {
    points[`cf${key}`] = points[`cb${key}`].clone()
  }

  // Neckline
  points.cfNeck = new Point(0, options.necklineDepth * measurements.hpsToWaistBack)
  points.cfNeckCp1 = points.cfNeck.shift(0, points.neck.x * options.necklineBend * 2)
  points.neck = points.hps.shiftFractionTowards(points.shoulder, options.necklineWidth)
  points.neckCp2 = points.neck
    .shiftTowards(points.shoulder, points.neck.dy(points.cfNeck) * (0.2 + options.necklineBend))
    .rotate(-90, points.neck)

  // Redraw armhole
  points.shoulderCp1 = utils.beamIntersectsY(
    points.shoulder,
    points.shoulderCp1,
    points.armholePitch.y
  )
  points.armholeHollowCp2 = utils.beamIntersectsX(
    points.armholeHollow,
    points.armholeHollowCp2,
    points.armholePitch.x
  )

  // Draw seamline
  paths.seam = new Path()
    .move(points.cfHem)
    .line(points.hem)
    .line(points.waist)
    .curve_(points.waistCp2, points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.shoulderCp1, points.shoulder)
    .line(points.neck)
    .curve(points.neckCp2, points.cfNeckCp1, points.cfNeck)
    .line(points.cfHem)
    .close()

  // Store front sleevecap length
  store.set(
    'frontArmholeLength',
    new Path()
      .move(points.armhole)
      .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
      .curve(points.armholeHollowCp2, points.shoulderCp1, points.shoulder)
      .length()
  )

  // Complete pattern?
  if (complete) {
    macro('cutonfold', {
      from: points.cfNeck,
      to: points.cfHem,
      grainline: true
    })
    points.title = new Point(points.waist.x / 2, points.waist.y)
    macro('title', { at: points.title, nr: 1, title: 'front' })
    points.logo = points.title.shift(-90, 75)
    snippets.logo = new Snippet('logo', points.logo)

    if (sa) {
      /*
      let saShoulder = new Path().move(points.strapRight).line(points.strapLeft).offset(sa)
      paths.saShoulder = new Path()
        .move(points.strapRight)
        .line(saShoulder.start())
        .join(saShoulder)
        .line(points.strapLeft)
        .attr('class', 'fabric sa')
      paths.sa = new Path()
        .move(points.cfHem)
        .line(points.cfHem)
        .join(
          new Path()
            .move(points.cfHem)
            .line(points.hem)
            .offset(sa * 2.5)
        )
        .join(
          new Path()
            .move(points.hem)
            .curve_(points.waist, points.armhole)
            .offset(sa)
            .line(points.armhole)
        )
        .attr('class', 'fabric sa')
        */
    }
  }

  // Paperless?
  if (paperless) {
    //dimensions(macro, points, sa)
    //macro('vd', {
    //  from: points.cfHem,
    //  to: points.cfNeck,
    //  x: points.cfHem.x - sa - 15
    //})
  }

  return part
}
