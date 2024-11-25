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
  const x_scale = options.chest_circum
  const y_scale = options.chest_circum * options.backlength

  let width = 290 * x_scale

  points.bottom_center = new Point(0, 0)
  points.bottom_outer_edge = new Point(0.9 * width, 0)
  points.pocket_outer_point = new Point(width, y_scale * 0.2)
  points.top_outer_edge = new Point(0.8 * width, y_scale)
  points.top_center = new Point(0, y_scale)

  return part
}

export const hoodiepocket = {
  name: 'coat',
  options: {
    chest_circum,
    backlength,
  },
  draft: drafthoodiepocket,
}
