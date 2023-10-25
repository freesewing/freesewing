import { pluginGore } from '@freesewing/plugin-gore'

function draftHolmesCrown({
  Point,
  points,
  Path,
  paths,
  measurements,
  options,
  macro,
  sa,
  absoluteOptions,
  store,
  part,
}) {
  //Radius of the head
  const headCircumference = measurements.head + absoluteOptions.headEase
  const headRadius = headCircumference / 2 / Math.PI

  points.p0 = new Point(0, 0)

  macro('gore', {
    from: points.p0,
    radius: headRadius,
    gores: options.gores,
    extraLength: ((options.lengthRatio - 0.5) * headCircumference) / 2,
    prefix: 'gore_',
  })

  if (sa) {
    paths.saCurve = new Path()
      .move(points.gore_p1)
      .curve(points.gore_Cp1, points.gore_Cp2, points.gore_p2)
      .offset(sa)
      .hide()
    points.sa1 = new Point(points.gore_p3.x - sa * 2, points.gore_p3.y - sa)
    paths.saBase = new Path()
      .move(points.gore_p3)
      .line(points.p0)
      .offset(sa * 2)
      .hide()
    paths.sa = new Path()
      .move(points.gore_p1)
      .line(points.gore_p1.shift(0, sa))
      .line(paths.saCurve.start())
      .join(paths.saCurve)
      .line(points.sa1)
      .join(paths.saBase)
      .line(points.p0)
      .attr('class', 'fabric sa')
  }

  /*
   * Annotations
   */

  // Cutlist
  store.cutlist.setCut([
    { cut: Number(options.gores), from: 'fabric', onFold: true },
    { cut: Number(options.gores), from: 'lining', onFold: true },
  ])

  // Cutonfold
  macro('cutonfold', {
    from: points.p0,
    to: points.gore_p1.shift(180, 20),
    offset: -points.gore_p2.y / 6,
    grainline: true,
  })

  // Title
  points.title = new Point(points.gore_p1.x / 10, points.gore_p2.y / 1.8)
  macro('title', { at: points.title, nr: 1, title: 'crown', scale: 0.5 })

  // Dimensions
  macro('hd', {
    id: 'wFull',
    from: points.p0,
    to: points.gore_p1,
    y: -points.p0.x + 15,
  })
  macro('vd', {
    id: 'hFull',
    from: points.p0,
    to: points.gore_p3,
    x: points.p0.x - 15 - sa * 2,
  })

  return part
}

export const crown = {
  name: 'holmes.crown',
  measurements: ['head'],
  options: {
    headEase: {
      pct: 3,
      min: 0,
      max: 9,
      snap: {
        metric: [6, 13, 19, 25, 32, 38, 44, 50],
        imperial: [6.35, 12.7, 19.05, 25.4, 31.75, 38.1, 44.45, 50.8],
      },
      toAbs: (pct, { measurements }) => measurements.head * pct,
      menu: 'fit',
    },
    lengthRatio: { pct: 55, min: 40, max: 60, menu: 'style' },
    gores: { count: 6, min: 4, max: 20, menu: 'style' },
  },
  plugins: [pluginGore],
  draft: draftHolmesCrown,
}
