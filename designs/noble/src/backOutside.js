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

  

  console.log( 'Noble back outside' )

  console.log( {part:part})
  paths.outsideSeam = new Path()
    .move(points.dartBottomRight)
    .line(points.waistSide)
    .curve_(points.waistSideCp2, points.armhole)
    .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
    .curve_(points.armholePitchCp2, points.shoulder)
    .line(points.shoulderDart)
    .curve(points.shoulderDart, points.shoulderDartCpUp, points.dartTip)
    .curve(points.shoulderDartCpDown, points.dartRightCp, points.dartBottomRight)
    .close()
    .attr('class', 'fabric')
  
    if (complete) {
      points.titleAnchor = points.dartBottomRight.shiftFractionTowards( points.waistSide, .35 ).shiftFractionTowards( points.shoulderDart, .35 )
      macro('title', {
        at: points.titleAnchor,
        nr: 4,
        title: 'Outside Back',
      })
      points.grainlineFrom.x = points.shoulderDart.x
      points.grainlineTo.x = points.shoulderDart.x

      macro("grainline", {
        from: points.grainlineFrom,
        to: points.grainlineTo,
      })
  
      if (sa) paths.sa = paths.outsideSeam.offset(sa).attr('class', 'fabric sa')

    }
    
    return part
}
