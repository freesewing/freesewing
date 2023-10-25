import { sleevecap } from './sleevecap.mjs'

export const sleeve = {
  from: sleevecap,
  name: 'brian.sleeve',
  options: {
    sleeveLengthBonus: { pct: 0, min: -40, max: 10, menu: 'style' },
  },
  measurements: ['shoulderToWrist', 'wrist'],
  draft: ({
    store,
    sa,
    measurements,
    options,
    Point,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    macro,
    part,
  }) => {
    // Remove things inherited
    delete paths.waist
    for (const key in snippets) delete snippets[key]

    // Determine the sleeve length
    store.set('sleeveLength', measurements.shoulderToWrist * (1 + options.sleeveLengthBonus))
    points.sleeveTip = paths.sleevecap.edge('top')
    points.sleeveTop = new Point(0, points.sleeveTip.y) // Always in center

    // Wrist
    points.centerWrist = points.sleeveTop.shift(-90, store.get('sleeveLength'))
    points.wristRight = points.centerWrist.shift(
      0,
      (measurements.wrist * (1 + options.cuffEase)) / 2
    )
    points.wristLeft = points.wristRight.rotate(180, points.centerWrist)

    // Paths
    paths.sleevecap.hide()
    paths.seam = new Path()
      .move(points.bicepsLeft)
      .move(points.wristLeft)
      .move(points.wristRight)
      .line(points.bicepsRight)
      .join(paths.sleevecap)
      .close()
      .attr('class', 'fabric')

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

    /*
     * Annotations
     */

    // Anchor point for sampling
    points.gridAnchor = new Point(0, 0)

    // Grainline
    macro('grainline', {
      from: points.centerWrist,
      to: points.centerBiceps,
    })

    // Cut list
    store.cutlist.addCut({ cut: 2, from: 'fabric' })

    // Logo
    points.logo = points.centerBiceps.shiftFractionTowards(points.centerWrist, 0.3)
    snippets.logo = new Snippet('logo', points.logo)

    // Title
    macro('title', { at: points.centerBiceps, nr: 3, title: 'sleeve' })

    // Scalebox
    points.scaleboxAnchor = points.scalebox = points.centerBiceps.shiftFractionTowards(
      points.centerWrist,
      0.5
    )
    macro('scalebox', { at: points.scalebox })

    // Notches
    points.frontNotch = paths.sleevecap.shiftAlong(store.get('frontArmholeToArmholePitch'))
    points.backNotch = paths.sleevecap.reverse().shiftAlong(store.get('backArmholeToArmholePitch'))
    snippets.frontNotch = new Snippet('notch', points.frontNotch)
    snippets.backNotch = new Snippet('bnotch', points.backNotch)

    // Dimensions
    macro('vd', {
      id: 'hCuffToArmhole',
      from: points.wristLeft,
      to: points.bicepsLeft,
      x: points.bicepsLeft.x - sa - 15,
    })
    macro('vd', {
      id: 'hFull',
      from: points.wristLeft,
      to: points.sleeveTip,
      x: points.bicepsLeft.x - sa - 30,
    })
    macro('hd', {
      id: 'wFull',
      from: points.bicepsLeft,
      to: points.bicepsRight,
      y: points.sleeveTip.y - sa - 30,
    })
    macro('hd', {
      id: 'wCuff',
      from: points.wristLeft,
      to: points.wristRight,
      y: points.wristLeft.y + sa + 30,
    })
    macro('pd', {
      id: 'lSleevevap',
      path: paths.sleevecap.reverse(),
      d: -1 * sa - 15,
    })

    return part
  },
}
