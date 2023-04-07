import { pluginBundle } from '@freesewing/plugin-bundle'
import { cheek } from './cheek.mjs'
import { forehead } from './forehead.mjs'
import { convertPoints } from './pointsUtil.mjs'

// const markers = `
// <marker id="sewTogetherStart" markerWidth="4" markerHeight="4" orient="auto" refX="0" refY="2">
//   <path class="note stroke-sm" d="M4,4 L0,2 4,0" />
// </marker>
// <marker id="sewTogetherEnd" markerWidth="4" markerHeight="4" orient="auto" refX="4" refY="2">
//   <path class="note stroke-sm" d="M0,0 L4,2 0,4" />
// </marker>
// <marker id="sewTogetherCross" markerWidth="4" markerHeight="4" orient="auto" refX="2" refY="2">
//   <path d="M 0,0 L 4,4 M 4,0 L 0,4" class="note stroke-sm"/>
// </marker>
// `

// export const sewTogetherPlugin = {
//   name: 'sewTogetherplugin',
//   version: '0.01.01',
//   hooks: {
//     preRender: (svg) => {
//       console.log({ preRender: svg })
//       if (svg.defs.indexOf(markers) === -1) svg.defs += markers
//     },
//   },
//   macros: {
//     sewTogether: function (so, { points, paths, Path, complete, scale, sa }) {
//       if (so === false) {
//         delete points.sewTogetherFrom
//         delete points.sewTogetherTo
//         delete points.cutonfoldVia1
//         delete points.cutonfoldVia2
//         delete paths.cutonfold
//         // setCutOnFold relies on plugin-cutlist
//         return true
//       }
//       so = {
//         prefix: 'sewTogether',
//         ...so,
//       }
//       if (complete) {
//         if (null == so.middle) {
//           so.middle = so.from.shiftFractionTowards(so.to, 0.5)
//         }
//         points[so.prefix + 'From'] = so.from
//         points[so.prefix + 'Middle'] = so.middle
//         points[so.prefix + 'To'] = so.to

//         points[so.prefix + 'FromCp'] = points[so.prefix + 'From'].shift(
//           points[so.prefix + 'From'].angle(points[so.prefix + 'Middle']) + 90,
//           points[so.prefix + 'From'].dist(points[so.prefix + 'Middle']) / 1.5
//         )
//         points[so.prefix + 'ToCp'] = points[so.prefix + 'To'].shift(
//           points[so.prefix + 'To'].angle(points[so.prefix + 'Middle']) - 90,
//           points[so.prefix + 'To'].dist(points[so.prefix + 'Middle']) / 1.5
//         )

//         if (so.hinge) {
//           points[so.prefix + 'Hinge'] = points[so.prefix + 'Middle'].shift(
//             points[so.prefix + 'Middle'].angle(points[so.prefix + 'To']) +
//               Math.abs(
//                 points[so.prefix + 'Middle'].angle(points[so.prefix + 'From']) -
//                   points[so.prefix + 'Middle'].angle(points[so.prefix + 'To'])
//               ) /
//                 2 +
//               (sa ? 180 : 0),
//             sa
//               ? sa
//               : Math.min(
//                   points[so.prefix + 'From'].dist(points[so.prefix + 'Middle']),
//                   points[so.prefix + 'From'].dist(points[so.prefix + 'Middle'])
//                 ) / 4
//           )
//           paths[so.prefix + 'SewTogetherHinge'] = new Path()
//             .move(points[so.prefix + 'Middle'])
//             .line(points[so.prefix + 'Hinge'])
//             .attr('marker-start', 'url(#sewTogetherCross)')
//             .attr('class', 'dotted note stroke-sm')
//         }
//         paths[so.prefix + 'SewTogether'] = new Path()
//           .move(points[so.prefix + 'From'])
//           .curve(points[so.prefix + 'FromCp'], points[so.prefix + 'ToCp'], points[so.prefix + 'To'])
//           .attr('class', 'dotted note stroke-sm')
//           .attr('marker-start', 'url(#sewTogetherStart)')
//           .attr('marker-end', 'url(#sewTogetherEnd)')
//           .attr('data-text', 'sewTogether')
//           .attr('data-text-class', 'center fill-note text-xs')
//       }
//     },
//   },
// }

function draftEye({
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
  svg,
}) {
  console.log('eye')
  const textAttribute = 'text-xs center'
  const sizeFactor = store.get('sizeFactor')

  var eyeCircumference = store.get('eyeBottom') + store.get('eyeTop')
  var eyeDiameter = (eyeCircumference / Math.PI) * 2

  const c = 0.55191502449351
  points.point0 = new Point(0, 0)
  points.point2 = points.point0.shift(0, eyeDiameter / 2).shift(90, eyeDiameter / 2)
  points.point0Cp1 = points.point0.shift(0, (eyeDiameter / 2) * c)
  points.point2Cp2 = points.point2.shift(270, (eyeDiameter / 2) * c)

  let p = new Path().move(points.point0).curve(points.point0Cp1, points.point2Cp2, points.point2)

  points.point1 = p.shiftAlong(p.length() / 2)

  let sp = p.split(points.point1)

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

  let ps = paths.eye.split(points.pointNotch)
  paths.eyeTop = ps[0].clone().setText('eyeTop' + ' (4)', textAttribute)
  paths.eyeBottom = ps[1].clone().setText('eyeBottom' + ' (4)', textAttribute)

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
      .shiftFractionTowards(points.p0, 0.6)

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

  console.log({ pluginBundle: pluginBundle })
  return part
}

export const eye = {
  name: 'eye',
  after: [cheek, forehead],
  // plugins: [pluginBundle, sewTogetherPlugin],
  plugins: [pluginBundle],
  draft: draftEye,
}
