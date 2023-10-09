import { sidePanel } from './sidepanel.mjs'

export const bottomPanel = {
  name: 'hortensia.bottomPanel',
  after: sidePanel,
  draft: ({
    store,
    expand,
    units,
    options,
    Point,
    Path,
    points,
    paths,
    Snippet,
    snippets,
    sa,
    macro,
    part,
  }) => {
    const w = store.get('bottomPanelLength')
    const h = store.get('depth')

    if (expand) {
      store.flag.preset('expandIsOn')
    } else {
      // Expand is off, do not draw the part but flag this to the user
      const extraSa = sa ? 2 * sa : 0
      store.flag.note({
        msg: `hortensia:cutBottomPanel`,
        notes: [sa ? 'flag:saIncluded' : 'flag:saExcluded', 'flag:partHiddenByExpand'],
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
      title: 'bottomPanel',
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
