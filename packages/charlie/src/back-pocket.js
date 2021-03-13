export default (part) => {
  // Shorthand
  let {
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
    sa
  } = part.shorthand()

  //store.set('backPocketToWaistband', base * options.backPocketVerticalPlacement)
  //store.set('backPocketWidth', base * options.backPocketWidth)
  //store.set('backPocketDepth', base * options.backPocketDepth)

  points.leftNotch = new Point(store.get('backPocketWidth') / -2, 0)
  points.rightNotch = points.leftNotch.flipX()
  points.waistbandLeft = new Point(
    points.leftNotch.x * 1.2,
    store.get('backPocketToWaistband') * -1
  )
  points.waistbandRight = points.waistbandLeft.flipX()
  points.foldLeft = new Point(
    points.waistbandLeft.x,
    points.leftNotch.y + store.get('backPocketDepth')
  )
  points.foldRight = points.foldLeft.flipX()
  points.bottomLeft = new Point(
    points.waistbandLeft.x,
    points.foldLeft.y + store.get('backPocketDepth')
  )
  points.bottomRight = points.bottomLeft.flipX()

  paths.seam = new Path()
    .move(points.waistbandRight)
    .line(points.waistbandLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.waistbandRight)
    .close()
    .attr('class', 'lining')

  if (complete) {
    paths.opening = new Path()
      .move(points.leftNotch)
      .line(points.rightNotch)
      .attr('class', 'dashed')
    paths.fold = new Path().move(points.foldLeft).line(points.foldRight).attr('class', 'help')
    points.titleAnchor = points.rightNotch.shiftFractionTowards(points.foldLeft, 0.5)
    macro('title', {
      at: points.titleAnchor,
      nr: 5,
      title: 'pocketBag'
    })
    points.logoAnchor = points.foldLeft.shiftFractionTowards(points.bottomRight, 0.5)
    snippets.logo = new Snippet('logo', points.logoAnchor)
    points.grainlineTop = points.waistbandLeft.shiftFractionTowards(points.waistbandRight, 0.15)
    points.grainlineBottom = points.bottomLeft.shiftFractionTowards(points.bottomRight, 0.15)
    macro('grainline', {
      from: points.grainlineTop,
      to: points.grainlineBottom
    })

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'lining sa')

    if (paperless) {
    }
  }

  return part
}
