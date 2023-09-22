import { sidepanel } from './sidepanel.mjs'

export const bottompanel = {
  name: 'hortensia.bottompanel',
  after: sidepanel,
  draft: ({ store, options, Point, Path, points, paths, Snippet, snippets, sa, macro, part }) => {
    const w = store.get('bottomPanelLength')
    const h = store.get('depth')

    points.topLeft = new Point(0, 0)
    points.topRight = new Point(w, 0)
    points.bottomLeft = new Point(0, h)
    points.bottomRight = new Point(w, h)

    paths.seam = new Path()
      .move(points.topLeft)
      .line(points.bottomLeft)
      .line(points.bottomRight)
      .line(points.topRight)
      .line(points.topLeft)
      .close()
      .attr('class', 'fabric')

    store.cutlist.addCut({ cut: 1, from: 'fabric' })
    store.cutlist.addCut({ cut: 1, material: 'lining' })

    points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    snippets.logo = new Snippet('logo', points.logo)
    points.title = points.logo.shift(-90, h / 4).attr('data-text-class', 'center')

    points.gridAnchor = points.logo.clone()

    macro('title', {
      at: points.title,
      nr: 3,
      title: 'BottomPanel',
      align: 'center',
    })

    const scaleBoxMove = 180 * options.size

    if (scaleBoxMove > 50 && w > 100) {
      points.scaleBox = points.logo.shift(90, scaleBoxMove)
      macro('scalebox', {
        at: points.scaleBox,
      })
    }

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }

    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + sa + 15,
      id: 'width',
    })
    macro('vd', {
      from: points.bottomRight,
      to: points.topRight,
      x: points.topRight.x + sa + 15,
      id: 'height',
    })

    return part
  },
}
