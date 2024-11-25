function pocketpath({ options, Point, Path, points, paths, Snippet, snippets, sa, macro, part }) {
  const x_scale = options.chest_circum
  const y_scale = options.chest_circum * options.backlength

  let width = (584 / 4) * x_scale
  let height = y_scale * 100

  points.bottom_center = new Point(0, 0)
  points.bottom_outer_edge = new Point(0.8 * width, 0)
  points.pocket_outer_point = new Point(width, height * 0.7)
  points.top_outer_edge = new Point(0.9 * width, height)
  points.top_center = new Point(0, height)

  let pocket = new Path()
    .move(points.bottom_center)
    .line(points.top_center)
    .line(points.top_outer_edge)
    .line(points.pocket_outer_point)
    .line(points.bottom_outer_edge)
    .line(points.bottom_center)

    .close()
    .attr('class', 'fabric')

  return pocket
}

function drafthoodiepocket({
  options,
  Point,
  Path,
  points,
  paths,
  Snippet,
  snippets,
  sa,
  macro,
  part,
}) {
  if (options.pocket_type == 'hoodie') {
    paths.hoodiepocketseam = pocketpath({
      options,
      Point,
      Path,
      points,
      paths,
      Snippet,
      snippets,
      sa,
      macro,
      part,
    })

    macro('cutonfold', {
      from: points.bottom_center,
      to: points.top_center,
      grainline: true,
    })
    if (sa) {
      paths.sa = paths.hoodiepocketseam.offset(sa).addClass('fabric sa')
    }
  }

  return part
}

export const hoodiepocket = {
  name: 'hoodiepocket',
  options: {
    chest_circum: {},
    backlength: {},

    pocket_type: {
      dflt: 'none',
      list: ['none', 'hoodie'],
      menu: 'style',
    },
  },
  draft: drafthoodiepocket,
}
