import { topSleeve as bentTopSleeve } from '@freesewing/bent'
import { front as bentFront } from '@freesewing/bent'
import { pluginCutlist } from '@freesewing/plugin-cutlist'

function draftCarltonTopSleeve({
  paperless,
  sa,
  store,
  complete,
  points,
  measurements,
  options,
  macro,
  paths,
  Path,
  Snippet,
  snippets,
  part,
}) {
  // Add cuff
  let length = measurements.shoulderToWrist * options.cuffLength
  let angle = points.tsWristRight.angle(points.tsWristLeft)
  points.cuffBottomRight = points.tsWristRight.shift(angle + 90, length)
  points.cuffBottomLeft = points.tsWristLeft.shift(angle + 90, length)
  macro('round', {
    to: points.tsWristRight,
    from: points.cuffBottomLeft,
    via: points.cuffBottomRight,
    radius: length / 3,
    prefix: 'round',
  })
  store.set('topCuffWidth', points.tsWristLeft.dist(points.tsWristRight))
  store.set('cuffLength', length)
  store.set('cuffRadius', length / 3)

  // Clean up
  for (let i in paths) delete paths[i]

  // Paths
  paths.seam = new Path()
    .move(points.tsLeftEdge)
    ._curve(points.tsElbowLeftCpTop, points.tsElbowLeft)
    .line(points.tsWristLeft)
    .line(points.cuffBottomLeft)
    .line(points.roundStart)
    .curve(points.roundCp1, points.roundCp2, points.roundEnd)
    .line(points.tsWristRight)
    .line(points.elbowRight)
    .curve(points.elbowRightCpTop, points.tsRightEdgeCpBottom, points.tsRightEdge)
    .curve_(points.tsRightEdgeCpTop, points.backPitchPoint)
    ._curve(points.topCpRight, points.top)
    .curve(points.topCpLeft, points.frontPitchPointCpTop, points.frontPitchPoint)
    .curve(points.frontPitchPointCpBottom, points.tsLeftEdgeCpRight, points.tsLeftEdge)
    .close()
    .attr('class', 'fabric')

  store.cutlist.addCut()
  store.cutlist.addCut({ material: 'lining' })

  if (complete) {
    macro('title', {
      at: points.armCenter,
      nr: 3,
      title: 'topsleeve',
    })
    macro('grainline', {
      from: points.boxBottom,
      to: points.top,
    })
    macro('scalebox', { at: points.tsWristLeftHelperTop })
    delete snippets.logo

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

    snippets.sleeveTop = new Snippet('notch', points.top)

    if (paperless) {
      macro('ld', {
        from: points.tsWristLeft,
        to: points.tsWristRight,
        d: -15,
      })
      macro('vd', {
        from: points.tsWristLeft,
        to: points.tsElbowLeft,
        x: points.tsLeftEdge.x - sa - 15,
      })
      macro('vd', {
        from: points.tsWristLeft,
        to: points.tsLeftEdge,
        x: points.tsLeftEdge.x - sa - 30,
      })
      macro('ld', {
        from: points.cuffBottomLeft,
        to: points.tsWristLeft,
        d: 15 + sa,
      })
      macro('vd', {
        from: points.cuffBottomRight,
        to: points.usWristRight,
        x: points.usWristRight.x + 15 + sa,
      })
      macro('vd', {
        from: points.usWristRight,
        to: points.elbowRight,
        x: points.elbowRight.x + 15 + sa,
      })
      macro('vd', {
        from: points.usWristRight,
        to: points.tsRightEdge,
        x: points.elbowRight.x + 30 + sa,
      })
      macro('vd', {
        from: points.usWristRight,
        to: points.backPitchPoint,
        x: points.elbowRight.x + 45 + sa,
      })
      macro('vd', {
        from: points.usWristRight,
        to: points.top,
        x: points.elbowRight.x + 60 + sa,
      })
      macro('ld', {
        from: points.tsElbowLeft,
        to: points.elbowRight,
      })
      macro('ld', {
        from: points.tsLeftEdge,
        to: points.tsRightEdge,
      })
      macro('hd', {
        from: points.tsLeftEdge,
        to: points.top,
        y: points.top.y - sa - 15,
      })
      macro('hd', {
        from: points.tsLeftEdge,
        to: points.backPitchPoint,
        y: points.top.y - sa - 30,
      })
      macro('hd', {
        from: points.tsLeftEdge,
        to: points.tsRightEdge,
        y: points.top.y - sa - 45,
      })
    }
  }

  return part
}

export const topSleeve = {
  name: 'carlton.topSleeve',
  from: bentTopSleeve,
  after: bentFront,
  hide: {
    after: true,
    from: true,
    inherited: true,
  },
  measurements: ['shoulderToWrist'],
  options: {
    cuffLength: { pct: 15, min: 10, max: 20, menu: 'style' },
    // The remainder of options are for Bent sleeves.
    brianFitSleeve: true,
    brianFitCollar: true,
    collarFactor: 4.8,
    chestShapingMax: 5,
    lengthBonus: 0,
    collarEase: 0.145,
    acrossBackFactor: { pct: 97, min: 93, max: 100, menu: 'fit' },
    armholeDepthFactor: { pct: 65, min: 50, max: 70, menu: 'fit' },
    bicepsEase: { pct: 20, min: 0, max: 50, menu: 'fit' },
    cuffEase: { pct: 60, min: 30, max: 100, menu: 'fit' },
    shoulderEase: { pct: 0, min: -2, max: 6, menu: 'fit' },
    sleeveBend: { deg: 10, min: 0, max: 20, menu: 'fit' },
    sleeveLengthBonus: { pct: 7, min: 0, max: 20, menu: 'fit' },
    s3Collar: { pct: 0, min: -100, max: 100, menu: 'style' },
    s3Armhole: { pct: 0, min: -100, max: 100, menu: 'style' },
    draftForHighBust: { bool: false, menu: 'fit' },
    backNeckCutout: { pct: 5, min: 2, max: 8, menu: 'advanced' },
    frontArmholeDeeper: { pct: 0.5, min: 0, max: 1.5, menu: 'advanced' },
    shoulderSlopeReduction: { pct: 12, min: 0, max: 80, menu: 'advanced' },
    sleevecapHeight: { pct: 45, min: 40, max: 60, menu: 'advanced' },
    sleevecapEase: { pct: 1, min: 0, max: 10, menu: 'advanced' },
  },
  plugins: [pluginCutlist],
  draft: draftCarltonTopSleeve,
}
