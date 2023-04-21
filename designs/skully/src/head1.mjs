import { pluginBundle } from '@freesewing/plugin-bundle'
import { cheek } from './cheek.mjs'
import { forehead } from './forehead.mjs'

function draftHead1({
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
  const textAttribute = 'text-xs center'
  const sizeFactor = store.get('sizeFactor')

  points.point0 = new Point(0, 0)
  points.point0Cp2 = points.point0.shift(270.9766531413822, 42.41716221059584 * sizeFactor)
  points.point2 = points.point0.shift(254.08224234639044, 161.93553876093907 * sizeFactor)
  points.point2Cp2 = points.point2.shift(105.78717948197567, 54.27380801428633 * sizeFactor)
  points.point2Cp1 = points.point2.shift(75.48077210575057, 107.97156739510459 * sizeFactor)
  points.point1 = points.point0.shift(180, 72.005 * sizeFactor)
  points.point1Cp1 = points.point1.shift(268.60871199245156, 55.97160080799901 * sizeFactor)

  points.point0 = points.point0.shift(270, 5)
  points.point0Cp2 = points.point0.shift(270.9766531413822, 42.41716221059584 * sizeFactor)

  paths.firstSeam = new Path()
    .move(points.point1)
    .curve(points.point1Cp1, points.point2Cp2, points.point2)
    .setText(complete ? '20' : '', textAttribute)
    .addClass('hidden')

  points.fs1 = paths.firstSeam.shiftAlong(store.get('firstSeam'))
  points.fs2 = paths.firstSeam.shiftAlong(store.get('firstSeam') + store.get('templeToJaw'))

  store.set(
    'upperJawToLowerJaw',
    paths.firstSeam.length() - store.get('firstSeam') - store.get('templeToJaw')
  )

  paths.secondSeam = new Path()
    .move(points.point2)
    .curve(points.point2Cp1, points.point0Cp2, points.point0)
    .setText(complete ? '17' : '', textAttribute)
    .addClass('hidden')

  paths.top = new Path()
    .move(points.point0)
    .line(points.point1)
    .setText(complete ? '19' : '', textAttribute)
    .addClass('hidden')

  store.set('secondSeam', paths.secondSeam.length())

  paths.seam = new Path()
    .move(points.point0)
    .join(paths.top)
    .join(paths.firstSeam)
    .join(paths.secondSeam)
    .close()

  // Complete?
  if (complete) {
    points.title = points.point2.shiftFractionTowards(points.point1, 0.65).shift(0, 10 * sizeFactor)
    macro('title', {
      nr: 3,
      at: points.title,
      scale: 0.5,
      title: 'head' + '1',
    })
    // points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    // snippets.logo = new Snippet('logo', points.logo)
    // points.text = points.logo
    //   .shift(-90, w / 8)

    snippets.n1 = new Snippet('notch', points.fs1)
    snippets.n2 = new Snippet('notch', points.fs2)

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.point1,
      to: points.point2,
      y: points.point2.y + sa + 10,
    })
    macro('hd', {
      from: points.point2,
      to: points.point0,
      y: points.point2.y + sa + 10,
    })
    macro('vd', {
      from: points.point0,
      to: points.point2,
      x: points.point0.x + sa + 15,
    })
    macro('vd', {
      from: points.point2,
      to: points.point1,
      x: points.point1.x - sa - 15,
    })
    macro('ld', {
      from: points.point0,
      to: points.point1,
      d: 5,
    })
    macro('ld', {
      from: points.point2,
      to: points.fs2,
      d: 5,
    })
    macro('ld', {
      from: points.point2,
      to: points.fs1,
      d: 15,
    })
  }

  return part
}

export const head1 = {
  name: 'head1',
  after: [cheek, forehead],
  plugins: [pluginBundle],
  draft: draftHead1,
}
