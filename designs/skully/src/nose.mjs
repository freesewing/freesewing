import { pluginBundle } from '@freesewing/plugin-bundle'
import { cheek } from './cheek.mjs'
import { eye } from './eye.mjs'
import { forehead } from './forehead.mjs'

function draftNose({
  Point,
  Path,
  points,
  paths,
  Snippet,
  snippets,
  complete,
  sa,
  log,
  store,
  paperless,
  macro,
  part,
}) {
  console.log('nose')
  const textAttribute = 'text-xs center'

  const noseSide = store.get('noseSide')
  const noseHeight = store.get('noseHeight')

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

  var iterations = 0
  var pl
  do {
    iterations++

    points.point1 = points.point1.rotate(-0.5, points.point2)
    points.point1Cp2 = points.point1Cp2.rotate(-0.5, points.point2)
    points.point0Cp1 = points.point0Cp1.rotate(-0.5, points.point2)
    paths.p1 = new Path()
      .move(points.point0)
      .curve(points.point0Cp1, points.point1Cp2, points.point1)
      .setText(complete ? 'nose' + ' (10)' : '', textAttribute)

    pl = paths.p1.length()
  } while (iterations < 100 && pl - noseSide > 1)
  if (iterations >= 100) {
    log.error('Generating nose could not be made to fit in 100 iterations!')
  }

  points.pMiddle1 = points.point2.shiftFractionTowards(points.point1, 0.5)

  points.point3 = points.point1.flipX()
  points.point3Cp1 = points.point1Cp2.flipX()
  points.point0Cp2 = points.point0Cp1.flipX()
  points.pMiddle2 = points.pMiddle1.flipX()

  paths.p2 = new Path()
    .move(points.point3)
    .curve(points.point3Cp1, points.point0Cp2, points.point0)
    .setText(complete ? 'nose' + ' (10)' : '', textAttribute)

  paths.seam = new Path()
    .move(points.point0)
    .join(paths.p1)
    .line(points.point2)
    .line(points.point3)
    .join(paths.p2)
    .close()

  // Complete?
  if (complete) {
    points.title = points.point0.shiftFractionTowards(points.point3, 0.5)
    macro('title', {
      nr: 12,
      at: points.title,
      scale: 0.15,
      rotation: 325,
      title: 'nose',
    })

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

    if (sa) {
      // Doing a trim() on the SA will remove the wrong part of the SA ;-)
      // paths.sa = paths.seam.offset(sa).trim().attr('class', 'fabric sa')
      const pathSA1 = new Path()
        .move(points.point0)
        .join(paths.p1)
        .line(points.point2)
        .offset(sa)
        .hide()
      const pathSA2 = new Path()
        .move(points.point2)
        .line(points.point3)
        .curve(points.point3Cp1, points.point0Cp2, points.point0)
        .offset(sa)
        .hide()
      const pSa1 = pathSA1.intersectsX(0)[0]
      paths.sa1 = pathSA1.split(pSa1)[1].hide()
      const pSa2 = pathSA2.intersectsX(0)[0]
      paths.sa2 = pathSA2.split(pSa2)[0].hide()
      paths.sa = new Path()
        .move(pSa1)
        .join(paths.sa1)
        .join(paths.sa2)
        .close()
        .attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    points.pointY1 = new Path()
      .move(points.point0)
      .curve(points.point0Cp1, points.point1Cp2, points.point1)
      .edge('bottom')
    points.pointY2 = new Path()
      .move(points.point0)
      .curve(points.point0Cp2, points.point3Cp1, points.point3)
      .edge('bottom')

    macro('vd', {
      from: points.point2,
      to: points.point1,
      x: points.point1.x + sa + 5,
    })
    macro('vd', {
      from: points.pointY1,
      to: points.point2,
      x: points.point3.x - sa - 5,
    })

    macro('hd', {
      from: points.point0,
      to: points.point1,
      y: points.point2.y - sa - 5,
    })
    macro('hd', {
      from: points.point3,
      to: points.point0,
      y: points.point2.y - sa - 5,
    })
    macro('hd', {
      from: points.pointY1,
      to: points.point1,
      y: points.pointY2.y + sa + 5,
    })
    macro('hd', {
      from: points.pointY2,
      to: points.pointY1,
      y: points.pointY2.y + sa + 5,
    })
    macro('hd', {
      from: points.point3,
      to: points.pointY2,
      y: points.pointY2.y + sa + 5,
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
