import { sidePanel } from './sidepanel.mjs'

export const strap = {
  name: 'hortensia.strap',
  after: sidePanel,
  options: {
    strapLength: { pct: 160, min: 75, max: 250, menu: 'style' },
    handleWidth: { pct: 8.6, min: 4, max: 25, menu: 'style' },
  },
  draft: ({ store, options, Point, Path, points, paths, expand, units, sa, macro, part }) => {
    const w = store.get('width') * options.handleWidth
    const h = store.get('depth') * options.strapLength

    let reducedSa = false
    if (sa > w * 0.8) {
      sa = w * 0.8
      reducedSa = true
      store.flag.warn({ msg: `hortensia:strapSaReduced` })
    }

    if (expand) store.flag.preset('expandIsOn')
    else {
      // Expand is on, do not draw the part but flag this to the user
      const extraSa = sa ? 2 * sa : 0
      store.flag.note({
        msg: reducedSa ? `hortensia:cutStrapReducedSa` : `hortensia:cutStrap`,
        notes: [
          sa ? 'flag:saIncluded' : 'flag:saExcluded',
          'flag:partHiddenByExpand',
          reducedSa ? `hortensia:strapSaReduced.d` : '',
        ],
        replace: {
          width: units(w + extraSa),
          length: units(h + extraSa),
        },
        suggest: {
          text: 'flag:show',
          icon: 'expand',
          update: {
            settings: ['expand', 1],
          },
        },
      })
      // Also hint about expand
      store.flag.preset('expandIsOff')

      return part.hide()
    }

    points.topLeft = new Point(-w, 0)
    points.topMiddle = new Point(0, 0)
    points.topRight = new Point(w, 0)
    points.bottomLeft = new Point(-w, h)
    points.bottomMiddle = new Point(0, h)
    points.bottomRight = new Point(w, h)

    paths.seam = new Path()
      .move(points.topLeft)
      .line(points.bottomLeft)
      .line(points.bottomRight)
      .line(points.topRight)
      .line(points.topLeft)
      .close()
      .attr('class', 'fabric')

    paths.fold = new Path()
      .move(points.topMiddle)
      .line(points.bottomMiddle)
      .attr('data-text', 'FoldLine')
      .attr('data-text-class', 'center text-xs')
      .attr('class', 'lining dashed')

    store.cutlist.addCut({ cut: 2, from: 'fabric' })

    points.title = points.topMiddle.shiftFractionTowards(points.bottomMiddle, 0.25)
    macro('title', {
      at: points.title,
      nr: 5,
      title: 'strap',
      rotation: 90,
      scale: 0.25,
      align: 'center',
    })

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
