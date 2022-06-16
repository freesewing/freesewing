import { box } from './shared'
import { lineTypes } from './styles'

export default (part) => {
  let { points, Point, paths, Path } = part.shorthand()

  const drawLine = (y, t) => {
    points[`${t}From`] = new Point(10, y)
    points[`${t}To`] = new Point(w, y)
    paths[t] = new Path()
      .move(points[`${t}From`])
      .line(points[`${t}To`])
      .attr('class', t)
      .attr('data-text', t)
      .attr('data-text-class', 'center')
  }

  let y = 10
  let w = 110
  for (const t of lineTypes) {
    drawLine(y, t)
    y += 15
  }

  return box(part, 120, 65)
}
