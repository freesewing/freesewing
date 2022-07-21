export default function (partNumber, part) {
  const {
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
    utils,
    store,
  } = part.shorthand()

  if (options.type != 'squid' && options.type != 'octopus') {
    return part
  }
  if (partNumber > (options.type == 'squid' ? 2 : 3)) {
    return part
  }

  const c = 0.55191502449351

  let sectionWidth = store.get('sectionWidth')
  let eyeSize = sectionWidth / 2
  if (partNumber == 1) {
    eyeSize *= 0.65
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
      .setRender(true)
  } else {
    let eyeCirc = eyeSize * Math.PI
    let eyeBrowWidth = eyeSize * 0.75
    points.top = new Point(0, 0)
    points.tr = points.top.shift(0, eyeCirc)
    points.bl = points.top.shift(270, eyeBrowWidth)
    points.bottom = points.bl.shift(0, eyeCirc)

    paths.eye = new Path()
      .move(points.top)
      .line(points.bl)
      .line(points.bottom)
      .line(points.tr)
      .line(points.top)
      .close()
      .attr('class', 'fabric')
      .setRender(true)
  }
  if (complete) {
    points.logo = points.top.shiftFractionTowards(
      points.bottom,
      0.3
    )
    snippets.logo = new Snippet('logo', points.logo).attr('data-scale', 0.1)

    points.titleAnchor = points.bottom
      .shiftFractionTowards(points.top, 0.3)
    macro('title', {
      at: points.titleAnchor,
      nr: 3 + partNumber * 3,
      title: 'Eye' + partNumber,
      scale:  0.1
    })

    if (sa) {
      paths.sa = paths.eye.offset(Math.min(sa,6)).attr('class', 'fabric sa')
    }
  }

  // Paperless?
//   if (paperless) {
//     macro('hd', {
//       from: points.bottomLeft,
//       to: points.bottomRight,
//       y: points.bottomLeft.y + sa + 15,
//     })
//     macro('vd', {
//       from: points.bottomRight,
//       to: points.topRight,
//       x: points.topRight.x + sa + 15,
//     })
//   }

  return part
}
