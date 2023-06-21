import { pctBasedOn } from '@freesewing/core'
import { base } from '@freesewing/brian'
import { dimensions } from './shared.mjs'

export const front = {
  from: base,
  name: 'aaron.front',
  measurements: ['hips'],
  options: {
    brianFitCollar: false,
    brianFitSleeve: false,
    acrossBackFactor: 0.97,
    bicepsEase: 0.05,
    shoulderEase: 0,
    collarEase: 0,
    frontArmholeDeeper: 0,
    armholeDepthFactor: 0.6,
    shoulderSlopeReduction: 0,
    chestEase: { pct: 8, min: 0, max: 20, ...pctBasedOn('chest'), menu: 'style' },
    draftForHighBust: { bool: false, menu: 'fit' },
    hipsEase: { pct: 8, min: 0, max: 20, menu: 'fit' },
    stretchFactor: { pct: 5, min: 0, max: 15, menu: 'fit' },
    armholeDrop: { pct: 10, min: 0, max: 75, menu: 'style' },
    lengthBonus: { pct: 10, min: -20, max: 60, menu: 'style' },
    necklineBend: { pct: 100, min: 40, max: 100, menu: 'style' },
    necklineDrop: { pct: 20, min: 10, max: 35, menu: 'style' },
    shoulderStrapWidth: { pct: 15, min: 10, max: 40, menu: 'style' },
    shoulderStrapPlacement: { pct: 40, min: 20, max: 80, menu: 'style' },
  },
  draft: ({
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
    macro,
    part,
  }) => {
    // Hide Brian paths
    for (let key of Object.keys(paths)) paths[key].hide()

    // Handle stretch
    for (let i in points) points[i].x = points[i].x * (1 - options.stretchFactor)

    // Clone cb (center back) into cf (center front)
    for (let key of ['Neck', 'Shoulder', 'Armhole', 'Hips', 'Hem']) {
      points[`cf${key}`] = points[`cb${key}`].clone()
    }

    // Neckline
    points.cfNeck = points.cfNeck.shift(-90, options.necklineDrop * measurements.hpsToWaistBack)

    // Strap
    points.strapCenter = points.neck.shiftFractionTowards(
      points.shoulder,
      options.shoulderStrapPlacement
    )
    points.strapLeft = points.strapCenter.shiftTowards(
      points.neck,
      points.neck.dist(points.shoulder) * options.shoulderStrapWidth
    )
    points.strapRight = points.strapLeft.rotate(180, points.strapCenter)
    points.necklineCorner = utils.beamsIntersect(
      points.strapLeft,
      points.strapRight.rotate(-90, points.strapLeft),
      points.cfNeck.shift(0, points.armholePitch.x / 4),
      points.cfNeck
    )
    points.strapLeftCp2 = points.strapLeft.shiftFractionTowards(
      points.necklineCorner,
      options.necklineBend
    )
    points.cfNeckCp1 = points.cfNeck.shiftFractionTowards(
      points.necklineCorner,
      options.necklineBend
    )

    // This will come in handy
    store.set('armholeY', points.armhole.y * (1 + options.armholeDrop))

    // Hips
    points.hips.x =
      ((measurements.hips + options.hipsEase * measurements.hips) / 4) * (1 - options.stretchFactor)
    points.waist.x = points.hips.x // Because stretch

    points.hipsCp2 = new Point(
      points.hips.x,
      store.get('armholeY') + (points.hips.y - store.get('armholeY')) / 2
    )

    // Hem
    points.hem.x = points.hips.x

    // Armhole
    points.armhole = utils.beamIntersectsY(
      points.armhole,
      points.hips,
      points.armhole.y * (1 + options.armholeDrop)
    )
    points.armholeCorner = utils.beamsIntersect(
      points.armhole,
      points.armhole.shift(180, 10),
      points.strapRight,
      points.strapLeft.rotate(90, points.strapRight)
    )
    points.armholeCp2 = points.armhole.shiftFractionTowards(points.armholeCorner, 0.5)
    points.strapRightCp1 = points.strapRight.shiftFractionTowards(points.armholeCorner, 0.5)

    points.anchor = points.cfNeck.clone()

    // Seamline
    paths.seam = new Path()
      .move(points.cfNeck)
      .line(points.cfHem)
      .line(points.hem)
      .curve_(points.hipsCp2, points.armhole)
      .curve(points.armholeCp2, points.strapRightCp1, points.strapRight)
      .line(points.strapLeft)
      .curve(points.strapLeftCp2, points.cfNeckCp1, points.cfNeck)
      .close()
      .attr('class', 'fabric')

    // Store length of armhole and neck opening
    store.set(
      'frontArmholeLength',
      new Path()
        .move(points.armhole)
        .curve(points.armholeCp2, points.strapRightCp1, points.strapRight)
        .length()
    )
    store.set(
      'frontNeckOpeningLength',
      new Path()
        .move(points.strapLeft)
        .curve(points.cfNeckCp1, points.cfNeckCp1, points.cfNeck)
        .length()
    )

    // Complete pattern?
    if (complete) {
      macro('cutonfold', {
        from: points.cfNeck,
        to: points.cfHem,
        grainline: true,
      })
      points.title = new Point(points.waist.x / 2, points.waist.y)
      macro('title', { at: points.title, nr: 1, title: 'front' })
      points.logo = points.title.shift(-90, 75)
      snippets.logo = new Snippet('logo', points.logo)

      if (sa) {
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
      }
    }

    // Paperless?
    if (paperless) {
      dimensions(macro, points, sa)
      macro('vd', {
        from: points.cfHem,
        to: points.cfNeck,
        x: points.cfHem.x - sa - 15,
      })
    }

    return part
  },
}
