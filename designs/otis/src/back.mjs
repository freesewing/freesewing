import { pluginBundle } from '@freesewing/plugin-bundle'
import {
  adjustPoints,
  consoleLogPoints,
  scalePoints,
  addPoint,
  addPointX,
  addPointY,
} from './utils.mjs'

function draftBack({
  options,
  Point,
  Path,
  points,
  paths,
  Snippet,
  snippets,
  complete,
  sa,
  paperless,
  macro,
  part,
}) {
  // points.p0 = new Point(98.8897, 26.2563)
  // points.p0Cp1 = new Point(79.9137, 26.1003)
  // points.p1 = new Point(71.8287, 11.5563)
  // points.p1Cp1 = new Point(77.2407, 45.9003)
  // points.p1Cp2 = new Point(94.0117, 18.4603)
  // points.p2 = new Point(64.6117, 51.8473)
  // points.p2Cp2 = new Point(74.1667, 51.5803)
  // points.p3 = new Point(65.0127, 104.899)
  // points.p3Cp1 = new Point(73.8997, 108.708)
  // points.p4 = new Point(78.1927, 122.214)
  // points.p4Cp1 = new Point(81.0847, 128.471)
  // points.p4Cp2 = new Point(74.1497, 113.469)
  // points.p5 = new Point(90.0697, 135.368)
  // points.p5Cp1 = new Point(90.0027, 146.394)
  // points.p5Cp2 = new Point(83.4547, 135.135)
  // points.p6 = new Point(90.0697, 146.325)
  // points.p7 = new Point(98.8227, 146.325)
  // points.p0 = new Point(0,0)
  // points.p0Cp1 = new Point(-18.976,-0.156)
  // points.p1 = new Point(-27.06,-14.7)
  // points.p1Cp1 = new Point(-21.649,19.644)
  // points.p1Cp2 = new Point(-4.878,-7.796)
  // points.p2 = new Point(-34.278,25.591)
  // points.p2Cp2 = new Point(-24.723,25.324)
  // points.p3 = new Point(-34.278,78.6427)
  // points.p3Cp1 = new Point(-24.99,82.4517)
  // points.p4 = new Point(-20.697,95.9577)
  // points.p4Cp1 = new Point(-17.805,102.2147)
  // points.p4Cp2 = new Point(-24.74,87.2127)
  // points.p5 = new Point(-8.82,109.1117)
  // points.p5Cp1 = new Point(-8.887,120)
  // points.p5Cp2 = new Point(-15.435,108.8787)
  // points.p6 = new Point(-8.82,120)
  // points.p7 = new Point(0.0,120)

  // points.p0 = new Point(0,0)
  // points.p0Cp1 = new Point(-85.8018816,-0.7053696)
  // points.p1 = new Point(-122.354496,-66.46752000000001)
  // points.p1Cp1 = new Point(-97.88811840000001,88.82231039999999)
  // points.p1Cp2 = new Point(-22.0563648,-35.2503936)
  // points.p2 = new Point(-154.9914048,115.71226560000001)
  // points.p2Cp2 = new Point(-111.7875168,114.50499840000002)
  // points.p3 = new Point(-154.9914048,355.59083232000006)
  // points.p3Cp1 = new Point(-112.994784,372.81360672000005)
  // points.p4 = new Point(-93.5835552,433.88233632000004)
  // points.p4Cp1 = new Point(-80.50708800000001,462.17398752)
  // points.p4Cp2 = new Point(-111.864384,394.34094432)
  // points.p5 = new Point(-39.880512,493.35946272)
  // points.p5Cp1 = new Point(-40.1834592,542.592)
  // points.p5Cp2 = new Point(-69.790896,492.30592992)
  // points.p6 = new Point(-39.880512,542.592)
  // points.p7 = new Point(0,542.592)

  // points.p0 = new Point(0,9.525)
  // points.p0Cp1 = new Point(-76.2768816,8.819630400000001)
  // points.p1 = new Point(-112.82949599999999,-56.94252000000001)
  // points.p1Cp1 = new Point(-88.3631184,98.3473104)
  // points.p1Cp2 = new Point(-41.1063648,-25.725393600000004)
  // points.p2 = new Point(-145.4664048,125.23726560000001)
  // points.p2Cp2 = new Point(-111.7875168,124.02999840000003)
  // points.p3 = new Point(-145.4664048,348.44708232000005)
  // points.p3Cp1 = new Point(-112.994784,363.2886067200001)
  // points.p4 = new Point(-86.43980520000001,426.73858632)
  // points.p4Cp1 = new Point(-73.36333800000001,455.03023752)
  // points.p4Cp2 = new Point(-104.720634,387.19719432)
  // points.p5 = new Point(-39.880512,483.83446272000003)
  // points.p5Cp1 = new Point(-40.1834592,542.592)
  // points.p5Cp2 = new Point(-69.790896,482.78092992)
  // points.p6 = new Point(-39.880512,533.067)
  // points.p7 = new Point(0,533.067)

  points.p0 = new Point(0, 0)
  points.p0Cp1 = new Point(-76.28, -0.71)
  points.p1 = new Point(-112.83, -66.47)
  points.p1Cp1 = new Point(-88.36, 88.82)
  points.p1Cp2 = new Point(-41.11, -35.25)
  points.p2 = new Point(-145.47, 115.71)
  points.p2Cp2 = new Point(-111.79, 114.5)
  points.p3 = new Point(-145.47, 338.92)
  points.p3Cp1 = new Point(-112.99, 353.76)
  points.p4 = new Point(-86.44, 417.21)
  points.p4Cp1 = new Point(-73.36, 445.51)
  points.p4Cp2 = new Point(-104.72, 377.67)
  points.p5 = new Point(-39.88, 474.31)
  points.p5Cp1 = new Point(-40.18, 533.07)
  points.p5Cp2 = new Point(-69.79, 473.26)
  points.p6 = new Point(-39.88, 523.54)
  points.p7 = new Point(0, 52.54)

  // points.cp0 = points.p0.clone()
  // points.cp0Cp1 = points.p0Cp1.clone()
  // points.cp1 = points.p1.clone()
  // points.cp1Cp1 = points.p1Cp1.clone()
  // points.cp1Cp2 = points.p1Cp2.clone()
  // points.cp2 = points.p2.clone()
  // points.cp2Cp2 = points.p2Cp2.clone()
  // points.cp3 = points.p3.clone()
  // points.cp3Cp1 = points.p3Cp1.clone()
  // points.cp4 = points.p4.clone()
  // points.cp4Cp1 = points.p4Cp1.clone()
  // points.cp4Cp2 = points.p4Cp2.clone()
  // points.cp5 = points.p5.clone()
  // points.cp5Cp1 = points.p5Cp1.clone()
  // points.cp5Cp2 = points.p5Cp2.clone()
  // points.cp6 = points.p6.clone()
  // points.cp7 = points.p7.clone()

  paths.seam = new Path()
    .move(points.p0)
    .curve(points.p0Cp1, points.p1Cp2, points.p1)
    .curve(points.p1Cp1, points.p2Cp2, points.p2)
    .line(points.p3)
    .curve(points.p3Cp1, points.p4Cp2, points.p4)
    .curve(points.p4Cp1, points.p5Cp2, points.p5)
    .line(points.p5)
    .line(points.p6)
    .line(points.p7)
    .line(points.p0)
    .close()

  // scalePoints(points, 4.5216)
  adjustPoints(points, points.p0)
  // addPoint(points.cp0, 9.525, 0, 1 )
  // addPoint(points.cp0Cp1, 9.525, 1, 1 )
  // addPoint(points.cp1Cp2, 9.525, -2, 1 )
  // addPoint(points.cp1, 9.525, 1, 1 )
  // addPoint(points.cp1Cp1, 9.525, 1, 1 )
  // addPoint(points.cp2Cp2, 9.525, 0, 1 )
  // addPoint(points.cp2, 9.525, 1, 1 )
  // addPoint(points.cp3, 9.525, 1, -.75 )
  // addPoint(points.cp3Cp1, 9.525, 0, -1 )
  // addPoint(points.cp4Cp2, 9.525, .75, -.75 )
  // addPoint(points.cp4, 9.525, .75, -.75 )
  // addPoint(points.cp4Cp1, 9.525, .75, -.75 )
  // addPoint(points.cp5Cp2, 9.525, 0, -1 )
  // addPoint(points.cp5, 9.525, 0, -1 )
  // addPoint(points.cp6, 9.525, 0, -1 )
  // addPoint(points.cp7, 9.525, 0, -1 )

  // paths.seam2 = new Path()
  //   .move(points.cp0)
  //   .curve(points.cp0Cp1, points.cp1Cp2, points.cp1)
  //   .curve(points.cp1Cp1, points.cp2Cp2, points.cp2)
  //   .line(points.cp3)
  //   .curve(points.cp3Cp1, points.cp4Cp2, points.cp4)
  //   .curve(points.cp4Cp1, points.cp5Cp2, points.cp5)
  //   .line(points.cp5)
  //   .line(points.cp6)
  //   .line(points.cp7)
  //   .line(points.cp0)
  //   .close()
  //   .attr('class', 'lining')

  consoleLogPoints(points)

  // Complete?
  if (complete) {
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

export const back = {
  name: 'back',
  measurements: ['waist'],
  options: {
    size: { pct: 50, min: 10, max: 100, menu: 'fit' },
  },
  plugins: [pluginBundle],
  draft: draftBack,
}
