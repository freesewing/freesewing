import { pctBasedOn } from '@freesewing/core'
import { frontpoints } from './frontpoints.mjs'

export const front = {
  name: 'cornelius.front',
  from: frontpoints,
  options: {
    pctZtoR: 0.35,
    pctRtoZin: 0.75,
    pctRtoZup: 0.25,
    pctRtoKin: 0.75,
    pctRtoKdown: 0.25,
    pctKtoRout: 0.15,
    pctKtoRup: 0.25,
    pctKtoH: 0.7,
    flyWidth: { pct: 0.38, min: 0.2, max: 0.6, ...pctBasedOn('waist'), menu: 'style' },
  },
  draft: ({
    options,
    Path,
    points,
    paths,
    Snippet,
    snippets,
    sa,
    store,
    measurements,
    macro,
    part,
  }) => {
    const cc = 0.551915024494 // circle constant

    const halfInch = store.get('halfInch')
    const ventLength = store.get('ventLength')
    const waist = store.get('waist')
    const keystone = options.cuffStyle == 'keystone'

    const flyWidth = options.flyWidth * measurements.waist
    store.set('flyWidth', flyWidth)

    store.set('sideSeam', paths.sideSeam.length())

    points.pZcpR = points.pZ.shiftFractionTowards(points.pX, options.pctZtoR)
    points.pRcpZ = points.pR
      .shiftFractionTowards(points.pF, options.pctRtoZin)
      .shiftFractionTowards(points.pZ, options.pctRtoZup)

    let waistAngle = Math.abs(points.pW.angle(points.pD) - points.pW.angle(points.pZ))
    if (waistAngle > 180) {
      waistAngle -= 180
    }

    points.flyTop = points.pW.shift(
      points.pW.angle(points.pZ) - 180 + waistAngle,
      halfInch * flyWidth
    )
    points.flyBottom = points.flyTop.shift(
      points.pW.angle(points.pZ),
      points.pW.dist(points.pZ) - halfInch * flyWidth
    )

    points.pZcpFB = points.pZ.shift(
      points.pW.angle(points.pZ) - waistAngle,
      halfInch * flyWidth * cc
    )
    points.pFBcpZ = points.flyBottom.shift(points.pW.angle(points.pZ), halfInch * flyWidth * cc)

    paths.fly = new Path()
      .move(points.pW)
      .line(points.flyTop)
      .line(points.flyBottom)
      .curve(points.pFBcpZ, points.pZcpFB, points.pZ)
      .hide()

    paths.flyFold = new Path().move(points.pW).line(points.pZ).attr('class', 'fabric dashed')
    store.set('flyLength', paths.flyFold.length())

    store.set('frontWaistLength', paths.waistSeam.line(points.flyTop).length())

    paths.crotchSeam = new Path()
      .move(points.pZ)
      .curve(points.pZcpR, points.pRcpZ, points.pR)
      .hide()

    points.pRcpK = points.pR
      .shiftFractionTowards(points.pF, options.pctRtoKin)
      .shiftFractionTowards(points.pK, options.pctRtoKdown)
    points.pKcpR = points.pK
      .shiftFractionTowards(points.pH, -1 * (options.pctKtoRout + options.fullness))
      .shiftFractionTowards(points.pR, options.pctKtoRup)

    paths.insideSeam = new Path()
      .move(points.pR)
      .curve(points.pRcpK, points.pKcpR, points.pK)
      .hide()
    store.set('insideSeam', paths.insideSeam.length())

    let tempP = points.pH.shift(270, halfInch * 1.5)
    points.pKcpH = points.pK.shiftFractionTowards(tempP, options.pctKtoH)
    points.pJcpH = points.pJ.shiftFractionTowards(tempP, options.pctKtoH)

    paths.legSeam = new Path().move(points.pK).curve(points.pKcpH, points.pJcpH, points.pJ).hide()

    store.set('frontLegSeam', paths.legSeam.length())

    // Keystone original:
    // The keystone design has the slit in the cuff to the front. I deviated from
    // this for comfort and ease of construction preferences. The 'slit' is now
    // part of the side seam.
    if (keystone) {
      points.pSlitBottom = paths.legSeam.shiftAlong(paths.legSeam.length() - halfInch * 4)
      points.pSlitTop = points.pSlitBottom.shift(90, halfInch * 5 * options.ventLength)
      store.set('slitDistance', paths.legSeam.length() - halfInch * 4)
    }

    points.pocketWaist = paths.waistSeam.shiftAlong(waist / 2 / 4.5)
    points.pocketSide = paths.sideSeam.shiftAlong(paths.sideSeam.length() - (waist / 2 / 4.5) * 3.5)

    paths.pocketSeam = new Path().move(points.pocketSide).line(points.pocketWaist).hide()

    paths.waistSeam = paths.waistSeam.split(points.pocketWaist)[1]
    paths.sideSeam = paths.sideSeam.split(points.pocketSide)[0]

    paths.seam = paths.waistSeam
      .join(paths.fly)
      .join(paths.crotchSeam)
      .join(paths.insideSeam)
      .join(paths.legSeam)
      .join(paths.sideSeam)
      .join(paths.pocketSeam)
      .close()
      .attr('class', 'fabric')

    points.topOfVent = paths.sideSeam.shiftAlong(ventLength)

    snippets.n1 = new Snippet('notch', points.pK)
    snippets.n2 = new Snippet('notch', points.pJ)
    snippets.n3 = new Snippet('notch', points.pocketWaist)
    snippets.n4 = new Snippet('notch', points.pocketSide)
    snippets.n5 = new Snippet('notch', points.pZ)

    // Keystone original (see above):
    if (keystone) {
      paths.slit = new Path()
        .move(points.pSlitBottom)
        .line(points.pSlitTop)
        .attr('class', 'fabric')
        .attr('data-text', 'vent')
        .attr('data-text-class', 'text-xs center')
      snippets.n6 = new Snippet('notch', points.pSlitBottom)
    } else {
      tempP = paths.sideSeam.shiftAlong(ventLength)
      paths.vent = paths.sideSeam
        .split(tempP)[0]
        .attr('data-text', 'vent')
        .attr('data-text-class', 'text-xs center')
    }
    snippets.n5 = new Snippet('notch', points.topOfVent)

    points.gridAnchor = points.pO.clone()

    store.cutlist.addCut({ cut: 2, from: 'fabric' })

    points.logo = points.pE.clone()
    snippets.logo = new Snippet('logo', points.logo)
    points.title = points.logo.shift(270, 50)
    macro('title', {
      nr: 5,
      at: points.title,
      title: 'Front',
      align: 'center',
    })

    points.scaleboxAnchor = points.pD.shift(270, 60)
    macro('scalebox', { at: points.scaleboxAnchor })

    macro('grainline', {
      from: points.pocketBL.shiftFractionTowards(points.pocketTL, -0.9),
      to: points.pocketTL,
    })

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }

    macro('ld', {
      id: 1,
      from: points.topOfVent,
      to: points.pJ,
      d: sa + 15,
    })
    macro('hd', {
      id: 2,
      from: points.pocketWaist,
      to: points.pocketSide,
      y: points.pocketWaist.y - sa - 15,
    })
    macro('hd', {
      id: 3,
      from: points.pW,
      to: points.pocketWaist,
      y: points.pocketWaist.y - sa - 15,
    })
    macro('hd', {
      id: 4,
      from: points.flyTop,
      to: points.pW,
      y: points.pocketWaist.y - sa - 15,
    })
    macro('hd', {
      id: 5,
      from: points.pR,
      to: points.pAextra,
    })
    macro('hd', {
      id: 6,
      from: points.pK,
      to: points.pJ,
      y: points.pJ.y - 15,
    })
    // Keystone original (see above):
    if (keystone) {
      macro('hd', {
        id: 7,
        from: points.pSlitBottom,
        to: points.pJ,
        y: points.pJ.y - 30,
      })
      macro('vd', {
        id: 8,
        from: points.pSlitBottom,
        to: points.pSlitTop,
        x: points.pSlitTop.x - 15,
      })
    }
    macro('vd', {
      id: 9,
      from: points.pocketSide,
      to: points.pocketWaist,
      x: points.pocketSide.x,
    })
    macro('vd', {
      id: 10,
      from: points.pR,
      to: points.pW,
      x: points.pR.x - sa - 15,
    })
    macro('vd', {
      id: 11,
      from: points.pK,
      to: points.pR,
      x: points.pR.x - sa - 15,
    })
    macro('vd', {
      id: 12,
      from: points.pZ,
      to: points.pW,
      x: points.pW.x + 15,
    })
    macro('vd', {
      id: 13,
      from: points.pJ,
      to: points.pocketWaist,
      x: points.pocketWaist.x,
    })

    return part
  },
}
