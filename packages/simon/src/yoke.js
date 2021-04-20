export default (part) => {
  let {
    sa,
    Point,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    complete,
    paperless,
    macro,
    options
  } = part.shorthand()

  for (let id of Object.keys(part.paths)) delete part.paths[id]

  // Cut off at yoke
  points.cbYoke = new Point(0, points.armholePitch.y)

  // Paths
  paths.saBase = new Path()
    .move(points.cbYoke)
    .line(points.armholePitch)
    .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
    .line(points.neck)
    .curve_(points.neckCp2, points.cbNeck)
  if (options.splitYoke) paths.saBase = paths.saBase.line(points.cbYoke).close()
  else {
    for (let p of ['neckCp2', 'neck', 'shoulder', 'shoulderCp1', 'armholePitchCp2', 'armholePitch'])
      points['_' + p] = points[p].flipX()
    paths.saBase
      ._curve(points._neckCp2, points._neck)
      .line(points._shoulder)
      .curve(points._shoulderCp1, points._armholePitchCp2, points._armholePitch)
      .line(points.cbYoke)
      .close()
  }
  paths.seam = paths.saBase.clone()
  paths.saBase.render = false
  paths.seam = paths.seam.close().attr('class', 'fabric')

  // Complete pattern?
  if (complete) {
    delete snippets.armholePitchNotch
    points.title = new Point(points.neck.x, points.cbYoke.y / 3)
    macro('title', { at: points.title, nr: 4, title: 'yoke', scale: 0.8 })
    points.logo = points.title.shift(-90, 50)
    snippets.logo = new Snippet('logo', points.logo)
    snippets.logo.attr('data-scale', 0.8)
    if (options.splitYoke) {
      macro('cutonfold', {
        from: points.cbNeck,
        to: points.cbYoke,
        grainline: true
      })
      snippets.sleeveNotch = new Snippet('bnotch', points.armholePitch)
    } else {
      points.grainlineFrom = points.cbYoke.shift(0, 20)
      points.grainlineTo = points.cbNeck.shift(0, 20)
      macro('grainline', {
        from: points.grainlineFrom,
        to: points.grainlineTo
      })
      snippets.sleeveNotchA = new Snippet('bnotch', points.armholePitch)
      snippets.sleeveNotchB = new Snippet('bnotch', points._armholePitch)
    }

    if (sa) {
      paths.sa = paths.saBase.offset(sa).attr('class', 'fabric sa')
      if (options.splitYoke) {
        paths.sa = paths.sa.line(points.cbNeck).move(points.cbYoke).line(paths.sa.start())
      }
    }
  }

  // Paperless?
  if (paperless) {
    macro('pd', {
      path: new Path().move(points.cbNeck)._curve(points.neckCp2, points.neck),
      d: 15
    })
    macro('hd', {
      from: points.cbNeck,
      to: points.neck,
      y: points.neck.y - 15 - sa
    })
    macro('ld', {
      from: points.neck,
      to: points.shoulder,
      d: 15 + sa
    })
    macro('hd', {
      from: points.cbYoke,
      to: points.armholePitch,
      y: points.cbYoke.y + 15 + sa
    })
    macro('hd', {
      from: points.cbYoke,
      to: points.shoulder,
      y: points.cbYoke.y + 30 + sa
    })
    macro('vd', {
      from: points.cbYoke,
      to: points.cbNeck,
      x: points.cbYoke.x - 15 - sa
    })
    macro('pd', {
      path: new Path()
        .move(points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder),
      d: 15 + sa
    })
    macro('vd', {
      from: points.armholePitch,
      to: points.shoulder,
      x: points.shoulder.x + 30 + sa
    })
  }

  return part
}
