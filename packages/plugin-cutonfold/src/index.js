import { version } from "../package.json";

export default {
  hooks: {
    preRenderSvg: function(next) {
      this.attributes.add("freesewing:plugin-cutonfold", version);
      next();
    }
  },
  macros: {
    cutonfold: function(next, so) {
      let points = this.points;
      points.cofStart = so.from.shiftTowards(so.to, 30);
      points.cofEnd = so.to.shiftTowards(so.from, 30);
      points.cofVia1 = so.from
        .shiftTowards(so.to, 50)
        .rotate(90, points.cofStart);
      points.cofVia2 = so.to
        .shiftTowards(so.from, 50)
        .rotate(-90, points.cofEnd);
      this.paths.cof = new this.path()
        .move(points.cofStart)
        .line(points.cofVia1)
        .line(points.cofVia2)
        .line(points.cofEnd)
        .attr("class", "cut-on-fold");
      next();
    }
  }
};
