import { getIds } from './utils.mjs'

// Export defs
export const dimensionsDefs = [
  {
    name: 'dimensionFrom',
    def: `
<marker orient="auto" refY="3.0" refX="0.0" id="dimensionFrom" style="overflow:visible;" markerWidth="10" markerHeight="6">
	<path d="M 0,3 L 10,0 C 8,2 8,4 10,6 z" class="mark fill-mark" />
</marker>`,
  },
  {
    name: 'dimensionTo',
    def: `
<marker orient="auto" refY="3.0" refX="10.0" id="dimensionTo" style="overflow:visible;" markerWidth="10" markerHeight="6">
	<path d="M 10,3 L 0,0 C 2,2 2,4 0,6 z" class="fill-mark mark" />
</marker>`,
  },
]

/*
 * Defaults for these macros
 */
const macroDefaults = {
  text: false,
  noStartMarker: false,
  noEndMarker: false,
  classes: {
    line: 'mark',
    leaders: 'mark dotted',
    text: 'fill-mark center',
  },
}

/*
 * Higher-level methods to draw leaders for various types
 */
const leaders = {
  hd: function hleader(so, type, props, id) {
    let point
    if (typeof so.y === 'undefined' || so[type].y === so.y) point = so[type]
    else {
      point = new props.Point(so[type].x, so.y)
      drawLeader(props, so[type], point, id)
    }

    return point
  },
  vd: function vleader(so, type, props, id) {
    let point
    if (typeof so.x === 'undefined' || so[type].x === so.x) point = so[type]
    else {
      point = new props.Point(so.x, so[type].y)
      drawLeader(props, so[type], point, id)
    }

    return point
  },
  ld: function lleader(so, type, props, id) {
    let point, rot, other
    if (type === 'from') {
      rot = 1
      other = 'to'
    } else {
      rot = -1
      other = 'from'
    }
    if (typeof so.d === 'undefined') point = so[type]
    else {
      point = so[type].shiftTowards(so[other], so.d).rotate(90 * rot, so[type])
      drawLeader(props, so[type], point, id)
    }

    return point
  },
}

/*
 * Low-level method to draw a leader
 */
function drawLeader({ paths, Path }, from, to, id) {
  paths[id] = new Path().move(from).line(to).attr('class', 'mark dotted')
}

/*
 * Low-level method to draw a dimension
 */
function drawDimension(from, to, so, { Path, units }) {
  const dimension = new Path()
    .move(from)
    .line(to)
    .attr('class', 'mark')
    .attr('data-text', so.text || units(from.dist(to)))
    .attr('data-text-class', 'fill-mark center')
    .attr('data-macro-id', so.id)
  if (!so.noStartMarker) dimension.attributes.set('marker-start', 'url(#dimensionFrom)')
  if (!so.noEndMarker) dimension.attributes.set('marker-end', 'url(#dimensionTo)')

  return dimension
}

/*
 * This method handles all dimension macros
 */
const addDimension = (config, props, type) => {
  /*
   * Don't add a dimention when paperless is false, unless force is true
   */
  if (!props.paperless && !config.force) return

  /*
   * Merge macro defaults with user-provided config to create the macro config (mc)
   */
  const mc = {
    ...macroDefaults[type],
    id: type,
    ...config,
    classes: macroDefaults.classes,
  }
  if (config.classes) mc.classes = { ...mc.classes, ...config.classes }

  /*
   * Get the list of IDs
   */
  const ids = getIds(['line', 'from', 'to'], mc.id, type)

  /*
   * Draw the dimension
   */
  if (type === 'pd') {
    if (typeof mc.d === 'undefined') mc.d = 10 * props.scale
    props.paths[ids.line] = mc.path
      .offset(mc.d)
      .attr('class', mc.classes.line)
      .addText(mc.text || props.units(mc.path.length()), mc.classes.text)
    if (!mc.noStartMarker)
      props.paths[ids.line].attributes.set('marker-start', 'url(#dimensionFrom)')
    if (!mc.noEndMarker) props.paths[ids.line].attributes.set('marker-end', 'url(#dimensionTo)')
    drawLeader(props, mc.path.start(), props.paths[ids.line].start(), ids.from)
    drawLeader(props, mc.path.end(), props.paths[ids.line].end(), ids.to)
  } else {
    props.paths[ids.line] = drawDimension(
      leaders[type](mc, 'from', props, ids.from),
      leaders[type](mc, 'to', props, ids.to),
      mc,
      props
    )
  }

  /*
   * Store all IDs in the store so we can remove this macro with rm variants
   */
  props.store.set(['parts', props.part.name, 'macros', type, 'ids', mc.id, 'paths'], ids)
}

/*
 * This method handles the 'remove' part for all macros
 */
const removeDimension = function (id = macroDefaults.id, { paths, store, part }, type) {
  for (const pid of Object.values(
    store.get(['parts', part.name, 'macros', type, 'ids', id, 'paths'], {})
  ))
    delete paths[pid]
}

/*
 * This method removes all dimensions of a given type
 */
const removeDimensionType = function ({ paths, store, part }, type) {
  for (const ids of Object.values(store.get(['parts', part.name, 'macros', type, 'ids'], {}))) {
    for (const pid of Object.values(ids.paths)) delete paths[pid]
  }
}

/*
 * This method removes all dimensions
 */
const removeAllDimensions = function ({ macro }) {
  macro('rmhd')
  macro('rmld')
  macro('rmvd')
  macro('rmpd')
}

/*
 * Export macros
 */
export const dimensionsMacros = {
  hd: (config, props) => addDimension(config, props, 'hd'),
  ld: (config, props) => addDimension(config, props, 'ld'),
  vd: (config, props) => addDimension(config, props, 'vd'),
  pd: (config, props) => addDimension(config, props, 'pd'),
  rmhd: (id, props) => removeDimension(id, props, 'hd'),
  rmld: (id, props) => removeDimension(id, props, 'ld'),
  rmvd: (id, props) => removeDimension(id, props, 'vd'),
  rmpd: (id, props) => removeDimension(id, props, 'pd'),
  rmahd: (config, props) => removeDimensionType(props, 'hd'),
  rmald: (config, props) => removeDimensionType(props, 'ld'),
  rmavd: (config, props) => removeDimensionType(props, 'vd'),
  rmapd: (config, props) => removeDimensionType(props, 'pd'),
  rmad: (config, props) => removeAllDimensions(props),
}
