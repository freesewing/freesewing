import style from "./lib/style";
import { version } from "../package.json";

export default {
  hooks: {
    preRenderSvg: function(next) {
      this.attributes.add("freesewing:plugin-title", version);
      this.style += style;
      next();
    }
  },
  macros: {
    title: function(next, so) {
      console.log("in plugin, so", so, this);
      so.at.attr("data-text", so.nr).attr("data-text-class", "title-nr note");
      this.points.titleName = so.at
        .shift(-90, 13)
        .attr("data-text", so.title || this.id)
        .attr("data-text-class", "title-name");
      this.points.titlePattern = so.at
        .shift(-90, 20)
        .attr(
          "data-text",
          this.context.config.name + " v" + this.context.config.version
        )
        .attr("data-text-class", "title-pattern fill-note");
      next();
    }
  }
};
