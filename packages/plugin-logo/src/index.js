import logo from "./logo";
import { name, version } from "../package.json";

export default {
  name: name,
  version: version,
  hooks: {
    preRender: function(svg) {
      svg.attributes.add("freesewing:plugin-logo", version);
      svg.defs += logo;
      svg.style += "path.logo{stroke:none;fill:#000;}";
    }
  }
};
