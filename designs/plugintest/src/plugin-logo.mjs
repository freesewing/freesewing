import { logoPlugin } from '@freesewing/plugin-logo'
import { base } from './base.mjs'

const pluginLogo = ({ points, Point, paths, Path, snippets, Snippet, options, part }) => {
  if (['logo', 'all'].indexOf(options.plugin) !== -1) {
    points.a = new Point(40, 40)
    snippets.a = new Snippet('logo', points.a)
      .attr('data-scale', options.logoScale)
      .attr('data-rotate', options.logoRotate)

    // Prevent clipping of text
    paths.box = new Path().move(new Point(0, 0)).line(new Point(80, 60)).attr('class', 'hidden')
  }

  return part
}

export const logo = {
  name: 'plugintest.logo',
  plugins: logoPlugin,
  after: base,
  options: {
    logoScale: { pct: 100, min: 10, max: 200, menu: 'logo' },
    logoRotate: { deg: 0, min: -360, max: 360, menu: 'logo' },
  },
  draft: pluginLogo,
}
