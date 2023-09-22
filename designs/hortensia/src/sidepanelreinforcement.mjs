import { sidepanel } from './sidepanel.mjs'
import { bottomsidepanel } from './bottomsidepanel.mjs'

export const sidepanelreinforcement = {
  name: 'hortensia.sidepanelreinforcement',
  after: sidepanel,
  draft: ({ store, Point, Path, points, paths, sa, macro, part }) => {
    const w = store.get('width')
    const h = store.get('sidePanelReinforcementHeight')
    const sizeRatio = store.get('sizeRatio')

    points.topMiddle = new Point(0, 0)
    points.topLeft = points.topMiddle.shift(180, w / 2)
    points.topRight = points.topMiddle.shift(0, w / 2)

    bottomsidepanel(points, points.topMiddle, w, h, sizeRatio)

    paths.seam = new Path()
      .move(points.topMiddle)
      .line(points.topLeft)
      .line(points.bottomLeftU)
      .curve(points.bottomLeftUcp, points.bottomLeftRcp, points.bottomLeftR)
      .line(points.bottomRightL)
      .curve(points.bottomRightLcp, points.bottomRightUcp, points.bottomRightU)
      .line(points.topRight)
      .line(points.topMiddle)
      .close()
      .attr('class', 'fabric')

    store.cutlist.addCut({ cut: 2, from: 'fabric' })

    points.title = points.topLeft
      .shiftFractionTowards(points.bottomRight, 0.5)
      .attr('data-text-class', 'center')
    macro('title', {
      at: points.title,
      nr: 4,
      title: 'sidepanelreinforcement',
      scale: 0.25,
      align: 'center',
    })

    points.gridAnchor = points.title.clone()

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }

    macro('hd', {
      from: points.bottomLeftU,
      to: points.bottomRightU,
      y: points.bottomLeft.y + sa + 15,
      id: 'width',
    })
    macro('vd', {
      from: points.bottomRightL,
      to: points.topRight,
      x: points.topRight.x + sa + 15,
      id: 'height',
    })

    return part
  },
}
