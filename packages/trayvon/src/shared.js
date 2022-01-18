export const calculateHelpers = (part) => {
  let { store, measurements, options, absoluteOptions } = part.shorthand()

  let halfLength =
    (measurements.hpsToWaistBack + measurements.waistToHips + measurements.neck / 2) *
    (1 + options.lengthBonus)
  let backTip = absoluteOptions.tipWidth * 0.7
  if (backTip < absoluteOptions.knotWidth) backTip = options.knotWidth

  store.set('halfLength', halfLength)
  store.set('backTip', backTip)
}

export const draftTieShape = (part, tipWidth, knotWidth, notch = false) => {
  let { points, Point, store, utils, paths, Path, macro, absoluteOptions } = part.shorthand()

  let hl = store.get('halfLength')
  let ht = tipWidth / 2
  let hk = knotWidth / 2

  points.tip = new Point(0, 0)
  points.mid = new Point(0, hl)
  points.tipRight = new Point(ht, ht)
  points.tipLeft = points.tipRight.flipX()
  points._tmp1 = points.mid.shift(0, hk)
  points._tmp2 = points._tmp1.rotate(45, points.mid)
  points.midRight = utils.beamsIntersect(points.mid, points._tmp2, points.tipRight, points._tmp1)
  points._tmp3 = points.mid.shift(180, hk)
  points._tmp4 = points._tmp3.rotate(45, points.mid)
  points.midLeft = utils.beamsIntersect(points.mid, points._tmp4, points.tipLeft, points._tmp3)
  points.gridAnchor = new Point(0, points.tipRight.y)
  points.title = new Point(0, hl / 5)

  if (notch) {
    points.notch1 = points.tip.shift(-45, absoluteOptions.tipWidth / 5)
    points.notch2 = points.tip.shift(-135, absoluteOptions.tipWidth / 5)
    macro('sprinkle', {
      snippet: 'notch',
      on: ['notch1', 'notch2', 'mid'],
    })
  }
  paths.seam = new Path()
    .move(points.tip)
    .line(points.tipLeft)
    .line(points.midLeft)
    .line(points.midRight)
    .line(points.tipRight)
    .line(points.tip)
    .close()
}

export const tieShapeDimensions = (part, lining = false) => {
  let { points, macro, paths, Path } = part.shorthand()

  macro('hd', {
    from: points.tipLeft,
    to: points.tipRight,
    y: points.tip.y - 15,
  })
  macro('vd', {
    from: points.tipRight,
    to: points.tip,
    x: points.tipRight.x + 15,
  })
  if (lining) {
    macro('vd', {
      from: points.cutRight,
      to: points.tip,
      x: points.cutRight.x + 30,
    })
  } else {
    macro('hd', {
      from: points._tmp3,
      to: points._tmp1,
      y: points.midLeft.y + 15,
    })
    macro('vd', {
      from: points.mid,
      to: points.tip,
      x: points.tipRight.x + 30,
    })
    paths.hint = new Path()
      .move(points._tmp3)
      .line(points._tmp1)
      .line(points.midRight)
      .attr('class', 'dotted')
  }
}

export const seamAllowance = (part, className) => {
  let { paths, Path, points, sa } = part.shorthand()
  paths.sa = new Path()
    .move(points.tipLeft)
    .line(points.tip)
    .line(points.tipRight)
    .offset(sa * -1)
    .attr('class', 'sa ' + className)
  paths.sa.move(paths.sa.end()).line(points.tipRight).move(paths.sa.start()).line(points.tipLeft)
}
