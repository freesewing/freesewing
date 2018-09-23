import { version, name } from "../package.json";

const color = {
  info: "#29ABE0",
  warning: "#F47C3C",
  error: "#d9534f",
  success: "#4caf50"
};

/* Returns an object to style debug output */
function debugStyle(type, text) {
  let style = `color: ${color[type]};`;
  style += "font-weight: 600;";
  style += "padding: 0 5px;";
  style += "border-radius: 3px;";

  return style;
}

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
      } else if(typeof d === 'object' && typeof d.style !== 'undefined') {
        console.log(
          "%c"+d.label,
          debugStyle(d.style),
          e,
          b,
          u,
          g
      );
      } else {
        console.log(
          "%c💡 Debug",
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
