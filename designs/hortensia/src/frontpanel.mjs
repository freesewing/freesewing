import { sidePanel } from './sidepanel.mjs'

export const frontPanel = {
  name: 'hortensia.frontPanel',
  after: sidePanel,
  options: {
    minHandleSpaceWidth: 80,
    maxHandleSpaceWidth: 250,
    pctHandleSpace: 50,
    pctHandleVert: 42,
    handleWidth: { pct: 8.6, min: 4, max: 25, menu: 'style' },
  },
  draft: ({
    store,
    options,
    complete,
    Point,
    Path,
    points,
    paths,
    Snippet,
    snippets,
    sa,
    expand,
    units,
    macro,
    part,
  }) => {
    const w = store.get('frontPanelLength')
    const h = store.get('depth')

    if (expand) {
      store.flag.preset('expandIsOn')
    } else {
      // Expand is off, do not draw the part but flag this to the user
      const extraSa = sa ? 2 * sa : 0
      store.flag.note({
        msg: `hortensia:cutFrontPanel`,
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

    paths.bottom = new Path().move(points.topLeft).line(points.bottomLeft)
    paths.top = new Path().move(points.bottomRight).line(points.topRight)

    paths.seam = paths.bottom
      .line(points.bottomRight)
      .join(paths.top)
      .line(points.topLeft)
      .close()
      .attr('class', 'fabric')

    // Show the top/bottom note only on complete patterns
    if (complete) {
      paths.bottom.addText('bottom', 'center text-xs fill-note')
      paths.top.addText('top', 'center text-xs fill-note')
    }

    const handleWidth = options.width * options.handleWidth
    let handleSpace = (h - handleWidth * 2) * (options.pctHandleSpace / 100)
    if (handleSpace > options.maxHandleSpaceWidth) {
      handleSpace = options.maxHandleSpaceWidth
    } else if (handleSpace < options.minHandleSpaceWidth) {
      handleSpace = options.minHandleSpaceWidth
      if (handleSpace < h - handleWidth * 2) {
        handleSpace = h - handleWidth * 2
      }
    }
    let handleVertPos = w * (options.pctHandleVert / 100)
    if (handleVertPos + handleWidth * 2 > w) {
      handleVertPos = w - handleWidth * 2
    }

    points.attachPoint1TL = new Point(handleVertPos, 0 + h / 2 - handleSpace / 2)
    points.attachPoint2TL = new Point(handleVertPos, h - h / 2 + handleSpace / 2 - handleWidth)
    points.attachPoint2TLtemp = new Point(handleVertPos, h - h / 2 + handleSpace / 2)
    points.attachPoint1BR = new Point(
      handleVertPos + handleWidth * 2,
      0 + h / 2 - handleSpace / 2 + handleWidth
    )
    points.attachPoint2BR = new Point(handleVertPos + handleWidth * 2, h - h / 2 + handleSpace / 2)

    macro('crossbox', {
      topLeft: points.attachPoint1TL,
      bottomRight: points.attachPoint1BR,
      text: 'strapAttachment',
      id: 'att1',
    })

    macro('crossbox', {
      topLeft: points.attachPoint2TL,
      bottomRight: points.attachPoint2BR,
      text: 'strapAttachment',
      id: 'att2',
    })

    store.cutlist.setCut([
      { cut: 2, from: 'fabric' },
      { cut: 2, from: 'lining' },
    ])

    points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    snippets.logo = new Snippet('logo', points.logo)
    points.title = points.logo.shift(-90, h / 4).attr('data-text-class', 'center')

    points.gridAnchor = points.logo.clone()

    macro('title', {
      at: points.title,
      nr: 2,
      title: 'frontPanel',
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
    macro('hd', {
      from: points.topLeft,
      to: points.attachPoint1TL,
      y: points.attachPoint1TL.y,
      id: 'attachPoint1',
    })
    macro('hd', {
      from: points.topLeft,
      to: points.attachPoint2TLtemp,
      y: points.attachPoint2TLtemp.y,
      id: 'attachPoint2',
    })
    macro('vd', {
      from: points.bottomRight,
      to: points.topRight,
      x: points.topRight.x + sa + 15,
      id: 'height',
    })
    macro('vd', {
      from: points.topLeft,
      to: points.attachPoint1TL,
      x: points.attachPoint1TL.x,
      id: 'attachPoint1',
    })
    macro('vd', {
      from: points.attachPoint2TLtemp,
      to: points.bottomLeft,
      x: points.attachPoint2TLtemp.x,
      id: 'attachPoint2',
    })

    return part
  },
}
