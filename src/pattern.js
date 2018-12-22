import { macroName, round, sampleStyle, capitalize } from "./utils";
import Part from "./part";
import Point from "./point";
import Path from "./path";
import Snippet from "./snippet";
import Svg from "./svg";
import pack from "bin-pack";
import Store from "./store";
import hooks from "./hooks";
import Attributes from "./attributes";

export default function Pattern(config = { options: {} }) {
  this.config = config; // Pattern configuration
  this.width = false; // Will be set after render
  this.height = false; // Will be set after render
  this.is = ""; // Will be set when drafting/sampling

  this.store = new Store(); // Store for sharing data across parts
  this.parts = {}; // Parts container
  this.hooks = hooks; // Hooks container

  this.Point = Point; // Point constructor
  this.Path = Path; // Path constructor
  this.Snippet = Snippet; // Snippet constructor
  this.Attributes = Attributes; // Attributes constructor

  // Default settings
  this.settings = {
    complete: true,
    idPrefix: "fs-",
    locale: "en",
    units: "metric",
    margin: 2,
    options: {}
  };

  if (typeof this.config.inject === "undefined") this.config.inject = [];
  if (typeof this.config.dependencies === "undefined")
    this.config.dependencies = {};
  if (typeof this.config.hide === "undefined") this.config.hide = [];
  this.config.resolvedDependencies = this.resolveDependencies(
    this.config.dependencies
  );
  this.config.draftOrder = this.draftOrder(this.config.resolvedDependencies);

  // Convert options
  for (let i in config.options) {
    let option = config.options[i];
    if (typeof option === "object") {
      if (typeof option.pct !== "undefined")
        this.settings.options[i] = option.pct / 100;
      else if (typeof option.mm !== "undefined")
        this.settings.options[i] = option.mm;
      else if (typeof option.deg !== "undefined")
        this.settings.options[i] = option.deg;
      else if (typeof option.count !== "undefined")
        this.settings.options[i] = option.count;
      else if (typeof option.dflt !== "undefined")
        this.settings.options[i] = option.dflt;
      else throw "Unknown option type";
    } else {
      this.settings.options[i] = option;
    }
  }

  // Macros
  this.macros = {};

  // Context object to add to Part closure
  const context = {
    parts: this.parts,
    config: this.config,
    settings: this.settings,
    store: this.store,
    macros: this.macros
  };

  // Part closure
  this.Part = () => {
    let part = new Part();
    part.context = context;
    for (let macro in context.macros) {
      part[macroName(macro)] = context.macros[macro];
    }
    return part;
  };
}

// Merges settings object with this.settings
Pattern.prototype.apply = function(settings) {
  for (let key of Object.keys(settings)) {
    if (Array.isArray(settings[key])) {
      if (Array.isArray(this.settings[key])) {
        for (let entry of settings[key]) this.settings[key].push(entry);
      } else this.settings[key] = settings[key];
    } else if (typeof settings[key] === "object") {
      this.settings[key] = {
        ...this.settings[key],
        ...settings[key]
      };
    } else this.settings[key] = settings[key];
  }

  return this;
};

Pattern.prototype.runHooks = function(hookName, data = false) {
  if (data === false) data = this;
  let hooks = this.hooks[hookName];
  if (hooks.length > 0) {
    for (let hook of hooks) {
      hook.method(data, hook.data);
    }
  }
};

/**
 *  The default draft method with pre- and postDraft hooks
 */
Pattern.prototype.draft = function() {
  if (this.is !== "sample") this.is = "draft";
  this.runHooks("preDraft");
  for (let partName of this.config.draftOrder) {
    this.parts[partName] = new this.Part();
    if (typeof this.config.inject[partName] === "string") {
      this.parts[partName].inject(this.parts[this.config.inject[partName]]);
    }
    if (this.needs(partName)) {
      let method = "draft" + capitalize(partName);
      if (typeof this[method] !== "function")
        throw new Error(
          'Method "' + method + '" on pattern object is not callable'
        );
      this.parts[partName] = this[method](this.parts[partName]);
      this.parts[partName].render = this.wants(partName);
    }
  }
  this.runHooks("postDraft");

  return this;
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
    return this.sampleModels(
      this.settings.sample.models,
      this.settings.sample.focus || false
    );
  }
};

Pattern.prototype.sampleParts = function() {
  let parts = {};
  this.settings.complete = false;
  this.settings.paperless = false;
  this.draft();
  for (let i in this.parts) {
    parts[i] = new this.Part();
    parts[i].render = this.parts[i].render;
  }
  return parts;
};

Pattern.prototype.sampleRun = function(
  parts,
  anchors,
  run,
  runs,
  extraClass = false
) {
  this.draft();
  for (let i in this.parts) {
    let anchor = false;
    let dx = 0;
    let dy = 0;
    if (this.parts[i].points.anchor) {
      if (typeof anchors[i] === "undefined")
        anchors[i] = this.parts[i].points.anchor;
      else {
        if (!anchors[i].sitsOn(this.parts[i].points.anchor)) {
          dx = this.parts[i].points.anchor.dx(anchors[i]);
          dy = this.parts[i].points.anchor.dy(anchors[i]);
        }
      }
    }
    for (let j in this.parts[i].paths) {
      parts[i].paths[j + "_" + run] = this.parts[i].paths[j]
        .clone()
        .attr("style", sampleStyle(run, runs));
      if (this.parts[i].points.anchor)
        parts[i].paths[j + "_" + run] = parts[i].paths[j + "_" + run].translate(
          dx,
          dy
        );
      if (extraClass !== false)
        parts[i].paths[j + "_" + run].attributes.add("class", extraClass);
    }
  }
};

/**
 * Handles option sampling
 */
Pattern.prototype.sampleOption = function(optionName) {
  this.is = "sample";
  this.runHooks("preSample");
  let step, val;
  let factor = 1;
  let anchors = {};
  let parts = this.sampleParts();
  let option = this.config.options[optionName];
  if (typeof option.list === "object") {
    return this.sampleListOption(optionName);
  }
  if (typeof option.min === "undefined" || typeof option.max === "undefined") {
    let min = option * 0.9;
    let max = option * 1.1;
    option = { min, max };
  }
  if (typeof option.pct !== "undefined") factor = 100;
  val = option.min / factor;
  step = (option.max / factor - val) / 9;
  for (let run = 1; run < 11; run++) {
    this.settings.options[optionName] = val;
    this.debug({
      type: "info",
      label: "🏃🏿‍♀️ Sample run",
      msg: `Sampling option ${optionName} with value ${round(val)}`
    });
    this.sampleRun(parts, anchors, run, 10);
    val += step;
  }
  this.parts = parts;
  this.runHooks("postSample");

  return this;
};

Pattern.prototype.sampleListOption = function(optionName) {
  let parts = this.sampleParts();
  let option = this.config.options[optionName];
  let anchors = {};
  let run = 1;
  let runs = option.list.length;
  for (let val of option.list) {
    this.settings.options[optionName] = val;
    this.debug({
      type: "info",
      label: "🏃🏿‍♀️ Sample run",
      msg: `Sampling option ${optionName} with value ${round(val)}`
    });
    this.sampleRun(parts, anchors, run, runs);
    run++;
  }
  this.parts = parts;

  return this;
};

/**
 * Handles measurement sampling
 */
Pattern.prototype.sampleMeasurement = function(measurementName) {
  this.is = "sample";
  this.runHooks("preSample");
  let anchors = {};
  let parts = this.sampleParts();
  let val = this.settings.measurements[measurementName];
  if (val === undefined) throw "Cannot sample a measurement that is undefined";
  let step = val / 50;
  val = val * 0.9;
  for (let run = 1; run < 11; run++) {
    this.settings.measurements[measurementName] = val;
    this.debug({
      type: "info",
      label: "🏃🏿‍♀️ Sample run",
      msg: `Sampling option ${measurementName} with value ${round(val)}`
    });
    this.sampleRun(parts, anchors, run, 10);
    val += step;
  }
  this.parts = parts;
  this.runHooks("postSample");

  return this;
};

/**
 * Handles models sampling
 */
Pattern.prototype.sampleModels = function(models, focus = false) {
  this.is = "sample";
  this.runHooks("preSample");
  let anchors = {};
  let parts = this.sampleParts();
  let run = 0;
  let runs = Object.keys(models).length;
  for (let l in models) {
    run++;
    this.settings.measurements = models[l];
    this.debug({
      type: "info",
      label: "🏃🏿‍♀️ Sample run",
      msg: `Sampling model ${l}`
    });
    let className = l === focus ? "sample-focus" : "";
    this.sampleRun(parts, anchors, run, runs, className);
  }
  this.parts = parts;
  this.runHooks("postSample");

  return this;
};

/** Debug method, exposes debug hook */
Pattern.prototype.debug = function(data) {
  this.runHooks("debug", data);
};

Pattern.prototype.render = function() {
  this.svg = new Svg(this);
  this.svg.hooks = this.hooks;

  return this.pack().svg.render(this);
};

Pattern.prototype.on = function(hook, method, data) {
  this.hooks[hook].push({ method, data });
};

Pattern.prototype.use = function(plugin, data = false) {
  this.debug({
    type: "success",
    label: "🔌 Plugin loaded",
    msg: `${plugin.name} v${plugin.version}`
  });
  if (plugin.hooks) this.loadPluginHooks(plugin, data);
  if (plugin.macros) this.loadPluginMacros(plugin);

  return this;
};

Pattern.prototype.loadPluginHooks = function(plugin, data) {
  for (let hook of Object.keys(this.hooks)) {
    if (typeof plugin.hooks[hook] === "function") {
      this.on(hook, plugin.hooks[hook], data);
    } else if (Array.isArray(plugin.hooks[hook])) {
      for (let method of plugin.hooks[hook]) {
        this.on(hook, method, data);
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
  this.macros[key] = method;
};

/** Packs parts in a 2D space and sets pattern size */
Pattern.prototype.pack = function() {
  let bins = [];
  for (let key in this.parts) {
    let part = this.parts[key];
    // Avoid multiple render calls to cause stacking of transforms
    part.attributes.set("transform", "");
    if (part.render && this.needs(key)) {
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

/** Determines the order to draft parts in, based on dependencies */
Pattern.prototype.draftOrder = function(graph = this.resolveDependencies()) {
  let sorted = [];
  let visited = {};
  Object.keys(graph).forEach(function visit(name, ancestors) {
    if (!Array.isArray(ancestors)) ancestors = [];
    ancestors.push(name);
    visited[name] = true;
    if (typeof graph[name] !== "undefined") {
      graph[name].forEach(function(dep) {
        if (visited[dep]) return;
        visit(dep, ancestors.slice(0));
      });
    }
    if (sorted.indexOf(name) < 0) sorted.push(name);
  });

  return sorted;
};

/** Recursively solves part dependencies for a part */
Pattern.prototype.resolveDependency = function(
  seen,
  part,
  graph = this.config.dependencies,
  deps = []
) {
  if (typeof seen[part] === "undefined") seen[part] = true;
  if (typeof graph[part] === "string") {
    deps.push(graph[part]);
    return this.resolveDependency(seen, graph[part], graph, deps);
  } else if (Array.isArray(graph[part])) {
    if (graph[part].length === 0) return [];
    else {
      if (deps.length === 0) deps = graph[part];
      for (let apart of graph[part])
        deps.concat(this.resolveDependency(seen, apart, graph, deps));
    }
  }

  return deps;
};

/** Resolves part dependencies into a flat array */
Pattern.prototype.resolveDependencies = function(
  graph = this.config.dependencies
) {
  // Include parts outside the dependency graph
  if (Array.isArray(this.config.parts)) {
    for (let part of this.config.parts) {
      if (typeof this.config.dependencies[part] === "undefined")
        this.config.dependencies[part] = [];
    }
  }

  let resolved = {};
  let seen = {};
  for (let part of Object.keys(graph)) {
    resolved[part] = this.resolveDependency(seen, part, graph);
  }
  for (let part of Object.keys(seen))
    if (typeof resolved[part] === "undefined") resolved[part] = [];

  return resolved;
};

/** Determines whether a part is needed
 * This depends on the 'only' setting and the
 * configured dependencies.
 */
Pattern.prototype.needs = function(partName) {
  if (typeof this.settings.only === "undefined" || this.settings.only === false)
    return true;
  else if (typeof this.settings.only === "string") {
    if (this.settings.only === partName) return true;
    if (Array.isArray(this.config.resolvedDependencies[this.settings.only])) {
      for (let dependency of this.config.resolvedDependencies[
        this.settings.only
      ]) {
        if (dependency === partName) return true;
      }
    }
  } else if (Array.isArray(this.settings.only)) {
    for (let part of this.settings.only) {
      if (part === partName) return true;
      for (let dependency of this.config.resolvedDependencies[part]) {
        if (dependency === partName) return true;
      }
    }
  }

  return false;
};

/* Checks whether a part is hidden in the config */
Pattern.prototype.isHidden = function(partName) {
  if (Array.isArray(this.config.hide)) {
    if (this.config.hide.indexOf(partName) !== -1) return true;
  }

  return false;
};

/** Determines whether a part is wanted by the user
 * This depends on the 'only' setting
 */
Pattern.prototype.wants = function(partName) {
  if (
    typeof this.settings.only === "undefined" ||
    this.settings.only === false
  ) {
    if (this.isHidden(partName)) return false;
  } else if (typeof this.settings.only === "string") {
    if (this.settings.only === partName) return true;
    return false;
  } else if (Array.isArray(this.settings.only)) {
    for (let part of this.settings.only) {
      if (part === partName) return true;
    }
    return false;
  }

  return true;
};
