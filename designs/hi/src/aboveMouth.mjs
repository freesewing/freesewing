import { body } from './body.mjs'
import { mouth } from './mouth.mjs'

function draftHiAboveMouth({
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
  part,
}) {
  let aboveMouth01_02d = 266.7238454769277 * options.size
  const aboveMouth01_02a = 353.4089695458119
  const aboveMouth02_03d = 28.348200101593726 * options.size
  const aboveMouth02_03a = 233.13495309848912
  let aboveMouth01_04d = 57.858419828059574 * options.size
  const aboveMouth01_04a = 208.91023166349467
  const aboveMouth01cp1d = 62.927189989701574 * options.size
  const aboveMouth01cp1a = 298.7196048714283
  const aboveMouth02cp2d = 169.53367533325053 * options.size
  const aboveMouth02cp2a = 195.1209034747764
  const aboveMouth03cp1d = 172.36585117998288 * options.size
  const aboveMouth03cp1a = 197.87876803095696
  const aboveMouth04cp2d = 66.94005927693816 * options.size
  const aboveMouth04cp2a = 308.8121959753343

  const faceTopLength = store.get('faceTopLength')

  let diff = 0
  let iteration = 0
  do {
    points.aboveMouth01 = new Point(0, 0)
    points.aboveMouth02 = points.aboveMouth01.shift(aboveMouth01_02a, aboveMouth01_02d)
    points.aboveMouth03 = points.aboveMouth02.shift(aboveMouth02_03a, aboveMouth02_03d)
    points.aboveMouth04 = points.aboveMouth01.shift(aboveMouth01_04a, aboveMouth01_04d)

    points.aboveMouth01cp1 = points.aboveMouth01.shift(aboveMouth01cp1a, aboveMouth01cp1d)
    points.aboveMouth02cp2 = points.aboveMouth02.shift(aboveMouth02cp2a, aboveMouth02cp2d)
    points.aboveMouth03cp1 = points.aboveMouth03.shift(aboveMouth03cp1a, aboveMouth03cp1d)
    points.aboveMouth04cp2 = points.aboveMouth04.shift(aboveMouth04cp2a, aboveMouth04cp2d)

    diff =
      faceTopLength -
      new Path()
        .move(points.aboveMouth03)
        .curve(points.aboveMouth03cp1, points.aboveMouth04cp2, points.aboveMouth04)
        .length()

    aboveMouth01_02d = aboveMouth01_02d + diff
    aboveMouth01_04d = aboveMouth01_04d + diff
    iteration++
  } while (Math.abs(diff) > store.get('tolerance') && iteration < 100)

  paths.aboveMouthAttachment = new Path()
    .move(points.aboveMouth01)
    .line(points.aboveMouth04)
    .attr('data-text-class', 'text-xs')
  paths.bodyAttachment = new Path()
    .move(points.aboveMouth04)
    .curve(points.aboveMouth04cp2, points.aboveMouth03cp1, points.aboveMouth03)
    .attr('data-text-class', 'text-xs')
  paths.finAttachment = new Path()
    .move(points.aboveMouth03)
    .line(points.aboveMouth02)
    .attr('data-text-class', 'text-xs')
  paths.bellyAndMouthAttachment = new Path()
    .move(points.aboveMouth02)
    .curve(points.aboveMouth02cp2, points.aboveMouth01cp1, points.aboveMouth01)
  paths.seam = new Path()
    .move(points.aboveMouth01)
    .join(paths.aboveMouthAttachment)
    .join(paths.bodyAttachment)
    .join(paths.finAttachment)
    .join(paths.bellyAndMouthAttachment)
    .close()

  store.set('aboveMouthTopLength', paths.bodyAttachment.length())
  store.set('aboveMouthBottomLength', paths.bellyAndMouthAttachment.length())
  store.set('aboveMouthFinLength', points.aboveMouth02.dist(points.aboveMouth03))

  // Complete?
  if (complete) {
    points.aboveMouthSnippet = new Path()
      .move(points.aboveMouth01)
      .curve(points.aboveMouth01cp1, points.aboveMouth02cp2, points.aboveMouth02)
      .shiftAlong(store.get('mouthTopLength'))
    snippets.mouth = new Snippet('bnotch', points.aboveMouthSnippet)

    points.titleAnchor = points.aboveMouth04.shiftFractionTowards(points.aboveMouth01cp1, 0.5)
    points.logoAnchor = points.aboveMouth01cp1.shiftFractionTowards(points.aboveMouth02cp2, 0.5)

    snippets.logo = new Snippet('logo', points.logoAnchor).attr(
      'data-scale',
      (options.size > 1 ? 1 : options.size) / 4
    )

    macro('title', {
      at: points.titleAnchor,
      nr: 5,
      title: 'aboveMouth',
      scale: options.size / 2,
    })

    macro('banner', {
      path: paths.aboveMouthAttachment,
      text: 'aboveMouth',
      dy: -0,
      spaces: 0,
      repeat: 1,
    })
    macro('banner', {
      path: paths.bodyAttachment,
      text: 'body',
      dy: 0,
      spaces: 10,
      repeat: 7,
    })
    macro('banner', {
      path: paths.finAttachment,
      text: '+',
      dy: 0,
      spaces: 0,
      repeat: 4,
    })
    let split = paths.bellyAndMouthAttachment.split(points.aboveMouthSnippet)
    paths.bellyAttachment = split[0].attr('data-text-class', 'text-xs')
    macro('banner', {
      path: paths.bellyAttachment,
      text: 'belly',
      dy: 0,
      spaces: 4,
      repeat: 3,
    })
    paths.mouthAttachment = split[1].attr('data-text-class', 'text-xs')
    macro('banner', {
      path: paths.mouthAttachment,
      text: 'mouth',
      dy: 0,
      spaces: 4,
      repeat: 3,
    })

    if (paperless) {
      macro('hd', {
        from: points.aboveMouth04,
        to: points.aboveMouth01,
        y: points.aboveMouth01.y - sa - 10,
      })
      macro('hd', {
        from: points.aboveMouth01,
        to: points.aboveMouth02,
        y: points.aboveMouth01.y - sa - 10,
      })
      macro('hd', {
        from: points.aboveMouthSnippet,
        to: points.aboveMouth02,
        y: points.aboveMouth01.y,
      })
      macro('vd', {
        from: points.aboveMouth04,
        to: points.aboveMouth01,
        x: points.aboveMouth04.x - sa - 15,
        noStartMarker: true,
        noEndMarker: true,
      })
      points.aboveMouthBottom = paths.seam.edge('bottom')
      points.aboveMouthTop = new Path()
        .move(points.aboveMouth01)
        .curve(points.aboveMouth01cp1, points.aboveMouth02cp2, points.aboveMouth02)
        .edge('bottom')

      macro('vd', {
        from: points.aboveMouthBottom,
        to: points.aboveMouth04,
        x: points.aboveMouth04.x - sa - 15,
        noStartMarker: true,
        noEndMarker: true,
      })
      macro('vd', {
        from: points.aboveMouthBottom,
        to: points.aboveMouthTop,
        x: points.aboveMouth04.x - sa,
        noStartMarker: true,
        noEndMarker: true,
      })
      macro('vd', {
        from: points.aboveMouth02,
        to: points.aboveMouth03,
        x: points.aboveMouth02.x + sa + 10,
        noStartMarker: true,
        noEndMarker: true,
      })
      macro('vd', {
        from: points.aboveMouth03,
        to: points.aboveMouthBottom,
        x: points.aboveMouth02.x + sa + 10,
        noStartMarker: true,
        noEndMarker: true,
      })
    }

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  return part
}

export const aboveMouth = {
  name: 'hi.aboveMouth',
  after: [body, mouth],
  draft: draftHiAboveMouth,
}
