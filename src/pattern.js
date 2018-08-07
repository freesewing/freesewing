import Attributes from "./attributes";
import { macroName } from "./utils";
import Part from "./part";
import Point from "./point";
import Path from "./path";
import Snippet from "./snippet";
import Svg from "./svg";
import Hooks from "./hooks";
import pack from "bin-pack";
import Store from "./store";

export default function Pattern(config = false) {
  // width and height properties
  this.width = false;
  this.height = false;

  // Hooks and Svg instance
  this.hooks = new Hooks();
  Svg.prototype.hooks = this.hooks;

  // Data containers
  this.settings = {};
  this.options = {};
  this.store = new Store();
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
  this.Part = Part;
  this.Point = Point;
  this.Path = Path;
  this.Snippet = Snippet;

  // Context object to inject in part prototype
  this.context = {
    parts: this.parts,
    config: this.config,
    settings: this.settings,
    options: this.options,
    store: this.store
  };
  this.Part.prototype.context = this.context;
  this.Part.prototype.macros = {};
  this.Part.prototype.hooks = this.hooks;
}

/**
 * @throws Will throw an error when called
 */
Pattern.prototype.draft = function() {
  throw Error(
    "You have to implement the draft() method in your Pattern instance."
  );
};

/** Debug method, exposes debug hook */
Part.prototype.debug = function(data) {};

Pattern.prototype.render = function() {
  this.svg = new Svg(this);

  return this.pack().svg.render(this);
};

Pattern.prototype.on = function(hook, method) {
  if (typeof this.hooks._hooks[hook] === "undefined") {
    this.hooks._hooks[hook] = [];
  }
  this.hooks._hooks[hook].push(method);
};

Pattern.prototype.with = function(plugin) {
  console.log(plugin);
  if (plugin.hooks) this.loadPluginHooks(plugin);
  if (plugin.macros) this.loadPluginMacros(plugin);

  return this;
};

Pattern.prototype.loadPluginHooks = function(plugin) {
  for (let hook of this.hooks.all) {
    if (typeof plugin.hooks[hook] === "function") {
      this.on(hook, plugin.hooks[hook]);
    }
  }
};

Pattern.prototype.loadPluginMacros = function(plugin) {
  for (let macro in plugin.macros) {
    if (typeof plugin.macros[macro] === "function") {
      this.macro(macro, plugin.macros[macro]);
    }
  }
};

Pattern.prototype.macro = function(key, method) {
  this.Part.prototype[macroName(key)] = method;
};

/** Packs parts in a 2D space and sets pattern size */
Pattern.prototype.pack = function() {
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
