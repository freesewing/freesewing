import { pluginBundle } from '@freesewing/plugin-bundle'

function draftFlorentBrimBottom({
  paperless,
  sa,
  store,
  complete,
  points,
  options,
  macro,
  Point,
  paths,
  Path,
  measurements,
  part,
}) {
  let scale = 1
  let base = scale * measurements.head * (1 + options.headEase)

  points.tipRight = new Point(base * 0.147, 0)
  points.tipLeft = points.tipRight.flipX()
  points.tipRightCp2 = points.tipRight.shift(-115, base * 0.051)
  points.tipLeftCp1 = points.tipRightCp2.flipX()
  points.tipRightCp1 = points.tipRight.shift(-75, base * 0.195)
  points.tipLeftCp2 = points.tipRightCp1.flipX()
  points.innerMid = new Point(0, base * 0.13)
  points.outerMid = new Point(0, base * 0.226)
  points.innerMidCp2 = points.innerMid.shift(180, base * 0.13)
  points.innerMidCp1 = points.innerMidCp2.flipX()
  points.outerMidCp1 = points.outerMid.shift(180, base * 0.066)
  points.outerMidCp2 = points.outerMidCp1.flipX()

  store.set(
    'brimInnerLength',
    new Path()
      .move(points.tipRight)
      .curve(points.tipRightCp2, points.innerMidCp1, points.innerMid)
      .length() * 2
  )

  paths.seam = new Path()
    .move(points.tipLeft)
    .curve(points.tipLeftCp2, points.outerMidCp1, points.outerMid)
    .curve(points.outerMidCp2, points.tipRightCp1, points.tipRight)
    .curve(points.tipRightCp2, points.innerMidCp1, points.innerMid)
    .curve(points.innerMidCp2, points.tipLeftCp1, points.tipLeft)
    .line(points.tipLeft)
    .close()
    .attr('class', 'fabric')

  macro('grainline', {
    from: points.outerMid,
    to: points.innerMid,
  })

  if (complete) {
    points.title = points.innerMid.shiftFractionTowards(points.outerMidCp2, 0.35)
    macro('title', {
      at: points.title,
      nr: 3,
      title: 'brimBottom',
    })
    macro('sprinkle', {
      snippet: 'notch',
      on: ['innerMid', 'outerMid'],
    })

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

    if (paperless) {
      macro('hd', {
        from: points.tipLeft,
        to: points.tipRight,
        y: points.tipLeft.y - sa - 15,
      })
      macro('hd', {
        from: paths.seam.edge('left'),
        to: paths.seam.edge('right'),
        y: points.tipLeft.y - sa - 30,
      })
      macro('vd', {
        from: points.outerMid,
        to: points.innerMid,
        x: points.innerMid.x - 15,
      })
      macro('vd', {
        from: points.outerMid,
        to: points.tipRight,
        x: points.tipRight.x + sa + 18,
      })
    }
  }

  return part
}

export const brimBottom = {
  name: 'florent.brimBottom',
  measurements: ['head'],
  options: {
    // Constants
    topSide: 0.8,
    brim: 0,
    // Percentages
    headEase: { pct: 2, min: 0, max: 5, menu: 'fit' },
  },
  plugins: [pluginBundle],
  draft: draftFlorentBrimBottom,
}
