// Export defs
export const dimensionsDefs = [
  {
    name: 'dimensionFrom',
    def: (scale) => `
<marker orient="auto" refY="0" refX="0" id="dimensionFrom" style="overflow:visible;" markerWidth="12" markerHeight="8">
	<path class="mark fill-mark" d="M 0,0 L 12,-4 C 10,-2 10,2 12,4 z" transform="scale(${scale})"/>
</marker>`,
  },
  {
    name: 'dimensionTo',
    def: (scale) => `
<marker orient="auto" refY="0" refX="0" id="dimensionTo" style="overflow:visible;" markerWidth="12" markerHeight="8">
	<path class="mark fill-mark" d="M 0,0 L -12,-4 C -10,-2 -10,2  -12,4 z" transform="scale(${scale})"/>
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
  const ids = props.store.generateMacroIds(['line', 'from', 'to'], mc.id)

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
  props.store.storeMacroIds(mc.id, { paths: ids })

  /*
   * Returning ids is a best practice for FreeSewing macros
   */
  return props.store.getMacroIds(mc.id)
}

/*
 * This method handles the 'remove' part for all macros
 */
const removeDimension = function (id = macroDefaults.id, { store, part }, type) {
  return store.removeMacroNodes(id, type, part)
}

/*
 * This method removes all dimensions of a given type
 */
const removeDimensionType = function ({ paths, store, part }, type) {
  // Get all macro IDs of the given type
  const ids = store.get(['parts', part.name, 'macros', type, 'ids'], {})
  for (const id in ids) store.removeMacroNodes(id, type, part)
}

/*
 * This method removes all dimensions
 */
const removeAllDimensions = function ({ macro }) {
  macro('rmahd')
  macro('rmald')
  macro('rmavd')
  macro('rmapd')
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
