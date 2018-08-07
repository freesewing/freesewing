import style from "./lib/style";
import notch from "./lib/notch";
import gridMetric from "./lib/grid-metric";
import gridImperial from "./lib/grid-imperial";
import { version, name } from "../package.json";

export default {
  name: name,
  version: version,
  hooks: {
    preRenderSvg: function(next) {
      this.style += style;
      this.defs += notch;
      this.attributes.add("freesewing:plugin-theme", version);
      if (this.pattern.settings.paperless) {
        this.style += "path.gridbox{fill: url(#grid)}";
        if (this.pattern.settings.units === "imperial")
          this.defs += gridImperial;
        else this.defs += gridMetric;
        for (let key in this.pattern.parts) {
          let part = this.pattern.parts[key];
          if (part.render) {
            let anchor = new this.pattern.Point(0, 0);
            if (typeof part.points.gridAnchor !== "undefined")
              anchor = part.points.gridAnchor;
            else if (typeof part.points.anchor !== "undefined")
              anchor = part.points.anchor;
            this.defs += `<pattern id="grid_${key}" xlink:href="#grid" x="${
              anchor.x
            }" y="${anchor.y}"></pattern>`;
            part.paths[part.getUid()] = new this.pattern.Path()
              .move(part.topLeft)
              .line(new this.pattern.Point(part.topLeft.x, part.bottomRight.y))
              .line(part.bottomRight)
              .line(new this.pattern.Point(part.bottomRight.x, part.topLeft.y))
              .close()
              .attr("class", "grid")
              .attr("style", `fill: url(#grid_${key})`);
          }
        }
      }
      next();
    }
  }
};
