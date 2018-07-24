import header from "./lib/header";
import style from "./lib/style";
import markers from "./lib/markers";
import snippets from "./lib/snippets";
import logo from "./lib/logo";
import meta from "../package.json";

export default {
  hooks: {
    preRenderSvg: function(next) {
      this.header += header;
      this.style += style;
      this.defs += markers + snippets + logo;
      this.attributes.add("freesewing:theme-default", meta.version);
      next();
    }
  }
};
