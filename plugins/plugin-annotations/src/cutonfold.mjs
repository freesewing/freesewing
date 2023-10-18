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
    def: (scale) => `
<marker orient="auto" refY="0" refX="0" id="cutonfoldFrom" style="overflow:visible;" markerWidth="12" markerHeight="8" transform="scale(${scale})">
	<path class="note fill-note" d="M 0,0 L 12,-4 C 10,-2 10,2 12,4 z" transform="scale(${scale})"/>
</marker>`,
  },
  {
    name: 'cutonfoldTo',
    def: (scale) => `
<marker orient="auto" refY="0" refX="0" id="cutonfoldTo" style="overflow:visible;" markerWidth="12" markerHeight="8" transform="scale(${scale})">
	<path class="note fill-note" d="M 0,0 L -12,-4 C -10,-2 -10,2 -12,4 z" transform="scale(${scale})"/>
</marker>`,
  },
]

/*
 * The rmcutonfold macro
 */
const rmcutonfold = (id = macroDefaults.id, { store, part }) =>
  store.removeMacroNodes(id, 'cutonfold', part)

/*
 * The cutonfold macro
 */
const cutonfold = function (config, { paths, Path, complete, store, scale, log, Point }) {
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
  const ids = store.generateMacroIds(['line'], mc.id)

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
  store.storeMacroIds(mc.id, { paths: ids })

  /*
   * Returning ids is a best practice for FreeSewing macros
   */
  return store.getMacroIds(mc.id)
}

// Export macros
export const cutonfoldMacros = { cutonfold, rmcutonfold }
