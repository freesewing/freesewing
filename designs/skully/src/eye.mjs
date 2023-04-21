import { pluginBundle } from '@freesewing/plugin-bundle'
import { cheek } from './cheek.mjs'
import { forehead } from './forehead.mjs'

function draftEye({
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
  console.log('eye')
  const textAttribute = 'text-xs center'

  const eyeCircumference = store.get('eyeBottom') + store.get('eyeTop')
  const eyeDiameter = (eyeCircumference / Math.PI) * 2

  const c = 0.55191502449351
  points.point0 = new Point(0, 0)
  points.point2 = points.point0.shift(0, eyeDiameter / 2).shift(90, eyeDiameter / 2)
  points.point0Cp1 = points.point0.shift(0, (eyeDiameter / 2) * c)
  points.point2Cp2 = points.point2.shift(270, (eyeDiameter / 2) * c)

  const p = new Path().move(points.point0).curve(points.point0Cp1, points.point2Cp2, points.point2)

  points.point1 = p.shiftAlong(p.length() / 2)

  const sp = p.split(points.point1)

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

  paths.eye = new Path()
    .move(points.p4)
    .curve(points.p4Cp1, points.p3Cp2, points.p3)
    .curve(points.p3Cp1, points.p0Cp2, points.p0)
    .curve(points.p0Cp1, points.p1Cp2, points.p1)
    .curve(points.p1Cp1, points.p2Cp2, points.p2)

  points.pointNotch = paths.eye.shiftAlong(store.get('eyeTop'))

  const ps = paths.eye.split(points.pointNotch)
  paths.eyeTop = ps[0].clone().setText(complete ? 'eyeTop' + ' (4)' : '', textAttribute)
  paths.eyeBottom = ps[1].clone().setText(complete ? 'eyeBottom' + ' (4)' : '', textAttribute)

  paths.seam = new Path()
    .move(points.p4)
    .join(paths.eyeTop)
    .join(paths.eyeBottom)
    .line(points.p4)
    .close()

  // Complete?
  if (complete) {
    points.title = points.p4
      .shiftFractionTowards(points.p1, 0.45)
      .shiftFractionTowards(points.p0, 0.5)

    macro('title', {
      nr: 9,
      at: points.title,
      scale: 0.3,
      title: 'eye',
    })

    points.ps3a = points.p2.shiftFractionTowards(points.p4, 0.25)
    points.ps3aCp1 = points.ps3a.shift(270, points.p4.dist(points.p2) / 6)
    points.ps3 = points.p2.shiftFractionTowards(points.p4, 0.5)
    points.ps3cross1 = points.ps3.shiftFractionTowards(points.p0, 0.1)
    points.ps3cross2 = points.ps3.shiftFractionTowards(points.p0, -0.1)
    points.ps3b = points.p2.shiftFractionTowards(points.p4, 0.75)
    points.ps3bCp1 = points.ps3b.shift(270, points.p4.dist(points.p2) / 6)

    macro('sewtogether', {
      from: points.ps3a,
      to: points.ps3b,
      hinge: true,
    })

    snippets.n1 = new Snippet('notch', points.p2)
    snippets.n2 = new Snippet('notch', points.p4)
    snippets.n3 = new Snippet('bnotch', points.pointNotch)

    // points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    // snippets.logo = new Snippet('logo', points.logo)
    // points.text = points.logo
    //   .shift(-90, w / 8)

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.p4,
      to: points.pointNotch,
      y: points.p0.y + sa + 15,
    })
    macro('hd', {
      from: points.p4,
      to: points.p2,
      y: points.p2.y - sa - 15,
    })
    macro('vd', {
      from: points.p2,
      to: points.p0,
      x: points.p2.x + sa + 15,
    })
  }

  return part
}

export const eye = {
  name: 'eye',
  after: [cheek, forehead],
  plugins: [pluginBundle],
  draft: draftEye,
}
