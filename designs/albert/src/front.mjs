export const front = {
  name: 'albert.front',
  measurements: ['chest', 'hpsToWaistBack', 'waist', 'waistToKnee', 'hips'],
  options: {
    backOpening: { pct: 10, min: 0, max: 25, menu: 'fit' },
    bibWidth: { pct: 100, min: 50, max: 125, menu: 'style' },
    bibLength: { pct: 75, min: 0, max: 90, menu: 'style' },
    lengthBonus: { pct: 0, min: -20, max: 25, menu: 'style' },
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
    complete,
    macro,
    store,
    part,
  }) => {
    const chestWidth = measurements.chest / 4
    const bibWidth = chestWidth * options.bibWidth
    const bibLength = measurements.hpsToWaistBack * options.bibLength
    const apronLength =
      measurements.hpsToWaistBack * options.bibLength +
      measurements.waistToKnee * (1 + options.lengthBonus)
    const apronWidth = measurements.waist * (1 - options.backOpening)
    const strapWidth = (measurements.hpsToWaistBack * options.strapWidth) / 8
    const pocketSize = apronLength / 4

    store.set('bibWidth', bibWidth)
    store.set('apronLength', apronLength)
    store.set('apronWidth', apronWidth)
    store.set('strapWidth', strapWidth)
    store.set('pocketSize', pocketSize)

    points.topLeft = new Point(0, 0)
    points.topLeftHem = points.topLeft.shift(270, strapWidth)
    points.bottomLeftHem = points.topLeftHem.shift(270, apronLength)
    points.waistLeft = points.topLeftHem.shift(270, bibLength)
    points.bottomLeft = points.bottomLeftHem.shift(270, strapWidth)
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

    points.pocketLeftTop = points.waistLeft.shift(270, strapWidth)
    points.pocketRightTop = points.pocketLeftTop.shift(0, pocketSize)
    points.pocketLeftBottom = points.pocketLeftTop.shift(270, pocketSize)
    points.pocketRightBottom = points.pocketLeftBottom.shift(0, pocketSize)

    points.crossBox1TopLeft = new Point(
      points.topRightHem.x - strapWidth,
      points.topRightHem.y - strapWidth
    )
    points.crossBox1BottomRight = new Point(
      points.crossBox1TopLeft.x + strapWidth,
      points.crossBox1TopLeft.y + strapWidth
    )
    points.crossBox2TopLeft = points.topRightBack.copy().shift(180, strapWidth)
    points.crossBox2BottomRight = new Point(
      points.crossBox2TopLeft.x + strapWidth,
      points.crossBox2TopLeft.y + strapWidth
    )

    // Re-use this for hem hint
    paths.seam = new Path()
      .move(points.bottomRight)
      .line(points.topRightBack)
      .curve(points.topRightBackCPfront, points.topRightCPdown, points.topRightHem)
      .line(points.topRight)
      .line(points.topLeft)
      .line(points.bottomLeft)
      .line(points.bottomRight)
      .close()
      .addClass('class', 'fabric')

    if (complete) {
      paths.pocket = new Path()
        .move(points.pocketLeftBottom)
        .line(points.pocketLeftTop)
        .line(points.pocketRightTop)
        .line(points.pocketRightBottom)
        .line(points.pocketLeftBottom)
        .addClass('fabric help')
      macro('banner', {
        id: 'pocket',
        path: paths.pocket,
        text: 'pocket',
        classes: 'fill-note center',
      })
    }

    if (sa) {
      const saBase = new Path()
        .move(points.bottomLeft.shift(-90, sa))
        .line(points.bottomRight.shift(-90, sa))
        .line(points.topRightBack)
        .curve(points.topRightBackCPfront, points.topRightCPdown, points.topRightHem)
        .line(points.topRight.shift(90, sa))
        .line(points.topLeft.shift(90, sa))
      paths.sa = saBase
        .clone()
        .offset(sa * 2)
        .addClass('fabric sa')
      if (complete) {
        paths.hemHint = saBase.clone().offset(sa).addClass('note help')
        macro('banner', {
          id: 'narrowHem',
          path: paths.hemHint,
          text: 'albert:narrowHem',
          repeat: 60,
          spaces: 60,
          classes: 'fill-note center',
        })
      }
    }

    /*
     * Annotations
     */

    // Cut list
    store.cutlist.addCut({ cut: 1, from: 'fabric' })

    // Cut on fold
    macro('cutonfold', {
      to: points.bottomCOF,
      from: points.topCOF,
      reverse: true,
    })

    // Logo
    points.logo = points.topRightBack.shiftFractionTowards(points.pocketRightBottom, 0.5)
    snippets.logo = new Snippet('logo', points.logo)

    // Title
    points.title = points.logo.shift(-90, 100)
    macro('title', {
      nr: 1,
      at: points.title,
      title: 'front',
    })

    // Scalebox
    points.scaleboxAnchor = points.pocketLeftBottom.shiftFractionTowards(points.bottomRight, 0.5)
    macro('scalebox', { at: points.scaleboxAnchor })

    // Crossbox 1
    macro('crossbox', {
      topLeft: points.crossBox1TopLeft,
      bottomRight: points.crossBox1BottomRight,
      id: 'crossbox1',
    })

    // Crossbox 2
    macro('crossbox', {
      topLeft: points.crossBox2TopLeft,
      bottomRight: points.crossBox2BottomRight,
      id: 'crossbox2',
      text: 'albert:attachStrap',
    })

    // Dimensions
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + sa + 15,
      id: 'wBottom',
    })
    macro('hd', {
      from: points.topLeft,
      to: points.topRight,
      y: points.topLeft.y - sa - 15,
      id: 'wTop',
    })
    macro('vd', {
      from: points.bottomLeft,
      to: points.topLeft,
      x: points.topLeft.x - 30,
      id: 'hLeft',
    })
    macro('vd', {
      from: points.bottomRight,
      to: points.topRightBack,
      x: points.topRightBack.x + sa + 15,
      id: 'hRightBottom',
    })
    macro('vd', {
      from: points.topRightBack,
      to: points.topRight,
      x: points.topRightBack.x + sa + 15,
      id: 'hRightTop',
    })
    macro('vd', {
      from: points.topLeftHem,
      to: points.topLeft,
      x: points.topLeftHem.x - 15,
      id: 'foldoverTop',
    })
    macro('vd', {
      from: points.bottomLeftHem,
      to: points.topLeftHem,
      x: points.topLeftHem.x - 15,
      id: 'hLeftToFoldover',
    })
    macro('vd', {
      from: points.bottomLeft,
      to: points.bottomLeftHem,
      x: points.bottomLeftHem.x + sa + 15,
      id: 'hBottomHem',
    })

    return part
  },
}
