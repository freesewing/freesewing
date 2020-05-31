import { box, drawLine } from './shared'
import { fabricTypes } from './styles'

export default (part) => {
  let y = 10
  let w = 110
  for (const t of fabricTypes) {
    drawLine(part, y, t + ' sa')
    y += 15
  }

  return box(part, 120, 65)
}
