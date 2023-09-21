import { front } from './front.mjs'
import { back } from './back.mjs'

function findR(part, height, arcLength) {
  let { log } = part.shorthand()

  let iter = 0
  let a = 0.5
  let diff = (a * height) / (1 - Math.cos(a / 2)) - arcLength

  do {
    if (diff < 0) {
      a = a * (0.995 + diff / 1000)
    } else {
      a = a * (1.003 + diff / 1000)
    }
    diff = (a * height) / (1 - Math.cos(a / 2)) - arcLength
    iter++
    //console.log( {iter, diff, a} );
  } while ((diff < -1 || diff > 1) && iter < 50)
  if (iter >= 500) {
    log.error('Could not find the radius for the legband within 500 iterations')
  }

  return a * (180 / Math.PI)
}

function draftCorneliusLegband({
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
  if (options.cuffStyle == 'keystone') {
    return part
  }

  const cc = 0.551915024494 // circle constant

  let halfInch = store.get('halfInch')
  let backLeg = store.get('backLegSeam')
  let frontLeg = store.get('frontLegSeam')

  let cuffWidth = halfInch * 4 * (1 + options.cuffWidth)
  let flapLength = halfInch * 3
  let traditional = options.cuffStyle == 'traditional'

  // let belowKnee = measurements.knee *(traditional ? options.kneeToBelow : 1)
  backLeg = backLeg * (traditional ? options.kneeToBelow : 1)
  frontLeg = frontLeg * (traditional ? options.kneeToBelow : 1)
  let flapRatio = flapLength / backLeg

  points.pA = new Point(0, 0)
  points.pB = points.pA.shift(270, frontLeg /* belowKnee /2 */)
  points.pE = points.pB.shift(0, cuffWidth)
  points.pF = points.pA.shift(0, cuffWidth)

  if (traditional) {
    let angle = findR(part, (halfInch / 4) * 5, backLeg /*belowKnee /2*/)
    let angleR = angle / (180 / Math.PI)
    let radius = backLeg /*belowKnee /2*/ / angleR
    points.pC = points.pB.shift(270 - angle / 2, 2 * radius * Math.sin(angleR / 2))
    points.pBcpC = points.pB.shift(270, (radius * cc) / 2)
    points.pCcpB = points.pC.shift(90 - angle, (radius * cc) / 2)
    points.pD = points.pC.shift(0 - angle, cuffWidth)
    points.pDcpE = points.pD.shift(90 - angle, ((radius + cuffWidth) * cc) / 2)
    points.pEcpD = points.pE.shift(270, ((radius + cuffWidth) * cc) / 2)
    points.pAout = points.pA.shift(
      90 + (angle / 2) * flapRatio,
      2 * radius * Math.sin(angleR / 2) * flapRatio
    )
    points.pAcpAout = points.pA.shift(90, (radius * flapRatio * cc) / 2)
    points.pAoutcpA = points.pAout.shift(270 + angle * flapRatio, ((radius * cc) / 2) * flapRatio)
    points.pFout = points.pAout.shift(0 + angle * flapRatio, cuffWidth)
    points.pFoutcpF = points.pFout.shift(
      270 + angle * flapRatio,
      (((radius + cuffWidth) * cc) / 2) * flapRatio
    )
    points.pFcpFout = points.pF.shift(90, (((radius + cuffWidth) * cc) / 2) * flapRatio)
  } else {
    points.pC = points.pB.shift(270, backLeg)
    points.pBcpC = points.pB.shift(270, 10)
    points.pCcpB = points.pC.shift(90, 10)
    points.pD = points.pC.shift(0, cuffWidth)
    points.pDcpE = points.pD.shift(90, 10)
    points.pEcpD = points.pE.shift(270, 10)
    points.pAout = points.pA.shift(90, backLeg * flapRatio)
    points.pAcpAout = points.pA.shift(90, 1)
    points.pAoutcpA = points.pAout.shift(270, 1)
    points.pFout = points.pAout.shift(0, cuffWidth)
    points.pFoutcpF = points.pFout.shift(270, 1)
    points.pFcpFout = points.pF.shift(90, 1)
  }
  points.pG = points.pAout.shift(
    points.pAout.angle(points.pFout) + 45,
    Math.sqrt(2 * (cuffWidth / 2) * (cuffWidth / 2))
  )

  paths.seam = new Path()
    .move(points.pA)
    .line(points.pB)
    .curve(points.pBcpC, points.pCcpB, points.pC)
    .line(points.pD)
    .curve(points.pDcpE, points.pEcpD, points.pE)
    .line(points.pF)
    .curve(points.pFcpFout, points.pFoutcpF, points.pFout)
    .line(points.pG)
    .line(points.pAout)
    .curve(points.pAoutcpA, points.pAcpAout, points.pA)
    .close()
    .attr('class', 'fabric')

  paths.mark = new Path().move(points.pA).line(points.pF).attr('class', 'fabric')

  if (complete) {
    points.buttonHole = points.pAout.shiftFractionTowards(points.pFout, 0.5)
    points.button = points.pC
      .shiftFractionTowards(points.pD, 0.5)
      .shift(points.pC.angle(points.pD) + 90, backLeg * flapRatio)

    snippets.bh = new Snippet('buttonhole', points.buttonHole)
    snippets.b = new Snippet('button', points.button)

    snippets.n1 = new Snippet('notch', points.pA)
    snippets.n2 = new Snippet('notch', points.pB)
    snippets.n3 = new Snippet('notch', points.pC)

    points.logo = points.pA.shiftFractionTowards(points.pE, 0.5) //.shift(180,70).shift(270,30);
    snippets.logo = new Snippet('logo', points.logo)
    points.title = points.logo.shift(270, 70)
    macro('title', {
      nr: 78,
      at: points.title,
      title: 'LegBand',
      align: 'center',
    })

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.pA,
      to: points.pF,
      y: points.pA.y,
    })
    if (traditional) {
      macro('hd', {
        from: points.pB,
        to: points.pC,
        y: points.pB.y,
      })
    }
    macro('ld', {
      from: points.pD,
      to: points.pC,
      d: +sa + 15,
    })
    macro('ld', {
      from: points.pA,
      to: points.pAout,
      d: +sa + 15,
    })
    macro('vd', {
      from: points.pB,
      to: points.pA,
      x: points.pA.x - sa - 15,
    })
    macro('vd', {
      from: points.pC,
      to: points.pB,
      x: points.pC.x - (traditional ? 0 : sa + 15),
    })
  }

  return part
}

export const legband = {
  name: 'cornelius.legband',
  after: [back, front],
  options: {
    kneeToBelow: { pct: 94, min: 85, max: 110, menu: 'advanced' },
    cuffWidth: { pct: 0, min: -50, max: 150, menu: 'style' },
    cuffStyle: { dflt: 'elegant', list: ['traditional', 'elegant', 'keystone'], menu: 'style' },
  },
  draft: draftCorneliusLegband,
}
