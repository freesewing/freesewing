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
    measurements,
    complete,
    paperless,
    macro,
  } = part.shorthand()


  let bottomFin01_02d = 250.63638754690027 * options.size
  let bottomFin01_02a = 119.34849371430543
  let bottomFin01_03d = 137.70322741678933 * options.size
  let bottomFin01_03a = 175.11970494988498
  let bottomFin01cp1d = 133.21819413653674 * options.size
  let bottomFin01cp2d = 51.94197687805115 * options.size
  let bottomFin01cp1a = 95.20910872095476
  let bottomFin01cp2a = 158.66090918215986
  let bottomFin02cp1d = 29.25974733588791 * options.size
  let bottomFin02cp2d = 31.28292571739416 * options.size
  let bottomFin02cp1a = 208.55316756249104
  let bottomFin02cp2a = 28.113642612639804
  let bottomFin03cp1d = 53.31550082293142 * options.size
  let bottomFin03cp2d = 177.65809391356197 * options.size
  let bottomFin03cp1a = 9.79694130335566
  let bottomFin03cp2a = 80.81868300891519

  let finLength = store.get('aboveMouthFinLength') + store.get('bellyFinLength')
  let finCircumference = store.get('topFinCircumference')

  console.log({ bellyFinLength: store.get('bellyFinLength') })
  console.log({ finCircumference: store.get('topFinCircumference') })

  let diff = 0
  let iteration = 0
  do {
    points.bottomFin01 = new Point(0, 0)
    points.bottomFin02 = points.bottomFin01.shift(bottomFin01_02a, bottomFin01_02d)
    points.bottomFin03 = points.bottomFin01.shift(bottomFin01_03a, bottomFin01_03d)

    points.bottomFin01cp1 = points.bottomFin01.shift(bottomFin01cp1a, bottomFin01cp1d)
    points.bottomFin01cp2 = points.bottomFin01.shift(bottomFin01cp2a, bottomFin01cp2d)
    points.bottomFin02cp1 = points.bottomFin02.shift(bottomFin02cp1a, bottomFin02cp1d)
    points.bottomFin02cp2 = points.bottomFin02.shift(bottomFin02cp2a, bottomFin02cp2d)
    points.bottomFin03cp1 = points.bottomFin03.shift(bottomFin03cp1a, bottomFin03cp1d)
    points.bottomFin03cp2 = points.bottomFin03.shift(bottomFin03cp2a, bottomFin03cp2d)
    diff =
      finLength -
      new Path()
        .move(points.bottomFin03)
        .curve(points.bottomFin03cp1, points.bottomFin01cp2, points.bottomFin01)
        .length()

    bottomFin01_03d = bottomFin01_03d + diff
    iteration++
  } while ((diff < -1 || diff > 1) && iteration < 100)
  console.log({ iteration1: iteration })

  diff = 0
  iteration = 0
  do {
    points.bottomFin01 = new Point(0, 0)
    points.bottomFin02 = points.bottomFin01.shift(bottomFin01_02a, bottomFin01_02d)
    points.bottomFin03 = points.bottomFin01.shift(bottomFin01_03a, bottomFin01_03d)

    points.bottomFin01cp1 = points.bottomFin01.shift(bottomFin01cp1a, bottomFin01cp1d)
    points.bottomFin01cp2 = points.bottomFin01.shift(bottomFin01cp2a, bottomFin01cp2d)
    points.bottomFin02cp1 = points.bottomFin02.shift(bottomFin02cp1a, bottomFin02cp1d)
    points.bottomFin02cp2 = points.bottomFin02.shift(bottomFin02cp2a, bottomFin02cp2d)
    points.bottomFin03cp1 = points.bottomFin03.shift(bottomFin03cp1a, bottomFin03cp1d)
    points.bottomFin03cp2 = points.bottomFin03.shift(bottomFin03cp2a, bottomFin03cp2d)
    diff =
      finCircumference -
      new Path()
        .move(points.bottomFin01)
        .curve(points.bottomFin01cp1, points.bottomFin02cp2, points.bottomFin02)
        .curve(points.bottomFin02cp1, points.bottomFin03cp2, points.bottomFin03)
        .length()

    bottomFin01_02d = bottomFin01_02d + diff
    iteration++
  } while ((diff < -1 || diff > 1) && iteration < 100)

  console.log({ iteration2: iteration })

  console.log({ finLength: finLength })
  console.log({
    actual: new Path()
      .move(points.bottomFin03)
      .curve(points.bottomFin03cp1, points.bottomFin01cp2, points.bottomFin01)
      .length(),
  })
  
  paths.seam = new Path()
    .move(points.bottomFin01)
    .curve(points.bottomFin01cp1, points.bottomFin02cp2, points.bottomFin02)
    .curve(points.bottomFin02cp1, points.bottomFin03cp2, points.bottomFin03)
    .curve(points.bottomFin03cp1, points.bottomFin01cp2, points.bottomFin01)
    .close()

  console.log({
    bottomFinCirc: new Path()
      .move(points.bottomFin01)
      .curve(points.bottomFin01cp1, points.bottomFin02cp2, points.bottomFin02)
      .curve(points.bottomFin02cp1, points.bottomFin03cp2, points.bottomFin03)
      .length(),
  })

  points.bottomFinSnippet = new Path()
    .move(points.bottomFin01)
    .curve(points.bottomFin01cp2, points.bottomFin03cp1, points.bottomFin03)
    .shiftAlong(store.get('aboveMouthFinLength'))
  snippets.bottomFin = new Snippet('bnotch', points.bottomFinSnippet)

  // Complete?
  if (complete) {
    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  return part
}
