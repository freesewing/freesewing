import { version, name } from "../package.json";

export default {
  name: name,
  version: version,
  hooks: {
    debug: function(next, d = "", e = "", b = "", u = "", g = "") {
      if(typeof d === 'object' && d.debug === 'custom') {
        console.log(
          "%c"+d.text,
          d.style,
          e,
          b,
          u,
          g
      );
      } else {
        console.log(
          "%cDebug",
          "color: #dd69dd; font-weight: bold",
          d,
          e,
          b,
          u,
          g
        );
      }
      next();
    }
  }
};
