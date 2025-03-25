function draftcargopocket({
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

    const folds_width = (pocket_width + pocket_depth) * options.cargo_pocket_fold

    points.inner_top_center = new Point(0, 0)
    points.inner_bottom_center = points.inner_top_center.shift(270, pocket_depth)

    points.inner_top_edge_right = points.inner_top_center.shift(0, pocket_width)
    points.inner_bottom_edge_right = points.inner_bottom_center.shift(0, pocket_width)

    //Bottom edge offset
    points.bottom_edge_center = points.inner_bottom_center.shift(270, folds_width)
    points.bottom_edge_outer = points.inner_bottom_edge_right.shift(270, folds_width)

    //Right edge offset
    points.right_edge_top = points.inner_top_edge_right.shift(0, folds_width)
    points.right_edge_bottom = points.inner_bottom_edge_right.shift(0, folds_width)

    paths.cargopocketsquare = new Path()
      .move(points.inner_top_center)
      .line(points.inner_top_edge_right)
      .line(points.inner_bottom_edge_right)
      .line(points.inner_bottom_center)
      .attr('class', 'sa')

    paths.cargopocketjagged = new Path()
      .move(points.bottom_edge_center)
      .line(points.bottom_edge_outer)
      .line(points.inner_bottom_edge_right)
      .line(points.right_edge_bottom)
      .line(points.right_edge_top)
      .hide()

    paths.cargopockettop = new Path()
      .move(points.right_edge_top)
      .line(points.inner_top_center)
      .hide()

    paths.seam = paths.cargopockettop.join(paths.cargopocketjagged).attr('class', 'fabric')

    if (sa) {
      paths.sa = paths.cargopocketjagged
        .offset(sa)
        .join(paths.cargopockettop.offset(sa * 2))
        .close()
        .trim()
        .attr('class', 'fabric sa')
    }

    macro('cutonfold', {
      to: points.bottom_edge_center,
      from: points.inner_top_center,
      grainline: true,
    })

    let titlescale = options.chest_circum * options.pocket_width

    points.titleanchor = points.inner_top_center.shiftFractionTowards(points.bottom_edge_outer, 0.7)

    macro('title', {
      at: points.titleanchor,
      nr: 3,
      title: 'cargopocket',
      scale: titlescale,
    })

    macro('vd', {
      id: 'vHeight',
      from: points.inner_top_center,
      to: points.bottom_edge_center,
      x: points.inner_top_center.x - sa - 15,
    })
    macro('hd', {
      id: 'hWidth',
      from: points.inner_top_center,
      to: points.right_edge_top,
      y: points.inner_top_center.y - sa - 15,
    })

    macro('hd', {
      id: 'pleatWidth',
      from: points.inner_top_edge_right,
      to: points.right_edge_top,
      y: points.inner_top_center.y + 15,
    })
    macro('vd', {
      id: 'pleatWidthV',
      from: points.inner_bottom_center,
      to: points.bottom_edge_center,
      x: points.inner_top_center.x + 15,
    })

    snippets.pockettopnotch = new Snippet('notch', points.inner_top_center)

    points.button_position = points.inner_top_center.shift(270, pocket_depth * 0.3 * 0.6)
    snippets.pocketbutton = new Snippet('button', points.button_position)
  }

  return part
}

export const cargopocket = {
  name: 'jasmine.cargopocket',
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
  draft: draftcargopocket,
}
