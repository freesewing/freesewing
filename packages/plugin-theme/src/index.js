import draftCss from "./lib/draft.css.js";
import sampleCss from "./lib/sample.css.js";
import paperlessCss from "./lib/paperless.css.js";
import notch from "./lib/notch";
import gridMetric from "./lib/grid-metric";
import gridImperial from "./lib/grid-imperial";
import { version, name } from "../package.json";

export default {
  name: name,
  version: version,
  hooks: {
    preRender: function(svg) {
      if (svg.attributes.get("freesewing:plugin-theme") === false) {
        svg.defs += notch;
        svg.pattern.is === "sample"
          ? (svg.style += sampleCss)
          : (svg.style += draftCss);
        if (svg.pattern.settings.paperless) {
          svg.style += paperlessCss;
          svg.pattern.settings.units === "imperial"
            ? (svg.defs += gridImperial)
            : (svg.defs += gridMetric);
          for (let key in this.pattern.parts) {
            let part = svg.pattern.parts[key];
            if (part.render && svg.pattern.needs(key)) {
              let anchor = new svg.pattern.Point(0, 0);
              if (typeof part.points.gridAnchor !== "undefined")
                anchor = part.points.gridAnchor;
              else if (typeof part.points.anchor !== "undefined")
                anchor = part.points.anchor;
              svg.defs += `<pattern id="grid_${key}" `;
              svg.defs += `xlink:href="#grid" x="${anchor.x}" y="${anchor.y}">`;
              svg.defs += "</pattern>";
              part.paths[part.getId()] = new svg.pattern.Path()
                .move(part.topLeft)
                .line(new svg.pattern.Point(part.topLeft.x, part.bottomRight.y))
                .line(part.bottomRight)
                .line(new svg.pattern.Point(part.bottomRight.x, part.topLeft.y))
                .close()
                .attr("class", "grid")
                .attr("style", `fill: url(#grid_${key})`);
            }
          }
        }
        svg.attributes.add("freesewing:plugin-theme", version);
      }
    }
  }
};
