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
    sa,
    macro,
    expand,
    units,
    store,
    part,
  }) => {
    const pocketSize = store.get('pocketSize')

    if (!expand) {
      // Expand is on, do not draw the part but flag this to the user
      store.flag.note({
        title: `albert:cutPocket.t`,
        desc: `albert:cutPocket.d`,
        replace: {
          width: units(pocketSize * 2 + 2 * sa),
          length: units(pocketSize + 2 * sa + store.get('strapWidth')),
        },
        suggest: {
          text: 'flag:show',
          icon: 'expand',
          update: {
            settings: ['expand', 1],
          },
        },
      })
      // Also hint about expand
      store.flag.preset('expand')

      return part.hide()
    }

    points.topLeft = new Point(0, 0)
    points.topRight = new Point(pocketSize, 0)
    points.bottomLeft = points.topLeft.shift(270, pocketSize)
    points.bottomRight = points.topRight.shift(270, pocketSize)

    paths.seam = new Path()
      .move(points.bottomLeft)
      .line(points.bottomRight)
      .line(points.topRight)
      .line(points.topLeft)
      .move(points.bottomLeft)
      .close()
      .attr('class', 'fabric')

    if (sa)
      paths.sa = new Path()
        .move(points.bottomLeft)
        .line(points.bottomRight)
        .line(points.topRight.shift(90, store.get('strapWidth')))
        .line(points.topLeft.shift(90, store.get('strapWidth')))
        .offset(sa)
        .attr('class', 'fabric sa')

    /*
     * Annotations
     */

    // Cut on fold
    macro('cutonfold', {
      from: points.topLeft,
      to: points.bottomLeft,
      reverse: true,
    })

    // Logo
    points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    snippets.logo = new Snippet('logo', points.logo)

    // Title
    points.title = points.logo.shift(-90, 45)
    macro('title', {
      nr: 3,
      at: points.title,
      title: 'Pocket',
    })

    // Dimensions
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + sa + 15,
      id: 'width',
    })
    macro('vd', {
      from: points.bottomLeft,
      to: points.topLeft,
      x: points.topLeft.x - 15,
      id: 'height',
    })

    return part
  },
}
