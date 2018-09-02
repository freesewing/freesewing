import style from "./lib/style";
import { version, name } from "../package.json";

export default {
  name: name,
  version: version,
  hooks: {
    preRender: function(next) {
      this.attributes.add("freesewing:plugin-title", version);
      this.style += style;
      next();
    }
  },
  macros: {
    title: function(so) {
      let overwrite = true;
      if (so.append) overwrite = false;
      this.points._titleNr = so.at
        .attr("data-text", so.nr, overwrite)
        .attr("data-text-class", "title-nr note fill-note");
      this.points._titleName = so.at
        .shift(-90, 13)
        .attr("data-text", so.title)
        .attr("data-text-class", "title-name");
      this.points._titlePattern = so.at
        .shift(-90, 20)
        .attr(
          "data-text",
          this.context.config.name + " v" + this.context.config.version
        )
        .attr("data-text-class", "title-pattern fill-note");
    }
  }
};
