import { base as brianBase } from '@freesewing/brian'
export const base = {
  name: 'devon.base',
  from: brianBase,
  hide: {
    self: true,
    from: true,
    inherited: true,
  },
  measurements: [
    'biceps',
    'chest',
    'highBust',
    'hpsToBust',
    'hpsToWaistBack',
    'neck',
    'shoulderToShoulder',
    'shoulderSlope',
    'waistToArmpit',
    'waistToHips',
  ],

  options: {
    // Constants
    draftForHighBust: true,
    yokeDrop: 0.3,

    // Parameters
    chestEase: { pct: 5, min: 0, max: 35, menu: 'fit' },
    lengthBonus: { pct: 20, min: 0, max: 40, menu: 'style' },
    neckDrop: { pct: 6, min: 0, max: 10, menu: 'style' },
  },
  draft: ({
    measurements,
    options,
    store,
    points,
    snippets,
    Point,
    Snippet,
    Path,
    paths,
    utils,
    macro,
    part,
  }) => {
    for (const i in snippets) {
      if (i.indexOf('otch')) delete snippets[i]
    }

    points.cbYoke = points.cbNeck.shiftFractionTowards(points.cbWaist, options.yokeDrop)

    for (let key of ['Shoulder', 'Armhole', 'Chest', 'Waist', 'Hips', 'Hem', 'Yoke']) {
      points[`cf${key}`] = new Point(points[`cb${key}`].x, points[`cb${key}`].y)
    }

    points.cfNeckOrg = points.cfNeck.clone()
    points.cfNeck = points.cfNeck.shiftFractionTowards(points.cfWaist, options.neckDrop)
    points.cfNeckCp1 = points.cfNeckCp1.shift(270, points.cfNeckOrg.dist(points.cfNeck))

    return part
  },
}
