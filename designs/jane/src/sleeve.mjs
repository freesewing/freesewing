export const sleeve = {
  name: 'jane.sleeve',
  measurements: ['biceps', 'shoulderToElbow'],
  options: {
    bicepsEase: { pct: 18, min: 18, max: 51, menu: 'fit' },
    sleeveLength: { pct: 80, min: 60, max: 100, menu: 'style' },
  },

  draft: function draftJaneSleeve({
    options,
    Point,
    Path,
    Snippet,
    points,
    paths,
    snippets,
    sa,
    paperless,
    macro,
    measurements,
    part,
    store,
  }) {
    const sleeveWidth = measurements.biceps * (1 + options.bicepsEase)

    const sleeveLength = measurements.shoulderToElbow * options.sleeveLength

    points.sleeveLeft = new Point(0, 0)
    points.sleeveRight = new Point(sleeveLength, 0)
    points.sleeveBottomLeft = new Point(0, sleeveWidth)
    points.sleeveBottomRight = new Point(sleeveLength, sleeveWidth)

    paths.sleeve = new Path()
      .move(points.sleeveRight)
      .line(points.sleeveLeft)
      .line(points.sleeveBottomLeft)
      .line(points.sleeveBottomRight)
      .line(points.sleeveRight)
      .addClass('fabric')
      .close()

    store.cutlist.setCut({ cut: 2, from: 'fabric' })

    points.title = points.sleeveLeft.shift(300, sleeveLength / 2)
    macro('title', {
      at: points.title,
      nr: 2,
      title: 'sleeve',
    })

    points.notch = new Point(0, sleeveWidth / 2).addText('shoulder', 'center')

    points.text1 = new Point(sleeveLength / 2, 10).addText('seam', 'center')

    points.text2 = new Point(sleeveLength / 2, sleeveWidth).addText('seam', 'center')

    points.text3 = points.sleeveRight
      .shiftTowards(points.sleeveBottomRight, sleeveWidth / 2)
      .addText('hem', 'center')

    snippets.notch = new Snippet('notch', points.notch)

    if (sa) {
      paths.sa = paths.sleeve.offset(sa).setClass('fabric sa').close()
    }

    // Paperless?
    if (paperless) {
      macro('vd', {
        id: 'sleeveLength',
        from: points.sleeveLeft,
        to: points.sleeveBottomLeft,
        x: points.sleeveLeft.x + sa + 30,
      })

      macro('hd', {
        id: 'sleeveWidth',
        from: points.sleeveLeft,
        to: points.sleeveRight,
        y: points.sleeveLeft.y + sa + 30,
      })
    }

    return part
  },
}
