import { notchesPlugin } from '@freesewing/plugin-notches'

const addThese = ['notch', 'bnotch']

const pluginNotches = (part) => {
  const { points, Point, paths, Path, snippets, Snippet, options } = part.shorthand()

  if (['notches', 'all'].indexOf(options.plugin) !== -1) {
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
      .move(new Point(0, -5))
      .line(new Point(20 * addThese.length, 5))
      .attr('class', 'hidden')
  }

  return part
}

export const notches = {
  name: 'plugintest.notches',
  plugins: notchesPlugin,
  draft: pluginNotches,
}

