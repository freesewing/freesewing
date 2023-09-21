import { getIds } from './utils.mjs'

/*
 * Defaults for the cutonfold macro
 */
const macroDefaults = {
  classes: {
    line: 'note',
    text: 'center fill-note',
  },
  id: 'cutonfold',
  grainline: false,
  margin: 0.05,
  offset: 15,
  reverse: false,
}

// Export defs
export const cutonfoldDefs = [
  {
    name: 'cutonfoldFrom',
    def: `
<marker orient="auto" refY="3" refX="0" id="cutonfoldFrom" style="overflow:visible;" markerWidth="10" markerHeight="6">
	<path d="M 0,3 L 10,0 C 8,2 8,4 10,6 z" class="fill-note note" />
</marker>`,
  },
  {
    name: 'cutonfoldTo',
    def: `
<marker orient="auto" refY="3" refX="10" id="cutonfoldTo" style="overflow:visible;" markerWidth="10" markerHeight="6">
	<path d="M 10,3 L 0,0 C 2,2 2,4 0,6 z" class="fill-note note" />
</marker>`,
  },
]

/*
 * The rmcutonfold macro
 */
const rmcutonfold = function (id = macroDefaults.id, { paths, store, part }) {
  for (const pid of Object.values(
    store.get(['parts', part.name, 'macros', 'cutonfold', 'ids', id, 'paths'], {})
  ))
    delete paths[pid]
}

/*
 * The cutonfold macro
 */
const cutonfold = function (config, { paths, Path, complete, store, scale, log, Point, part }) {
  /*
   * Don't add a cutonfold indicator when complete is false, unless force is true
   */
  if (!complete && !config.force) return

  /*
   * Merge macro defaults with user-provided config to create the macro config (mc)
   */
  const mc = {
    ...macroDefaults,
    text: config.grainline
      ? 'plugin-annotations:cutOnFoldAndGrainline'
      : 'plugin-annotations:cutOnFold',
    ...config,
    classes: macroDefaults.classes,
  }
  if (config.classes) mc.classes = { ...mc.classes, ...config.classes }

  /*
   * Make sure mc.from and mc.to are Point instances
   */
  if (!mc.from || typeof mc.from.attr !== 'function') {
    log.warn(`Cutonfold macro called without a valid from point. Using (0,0) for from.`)
    mc.from = new Point(0, 0)
  }
  if (!mc.to || typeof mc.to.attr !== 'function') {
    log.warn(`Cutonfold macro called without a valid to point. Using (6660,666) for to.`)
    mc.to = new Point(666, 666)
  }

  /*
   * Store cutonfold and optional grainline angle for use in cutlist
   */
  store.cutlist.setCutOnFold(mc.from, mc.to)
  if (mc.grainline) store.cutlist.setGrain(mc.from.angle(mc.to))

  /*
   * Get the list of IDs
   */
  const ids = getIds(['line'], mc.id, 'cutonfold')

  /*
   * Draw the path
   */
  const from = mc.from.shiftFractionTowards(mc.to, mc.margin)
  const to = mc.to.shiftFractionTowards(mc.from, mc.margin)
  const via1 = from.shiftTowards(mc.from, mc.offset * scale).rotate(-90, from)
  const via2 = to.shiftTowards(mc.to, mc.offset * scale).rotate(90, to)
  paths[ids.line] = new Path().move(from).line(via1).line(via2).line(to)
  if (mc.reverse) paths[ids.line] = paths[ids.line].reverse()
  paths[ids.line] = paths[ids.line]
    .attr('class', mc.classes.line)
    .attr('marker-start', 'url(#cutonfoldFrom)')
    .attr('marker-end', 'url(#cutonfoldTo)')
    .addText(mc.text, mc.classes.text)

  /*
   * Store all IDs in the store so we can remove this macro with rmcutonfold
   */
  store.set(['parts', part.name, 'macros', 'cutonfold', 'ids', mc.id, 'paths'], ids)
}

// Export macros
export const cutonfoldMacros = { cutonfold, rmcutonfold }
