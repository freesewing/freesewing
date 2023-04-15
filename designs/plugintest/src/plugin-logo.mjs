import { base } from './base.mjs'

const pluginLogo = ({
  points,
  Point,
  paths,
  Path,
  snippets,
  Snippet,
  options,
  part,
  macro,
  store,
}) => {
  if (['logo', 'all'].indexOf(options.plugin) !== -1) {
    points.a = new Point(40, 40)
    snippets.a = new Snippet('logo', points.a)
      .attr('data-scale', options.logoScale)
      .attr('data-rotate', options.logoRotate)

    macro('bannerbox', {
      topLeft: new Point(25, 10),
      bottomRight: new Point(60, 45),
      text: 'snippet = logo',
      ...store.get('bannerbox.snippet'),
    })
  }

  return part
}

export const logo = {
  name: 'plugintest.logo',
  after: base,
  options: {
    logoScale: { pct: 100, min: 10, max: 200, menu: 'logo' },
    logoRotate: { deg: 0, min: -360, max: 360, menu: 'logo' },
  },
  draft: pluginLogo,
}
