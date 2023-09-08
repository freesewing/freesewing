import { getIds } from './utils.mjs'

/*
 * Defaults for the grainline macro
 */
const macroDefaults = {
  classes: {
    line: 'note',
    text: 'center fill-note',
  },
  id: 'grainline',
  margin: 0.05,
  text: 'plugin-annotations:grainline',
}

// Export defs
export const grainlineDefs = [
  {
    name: 'grainlineFrom',
    def: `
<marker orient="auto" refY="3" refX="8" id="grainlineFrom" style="overflow:visible;" markerWidth="10" markerHeight="6">
	<path d="M 0,3 L 10,0 C 8,2 8,4 10,6 z" class="fill-note note" />
</marker>`,
  },
  {
    name: 'grainlineTo',
    def: `
<marker orient="auto" refY="3" refX="2" id="grainlineTo" style="overflow:visible;" markerWidth="10" markerHeight="6">
	<path d="M 10,3 L 0,0 C 2,2 2,4 0,6 z" class="fill-note note" />
</marker>`,
  },
]

/*
 * The rmgrainline macro
 */
const rmgrainline = function (id = macroDefaults.id, { paths, store, part }) {
  for (const pid of Object.values(
    store.get(['parts', part.name, 'macros', 'grainline', 'ids', id, 'paths'], {})
  ))
    delete paths[pid]
}

/*
 * The grainline macro
 */
const grainline = function (config = {}, { paths, Path, Point, complete, store, log, part }) {
  /*
   * Don't add a cutonfold indicator when complete is false, unless force is true
   */
  if (!complete && !config.force) return

  /*
   * Merge macro defaults with user-provided config to create the macro config (mc)
   */
  const mc = {
    ...macroDefaults,
    ...config,
    classes: macroDefaults.classes,
  }
  if (config.classes) mc.classes = { ...mc.classes, ...config.classes }

  /*
   * Make sure mc.from and mc.to are Point instances
   */
  if (!mc.from || typeof mc.from.attr !== 'function') {
    log.warn(`Grainline macro called without a valid from point. Using (0,0) for from.`)
    mc.from = new Point(0, 0)
  }
  if (!mc.to || typeof mc.to.attr !== 'function') {
    log.warn(`Grainline macro called without a valid to point. Using (666,666) for to.`)
    mc.to = new Point(666, 666)
  }

  /*
   * Store angle for use in cutlist
   */
  store.cutlist.setGrain(mc.from.angle(mc.to))

  /*
   * Get the list of IDs
   */
  const ids = getIds(['line'], mc.id, 'grainline')

  /*
   * Draw the path
   */
  const from = mc.from.shiftFractionTowards(mc.to, 0.05)
  const to = mc.to.shiftFractionTowards(mc.from, 0.05)
  paths[ids.line] = new Path()
    .move(from)
    .line(to)
    .attr('class', mc.classes.line)
    .attr('marker-start', 'url(#grainlineFrom)')
    .attr('marker-end', 'url(#grainlineTo)')
    .addText(mc.text, mc.classes.text)

  /*
   * Store all IDs in the store so we can remove this macro with rmgrainline
   */
  store.set(['parts', part.name, 'macros', 'grainline', 'ids', mc.id, 'paths'], ids)
}

// Export macros
export const grainlineMacros = { grainline, rmgrainline }
