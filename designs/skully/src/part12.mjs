import { pluginBundle } from '@freesewing/plugin-bundle'
import { cheek } from './cheek.mjs'
import { forehead } from './forehead.mjs'
import { convertPoints } from './pointsUtil.mjs'

function draftPart12({
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
  macro,
  part,
}) {
  console.log('part12')
  const textAttribute = 'text-xs center'
  const sizeFactor = store.get('sizeFactor')

  var eyeCircumference = store.get('eyeBottom') + store.get('eyeTop')
  var eyeDiameter = (eyeCircumference / Math.PI) * 2

  const c = 0.55191502449351
  // const c = 0.75

  // points.b0 = new Point(0,0).shift(0,eyeDiameter*1.5).shift(90,eyeDiameter*1.5)
  // points.b1 = new Point(0,0).shift(180,eyeDiameter*1.5).shift(90,eyeDiameter*1.5)
  // points.b2 = new Point(0,0).shift(180,eyeDiameter*1.5).shift(270,eyeDiameter*1.5)
  // points.b3 = new Point(0,0).shift(0,eyeDiameter*1.5).shift(270,eyeDiameter*1.5)

  // paths.box = new Path()
  //   .move(points.b0)
  //   .line(points.b1)
  //   .line(points.b2)
  //   .line(points.b3)
  //   .close()

  points.point0 = new Point(0, 0)
  points.point2 = points.point0.shift(0, eyeDiameter / 2).shift(90, eyeDiameter / 2)
  points.point0Cp1 = points.point0.shift(0, (eyeDiameter / 2) * c)
  points.point2Cp2 = points.point2.shift(270, (eyeDiameter / 2) * c)

  let p = new Path().move(points.point0).curve(points.point0Cp1, points.point2Cp2, points.point2)

  points.point1 = p.shiftAlong(p.length() / 2)

  let sp = p.split(points.point1)

  // paths.p1 = sp[0].clone()
  // paths.p2 = sp[1].clone()

  points.p0 = sp[0].ops[0].to.clone()
  points.p0Cp1 = sp[0].ops[1].cp1.clone()
  points.p1Cp2 = sp[0].ops[1].cp2.clone()
  points.p1 = sp[1].ops[0].to.clone()
  points.p1Cp1 = sp[1].ops[1].cp1.clone()
  points.p2Cp2 = sp[1].ops[1].cp2.clone()
  points.p2 = sp[1].ops[1].to.clone()

  points.p0Cp1 = points.p0.shift(0, (eyeDiameter / 2) * c * 0.4)
  points.p2Cp2 = points.p2.shift(270, (eyeDiameter / 2) * c * 0.4)
  points.p1Cp1 = points.p1.shift(45, (eyeDiameter / 2) * c * 0.7)
  points.p1Cp2 = points.p1.shift(225, (eyeDiameter / 2) * c * 0.7)

  points.p0Cp2 = points.p0Cp1.flipX()
  points.p4 = points.p2.flipX()
  points.p4Cp1 = points.p2Cp2.flipX()
  points.p3 = points.p1.flipX()
  points.p3Cp2 = points.p1Cp1.flipX()
  points.p3Cp1 = points.p1Cp2.flipX()

  paths.eyeTop = new Path()
    .move(points.p4)
    .curve(points.p4Cp1, points.p3Cp2, points.p3)
    .curve(points.p3Cp1, points.point9Cp2, points.point9)
    .setText('Eye bottom (4)', textAttribute)
    .addClass('hidden')

  paths.eye = new Path()
    .move(points.p4)
    .curve(points.p4Cp1, points.p3Cp2, points.p3)
    .curve(points.p3Cp1, points.p0Cp2, points.p0)
    .curve(points.p0Cp1, points.p1Cp2, points.p1)
    .curve(points.p1Cp1, points.p2Cp2, points.p2)

  points.pointNotch = paths.eye.shiftAlong(store.get('eyeTop'))

  let ps = paths.eye.split(points.pointNotch)
  paths.eyeTop = ps[0].clone().setText('Eye top (4)', textAttribute)
  paths.eyeBottom = ps[1].clone().setText('Eye bottom (4)', textAttribute)

  paths.seam = new Path()
    .move(points.p4)
    .join(paths.eyeTop)
    .join(paths.eyeBottom)
    .line(points.p4)
    .close()

  console.log({ sLength: p.length() })
  console.log({
    nLength: new Path()
      .move(points.p4)
      .curve(points.p4Cp1, points.p3Cp2, points.p3)
      .curve(points.p3Cp1, points.p0Cp2, points.p0)
      .length(),
  })

  // Complete?
  if (complete) {
    points.title = points.p4
      .shiftFractionTowards(points.p1, 0.5)
      .shiftFractionTowards(points.p0, 0.3)
    macro('title', {
      nr: 12,
      at: points.title,
      scale: 0.3,
      title: 'eye',
    })
    snippets.n1 = new Snippet('notch', points.p2)
    snippets.n2 = new Snippet('notch', points.p4)
    snippets.n3 = new Snippet('bnotch', points.pointNotch)

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
  console.log({ points: JSON.parse(JSON.stringify(points)) })

  console.log({ paths: JSON.parse(JSON.stringify(paths)) })

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

export const part12 = {
  name: 'part12',
  after: [cheek, forehead],
  plugins: [pluginBundle],
  draft: draftPart12,
}
