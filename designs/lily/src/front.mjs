import { pluginBundle } from '@freesewing/plugin-bundle'
import { front as titanFront } from '@freesewing/titan'
import { back } from './back.mjs'

function draftLilyFront({
  points,
  Point,
  paths,
  Path,
  measurements,
  options,
  complete,
  paperless,
  store,
  macro,
  utils,
  snippets,
  Snippet,
  sa,
  absoluteOptions,
  part,
  log,
}) {
  
 
  /*
   * Helper method to draw the inseam path
   */
  const drawInseam = () => 
    new Path()
          .move(points.floorIn)
          .curve(points.floorInCp2, points.kneeInCp1, points.kneeIn)
          .curve(points.kneeInCp2, points.forkCp1, points.fork)
  /*
   * Helper method to draw the outseam path
   */
  const drawOutseam = () => {
    let waistOut = points.styleWaistOutLily || points.waistOut
      if (points.waistOut.x < points.seatOut.x) {
        //log.info('waistOut smaller')
        return new Path()
          .move(waistOut)
          .curve(points.seatOut, points.kneeOutCp1, points.kneeOut)
          .curve(points.kneeOutCp2, points.floorOutCp2, points.floorOut)
      } else {
        //log.info('waistOut larger')
        return new Path()
          .move(waistOut)
          ._curve(points.seatOutCp1, points.seatOut)
          .curve(points.seatOutCp2, points.kneeOutCp1, points.kneeOut)
          .curve(points.kneeOutCp2, points.floorOutCp2, points.floorOut)
      }
  }

  /*
   * Helper method to draw the outline path
   */
  const drawPath = () => {
    let waistIn = points.styleWaistInLily || points.waistIn
    let waistOut = points.styleWaistOutLily || points.waistOut
    return drawOutseam()
      .line(points.floorIn)
      .join(drawInseam())
      .curve(points.crotchSeamCurveCp1, points.crotchSeamCurveCp2, points.crotchSeamCurveStart)
      .line(waistIn)
      .line(waistOut)
      .close()
  }
  /*
   * Helper method to calculate the length of the crotch seam
   */
  const crotchSeamDelta = () =>
    new Path()
      .move(points.waistIn)
      .line(points.crotchSeamCurveStart)
      .curve(points.crotchSeamCurveCp2, points.crotchSeamCurveCp1, points.fork)
      .length() - measurements.crossSeamFront
  /*
   * Helper method to (re)draw the crotch seam
   */
  const drawCrotchSeam = () => {
    points.crotchSeamCurveStart = points.waistIn.shiftFractionTowards(
      points.cfSeat,
      options.crotchSeamCurveStart
    )
    points.crotchSeamCurveMax = utils.beamsIntersect(
      points.waistIn,
      points.cfSeat,
      points.fork,
      points.fork.shift(0, 666)
    )
    points.crotchSeamCurveCp1 = points.fork
      .shiftFractionTowards(points.crotchSeamCurveMax, options.crotchSeamCurveBend)
      .rotate(options.crotchSeamCurveAngle * -1, points.fork)
    points.crotchSeamCurveCp2 = points.crotchSeamCurveStart.shiftFractionTowards(
      points.crotchSeamCurveMax,
      options.crotchSeamCurveBend
    )
    points.forkCp1 = points.crotchSeamCurveCp1.rotate(90, points.fork)
  }
  /*
   * Helper method to calculate the inseam delta
   */
  const inseamDelta = () => drawInseam().length() - store.get('inseamBack')
  /*
   * Helper method to calculate the outseam delta
   */
  const outseamDelta = () => drawOutseam().length() - store.get('outseamBack')
  /*
   * Helper method to lengthen/shorten both inseam and outseam
   */
  const adaptInseamAndOutseam = () => {
    let shift = [
      'kneeInCp1',
      'kneeInCp2',
      'kneeOutCp1',
      'kneeOutCp2',
      'kneeIn',
      'kneeOut',
      'knee',
      'floorInCp2',
      'floorIn',
      'floorOutCp2',
      'floorOut',
      'floor',
      'grainlineBottom',
    ]
    let delta = seamDelta()
    let run = 0
    do {
      run++
      for (const i of shift) points[i] = points[i].shift(90, delta)
      delta = seamDelta()
    } while (Math.abs(delta) > 1 && run < 10)
  }
  /*
   * Helper method to determine the delta common when both inseam and outseam
   * are either too long or too short
   */
  const seamDelta = () => {
    let inseam = inseamDelta()
    let outseam = outseamDelta()
    return Math.abs(inseam) > Math.abs(outseam) ? outseam : inseam
  }
  /*
   * Helper method that can fit either inseam or outseam
   */
  const adaptSeam = (side) => {
    const out = side === 'out' ? true : false
    let rotate = [
      'cfSeat',
      'crotchSeamCurveCp1',
      'crotchSeamCurveCp2',
      'crotchSeamCurveStart',
      'waistIn',
      'cfWaist',
      'waistOut',
    ]
    rotate.push(out ? 'seatOut' : 'fork')
    const deltaMethod = out ? outseamDelta : inseamDelta
    let run = 0
    let delta = deltaMethod()
    do {
      for (const i of rotate)
        points[i] = points[i].rotate(
          (delta / 10) * (out ? 1 : -1),
          points[out ? 'fork' : 'seatOut']
        )
      run++
      delta = deltaMethod()
      console.log('delta',delta)
    } while (Math.abs(delta) > 1 && run < 20)
    console.log('run',run)
  }
  const adaptOutseam = () => adaptSeam('out')
  const adaptInseam = () => adaptSeam('in')
  
  console.log('test')

  // NOTE: majority of points re-used from titan


  // shape at the ankle (unlike titan)
  let halfAnkle = store.get('halfAnkle')
  // let halfAnkle = store.get('kneeFront') / 2
                                                             
  points.floorOut = points.floor.shift(180, halfAnkle)
  points.floorIn = points.floorOut.flipX(points.floor)
  
  console.log('ankle')

  // Control points between knee and ankle
  points.floorInCp2 = points.floorIn.shift(90,points.knee.dy(points.floor) / 3)
  points.kneeInCp1 = points.kneeIn.shift(90, -points.knee.dy(points.floor) / 3)
  points.floorOutCp2 = points.floorOut.shift(90,points.knee.dy(points.floor) / 3)
  points.kneeOutCp2 = points.kneeOut.shift(90, -points.knee.dy(points.floor) / 3)
  
  // other control points have already been calculated in titan
    // Control points to shape the legs towards the seat
    // Balance the waist

  // Draw initial crotch seam
  drawCrotchSeam()

  // Uncomment this to see the outline prior to fitting the crotch seam
  //paths.seam1 = drawPath().attr('class', 'dashed lining')

  if (options.fitCrossSeam && options.fitCrossSeamFront) {
    let delta = crotchSeamDelta()
    let rotate = ['waistIn', 'waistOut', 'cfWaist']
    let run = 0
    do {
      run++
      // Remedy A: Slash and spread
      for (const i of rotate) points[i] = points[i].rotate(delta / -15, points.seatOut)
      // Remedy B: Nudge the fork inwards/outwards
      points.fork = points.fork.shift(180, delta / 5)
      drawCrotchSeam()
      delta = crotchSeamDelta()
      // Uncomment the line below this to see all iterations
      //paths[`try${run}`] = drawPath().attr('class', 'dotted')
    } while (Math.abs(delta) > 1 && run < 15)
  }

  // Uncomment this to see the outline prior to fitting the inseam & outseam
  //paths.seam2 = drawPath().attr('class', 'dotted interfacing')
  
  /*
   * With the cross seams matched back and front,
   * all that's left is to match the inseam and outseam
   */
   
  // When both are too short/long, adapt the leg length
  if ((inseamDelta() < 0 && outseamDelta() < 0) || (inseamDelta() > 0 && outseamDelta() > 0))
    adaptInseamAndOutseam()
  
  // Now one is ok, the other will be adapted
  adaptOutseam()
  adaptInseam()
  
  // Changing one will ever so slightly impact the other, so let's run both again to be sure
  adaptOutseam()
  adaptInseam()

  // Only now style the waist lower if requested
  // Note: redo this for lily even though it was already done for titan;
  //  calculation for titan happened using its own seam lengths
  if (options.waistHeight < 1 || absoluteOptions.waistbandWidth > 0) {
    points.styleWaistOutLily = drawOutseam().shiftAlong(
      measurements.waistToHips * (1 - options.waistHeight) + absoluteOptions.waistbandWidth
    )
    points.styleWaistInLily = utils.beamsIntersect(
      points.styleWaistOutLily,
      points.styleWaistOutLily.shift(points.waistOut.angle(points.waistIn), 10),
      points.waistIn,
      points.crotchSeamCurveStart
    )
  } else {
    points.styleWaistInLily = points.waistIn.clone()
    points.styleWaistOutLily = points.waistOut.clone()
  }
  let test = points.styleWaistInLily.dist(points.styleWaistOutLily)
  console.log('front waist length',test)
  store.set('frontWaist', points.styleWaistInLily.dist(points.styleWaistOutLily))

  // Seamline
  paths.seam = drawPath().attr('class', 'fabric')
  
  // adjust the length (at the bottom)
  let extendBeyondKnee = 1
  if (options.lengthReduction > 0) {
    let requestedLength = store.get('requestedLength')
    // leggings must reach to fork at least, so define a minimum
    let waistToFork = points.waistX.dy(points.fork)
    if (waistToFork > requestedLength) {
      //log.warning('length reduction capped; cutting off at fork') // log only for back part
    // add one percent to waistToFork to ensure that path length is nonzero
      requestedLength = waistToFork*1.01
    }    
    
    points.bottom = points.waistX.shift(270,requestedLength)
    let upperPoint, upperCp
    if (requestedLength < measurements.waistToKnee) {   
      extendBeyondKnee = 0
    
      // 'cut' between fork and knee
      if (points.waistOut.x < points.seatOut.x) {
        upperPoint = points.styleWaistOutLily
        upperCp = points.seatOut
      } else {
        upperPoint = points.seatOut
        upperCp = points.seatOutCp2
      }
       points.bottomOut = utils.lineIntersectsCurve(
          points.bottom.shift(0,999),
          points.bottom.shift(180,999),
          points.kneeOut,
          points.kneeOutCp1,
          upperCp,
          upperPoint)
          
        points.bottomIn = utils.lineIntersectsCurve(
          points.bottom.shift(0,999),
          points.bottom.shift(180,999),
          points.kneeIn,
          points.kneeInCp2,
          points.forkCp1,
          points.fork)     
    } else if (0.999 < requestedLength/measurements.waistToKnee && requestedLength/measurements.waistToKnee < 1.001) {
      // TODO: find a solution that actually works
      points.bottomOut = points.kneeOut.clone()
      points.bottomIn = points.kneeIn.clone()
    } else {
      // 'cut' between knee and 'floor'      
      points.bottomOut = utils.lineIntersectsCurve(
        points.bottom.shift(0,999),
        points.bottom.shift(180,999),
        points.kneeOut,
        points.kneeOutCp2,
        points.floorOutCp2,
        points.floorOut)
        
      points.bottomIn = utils.lineIntersectsCurve(
        points.bottom.shift(0,999),
        points.bottom.shift(180,999),
        points.kneeIn,
        points.kneeInCp1,
        points.floorInCp2,
        points.floorIn)     
    }
    
    // define the three parts of the path, then combine    
    paths.bottom = new Path ()
      .move(points.bottomOut)
      .line(points.bottomIn)
      
    let halves = paths.seam.split(points.bottomOut)
    paths.upperOutseam = halves[0]
    let halves2 = halves[1].split(points.bottomIn)
    paths.upperInseam = halves2[1]
      
    paths.seam = paths.upperOutseam.join(paths.bottom)
      .join(paths.upperInseam)    
  } else {
    // define the same three parts of the path as when length reduction is enabled, then combine
    
    paths.bottom = new Path ()
      .move(points.floorOut)
      .line(points.floorIn)
      
    // note: upperInseam contains waist and cross seam as well
    paths.upperInseam = drawInseam()
      .curve(points.crotchSeamCurveCp1, points.crotchSeamCurveCp2, points.crotchSeamCurveStart)
      .line(points.styleWaistIn)
      .line(points.styleWaistOut)    
    paths.upperOutseam = drawOutseam()
    paths.bottom.hide()
    paths.upperInseam.hide()
    paths.upperOutseam.hide()
  }     

  if (complete) {
    points.grainlineTop.y = points.styleWaistInLily.y
    macro('grainline', {
      from: points.grainlineTop,
      to: points.grainlineBottom,
    })
    points.logoAnchor = new Point(points.crotchSeamCurveStart.x / 2, points.fork.y)
    snippets.logo = new Snippet('logo', points.logoAnchor)
    points.titleAnchor = points.logoAnchor.shift(-90, 60)
    macro('title', {
      nr: 2,
      title: 'front',
      at: points.titleAnchor,
    })
    
    //notches
    if (options.fitGuides) {
      points.waistMid = points.waistOut.shiftFractionTowards(points.waistIn, 0.5)
      points.seatMid = points.waistMid
        .shiftTowards(points.waistOut, measurements.waistToSeat)
        .rotate(90, points.waistMid)
      points.seatInTarget = points.seatOut.shiftOutwards(points.seatMid, measurements.seat / 4)
      points.seatOutTarget = points.seatMid.shiftTowards(points.seatOut, measurements.seat / 4)
      points.hipsInTarget = points.waistIn
        .shiftTowards(points.waistOut, measurements.waistToHips)
        .rotate(90, points.waistIn)
      points.hipsOutTarget = points.waistOut
        .shiftTowards(points.waistIn, measurements.waistToHips)
        .rotate(-90, points.waistOut)
      points.hipsIn = utils.beamsIntersect(
        points.hipsOutTarget,
        points.hipsInTarget,
        points.waistIn,
        points.crotchSeamCurveStart
      )
      // intersection between the vertical line from waistMid to seatMid and a line parallel to waistIn-waistOut that goes through crotchSeamCurveStart
      points.crotchSeamCurveStartMid = utils.beamsIntersect(
        points.crotchSeamCurveStart,
        points.crotchSeamCurveStart.shift(points.waistIn.angle(points.waistOut), 1),
        points.waistMid,
        points.seatMid
      )
      // check whether intersection occurs above or below crotch seam curve start
      points.seatInTemp = utils.beamsIntersect(
        points.seatMid,
        points.seatInTarget,
        points.crotchSeamCurveStart,
        points.waistIn
      ) // NOTE: guaranteed to return a Point since the lines cannot be parallel
      if (points.seatInTemp.y <= points.crotchSeamCurveStartMid.y) {
        // intersection is above the crotch seam curve start, so on the line segment
        points.seatIn = points.seatInTemp.clone()
      } else if (points.seatInTemp.y > points.fork) {
        // seat appears to be below crotch
        //log.warning('seat estimated to be below crotch; this is probably not accurate')
        // points.seatIn = utils.lineIntersectsCurve(
          // points.seatMid,
          // points.seatInTarget,
          // points.fork,
          // points.forkCp2,
          // points.points.KneeInCp1,
          // points.kneeIn
        // )   
          // TODO: fix this
          points.seatIn = points.fork.clone()   
      } else {
        // use the intersection with the curved part instead
        // points.seatIn = utils.lineIntersectsCurve(
          // points.seatMid,
          // points.seatInTarget,
          // points.fork,
          // points.crotchSeamCurveCp1,
          // points.crotchSeamCurveCp2,
          // points.crotchSeamCurveStart
        // )
          // TODO: fix this
          points.seatIn = points.fork.clone() 
      }
        if (points.waistOut.x < points.seatOut.x) {
          //log.info('waist to the left of seat')
          points.hipsOut = utils.lineIntersectsCurve(
            points.hipsIn,
            points.hipsIn.rotate(180, points.hipsOutTarget),
            points.waistOut,
            points.seatOut,
            points.kneeOutCp1,
            points.kneeOut
          )
          points.seatOutNotch = utils.lineIntersectsCurve(
            points.seatMid,
            points.seatOutTarget,
            points.waistOut,
            points.seatOut,
            points.kneeOutCp1,
            points.kneeOut
          )
        } else {
          //log.info('waist to the right of seat')
          points.hipsOut = utils.lineIntersectsCurve(
            points.hipsIn,
            points.hipsIn.rotate(180, points.hipsOutTarget),
            points.waistOut,
            points.waistOut,
            points.seatOutCp1,
            points.seatOut
          )
          points.seatOutNotch = points.seatOut
        }
        points.kneeOutNotch = points.kneeOut
        points.kneeInNotch = points.kneeIn
      macro('sprinkle', {
        snippet: 'notch',
        on: ['crotchSeamCurveStart', 'seatIn', 'seatOutNotch'],
      })
      if (extendBeyondKnee) {
        macro('sprinkle', {
          snippet: 'notch',
          on: ['kneeInNotch', 'kneeOutNotch'],
        })
      }
      paths.seatline = new Path()
        .move(points.seatOutNotch)
        .line(points.seatIn)
        .attr('class', 'fabric help')
        .attr('data-text', 'Seat Line')
        .attr('data-text-class', 'center')
      if (
        measurements.waistToHips * (1 - options.waistHeight) + absoluteOptions.waistbandWidth <
        measurements.waistToHips
      ) {
        macro('sprinkle', {
          snippet: 'notch',
          on: ['hipsIn', 'hipsOut'],
        })
        paths.hipline = new Path()
          .move(points.hipsOut)
          .line(points.hipsIn)
          .attr('class', 'fabric help')
          .attr('data-text', 'Hip Line')
          .attr('data-text-class', 'center')
      }
    }
   
    if (sa) {
      paths.saBase = paths.upperInseam
        .join(paths.upperOutseam)
      paths.hemBase = paths.bottom
      paths.sa = paths.hemBase
        .offset(sa * 3)
        .join(paths.saBase.offset(sa))
        .close()
        .attr('class', 'fabric sa')
      paths.saBase.hide()
      paths.hemBase.hide()
    }

    if (paperless && options.titanPaperless) {
      // Help construct crotch seam
      paths.hint = new Path()
        .move(points.crotchSeamCurveStart)
        .line(points.crotchSeamCurveMax)
        .line(points.fork)
        .attr('class', 'note lashed')
      macro('hd', {
        from: points.floorOut,
        to: points.floor,
        y: points.floorIn.y - 15,
      })
      macro('hd', {
        from: points.floor,
        to: points.floorIn,
        y: points.floorIn.y - 15,
      })
      macro('hd', {
        from: points.floorOut,
        to: points.floorIn,
        y: points.floorIn.y - 30,
      })
      macro('vd', {
        from: points.floorOut,
        to: points.fork,
        x: points.fork.x + sa + 15,
      })
      macro('vd', {
        from: points.fork,
        to: points.styleWaistInLily,
        x: points.fork.x + sa + 15,
      })
      macro('vd', {
        from: points.floorIn,
        to: points.styleWaistOutLily,
        x:
          (points.seatOut.x < points.styleWaistOutLily.x ? points.seatOut.x : points.styleWaistOutLily.x) -
          sa -
          15,
      })
      macro('vd', {
        from: points.crotchSeamCurveStart,
        to: points.styleWaistInLily,
        x: points.crotchSeamCurveStart.x + sa + 15,
      })
      macro('hd', {
        from: points.seatOut,
        to: points.grainlineTop,
        y: points.styleWaistInLily.y - sa - 15,
      })
      if (points.styleWaistOutLily.x < points.seatOut.x) {
        macro('hd', {
          from: points.styleWaistOutLily,
          to: points.grainlineTop,
          y: points.styleWaistInLily.y - sa - 30,
        })
      }
      macro('hd', {
        from: points.grainlineTop,
        to: points.styleWaistInLily,
        y: points.styleWaistInLily.y - sa - 15,
      })
      macro('hd', {
        from: points.grainlineTop,
        to: points.crotchSeamCurveStart,
        y: points.styleWaistInLily.y - sa - 30,
      })
      macro('hd', {
        from: points.grainlineTop,
        to: points.crotchSeamCurveMax,
        y: points.styleWaistInLily.y - sa - 45,
      })
      macro('hd', {
        from: points.grainlineTop,
        to: points.fork,
        y: points.styleWaistInLily.y - sa - 60,
      })
    }
  }

  return part
}

export const front = {
  name: 'lily.front',
  from: titanFront,
  after: back,
  hide: 'HIDE_TREE',
  draft: draftLilyFront,
}
