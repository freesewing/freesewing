import { pluginBundle } from '@freesewing/plugin-bundle'
import { version } from '../data.mjs'

// crossBox macro
const crossBox = {
  name: 'crossbox',
  version,
  macros: {
    crossBox: function (so) {
      let id = this.getId()
      let shiftFraction = 0.1
      this.points[id + '_boxTopLeft'] = so.from.copy()
      this.points[id + '_boxBottomRight'] = so.to.copy()
      this.points[id + '_boxTopRight'] = new this.Point(so.to.x, so.from.y)
      this.points[id + '_boxBottomLeft'] = new this.Point(so.from.x, so.to.y)

      this.points[id + '_topCrossTL'] = this.points[id + '_boxTopLeft'].shiftFractionTowards(
        this.points[id + '_boxBottomRight'],
        shiftFraction
      )
      this.points[id + '_topCrossTR'] = this.points[id + '_boxTopRight'].shiftFractionTowards(
        this.points[id + '_boxBottomLeft'],
        shiftFraction
      )
      this.points[id + '_topCrossBL'] = this.points[id + '_boxBottomLeft'].shiftFractionTowards(
        this.points[id + '_boxTopRight'],
        shiftFraction
      )
      this.points[id + '_topCrossBR'] = this.points[id + '_boxBottomRight'].shiftFractionTowards(
        this.points[id + '_boxTopLeft'],
        shiftFraction
      )

      this.paths[id + 'crossBox'] = new this.Path()
        .move(this.points[id + '_boxTopLeft'])
        .line(this.points[id + '_boxTopRight'])
        .line(this.points[id + '_boxBottomRight'])
        .line(this.points[id + '_boxBottomLeft'])
        .line(this.points[id + '_boxTopLeft'])
        .close()
        .attr('class', 'lining dotted stroke-sm')
      this.paths[id + '_topCross'] = new this.Path()
        .move(this.points[id + '_topCrossTL'])
        .line(this.points[id + '_topCrossBR'])
        .line(this.points[id + '_topCrossTR'])
        .line(this.points[id + '_topCrossBL'])
        .line(this.points[id + '_topCrossTL'])
        .line(this.points[id + '_topCrossTR'])
        .move(this.points[id + '_topCrossBR'])
        .line(this.points[id + '_topCrossBL'])
        .attr('class', 'lining dotted stroke-sm')
      if (typeof so.text === 'string') {
        this.points.textAnchor = this.points[id + '_boxTopLeft']
          .shiftFractionTowards(this.points[id + '_boxBottomRight'], 0.5)
          .attr('data-text', so.text)
          .attr('data-text-class', 'center')
      }
    },
  },
}

export const front = {
  name: 'albert.front',
  measurements: ['chest', 'hpsToWaistBack', 'waist', 'waistToKnee', 'hips'],
  options: {
    backOpening: { pct: 10, min: 0, max: 25, menu: 'fit' },
    bibWidth: { pct: 100, min: 50, max: 125, menu: 'style' },
    bibLength: { pct: 75, min: 0, max: 90, menu: 'style' },
    lengthBonus: { pct: 0, min: -20, max: 25, menu: 'style' },
  },
  plugins: [pluginBundle, crossBox],
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
    let hemWidth = 3 * sa
    let pocketSize = apronLength / 4

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

    paths.right = paths.rightHem.offset(sa)

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

      macro('crossBox', {
        from: points.topRightHem,
        to: points.crossBoxTo1,
      })
      macro('crossBox', {
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
