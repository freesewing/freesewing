import markers from "./lib/markers";
import { version } from "../package.json";

function drawDimension(from, to, so, self) {
  return new self.path()
    .move(from)
    .line(to)
    .attr("class", "note")
    .attr("marker-start", "url(#dimensionFrom)")
    .attr("marker-end", "url(#dimensionTo)")
    .attr("data-text", so.text || self.units(from.dist(to)))
    .attr("data-text-class", "fill-note center");
}

function drawLeader(self, from, to) {
  self.paths[self.getUid()] = new self.path()
    .move(from)
    .line(to)
    .attr("class", "note dotted");
}

function hleader(so, type, self) {
  let point;
  if (typeof so.y === "undefined" || so[type].y === so.y) {
    point = so[type];
  } else {
    point = new self.point(so[type].x, so.y);
    drawLeader(self, so[type], point);
  }

  return point;
}

function vleader(so, type, self) {
  let point;
  if (typeof so.x === "undefined" || so[type].x === so.x) {
    point = so[type];
  } else {
    point = new self.point(so.x, so[type].y);
    drawLeader(self, so[type], point);
  }

  return point;
}

function lleader(so, type, self) {
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
    point = new self.point(so.x, so[type].y);
    point = so[type].shiftTowards(so[other], so.d).rotate(90 * rot, so[type]);
    drawLeader(self, so[type], point);
  }

  return point;
}

function pleader(so, type, self) {
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
    point = new self.point(so.x, so[type].y);
    point = so[type].shiftTowards(so[other], so.d).rotate(90 * rot, so[type]);
    drawLeader(self, so[type], point);
  }

  return point;
}

export default {
  hooks: {
    preRenderSvg: function(next) {
      this.defs += markers;
      this.attributes.add("freesewing:plugin-cutonfold", version);
      next();
    }
  },
  macros: {
    // horizontal
    hd: function(so) {
      let from = hleader(so, "from", this);
      let to = hleader(so, "to", this);
      this.paths[this.getUid()] = drawDimension(from, to, so, this);
    },
    // vertical
    vd: function(so) {
      let from = vleader(so, "from", this);
      let to = vleader(so, "to", this);
      this.paths[this.getUid()] = drawDimension(from, to, so, this);
    },
    // linear
    ld: function(so) {
      let from = lleader(so, "from", this);
      let to = lleader(so, "to", this);
      this.paths[this.getUid()] = drawDimension(from, to, so, this);
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
      drawLeader(this, so.path.start(), dimension.start());
      drawLeader(this, so.path.end(), dimension.end());
      this.paths[this.getUid()] = dimension;
    }
  }
};
