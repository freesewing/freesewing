import { version, name } from "../package.json";

export default {
  name: name,
  version: version,
  hooks: {
    debug: function(next, d = "", e = "", b = "", u = "", g = "") {
      console.log(
        "%cDebug",
        "color: #dd69dd; font-weight: bold",
        d,
        e,
        b,
        u,
        g
      );
      next();
    }
  }
};
