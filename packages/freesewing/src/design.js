import Pattern from "./pattern";

export default function Design(config, plugins = false) {
  const pattern = function(settings) {
    Pattern.call(this, config);
    if (Array.isArray(plugins)) for (let plugin of plugins) this.use(plugin);
    else if (plugins) this.use(plugins);
    this.apply(settings);

    return this;
  };

  // Set up inheritance
  pattern.prototype = Object.create(Pattern.prototype);
  pattern.prototype.constructor = pattern;

  return pattern;
}
