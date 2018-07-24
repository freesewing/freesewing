import meta from "../package.json";
import markers from "./lib/markers";
import style from "./lib/style";

export default {
  hooks: {
    preRenderSvg: function(next) {
      this.attributes.add("freesewing:plugin-cutonfold", meta.version);
      this.defs += markers;
      this.style += style;
      next();
    }
  },
  macros: {
    cutonfold: function(next, so) {
      let points = this.points;
      points.cutonfoldFrom = so.to.shiftTowards(so.from, 30);
      points.cutonfoldTo = so.from.shiftTowards(so.to, 30);
      points.cutonfoldVia1 = so.to
        .shiftTowards(so.from, 50)
        .rotate(-90, points.cutonfoldFrom);
      points.cutonfoldVia2 = so.from
        .shiftTowards(so.to, 50)
        .rotate(90, points.cutonfoldTo);
      let text = so.grainline ? "cutOnFoldAndGrainline" : "cutOnFold";
      this.paths.cutonfold = new this.path()
        .move(points.cutonfoldFrom)
        .line(points.cutonfoldVia1)
        .line(points.cutonfoldVia2)
        .line(points.cutonfoldTo)
        .attr("class", "cutonfold")
        .attr("data-text", text)
        .attr("data-text-class", "cutonfold")
        .attr("data-text-dy", -2);
      next();
    }
  }
};
