export default function (part) {
  let {
    utils,
    store,
    sa,
    Point,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    options,
    measurements,
    complete,
    paperless,
    macro,
  } = part.shorthand()

  console.log('Noble front outside')

  delete points.bustDartTop
  delete points.bustSide
  delete points.bustDartMiddle
  delete points.bustDartBottom
  delete points.bustDartCpBottom
  delete points.bustB
  delete points.bustDartEdge

  console.log({ part: part })

  if( options.dartPosition == 'shoulder' ) {
    paths.seam = new Path()
      .move(points.waistDartRight)
      .line(points.sideHem)
      .line(points.armhole)
      .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
      .curve_(points.armholePitchCp2, points.shoulder)
      .line(points.shoulderDartOutside)
      // .curve(points.shoulderDartTipCpDownOutside, points.waistDartRightCp, points.waistDartRight)
      .curve(points.shoulderDartTipCpDownOutside, points.waistUpDartRightCpUp, points.waistUpDartRight)
      .curve(points.waistUpDartRightCpDown, points.waistCpUp, points.waistDartRight)
      .close()
      .attr('class', 'fabric')
  } else {
    paths.seam = new Path()
    .move(points.waistDartRight)
    .line(points.sideHem)
    .line(points.armhole)
    .curve(points.armholeCp2, points.armholeOutsidePitchCp1, points.armholeOutsidePitch)
    .curve(points.armholeOutsidePitchCp2, points.armholeDartOutsideCp1, points.armholeDartOutside)
    .curve(points.armholeCircleOutsideCp1, points.waistCircleOutsideCp1, points.waistUpDartRight)
    .curve(points.waistUpDartRightCpDown, points.waistCpUp, points.waistDartRight)
    .close()
    .attr('class', 'fabric')
  }

  if (complete) {
    points.titleAnchor = points.waistDartRight
      // .shiftFractionTowards(points.armhole, 0.5)
      .shiftFractionTowards(points.shoulderDartOutside, 0.3)
    macro('title', {
      at: points.titleAnchor,
      nr: 2,
      title: 'Outside Front',
    })
    // points.scaleboxAnchor = points.titleAnchor.shift(-90, 70)
    // macro('scalebox', { at: points.scaleboxAnchor })

    // points.grainTemp = points.waistDartRight.shiftFractionTowards( points.sideHemInitial, .2 )
    // points.grainBottom = points.waistDartRight.rotate(270,points.grainTemp)
    // points.grainTop = points.grainTemp.shiftOutwards(points.grainBottom, 200)
    points.grainTop = points.armhole.shift(225, 20)
    points.grainBottom = points.sideHemInitial.shift(135, 20)

    macro('grainline', {
      from: points.grainBottom,
      to: points.grainTop,
    })

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
  }

/*
  paths.tempSeam = new Path()
    .move(points.shoulderDartOutside)
    // .curve(points.shoulderDartTipCpDownOutside, points.waistDartRightCp, points.waistDartRight)
    // .curve(points.shoulderDartTipCpDownOutside, points.bustA, points.waistDartRight)
    .curve(points.shoulderDartTipCpDownOutside, points.bustAcp, points.waistDartRight)
    .attr('class', 'lining dashed')

  paths.shoulderTempDart = new Path()
    .move(points.shoulderDartOutside)
    ._curve(points.shoulderDartCpBottom, points.shoulderDartTip)
    .curve_(points.shoulderDartCpTop, points.shoulderDartInside)
    .attr('class', 'lining')

  paths.insideSeam = new Path()
    .move(points.cfHem)
    .line(points.waistDartLeft)
    .curve(points.waistDartLeftCp, points.shoulderDartTipCpDownInside, points.shoulderDartTip)
    .line(points.shoulderDartInside)
    .line(points.hps)
    .curve(points.hpsCp2, points.cfNeckCp1, points.cfNeck)

  paths.seam2 = paths.insideSeam
    .join(new Path().move(points.cfNeck).line(points.cfHem))
    .close()
    .attr('class', 'fabric')

  if (complete) {
    if (sa) {
      paths.sa = paths.insideSeam.offset(sa).line(points.cfNeck).attr('class', 'fabric sa')
      paths.sa = paths.sa.move(points.cfHem).line(paths.sa.start())
    }
    if (paperless) {
      macro('vd', {
        from: points.cfHem,
        to: points.waistDartTip,
        x: 0 - 15,
      })
      macro('vd', {
        from: points.cfHem,
        to: points.shoulderDartTip,
        x: 0 - 30,
      })
      macro('vd', {
        from: points.cfHem,
        to: points.cfNeck,
        x: 0 - 45,
      })
      macro('vd', {
        from: points.cfHem,
        to: points.hps,
        x: 0 - 60,
      })
      macro('vd', {
        from: points.hps,
        to: points.shoulderDartInside,
        x: points.cfNeck.x - 15,
      })
      macro('hd', {
        from: points.cfBust,
        to: points.shoulderDartTip,
        y: points.shoulderDartTip.y - 15,
      })
      macro('hd', {
        from: points.cfNeck,
        to: points.shoulderDartInside,
        y: points.hps.y - 30,
      })
      macro('hd', {
        from: points.cfHem,
        to: points.waistDartLeft,
        y: points.cfHem.y + sa + 15,
      })
      macro('hd', {
        from: points.cfHem,
        to: points.waistDartTip,
        y: points.cfHem.y + sa + 30,
      })
      macro('hd', {
        from: points.cfNeck,
        to: points.hps,
        y: points.hps.y - sa - 15,
      })
    }

  }
  */
  return part
}
