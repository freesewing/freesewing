import { getIds } from './utils.mjs'

/*
 * Defaults for the sewtogether macro
 */
const macroDefaults = {
  classes: {
    curve: 'dotted note stroke-sm',
    hinge: 'note dotted stroke-sm',
    text: 'center fill-note text-xs',
  },
  id: 'sewtogether',
  force: false,
  text: 'plugin-annotations:sewTogether',
}

// Export defs
export const sewtogetherDefs = [
  {
    name: 'sewTogetherStart',
    def: `
<marker id="sewTogetherStart" markerWidth="10" markerHeight="6" orient="auto" refX="1" refY="2">
	<path d="M 0,2 L 6,0 C 5,1 5,3 6,4 z" class="fill-note note" />
</marker>`,
  },
  {
    name: 'sewTogetherEnd',
    def: `
<marker id="sewTogetherEnd" markerWidth="10" markerHeight="6" orient="auto" refX="6" refY="2">
	<path d="M 6,2 L 0,0 C 1,1 1,3 0,4 z" class="fill-note note" />
</marker>`,
  },
  {
    name: 'sewTogetherCross',
    def: `
<marker id="sewTogetherCross" markerWidth="5" markerHeight="5" orient="auto" refX="2.5" refY="2.5">
  <path d="M 0,0 L 5,5 M 5,0 L 0,5" class="note"/>
</marker>`,
  },
]

/*
 * The rmsewtogether macro
 */
const rmsewtogether = function (id = macroDefaults.id, { paths, store, part }) {
  for (const pid of Object.values(
    store.get(['parts', part.name, 'macros', 'sewtogether', 'ids', id, 'paths'], {})
  ))
    delete paths[pid]
}

/*
 * The sewtogether macro
 */
const sewtogether = function (config, { paths, Path, log, Point, complete, sa, store, part }) {
  /*
   * Don't add a title when complete is false, unless force is true
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
    log.warn(`Sewtogether macro called without a valid from point. Using (0,0) for from.`)
    mc.from = new Point(0, 0)
  }
  if (!mc.to || typeof mc.to.attr !== 'function') {
    log.warn(`Sewtogether macro called without a valid to point. Using (666,666) for to.`)
    mc.to = new Point(666, 666)
  }

  /*
   * Ensure we have a middle point
   */
  if (!mc.middle) mc.middle = mc.from.shiftFractionTowards(mc.to, 0.5)

  /*
   * Get the list of IDs
   * Initialize the verticle cadence
   */
  const ids = getIds(['curve', 'hinge'], mc.id, 'sewtogether')

  /*
   * Draw the curve
   */
  const fromCp = mc.from.shift(mc.from.angle(mc.middle) + 90, mc.from.dist(mc.middle) / 1.5)
  const toCp = mc.to.shift(mc.to.angle(mc.middle) - 90, mc.to.dist(mc.middle) / 1.5)
  paths[ids.curve] = new Path()
    .move(mc.from)
    .curve(fromCp, toCp, mc.to)
    .attr('class', mc.classes.curve)
    .attr('marker-start', 'url(#sewTogetherStart)')
    .attr('marker-end', 'url(#sewTogetherEnd)')
    .addText(mc.text, mc.classes.text)

  /*
   * Draw the hinge, if needed
   */
  if (mc.hinge) {
    const hinge = mc.middle.shift(
      mc.middle.angle(mc.to) +
        Math.abs(mc.middle.angle(mc.from) - mc.middle.angle(mc.to)) / 2 +
        (sa ? 180 : 0),
      sa ? sa : mc.from.dist(mc.middle) / 4
    )
    paths[ids.hinge] = new Path()
      .move(mc.middle)
      .line(hinge)
      .attr('marker-start', 'url(#sewTogetherCross)')
      .attr('class', mc.classes.hinge)
  } else delete ids.hinge

  /*
   * Store all IDs in the store so we can remove this macro with rmsewtogether
   */
  store.set(['parts', part.name, 'macros', 'sewtogether', 'ids', mc.id, 'paths'], ids)
}

// Export macros
export const sewtogetherMacros = { sewtogether, rmsewtogether }
