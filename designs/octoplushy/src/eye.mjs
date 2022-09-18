import { headSection1 } from './head.mjs'

function octoplushyEye(
  partNumber,
  {
    options,
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
    store,
    part,
  }
) {
  if (options.type != 'squid' && options.type != 'octopus') {
    return part
  }
  if (partNumber > (options.type == 'squid' ? 1 : 2)) {
    return part
  }

  const c = 0.55191502449351

  let sectionWidth = store.get('sectionWidth')
  let eyeSize = sectionWidth / 1.5
  let logoScale = 0.25
  let titleScale = 0.25
  if (partNumber == 1) {
    eyeSize *= 0.65
    logoScale = 0.15
    titleScale = 0.16
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
      .hide()
    points.logo = points.top.shiftFractionTowards(points.bottom, 0.3)
    points.titleAnchor = points.bottom
      .shiftFractionTowards(points.top, 0.25)
      .shift(180, eyeSize / 10)
  } else {
    logoScale = 0.35
    titleScale = 0.25
    let eyeBrowWidth = eyeSize * 0.375
    let eyeCirc = (eyeSize + eyeBrowWidth * 2) * Math.PI
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
      .hide()

    points.logo = points.tl
      .shiftFractionTowards(points.bl, 0.5)
      .shiftFractionTowards(points.br, 0.3)
    points.titleAnchor = points.tr
      .shiftFractionTowards(points.br, 0.5)
      .shiftFractionTowards(points.bl, 0.3)
  }
  if (complete) {
    snippets.logo = new Snippet('logo', points.logo).attr('data-scale', logoScale)

    macro('title', {
      at: points.titleAnchor,
      nr: 3 + partNumber * 3,
      title: partNumber == 2 ? 'eyebrow' : partNumber == 1 ? 'pupil' : 'eye',
      scale: titleScale,
    })

    if (sa) {
      paths.sa = paths.eye.offset(Math.min(sa, 6)).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    if (partNumber < 2) {
      macro('hd', {
        from: points.left,
        to: points.right,
        y: points.top.y - sa,
      })
    } else {
      macro('hd', {
        from: points.tl,
        to: points.tr,
        y: points.tl.y - sa,
      })
      macro('vd', {
        from: points.bl,
        to: points.tl,
        x: points.tl.x - sa,
      })
    }
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
