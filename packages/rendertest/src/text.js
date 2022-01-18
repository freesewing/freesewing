export default function (part) {
  const { Point, Path, points, paths, store } = part.shorthand()

  let y = store.get('y')
  const w = store.get('w')

  // Text sizes
  y += 15
  points.textsize = new Point(0,y)
    .attr('data-text', 'Text sizes')
    .attr('data-text-class', 'text-lg bold')
  const sizes = {
    'text-xs': 3,
    'text-sm': 5,
    'text': 8,
    'text-lg': 10,
    'text-xl': 14,
    'text-2xl': 22,
    'text-3xl': 28,
    'text-4xl': 42,
  }
  for (const [size, shift] of Object.entries(sizes)) {
    y += shift
    points['t' + size] = new Point(0, y)
      .attr('data-text', size)
      .attr('data-text-class', `text ${size}`)
  }
  // Text alignment
  y += 15
  points.textalign = new Point(0,y)
    .attr('data-text', 'Text alignment')
    .attr('data-text-class', 'text-lg bold')
  y += 10
  points.tl = new Point(0, y)
  points.tr = new Point(w, y)
  paths.text = new Path().move(points.tl).line(points.tr).attr('data-text', 'text')

  // Align center
  points.tlc = new Point(0, y)
  points.trc = new Point(w, y)
  paths.textc = new Path()
    .move(points.tlc)
    .line(points.trc)
    .attr('data-text', 'text.center')
    .attr('data-text-class', 'center')
  // Align right
  points.tlr = new Point(0, y)
  points.trr = new Point(w, y)
  paths.textr = new Path()
    .move(points.tlr)
    .line(points.trr)
    .attr('data-text', 'text.right')
    .attr('data-text-class', 'right')

  // Text style
  y += 20
  points.textstyle = new Point(0,y)
    .attr('data-text', 'Text style')
    .attr('data-text-class', 'text-lg bold')
  y += 10
  points.titalic = new Point(0, y)
    .attr('data-text', '.italic')
    .attr('data-text-class', 'italic')
  y += 10
  points.tbold = new Point(0, y)
    .attr('data-text', '.bold')
    .attr('data-text-class', 'bold')

  store.set('y', y)

  return part
}
