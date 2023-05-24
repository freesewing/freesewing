import { pluginBundle } from '@freesewing/plugin-bundle'

function florenceMask({
  points,
  Point,
  paths,
  Path,
  measurements,
  options,
  complete,
  sa,
  paperless,
  Snippet,
  snippets,
  macro,
  utils,
  store,
  part,
}) {
  points.topLeft = new Point(0, 0)
  points.bottomLeft = new Point(0, measurements.head * options.height)
  points.topRight = new Point((measurements.head * options.length) / 2, 0)
  points.bottomRight = new Point(points.topRight.x, points.bottomLeft.y)
  points.tipCenter = new Point(points.topRight.x, points.bottomRight.y / 4)

  points.topEdge = points.topLeft.shiftFractionTowards(points.bottomLeft, 0.2)
  points.bottomEdge = points.bottomLeft.shiftFractionTowards(points.topLeft, 0.18)
  points.topTip = points.topRight.shiftFractionTowards(points.topLeft, 0.1)
  points.bottomTip = points.bottomRight.shiftFractionTowards(points.bottomLeft, 0.4)
  points.tipCenterCp2 = points.tipCenter.shiftFractionTowards(points.topRight, 0.55)
  points.tipCenterCp1 = points.tipCenter.shiftFractionTowards(points.bottomRight, 0.5)

  points.topTipCp2 = points.topEdge.shift(0, measurements.head * options.curve)
  points.topTipCp1 = points.topTip
    .shiftTowards(points.topTipCp2, points.topTip.dist(points.tipCenterCp2) / 2)
    .rotate(90, points.topTip)

  points.tipCenterCp1 = points.tipCenterCp1.rotate(-4, points.tipCenter)
  points.tipCenterCp2 = points.tipCenterCp2.rotate(-4, points.tipCenter)

  points.bottomTipCp2 = points.bottomTip.shiftFractionTowards(
    utils.beamsIntersect(
      points.bottomTip,
      points.bottomTip.shift(15, 30),
      points.tipCenter,
      points.tipCenterCp1
    ),
    0.75
  )

  paths.seam = new Path()
    .move(points.topEdge)
    .line(points.bottomEdge)
    .line(points.bottomTip)
    .curve(points.bottomTipCp2, points.tipCenterCp1, points.tipCenter)
    .curve(points.tipCenterCp2, points.topTipCp1, points.topTip)
    .curve_(points.topTipCp2, points.topEdge)
    .close()
    .attr('class', 'fabric')

  store.cutlist.addCut()
  store.cutlist.addCut({ material: 'lining' })
  if (complete) {
    points.logo = new Point(points.tipCenter.x / 2, points.tipCenterCp1.y)
    snippets.logo = new Snippet('logo', points.logo).attr('data-scale', 0.5)
    points.title = points.logo.shift(90, 40)
    macro('title', {
      at: points.title,
      nr: 1,
      title: 'mask',
      scale: 0.5,
    })
    macro('miniscale', { at: points.logo.shift(-90, 20) })

    points.ribbon1TopLeft = points.topEdge.shift(-90, 2)
    points.ribbon1TopRight = points.ribbon1TopLeft.shift(0, 10)
    points.ribbon1BottomRight = points.ribbon1TopRight.shift(-90, 10)
    points.ribbon1BottomLeft = points.ribbon1TopLeft.shift(-90, 10)
    points.ribbon2TopLeft = points.bottomEdge.shift(90, 12)
    points.ribbon2TopRight = points.ribbon2TopLeft.shift(0, 10)
    points.ribbon2BottomRight = points.ribbon2TopRight.shift(-90, 10)
    points.ribbon2BottomLeft = points.ribbon2TopLeft.shift(-90, 10)

    paths.ribbon1 = new Path()
      .move(points.ribbon1TopLeft)
      .line(points.ribbon1TopRight)
      .line(points.ribbon1BottomRight)
      .line(points.ribbon1BottomLeft)
      .move(points.ribbon2TopLeft)
      .line(points.ribbon2TopRight)
      .line(points.ribbon2BottomRight)
      .line(points.ribbon2BottomLeft)
      .attr('class', 'stroke-sm fabric dashed')

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

    if (paperless) {
      macro('hd', {
        from: points.bottomEdge,
        to: points.bottomTip,
        y: points.bottomTip.y + sa + 15,
      })
      macro('hd', {
        from: points.bottomEdge,
        to: points.tipCenter,
        y: points.bottomTip.y + sa + 30,
      })
      macro('hd', {
        from: points.topEdge,
        to: points.topTip,
        y: points.topTip.y - sa - 15,
      })
      macro('vd', {
        from: points.bottomTip,
        to: points.bottomEdge,
        x: points.bottomEdge.x - sa - 15,
      })
      macro('vd', {
        from: points.bottomTip,
        to: points.topEdge,
        x: points.bottomEdge.x - sa - 30,
      })
      macro('vd', {
        from: points.bottomTip,
        to: points.topTip,
        x: points.bottomEdge.x - sa - 45,
      })
      macro('vd', {
        from: points.bottomTip,
        to: points.tipCenter,
        x: points.tipCenter.x + sa + 15,
      })
    }
  }

  return part
}

export const mask = {
  name: 'florence.mask',
  measurements: ['head'],
  options: {
    length: { pct: 40, min: 35, max: 45, menu: 'fit' },
    height: { pct: 26, min: 23, max: 29, menu: 'fit' },
    curve: { pct: 12.5, min: 10, max: 15, menu: 'fit' },
  },
  plugins: [pluginBundle],
  draft: florenceMask,
}
