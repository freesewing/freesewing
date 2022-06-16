export default function (part) {
  let {
    options,
    measurements,
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
  } = part.shorthand()

  if (options.cuffStyle != 'keystone') {
    return part
  }

  let halfInch = store.get('halfInch')
  let slitDistance = store.get('slitDistance')

  points.pA = new Point(0, 0)
  points.pD = points.pA.shift(270, halfInch * 8)
  points.pO = points.pA.shift(180, halfInch * 1.5)
  points.pB = points.pA.shift(180, slitDistance)
  points.pE = points.pB.shift(270, halfInch)
  points.pF = points.pE.shift(180, halfInch)
  points.pC = points.pA.shift(180, measurements.knee + halfInch * 3)
  points.pG = points.pD.shift(0, halfInch)
  points.pH = points.pG.shift(180, measurements.knee + halfInch * 5)
  points.pJ = points.pE.shift(180, halfInch / 2).shift(270, points.pA.dist(points.pG))

  points.pAcpE = points.pA.shift(points.pA.angle(points.pG) - 90, points.pA.dist(points.pE) * 0.5)
  points.pEcpA = points.pE.shift(0, points.pE.dist(points.pA) * 0.2)
  points.pCcpF = points.pC.shift(points.pC.angle(points.pH) + 90, points.pC.dist(points.pF) * 0.5)
  points.pFcpC = points.pF.shift(180, points.pF.dist(points.pC) * 0.15)

  points.pGcpJ = points.pG.shift(points.pG.angle(points.pA) + 90, points.pG.dist(points.pJ) * 0.5)
  points.pJcpG = points.pJ.shift(0, points.pJ.dist(points.pG) * 0.25)
  points.pHcpJ = points.pH.shift(points.pH.angle(points.pC) - 90, points.pH.dist(points.pJ) * 0.5)
  points.pJcpH = points.pJ.shift(180, points.pJ.dist(points.pH) * 0.25)

  points.pCout = points.pCcpF.shiftOutwards(points.pC, halfInch * 2)
  points.pHout = points.pHcpJ.shiftOutwards(points.pH, halfInch * 2)

  paths.top = new Path()
    .move(points.pA)
    .curve(points.pAcpE, points.pEcpA, points.pE)
    .line(points.pF)
    .curve(points.pFcpC, points.pCcpF, points.pC)
    .line(points.pCout)

  paths.left = new Path().move(points.pCout).line(points.pHout)

  paths.bottom = new Path()
    .move(points.pHout)
    .line(points.pH)
    .curve(points.pHcpJ, points.pJcpH, points.pJ)
    .curve(points.pJcpG, points.pGcpJ, points.pG)

  paths.right = new Path().move(points.pG).line(points.pA)

  paths.seam = paths.top
    .join(paths.left)
    .join(paths.bottom)
    .join(paths.right)
    .close()
    .attr('class', 'fabric')

  if (complete) {
    paths.dart = new Path()
      .move(points.pF)
      .line(points.pJ)
      .line(points.pE)
      .attr('class', 'fabric')
      .attr('data-text', 'dart')
      .attr('data-text-class', 'text-xs')

    points.buttonsTop = paths.top.shiftAlong(halfInch * 1.5)
    points.buttonsBottom = paths.bottom.shiftAlong(paths.bottom.length() - halfInch * 1.5)

    points.pBH1 = points.buttonsTop.shiftFractionTowards(points.buttonsBottom, 0.2)
    points.pBH2 = points.buttonsTop.shiftFractionTowards(points.buttonsBottom, 0.5)
    points.pBH3 = points.buttonsTop.shiftFractionTowards(points.buttonsBottom, 0.8)

    points.pB1 = points.pC.shiftFractionTowards(points.pH, 0.2)
    points.pB2 = points.pC.shiftFractionTowards(points.pH, 0.5)
    points.pB3 = points.pC.shiftFractionTowards(points.pH, 0.8)

    snippets.bh1 = new Snippet('buttonhole', points.pBH1)
    snippets.bh2 = new Snippet('buttonhole', points.pBH2)
    snippets.bh3 = new Snippet('buttonhole', points.pBH3)

    snippets.b1 = new Snippet('button', points.pB1)
    snippets.b2 = new Snippet('button', points.pB2)
    snippets.b3 = new Snippet('button', points.pB3)

    snippets.n1 = new Snippet('notch', points.pA)
    snippets.n2 = new Snippet('notch', points.pC.shiftTowards(points.pCcpF, halfInch * 1.5))

    points.logo = points.pA.shiftFractionTowards(points.pH, 0.5).shift(180, 70).shift(270, 30)
    snippets.logo = new Snippet('logo', points.logo)
    points.title = points.logo.shift(0, 70)
    macro('title', {
      nr: 78,
      at: points.title,
      title: 'LegBand',
    })

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.pCout,
      to: points.pF,
      y: points.pA.y - sa - 15,
    })
    macro('hd', {
      from: points.pF,
      to: points.pE,
      y: points.pA.y - sa - 15,
    })
    macro('hd', {
      from: points.pE,
      to: points.pA,
      y: points.pA.y - sa - 15,
    })
    macro('hd', {
      from: points.pHout,
      to: points.pG,
      y: points.pG.y + sa + 15,
    })
    macro('ld', {
      from: points.pC,
      to: points.pB1,
      d: 15,
    })
    macro('ld', {
      from: points.pB1,
      to: points.pB2,
      d: 15,
    })
    macro('ld', {
      from: points.pB2,
      to: points.pB3,
      d: 15,
    })
    macro('ld', {
      from: points.pB3,
      to: points.pH,
      d: 15,
    })
    macro('ld', {
      from: points.pA,
      to: points.pG,
      d: 15 + sa,
    })
    macro('vd', {
      from: points.pE,
      to: points.pJ,
      x: points.pJ.x - 15,
    })
    macro('vd', {
      from: points.pF,
      to: points.pA,
      x: points.pF.x - 15,
    })
  }

  return part
}
