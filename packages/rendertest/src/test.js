import colors from './colors'
import circles from './circles'
import text from './text'
import snippets from './snippets'
import macros from './macros'

export default function (part) {
  let { macro, store, options, Path, paths, Point } = part.shorthand()
  store.set('y', 0)
  store.set('w', options.width)
  let color = ['fabric', 'lining', 'interfacing', 'canvas', 'various', 'mark', 'contrast', 'note']
  store.set('colors', color)
  if (options.widthHd)
    macro('hd', {
      from: new Point(0, 0),
      to: new Point(options.width, 0)
    })
  if (options.colors) colors(part)
  if (options.circles) circles(part)
  if (options.text) text(part)
  if (options.snippets) snippets(part)
  if (options.macros) macros(part)

  // Make sure no text is cut off
  paths.box = new Path()
    .move(new Point(0, -10))
    .line(new Point(store.get('w'), store.get('y')))
    .attr('class', 'hidden')

  return part
}
