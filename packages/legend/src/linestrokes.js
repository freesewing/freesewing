import { box, drawLine } from './shared'
import { lineStrokes } from './styles'

export default (part) => {
  let y = 10
  let w = 110
  for (const t of lineStrokes) {
    drawLine(part, y, t)
    y += 15
  }

  return box(part, 120, 50)
}
