import { pluginBundle } from '@freesewing/plugin-bundle'
import { cheek } from './cheek.mjs'

function draftForehead({
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
  points.point0Cp1 = points.point0.shift(241.92955090220636, 37.666339998598225 * sizeFactor)
  points.point0Cp2 = points.point0.shift(333.9339465987448, 38.41308527689494 * sizeFactor)
  points.point1 = points.point0.shift(255.81688050452775, 105.61426225557886 * sizeFactor)
  points.point1Cp2 = points.point1.shift(122.25481630103288, 16.221492810466046 * sizeFactor)
  points.point2 = points.point0.shift(260.36453213741225, 104.78002255825727 * sizeFactor)
  points.point2Cp1 = points.point2.shift(104.52547665837686, 6.962227517109787 * sizeFactor)
  points.point3 = points.point0.shift(266.83135324063875, 91.72676538115797 * sizeFactor)
  points.point3Cp1 = points.point3.shift(10.824271939403667, 7.255955140434657 * sizeFactor)
  points.point3Cp2 = points.point3.shift(190.82219510192064, 8.8744083082141 * sizeFactor)
  points.point4 = points.point0.shift(279.23029819067256, 99.89481626481647 * sizeFactor)
  points.point4Cp2 = points.point4.shift(109.3914373863736, 10.114793621226355 * sizeFactor)
  points.point5 = points.point0.shift(285.6356187763194, 96.73748550220853 * sizeFactor)
  points.point5Cp1 = points.point5.shift(322.25160644653687, 21.112881376069897 * sizeFactor)
  points.point6 = points.point0.shift(299.0865415436474, 123.293691591622 * sizeFactor)
  points.point6Cp1 = points.point6.shift(102.44153405115529, 30.07799330075059 * sizeFactor)
  points.point6Cp2 = points.point6.shift(171.33241486296131, 9.49614011059247 * sizeFactor)
  points.point7 = points.point0.shift(301.8945694309706, 53.41879968784397 * sizeFactor)
  points.point7Cp1 = points.point7.shift(330.8064552671208, 26.14383661592154 * sizeFactor)
  points.point7Cp2 = points.point7.shift(306.82890730505164, 20.883100248765764 * sizeFactor)
  points.point8 = points.point0.shift(315.99934749521526, 121.10503287183268 * sizeFactor)
  points.point8Cp2 = points.point8.shift(138.225501502238, 23.326308173390803 * sizeFactor)
  points.point9 = points.point0.shift(325.07215199461336, 129.7747702101221 * sizeFactor)
  points.point9Cp1 = points.point9.shift(126.07355572621562, 42.01723333347864 * sizeFactor)

  paths.firstSeam = new Path()
    .move(points.point9)
    .curve(points.point9Cp1, points.point0Cp2, points.point0)
    .setText(complete ? '20' : '', textAttribute)
    .addClass('hidden')

  store.set('firstSeam', paths.firstSeam.length())
  store.set(
    'templeTop',
    new Path().move(points.point8).line(points.point9).length() +
      new Path()
        .move(points.point5)
        .curve(points.point5Cp1, points.point6Cp2, points.point6)
        .length()
  )

  paths.eyeTop = new Path()
    .move(points.point2)
    .curve(points.point2Cp1, points.point3Cp2, points.point3)
    .curve(points.point3Cp1, points.point4Cp2, points.point4)
    .setText(complete ? 'eyeTop' + ' (4)' : '', textAttribute)
    .addClass('hidden')

  paths.seam1 = new Path()
    .move(points.point1)
    .line(points.point2)
    .setText(complete ? '1' : '', textAttribute)
    .addClass('hidden')

  paths.seam2 = new Path()
    .move(points.point4)
    .line(points.point5)
    .setText(complete ? '2' : '', textAttribute)
    .addClass('hidden')

  paths.seam6a = new Path()
    .move(points.point5)
    .curve(points.point5Cp1, points.point6Cp2, points.point6)
    .setText(complete ? '6' : '', textAttribute)
    .attr('data-text-text-decoration', 'underline')
    .addClass('hidden')

  paths.seam6b = new Path()
    .move(points.point8)
    .line(points.point9)
    .setText(complete ? '6' : '', textAttribute)
    .attr('data-text-text-decoration', 'underline')
    .addClass('hidden')

  paths.seam7 = new Path()
    .move(points.point0)
    .curve(points.point0Cp1, points.point1Cp2, points.point1)
    .setText(complete ? '7' : '', textAttribute)
    .addClass('hidden')

  paths.seam = new Path()
    .move(points.point0)
    .join(paths.seam7)
    .join(paths.seam1)
    .join(paths.eyeTop)
    .join(paths.seam2)
    .join(paths.seam6a)
    .line(points.point8)
    .join(paths.seam6b)
    .curve(points.point9Cp1, points.point0Cp2, points.point0)
    .close()

  paths.dart = new Path()
    .move(points.point6)
    .curve(points.point6Cp1, points.point7Cp2, points.point7)
    .curve(points.point7Cp1, points.point8Cp2, points.point8)

  store.set('eyeTop', paths.eyeTop.length())

  // Complete?
  if (complete) {
    points.title = points.point3Cp1.shiftFractionTowards(points.point0, 0.3)
    macro('title', {
      nr: 2,
      at: points.title,
      scale: 0.5,
      title: 'forehead',
    })

    snippets.n1 = new Snippet('notch', points.point2)
    snippets.n2 = new Snippet('bnotch', points.point4)

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
    points.pointX = paths.seam.edge('left')

    macro('hd', {
      from: points.point0,
      to: points.point9,
      y: points.point0.y - sa - 15,
    })
    macro('hd', {
      from: points.pointX,
      to: points.point0,
      y: points.point0.y - sa - 15,
    })
    macro('hd', {
      from: points.point6,
      to: points.point8,
      y: points.point6.y + sa + 5,
    })
    macro('hd', {
      from: points.point6,
      to: points.point9,
      y: points.point6.y + sa + 15,
    })
    macro('hd', {
      from: points.point5,
      to: points.point6,
      y: points.point6.y + sa + 5,
    })
    macro('hd', {
      from: points.point4,
      to: points.point6,
      y: points.point6.y + sa + 15,
    })
    macro('hd', {
      from: points.point2,
      to: points.point6,
      y: points.point6.y + sa + 25,
    })
    macro('hd', {
      from: points.point1,
      to: points.point6,
      y: points.point6.y + sa + 35,
    })
    macro('hd', {
      from: points.pointX,
      to: points.point6,
      y: points.point6.y + sa + 45,
    })
    macro('hd', {
      from: points.point0,
      to: points.point7,
      y: points.point7.y,
    })

    macro('vd', {
      from: points.point5,
      to: points.point0,
      x: points.pointX.x - sa - 10,
    })
    macro('vd', {
      from: points.point4,
      to: points.point0,
      x: points.pointX.x - sa - 20,
    })
    macro('vd', {
      from: points.point1,
      to: points.point0,
      x: points.pointX.x - sa - 30,
    })
    macro('vd', {
      from: points.point2,
      to: points.point0,
      x: points.pointX.x - sa - 40,
    })
    macro('vd', {
      from: points.point0,
      to: points.point9,
      x: points.point9.x + sa + 10,
    })
    macro('vd', {
      from: points.point0,
      to: points.point8,
      x: points.point9.x + sa + 20,
    })
    macro('vd', {
      from: points.point0,
      to: points.point6,
      x: points.point9.x + sa + 30,
    })
    macro('vd', {
      from: points.point0,
      to: points.point7,
      x: points.point0.x,
    })
  }

  return part
}

export const forehead = {
  name: 'forehead',
  after: cheek,
  plugins: [pluginBundle],
  draft: draftForehead,
}
