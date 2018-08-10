import markers from "./lib/markers";
import { version, name } from "../package.json";

export default {
  name: name,
  version: version,
  hooks: {
    preRender: function(next) {
      this.defs += markers;
      this.attributes.add("freesewing:plugin-cutonfold", version);
      next();
    }
  },
  macros: {
    cutonfold: function(so) {
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
      this.paths.cutonfold = new this.Path()
        .move(points.cutonfoldFrom)
        .line(points.cutonfoldVia1)
        .line(points.cutonfoldVia2)
        .line(points.cutonfoldTo)
        .attr("class", "note")
        .attr("marker-start", "url(#cutonfoldFrom)")
        .attr("marker-end", "url(#cutonfoldTo)")
        .attr("data-text", text)
        .attr("data-text-class", "center fill-note");
    }
  }
};
