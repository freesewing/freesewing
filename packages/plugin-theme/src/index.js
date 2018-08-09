import baseCss from "./lib/base.css.js";
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
    preRenderSvg: function(next) {
      this.style += baseCss;
      this.defs += notch;
      this.attributes.add("freesewing:plugin-theme", version);
      if (this.pattern.settings.mode === "sample") this.style += sampleCss;
      else this.style += draftCss;
      if (this.pattern.settings.paperless) {
        this.style += paperlessCss;
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
