export default function (part) {
  let { Point, points, Path, paths, complete, sa, paperless, macro, snippets, Snippet } =
    part.shorthand()

  // Clean up inherited paths & snippets
  for (let id in paths) delete paths[id]
  delete snippets['43-notch']

  // Additional points
  points[810] = new Point(points[60].x, points[-1102].y + 300)
  points[811] = new Point(points[-8].x, points[810].y)
  points[812] = new Point(points[0].x, points[810].y)
  points[813] = points[-100101].shiftTowards(points[-6], 70)
  points[814] = points[813].shift(0, 40)
  points[815] = new Point(points[0].x, points[814].y)
  points[816] = new Point(points[-40].x - sa, points[-40].y - sa)
  points[817] = points[813].shift(0, 30)
  points[818] = new Point(points[814].x - sa, points[814].y + sa)

  // Paths
  paths.seam = new Path()
    .move(points[-100101])
    .curve_(points[-1002], points[-1102])
    ._curve(points[-801], points[-8])
    .curve(points[-802], points[811], points[810])
    .curve(points[812], points[815], points[814])
    .line(points[813])
    .line(points[-100101])
    .close()
    .attr('class', 'lining')

  paths.flyEdge = new Path().move(points[-40]).line(points[814]).attr('class', 'lining lashed')

  paths.pocket = new Path().move(points[60]).line(points[61]).attr('class', 'lining lashed')

  // Complete pattern?
  if (complete || paperless) {
    points.grainlineTop = points[60].clone()
    points.grainlineBottom = new Point(points.grainlineTop.x, points[810].y)
  }
  if (complete) {
    if (sa) {
      paths.sa = paths.seam.offset(-1 * sa).attr('class', 'lining sa')
      paths.flyEdeSa = new Path().move(points[816]).line(points[818]).attr('class', 'lining sa')
    }
    points.title = points.dartTip.clone()
    macro('title', { at: points.title, title: 'frontPocketBag', nr: 9 })
    macro('grainline', {
      from: points.grainlineBottom,
      to: points.grainlineTop,
    })
    points.logo = new Point(points[60].x, points[61].y)
    snippets.logo = new Snippet('logo', points.logo)
    delete paths.fly
    delete paths.lining
    macro('scalebox', false)
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points[813],
      to: points[-8],
      y: points.grainlineBottom.y + sa + 15,
    })
    macro('hd', {
      from: points[-40],
      to: points[-8],
      y: points[-1102].y - sa - 15,
    })
    macro('hd', {
      from: points[-100101],
      to: points[-8],
      y: points[-1102].y - sa - 30,
    })
    macro('vd', {
      from: points.grainlineBottom,
      to: points[-1102],
      x: points[-8].x + sa + 15,
    })
    macro('vd', {
      from: points.grainlineBottom,
      to: points[813],
      x: points[813].x - sa - 15,
    })
    macro('vd', {
      from: points.grainlineBottom,
      to: points[-100101],
      x: points[813].x - sa - 30,
    })
  }

  return part
}
