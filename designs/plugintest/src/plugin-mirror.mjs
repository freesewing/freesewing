import { mirrorPlugin } from '@freesewing/plugin-mirror'
import { base } from './base.mjs'

const pluginMirror = ({ points, Point, paths, Path, snippets, Snippet, options, macro, part }) => {
  if (['mirror', 'all'].indexOf(options.plugin) !== -1) {
    // Mirror lines
    points.mirrorA = new Point(0, 0)
    points.mirrorB = new Point(70, 30)
    points.mirrorC = new Point(0, 50)
    points.mirrorD = new Point(30, -30)
    paths.mirrorA = new Path()
      .move(points.mirrorA)
      .line(points.mirrorB)
      .attr('class', 'dashed note')
      .attr('data-text', 'Mirror A')
      .attr('data-text-class', 'right')
    paths.mirrorB = new Path()
      .move(points.mirrorC)
      .line(points.mirrorD)
      .attr('class', 'dashed note')
      .attr('data-text', 'Mirror B')
      .attr('data-text-class', 'right')

    // line
    points.start = new Point(10, 0)
    points.end = new Point(30, 30)
    paths.line = new Path().move(points.start).line(points.end)

    // curve
    points.from = new Point(50, 50)
    points.cp1 = new Point(12, 34)
    points.cp2 = new Point(14, -4)
    points.to = new Point(64, 34)
    paths.curve = new Path().move(points.from).curve(points.cp1, points.cp2, points.to)

    // snippet
    points.a = new Point(20, 30)
    snippets.a = new Snippet('button', points.a)

    if (options.mirrorLine !== 'none') {
      macro('mirror', {
        mirror:
          options.mirrorLine === 'a'
            ? [points.mirrorA, points.mirrorB]
            : [points.mirrorC, points.mirrorD],
        points: ['a'],
        paths: ['line', 'curve'],
        clone: options.mirrorClone,
      })
    }

    macro('bannerbox', {
      topLeft: new Point(options.mirrorLine === 'b' ? -35 : 5, -25),
      bottomRight: new Point(65, 50),
      title: 'plugin = measurements',
    })
  }

  return part
}

export const mirror = {
  name: 'plugintest.mirror',
  after: base,
  options: {
    mirrorLine: { dflt: 'a', list: ['a', 'b', 'none'], menu: 'mirror' },
    mirrorClone: { bool: true, menu: 'mirror' },
  },
  plugins: mirrorPlugin,
  draft: pluginMirror,
}
