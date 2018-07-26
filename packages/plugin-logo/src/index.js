import logo from './logo';
import { name, version } from "../package.json";

export default {
  hooks: {
    preRenderSvg: function(next) {
      this.attributes.add(`freesewing:${name}`, version);
      this.defs += logo;
      next();
    }
  }
};
