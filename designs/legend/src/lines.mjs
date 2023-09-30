import { box, drawLine } from './shared.mjs'

const allFabricTypes = ['fabric', 'lining', 'canvas', 'interfacing', 'various']
const allLineTypes = ['note', 'mark', 'contrast', 'help']
const allLineStrokes = ['dotted', 'dashed', 'lashed']
const allLineWidths = ['stroke-xs', 'stroke-sm', 'default', 'stroke-lg', 'stroke-xl', 'stroke-xxl']

function legendFabricLines({ part }) {
  let y = 10
  for (const t of allFabricTypes) {
    drawLine(part, y, t)
    y += 15
  }

  return box(part, 120, 65)
}

function legendLineStrokes({ part }) {
  let y = 10
  for (const t of allLineStrokes) {
    drawLine(part, y, t)
    y += 15
  }

  return box(part, 120, 50)
}

function legendLineWidths({ part }) {
  let y = 10
  for (const t of allLineWidths) {
    drawLine(part, y, t)
    y += 15
  }

  return box(part, 120, 95)
}

function legendSaLines({ part }) {
  let y = 10
  for (const t of allFabricTypes) {
    drawLine(part, y, t + ' sa')
    y += 15
  }

  return box(part, 120, 65)
}

function legendOtherLines({ points, Point, paths, Path, part }) {
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
  for (const t of allLineTypes) {
    drawLine(y, t)
    y += 15
  }

  return box(part, 120, 65)
}

export const fabricLines = {
  name: 'legend.fabricLines',
  draft: legendFabricLines,
}
export const lineStrokes = {
  name: 'legend.lineStrokes',
  draft: legendLineStrokes,
}
export const lineWidths = {
  name: 'legend.lineWidths',
  draft: legendLineWidths,
}
export const saLines = {
  name: 'legend.saLines',
  draft: legendSaLines,
}
export const otherLines = {
  name: 'legend.otherLines',
  draft: legendOtherLines,
}
