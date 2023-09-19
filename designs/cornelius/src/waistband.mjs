import { front } from './front.mjs'
import { back } from './back.mjs'

function draftCorneliusWaistband({
  Point,
  Path,
  points,
  paths,
  Snippet,
  snippets,
  complete,
  sa,
  store,
  paperless,
  macro,
  part,
}) {
  let halfInch = store.get('halfInch')
  let waistLength = store.get('frontWaistLength') + store.get('backWaistLength')
  let flyWidth = store.get('flyWidth')

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

  if (complete) {
    points.button = points.pA.shift(270, halfInch * (flyWidth / 2)).shift(180, halfInch * 1.75)

    snippets.bh = new Snippet('buttonhole', points.button)
    snippets.b = new Snippet('button', points.button)

    snippets.n1 = new Snippet('notch', points.pA.shift(270, store.get('frontWaistLength')))

    macro('cutonfold', {
      from: points.pC,
      to: points.pB,
    })

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
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.pD,
      to: points.pA,
      y: points.pA.y - sa - 15,
    })
    macro('vd', {
      from: points.pD,
      to: points.pC,
      x: points.pC.x - sa - 15,
    })
  }

  return part
}

export const waistband = {
  name: 'cornelius.waistband',
  after: [back, front],
  draft: draftCorneliusWaistband,
}
