import { pluginBundle } from '@freesewing/plugin-bundle'
import { convertPoints } from './pointsUtil.mjs'
import { cheek } from './cheek.mjs'
import { head1 } from './head1.mjs'

function draftHead2({
  options,
  Point,
  Path,
  points,
  paths,
  Snippet,
  snippets,
  complete,
  sa,
  store,
  utils,
  paperless,
  macro,
  part,
}) {
  console.log('head2')
  const textAttribute = 'text-xs center'
  const sizeFactor = store.get('sizeFactor')

  points.point0 = new Point(0, 0)
  points.point0Cp1 = points.point0.shift(269.3443191225503, 29.448928299685203 * sizeFactor)
  points.point1 = points.point0.shift(257.7901473243395, 66.12988849226953 * sizeFactor)
  points.point1Cp1 = points.point1.shift(268.2738211037443, 30.242724116719366 * sizeFactor)
  points.point1Cp2 = points.point1.shift(88.2745252696326, 18.83053830882166 * sizeFactor)
  points.point2 = points.point0.shift(272.3327760921532, 153.20596573567235 * sizeFactor)
  points.point3 = points.point0.shift(282.5001868336755, 164.15422647315543 * sizeFactor)
  points.point3Cp1 = points.point3.shift(81.44269285511335, 54.758598457228615 * sizeFactor)
  points.point4 = points.point0.shift(340.927384878832, 52.16879559660159 * sizeFactor)
  points.point4Cp2 = points.point4.shift(274.04106104609286, 50.57373626695976 * sizeFactor)

  let secondSeam = store.get('secondSeam')

  let iterations = 0
  var p
  do {
    iterations++

    p = new Path()
      .move(points.point0)
      .curve(points.point0Cp1, points.point1Cp2, points.point1)
      .curve_(points.point1Cp1, points.point2)

    if (secondSeam - p.length() > 0.1 || secondSeam - p.length() < -0.1) {
      points.point0 = points.point0.shift(90, secondSeam - p.length())
      points.point1 = points.point1.shift(90, secondSeam - p.length())
      points.point0Cp1 = points.point0.shift(269.3443191225503, 29.448928299685203 * sizeFactor)
      points.point1Cp1 = points.point1.shift(268.2738211037443, 30.242724116719366 * sizeFactor)
      points.point1Cp2 = points.point1.shift(88.2745252696326, 18.83053830882166 * sizeFactor)
      points.point0Cp2 = points.point0.shift(0, 15 * sizeFactor)
    }
  } while (iterations < 100 && (secondSeam - p.length() > 1 || secondSeam - p.length() < -1))

  if (iterations >= 100) {
    log.error('Something is not quite right here!')
  }
  console.log({ iterations: iterations })

  points.dartPoint0 = new Path()
    .move(points.point3)
    .curve(points.point3Cp1, points.point4Cp2, points.point4)
    .shiftAlong(99.23273836900117 * sizeFactor)
  // points.dartPoint0Cp1 = points.dartPoint0.clone()
  points.dartPoint1 = points.point0.shift(285.96197961706986, 65.4910471438654 * sizeFactor)
  points.dartPoint1Cp1 = points.dartPoint1.shift(
    354.74216521134053,
    13.662486193954589 * sizeFactor
  )
  points.dartPoint1Cp2 = points.dartPoint1.shift(
    356.55115250146685,
    13.680777207454268 * sizeFactor
  )
  points.dartPoint2 = new Path()
    .move(points.point3)
    .curve(points.point3Cp1, points.point4Cp2, points.point4)
    .shiftAlong(92.81578231343269 * sizeFactor)

  paths.secondSeam = new Path()
    .move(points.point0)
    ._curve(points.point1Cp2, points.point1)
    .curve_(points.point1Cp1, points.point2)
    .setText('17', textAttribute)
    .addClass('hidden')

  paths.thirdSeam = new Path()
    .move(points.point3)
    .curve(points.point3Cp1, points.point4Cp2, points.point4)
    .setText('18', textAttribute)
    .addClass('hidden')

  paths.top = new Path()
    .move(points.point4)
    .curve(points.point4, points.point0Cp2, points.point0)
    .setText('19', textAttribute)
    .addClass('hidden')

  paths.bottom = new Path()
    .move(points.point2)
    .line(points.point3)
    .setText('21', textAttribute)
    .addClass('hidden')

  store.set('thirdSeam', paths.thirdSeam.length() - points.dartPoint0.dist(points.dartPoint2))
  store.set('head2width', points.point2.dist(points.point3))
  paths.dart = new Path()
    .move(points.dartPoint0)
    ._curve(points.dartPoint1Cp2, points.dartPoint1)
    .curve_(points.dartPoint1Cp1, points.dartPoint2)

  paths.seam = new Path()
    .move(points.point0)
    .join(paths.secondSeam)
    .join(paths.bottom)
    .join(paths.thirdSeam)
    .join(paths.top)
    .close()

  // Complete?
  if (complete) {
    points.title = points.point0.shiftFractionTowards(points.point3, 0.25)
    macro('title', {
      nr: 4,
      at: points.title,
      scale: 0.5,
      title: 'head' + '2',
    })
    // points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    // snippets.logo = new Snippet('logo', points.logo)
    // points.text = points.logo
    //   .shift(-90, w / 8)
    //   .attr('data-text', 'hello')
    //   .attr('data-text-class', 'center')

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + sa + 15,
    })
    macro('vd', {
      from: points.bottomRight,
      to: points.topRight,
      x: points.topRight.x + sa + 15,
    })
  }

  return part
}

export const head2 = {
  name: 'head2',
  after: [cheek, head1],
  plugins: [pluginBundle],
  draft: draftHead2,
}
