export default function (part) {
  let {
    store,
    sa,
    Point,
    points,
    Path,
    paths,
    options,
    complete,
    paperless,
    macro,
    measurements,
    snippets,
    Snippet,
    absoluteOptions,
  } = part.shorthand()
  // band tie
  if (!options.ties) {
    if (!options.crossBackTies) {
      part.render = false
    }
  }
  let bandTieLength
  if (options.crossBackTies)
    bandTieLength = (measurements.underbust * options.bandLength) / 2 + options.neckTieWidth * 2
  else bandTieLength = (measurements.underbust + measurements.underbust * options.bandTieLength) / 2
  let bandTieWidth
  if (options.crossBackTies) bandTieWidth = absoluteOptions.bandTieWidth * 2
  else bandTieWidth = absoluteOptions.bandTieWidth
  points.topLeft = new Point(0, 0)
  points.topRight = new Point(bandTieWidth * 2, points.topLeft.y)
  points.bottomLeft = new Point(points.topLeft.x, bandTieLength)
  points.bottomRight = new Point(points.topRight.x, bandTieLength)
  if (!options.crossBackTies) {
    switch (options.bandTieEnds) {
      case 'straight':
        points.topMiddle = new Point(bandTieWidth, points.topLeft.y)
        break
      case 'pointed':
        points.topMiddle = new Point(bandTieWidth, points.topLeft.y - bandTieWidth)
    }
  } else points.topMiddle = new Point(bandTieWidth, points.topLeft.y)

  points.bottomMiddle = new Point(points.topMiddle.x, bandTieLength)

  switch (options.bandTieColours) {
    case 'one':
      paths.seam = new Path()
        .move(points.bottomRight)
        .line(points.topRight)
        .line(points.topMiddle)
        .line(points.topLeft)
        .line(points.bottomLeft)
        .close()
      break
    case 'two':
      paths.seam = new Path()
        .move(points.bottomMiddle)
        .line(points.topMiddle)
        .line(points.topLeft)
        .line(points.bottomLeft)
        .close()
  }

  if (complete) {
    points.cofLeft = points.bottomLeft.shift(0, bandTieWidth * (1 / 8))
    points.grainlineLeft = points.topLeft.translate(bandTieWidth * (1 / 8), bandTieLength * (3 / 4))
    points.title = points.topLeft.translate(bandTieWidth * (1 / 8), bandTieLength * (1 / 4))
    if (!options.crossBackTies) {
      macro('title', {
        at: points.title,
        nr: 3,
        title: 'band tie',
        scale: 0.2,
      })
    } else
      macro('title', {
        at: points.title,
        nr: 3,
        title: 'band',
        scale: 0.5,
      })

    switch (options.bandTieColours) {
      case 'one':
        points.cofRight = points.bottomLeft.shift(0, bandTieWidth * (15 / 8))
        points.grainlineRight = points.grainlineLeft.shift(0, bandTieWidth * (14 / 8))
        paths.foldline = new Path()
          .move(points.topMiddle)
          .line(points.bottomMiddle)
          .attr('data-text', 'Fold-line')
          .attr('data-text-class', 'center')
          .attr('class', 'various')
        break
      case 'two':
        points.cofRight = points.bottomLeft.shift(0, bandTieWidth * (7 / 8))
        points.grainlineRight = points.grainlineLeft.shift(0, bandTieWidth * (7 / 8))
    }
    macro('grainline', {
      from: points.grainlineLeft,
      to: points.grainlineRight,
    })
    macro('cutonfold', {
      from: points.cofLeft,
      to: points.cofRight,
      grainline: true,
    })
    if (options.crossBackTies) {
      let gatherLength = store.get('gatherLength')
      snippets.centreNotch = new Snippet('notch', points.bottomRight)
      points.sideNotch = points.bottomRight.shift(90, gatherLength)
      snippets.sideNotch = new Snippet('notch', points.sideNotch)
      paths.casingFold = new Path()
        .move(points.topLeft.shift(-90, options.neckTieWidth))
        .line(points.topRight.shift(-90, options.neckTieWidth))
        .attr('class', 'various')
        .attr('data-text', 'Fold-line')
        .attr('data-text-class', 'center')
    }
    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
    if (paperless) {
      macro('vd', {
        from: points.bottomLeft,
        to: points.topLeft,
        x: points.topLeft.x - sa - 20,
      })
      macro('hd', {
        from: points.topLeft,
        to: points.topMiddle,
        y: points.topLeft.x - sa - 20,
      })
      switch (options.bandTieColours) {
        case 'one':
          macro('hd', {
            from: points.topLeft,
            to: points.topRight,
            y: points.topLeft.x - sa - 30,
          })
          break
        case 'two':
      }
      if (!options.crossBackTies) {
        switch (options.bandTieEnds) {
          case 'straight':
            macro('hd', {
              from: points.topLeft,
              to: points.topMiddle,
              y: points.topLeft.x - sa - 20,
            })
            break
          case 'pointed':
            macro('vd', {
              from: points.topLeft,
              to: points.topMiddle,
              x: points.topLeft.x - sa - 20,
            })
            macro('vd', {
              from: points.bottomLeft,
              to: points.topMiddle,
              x: points.topLeft.x - sa - 30,
            })
        }
      } else
        macro('hd', {
          from: points.topLeft,
          to: points.topMiddle,
          y: points.topLeft.x - sa - 20,
        })
      if (options.crossBackTies) {
        macro('vd', {
          from: points.sideNotch,
          to: points.bottomRight,
          x: points.topRight.x + sa + 20,
        })
      }
    }
  }

  return part
}
