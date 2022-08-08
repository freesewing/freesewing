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
    paperless,
    macro,
  } = part.shorthand()

  paths.seam = new Path()
    .move(points.mWaist1)
    .line(points.mWaist2)
    .line(options.separateWaistband ? points.bWaistSideSeam : points.bWaistSide)
    .join(paths.backTopCutOut)
    .join(paths.backBottomCutOut)
    .join(paths.frontBottomCutOut)
    .join(paths.frontTopCutOut)
    .close()
    .attr('class', 'fabric')

  paths.cutout.setRender(false)


  // Complete?
  if (complete) {
    points.title = points.mWaist.shift(270, 75)
    macro('title', {
      nr: 2,
      at: points.title,
      title: 'cutOut',
    })

    points.logo = points.title.shift(270, 75)

    snippets.logo = new Snippet('logo', points.logo)

    if (sa) {
      paths.seamAlternate = new Path()
        .move(options.separateWaistband ? points.bWaistSideSeam : points.bWaistSide)
        .join(paths.backTopCutOut)
        .join(paths.backBottomCutOut)
        .join(paths.frontBottomCutOut)
        .join(paths.frontTopCutOut)
    
      paths.sa = paths.seamAlternate.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.fWaistSide,
      to: points.mWaist,
      y: (options.separateWaistband ? points.fWaistSideCp2 : points.mWaist).y,
    })
    macro('hd', {
      from: points.mWaist,
      to: points.bWaistSide,
      y: (options.separateWaistband ? points.fWaistSideCp2 : points.mWaist).y,
    })
    macro('vd', {
      from: points.mWaist1,
      to: points.mHip,
      x: points.mWaist.x,
    })
    macro('vd', {
      from: points.mWaist2,
      to: points.mWaist1,
      x: points.mWaist.x + 15,
    })
  }
  part.render = options.showMini

  return part
}
