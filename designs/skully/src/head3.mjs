import { pluginBundle } from '@freesewing/plugin-bundle'
import { cheek } from './cheek.mjs'
import { head2 } from './head2.mjs'
import { jawfloor } from './jawfloor.mjs'

function draftHead3({
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
  utils,
  part,
}) {
  const textAttribute = 'text-xs center'
  const sizeFactor = store.get('sizeFactor')

  points.point0 = new Point(0, 0)

  points.point0Cp2 = points.point0.shift(176.85941213458383, 24.45873430903567 * sizeFactor)
  points.point0Cp1 = points.point0.shift(80.97143471134606, 19.435805231582247 * sizeFactor)
  points.point5 = points.point0.shift(174.83014371859687, 57.4195861357429 * sizeFactor)
  points.point5Cp1 = points.point5.shift(359.48476820979687, 24.91000716579583 * sizeFactor)
  points.point4 = points.point0.shift(128.37, 82.29999999999998 * sizeFactor)
  points.point4Cp1 = points.point4.shift(280, 20 * sizeFactor)
  points.point3 = points.point0.shift(122.10525602099625, 99.24923435875874 * sizeFactor)
  points.point3Cp2 = points.point3.shift(75, 20 * sizeFactor)
  points.point2 = points.point0.shift(92.0479806305003, 131.18279286933938 * sizeFactor)
  points.point2Cp2 = points.point2.shift(286.4630945432234, 43.38779202725112 * sizeFactor)
  points.point2Cp1 = points.point2.shift(208.11590506019132, 16.689416556608613 * sizeFactor)
  points.point1 = points.point0.shift(80.96712201455671, 37.967861804426136 * sizeFactor)
  points.point1Cp2 = points.point1.shift(266.0887375411011, 17.372462375840676 * sizeFactor)
  points.point1Cp1 = points.point1.shift(86.08762325510818, 17.602020395397776 * sizeFactor)

  points.dartPoint0 = points.point4.clone()
  points.dartPoint0Cp1 = points.dartPoint0.shift(10, 15.674240045373793 * sizeFactor)
  points.dartPoint1 = points.point0.shift(93.69495535762911, 79.06034303618978 * sizeFactor)
  points.dartPoint1Cp1 = points.dartPoint1.shift(190.57289744169927, 19.19488590744941 * sizeFactor)
  points.dartPoint1Cp2 = points.dartPoint1.shift(
    206.69161019830457,
    18.019174148667343 * sizeFactor
  )
  points.dartPoint2 = points.point3.clone()
  points.dartPoint2Cp2 = points.dartPoint2.shift(345, 15.211717490145492 * sizeFactor)

  let lowerWidth = store.get('halfOfBack') - store.get('head2width')
  let tsAdjustment =
    store.get('thirdSeam') -
    new Path().move(points.point2).curve(points.point2Cp1, points.point3Cp2, points.point3).length()

  let x = utils.circlesIntersect(points.dartPoint0, tsAdjustment, points.point0, lowerWidth)
  if (x) {
    points.point5 = x[0].clone()
  } else {
    log.error('Could not make the lower part of head3 fit the other parts!')
  }

  points.point5Cp1 = points.point5.shift(359.48476820979687, 24.91000716579583 * sizeFactor)

  paths.thirdSeam1 = new Path()
    .move(points.point2)
    .curve(points.point2Cp1, points.point3Cp2, points.point3)
    .setText(complete ? '18' : '', textAttribute)
    .addClass('hidden')

  paths.thirdSeam2 = new Path()
    .move(points.point4)
    .line(points.point5)
    .setText(complete ? '18' : '', textAttribute)
    .addClass('hidden')

  paths.back = new Path()
    .move(points.point0)
    .curve(points.point0Cp1, points.point1Cp2, points.point1)
    .curve(points.point1Cp1, points.point2Cp2, points.point2)
    .setText(complete ? '19' : '', textAttribute)
    .addClass('hidden')

  paths.bottom = new Path()
    .move(points.point5)
    .line(points.point0)
    .setText(complete ? '21' : '', textAttribute)
    .addClass('hidden')

  paths.dart = new Path()
    .move(points.dartPoint0)
    .curve(points.dartPoint0Cp1, points.dartPoint1Cp2, points.dartPoint1)
    .curve(points.dartPoint1Cp1, points.dartPoint2Cp2, points.dartPoint2)

  paths.seam = new Path()
    .move(points.point0)
    .join(paths.back)
    .join(paths.thirdSeam1)
    .line(points.point4)
    .join(paths.thirdSeam2)
    .join(paths.bottom)
    .close()

  // Complete?
  if (complete) {
    points.title = points.point4
      .shiftFractionTowards(points.point1, 0.25)
      .shiftFractionTowards(points.point0, 0.25)
    macro('title', {
      nr: 5,
      at: points.title,
      scale: 0.5,
      title: 'head' + '3',
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
    points.pointX = new Path()
      .move(points.point1)
      .curve(points.point1Cp1, points.point2Cp2, points.point2)
      .edge('right')

    macro('hd', {
      from: points.dartPoint2,
      to: points.point2,
      y: points.point2.y - sa - 15,
    })
    macro('hd', {
      from: points.dartPoint2,
      to: points.pointX,
      y: points.point2.y - sa - 25,
    })
    macro('hd', {
      from: points.dartPoint2,
      to: points.point5,
      y: points.point0.y + sa + 15,
    })
    macro('hd', {
      from: points.dartPoint0,
      to: points.point5,
      y: points.point0.y + sa + 5,
    })
    macro('hd', {
      from: points.dartPoint2,
      to: points.point0,
      y: points.point0.y + sa + 25,
    })
    macro('hd', {
      from: points.dartPoint2,
      to: points.dartPoint1,
      y: points.dartPoint2.y,
    })

    macro('vd', {
      from: points.point2,
      to: points.dartPoint1,
      x: points.pointX.x + sa + 15,
    })
    macro('vd', {
      from: points.dartPoint1,
      to: points.point0,
      x: points.pointX.x + sa + 15,
    })
    macro('vd', {
      from: points.point2,
      to: points.pointX,
      x: points.pointX.x + sa + 25,
    })
    macro('vd', {
      from: points.dartPoint2,
      to: points.point2,
      x: points.dartPoint2.x - sa - 15,
    })
    macro('vd', {
      from: points.dartPoint0,
      to: points.dartPoint2,
      x: points.dartPoint2.x - sa - 15,
    })
    macro('vd', {
      from: points.point5,
      to: points.dartPoint0,
      x: points.dartPoint2.x - sa - 15,
    })
  }

  return part
}

export const head3 = {
  name: 'head3',
  after: [cheek, head2, jawfloor],
  plugins: [pluginBundle],
  draft: draftHead3,
}
