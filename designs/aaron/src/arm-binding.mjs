import { back } from './back.mjs'

export const armBinding = {
  name: 'aaron.armBinding',
  after: back,
  draft: ({
    store,
    sa,
    Point,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    macro,
    complete,
    expand,
    units,
    part,
  }) => {
    const w = store.get('bindingWidth')
    const l = store.get('armBindingLength')

    if (!expand) {
      // Expand is on, do not draw the part but flag this to the user
      store.flag.note({
        title: `aaron:cutArmBinding.t`,
        desc: `aaron:cutArmBinding.d`,
        replace: {
          width: units(w),
          length: units(l),
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
    points.bottomLeft = new Point(0, l)
    points.bottomRight = new Point(w, l)
    points.topRight = new Point(w, 0)

    paths.seam = new Path()
      .move(points.topLeft)
      .line(points.bottomLeft)
      .line(points.bottomRight)
      .line(points.topRight)
      .line(points.topLeft)
      .close()
      .addClass('fabric')

    /*
     * Annotations
     */
    // Provide cutting instructions
    store.cutlist.addCut({ cut: 2 })

    // Add title
    points.title = new Point(w / 2, l / 8)
    macro('title', {
      at: points.title,
      nr: 4,
      title: 'aaron:armBinding',
      align: 'center',
      scale: 0.5,
    })

    // Fold lines
    if (complete) {
      for (const i of [1, 2, 3]) {
        paths[`fold${i}`] = new Path()
          .move(points.topLeft.shiftFractionTowards(points.topRight, 0.25 * i))
          .line(points.bottomLeft.shiftFractionTowards(points.bottomRight, 0.25 * i))
          .addClass('note help')
        macro('banner', {
          id: `foldHere${i}`,
          path: paths[`fold${i}`],
          text: 'foldHere',
          classes: 'fill-note text-sm center',
          repeat: 30,
          spaces: 60,
        })
      }
    }

    // Logo
    points.logo = points.title.shift(-90, 75)
    snippets.logo = new Snippet('logo', points.logo).scale(0.75)

    // Dimensions
    macro('vd', {
      from: points.bottomRight,
      to: points.topRight,
      x: points.topRight.x + sa + 15,
    })
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomRight.y + sa + 15,
    })

    return part
  },
}
