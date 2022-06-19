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

  // delete points.armholePitch
  // delete points.armholePitchCp1
  // delete points.armholePitchCp2
  // delete points.armholeCpTarget
  // delete points.armholeCp2
  // delete points.armhole
  // delete points.bustSide
  // delete points.waistSide
  // delete points.waistSideCp2
  // delete points.dartBottomRight
  // delete points.dartBottomCenter
  // delete points.dartRightCp
  // delete points.bustDartRight
  
  // Hide Bella paths
  for (let key of Object.keys(paths)) paths[key].render = false
  for (let i in snippets) delete snippets[i]
  //removing macros not required from Bella
  
  console.log( 'Noble back inside' )
    
  paths.insideSeam = new Path()
    .move(points.cbNeck)
    .curve_(points.cbNeckCp2, points.waistCenter)
    .line(points.dartBottomLeft)
    .curve(points.dartLeftCp, points.shoulderDartCpDown, points.dartTip)
    .curve(points.shoulderDartCpUp, points.shoulderDart, points.shoulderDart)
    .line(points.hps)
    ._curve(points.cbNeckCp1, points.cbNeck)
    .close()
    .attr('class', 'fabric')
  
  if (complete) {
    // points.titleAnchor = points.waistDartRight.shiftFractionTowards( points.armhole, .5 )
    macro('title', {
      at: points.titleAnchor,
      nr: 3,
      title: 'Inside Back',
    })
    macro("grainline", {
      from: points.grainlineFrom,
      to: points.grainlineTo,
    })

    if (sa) paths.sa = paths.insideSeam.offset(sa).attr('class', 'fabric sa')
  }
  
  return part
}
