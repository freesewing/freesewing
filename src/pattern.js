import { macroName } from "./utils";
import Part from "./part";
import Point from "./point";
import Path from "./path";
import Snippet from "./snippet";
import Svg from "./svg";
import Hooks from "./hooks";
import pack from "bin-pack";
import Store from "./store";
import * as hooklib from "hooks";

export default function Pattern(config = false) {
  // width and height properties
  this.width = false;
  this.height = false;

  // Hooks and Svg instance
  for (let k in hooklib) this[k] = hooklib[k];
  this.hooks = new Hooks();
  Svg.prototype.hooks = this.hooks;

  // Data containers
  this.settings = {
    mode: "draft"
  };
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
  for (let i in config.options) {
    let option = config.options[i];
    if (typeof option === "object") {
      if (typeof option.type === "undefined")
        this.options[i] = option.val / 100;
    } else if (typeof option === "number") {
      this.options[i] = option;
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

/**
 * Handles pattern sampling
 */
Pattern.prototype.sample = function() {
  if (this.settings.sample.type === "option") {
    return this.sampleOption(this.settings.sample.option);
  } else if (this.settings.sample.type === "measurement") {
    return this.sampleMeasurement(this.settings.sample.measurement);
  } else if (this.settings.sample.type === "models") {
    return this.sampleModels(this.settings.sample.models);
  }
};

Pattern.prototype.sampleParts = function() {
  let parts = {};
  this.settings.mode = "sample";
  this.settings.paperless = false;
  this.draft();
  for (let i in this.parts) {
    parts[i] = new Part();
    parts[i].render = this.parts[i].render;
  }
  return parts;
};

/**
 * Handles option sampling
 */
Pattern.prototype.sampleOption = function(option) {
  let step, val;
  let parts = this.sampleParts();
  if (
    typeof this.config.options[option].min === "undefined" ||
    typeof this.config.options[option].max === "undefined"
  ) {
    throw "Cannot sample an option without min and max values";
  }
  let factor = 100;
  val = this.config.options[option].min / factor;
  step = (this.config.options[option].max / factor - val) / 9;
  for (let l = 1; l < 11; l++) {
    this.options[option] = val;
    this.debug(`Sampling option ${option} with value ${val}`);
    this.draft();
    for (let i in this.parts) {
      for (let j in this.parts[i].paths) {
        parts[i].paths[j + "_" + l] = this.parts[i].paths[j]
          .clone()
          .attr("class", "sample-" + l, true);
      }
    }
    val += step;
  }
  this.parts = parts;

  return this;
};

/**
 * Handles measurement sampling
 */
Pattern.prototype.sampleMeasurement = function(measurement) {
  let parts = this.sampleParts();
  let val = this.settings.measurements[measurement];
  if (val === undefined) throw "Cannot sample a measurement that is undefined";
  let step = val / 50;
  val = val * 0.9;
  for (let l = 1; l < 11; l++) {
    this.settings.measurements[measurement] = val;
    this.debug(`Sampling measurement ${measurement} with value ${val}`);
    this.draft();
    for (let i in this.parts) {
      for (let j in this.parts[i].paths) {
        parts[i].paths[j + "_" + l] = this.parts[i].paths[j]
          .clone()
          .attr("class", "sample-" + l, true);
      }
    }
    val += step;
  }
  this.parts = parts;

  return this;
};

/**
 * Handles models sampling
 */
Pattern.prototype.sampleModels = function(models) {
  let parts = this.sampleParts();
  let count = 0;
  for (let l in models) {
    count++;
    this.settings.measurements = models[l];
    this.debug(`Sampling model ${l}`);
    this.draft();
    for (let i in this.parts) {
      for (let j in this.parts[i].paths) {
        parts[i].paths[j + "_" + count] = this.parts[i].paths[j]
          .clone()
          .attr("class", "sample-" + count, true);
      }
    }
  }
  this.parts = parts;

  return this;
};

/** Debug method, exposes debug hook */
Pattern.prototype.debug = function(data) {};

Pattern.prototype.render = function() {
  this.svg = new Svg(this);

  return this.pack().svg.render(this);
};

Pattern.prototype.on = function(hook, method) {
  if (typeof this.hooks._hooks[hook] === "undefined") {
    this.hooks._hooks[hook] = [];
  }
  this.hooks._hooks[hook].push(method);

  // Pattern object hooks need to be attached on load
  let localHooks = [
    "preDraft",
    "postDraft",
    "preSample",
    "postSample",
    "debug"
  ];
  if (localHooks.includes(hook)) {
    let self = this;
    this.hooks.attach(hook, self);
  }
};

Pattern.prototype.with = function(plugin) {
  this.debug(`Plugin: ${plugin.name} v${plugin.version}`);
  if (plugin.hooks) this.loadPluginHooks(plugin);
  if (plugin.macros) this.loadPluginMacros(plugin);

  return this;
};

Pattern.prototype.loadPluginHooks = function(plugin) {
  for (let hook of this.hooks.all) {
    if (typeof plugin.hooks[hook] === "function") {
      this.on(hook, plugin.hooks[hook]);
    } else if (
      typeof plugin.hooks[hook] !== "undefined" &&
      plugin.hooks[hook].isArray()
    ) {
      for (let method of plugin.hooks[hook]) {
        this.on(hook, method);
      }
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
    // Avoid multiple render calls to cause stacking of transforms
    part.attributes.set("transform", "");
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
