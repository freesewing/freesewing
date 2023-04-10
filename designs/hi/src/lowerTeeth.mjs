import { pluginBundle } from '@freesewing/plugin-bundle'
import { createTeeth } from './teeth.mjs'

function draftHiLowerTeeth({
  store,
  sa,
  Point,
  points,
  Path,
  paths,
  Snippet,
  snippets,
  options,
  complete,
  paperless,
  macro,
  part,
}) {
  const lowerTeeth01_02d = 75.74338717643937 * options.size
  const lowerTeeth01_02a = 25.414236606099728 + 180
  const lowerTeeth02cp1d = 47.74891452755759 * options.size
  const lowerTeeth02cp1a = 42.59332849750379
  const lowerTeeth01cp2d = 27.774046078481962 * options.size
  const lowerTeeth01cp2a = 180

  points.lowerTeeth01 = new Point(0, 0)
  points.lowerTeeth02 = points.lowerTeeth01.shift(lowerTeeth01_02a, lowerTeeth01_02d)
  points.lowerTeeth01cp2 = points.lowerTeeth01.shift(lowerTeeth01cp2a, lowerTeeth01cp2d)
  points.lowerTeeth02cp1 = points.lowerTeeth02.shift(lowerTeeth02cp1a, lowerTeeth02cp1d)
  // Make seam symmetric to optimize generating teeth
  points.lowerTeeth02cp1 = points.lowerTeeth02.shiftTowards(
    points.lowerTeeth02cp1,
    points.lowerTeeth01cp2.dist(points.lowerTeeth01)
  )
  points.lowerTeeth03 = points.lowerTeeth02.flipX()
  points.lowerTeeth01cp1 = points.lowerTeeth01cp2.flipX()
  points.lowerTeeth03cp2 = points.lowerTeeth02cp1.flipX()

  paths.seam = new Path()
    .move(points.lowerTeeth02)
    .curve(points.lowerTeeth02cp1, points.lowerTeeth01cp2, points.lowerTeeth01)
    .curve(points.lowerTeeth01cp1, points.lowerTeeth03cp2, points.lowerTeeth03)

  store.set('lowerTeethLength', paths.seam.length())

  paths.teeth = createTeeth(
    [
      // Array holding the points for half a mouth (bezier, not path)
      points.lowerTeeth02, // start
      points.lowerTeeth02cp1, // cp1
      points.lowerTeeth01cp2, // cp2
      points.lowerTeeth01, // end
    ],
    10, // number of teeth
    8 * options.size, // starting size
    16 * options.size, // ending size
    part
  )

  // Complete?
  if (complete) {
    snippets.lowerTeeth = new Snippet('bnotch', points.lowerTeeth01)

    points.titleAnchor = points.lowerTeeth02.shiftFractionTowards(points.lowerTeeth03, 0.5) //.shiftFractionTowards(points.lowerTeeth01, 0.5)

    macro('title', {
      at: points.titleAnchor,
      nr: 9,
      title: 'lowerTeeth',
      scale: options.size / 2,
    })

    if (paperless) {
      macro('hd', {
        from: points.lowerTeeth01,
        to: points.lowerTeeth03,
        y: points.lowerTeeth02.y + sa + 10,
        noStartMarker: true,
        noEndMarker: true,
      })
      macro('hd', {
        from: points.lowerTeeth02,
        to: points.lowerTeeth01,
        y: points.lowerTeeth02.y + sa + 10,
        noStartMarker: true,
        noEndMarker: true,
      })
      macro('vd', {
        from: points.lowerTeeth02,
        to: points.lowerTeeth01,
        x: points.lowerTeeth02.x - sa - 10,
        noStartMarker: true,
        noEndMarker: true,
      })
      macro('vd', {
        from: points.lowerTeeth01,
        to: paths.teeth.edge('top'),
        x: points.lowerTeeth02.x - sa - 10,
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

export const lowerTeeth = {
  name: 'hi.lowerTeeth',
  plugins: [pluginBundle],
  draft: draftHiLowerTeeth,
}
