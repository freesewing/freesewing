export const gusset = {
  name: 'jane.gusset',
  measurements: ['biceps', 'shoulderToElbow'],
  options: {
    gussetSize: { pct: 44, min: 44, max: 50, menu: 'fit' },
  },

  draft: function draftJaneGusset({
    options,
    Point,
    Path,
    points,
    paths,
    sa,
    paperless,
    macro,
    measurements,
    part,
    store,
  }) {
    const gussetMeasure = measurements.biceps * (0.5 + 0.85) * options.gussetSize

    points.gussetLeft = new Point(0, 0)
    points.gussetRight = new Point(gussetMeasure, 0)
    points.gussetBottomLeft = new Point(0, gussetMeasure)
    points.gussetBottomRight = new Point(gussetMeasure, gussetMeasure)

    paths.gusset = new Path()
      .move(points.gussetRight)
      .line(points.gussetLeft)
      .line(points.gussetBottomLeft)
      .line(points.gussetBottomRight)
      .line(points.gussetRight)
      .addClass('fabric')
      .close()

    store.cutlist.setCut({ cut: 2, from: 'fabric' })

    points.title = points.gussetLeft.shift(300, gussetMeasure / 2)
    macro('title', {
      at: points.title,
      nr: 3,
      title: 'sleeveGusset',
    })

    if (sa) {
      paths.sa = paths.gusset.offset(sa).setClass('fabric sa')
    }

    // Paperless?
    if (paperless) {
      macro('hd', {
        id: 'gussetWidth',
        from: points.gussetLeft,
        to: points.gussetRight,
        x: points.gussetLeft.x + sa + 30,
      })

      macro('vd', {
        id: 'gussetLength',
        from: points.gussetLeft,
        to: points.gussetBottomLeft,
        x: points.gussetLeft.x + sa + 30,
      })
    }

    return part
  },
}
