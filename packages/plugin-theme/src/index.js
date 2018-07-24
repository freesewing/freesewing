import header from "./lib/header";
import style from "./lib/style";
import snippets from "./lib/snippets";
import logo from "./lib/logo";
import { version } from "../package.json";

export default {
  hooks: {
    preRenderSvg: function(next) {
      this.header += header;
      this.style += style;
      this.defs += snippets + logo;
      this.attributes.add("freesewing:plugin-theme", version);
      next();
    }
  }
};
