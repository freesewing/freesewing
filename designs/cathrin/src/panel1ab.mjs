export function draftPanel1ab({ macro, utils, sa, points, paths, Point, Path, store, part }) {
  points.anchor = points.topCF.clone()

  let top = new Path()
    .move(points.underbustGap1Left)
    .curve(points.frontRiseStartCp2, points.topCFCp1, points.topCF)
  points.topABsplit = top.shiftFractionAlong(0.3)
  let bottom = new Path()
    .move(points.bottomCF)
    .curve(paths.panel1.ops[1].cp1, paths.panel1.ops[1].cp2, paths.panel1.ops[1].to)
  points.bottomABsplit = bottom.shiftFractionAlong(0.3)

  paths.panel1a_nonfold = new Path()
    .move(points.bottomCF)
    .join(bottom.split(points.bottomABsplit)[0])
    .line(points.topABsplit)
    .join(top.split(points.topABsplit)[1])
    .hide()
  paths.panel1a = paths.panel1a_nonfold.clone().close().attr('class', 'fabric').unhide()
  paths.panel1b = bottom
    .split(points.bottomABsplit)[1]
    .curve(points.hipsGap1Cp, points.waistGap1LeftCp1, points.waistGap1Left)
    .curve(points.waistGap1LeftCp2, points.underbustGap1LeftCp, points.underbustGap1Left)
    .join(top.split(points.topABsplit)[0])
    .line(points.bottomABsplit)
    .close()
    .attr('class', 'fabric')
  let translation = 5
  if (sa) translation = 2 * sa + 5
  paths.panel1b = paths.panel1b.translate(translation, 0)
  delete paths.panel1

  if (sa) {
    paths.saA = paths.panel1a_nonfold.offset(sa).attr('class', 'fabric sa')
    paths.saA.line(points.topCF).move(points.bottomCF).line(paths.saA.start())
    paths.saB = paths.panel1b.offset(sa).attr('class', 'fabric sa')
  }

  /*
   * Annotations
   */

  // Cut list 1a
  store.cutlist.setCut([
    { cut: 1, from: 'interfacing' },
    { cut: 1, from: 'fabric' },
  ])

  // Cut on fold
  macro('cutonfold', {
    to: points.bottomCF,
    from: points.topCF,
    grainline: true,
  })

  // Grainline
  macro('grainline', {
    to: points.topABsplit.translate(translation, 0),
    from: new Point(
      points.topABsplit.translate(translation, 0).x,
      points.hipsGap1.translate(translation, 0).y
    ),
  })

  // Title 1a
  points.midwayAB = points.topABsplit.shiftFractionTowards(points.bottomABsplit, 0.5)
  points.titleA = points.underbustCF.shiftFractionTowards(points.midwayAB, 0.5)
  macro('title', {
    id: '1a',
    nr: '1a',
    title: 'panel1a',
    at: points.titleA,
    align: 'center',
    scale: 0.7,
  })

  // Cut list 1b
  store.cutlist.setCut([
    { cut: 2, from: 'interfacing' },
    { cut: 2, from: 'fabric' },
  ])

  // Title 1b
  points.titleB = points.hipsGap1
    .translate(translation, 0)
    .shiftFractionTowards(points.midwayAB, 0.5)
  macro('title', {
    id: '1b',
    nr: '1b',
    title: 'panel1b',
    at: points.titleB,
    align: 'center',
    scale: 0.7,
  })

  // Dimensions 1a
  macro('vd', {
    id: 'hCfBottomToWaist1a',
    from: points.bottomCF,
    to: points.waistCF,
    x: points.topCF.x - sa - 30,
  })
  macro('vd', {
    id: 'hCfWaistToTop1a',
    from: points.waistCF,
    to: points.topCF,
    x: points.topCF.x - sa - 30,
  })
  points.waistAB = utils.beamsIntersect(
    points.topABsplit,
    points.bottomABsplit,
    points.waistCF,
    points.waistGap1
  )
  macro('vd', {
    id: 'hSideBottomToWaist1a',
    from: points.bottomABsplit,
    to: points.waistAB,
    x: points.topCF.x - sa - 15,
  })
  macro('vd', {
    id: 'hSideWaistToTop1a',
    from: points.waistAB,
    to: points.topABsplit,
    x: points.topCF.x - sa - 15,
  })
  macro('hd', {
    id: 'wBottom1a',
    from: points.bottomCF,
    to: points.bottomABsplit,
    y: points.bottomCF.y + sa + 15,
  })
  macro('ld', {
    id: 'wAtWaist1a',
    from: points.waistCF,
    to: points.waistAB,
  })
  macro('hd', {
    id: 'wAtTop1a',
    from: points.topCF,
    to: points.topABsplit,
    y: points.topCF.y - sa - 15,
  })

  // Dimensions 1a
  macro('vd', {
    id: 'hSideBottomToWaist1b',
    from: points.hipsGap1.translate(translation, 0),
    to: points.waistGap1Left.translate(translation, 0),
    x: points.underbustGap1Left.translate(translation, 0).x + sa + 15,
  })
  macro('vd', {
    id: 'hSideWaistToTop1b',
    from: points.waistGap1Left.translate(translation, 0),
    to: points.underbustGap1Left.translate(translation, 0),
    x: points.underbustGap1Left.translate(translation, 0).x + sa + 15,
  })
  macro('vd', {
    id: 'hCenterBottomToWaist1b',
    from: points.bottomABsplit.translate(translation, 0),
    to: points.waistAB.translate(translation, 0),
    x: points.underbustGap1Left.translate(translation, 0).x + sa + 30,
  })
  macro('vd', {
    id: 'hCenterwaistTotop',
    from: points.waistAB.translate(translation, 0),
    to: points.topABsplit.translate(translation, 0),
    x: points.underbustGap1Left.translate(translation, 0).x + sa + 30,
  })
  macro('hd', {
    id: 'wBottom1b',
    from: points.bottomABsplit.translate(translation, 0),
    to: points.hipsGap1.translate(translation, 0),
    y: points.bottomABsplit.y + sa + 15,
  })
  macro('ld', {
    id: 'wAtWaist1b',
    from: points.waistAB.translate(translation, 0),
    to: points.waistGap1Left.translate(translation, 0),
  })
  macro('hd', {
    id: 'wAtTop1b',
    from: points.topABsplit.translate(translation, 0),
    to: points.underbustGap1Left.translate(translation, 0),
    y: points.topABsplit.y - sa - 15,
  })

  return part
}
