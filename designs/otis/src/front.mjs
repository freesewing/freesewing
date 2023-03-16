import { pluginBundle } from '@freesewing/plugin-bundle'
import { back } from './back.mjs'

import {
  adjustPoints,
  consoleLogPoints,
  scalePoints,
  addPoint,
  addPointX,
  addPointY,
  makeRelativePoints,
} from './utils.mjs'

function draftFront({
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
  measurements,
  store,
  macro,
  part,
}) {
  const waist = store.get('waist')
  const ease = store.get('ease')
  const sideseam = store.get('sideseam')

  // points.p0 = new Point(49.4448,39.0178)
  // points.p0Cp1 = new Point(29.8008,38.1718)
  // points.p1 = new Point(22.7848,16.4338)
  // points.p1Cp1 = new Point(25.1678,40.4208)
  // points.p1Cp2 = new Point(46.1708,24.5628)
  // points.p2 = new Point(15.3008,56.7248)
  // points.p2Cp2 = new Point(28.4198,57.3258)
  // points.p3 = new Point(15.3008,109.843)
  // points.p3Cp1 = new Point(21.9828,109.888)
  // points.p4 = new Point(41.0258,120.601)
  // points.p5 = new Point(41.0258,131.627)
  // points.p6 = new Point(49.5118,131.627)

  // scalePoints(points, 4.5216)
  // adjustPoints(points, points.p0)

  points.p0 = new Point(0, 0)
  points.p0Cp1 = new Point(-88.82, -3.83)
  points.p1 = new Point(-120.55, -102.12)
  points.p1Cp1 = new Point(-109.77, 6.34)
  points.p1Cp2 = new Point(-14.8, -65.36)
  points.p2 = new Point(-154.39, 80.06)
  points.p2Cp2 = new Point(-95.07, 82.78)
  points.p3 = new Point(-154.39, 320.24)
  points.p3Cp1 = new Point(-124.17, 320.45)
  points.p4 = new Point(-38.07, 368.89)
  points.p5 = new Point(-38.07, 418.74)
  points.p6 = new Point(0, 418.74)

  points.cp0 = points.p0.clone()
  points.cp0Cp1 = points.p0Cp1.clone()
  points.cp1 = points.p1.clone()
  points.cp1Cp1 = points.p1Cp1.clone()
  points.cp1Cp2 = points.p1Cp2.clone()
  points.cp2 = points.p2.clone()
  points.cp2Cp2 = points.p2Cp2.clone()
  points.cp3 = points.p3.clone()
  points.cp3Cp1 = points.p3Cp1.clone()
  points.cp4 = points.p4.clone()
  points.cp5 = points.p5.clone()
  points.cp6 = points.p6.clone()

  addPoint(points.cp0, 9.525, 0, 1)
  addPoint(points.cp0Cp1, 9.525, 1, 1)
  addPoint(points.cp1Cp2, 9.525, -2, 1)
  addPoint(points.cp1, 9.525, 1, 1)
  addPoint(points.cp1Cp1, 9.525, 1, 1)
  addPoint(points.cp2Cp2, 9.525, 0, 1)
  addPoint(points.cp2, 9.525, 1, 1)
  addPoint(points.cp3, 9.525, 1, -0.75)
  addPoint(points.cp3Cp1, 9.525, 0, -1)
  addPoint(points.cp4, 9.525, 1, -0.75)
  addPoint(points.cp5, 9.525, 1, -1)
  addPoint(points.cp6, 9.525, 0, -1)

  paths.seam = new Path()
    .move(points.p0)
    .curve(points.p0Cp1, points.p1Cp2, points.p1)
    .curve(points.p1Cp1, points.p2Cp2, points.p2)
    .line(points.p3)
    .curve(points.p3Cp1, points.p4, points.p4)
    .line(points.p5)
    .line(points.p6)
    .line(points.p0)
    .close()

  paths.seam2 = new Path()
    .move(points.cp0)
    .curve(points.cp0Cp1, points.cp1Cp2, points.cp1)
    .curve(points.cp1Cp1, points.cp2Cp2, points.cp2)
    .line(points.cp3)
    .curve(points.cp3Cp1, points.cp4, points.cp4)
    .line(points.cp5)
    .line(points.cp6)
    .line(points.cp0)
    .close()
    .attr('class', 'lining')

  // makeRelativePoints(Point, points, points.p0, waist, ease)

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

export const front = {
  name: 'front',
  after: back,
  plugins: [pluginBundle],
  draft: draftFront,
}
