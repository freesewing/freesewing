import { dimensions } from './shared.mjs'
import { front } from './front.mjs'

export const back = {
  from: front,
  name: 'aaron.back',
  options: {
    backNeckCutout: 0.05,
    backlineBend: { pct: 50, min: 25, max: 100, menu: 'style' },
    knitBindingWidth: { pct: 600, min: 300, max: 800, menu: 'style' },
  },
  draft: ({
    store,
    sa,
    Point,
    points,
    Path,
    paths,
    options,
    complete,
    expand,
    macro,
    utils,
    units,
    measurements,
    part,
  }) => {
    // Lower back neck a bit
    points.cbNeck.y = measurements.neck / 10

    points.strapLeftCp2 = utils.beamsIntersect(
      points.strapLeft,
      points.strapCenter.rotate(90, points.strapLeft),
      points.cbNeck,
      points.cbNeck.shift(0, 10)
    )

    points.armholeCp2 = points.armhole.shiftFractionTowards(
      points.armholeCorner,
      options.backlineBend
    )
    points.strapRightCp1 = points.strapRight.shiftFractionTowards(
      points.armholeCorner,
      options.backlineBend
    )

    points.anchor = points.cbNeck.clone()

    // Seamline
    paths.seam = new Path()
      .move(points.cbNeck)
      .line(points.cbHem)
      .line(points.hem)
      .curve_(points.hipsCp2, points.armhole)
      .curve(points.armholeCp2, points.strapRightCp1, points.strapRight)
      .line(points.strapLeft)
      .line(points.strapLeft)
      .curve(points.strapLeftCp2, points.cbNeck, points.cbNeck)
      .close()
      .attr('class', 'fabric')

    /*
     * Annotations
     */

    // Set anchor point for grid
    points.gridAnchor = points.cfHem

    // cutonfold
    macro('cutonfold', {
      from: points.cfNeck,
      to: points.cfHem,
      grainline: true,
    })

    // title
    macro('title', { at: points.title, nr: 2, title: 'back' })
    points.scaleboxAnchor = points.scalebox = points.title.shift(90, 100)

    // scalebox
    macro('scalebox', { at: points.scalebox })

    // Store length of binding in the store
    store.set('bindingWidth', (sa || 10) * options.knitBindingWidth)
    store.set(
      'armBindingLength',
      (new Path()
        .move(points.armhole)
        .curve(points.armholeCp2, points.strapRightCp1, points.strapRight)
        .length() +
        store.get('frontArmholeLength')) *
        0.95 +
        2 * sa
    )
    store.set(
      'neckBindingLength',
      (new Path()
        .move(points.strapLeft)
        .curve(points.strapLeftCp2, points.cbNeck, points.cbNeck)
        .length() +
        store.get('frontNeckOpeningLength')) *
        2 *
        0.95 +
        2 * sa
    )

    // Warn user is SA > 10 because it makes the binding width rather large
    if (sa > 10 && store.get('bindingWidth') > 61) {
      store.flag.tip({
        title: `aaron:largeSaAdaptKnitBindingWidth.t`,
        desc: `aaron:largeSaAdaptKnitBindingWidth.d`,
        replace: {
          sa: units(sa),
          width: units(store.get('bindingWidth')),
        },
        suggest: {
          text: 'flag:apply',
          icon: 'options',
          update: {
            settings: [['options', 'knitBindingWidth'], (60 / store.get('bindingWidth')) * 6],
          },
        },
      })
    }

    // Instructions for cutting the binding only of expand is falsy
    if (complete && !expand) {
      points.bindingAnchor = new Point(points.armhole.x / 4, points.armhole.y)
        .attr('data-text', 'aaron:cutTwoStripsToFinishTheArmholes')
        .attr('data-text', ':\n')
        .attr(
          'data-text',
          `2x: ${units(store.get('bindingWidth'))} x ${units(store.get('armBindingLength'))}`
        )
        .attr('data-text', '\n \n')
        .attr('data-text', 'aaron:cutOneStripToFinishTheNeckOpening')
        .attr('data-text', ':\n')
        .attr(
          'data-text',
          `${units(store.get('bindingWidth'))} x ${units(store.get('neckBindingLength'))}`
        )
    }

    // dimensions
    dimensions(macro, points, sa)
    macro('vd', {
      from: points.cbHem,
      to: points.cbNeck,
      x: points.cbHem.x - sa - 15,
    })

    return part
  },
}
