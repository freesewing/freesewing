import { createTeeth } from './teeth.js'

export default function (part) {
  let {
    store,
    sa,
    Point,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    options,
    measurements,
    complete,
    paperless,
    macro,
  } = part.shorthand()

  let upperTeeth01_02d = 131.305041182736 * options.size
  let upperTeeth01_02a = 34.147056946748805 + 180
  let upperTeeth02cp1d = 84.30113337316406 * options.size
  let upperTeeth02cp1a = 55.1335930733262
  let upperTeeth01cp2d = 18.331000000000017 * options.size
  let upperTeeth01cp2a = 180

  points.upperTeeth01 = new Point(0, 0)
  points.upperTeeth02 = points.upperTeeth01.shift(upperTeeth01_02a, upperTeeth01_02d)
  points.upperTeeth01cp2 = points.upperTeeth01.shift(upperTeeth01cp2a, upperTeeth01cp2d)
  points.upperTeeth02cp1 = points.upperTeeth02.shift(upperTeeth02cp1a, upperTeeth02cp1d)
  points.upperTeeth03 = points.upperTeeth02.flipX()
  points.upperTeeth01cp1 = points.upperTeeth01cp2.flipX()
  points.upperTeeth03cp2 = points.upperTeeth02cp1.flipX()

  paths.seam = new Path()
    .move(points.upperTeeth02)
    .curve(points.upperTeeth02cp1, points.upperTeeth01cp2, points.upperTeeth01)
    .curve(points.upperTeeth01cp1, points.upperTeeth03cp2, points.upperTeeth03)

  store.set('upperTeethLength', paths.seam.length())

  paths.teeth = new Path().move(paths.seam.start())

  createTeeth(paths.seam, 18 * options.size, 9 * options.size, 15, options.aggressive, paths.teeth)

  // Complete?
  if (complete) {
    snippets.upperTeeth = new Snippet('bnotch', points.upperTeeth01)

    points.titleAnchor = points.upperTeeth02.shiftFractionTowards(points.upperTeeth03, 0.5).shiftFractionTowards(points.upperTeeth01, 0.5)

    macro('title', {
      at: points.titleAnchor,
      nr: 6,
      title: 'upperTeeth',
      scale: options.size / 2,
    })

    if (paperless) {
      macro('hd', {
        from: points.upperTeeth01,
        to: points.upperTeeth03,
        y: points.upperTeeth02.y + sa + 10,
        noStartMarker: true,
        noEndMarker: true,
      })
      macro('hd', {
        from: points.upperTeeth02,
        to: points.upperTeeth01,
        y: points.upperTeeth02.y + sa + 10,
        noStartMarker: true,
        noEndMarker: true,
      })
      macro('vd', {
        from: points.upperTeeth02,
        to: points.upperTeeth01,
        x: points.upperTeeth02.x - sa - 10,
        noStartMarker: true,
        noEndMarker: true,
      })
      console.log({path:paths.teeth})
      console.log({point:paths.teeth.edge('top')})
      macro('vd', {
        from: points.upperTeeth01, 
        to: paths.teeth.edge('top'),
        x: points.upperTeeth02.x - sa - 10,
        noStartMarker: true,
        noEndMarker: true,
      })
    }

    if (sa) {
      let pSA = paths.seam.offset(sa)
      paths.sa = new Path()
        .move(paths.seam.start())
        .line(pSA.start())
        .join(pSA)
        .line(paths.seam.end())
        .attr('class', 'fabric sa')
    }
  }

  return part
}
