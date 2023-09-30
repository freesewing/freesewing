import { body } from './body.mjs'
import { createTeeth } from './teeth.mjs'

export const lowerTeeth = {
  name: 'hi.lowerTeeth',
  after: body,
  draft: ({ store, sa, Point, points, Path, paths, Snippet, snippets, macro, part }) => {
    const multiplier = store.get('multiplier')

    const lowerTeeth01_02d = 75.74338717643937 * multiplier
    const lowerTeeth01_02a = 25.414236606099728 + 180
    const lowerTeeth02cp1d = 47.74891452755759 * multiplier
    const lowerTeeth02cp1a = 42.59332849750379
    const lowerTeeth01cp2d = 27.774046078481962 * multiplier
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
      8 * multiplier, // starting size
      16 * multiplier, // ending size
      part
    )

    store.cutlist.addCut({ cut: 1, material: 'color4Teeth' })

    snippets.lowerTeeth = new Snippet('bnotch', points.lowerTeeth01)

    points.titleAnchor = points.lowerTeeth02.shiftFractionTowards(points.lowerTeeth03, 0.5) //.shiftFractionTowards(points.lowerTeeth01, 0.5)
    points.gridAnchor = points.titleAnchor.clone()

    // Bounding box to prevent title clipping
    paths.bbox = new Path()
      .move(points.lowerTeeth02)
      .move(new Point(points.lowerTeeth03.x, points.lowerTeeth03.y * 1.75))

    macro('title', {
      at: points.titleAnchor,
      nr: 9,
      title: 'lowerTeeth',
      scale: multiplier / 2,
    })

    macro('hd', {
      from: points.lowerTeeth01,
      to: points.lowerTeeth03,
      y: points.lowerTeeth02.y + sa + 10,
      noStartMarker: true,
      noEndMarker: true,
      id: 'right',
    })
    macro('hd', {
      from: points.lowerTeeth02,
      to: points.lowerTeeth01,
      y: points.lowerTeeth02.y + sa + 10,
      noStartMarker: true,
      noEndMarker: true,
      id: 'left',
    })

    macro('vd', {
      from: points.lowerTeeth02,
      to: points.lowerTeeth01,
      x: points.lowerTeeth02.x - sa - 10,
      noStartMarker: true,
      noEndMarker: true,
      id: 'height',
    })
    macro('vd', {
      from: points.lowerTeeth01,
      to: paths.teeth.edge('top'),
      x: points.lowerTeeth02.x - sa - 10,
      noStartMarker: true,
      noEndMarker: true,
      id: 'teethHeight',
    })

    if (sa) {
      let pSA = paths.seam.offset(sa)
      paths.sa = new Path()
        .move(paths.seam.start())
        .line(pSA.start())
        .join(pSA)
        .line(paths.seam.end())
        .attr('class', 'fabric sa')
    }

    return part
  },
}
