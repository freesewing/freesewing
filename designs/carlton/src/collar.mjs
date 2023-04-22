import { collarStand } from './collarstand.mjs'

/**
 * This collar is the most difficult part about this pattern
 * That's because slash&spread is easy with paper and scissors
 * but gets complicated when doing it in code.
 */

function draftCarltonCollar({
  paperless,
  sa,
  complete,
  points,
  options,
  macro,
  paths,
  Path,
  part,
  store,
}) {
  // We're going to slash and spread this collar. Slashing first:
  // Divide top in 5 parts
  points.cutTop1 = points.topLeft.shiftFractionTowards(points.topRight, 0.2)
  points.cutTop2 = points.topLeft.shiftFractionTowards(points.topRight, 0.4)
  points.cutTop3 = points.topLeft.shiftFractionTowards(points.topRight, 0.6)
  points.cutTop4 = points.topLeft.shiftFractionTowards(points.topRight, 0.8)

  // Divide bottom in 4 parts
  let bottom = new Path().move(points.standTop).curve_(points.standTopCp, points.standTip)
  points.cutBottom1 = bottom.shiftFractionAlong(0.25)
  points.cutBottom2 = bottom.shiftFractionAlong(0.5)
  points.cutBottom3 = bottom.shiftFractionAlong(0.75)
  // Split curve, extract control points from ops
  let halves = bottom.split(points.cutBottom2)
  let quarters = []
  quarters.push(...halves[0].split(points.cutBottom1))
  quarters.push(...halves[1].split(points.cutBottom3))
  points.q1Cp1 = quarters[0].ops[1].cp1
  points.q1Cp2 = quarters[0].ops[1].cp2
  points.q2Cp1 = quarters[1].ops[1].cp1
  points.q2Cp2 = quarters[1].ops[1].cp2
  points.q3Cp1 = quarters[2].ops[1].cp1
  points.q3Cp2 = quarters[2].ops[1].cp2
  points.q4Cp1 = quarters[3].ops[1].cp1
  points.q4Cp2 = quarters[3].ops[1].cp2

  // Collar slashed, not let's spread by rotating
  let rotate = {
    1: {
      pivot: 'cutBottom1',
      points: ['cutBottom2', 'cutTop1', 'cutTop2', 'q2Cp1', 'q2Cp2'],
    },
    2: {
      pivot: 'cutBottom2',
      points: ['cutBottom3', 'cutTop2', 'cutTop3', 'q3Cp1', 'q3Cp2'],
    },
    3: {
      pivot: 'cutBottom3',
      points: ['standTip', 'bottomRight', 'cutTop4', 'cutTop3', 'q4Cp1'],
    },
    4: {
      pivot: 'standTip',
      points: ['topRight', 'bottomRight', 'cutTop4'],
    },
  }

  let angle = -1 * options.collarSpread
  let alsoRotate = []
  for (let nr of [4, 3, 2, 1]) {
    let step = rotate[nr]
    let pivot = step.pivot
    let first = false
    for (let pnt of step.points) {
      if (first === false) first = pnt
      let id = `rot${nr}${pnt}`
      points[id] = points[pnt].rotate(angle, points[pivot])
      alsoRotate.push(id)
    }
    if (nr < 4) for (let pnt of alsoRotate) points[pnt] = points[pnt].rotate(angle, points[pivot])
  }

  // Shift panel 2 in place
  angle = points.cutBottom2.angle(points.rot1cutBottom2) + 180
  let distance = -1 * points.cutBottom2.dist(points.rot1cutBottom2)
  for (let i of [
    'cutBottom2',
    'rot2cutTop2',
    'rot2cutTop3',
    'rot2cutBottom3',
    'rot2q3Cp1',
    'rot2q3Cp2',
  ])
    points[i] = points[i].shift(angle, distance)

  // Shift panel 3 in place
  angle = points.cutBottom3.angle(points.rot2cutBottom3) + 180
  distance = -1 * points.cutBottom3.dist(points.rot2cutBottom3)
  for (let i of ['cutBottom3', 'rot3cutTop3', 'rot3cutTop4', 'rot3standTip', 'rot3q4Cp1'])
    points[i] = points[i].shift(angle, distance)

  // Shift panel 4 in place
  angle = points.standTip.angle(points.rot3standTip) + 180
  distance = -1 * points.standTip.dist(points.rot3standTip)
  for (let i of ['standTip', 'rot4cutTop4', 'rot4topRight', 'rot4bottomRight'])
    points[i] = points[i].shift(angle, distance)

  // Top control point
  points.topLeftCp = points.topLeft.shift(0, points.rot4topRight.x * 0.6)

  // Paths
  /* Uncomment these paths to gain insight into what's happening here
  paths.collarStand = paths.seam.clone(); // Needed because it gets overwritten later
  paths.panels = new Path()
    .move(points.cutTop1).line(points.cutBottom1)
    .move(points.cutTop2).line(points.cutBottom2)
    .move(points.cutTop3).line(points.cutBottom3)
    .move(points.cutTop4).line(points.standTip)

  paths.outline = new Path()
    .move(points.bottomLeft)
    .curve(points.bottomLeftCp, points.standTipCp, points.standTip)
    ._curve(points.standTopCp, points.standTop)
    .curve_(points.standTopCpLeft, points.standTipLeft)
    .curve(points.standTipCpLeft, points.bottomLeftCpLeft, points.bottomLeft)
    .close()
    .move(points.topLeft)
    .line(points.topRight)
    .line(points.bottomRight);

  paths.panel2 = new Path()
    .move(points.cutBottom1)
    .line(points.rot1cutBottom2)
    .line(points.rot1cutTop2)
    .line(points.rot1cutTop1)
    .close()
    .attr("class", "dashed");

  paths.panel3 = new Path()
    .move(points.cutBottom2)
    .line(points.rot2cutBottom3)
    .line(points.rot2cutTop3)
    .line(points.rot2cutTop2)
    .close()
    .attr("class", "dashed");

  paths.panel4 = new Path()
    .move(points.cutBottom3)
    .line(points.rot3standTip)
    .line(points.rot3cutTop4)
    .line(points.rot3cutTop3)
    .close()
    .attr("class", "dashed");

  paths.panel5 = new Path()
    .move(points.standTip)
    .line(points.rot4bottomRight)
    .line(points.rot4topRight)
    .line(points.rot4cutTop4)
    .close()
    .attr("class", "dashed");
   */

  paths.saBase = new Path()
    .move(points.standTop)
    /** This is the non-slashed path. We use this instead of the slashed
     *  parts of the path, so that we get a smooth line
     */
    .curve_(points.standTopCp, points.rot3standTip)
    /** These are the slashed parts. We're not using these, but you can change that if you want
     *  Just uncomment this, and comment out the non-slashed curve operation above
     */
    //.curve(points.q1Cp1, points.q1Cp2, points.cutBottom1)
    //.curve(points.rot1q2Cp1, points.rot1q2Cp2, points.rot1cutBottom2)
    //.curve(points.rot2q3Cp1, points.rot2q3Cp2, points.rot2cutBottom3)
    //.curve_(points.rot3q4Cp1, points.rot3standTip)
    .line(points.rot4bottomRight)
    .line(points.rot4topRight)
    ._curve(points.topLeftCp, points.topLeft)
  paths.seam = paths.saBase.clone().line(points.standTop).close().attr('class', 'fabric')

  store.cutlist.removeCut()
  store.cutlist.addCut({ cut: 1 })
  store.cutlist.addCut({ cut: 1, bias: true })
  store.cutlist.addCut({ cut: 2, material: 'lining', bias: true, ignoreOnFold: true })

  if (complete) {
    // Remove grainline from collarstand part
    delete paths.grainline
    macro('cutonfold', {
      from: points.topLeft,
      to: points.standTop,
      grainline: true,
    })

    points.title = points.standTopCp.clone()
    macro('title', {
      at: points.title,
      nr: 8,
      title: 'collar',
    })
    if (sa) {
      paths.sa = paths.saBase.offset(sa)
      paths.sa = paths.sa
        .line(points.topLeft)
        .move(points.standTop)
        .line(paths.sa.start())
        .attr('class', 'fabric sa')
    }

    if (paperless) {
      macro('hd', {
        from: points.standTop,
        to: points.rot3standTip,
        y: points.rot4bottomRight.y + sa + 15,
      })
      macro('hd', {
        from: points.standTop,
        to: points.rot4bottomRight,
        y: points.rot4bottomRight.y + sa + 30,
      })
      macro('hd', {
        from: points.standTop,
        to: points.rot4topRight,
        y: points.rot4bottomRight.y + sa + 45,
      })
      macro('vd', {
        from: points.standTop,
        to: points.topLeft,
        x: points.topLeft.x - 15,
      })
      macro('vd', {
        from: points.rot3standTip,
        to: points.topLeft,
        x: points.topLeft.x - 30,
      })
      macro('vd', {
        from: points.rot4topRight,
        to: points.topLeft,
        x: points.rot4topRight.x + sa + 15,
      })
      macro('vd', {
        from: points.rot4bottomRight,
        to: points.topLeft,
        x: points.rot4topRight.x + sa + 30,
      })
      macro('ld', {
        from: points.rot4bottomRight,
        to: points.rot4topRight,
        d: -1 * sa - 15,
      })
      macro('ld', {
        from: points.rot3standTip,
        to: points.rot4bottomRight,
        d: -1 * sa - 15,
      })
    }
  }

  return part
}

export const collar = {
  name: 'carlton.collar',
  from: collarStand,
  options: {
    collarSpread: { deg: 4, min: 2, max: 6, menu: 'collar' },
  },
  draft: draftCarltonCollar,
}
