import markers from "./lib/markers";
import { version, name } from "../package.json";

function drawDimension(from, to, so, self) {
  return new self.Path()
    .move(from)
    .line(to)
    .attr("class", "note")
    .attr("marker-start", "url(#dimensionFrom)")
    .attr("marker-end", "url(#dimensionTo)")
    .attr("data-text", so.text || self.units(from.dist(to)))
    .attr("data-text-class", "fill-note center");
}

function drawLeader(self, from, to, id) {
  self.paths[id] = new self.Path()
    .move(from)
    .line(to)
    .attr("class", "note dotted");
}

function hleader(so, type, self, id) {
  let point;
  if (typeof so.y === "undefined" || so[type].y === so.y) {
    point = so[type];
  } else {
    point = new self.Point(so[type].x, so.y);
    drawLeader(self, so[type], point, id);
  }

  return point;
}

function vleader(so, type, self, id) {
  let point;
  if (typeof so.x === "undefined" || so[type].x === so.x) {
    point = so[type];
  } else {
    point = new self.Point(so.x, so[type].y);
    drawLeader(self, so[type], point, id);
  }

  return point;
}

function lleader(so, type, self, id) {
  let point, rot, other;
  if (type === "from") {
    rot = 1;
    other = "to";
  } else {
    rot = -1;
    other = "from";
  }
  if (typeof so.d === "undefined") {
    point = so[type];
  } else {
    point = new self.Point(so.x, so[type].y);
    point = so[type].shiftTowards(so[other], so.d).rotate(90 * rot, so[type]);
    drawLeader(self, so[type], point, id);
  }

  return point;
}

export default {
  name: name,
  version: version,
  hooks: {
    preRender: function(next) {
      this.defs += markers;
      this.attributes.add("freesewing:plugin-dimension", version);
      next();
    }
  },
  macros: {
    // horizontal
    hd: function(so) {
      let id = so.id ? so.id : this.getId();
      let from = hleader(so, "from", this, id + "_ls");
      let to = hleader(so, "to", this, id + "_le");
      this.paths[id] = drawDimension(from, to, so, this);
    },
    // vertical
    vd: function(so) {
      let id = so.id ? so.id : this.getId();
      let from = vleader(so, "from", this, id + "_ls");
      let to = vleader(so, "to", this, id + "_le");
      this.paths[id] = drawDimension(from, to, so, this);
    },
    // linear
    ld: function(so) {
      let id = so.id ? so.id : this.getId();
      let from = lleader(so, "from", this, id + "_ls");
      let to = lleader(so, "to", this, id + "_le");
      this.paths[id] = drawDimension(from, to, so, this);
    },
    // path
    pd: function(so) {
      let dimension = so.path
        .offset(so.d)
        .attr("class", "note")
        .attr("marker-start", "url(#dimensionFrom)")
        .attr("marker-end", "url(#dimensionTo)")
        .attr("data-text", so.text || this.units(so.path.length()))
        .attr("data-text-class", "fill-note center");
      let id = so.id ? so.id : this.getId();
      drawLeader(this, so.path.start(), dimension.start(), id + "_ls");
      drawLeader(this, so.path.end(), dimension.end(), id + "_le");
      this.paths[id] = dimension;
    }
  }
};
