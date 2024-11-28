function draftcargopockettop({
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
  if (options.pocket_type == 'cargo') {
    const chesthorizontal = (options.chest_circum * 584) / 2
    const vertlength = 380 * options.chest_circum * options.backlength

    let pocket_width = chesthorizontal * options.pocket_width * 0.35
    let pocket_depth = vertlength * options.pocket_depth

    //Swap the orientation if the flap is on the other side
    if (options.cargo_pocket_orientation == 'horizontal') {
      pocket_width = vertlength * options.pocket_depth * 0.5
      pocket_depth = chesthorizontal * options.pocket_width * 0.35 * 2
    }

    points.top_center = new Point(0, 0)
    points.top_edge_right = new Point(pocket_width, 0)
    points.bottom_edge_right = new Point(pocket_width, pocket_depth / 6)
    points.pocket_center_bottom = new Point(0, pocket_depth / 3)

    points.top_edge_left = points.top_edge_right.flipX()
    points.bottom_edge_left = points.bottom_edge_right.flipX()

    paths.pocket_top = new Path()
      .move(points.top_center)
      .line(points.top_edge_right)
      .line(points.bottom_edge_right)
      .line(points.pocket_center_bottom)
      .line(points.bottom_edge_left)
      .line(points.top_edge_left)
      .line(points.top_center)

      .close()
      .reverse()
      .attr('class', 'fabric')

    if (sa) {
      paths.sa = paths.pocket_top.offset(sa).attr('class', 'fabric sa')
    }

    points.button_position = points.top_center.shift(270, pocket_depth * 0.3 * 0.6)

    snippets.pockettopnotch = new Snippet('buttonhole', points.button_position)
  }

  return part
}

export const cargopockettop = {
  name: 'cargopockettop',
  options: {
    chest_circum: {},
    backlength: {},

    pocket_type: {
      dflt: 'none',
      list: ['none', 'kangaroo', 'cargo'],
      menu: 'style',
    },

    pocket_width: {},
    pocket_depth: {},

    cargo_pocket_fold: { pct: 15, min: 0, max: 50, menu: 'style.pocket.cargo' },

    cargo_pocket_orientation: {
      dflt: 'vertical',
      list: ['vertical', 'horizontal'],
      menu: 'style.pocket.cargo',
    },
  },
  draft: draftcargopockettop,
}
