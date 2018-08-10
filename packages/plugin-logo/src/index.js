import logo from "./logo";
import { name, version } from "../package.json";

export default {
  name: name,
  version: version,
  hooks: {
    preRender: function(next) {
      this.attributes.add(`freesewing:${name}`, version);
      this.defs += logo;
      this.style += "path.logo{stroke:none;fill:#000;}";
      next();
    }
  }
};
