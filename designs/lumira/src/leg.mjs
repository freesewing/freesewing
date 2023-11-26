import { pctBasedOn } from '@freesewing/core'
import { shape } from './shape.mjs'

export const leg = {
  name: 'lumira.leg',
  from: shape,
  draft: ({
    measurements,
    store,
    sa,
    Point,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    complete,
    options,
    macro,
    utils,
    part,
  }) => {
    // paths.center = new Path().move(points.centerWaist).line(points.centerAnkle)

    if (options.frontBulge || options.cyclingChamois) {
      snippets.front = new Snippet('notch', paths.front.shiftFractionAlong(0.5))
    }

    paths.front = new Path()
      .move(points.frontWaistband)
      .join(paths.front)
      ._curve(points.frontKneeCp2, points.frontKnee)
      .curve_(points.frontKneeCp1, points.frontAnkle)
      .hide()
    paths.back = new Path()
      .move(points.backWaistband)
      .join(paths.back)
      .join(paths.backCircle)
      .join(paths.backGusset)
      ._curve(points.backKneeCp2, points.backKnee)
      .curve_(points.backKneeCp1, points.backAnkle)
      .hide()

    paths.seam = new Path()
      .move(points.backWaistband)
      .join(paths.back)
      .join(paths.ankle)
      .join(paths.front.reverse())
      .join(paths.waist)
      .close()

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }

    snippets.circle1 = new Snippet('notch', paths.backCircle.shiftFractionAlong(0.25))
    snippets.circle2 = new Snippet('notch', paths.backCircle.shiftFractionAlong(0.5))
    snippets.circle3 = new Snippet('notch', paths.backCircle.shiftFractionAlong(0.75))
    snippets.circle4 = new Snippet('notch', points.backCircleGusset)
    snippets.circle5 = new Snippet('notch', points.frontGusset)

    console.log({ w: measurements.waist / 2, len: points.backWaist.dist(points.frontWaist) })

    return part
  },
}
