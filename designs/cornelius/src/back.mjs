import { frontpoints } from './frontpoints.mjs'
import { front } from './front.mjs'

function rotateDistanceForP3(part, point, distance, center) {
  const { options, Path, points, paths, store, log } = part.shorthand()

  const length = store.get('insideSeam')

  const dCenter = point.dist(center)
  let angle = Math.atan(distance / dCenter) * (180 / Math.PI)
  let aOffset = (distance / dCenter) * -3 //angle *-.05;

  let pDistance,
    dOffset,
    pLength,
    dLength = 0
  let iteration = 0

  do {
    points.p3 = point.rotate(angle, center)

    points.p3cp10 = points.p3
      .shiftFractionTowards(points.pF, options.pctRtoKin / 2)
      .shiftFractionTowards(points.p10, options.pctRtoKdown)
    points.p10cp3 = points.p10
      .shiftFractionTowards(points.pH, -1 * (options.pctKtoRout + options.fullness))
      .shiftFractionTowards(points.p3, options.pctKtoRup)

    paths.insideSeam = new Path().move(points.p3).curve(points.p3cp10, points.p10cp3, points.p10)

    pLength = paths.insideSeam.length()

    pDistance = point.dist(points.p3)
    dOffset = distance - pDistance
    dLength = pLength - length

    if (dLength > 0.1) point = point.shiftTowards(center, -0.9 * dLength)
    else if (dLength < -0.1) point = point.shiftTowards(center, 0.8 * dLength)
    else {
      if (dOffset > 0) {
        if (aOffset > 0) aOffset *= 0.8
        else aOffset *= -0.8
      } else {
        if (aOffset > 0) aOffset *= -0.9
        else aOffset *= 0.9
      }
      angle += aOffset
    }

    iteration++
  } while ((dOffset > 0.1 || dOffset < -0.1 || dLength < -0.1 || dLength > 0.1) && iteration < 100)

  if (iteration >= 100) {
    log.error('Could not find a point for "3" within 100 iterations')
  }
}

function rotateDistanceForP4(part, point, distance, center, origin) {
  const { options, Path, points, paths, store, log } = part.shorthand()

  let aCPu,
    aCPj,
    a4to11 = null

  const length = store.get('sideSeam')
  const halfInch = store.get('halfInch')
  let pLength,
    dLength,
    pDistance,
    dOffset = 0

  let pivotAngle, originalAngle, angleChange

  const dCenter = point.dist(center)

  let direction = 1

  let angle = Math.atan(Math.abs(distance) / dCenter) * (180 / Math.PI)
  if (distance < 0) {
    angle = 360 - angle
    distance *= -1
    direction = -1
  }
  let p = point.rotate(angle, center)
  let aOffset = (origin.dist(p) / dCenter) * -3 //angle *-.15;

  let iteration = 0

  do {
    p = point.rotate(angle, center)
    points.p4 = p.clone()

    pivotAngle = points.pJ.angle(points.p4)
    originalAngle = points.pJ.angle(points.pU)
    angleChange = originalAngle - pivotAngle

    points.p6 = points.pJ.shift(points.pJ.angle(points.pT) - angleChange, points.pJ.dist(points.pT))
    points.p7 = points.pJ.shift(points.pJ.angle(points.pA) - angleChange, points.pJ.dist(points.pA))
    points.p6 = points.p6.shift(
      points.pJ.angle(points.pT) - angleChange - 90,
      halfInch * options.fullness * 2
    )
    points.p7 = points.p7.shift(
      points.pJ.angle(points.pA) - angleChange - 90,
      halfInch * options.fullness * 2
    )

    aCPu = points.p7.dist(points.p4) * options.pctAtoO
    aCPj = points.p7.dist(points.p11) * options.pctAtoC

    a4to11 = points.p4.angle(points.p11)

    // There's a tweak in there that moves the control point in when the fullness setting increases.
    points.p7cp4 = points.p7.shift(a4to11 + 180 + 5 * options.fullness, aCPu)
    points.p7cp11 = points.p7.shift(a4to11, aCPj)

    points.p4cp7 = points.p4.shiftFractionTowards(points.p7cp4, options.pctUtoA)
    points.p11cp7 = points.p11
      .shiftFractionTowards(points.p7cp11, options.pctJtoA)
      .shift(0, points.p11.dist(points.pH) * options.fullness)

    paths.sideSeam = new Path()
      .move(points.p11)
      .curve(points.p11cp7, points.p7cp11, points.p7)
      .curve(points.p7cp4, points.p4cp7, points.p4)

    pLength = paths.sideSeam.length()

    pDistance = origin.dist(points.p4)
    dOffset = distance - pDistance
    dLength = pLength - length

    // First check for the distance, the length of the side seam
    if (dLength > 0.1) point = point.shiftTowards(center, 0.9 * dLength)
    else if (dLength < -0.1) point = point.shiftTowards(center, 0.8 * dLength)
    else {
      // If the side seam length is okay, check for the waist length
      if (dOffset > 0) {
        if (aOffset > 0) aOffset *= 0.8
        else aOffset *= -0.9
      } else {
        if (aOffset > 0) aOffset *= -0.9
        else aOffset *= 0.9
      }
      // We adjust the waist length by altering the angle of rotation
      angle += aOffset * direction
    }

    iteration++
  } while ((dOffset > 0.1 || dOffset < -0.1 || dLength > 0.1 || dLength < -0.1) && iteration < 100)

  if (iteration >= 100) {
    log.error('Could not find a point for "4" within 100 iterations')
  }
}

export const back = {
  name: 'cornelius.back',
  from: frontpoints,
  after: front,
  draft: ({ options, Path, points, paths, Snippet, snippets, sa, store, macro, part }) => {
    let tempP = null

    const waist = store.get('waist')
    const seat = store.get('seat')
    const halfInch = store.get('halfInch')
    const ventLength = store.get('ventLength')
    const traditional = options.cuffStyle == 'traditional'

    points.p2 = points.pD.shift(90, seat / 12 + halfInch)
    points.p10 = points.pK.shiftTowards(points.pH, -halfInch)
    rotateDistanceForP3(part, points.pR.clone(), halfInch * 2, points.pK)

    points.p11 = points.pJ.shiftTowards(points.pH, -halfInch)

    // console.log( 'Pu -> Pj: ' + points.pU.angle( points.pJ ));
    rotateDistanceForP4(part, points.pU, -1 * (waist / 2 + halfInch), points.p11, points.p2)

    points.p2a = points.p2.shiftTowards(points.p4, halfInch)

    tempP = points.p6.shiftTowards(points.pT, 1000)
    // let pathFto2a = new Path().move(points.pX).line(points.p2a);
    const pathFto2a = new Path().move(points.pF).line(points.p2a)
    // let pathFto2a = new Path().move(points.pV).line(points.p2a);
    const path6ThroughT = new Path().move(points.p6).line(tempP)
    // points.p5 = path6ThroughT.intersects(pathXto2a)[0];
    points.p5 = path6ThroughT.intersects(pathFto2a)[0]

    // points.p5cp3 = points.p5.shiftFractionTowards( points.pX, options.pctZtoR *2)
    points.p5cp3 = points.p5.shiftFractionTowards(points.pF, options.pctZtoR * 2)
    // points.p5cp3 = points.p5.shiftFractionTowards( points.pV, options.pctZtoR *2)
    points.p3cp5 = points.p3
      .shiftFractionTowards(points.pF, options.pctRtoZin)
      .shiftFractionTowards(points.p5, options.pctRtoZup / 4)

    points.p2cp5 = points.p2.shiftFractionTowards(points.pD, options.pctZtoR)
    points.p5cp2 = points.p5.shiftFractionTowards(points.p2a, options.pctZtoR)

    paths.crotchSeam = new Path()
      .move(points.p2)
      .curve(points.p2cp5, points.p5cp2, points.p5)
      .curve(points.p5cp3, points.p3cp5, points.p3)

    if (traditional) {
      tempP = points.pH.shift(90, halfInch * 2)
    } else {
      tempP = points.pH.shift(90, halfInch * 1)
    }
    points.p10cpH = points.p10.shiftFractionTowards(tempP, options.pctKtoH)
    points.p11cpH = points.p11.shiftFractionTowards(tempP, options.pctKtoH)

    paths.legSeam = new Path().move(points.p10).curve(points.p10cpH, points.p11cpH, points.p11)
    store.set('backLegSeam', paths.legSeam.length())

    paths.waistSeam = new Path().move(points.p4).line(points.p2)
    store.set('backWaistLength', paths.waistSeam.length())

    paths.seam = paths.waistSeam
      .join(paths.crotchSeam)
      .join(paths.insideSeam)
      .join(paths.legSeam)
      .join(paths.sideSeam)
      .close()
      .attr('class', 'fabric')

    points.topOfVent = paths.sideSeam.shiftAlong(ventLength)

    snippets.n1 = new Snippet('notch', points.p10)
    snippets.n2 = new Snippet('notch', points.p11)
    snippets.n3 = new Snippet('notch', points.topOfVent)

    paths.vent = paths.sideSeam.split(points.topOfVent)[0]
    paths.vent
      .attr('data-text', 'Vent')
      .attr('data-text-class', 'center')
      .attr('class', 'fabric sa')

    points.gridAnchor = points.pO.clone()

    points.logo = points.pE.clone()
    snippets.logo = new Snippet('logo', points.logo)
    points.title = points.logo.shift(270, 50)
    macro('title', {
      nr: 6,
      at: points.title,
      title: 'Back',
      align: 'center',
    })

    const angle = points.p11.angle(points.p4)
    const dist = points.p11.dist(points.p4)
    macro('grainline', {
      from: points.pA.shift(angle, dist * 0.35),
      to: points.pA.shift(angle + 180, dist * 0.35),
    })

    store.cutlist.addCut({ cut: 2, from: 'fabric' })

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }

    tempP = paths.sideSeam.intersectsY(points.p3.y)[0]
    macro('hd', {
      id: 1,
      from: points.p2,
      to: points.p4,
      y: points.p2.y - sa - 25,
    })
    macro('hd', {
      id: 2,
      from: points.p10,
      to: points.p11,
      y: points.p10.y + sa + 15,
    })
    macro('vd', {
      id: 3,
      from: points.p3,
      to: points.p2,
      x: points.p3.x - sa - 15,
    })
    macro('vd', {
      id: 4,
      from: points.p4,
      to: points.p2,
      x: points.p2.x - sa - 15,
    })
    macro('vd', {
      id: 5,
      from: points.p10,
      to: points.p3,
      x: points.p3.x - sa - 15,
    })
    macro('ld', {
      id: 6,
      from: points.topOfVent,
      to: points.p11,
      d: sa + 15,
    })
    macro('ld', {
      id: 7,
      from: points.p2,
      to: points.p4,
      d: sa + 15,
    })
    macro('ld', {
      id: 8,
      from: points.p5,
      to: tempP,
    })
    macro('ld', {
      id: 9,
      from: points.p3,
      to: tempP,
    })
    macro('ld', {
      id: 10,
      from: points.p5,
      to: points.p2,
      d: +sa + 20,
    })
    macro('ld', {
      id: 11,
      from: points.p4,
      to: points.p11,
      d: -15,
    })
    macro('ld', {
      id: 12,
      from: tempP,
      to: points.p4,
      d: -sa - 20,
    })

    return part
  },
}
