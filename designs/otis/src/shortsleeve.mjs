import { pluginBundle } from '@freesewing/plugin-bundle'
import { back } from './back.mjs'

function draftShortsleeve({
  options,
  Point,
  Path,
  points,
  paths,
  Snippet,
  snippets,
  complete,
  sa,
  paperless,
  store,
  macro,
  utils,
  part,
}) {
  const hem = options.hem
  const waist = store.get('waist')
  const ease = store.get('ease')
  const sizeFactor = store.get('sizeFactor')
  const armhole = store.get('armhole')
  store.set('hem', 117 * (ease + 1) * sizeFactor * hem)

  points.p0 = new Point(0, 0)
  points.p0Cp2 = points.p0.shift(0, 84.746 * (ease + 1) * sizeFactor)
  points.p1 = points.p0.shift(270, 117 * (ease + 1) * sizeFactor)
  points.p2 = points.p1.shift(0, 121 * (ease + 1) * sizeFactor)
  points.p3 = points.p0.shift(331.965149, 145.468319 * (ease + 1) * sizeFactor)
  points.p3Cp1 = points.p3.shift(180, 69.454559985 * (ease + 1) * sizeFactor)

  let diff = 10
  let iter = 1
  do {
    paths.armhole = new Path().move(points.p3).curve(points.p3Cp1, points.p0Cp2, points.p0).hide()

    diff = armhole - paths.armhole.length()
    if (diff < -1 || diff > 1) {
      points.p3 = points.p0.shift(331.965149, 145.468319 * (ease + 1) * sizeFactor + diff)
    }
    iter++
  } while ((diff < -1 || diff > 1) && iter < 100)

  points.p1hm = points.p1.shift(90, 117 * (ease + 1) * sizeFactor * hem)
  points.p2hm = utils.beamIntersectsY(points.p2, points.p3, points.p1hm.y)
  points.p1h = points.p1hm.flipY(points.p1)
  points.p2h = points.p2hm.flipY(points.p2)

  paths.seamSA = new Path()
    .move(points.p1h)
    .line(points.p2h)
    .line(points.p2)
    .line(points.p3)
    .curve(points.p3Cp1, points.p0Cp2, points.p0)
    .hide()

  paths.seam = paths.seamSA.clone().line(points.p1).line(points.p0).close().unhide()

  macro('cutonfold', {
    from: points.p0,
    to: points.p1,
  })

  store.cutlist.addCut({ material: 'fabric', cut: 2 })

  // Complete?
  if (complete) {
    points.logo = points.p0.shiftFractionTowards(points.p2, 0.5)
    snippets.logo = new Snippet('logo', points.logo).attr('data-scale', 0.5)

    macro('title', {
      at: points.logo.shift(-90, waist / 3).shift(-180, waist / 4),
      nr: 4,
      title: 'shortSleeve',
      scale: 0.5,
    })

    paths.hem = new Path().move(points.p1).line(points.p2).addClass('dashed')

    if (sa) {
      paths.sa = paths.seamSA.offset(sa).close().attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.p0,
      to: points.p3,
      y: points.p0.y - sa - 15,
    })
    macro('hd', {
      from: points.p2,
      to: points.p3,
      y: points.p3.y - sa - 15,
    })
    macro('hd', {
      from: points.p1h,
      to: points.p2h,
      y: points.p2h.y + sa + 15,
    })
    macro('vd', {
      from: points.p1h,
      to: points.p0,
      x: points.p1h.x - sa - 15,
    })
    macro('vd', {
      from: points.p0,
      to: points.p3,
      x: points.p3.x + sa + 15,
    })
    macro('vd', {
      from: points.p3,
      to: points.p2,
      x: points.p3.x + sa + 15,
    })
    macro('vd', {
      from: points.p2,
      to: points.p2h,
      x: points.p3.x + sa + 15,
    })
  }

  if (options.sleeveType != 'short') {
    part.hide()
  }

  return part
}

export const shortsleeve = {
  name: 'shortsleeve',
  after: back,
  options: {
    sleeveType: { dflt: 'short', list: ['short', 'long'], menu: 'style' },
    hem: { pct: 10, min: 0, max: 30, menu: 'advanced' },
  },
  plugins: [pluginBundle],
  draft: draftShortsleeve,
}
