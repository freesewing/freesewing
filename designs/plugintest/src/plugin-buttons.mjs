import { buttonsPlugin } from '@freesewing/plugin-buttons'
import { base } from './base.mjs'

const addThese = [
  'button',
  'buttonhole',
  'buttonhole-start',
  'buttonhole-end',
  'snap-stud',
  'snap-socket',
]

const pluginButtons = (part) => {
  const { points, Point, paths, Path, snippets, Snippet, options } = part.shorthand()

  if (['buttons', 'all'].indexOf(options.plugin) !== -1) {
    let x = 10
    for (const add of addThese) {
      points[add] = new Point(x, 0)
      snippets[add] = new Snippet(add, points[add])
        .attr('data-scale', options.buttonsScale)
        .attr('data-rotate', options.buttonsRotate)
      x += 20
    }

    // Prevent clipping of text
    paths.box = new Path()
      .move(new Point(0, -10))
      .line(new Point(20 * addThese.length, 10))
      .attr('class', 'hidden')
  }

  return part
}

export const buttons = {
  name: 'plugintest.buttons',
  after: base,
  options: {
    buttonsScale: { pct: 100, min: 10, max: 200, menu: 'buttons' },
    buttonsRotate: { deg: 0, min: -360, max: 360, menu: 'buttons' },
  },
  plugins: buttonsPlugin,
  draft: pluginButtons,
}
