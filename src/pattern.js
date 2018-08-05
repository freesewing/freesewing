import attributes from "./attributes";
import { macroName } from "./utils";
import part from "./part";
import point from "./point";
import path from "./path";
import snippet from "./snippet";
import svg from "./svg";
import hooks from "./hooks";
import pack from "bin-pack";
import store from "./store";

export default function pattern(config = false) {
  // width and height properties
  this.width = false;
  this.height = false;

  // Svg and hooks instance
  this.svg = new svg(this);
  this.hooks = new hooks();

  // Data containers
  this.settings = {};
  this.options = {};
  this.store = new store();
  this.parts = {};

  // Merge config with defaults
  let defaults = {
    measurements: {},
    options: {},
    units: "metric"
  };
  this.config = { ...defaults, ...config };
  if (config.options.length > 0) {
    for (let conf of config.options) {
      if (conf.type === "%") this.options[conf.id] = conf.val / 100;
      else this.options[conf.id] = conf.val;
    }
  }

  // Constructors
  this.part = part;
  this.point = point;
  this.path = path;
  this.snippet = snippet;

  // Context object to inject in part prototype
  this.context = {
    parts: this.parts,
    config: this.config,
    settings: this.settings,
    options: this.options,
    store: this.store
  };
  this.part.prototype.context = this.context;
  this.part.prototype.macros = {};
}

/**
 * @throws Will throw an error when called
 */
pattern.prototype.draft = function() {
  throw Error(
    "You have to implement the draft() method in your Pattern instance."
  );
};

pattern.prototype.render = function() {
  this.hooks.attach("preRenderSvg", this.svg);

  this.hooks.attach("postRenderSvg", this.svg);
  //this.hooks.attach('insertText', this.svg);

  return this.pack().svg.render(this);
};

pattern.prototype.on = function(hook, method) {
  if (typeof this.hooks._hooks[hook] === "undefined") {
    this.hooks._hooks[hook] = [];
  }
  this.hooks._hooks[hook].push(method);
};

pattern.prototype.with = function(plugin) {
  if (plugin.hooks) this.loadPluginHooks(plugin);
  if (plugin.macros) this.loadPluginMacros(plugin);

  return this;
};

pattern.prototype.loadPluginHooks = function(plugin) {
  for (let hook of this.hooks.all) {
    if (typeof plugin.hooks[hook] === "function") {
      this.on(hook, plugin.hooks[hook]);
    }
  }
};

pattern.prototype.loadPluginMacros = function(plugin) {
  for (let macro in plugin.macros) {
    if (typeof plugin.macros[macro] === "function") {
      this.macro(macro, plugin.macros[macro]);
    }
  }
};

pattern.prototype.macro = function(key, method) {
  this.part.prototype[macroName(key)] = method;
};

/** Packs parts in a 2D space and sets pattern size */
pattern.prototype.pack = function() {
  let bins = [];
  for (let key in this.parts) {
    let part = this.parts[key];
    if (part.render) {
      part.stack();
      bins.push({
        id: key,
        width: part.bottomRight.x - part.topLeft.x,
        height: part.bottomRight.y - part.topLeft.y
      });
    }
  }
  let size = pack(bins, { inPlace: true });
  for (let bin of bins) {
    let part = this.parts[bin.id];
    if (bin.x !== 0 || bin.y !== 0)
      part.attr("transform", `translate (${bin.x}, ${bin.y})`);
  }
  this.width = size.width;
  this.height = size.height;

  return this;
};
