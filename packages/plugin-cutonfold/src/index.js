import markers from "./lib/markers";
import { version, name } from "../package.json";

export default {
  name: name,
  version: version,
  hooks: {
    preRender: function(svg) {
      if (svg.attributes.get("freesewing:plugin-cutonfold") === false) {
        svg.attributes.set("freesewing:plugin-cutonfold", version);
        svg.defs += markers;
      }
    }
  },
  macros: {
    cutonfold: function(so) {
      let points = this.points;
      so = {
        offset: 50,
        margin: 5,
        ...so
      };
      points.cutonfoldFrom = so.to.shiftFractionTowards(
        so.from,
        so.margin / 100
      );
      points.cutonfoldTo = so.from.shiftFractionTowards(so.to, so.margin / 100);
      points.cutonfoldVia1 = so.to
        .shiftTowards(so.from, so.offset)
        .rotate(-90, points.cutonfoldFrom);
      points.cutonfoldVia2 = so.from
        .shiftTowards(so.to, so.offset)
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
