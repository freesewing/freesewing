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
    complete,
    sa,
    paperless,
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
    /*
    console.log('chestWidth ' + chestWidth)
    console.log('backOpening ' + backOpening)
    console.log('hSpan ' + hSpan)
    console.log('vSpan ' + vSpan)
    console.log('strapLength ' + strapLength)
    */
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

    // Complete?
    if (complete) {
      points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
      snippets.logo = new Snippet('logo', points.logo).attr('data-scale', 0.5)
      points.title = points.logo.shift(-90, 50)
      macro('title', {
        nr: 2,
        at: points.title,
        title: 'Strap',
      })
      macro('crossbox', { from: points.topLeft, to: points.topMiddleHem })
      macro('crossbox', { from: points.bottomLeftHem, to: points.bottomMiddle })
      if (sa) {
        paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
      }
    }

    // Paperless?
    if (paperless) {
      macro('hd', {
        from: points.bottomLeft,
        to: points.bottomRight,
        y: points.bottomLeft.y + sa + 15,
      })
      macro('vd', {
        from: points.bottomLeft,
        to: points.topLeft,
        x: points.topLeft.x - sa - 15,
      })
      macro('vd', {
        from: points.topMiddle,
        to: points.topMiddleHem,
        x: points.topMiddleHem.x + sa + 15,
      })
      macro('vd', {
        from: points.topMiddleHem,
        to: points.bottomMiddleHem,
        x: points.topMiddleHem.x + sa + 15,
      })
      macro('vd', {
        from: points.bottomMiddleHem,
        to: points.bottomMiddle,
        x: points.bottomMiddleHem.x + sa + 15,
      })
    }

    return part
  },
}
