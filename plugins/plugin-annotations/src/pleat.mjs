import { getIds } from './utils.mjs'

/*
 * Defaults for the pleat macro
 */
const macroDefaults = {
  classes: {
    arrow: 'note',
    from: 'note',
    to: 'note dashed',
  },
  id: 'pleat',
  margin: 35,
  reverse: false,
}

// Export defs
export const pleatDefs = [
  {
    name: 'pleat',
    def: `
<marker id="pleatTo" markerWidth="10" markerHeight="6" orient="auto" refY="3" refX="10">
	<path d="M 10,3 L 0,0 C 2,2 2,4 0,6 z" class="fill-note note" />
</marker>
`,
  },
]

/*
 * The rmpleat macro
 */
const rmpleat = function (id = macroDefaults.id, { paths, store, part }) {
  for (const pid of Object.values(
    store.get(['parts', part.name, 'macros', 'pleat', 'ids', id, 'paths'], {})
  ))
    delete paths[pid]
}

/*
 * The pleat macro
 */
const pleat = function (config, { paths, Path, log, Point, complete, scale, store, part }) {
  /*
   * Don't add a pleat when complete is false, unless force is true
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
    log.warn(`Pleat macro called without a valid from point. Using (0,0) for from.`)
    mc.from = new Point(0, 0)
  }
  if (!mc.to || typeof mc.to.attr !== 'function') {
    log.warn(`Pleat macro called without a valid to point. Using (666,666) for to.`)
    mc.to = new Point(666, 666)
  }

  /*
   * Get the list of IDs
   * Initialize the verticle cadence
   */
  const ids = getIds(['from', 'to', 'arrow'], mc.id, 'pleat')

  const toIn = mc.to.shift(mc.from.shiftTowards(mc.to, 0.1).angle(mc.to) + 90, mc.margin * scale)
  const fromIn = mc.from.shift(
    mc.from.shiftTowards(mc.to, 0.1).angle(mc.from) + 270,
    mc.margin * scale
  )
  /*
   * Pleat line from
   */
  paths[ids.from] = new Path()
    .move(mc.from)
    .line(fromIn)
    .attr('class', mc.reverse ? mc.classes.to : mc.classes.from)

  /*
   * Pleat line to
   */
  paths[ids.to] = new Path()
    .move(mc.to)
    .line(toIn)
    .attr('class', mc.reverse ? mc.classes.from : mc.classes.to)

  /*
   * Pleat line arrow
   */
  paths[ids.arrow] = mc.reverse
    ? new Path()
        .move(mc.to.shiftFractionTowards(toIn, 0.25))
        .line(mc.from.shiftFractionTowards(toIn, 0.25))
    : new Path()
        .move(mc.from.shiftFractionTowards(fromIn, 0.25))
        .line(mc.to.shiftFractionTowards(fromIn, 0.25))
  paths[ids.arrow].attr('class', mc.classes.arrow).attr('marker-end', 'url(#pleatTo)')

  /*
   * Store all IDs in the store so we can remove this macro with rmpleat
   */
  store.set(['parts', part.name, 'macros', 'pleat', 'ids', mc.id, 'paths'], ids)
}

// Export macros
export const pleatMacros = { pleat, rmpleat }
