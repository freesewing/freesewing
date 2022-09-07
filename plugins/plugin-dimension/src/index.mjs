import { name, version } from '../package.json' assert { type: 'json' }

const markers = `
<marker orient="auto" refY="4.0" refX="0.0" id="dimensionFrom" style="overflow:visible;" markerWidth="12" markerHeight="8">
	<path class="mark fill-mark" d="M 0,4 L 12,0 C 10,2 10,6  12,8 z" />
</marker>
<marker orient="auto" refY="4.0" refX="12.0" id="dimensionTo" style="overflow:visible;" markerWidth="12" markerHeight="8">
	<path class="mark fill-mark" d="M 12,4 L 0,0 C 2,2 2,6  0,8 z" />
</marker>
`
const prefix = '__paperless'

function drawDimension(from, to, so, self) {
  const dimension = new self.Path()
    .move(from)
    .line(to)
    .attr('class', 'mark')
    .attr('data-text', so.text || self.units(from.dist(to)))
    .attr('data-text-class', 'fill-mark center')
  if (!so.noStartMarker) dimension.attributes.set('marker-start', 'url(#dimensionFrom)')
  if (!so.noEndMarker) dimension.attributes.set('marker-end', 'url(#dimensionTo)')

  return dimension
}

function drawLeader(self, from, to, id) {
  self.paths[id] = new self.Path().move(from).line(to).attr('class', 'mark dotted')
}

function hleader(so, type, self, id) {
  let point
  if (typeof so.y === 'undefined' || so[type].y === so.y) {
    point = so[type]
  } else {
    point = new self.Point(so[type].x, so.y)
    drawLeader(self, so[type], point, id)
  }

  return point
}

function vleader(so, type, self, id) {
  let point
  if (typeof so.x === 'undefined' || so[type].x === so.x) {
    point = so[type]
  } else {
    point = new self.Point(so.x, so[type].y)
    drawLeader(self, so[type], point, id)
  }

  return point
}

function lleader(so, type, self, id) {
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
    drawLeader(self, so[type], point, id)
  }

  return point
}

export const plugin = {
  name,
  version,
  hooks: {
    preRender: (svg) => {
      if (svg.defs.indexOf(markers) === -1) svg.defs += markers
    },
  },
  macros: {
    // horizontal
    hd: function (so) {
      const id = so.id || this.getId(prefix)
      this.paths[id] = drawDimension(
        hleader(so, 'from', this, id + '_ls'),
        hleader(so, 'to', this, id + '_le'),
        so,
        this
      )
    },
    // vertical
    vd: function (so) {
      const id = so.id || this.getId(prefix)
      this.paths[id] = drawDimension(
        vleader(so, 'from', this, id + '_ls'),
        vleader(so, 'to', this, id + '_le'),
        so,
        this
      )
    },
    // linear
    ld: function (so) {
      const id = so.id || this.getId(prefix)
      this.paths[id] = drawDimension(
        lleader(so, 'from', this, id + '_ls'),
        lleader(so, 'to', this, id + '_le'),
        so,
        this
      )
    },
    // path
    pd: function (so) {
      const id = so.id || this.getId(prefix)
      if (typeof so.d === 'undefined') so.d = 10 * this.context.settings.scale
      const dimension = so.path
        .offset(so.d)
        .attr('class', 'mark')
        .attr('data-text', so.text || this.units(so.path.length()))
        .attr('data-text-class', 'fill-mark center')
      if (!so.noStartMarker) dimension.attributes.set('marker-start', 'url(#dimensionFrom)')
      if (!so.noEndMarker) dimension.attributes.set('marker-end', 'url(#dimensionTo)')
      this.paths[id] = dimension
      drawLeader(this, so.path.start(), dimension.start(), id + '_ls')
      drawLeader(this, so.path.end(), dimension.end(), id + '_le')
    },
    // Remove dimension
    rmd: function (so) {
      if (this.paths[so.id]) delete this.paths[so.id]
      if (this.paths[`${so.id}_ls`]) delete this.paths[`${so.id}_ls`]
      if (this.paths[`${so.id}_le`]) delete this.paths[`${so.id}_le`]
      if (Array.isArray(so.ids)) {
        for (const id of so.ids) {
          if (this.paths[id]) delete this.paths[id]
          if (this.paths[`${id}_ls`]) delete this.paths[`${id}_ls`]
          if (this.paths[`${id}_le`]) delete this.paths[`${id}_le`]
        }
      }
    },
    // Remove all dimensions (with standard prefix)
    rmad: function (so) {
      for (let type of ['paths', 'points']) {
        for (let id in this[type]) {
          if (id.slice(0, prefix.length) === prefix) delete this[type][id]
        }
      }
    },
  },
}

// More specifically named exports
export const dimensionPlugin = plugin
export const pluginDimension = plugin

