import style from "./lib/style";
import snippets from "./lib/snippets";
import { version } from "../package.json";

export default {
  hooks: {
    preRenderSvg: function(next) {
      this.style += style;
      this.defs += snippets + logo;
      this.attributes.add("freesewing:plugin-theme", version);
      next();
    }
  }
};
