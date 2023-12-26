import { bindingLeg } from './bindingLeg.mjs'

export const bindingNeckFront = {
  name: 'bindingNeckFront',
  after: [bindingLeg],
  draft: ({
    Point,
    Path,
    points,
    paths,
    Snippet,
    snippets,
    sa,
    store,
    macro,
    expand,
    units,
    part,
  }) => {
    const frontNeckOpening = store.get('FrontNeckOpening')
    const binding = store.get('binding')

    if (expand) {
      // Hint about expand
      store.flag.preset('expandIsOn')
    } else {
      // Expand is off, do not draw the part but flag this to the user
      const message = 'bindingNeckFront'
      store.flag.note({
        msg: message,
        notes: [sa ? 'flag:saIncluded' : 'flag:saExcluded', 'flag:partHiddenByExpand'],
        replace: {
          width: units(binding * 2),
          length: units(frontNeckOpening),
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
      store.flag.preset('expandIsOff')

      return part.hide()
    }

    points.p0 = new Point(0, 0)
    points.p1 = new Point(0, frontNeckOpening)
    points.p2 = new Point(binding * 2, frontNeckOpening)
    points.p3 = new Point(binding * 2, 0)

    paths.seam = new Path()
      .move(points.p0)
      .line(points.p1)
      .line(points.p2)
      .line(points.p3)
      .line(points.p0)
      .close()

    paths.foldLine = new Path()
      .move(points.p0.shiftFractionTowards(points.p3, 0.5))
      .line(points.p2.shiftFractionTowards(points.p1, 0.5))
      .addClass('dashed')

    store.cutlist.addCut({ material: 'fabric', cut: 1 })

    points.logo = points.p0.shiftFractionTowards(points.p2, 0.5)
    snippets.logo = new Snippet('logo', points.logo).attr('data-scale', 0.25)

    snippets.middle = new Snippet('notch', points.p2.shiftFractionTowards(points.p3, 0.5))

    macro('title', {
      at: points.logo.shift(-115, 15),
      nr: 6,
      title: 'bindingNeckFront',
      scale: 0.2,
    })

    if (sa) {
      paths.sa = paths.seam.offset(sa).close().attr('class', 'fabric sa')
    }

    macro('hd', {
      from: points.p0,
      to: points.p3,
      y: points.p0.y - sa - 15,
    })
    macro('vd', {
      from: points.p2,
      to: points.p3,
      x: points.p3.x + sa + 15,
    })

    return part
  },
}
