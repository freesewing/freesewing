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
    paths.center = new Path().move(points.centerWaist).line(points.centerAnkle)

    paths.front = new Path()
      .move(points.frontWaist)
      .join(paths.front)
      .line(points.frontKnee)
      .line(points.frontAnkle)
      .hide()
    paths.back = new Path()
      .move(points.backWaist)
      .join(paths.backTop)
      .join(paths.backCircle)
      .join(paths.backGusset)
      .line(points.backKnee)
      .line(points.backAnkle)
      .hide()

    // if (options.frontBulge) {
    //   const gussetWidth = store.get('gussetWidth')
    //   paths.front = paths.front.offset(gussetWidth)
    //   points.
    // }

    paths.seam = new Path()
      .move(points.backWaist)
      .join(paths.back)
      .join(paths.ankle)
      .join(paths.front.reverse())
      .join(paths.waist)
      .close()

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }

    console.log({ w: measurements.waist / 2, len: points.backWaist.dist(points.frontWaist) })

    return part
  },
}
