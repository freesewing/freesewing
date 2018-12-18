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
    debug: function(data, more) {
      if(
        typeof data === "object" &&
        typeof data.type === "string" &&
        typeof data.label === "string" &&
        typeof data.msg === "string" &&
        Object.keys(data).length === 3) {
        // Make it pretty
        console.log("%c"+data.label, debugStyle(data.type), data.msg);
      } else {
        console.log(data);
      }
    }
  }
};
