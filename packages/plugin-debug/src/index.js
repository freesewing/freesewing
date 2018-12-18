import { version, name } from "../package.json";

const colors = {
  info: "RoyalBlue",
  warning: "Tomato",
  error: "Red",
  success: "OliveDrab",
  debug: "Magenta"
};

var debug = {
  name: name,
  version: version
};

debug.log = function(label="", style="", data="") {
  // This allows us to stub console.log()
  // in unit tests without side-effects
  console.log(label, style, data);
};

debug.style = function(type) {
  return  `font-weight: bold; padding: 0 5px; color: ${colors[type]};`;
}

debug.hooks = {
  preRender: function(svg) {
    if(svg.attributes.get("freesewing:plugin-debug") === false) {
      svg.attributes.set("freesewing:plugin-debug", version);
    }
  },
  debug: function(data, more) {
    if(
      typeof data === "object" &&
      typeof data.type === "string" &&
      typeof data.label === "string" &&
      typeof data.msg === "string" &&
      Object.keys(data).length === 3) {
      // Make it pretty
      debug.log("%c"+data.label, debug.style(data.type), data.msg);
    } else {
      debug.log("%cdebug", debug.style('debug'), data);
    }
  }
};

export default debug;
