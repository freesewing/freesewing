function pocketpath({ options, Point, Path, points, paths, Snippet, snippets, sa, macro, part }) {
  const chesthorizontal = (options.chest_circum * 584) / 2
  const vertlength = 380 * options.chest_circum * options.backlength

  const pocket_width = chesthorizontal * options.pocket_width
  const pocket_depth = vertlength * options.pocket_depth

  points.pocket_bottom_center = new Point(0, 0)
  points.pocket_bottom_outer_edge = new Point(0.8 * pocket_width, 0)
  points.pocket_outer_point = new Point(pocket_width, pocket_depth * 0.7)
  points.pocket_top_outer_edge = new Point(0.9 * pocket_width, pocket_depth)
  points.pocket_top_center = new Point(0, pocket_depth)

  let pocket = new Path()
    .move(points.pocket_bottom_center)
    .line(points.pocket_top_center)
    .line(points.pocket_top_outer_edge)
    .line(points.pocket_outer_point)
    .line(points.pocket_bottom_outer_edge)
    .line(points.pocket_bottom_center)

    .close()
    .attr('class', 'fabric')

  return pocket
}

function draftkangaroopocket({
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
  if (options.pocket_type == 'kangaroo') {
    paths.kangaroopocketseam = pocketpath({
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
      from: points.pocket_bottom_center,
      to: points.pocket_top_center,
      grainline: true,
    })
    if (sa) {
      paths.sa = paths.kangaroopocketseam.offset(sa).addClass('fabric sa')
    }
  }

  return part
}

export const kangaroopocket = {
  name: 'kangaroopocket',
  options: {
    chest_circum: {},
    backlength: {},

    pocket_type: {
      dflt: 'none',
      list: ['none', 'kangaroo'],
      menu: 'style',
    },

    pocket_width: {},
    pocket_depth: {},
  },
  draft: draftkangaroopocket,
}
