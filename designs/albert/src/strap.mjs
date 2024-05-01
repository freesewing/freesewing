import { front } from './front.mjs'

export const strap = {
  name: 'albert.strap',
  after: front,
  options: {
    chestDepth: { pct: 22, min: 15, max: 90, menu: 'fit' },
    strapWidth: { pct: 60, min: 20, max: 100, menu: 'style' },
  },
  draft: ({
    options,
    measurements,
    Point,
    Path,
    points,
    paths,
    Snippet,
    snippets,
    sa,
    macro,
    store,
    complete,
    units,
    expand,
    part,
  }) => {
    const bibWidth = store.get('bibWidth')
    const apronWidth = store.get('apronWidth')
    const backOpening = apronWidth - Math.max(measurements.hips, measurements.waist)

    const hSpan = backOpening / 2 + bibWidth / 2
    const vSpan =
      measurements.hpsToWaistBack +
      measurements.hpsToWaistBack -
      measurements.hpsToWaistBack * options.bibLength

    const strapWidth = store.get('strapWidth')
    const strapLength =
      Math.sqrt(hSpan * hSpan + vSpan * vSpan) + measurements.chest * options.chestDepth

    if (!expand) {
      // Expand is on, do not draw the part but flag this to the user
      const extraSa = sa ? 2 * sa : 0
      store.flag.note({
        msg: `albert:cutStrap`,
        notes: [sa ? 'flag:saIncluded' : 'flag:saExcluded', 'flag:partHiddenByExpand'],
        replace: {
          width: units(strapWidth * 2 + extraSa),
          length: units(strapLength + strapWidth * 2 + extraSa),
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
      store.flag.preset('expand')

      return part.hide()
    }

    points.topLeft = new Point(0, 0)
    points.topLeftHem = points.topLeft.shift(270, strapWidth)
    points.topMiddle = new Point(strapWidth, 0)
    points.topMiddleHem = new Point(strapWidth, strapWidth)
    points.topRight = new Point(strapWidth * 2, 0)
    points.bottomLeftHem = new Point(0, strapLength + strapWidth)
    points.bottomLeft = new Point(0, strapLength + strapWidth * 2)
    points.bottomMiddleHem = new Point(strapWidth, strapLength + strapWidth)
    points.bottomMiddle = new Point(strapWidth, strapLength + strapWidth * 2)
    points.bottomRight = new Point(strapWidth * 2, strapLength + strapWidth * 2)

    paths.seam = new Path()
      .move(points.topLeft)
      .line(points.bottomLeft)
      .line(points.bottomRight)
      .line(points.topRight)
      .line(points.topLeft)
      .close()
      .attr('class', 'fabric')

    if (complete) {
      paths.fold = new Path()
        .move(points.topMiddle)
        .line(points.bottomMiddle)
        .addClass('note help')
        .addText('albert:foldHere', 'fill-note center')
      macro('banner', {
        id: 'foldHere',
        path: paths.fold,
        text: 'albert:foldHere',
      })
    }

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

    /*
     * Annotations
     */

    // Cut list
    store.cutlist.addCut({ cut: 2, from: 'fabric' })

    // Logo
    points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    snippets.logo = new Snippet('logo', points.logo)

    // Title
    points.title = points.logo.shift(-90, 70)
    macro('title', {
      nr: 2,
      at: points.title,
      title: 'strap',
      align: 'center',
    })

    // Crossbox
    macro('crossbox', {
      topLeft: points.topLeft,
      bottomRight: points.topMiddleHem,
      id: 'crossbox1',
    })
    macro('crossbox', {
      topLeft: points.bottomLeftHem,
      bottomRight: points.bottomMiddle,
      id: 'crossbox2',
    })

    // Dimensions
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + sa + 15,
      id: 'wBottom',
    })
    macro('vd', {
      from: points.bottomLeft,
      to: points.topLeft,
      x: points.topLeft.x - sa - 30,
      id: 'hLeft',
    })
    macro('vd', {
      from: points.topMiddleHem,
      to: points.topMiddle,
      x: points.topLeft.x - sa - 15,
      id: 'crossboxTop',
    })
    macro('vd', {
      from: points.bottomMiddleHem,
      to: points.topMiddleHem,
      x: points.topLeft.x - sa - 15,
      id: 'betweenCrossboxes',
    })
    macro('vd', {
      from: points.bottomMiddle,
      to: points.bottomMiddleHem,
      x: points.topLeft.x - sa - 15,
      id: 'crossboxBottom',
    })

    return part
  },
}
