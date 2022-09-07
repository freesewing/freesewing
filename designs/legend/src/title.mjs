import { box } from './shared.mjs'
import { pluginBundle } from '@freesewing/plugin-bundle'

function legendTitle(part) {
  const { points, Point, macro } = part.shorthand()

  points.a = new Point(30, 30)

  macro('title', {
    at: points.a,
    nr: 1,
    title: 'Part name',
  })

  return box(part, 100, 65)
}

export const title = {
  name: 'legend.title',
  plugins: pluginBundle,
  draft: legendTitle,
}
