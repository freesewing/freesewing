import { box, drawLine } from './shared'
import { lineWidths } from './styles'

export default (part) => {
  let y = 10
  for (const t of lineWidths) {
    drawLine(part, y, t)
    y += 15
  }

  return box(part, 120, 95)
}
