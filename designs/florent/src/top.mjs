import { pluginBundle } from '@freesewing/plugin-bundle'

function draftFlorentTop({
  paperless,
  sa,
  points,
  macro,
  Point,
  Path,
  paths,
  snippets,
  Snippet,
  complete,
  store,
  part,
}) {
  const fitCap = (part, scale) => {
    let { points, options, Point, Path, measurements } = part.shorthand()

    let base = scale * measurements.head * (1 + options.headEase)

    // Top
    points.midFront = new Point(0, 0)
    points.midFrontCp2 = points.midFront.shift(-90, base * 0.074)
    points.midMid = points.midFront.shift(0, base * 0.34)
    points.midBack = new Point(base * 0.654, base * 0.124)
    points.midSide = new Point(base * 0.2525, base * 0.178)
    points.midSideCp1 = points.midSide.shift(180, base * 0.185)
    points.midSideCp2 = points.midSide.shift(0, base * 0.101)
    points.backHollow = new Point(base * 0.488, base * 0.136)
    points.backHollowCp1 = points.backHollow.shift(180, base * 0.033)
    points.backHollowCp2 = points.backHollow.shift(0, base * 0.033)
    points.backEdge = new Point(base * 0.576, base * 0.185)
    let angle = points.backEdge.angle(points.midBack) + 90
    points.backSide = points.backEdge.shift(angle, base * 0.025)
    points.backSideCp1 = points.backSide.shift(angle, base * 0.02)
    points.midMidCp1 = points.midMid.shift(0, base * 0.1)
    points.midBackCp2 = points.midBack.shift(angle, base * 0.09)

    // Side
    points.foldTop = new Point(0, 0)
    points.foldTopCp1 = points.foldTop.shift(-90, base * 0.0433)
    points.foldBottom = points.foldTop.shift(0, base * 0.126)
    points.foldBottomCp2 = points.foldBottom.shift(-90, base * 0.0866)
    points.tip = new Point(base * 0.411, base * 0.207)
    points.tipCp1 = points.tip.shift(-85, base * 0.1)
    points.tipCp2 = points.tip.shift(177, base * 0.067)
    points.outerTop = new Point(base * 0.328, base * 0.337)
    points.outerTopCp1 = points.outerTop.shift(180, base * 0.05)
    points.outerTopCp2 = points.outerTop.shift(0, base * 0.05)
    points.outerGuide = new Point(base * 0.0867, base * 0.1913)
    points.outerGuideCp1 = points.outerGuide.shift(135, base * 0.076)
    points.outerGuideCp2 = points.outerGuide.shift(-45, base * 0.145)
    points.innerGuide = new Point(base * 0.22, base * 0.172)
    points.innerGuideCp1 = points.innerGuide.shift(-38, base * 0.052)
    points.innerGuideCp2 = points.innerGuide.shift(142, base * 0.035)

    let backLength = points.backEdge.dist(points.midBack) * 2
    let sideLength =
      new Path()
        .move(points.tip)
        .curve(points.tipCp2, points.innerGuideCp1, points.innerGuide)
        .curve(points.innerGuideCp2, points.foldBottomCp2, points.foldBottom)
        .length() * 2

    // Return delta between target and actual seam length
    return measurements.head * (1 + options.headEase) - (backLength + sideLength)
  }

  const sideSeamDelta = (part) => {
    let { Path } = part.shorthand()

    let top = new Path()
      .move(points.midFront)
      .curve(points.midFrontCp2, points.midSideCp1, points.midSide)
      .curve(points.midSideCp2, points.backHollowCp1, points.backHollow)
      .curve(points.backHollowCp2, points.backSideCp1, points.backSide)
      .line(points.backEdge)
      .length()

    let side = new Path()
      .move(points.foldTop)
      .curve(points.foldTopCp1, points.outerGuideCp1, points.outerGuide)
      .curve(points.outerGuideCp2, points.outerTopCp1, points.outerTop)
      .curve(points.outerTopCp2, points.tipCp1, points.tip)
      .length()

    return top - side
  }

  // Fit head
  let scale = 1
  let count = 1
  let delta = fitCap(part, scale)
  while (Math.abs(delta) > 1 && count < 25) {
    count++
    if (delta > 0) scale = 1000 / (1000 - delta)
    // Too small
    else scale = 1000 / (1000 + delta) // Too large
    delta = fitCap(part, scale)
  }

  // Match side seam
  delta = sideSeamDelta(part)
  count = 1
  let top = ['outerTop', 'outerTopCp1', 'outerTopCp2']
  let guide = ['outerGuide', 'outerGuideCp1', 'outerGuideCp2']
  while (Math.abs(delta) > 1 && count < 25) {
    for (let i of top) points[i] = points[i].shift(-90, delta / 3)
    for (let i of guide) points[i] = points[i].shift(-135, delta / 3)
    delta = sideSeamDelta(part)
    count++
  }

  // Paths
  paths.seam = new Path()
    .move(points.midMid)
    .line(points.midFront)
    .curve(points.midFrontCp2, points.midSideCp1, points.midSide)
    .curve(points.midSideCp2, points.backHollowCp1, points.backHollow)
    .curve(points.backHollowCp2, points.backSideCp1, points.backSide)
    .line(points.backEdge)
    .line(points.midBack)
    .curve(points.midBackCp2, points.midMidCp1, points.midMid)
    .close()
    .attr('class', 'fabric')

  paths.side = new Path()
    .move(points.foldTop)
    .curve(points.foldTopCp1, points.outerGuideCp1, points.outerGuide)
    .curve(points.outerGuideCp2, points.outerTopCp1, points.outerTop)
    .curve(points.outerTopCp2, points.tipCp1, points.tip)
    .curve(points.tipCp2, points.innerGuideCp1, points.innerGuide)
    .curve(points.innerGuideCp2, points.foldBottomCp2, points.foldBottom)
    .attr('class', 'fabric')

  // Uncomment to see the side part here
  paths.side.hide()

  points.grainlineFrom = new Point(points.midSideCp1.x, points.midBack.y)
  points.grainlineTo = points.midBack.clone()
  macro('grainline', {
    from: points.grainlineFrom,
    to: points.grainlineTo,
  })

  store.cutlist.addCut({ cut: 2 })
  store.cutlist.addCut({ cut: 2, material: 'lining' })

  if (complete) {
    points.title = new Point(points.midMid.x, points.midFrontCp2.y)
    macro('title', {
      at: points.title,
      nr: 1,
      title: 'top',
    })
    points.logo = new Point(points.title.x / 2, points.title.y)
    snippets.logo = new Snippet('logo', points.logo).attr('data-scale', 0.75)
    macro('miniscale', { at: new Point(points.title.x * 0.75, points.title.y) })
    macro('sprinkle', {
      snippet: 'notch',
      on: ['midMid', 'backHollow', 'midSide'],
    })
    store.set(
      'topDistanceToFirstNotch',
      new Path()
        .move(points.backEdge)
        .line(points.backSide)
        .curve(points.backSideCp1, points.backHollowCp2, points.backHollow)
        .length()
    )
    store.set(
      'topDistanceToSecondNotch',
      new Path()
        .move(points.backHollow)
        .curve(points.backHollowCp1, points.midSideCp2, points.midSide)
        .length() + store.get('topDistanceToFirstNotch')
    )

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

    if (paperless) {
      macro('vd', {
        from: points.midSide,
        to: points.foldTop,
        x: points.foldTop.x - sa - 15,
      })
      macro('vd', {
        from: points.backHollow,
        to: points.midMid,
        x: points.midMid.x - 15,
      })
      macro('vd', {
        from: points.midBack,
        to: points.midMid,
        x: points.midBack.x + sa + 15,
      })
      macro('vd', {
        from: points.backEdge,
        to: points.midMid,
        x: points.midBack.x + sa + 30,
      })
      macro('hd', {
        from: points.foldTop,
        to: points.midSide,
        y: points.midSide.y + sa + 15,
      })
      macro('hd', {
        from: points.foldTop,
        to: points.backHollow,
        y: points.midSide.y + sa + 30,
      })
      macro('hd', {
        from: points.foldTop,
        to: points.backEdge,
        y: points.midSide.y + sa + 45,
      })
      macro('hd', {
        from: points.foldTop,
        to: points.midBack,
        y: points.midSide.y + sa + 60,
      })
    }
  }

  return part
}

export const top = {
  name: 'florent.top',
  measurements: ['head'],
  options: {
    // Constants
    topSide: 0.8,
    brim: 0,
    // Percentages
    headEase: { pct: 2, min: 0, max: 5, menu: 'fit' },
  },
  plugins: [pluginBundle],
  draft: draftFlorentTop,
}
