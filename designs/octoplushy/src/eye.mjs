import { headSection1 } from './head.mjs'

function octoplushyEye(
  partNumber,
  { options, Point, Path, points, paths, Snippet, snippets, sa, macro, expand, units, store, part }
) {
  if (options.type == 'octoplushy') {
    return part
  }
  if (partNumber > (options.type == 'squid' ? 1 : 2)) {
    return part
  }

  const c = 0.55191502449351

  const sectionWidth = store.get('sectionWidth')
  const logoScale = 0.35
  const titleScale = 0.25
  const eyeSize = (sectionWidth / 1.5) * (partNumber === 1 ? 0.65 : 1)
  const eyeBrowWidth = eyeSize * 0.375
  const eyeCirc = (eyeSize + eyeBrowWidth * 2) * Math.PI

  if (expand) {
    // Hint about expand
    store.flag.preset('expandIsOn')
  } else {
    // Expand is off, do not draw the part but flag this to the user
    const extraSa = sa ? 2 * sa : 0
    const message =
      (options.type == 'squid' ? `squid` : 'octopus') +
      (partNumber == 2 ? 'Eyebrow' : partNumber == 1 ? 'Pupil' : 'Eye')
    store.flag.note({
      msg: message,
      notes: [sa ? 'flag:saIncluded' : 'flag:saExcluded', 'flag:partHiddenByExpand'],
      replace: {
        width: units(eyeCirc + extraSa),
        length: units(eyeBrowWidth * 2 + extraSa),
      },
      suggest: {
        text: 'flag:show',
        icon: 'expand',
        update: {
          settings: ['expand', 1],
        },
      },
    })
    // Also hint about expand
    store.flag.preset('expandIsOff')

    return part.hide()
  }

  if (partNumber < 2) {
    points.top = new Point(0, -1 * (eyeSize / 2))
    points.left = new Point(-1 * (eyeSize / 2), 0)
    points.bottom = new Point(0, eyeSize / 2)
    points.right = new Point(eyeSize / 2, 0)

    points.topCp1 = points.top.shift(180, (eyeSize / 2) * c)
    points.topCp2 = points.top.shift(0, (eyeSize / 2) * c)
    points.leftCp1 = points.left.shift(270, (eyeSize / 2) * c)
    points.leftCp2 = points.left.shift(90, (eyeSize / 2) * c)
    points.bottomCp1 = points.bottom.shift(0, (eyeSize / 2) * c)
    points.bottomCp2 = points.bottom.shift(180, (eyeSize / 2) * c)
    points.rightCp1 = points.right.shift(90, (eyeSize / 2) * c)
    points.rightCp2 = points.right.shift(270, (eyeSize / 2) * c)

    paths.eye = new Path()
      .move(points.top)
      .curve(points.topCp1, points.leftCp2, points.left)
      .curve(points.leftCp1, points.bottomCp2, points.bottom)
      .curve(points.bottomCp1, points.rightCp2, points.right)
      .curve(points.rightCp1, points.topCp2, points.top)
      .close()
      .attr('class', 'fabric')

    points.logo = points.top.shiftFractionTowards(points.bottom, 0.3)
    points.titleAnchor = points.bottom
      .shiftFractionTowards(points.top, 0.25)
      .shift(180, eyeSize / 10)
  } else {
    points.tl = new Point(0, 0)
    points.tr = points.tl.shift(0, eyeCirc)
    points.bl = points.tl.shift(270, eyeBrowWidth * 2)
    points.br = points.bl.shift(0, eyeCirc)

    paths.eye = new Path()
      .move(points.tl)
      .line(points.bl)
      .line(points.br)
      .line(points.tr)
      .line(points.tl)
      .close()
      .attr('class', 'fabric')

    points.logo = points.tl
      .shiftFractionTowards(points.bl, 0.5)
      .shiftFractionTowards(points.br, 0.3)
    points.titleAnchor = points.tr
      .shiftFractionTowards(points.br, 0.5)
      .shiftFractionTowards(points.bl, 0.3)
  }
  points.gridAnchor = points.logo.clone()

  snippets.logo = new Snippet('logo', points.logo).attr('data-scale', logoScale)

  macro('title', {
    at: points.titleAnchor,
    nr: 3 + partNumber * 3,
    title: partNumber == 2 ? 'eyebrow' : partNumber == 1 ? 'pupil' : 'eye',
    scale: titleScale,
  })

  store.cutlist.addCut({
    cut: 2,
    from: partNumber == 2 ? 'fabric' : partNumber == 1 ? 'pupilFabric' : 'eyeFabric',
  })

  if (sa) {
    paths.sa = paths.eye.offset(Math.min(sa, 6)).attr('class', 'fabric sa')
  }

  if (partNumber < 2) {
    macro('hd', {
      from: points.left,
      to: points.right,
      y: points.top.y - sa,
      id: 'width',
    })
  } else {
    macro('hd', {
      from: points.tl,
      to: points.tr,
      y: points.tl.y - sa,
      id: 'width',
    })
    macro('vd', {
      from: points.bl,
      to: points.tl,
      x: points.tl.x - sa,
      id: 'height',
    })
  }

  return part
}

export const eye1 = {
  name: 'octoplushy.eye1',
  after: headSection1,
  draft: (params) => octoplushyEye(0, params),
}
export const eye2 = {
  name: 'octoplushy.eye2',
  after: headSection1,
  draft: (params) => octoplushyEye(1, params),
}
export const eye3 = {
  name: 'octoplushy.eye3',
  after: headSection1,
  draft: (params) => octoplushyEye(2, params),
}
