import { pluginBundle } from '@freesewing/plugin-bundle'
import { cheek } from './cheek.mjs'
import { eye } from './eye.mjs'
import { forehead } from './forehead.mjs'
import { convertPoints } from './pointsUtil.mjs'

function draftNose({
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
  paperless,
  utils,
  macro,
  part,
}) {
  console.log('nose')
  const textAttribute = 'text-xs center'
  const sizeFactor = store.get('sizeFactor')

  var noseSide = store.get('noseSide')
  var noseHeight = store.get('noseHeight')
  var noseCircumference = noseSide * 2
  var noseDiameter = (noseCircumference / Math.PI) * 2

  const c = 0.55191502449351

  points.point0 = new Point(0, 0)
  points.point2 = points.point0.shift(90, noseHeight)
  points.point0Cp1 = points.point0.shift(315, noseHeight)
  points.point2Cp2 = points.point2.shift(325, noseHeight / 3)

  paths.p1 = new Path()
    .move(points.point0)
    .curve(points.point0Cp1, points.point2Cp2, points.point2)
    .hide()

  points.pRotate = points.point0.shift(30, noseHeight)

  paths.p0p1 = new Path().move(points.point0).line(points.point2).setClass('dashed mark')

  points.point1 = points.pRotate.shiftTowards(points.point2, noseHeight * -1)

  points.point1Cp2 = points.point1.shift(points.point1.angle(points.point2) + 55, noseHeight / 3)

  var iteration = 0
  var pl
  do {
    iteration++

    points.point1 = points.point1.rotate(-0.5, points.point2)
    points.point1Cp2 = points.point1Cp2.rotate(-0.5, points.point2)
    points.point0Cp1 = points.point0Cp1.rotate(-0.5, points.point2)
    paths.p1 = new Path()
      .move(points.point0)
      .curve(points.point0Cp1, points.point1Cp2, points.point1)
      .setText('nose' + ' (10)', textAttribute)

    pl = paths.p1.length()
    console.log({ i: iteration, pl: pl, noseSide: noseSide })
  } while (iteration < 100 && pl - noseSide > 1)

  points.pMiddle1 = points.point2.shiftFractionTowards(points.point1, 0.5)

  points.point3 = points.point1.flipX()
  points.point3Cp1 = points.point1Cp2.flipX()
  points.point0Cp2 = points.point0Cp1.flipX()
  points.pMiddle2 = points.pMiddle1.flipX()

  paths.p2 = new Path()
    .move(points.point3)
    .curve(points.point3Cp1, points.point0Cp2, points.point0)
    .setText('nose' + ' (10)', textAttribute)

  paths.seam = new Path()
    .move(points.point0)
    .join(paths.p1)
    .line(points.point2)
    .line(points.point3)
    .join(paths.p2)
    .close()

  // Complete?
  if (complete) {
    snippets.n1 = new Snippet('bnotch', points.point0)
    snippets.n2 = new Snippet('notch', points.point1)
    snippets.n3 = new Snippet('notch', points.point2)
    snippets.n4 = new Snippet('notch', points.point3)

    macro('sewtogether', {
      from: points.point1.shiftFractionTowards(points.point2, 0.25),
      to: points.point1.shiftFractionTowards(points.point2, 0.75),
      hinge: true,
      prefix: 'st1',
    })
    macro('sewtogether', {
      from: points.point2.shiftFractionTowards(points.point3, 0.25),
      to: points.point2.shiftFractionTowards(points.point3, 0.75),
      hinge: true,
      prefix: 'st2',
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

export const nose = {
  name: 'nose',
  after: [cheek, forehead, eye],
  plugins: [pluginBundle],
  draft: draftNose,
}
