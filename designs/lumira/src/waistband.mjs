import { pctBasedOn } from '@freesewing/core'
import { shape } from './shape.mjs'

export const waistband = {
  name: 'lumira.waistband',
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
    if (false == options.waistband) {
      return part.hide()
    }

    paths.seam = new Path()
      .move(points.frontWaist)
      .line(points.centerWaist)
      .line(points.backWaist)
      .join(paths.backTop)
      .line(points.centerWaistband)
      .line(points.frontWaistband)
      .join(paths.frontTop.reverse())
      .close()

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }

    return part
  },
}
