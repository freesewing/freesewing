import { box } from './shared.mjs'

function legendSa({ points, Point, paths, Path, part }) {
  points.a = new Point(10, 40)
  points.aCp = new Point(40, 40)
  points.b = new Point(69.5, 10)
  points.c = new Point(110, 50)

  paths.a = new Path()
    .move(points.a)
    .curve_(points.aCp, points.b)
    .line(points.c)
    .attr('class', 'fabric')
    .attr('data-text', 'seam')

  paths.sa = paths.a.offset(-10).attr('class', 'fabric sa').attr('data-text', 'seamAllowance')

  return box(part, 120, 60)
}

export const sa = {
  name: 'legend.sa',
  draft: legendSa,
}
