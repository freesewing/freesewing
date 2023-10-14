import { box } from './shared.mjs'

function legendLogo({ points, Point, snippets, Snippet, part }) {
  points.a = new Point(50, 40)
  points.atxt = new Point(30, 20).attr('data-text', 'logo').attr('data-text-class', 'center')
  snippets.a = new Snippet('logo', points.a)

  return box(part, 100, 60)
}

export const logo = {
  name: 'legend.logo',
  draft: legendLogo,
}
