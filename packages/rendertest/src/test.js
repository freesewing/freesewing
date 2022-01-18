import strokeColors from './stroke-colors'
import strokeWidths from './stroke-widths'
import strokeStyles from './stroke-styles'
import strokeCombos from './stroke-combos'
import circles from './circles'
import text from './text'
import snippets from './snippets'
import macros from './macros'

export default function (part) {
  const { macro, store, options, Path, paths, Point } = part.shorthand()

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
  store.set('styles', [
    'default-style',
    'dotted',
    'dashed',
    'lashed',
    'sa',
    'help',
    'hidden',
  ])
  if (options.strokeColors) strokeColors(part)
  if (options.strokeWidths) strokeWidths(part)
  if (options.strokeStyles) strokeStyles(part)
  if (options.strokeCombos) strokeCombos(part)
  if (options.circles) circles(part)
  if (options.text) text(part)
  if (options.snippets) snippets(part)
  if (options.macros) macros(part)

  // Make sure no text is cut off
  paths.box = new Path()
    .move(new Point(-10, -10))
    .line(new Point(store.get('w')+10, store.get('y')))
    .attr('class', 'hidden')

  return part
}
