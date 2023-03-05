import { front } from './front.mjs'

export const pocket = {
  name: 'albert.pocket',
  after: front,
  draft: ({
    Point,
    Path,
    points,
    paths,
    Snippet,
    snippets,
    complete,
    sa,
    paperless,
    macro,
    store,
    part,
  }) => {
    let pocketSize = store.get('pocketSize')
    let hemWidth = store.get('hemWidth')

    points.topLeft = new Point(0, 0)
    points.topRight = new Point(pocketSize, 0)
    points.topLeftHem = points.topLeft.shift(270, hemWidth)
    points.topRightHem = points.topRight.shift(270, hemWidth)
    points.bottomLeft = points.topLeftHem.shift(270, pocketSize)
    points.bottomRight = points.topRightHem.shift(270, pocketSize)

    points.topCOF = points.topLeft.shift(270, pocketSize / 5)
    points.bottomCOF = points.bottomLeft.shift(90, pocketSize / 5)

    paths.seam = new Path()
      .move(points.bottomLeft)
      .line(points.bottomRight)
      .line(points.topRight)
      .line(points.topLeft)
      .close()
      .attr('class', 'fabric')

    paths.all = paths.seam.clone().line(points.bottomLeft).close().attr('class', 'fabric')

    paths.topHem = new Path()
      .move(points.topLeftHem)
      .line(points.topRightHem.shift(0, sa))
      .attr('class', 'various dashed')
      .attr('data-text', 'hem')
      .attr('data-text-class', 'text-xs center')

    macro('cutonfold', {
      from: points.topCOF,
      to: points.bottomCOF,
    })

    // Complete?
    if (complete) {
      points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
      snippets.logo = new Snippet('logo', points.logo)
      points.title = points.logo.shift(-90, 45)
      macro('title', {
        nr: 3,
        at: points.title,
        title: 'Pocket',
      })
      if (sa) {
        paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
      }
    }

    // Paperless?
    if (paperless) {
      macro('hd', {
        from: points.bottomLeft,
        to: points.bottomRight,
        y: points.bottomLeft.y + sa + 15,
      })
      macro('vd', {
        from: points.bottomLeft,
        to: points.topLeft,
        x: points.topLeft.x - sa - 15,
      })
    }

    return part
  },
}
