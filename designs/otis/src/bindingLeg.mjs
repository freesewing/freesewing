import { back } from './back.mjs'
import { front } from './front.mjs'
import { shortsleeve } from './shortsleeve.mjs'

export const bindingLeg = {
  name: 'bindingLeg',
  after: [back, front, shortsleeve],
  options: {
    binding: {
      pct: 11,
      min: 2,
      max: 30,
      // eslint-disable-next-line no-unused-vars
      toAbs: (val, { options, measurements }, mergedOptions) =>
        (val *
          measurements.waist *
          ((options === undefined ? 0 : options.ease === undefined ? 0 : options.ease) + 1) *
          measurements.waist) /
        510 /
        4,
      menu: 'advanced',
    },
  },
  draft: ({
    Point,
    Path,
    points,
    paths,
    options,
    Snippet,
    snippets,
    sa,
    store,
    macro,
    expand,
    units,
    part,
  }) => {
    const backLegOpening = store.get('BackLegOpening')
    const frontLegOpening = store.get('FrontLegOpening')
    const waist = store.get('waist')
    const ease = store.get('ease')
    const sizeFactor = store.get('sizeFactor')
    const binding = waist * (ease + 1) * sizeFactor * options.binding
    store.set('binding', binding)

    if (expand) {
      // Hint about expand
      store.flag.preset('expandIsOn')
    } else {
      // Expand is off, do not draw the part but flag this to the user
      const message = 'bindingLeg'
      store.flag.note({
        msg: message,
        notes: [sa ? 'flag:saIncluded' : 'flag:saExcluded', 'flag:partHiddenByExpand'],
        replace: {
          width: units(binding * 2),
          length: units(backLegOpening + frontLegOpening),
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
    points.p1 = new Point(0, backLegOpening + frontLegOpening)
    points.p2 = new Point(binding * 2, backLegOpening + frontLegOpening)
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

    store.cutlist.addCut({ material: 'fabric', cut: 2 })

    points.logo = points.p0.shiftFractionTowards(points.p2, 0.5)
    snippets.logo = new Snippet('logo', points.logo).attr('data-scale', 0.25)

    snippets.middle = new Snippet('notch', points.p2.shiftTowards(points.p3, frontLegOpening))

    macro('title', {
      at: points.logo.shift(-115, 15),
      nr: 7,
      title: 'bindingLeg',
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
