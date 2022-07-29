export default (part) => {
  const { sa, Point, points, Path, paths, Snippet, snippets, complete, paperless, macro, options } =
    part.shorthand()

  for (const id in paths) {
    if (['backCollar', 'backArmhole', 'backArmholeYoke'].indexOf(id) === -1) delete part.paths[id]
  }

  // Paths
  paths.saBase = new Path().move(points.cbYoke).line(points.armholeYokeSplitPreBoxpleat)
  if (options.yokeHeight > 0) paths.saBase = paths.saBase.join(paths.backArmholeYoke)
  paths.saBase = paths.saBase.line(points.s3CollarSplit).join(paths.backCollar)
  if (options.splitYoke) paths.saBase = paths.saBase.line(points.cbYoke).close()
  else {
    macro('mirror', {
      mirror: [points.cbNeck, points.cbYoke],
      paths: [paths.saBase],
      clone: true,
    })
    paths.saBase = paths.saBase.join(paths.mirroredSaBase.reverse())
    paths.mirroredSaBase.setRender(false)
  }
  paths.seam = paths.saBase.clone()
  paths.saBase.render = false
  paths.seam = paths.seam.close().attr('class', 'fabric')

  // Complete pattern?
  if (complete) {
    delete snippets.armholePitchNotch
    delete snippets.collarNotch
    delete snippets.shoulderNotch
    snippets.sleevecapNotch = new Snippet('notch', points.armholeYokeSplitPreBoxpleat)
    points.title = new Point(points.neck.x, points.cbYoke.y / 3)
    macro('title', { at: points.title, nr: 4, title: 'yoke', scale: 0.8 })
    points.logo = points.title.shift(-90, 50)
    snippets.logo = new Snippet('logo', points.logo)
    snippets.logo.attr('data-scale', 0.8)

    points.grainlineFrom = points.cbYoke.shift(0, 20)
    points.grainlineTo = points.cbNeck.shift(0, 20)
    macro('grainline', {
      from: points.grainlineFrom,
      to: points.grainlineTo,
    })


    if (sa) {
      paths.sa = paths.saBase.offset(sa).attr('class', 'fabric sa')
      if (options.splitYoke) {
        paths.sa = paths.sa.line(points.cbNeck).move(points.cbYoke).line(paths.sa.start())
      }
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.cbNeck,
      to: points.s3CollarSplit,
      y: points.s3CollarSplit.y - 15 - sa,
    })
    macro('ld', {
      from: points.s3CollarSplit,
      to: points.s3ArmholeSplit,
      d: 15 + sa,
    })
    macro('hd', {
      from: points.cbYoke,
      to: points.armholePitch,
      y: points.cbYoke.y + 15 + sa,
    })
    macro('hd', {
      from: points.cbYoke,
      to: points.s3ArmholeSplit,
      y: points.cbYoke.y + 30 + sa,
    })
    macro('vd', {
      from: points.cbYoke,
      to: points.cbNeck,
      x: points.cbYoke.x - 15 - sa,
    })
    macro('vd', {
      from: points.armholePitch,
      to: points.s3ArmholeSplit,
      x: points.s3ArmholeSplit.x + 30 + sa,
    })
  }

  return part
}
