import strokeColors from './colors.js'
import strokeWidths from './widths.js'
import strokeStyles from './styles.js'
import strokeCombos from './combos.js'
import circles from './circles.js'
import text from './text.js'
import snippets from './snippets.js'
import macros from './macros.js'

export default function (part) {
  const { store, options, Path, paths, Point } = part.shorthand()

  // Keep things in store
  store.set('y', 0)
  store.set('w', options.width)
  store.set('colors', [
    'fabric',
    'lining',
    'interfacing',
    'canvas',
    'various',
    'mark',
    'contrast',
    'note',
  ])
  store.set('widths', [
    'stroke-xs',
    'stroke-sm',
    'default-width',
    'stroke-lg',
    'stroke-xl',
    'stroke-2xl',
  ])
  store.set('styles', ['default-style', 'dotted', 'dashed', 'lashed', 'sa', 'help', 'hidden'])

  if (options.only) return part

  // We are drafting in one part to control the layout
  if (options.strokeColors) strokeColors(part, true)
  if (options.strokeWidths) strokeWidths(part, true)
  if (options.strokeStyles) strokeStyles(part, true)
  if (options.strokeCombos) strokeCombos(part, true)
  if (options.circles) circles(part, true)
  if (options.text) text(part, true)
  if (options.snippets) snippets(part, true)
  if (options.macros) macros(part, true)

  // Make sure no text is cut off
  paths.box = new Path()
    .move(new Point(-10, -10))
    .line(new Point(store.get('w') + 10, store.get('y')))
    .attr('class', 'hidden')

  return part
}
