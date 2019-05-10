import style from "./lib/style";
import { version, name } from "../package.json";

export default {
  name: name,
  version: version,
  hooks: {
    preRender: function(svg) {
      if (svg.attributes.get("freesewing:plugin-title") === false) {
        svg.attributes.set("freesewing:plugin-title", version);
        svg.style += style;
      }
    }
  },
  macros: {
    title: function(so) {
      const transform = function(anchor) {
        let cx = anchor.x - so.scale * anchor.x;
        let cy = anchor.y - so.scale * anchor.y;

        return `matrix(${so.scale}, 0, 0, ${so.scale}, ${cx}, ${cy}) rotate(${
          so.rotation
        } ${anchor.x} ${anchor.y})`;
      };
      let defaults = {
        scale: 1,
        rotation: 0
      };
      so = { ...defaults, ...so };
      let overwrite = true;
      if (so.append) overwrite = false;
      let prefix = "";
      if (so.prefix) prefix = so.prefix;
      this.points[`_${prefix}_titleNr`] = so.at
        .clone()
        .attr("data-text", so.nr, overwrite)
        .attr("data-text-class", "title-nr note fill-note")
        .attr("data-text-transform", transform(so.at));
      let shift = 10;
      if (so.title) {
        this.points[`_${prefix}_titleName`] = so.at
          .shift(-90 - so.rotation, 13 * so.scale)
          .attr("data-text", so.title)
          .attr("data-text-class", "title-name")
          .attr(
            "data-text-transform",
            transform(so.at.shift(-90 - so.rotation, 13 * so.scale))
          );
        shift += 10;
      }
      this.points[`_${prefix}_titlePattern`] = so.at
        .shift(-90 - so.rotation, shift * so.scale)
        .attr("data-text", this.context.config.name)
        .attr("data-text", "v" + this.context.config.version)
        .attr("data-text-class", "title-pattern fill-note")
        .attr(
          "data-text-transform",
          transform(so.at.shift(-90 - so.rotation, shift * so.scale))
        );
    }
  }
};
