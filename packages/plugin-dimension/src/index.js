import markers from './lib/markers'
import { version, name } from '../package.json'

function drawDimension(from, to, so, self) {
  let dimension = new self.Path()
    .move(from)
    .line(to)
    .attr('class', 'mark')
    .attr('data-text', so.text || self.units(from.dist(to)).replace('"', '&#8220;'))
    .attr('data-text-class', 'fill-mark center')
  if (!so.noStartMarker) dimension.attributes.set('marker-start', 'url(#dimensionFrom)')
  if (!so.noEndMarker) dimension.attributes.set('marker-end', 'url(#dimensionTo)')

  return dimension
}

function drawLeader(self, from, to, id) {
  self.paths[id] = new self.Path()
    .move(from)
    .line(to)
    .attr('class', 'mark dotted')
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

export default {
  name: name,
  version: version,
  hooks: {
    preRender: function(svg) {
      if (svg.attributes.get('freesewing:plugin-dimension') === false) {
        svg.attributes.set('freesewing:plugin-dimension', version)
        svg.defs += markers
      }
    }
  },
  macros: {
    // horizontal
    hd: function(so) {
      let id = this.getId()
      let from = hleader(so, 'from', this, id + '_ls')
      let to = hleader(so, 'to', this, id + '_le')
      this.paths[id] = drawDimension(from, to, so, this)
    },
    // vertical
    vd: function(so) {
      let id = this.getId()
      let from = vleader(so, 'from', this, id + '_ls')
      let to = vleader(so, 'to', this, id + '_le')
      this.paths[id] = drawDimension(from, to, so, this)
    },
    // linear
    ld: function(so) {
      let id = this.getId()
      let from = lleader(so, 'from', this, id + '_ls')
      let to = lleader(so, 'to', this, id + '_le')
      this.paths[id] = drawDimension(from, to, so, this)
    },
    // path
    pd: function(so) {
      let dimension = so.path
        .offset(so.d)
        .attr('class', 'mark')
        .attr('marker-start', 'url(#dimensionFrom)')
        .attr('marker-end', 'url(#dimensionTo)')
        .attr('data-text', so.text || this.units(so.path.length()))
        .attr('data-text-class', 'fill-mark center')
      let id = this.getId()
      drawLeader(this, so.path.start(), dimension.start(), id + '_ls')
      drawLeader(this, so.path.end(), dimension.end(), id + '_le')
      this.paths[id] = dimension
    }
  }
}
