import style from "./lib/style";
import { version, name } from "../package.json";

export default {
  name: name,
  version: version,
  hooks: {
    preRenderSvg: function(next) {
      this.attributes.add("freesewing:plugin-title", version);
      this.style += style;
      next();
    }
  },
  macros: {
    title: function(so) {
      let overwrite = true;
      if (so.append) overwrite = false;
      so.at
        .attr("data-text", so.nr, overwrite)
        .attr("data-text-class", "title-nr note fill-note");
      this.points.titleName = so.at
        .shift(-90, 13)
        .attr("data-text", so.title)
        .attr("data-text-class", "title-name");
      this.points.titlePattern = so.at
        .shift(-90, 20)
        .attr(
          "data-text",
          this.context.config.name + " v" + this.context.config.version
        )
        .attr("data-text-class", "title-pattern fill-note");
    }
  }
};
