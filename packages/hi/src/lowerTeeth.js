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

  let lowerTeeth01_02d = 75.74338717643937 * options.size
  let lowerTeeth01_02a = 25.414236606099728 + 180
  let lowerTeeth02cp1d = 47.74891452755759 * options.size
  let lowerTeeth02cp1a = 42.59332849750379
  let lowerTeeth01cp2d = 17.774046078481962 * options.size
  let lowerTeeth01cp2a = 180

  points.lowerTeeth01 = new Point(0, 0)
  points.lowerTeeth02 = points.lowerTeeth01.shift(lowerTeeth01_02a, lowerTeeth01_02d)
  points.lowerTeeth01cp2 = points.lowerTeeth01.shift(lowerTeeth01cp2a, lowerTeeth01cp2d)
  points.lowerTeeth02cp1 = points.lowerTeeth02.shift(lowerTeeth02cp1a, lowerTeeth02cp1d)
  points.lowerTeeth03 = points.lowerTeeth02.flipX()
  points.lowerTeeth01cp1 = points.lowerTeeth01cp2.flipX()
  points.lowerTeeth03cp2 = points.lowerTeeth02cp1.flipX()

  paths.seam = new Path()
    .move(points.lowerTeeth02)
    .curve(points.lowerTeeth02cp1, points.lowerTeeth01cp2, points.lowerTeeth01)
    .curve(points.lowerTeeth01cp1, points.lowerTeeth03cp2, points.lowerTeeth03)

  store.set('lowerTeethLength', paths.seam.length())

  paths.teeth = new Path().move(paths.seam.start())

  createTeeth(paths.seam, 16 * options.size, 8 * options.size, 10, options.aggressive, paths.teeth)

  // Complete?
  if (complete) {
    snippets.lowerTeeth = new Snippet('bnotch', points.lowerTeeth01)

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
