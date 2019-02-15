import Pattern from "./pattern";
import Point from "./point";
import Path from "./path";
import Snippet from "./snippet";
import * as utils from "./utils";

import { version } from "../package.json";

const create = function(config, plugins = false) {
  const pattern = function(settings) {
    Pattern.call(this, config);
    if (Array.isArray(plugins)) for (let plugin of plugins) this.use(plugin);
    if (plugins) this.use(plugins);
    this.apply(settings);

    return this;
  };

  // Set up inheritance
  pattern.prototype = Object.create(Pattern.prototype);
  pattern.prototype.constructor = pattern;

  return pattern;
};

export default {
  version: version,
  create,
  Pattern,
  Point,
  Path,
  Snippet,
  utils,
  patterns: {},
  plugins: {}
};
