import { front } from './front.mjs'
import { back } from './back.mjs'

export const waistband = {
  name: 'cornelius.waistband',
  after: [back, front],
  draft: ({
    Point,
    Path,
    points,
    paths,
    Snippet,
    snippets,
    sa,
    store,
    expand,
    units,
    macro,
    part,
  }) => {
    const halfInch = store.get('halfInch')
    const flyWidth = store.get('flyWidth')
    const waistLength =
      store.get('frontWaistLength') + store.get('backWaistLength') + (flyWidth * halfInch) / 2

    if (!expand) {
      // Expand is on, do not draw the part but flag this to the user
      store.flag.note({
        msg: `cornelius:cutWaistband`,
        replace: {
          width: units(halfInch * 3.5 * 2),
          length: units(waistLength * 2),
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

    points.pA = new Point(0, 0)
    points.pB = points.pA.shift(270, waistLength)
    points.pC = points.pB.shift(180, halfInch * 3.5)
    points.pD = points.pA.shift(180, halfInch * 3.5)

    paths.seam = new Path()
      .move(points.pB)
      .line(points.pA)
      .line(points.pD)
      .line(points.pC)
      .attr('class', 'fabric')

    paths.seam2 = new Path().move(points.pC).line(points.pB).attr('class', 'fabric')

    points.button = points.pA.shift(270, halfInch * (flyWidth / 2)).shift(180, halfInch * 1.75)
    points.foldLeft = points.pD.shift(270, flyWidth * halfInch)
    points.foldRight = points.pA.shift(270, flyWidth * halfInch)
    paths.fold = new Path().move(points.foldLeft).line(points.foldRight).addClass('fabric dashed')

    snippets.bh = new Snippet('buttonhole', points.button)
    snippets.b = new Snippet('button', points.button)

    snippets.n1 = new Snippet('notch', points.pA.shift(270, store.get('frontWaistLength')))

    macro('cutonfold', {
      from: points.pC,
      to: points.pB,
    })

    store.cutlist.addCut({ cut: 1, from: 'fabric' })

    points.gridAnchor = points.pA.clone()

    points.logo = points.pA.shiftFractionTowards(points.pC, 0.5)
    snippets.logo = new Snippet('logo', points.logo)
    points.title = points.logo.shift(90, 70)
    macro('title', {
      nr: 1,
      at: points.title,
      title: 'WaistBand',
      align: 'center',
    })

    if (sa) {
      paths.sa = new Path()
        .move(points.pC)
        .line(points.pC.shift(180, sa))
        .join(paths.seam.offset(sa))
        .line(points.pB)
        .attr('class', 'fabric sa')
    }

    macro('hd', {
      id: 1,
      from: points.pD,
      to: points.pA,
      y: points.pA.y - sa - 15,
    })
    macro('vd', {
      id: 2,
      from: points.pC,
      to: points.pD,
      x: points.pC.x - sa - 15,
    })
    macro('vd', {
      id: 3,
      from: points.foldRight,
      to: points.pA,
      x: points.pA.x + sa + 15,
    })

    return part
  },
}
