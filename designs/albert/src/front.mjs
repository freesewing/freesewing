import { pluginBundle } from '@freesewing/plugin-bundle'

export const front = {
  name: 'albert.front',
  measurements: ['chest', 'hpsToWaistBack', 'waist', 'waistToKnee', 'hips'],
  options: {
    backOpening: { pct: 10, min: 0, max: 25, menu: 'fit' },
    bibWidth: { pct: 100, min: 50, max: 125, menu: 'style' },
    bibLength: { pct: 75, min: 0, max: 90, menu: 'style' },
    lengthBonus: { pct: 0, min: -20, max: 25, menu: 'style' },
  },
  plugins: pluginBundle,
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
    let chestWidth = measurements.chest / 4
    let bibWidth = chestWidth * options.bibWidth
    let bibLength = measurements.hpsToWaistBack * options.bibLength
    let apronLength =
      measurements.hpsToWaistBack * options.bibLength +
      measurements.waistToKnee * (1 + options.lengthBonus)
    /*
    let apronWidth =
      Math.max(measurements.hips, measurements.waist) *
      (1 - options.backOpening)
    */
    let apronWidth = measurements.waist * (1 - options.backOpening)
    let strapWidth = (measurements.hpsToWaistBack * options.strapWidth) / 8
    let hemWidth = strapWidth
    let sideHemWidth = Math.max(sa, hemWidth / 4)
    let pocketSize = apronLength / 4

    store.set('bibWidth', bibWidth)
    store.set('apronLength', apronLength)
    store.set('apronWidth', apronWidth)
    store.set('strapWidth', strapWidth)
    store.set('hemWidth', hemWidth)
    store.set('pocketSize', pocketSize)

    points.topLeft = new Point(0, 0)
    points.topLeftHem = points.topLeft.shift(270, hemWidth)
    points.bottomLeftHem = points.topLeftHem.shift(270, apronLength)
    points.waistLeft = points.topLeftHem.shift(270, bibLength)
    points.bottomLeft = points.bottomLeftHem.shift(270, hemWidth)
    points.topRight = points.topLeft.shift(0, bibWidth / 2)
    points.topRightHem = points.topLeftHem.shift(0, bibWidth / 2)
    points.bottomRightHem = points.bottomLeftHem.shift(0, apronWidth / 2)
    points.bottomRight = points.bottomLeft.shift(0, apronWidth / 2)
    points.topRightBack = points.bottomRightHem.shift(90, apronLength - bibLength)
    points.topRightBackCPfront = points.topRightBack.shift(180, (apronWidth - bibWidth) / 2 / 1.5)
    points.topRightCPdown = points.topRightHem.shift(
      270,
      (measurements.hpsToWaistBack * options.bibLength) / 4
    )

    points.topCOF = points.topLeft.shift(270, apronLength / 5)
    points.bottomCOF = points.bottomLeft.shift(90, apronLength / 5)

    points.pocketLeftTop = points.waistLeft.shift(270, hemWidth)
    points.pocketRightTop = points.pocketLeftTop.shift(0, pocketSize)
    points.pocketLeftBottom = points.pocketLeftTop.shift(270, pocketSize)
    points.pocketRightBottom = points.pocketLeftBottom.shift(0, pocketSize)

    points.crossBoxTo1 = new Point(
      points.topRightHem.x - strapWidth,
      points.topRightHem.y + hemWidth
    )
    points.crossBoxTo2 = new Point(
      points.topRightBack.x - strapWidth,
      points.topRightBack.y + hemWidth
    )

    paths.rightHem = new Path()
      .move(points.bottomRight)
      .line(points.topRightBack)
      .curve(points.topRightBackCPfront, points.topRightCPdown, points.topRightHem)
      .line(points.topRight)
      .attr('class', 'various dashed')
      .attr('data-text', 'narrow hem')
      .attr('data-text-class', 'text-xs center')

    paths.pocket = new Path()
      .move(points.pocketLeftBottom)
      .line(points.pocketLeftTop)
      .line(points.pocketRightTop)
      .line(points.pocketRightBottom)
      .line(points.pocketLeftBottom)
      .attr('class', 'lining dotted stroke-sm')
      .attr('data-text', 'pocket')
      .attr('data-text-class', 'text-xs center')

    paths.right = paths.rightHem.offset(sideHemWidth)

    paths.seam = new Path()
      .move(points.bottomLeft)
      .join(paths.right)
      .line(points.topLeft)
      .close()
      .attr('class', 'fabric')

    paths.complete = paths.seam.clone().line(points.bottomLeft).close()

    paths.topHem = new Path()
      .move(points.topLeftHem)
      .line(points.topRightHem.shift(0, sa))
      .attr('class', 'various dashed')
      .attr('data-text', 'hem')
      .attr('data-text-class', 'text-xs center')
    paths.bottomHem = new Path()
      .move(points.bottomLeftHem)
      .line(points.bottomRightHem.shift(0, sa))
      .attr('class', 'various dashed')
      .attr('data-text', 'hem')
      .attr('data-text-class', 'text-xs center')

    // Complete?
    if (complete) {
      points.logo = points.topRightBack.shiftFractionTowards(points.pocketRightBottom, 0.5)
      snippets.logo = new Snippet('logo', points.logo)
      points.title = points.logo.shift(-90, 100)
      macro('title', {
        nr: 1,
        at: points.title,
        title: 'Front',
      })

      points.scaleboxAnchor = points.pocketLeftBottom.shiftFractionTowards(points.bottomRight, 0.5)
      macro('scalebox', { at: points.scaleboxAnchor })

      macro('crossbox', {
        from: points.topRightHem,
        to: points.crossBoxTo1,
      })
      macro('crossbox', {
        from: points.topRightBack,
        to: points.crossBoxTo2,
        text: 'attachment',
      })

      if (sa) {
        paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
      }

      macro('cutonfold', {
        from: points.topCOF,
        to: points.bottomCOF,
      })
    }

    // Paperless?
    if (paperless) {
      macro('hd', {
        from: points.bottomLeft,
        to: points.bottomRight,
        y: points.bottomLeft.y + sa + 15,
      })
      macro('hd', {
        from: points.topLeft,
        to: points.topRight,
        y: points.topLeft.y - sa - 15,
      })
      macro('vd', {
        from: points.bottomLeft,
        to: points.topLeft,
        x: points.topLeft.x - sa - 15,
      })
      macro('vd', {
        from: points.bottomRight,
        to: points.topRightBack,
        x: points.topRightBack.x + sa + 15,
      })
      macro('vd', {
        from: points.topRightBack,
        to: points.topRight,
        x: points.topRightBack.x + sa + 15,
      })
      macro('vd', {
        from: points.topLeft,
        to: points.topLeftHem,
        x: points.topLeftHem.x + sa + 15,
      })
      macro('vd', {
        from: points.topLeftHem,
        to: points.bottomLeftHem,
        x: points.topLeftHem.x + sa + 15,
      })
      macro('vd', {
        from: points.bottomLeftHem,
        to: points.bottomLeft,
        x: points.bottomLeftHem.x + sa + 15,
      })
    }

    return part
  },
}
