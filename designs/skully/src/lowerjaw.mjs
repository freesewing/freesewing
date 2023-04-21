import { pluginBundle } from '@freesewing/plugin-bundle'
import { cheek } from './cheek.mjs'
import { uppermouth } from './uppermouth.mjs'

function draftLowerjaw({
  Point,
  Path,
  points,
  paths,
  complete,
  sa,
  log,
  store,
  paperless,
  macro,
  part,
}) {
  const textAttribute = 'text-xs center'
  const sizeFactor = store.get('sizeFactor')

  points.point0 = new Point(0, 0)
  points.point1 = points.point0.shift(174.91311161963839, 43.0264648094635 * sizeFactor)
  points.point2 = points.point0.shift(240.9901082422603, 82.64382533498798 * sizeFactor)
  points.point3 = points.point0.shift(251.1601763775522, 106.01579184725264 * sizeFactor)
  points.point4 = points.point0.shift(276.6440430845334, 116.75813357963548 * sizeFactor)
  points.point5 = points.point0.shift(264.48800048134507, 50.78381912578058 * sizeFactor)

  const mouthTop = store.get('mouthTop')

  points.point0 = new Point(0, 0)
  points.point0Cp2 = points.point0.shift(354.9481781658739, 16.659715303689914 * sizeFactor)
  points.point1 = points.point0.shift(264.91311161963836, 43.0264648094635 * sizeFactor)
  points.point1Cp1 = points.point1.shift(0, 53.02160375733651 * sizeFactor)
  points.point2 = points.point0.shift(331.14662128979205, 83.05325951149062 * sizeFactor)
  points.point2Cp1 = points.point2.shift(23.491413537740165, 11.818521142681087 * sizeFactor)
  points.point2Cp2 = points.point2.shift(203.48599545649284, 6.360957553702122 * sizeFactor)
  points.point3 = points.point0.shift(341.2414817357221, 106.45865437980989 * sizeFactor)
  points.point3Cp1 = points.point3.shift(83.22770461819215, 15.755934754878917 * sizeFactor)
  points.point3Cp2 = points.point3.shift(263.2247839478168, 8.959567958333654 * sizeFactor)
  points.point4 = points.point0.shift(6.617587088273078, 117.22282297600707 * sizeFactor)
  points.point4Cp1 = points.point4.shift(171.59670910061834, 40.160161877163844 * sizeFactor)
  points.point4Cp2 = points.point4.shift(255.77964223723035, 21.208879767682262 * sizeFactor)
  points.point5 = points.point0.shift(354.81977589032454, 54.026610044075944 * sizeFactor)
  points.point5Cp1 = points.point5.shift(166.25960112580196, 20.659041530160696 * sizeFactor)
  points.point5Cp2 = points.point5.shift(76.26126036953632, 34.11095664483535 * sizeFactor)
  points.point0 = new Point(0, 0)

  let iterations = 0
  var p
  do {
    iterations++

    points.point5Cp1 = points.point5.shift(166.25960112580196, 20.659041530160696 * sizeFactor)
    points.point5Cp2 = points.point5.shift(76.26126036953632, 34.11095664483535 * sizeFactor)
    p = new Path().move(points.point5).curve(points.point5Cp1, points.point0Cp2, points.point0)

    points.point5 = points.point5.shift(270, (mouthTop - p.length()) * 0.5)

    console.log({ mouthTop: mouthTop, seriously: p.length() })
  } while (iterations < 100 && (mouthTop - p.length() > 1 || mouthTop - p.length() < -1))
  if (iterations >= 100) {
    log.error('Something is not quite right here!')
  }

  points.point4 = points.point4.shift(
    355,
    store.get('lowerJaw') -
      new Path()
        .move(points.point4)
        .curve(points.point4Cp1, points.point5Cp2, points.point5)
        .length()
  )
  points.point4Cp1 = points.point4.shift(171.59670910061834, 40.160161877163844 * sizeFactor)
  points.point4Cp2 = points.point4.shift(255.77964223723035, 21.208879767682262 * sizeFactor)

  paths.mouthBottom = new Path()
    .move(points.point5)
    .curve(points.point5Cp1, points.point0Cp2, points.point0)
    .setText(complete ? 'mouthBottom' + ' (13)' : '', textAttribute)
    .addClass('hidden')

  paths.lowerJaw = new Path()
    .move(points.point4)
    .curve(points.point4Cp1, points.point5Cp2, points.point5)
    .setText(complete ? 'lowerJaw' + ' (14)' : '', textAttribute)
    .addClass('hidden')

  paths.front = new Path()
    .move(points.point0)
    .line(points.point1)
    .setText(complete ? '12' : '', textAttribute)

  paths.bottomJaw = new Path()
    .move(points.point1)
    .curve(points.point1Cp1, points.point2Cp2, points.point2)
    .curve(points.point2Cp1, points.point3Cp2, points.point3)
    .curve(points.point3Cp1, points.point4Cp2, points.point4)
    .setText(complete ? 'jawBottom' + '(15)' : '', textAttribute)
    .addClass('hidden')

  paths.seam = new Path()
    .move(points.point0)
    .join(paths.front)
    .join(paths.bottomJaw)
    .join(paths.lowerJaw)
    .join(paths.mouthBottom)
    .close()

  store.set('bottomJaw', paths.bottomJaw.length())

  // Complete?
  if (complete) {
    points.title = points.point1.shiftFractionTowards(points.point4, 0.25)
    macro('title', {
      nr: 11,
      at: points.title,
      scale: 0.4,
      title: 'lowerJaw',
    })
    // points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    // snippets.logo = new Snippet('logo', points.logo)
    // points.text = points.logo
    //   .shift(-90, w / 8)

    if (sa) {
      paths.sa = paths.seam.offset(sa).trim().attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    points.pointY = new Path()
      .move(points.point4)
      .curve(points.point4Cp1, points.point5Cp2, points.point5)
      .edge('top')

    macro('hd', {
      from: points.point0,
      to: points.point5,
      y: points.pointY.y - sa - 15,
    })
    macro('hd', {
      from: points.pointY,
      to: points.point4,
      y: points.pointY.y - sa - 15,
    })
    macro('hd', {
      from: points.point1,
      to: points.point5,
      y: points.pointY.y - sa - 25,
    })
    macro('hd', {
      from: points.point5,
      to: points.point4,
      y: points.pointY.y - sa - 25,
    })
    macro('hd', {
      from: points.point1,
      to: points.point3,
      y: points.point1.y + sa + 15,
    })
    macro('hd', {
      from: points.point3,
      to: points.point4,
      y: points.point1.y + sa + 15,
    })

    macro('vd', {
      from: points.point1,
      to: points.point5,
      x: points.point1.x - sa - 15,
    })
    macro('vd', {
      from: points.point1,
      to: points.point0,
      x: points.point1.x - sa - 25,
    })
    macro('vd', {
      from: points.point1,
      to: points.pointY,
      x: points.point1.x - sa - 35,
    })
    macro('vd', {
      from: points.pointY,
      to: points.point3,
      x: points.point4.x + sa + 25,
    })
    macro('vd', {
      from: points.point4,
      to: points.point3,
      x: points.point4.x + sa + 15,
    })
  }

  return part
}

export const lowerjaw = {
  name: 'lowerjaw',
  after: [cheek, uppermouth],
  plugins: [pluginBundle],
  draft: draftLowerjaw,
}
