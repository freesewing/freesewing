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
    part,
  }) => {
    let bibWidth = store.get('bibWidth')
    let apronWidth = store.get('apronWidth')
    let backOpening = apronWidth - Math.max(measurements.hips, measurements.waist)
    let hemWidth = store.get('hemWidth')

    let hSpan = backOpening / 2 + bibWidth / 2
    let vSpan =
      measurements.hpsToWaistBack +
      measurements.hpsToWaistBack -
      measurements.hpsToWaistBack * options.bibLength

    let strapWidth = store.get('strapWidth')
    let strapLength =
      Math.sqrt(hSpan * hSpan + vSpan * vSpan) + measurements.chest * options.chestDepth

    points.topLeft = new Point(0, 0)
    points.topLeftHem = points.topLeft.shift(270, hemWidth)
    points.topMiddle = new Point(strapWidth, 0)
    points.topMiddleHem = new Point(strapWidth, hemWidth)
    points.topRight = new Point(strapWidth * 2, 0)
    points.bottomLeftHem = new Point(0, strapLength + hemWidth)
    points.bottomLeft = new Point(0, strapLength + hemWidth * 2)
    points.bottomMiddleHem = new Point(strapWidth, strapLength + hemWidth)
    points.bottomMiddle = new Point(strapWidth, strapLength + hemWidth * 2)
    points.bottomRight = new Point(strapWidth * 2, strapLength + hemWidth * 2)

    paths.seam = new Path()
      .move(points.topLeft)
      .line(points.bottomLeft)
      .line(points.bottomRight)
      .line(points.topRight)
      .line(points.topLeft)
      .close()
      .attr('class', 'fabric')

    paths.topHem = new Path()
      .move(points.topLeftHem)
      .line(points.topMiddleHem)
      .attr('class', 'various dashed')
      .attr('data-text', 'attach')
      .attr('data-text-class', 'text-xs center')
    paths.bottomHem = new Path()
      .move(points.bottomLeftHem)
      .line(points.bottomMiddleHem)
      .attr('class', 'various dashed')
      .attr('data-text', 'attach')
      .attr('data-text-class', 'text-xs center')

    paths.fold = new Path()
      .move(points.topMiddle)
      .line(points.bottomMiddle)
      .attr('class', 'various dashed')
      .attr('data-text', 'fold')
      .attr('data-text-class', 'text-xs center')

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

    /*
     * Annotations
     */

    // Cut list
    store.cutlist.addCut({ cut: 1, from: 'fabric' })

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
