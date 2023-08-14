// Export defs
export const dimensionsDefs = [
  {
    name: 'dimensionFrom',
    def: `
<marker orient="auto" refY="4.0" refX="0.0" id="dimensionFrom" style="overflow:visible;" markerWidth="12" markerHeight="8">
	<path class="mark fill-mark" d="M 0,4 L 12,0 C 10,2 10,6  12,8 z" />
</marker>`,
  },
  {
    name: 'dimensionTo',
    def: `
<marker orient="auto" refY="4.0" refX="12.0" id="dimensionTo" style="overflow:visible;" markerWidth="12" markerHeight="8">
	<path class="mark fill-mark" d="M 12,4 L 0,0 C 2,2 2,6  0,8 z" />
</marker>`,
  },
]

function drawDimension(from, to, so, { Path, units }) {
  const dimension = new Path()
    .move(from)
    .line(to)
    .attr('class', 'mark')
    .attr('data-text', so.text || units(from.dist(to)))
    .attr('data-text-class', 'fill-mark center')
  if (!so.noStartMarker) dimension.attributes.set('marker-start', 'url(#dimensionFrom)')
  if (!so.noEndMarker) dimension.attributes.set('marker-end', 'url(#dimensionTo)')

  return dimension
}

function drawLeader({ paths, Path }, from, to, id) {
  paths[id] = new Path().move(from).line(to).attr('class', 'mark dotted')
}

function hleader(so, type, props, id) {
  const { Point } = props
  let point
  if (typeof so.y === 'undefined' || so[type].y === so.y) {
    point = so[type]
  } else {
    point = new Point(so[type].x, so.y)
    drawLeader(props, so[type], point, id)
  }

  return point
}

function vleader(so, type, props, id) {
  const { Point } = props
  let point
  if (typeof so.x === 'undefined' || so[type].x === so.x) {
    point = so[type]
  } else {
    point = new Point(so.x, so[type].y)
    drawLeader(props, so[type], point, id)
  }

  return point
}

function lleader(so, type, props, id) {
  let point, rot, other
  if (type === 'from') {
    rot = 1
    other = 'to'
  } else {
    rot = -1
    other = 'from'
  }
  if (typeof so.d === 'undefined') {
    point = so[type]
  } else {
    point = so[type].shiftTowards(so[other], so.d).rotate(90 * rot, so[type])
    drawLeader(props, so[type], point, id)
  }

  return point
}
function removeDimension(id, props) {
  if (props.paths[id]) delete props.paths[id]
  if (props.paths[`${id}_ls`]) delete props.paths[`${id}_ls`]
  if (props.paths[`${id}_le`]) delete props.paths[`${id}_le`]
}

// Export macros
export const dimensionsMacros = {
  // horizontal
  hd: function (so, props) {
    const { paths } = props
    const id = 'hd_' + so.id
    paths[id] = drawDimension(
      hleader(so, 'from', props, id + '_ls'),
      hleader(so, 'to', props, id + '_le'),
      so,
      props
    )
  },
  // vertical
  vd: function (so, props) {
    const { paths } = props
    const id = 'vd_' + so.id
    paths[id] = drawDimension(
      vleader(so, 'from', props, id + '_ls'),
      vleader(so, 'to', props, id + '_le'),
      so,
      props
    )
  },
  // linear
  ld: function (so, props) {
    const { paths } = props
    const id = 'ld_' + so.id
    paths[id] = drawDimension(
      lleader(so, 'from', props, id + '_ls'),
      lleader(so, 'to', props, id + '_le'),
      so,
      props
    )
  },
  // path
  pd: function (so, props) {
    const { paths, scale, units } = props
    const id = 'pd_' + so.id
    if (typeof so.d === 'undefined') so.d = 10 * scale
    const dimension = so.path
      .offset(so.d)
      .attr('class', 'mark')
      .attr('data-text', so.text || units(so.path.length()))
      .attr('data-text-class', 'fill-mark center')
    if (!so.noStartMarker) dimension.attributes.set('marker-start', 'url(#dimensionFrom)')
    if (!so.noEndMarker) dimension.attributes.set('marker-end', 'url(#dimensionTo)')
    paths[id] = dimension
    drawLeader(props, so.path.start(), dimension.start(), id + '_ls')
    drawLeader(props, so.path.end(), dimension.end(), id + '_le')
  },
  // Remove dimension
  rmvd: function (id, props) {
    removeDimension('vd_' + id, props)
  },
  rmhd: function (id, props) {
    removeDimension('hd_' + id, props)
  },
  rmld: function (id, props) {
    removeDimension('ld_' + id, props)
  },
  rmpd: function (id, props) {
    removeDimension('pd_' + id, props)
  },
  // This is non-functional:
  // (Every macro with an rm prefix is regarded to be a removal macro of the
  // corresponding non-prefix macro. And the id for the to-be-removed macro
  // needs to be in the macros.<macroName>.ids store. And there are none in
  // the macro.d.ids path, since there is no d macro.)
  rmad: function (id, props) {
    for (let key of ['vd', 'ld', 'pd', 'hd']) {
      const ids = props.store.get('macros.' + key + '.ids')
      console.log({ ids: ids })
      if (ids)
        ids.forEach((id) => {
          removeDimension(key + '_' + id, props)
        })
    }
  },
}
