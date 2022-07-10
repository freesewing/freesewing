export default function (part) {
  let {
    store,
    sa,
    Point,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    options,
    complete,
    paperless,
    macro,
  } = part.shorthand()

  let belly01_02d = 224.8451041 * options.size
  let belly02_03d = 108.1988389 * options.size
  let belly03_04d = 216.7485605 * options.size
  //let belly04_05d = 164.7592153 * options.size
  let belly01_10d = 129.2449198 * options.size
  let belly01_02a = 25.7020193
  let belly02_03a = 2.2164353
  let belly03_04a = 338.0869319

  //let belly04_05a = 198.1877729
  let belly01_10a = 163.4959859
  let belly10_05d = 231.4386252 * options.size
  let belly10_05a = 0

  let belly01cp1d = 65.65512143 * options.size
  let belly01cp2d = 38.20949996 * options.size
  let belly02cp1d = 37.73513423 * options.size
  let belly02cp2d = 118.6453123 * options.size
  let belly03cp1d = 54.50254779 * options.size
  let belly03cp2d = 40.6827883 * options.size
  let belly04cp1d = 52.08589469 * options.size
  let belly04cp2d = 62.46560129 * options.size
  let belly05cp1d = 48.20828587 * options.size
  // let belly05cp2d =  48.20828587 * options.size
  let belly05cp2d = 68 * options.size
  //let belly10cp1d = 45.42602302 * options.size
  // let belly10cp2d =  45.42602302 * options.size
  let belly10cp2d = 65.42602302 * options.size

  let belly01cp1a = 60.117233
  let belly01cp2a = 327.4394109
  let belly02cp1a = 331.7898702
  let belly02cp2a = 182.9449647
  let belly03cp1a = 349.861397
  let belly03cp2a = 200.1533738
  let belly04cp1a = 204.8857575
  let belly04cp2a = 145.9357065
  // let belly05cp1a =   8.1545383
  let belly05cp1a = 8.1545383
  // let belly05cp2a =   8.1545383
  let belly05cp2a = 5
  //let belly10cp1a = 169.9644604
  let belly10cp2a = 175.9644604

  points.belly10 = new Point(0, 0)
  points.belly01 = points.belly10.shift(belly01_10a, belly01_10d)
  points.belly02 = points.belly01.shift(belly01_02a, belly01_02d)
  points.belly03 = points.belly02.shift(belly02_03a, belly02_03d)
  points.belly04 = points.belly03.shift(belly03_04a, belly03_04d)
  points.belly05 = points.belly10.shift(belly10_05a, belly10_05d)

  points.belly01.y = points.belly01.y * (1.1 - options.hungry / 5)
  points.belly02.y = points.belly02.y * (1.1 - options.hungry / 5)
  points.belly03.y = points.belly03.y * (1.1 - options.hungry / 5)
  points.belly04.y = points.belly04.y * (1.1 - options.hungry / 5)

  points.belly01cp1 = points.belly01.shift(belly01cp1a, belly01cp1d)
  points.belly02cp1 = points.belly02.shift(belly02cp1a, belly02cp1d)
  points.belly03cp1 = points.belly03.shift(belly03cp1a, belly03cp1d)
  points.belly04cp1 = points.belly04.shift(belly04cp1a, belly04cp1d)
  points.belly05cp1 = points.belly05.shift(belly05cp1a, belly05cp1d)
  points.belly01cp2 = points.belly01.shift(belly01cp2a, belly01cp2d)
  points.belly02cp2 = points.belly02.shift(belly02cp2a, belly02cp2d)
  points.belly03cp2 = points.belly03.shift(belly03cp2a, belly03cp2d)
  points.belly04cp2 = points.belly04.shift(belly04cp2a, belly04cp2d)
  points.belly05cp2 = points.belly05.shift(belly05cp2a, belly05cp2d)
  points.belly10cp1 = points.belly10.shift(belly10cp2a, belly10cp2d)

  let mouthPartLength =
    store.get('aboveMouthBottomLength') -
    store.get('mouthTopLength') +
    store.get('mouthBottomLength')

  let diff = 0
  let iteration = 0
  do {
    points.belly01.x -= diff
    points.belly01cp1.x -= diff
    points.belly01cp2.x -= diff

    iteration++
    diff =
      mouthPartLength -
      new Path()
        .move(points.belly01)
        .curve(points.belly01cp1, points.belly02cp2, points.belly02)
        .length()
  } while (Math.abs(diff) > store.get('tolerance') && iteration < 100)

  let bellyTailLength = store.get('bellyTailLength')

  diff = 0
  iteration = 0
  do {
    points.belly04.x += diff
    points.belly04cp1.x += diff
    points.belly04cp2.x += diff
    points.belly05.x += diff
    points.belly05cp2.x += diff

    iteration++
    diff =
      bellyTailLength -
      new Path()
        .move(points.belly03)
        .curve(points.belly03cp1, points.belly04cp2, points.belly04)
        .length()
  } while (Math.abs(diff) > store.get('tolerance') && iteration < 100)

  points.belly05cp1 = points.belly05cp2.flipY()
  points.belly06 = points.belly04.flipY()
  points.belly06cp1 = points.belly04cp2.flipY()
  points.belly06cp2 = points.belly04cp1.flipY()
  points.belly07 = points.belly03.flipY()
  points.belly07cp1 = points.belly03cp2.flipY()
  points.belly07cp2 = points.belly03cp1.flipY()
  points.belly08 = points.belly02.flipY()
  points.belly08cp1 = points.belly02cp2.flipY()
  points.belly08cp2 = points.belly02cp1.flipY()
  points.belly09 = points.belly01.flipY()
  points.belly09cp1 = points.belly01cp2.flipY()
  points.belly09cp2 = points.belly01cp1.flipY()
  points.belly10cp2 = points.belly10cp1.flipY()

  paths.top = new Path()
    .move(points.belly04)
    .curve(points.belly04cp2, points.belly03cp1, points.belly03)
    .curve(points.belly03cp2, points.belly02cp1, points.belly02)
    .curve(points.belly02cp2, points.belly01cp1, points.belly01)
    .setRender(false)
  paths.bottom = new Path()
    .move(points.belly09)
    .curve(points.belly09cp2, points.belly08cp1, points.belly08)
    .curve(points.belly08cp2, points.belly07cp1, points.belly07)
    .curve(points.belly07cp2, points.belly06cp1, points.belly06)
    .setRender(false)
  paths.seam = new Path()
    .move(points.belly01)
    .curve(points.belly01cp2, points.belly10cp1, points.belly10)
    .curve(points.belly10cp2, points.belly09cp1, points.belly09)
    .join(paths.bottom)
    .curve(points.belly06cp2, points.belly05cp1, points.belly05)
    .curve(points.belly05cp2, points.belly04cp1, points.belly04)
    .join(paths.top)
    .close()
    .setRender(true)

  store.set(
    'bellyFinLength',
    new Path()
      .move(points.belly02)
      .curve(points.belly02cp1, points.belly03cp2, points.belly03)
      .length()
  )

  // Complete?
  if (complete) {
    points.bellyMouthSnippet1 = new Path()
      .move(points.belly01)
      .curve(points.belly01cp1, points.belly02cp2, points.belly02)
      .shiftAlong(store.get('mouthBottomLength'))
    points.bellyMouthSnippet2 = points.bellyMouthSnippet1.flipY()

    snippets.mouth1 = new Snippet('bnotch', points.bellyMouthSnippet1)
    snippets.mouth2 = new Snippet('bnotch', points.bellyMouthSnippet2)

    points.grainlineFrom = new Point( points.belly10.x, points.belly02.y *.7 )
    points.grainlineTo = new Point( points.belly05.x, points.belly02.y *.7 )
    macro("grainline", {
      from: points.grainlineFrom,
      to: points.grainlineTo,
    })

    if (paperless) {
      macro('hd', {
        from: points.belly01,
        to: points.belly10,
        y: points.belly01.y,
      })
      macro('hd', {
        from: points.belly05,
        to: points.belly04,
        y: points.belly04.y,
      })
      macro('hd', {
        from: points.belly10,
        to: points.belly05,
        y: (points.belly04.y + points.belly01.y) / 2,
      })
      macro('hd', {
        from: points.belly01,
        to: points.belly02,
        y: points.belly02.y - sa - 10,
      })
      macro('hd', {
        from: points.belly02,
        to: points.belly03,
        y: points.belly02.y - sa - 10,
      })
      macro('hd', {
        from: points.belly03,
        to: points.belly04,
        y: points.belly02.y - sa - 10,
      })
      macro('hd', {
        from: points.bellyMouthSnippet1,
        to: points.belly02,
        y: points.bellyMouthSnippet1.y,
      })

      macro('vd', {
        from: points.belly03,
        to: points.belly05,
        x: points.belly03.x,
      })
      macro('vd', {
        from: points.belly05,
        to: points.belly07,
        x: points.belly03.x,
      })
      macro('vd', {
        from: points.belly10,
        to: points.belly02,
        x: points.belly02.x,
      })
      macro('vd', {
        from: points.belly08,
        to: points.belly10,
        x: points.belly02.x,
      })
      macro('vd', {
        from: points.belly10,
        to: points.belly01,
        x: points.belly01.x - sa - 10,
      })
      macro('vd', {
        from: points.belly09,
        to: points.belly10,
        x: points.belly01.x - sa - 10,
      })
      macro('vd', {
        from: points.belly09,
        to: points.belly08,
        x: points.belly01.x - sa - 10,
      })
      macro('vd', {
        from: points.belly02,
        to: points.belly01,
        x: points.belly01.x - sa - 10,
      })
      macro('vd', {
        from: points.belly05,
        to: points.belly06,
        x: points.belly04.x + sa + 10,
      })
      macro('vd', {
        from: points.belly04,
        to: points.belly05,
        x: points.belly04.x + sa + 10,
      })
      macro('vd', {
        from: points.belly06,
        to: points.belly07,
        x: points.belly04.x + sa + 10,
      })
      macro('vd', {
        from: points.belly03,
        to: points.belly04,
        x: points.belly04.x + sa + 10,
      })

      points.titleAnchor = points.belly02.shiftFractionTowards(points.belly07, 0.5)
    } else {
      points.titleAnchor = points.belly03.shiftFractionTowards(points.belly07, 0.5)
      points.logoAnchor = points.belly02.shiftFractionTowards(points.belly08, 0.5)

      snippets.logo = new Snippet('logo', points.logoAnchor).attr(
        'data-scale',
        options.size > 1 ? 1 : options.size
      )
    }
    macro('title', {
      at: points.titleAnchor,
      nr: 2,
      title: 'belly',
      scale: options.size,
    })

    if (sa) {
      paths.sa = paths.bottom.join(paths.top).close().offset(sa).attr('class', 'fabric sa')
    }
  }

  return part
}
