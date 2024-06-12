import { sidePanel } from './sidepanel.mjs'

export const zipperPanel = {
  name: 'hortensia.zipperPanel',
  after: sidePanel,
  draft: ({ store, Point, Path, points, paths, sa, macro, expand, units, part }) => {
    const z = store.get('zipperWidth')
    const w = (store.get('zipperPanelWidth') - z) / 2
    const h = store.get('depth')

    if (expand) store.flag.preset('expandIsOn')
    else {
      // Expand is off, do not draw the part but flag this to the user
      store.flag.note({
        msg: `hortensia:cutZipperPanel`,
        replace: {
          width: units(w),
          length: units(h),
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

    store.cutlist.addCut([
      { cut: 2, from: 'fabric' },
      { cut: 2, from: 'lining' },
    ])

    paths.text = new Path()
      .move(points.topLeft)
      .line(points.bottomLeft)
      .attr('data-text', 'ZipperPanel')
      .attr('data-text-class', 'center text-xs')

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
