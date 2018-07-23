import { macroName } from "./utils";
import part from "./part";
import svg from "./svg";
import hooks from "./hooks";

export default function pattern(config = false) {
  // Allow no-config patterns
  if (!config) {
    this.config = {
      parts: ["part"],
      measurements: {},
      options: {}
    };
  } else {
    this.config = config;
  }
  if (
    typeof config.parts === "undefined" ||
    !config.parts ||
    config.parts.length < 1
  ) {
    throw "Could not create pattern: You should define at least one part in your pattern config";
  }

  // Constructors
  this.point = point;
  this.path = path;
  this.snippet = snippet;

  // Svg and hooks instance
  this.svg = new svg(this);
  this.hooks = new hooks();

  // Data containers
  this.values = {};
  this.parts = {};
  for (let id of config.parts) {
    this.parts[id] = new part(id);
  }
  this.options = {};
  if (typeof config.options !== "undefined" && config.options.length > 0) {
    for (let conf of config.options) {
      if (conf.type === "percentage") this.options[conf.id] = conf.val / 100;
      else this.options[conf.id] = conf.val;
    }
  }

  // Context object to pass around
  this.context = {
    parts: this.parts,
    options: this.options,
    values: this.values,
    config: this.config
  };

  /**
   * @throws Will throw an error when called
   */
  this.prototype.draft = function() {
    throw Error(
      "You have to implement the draft() method in your Pattern instance."
    );
  };

  this.prototype.render = function() {
    this.hooks.attach("preRenderSvg", this.svg);
    this.hooks.attach("postRenderSvg", this.svg);
    //this.hooks.attach('insertText', this.svg);

    return this.svg.render(this);
  };

  this.prototype.on = function(hook, method) {
    if (typeof this.hooks._hooks[hook] === "undefined") {
      this.hooks._hooks[hook] = [];
    }
    this.hooks._hooks[hook].push(method);
  };

  this.prototype.macro = function(key, method) {
    let name = macroName(key);
    this.on(name, method);
    for (let partId in this.parts) {
      let part = this.parts[partId];
      part[name] = () => null;
      this.hooks.attach(name, part);
    }
  };

  this.prototype.withPlugin(plugin);
  {
    if (plugin.hooks) this.loadPluginHooks(plugin);
    if (plugin.macros) this.loadPluginMacros(plugin);

    return this;
  }

  this.prototype.loadPluginHooks = function(plugin) {
    for (let hook of this.hooks.all) {
      if (typeof plugin.hooks[hook] === "function") {
        this.on(hook, plugin.hooks[hook]);
      }
    }
  };

  this.prototype.loadPluginMacros = function(plugin) {
    for (let macro in plugin.macros) {
      if (typeof plugin.macros[macro] === "function") {
        this.macro(macro, plugin.macros[macro]);
      }
    }
  };

  return this;
}
