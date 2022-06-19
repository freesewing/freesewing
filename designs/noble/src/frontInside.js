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

  console.log( 'Noble front inside' )

  delete points.waistDartHem
  delete points.waistDartRight
  delete points.waistDartRightCp
  delete points.waistDartCpBottom
  delete points.bustDartBottom
  delete points.bustDartCpBottom
  delete points.bustDartTip
  delete points.bustDartTop
  delete points.shoulderDartTipCpDownOutside
  delete points.ex
  delete points.bustB
  delete points.shoulder
  delete points.shoulderDartShoulder
  delete points.shoulderDartOutside
  delete points.pitchMax
  delete points.armholeCpTarget
  delete points.armholePitch
  delete points.armholePitchCp1
  delete points.armholePitchCp2
  delete points.armhole
  delete points.armholeCp2
  delete points.bustDartCpTop
  delete points.bustSide
  delete points.bustDartMiddle
  delete points.bustDartEdge
  // delete points.bustDartCpBottom
  // delete points.bustDartTop
  // delete points.bustDartMiddle

  console.log({part: part})
  
  if( options.dartPosition == 'shoulder' ) {
    paths.insideSeam = new Path()
      .move(points.cfHem)
      .line(points.waistDartLeft)
      .curve(points.waistDartLeftCp, points.shoulderDartTipCpDownInside, points.shoulderDartTip)
      .line(points.shoulderDartInside)
      .line(points.hps)
      .curve(points.hpsCp2, points.cfNeckCp1, points.cfNeck)

    paths.seam = paths.insideSeam.join( new Path().move(points.cfNeck).line(points.cfHem))
      .close()
      .attr('class', 'fabric')
  } else {
    paths.insideSeam = new Path()
      .move(points.cfHem)
      .line(points.waistDartLeft)
      .curve(points.waistDartLeftCp, points.armholeDartTipCpDownInside, points.armholeDartTipInside)
      .curve(points.waistCircleInsideCp1, points.armholeCircleInsideCp1, points.armholeDartInside)
      .join(paths.armholeInside)
      .line(points.hps)
      .curve(points.hpsCp2, points.cfNeckCp1, points.cfNeck)

    paths.seam = paths.insideSeam.join( new Path().move(points.cfNeck).line(points.cfHem))
      .close()
      .attr('class', 'fabric')

  }

  if (complete) {
    points.titleAnchor = new Point(points.hpsCp2.x *.75, points.cfNeckCp1.y *1.5)
    macro('title', {
      at: points.titleAnchor,
      nr: 1,
      title: 'Inside Front',
    })
    points.scaleboxAnchor = points.titleAnchor.shift(-90, 90).shift(0,10)
    macro('scalebox', { at: points.scaleboxAnchor, rotate: 270 })

    macro('cutonfold', {
      from: points.cfNeck,
      to: points.cfHem,
      grainline: true,
    })
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
        x: points.cfNeck.x -15,
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
  
  return part
}
