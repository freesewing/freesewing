import { PatternConfig, PatternOption } from './types'
import { Point } from './point'
import { Part } from './part'
import { Svg } from './svg'
import { Hooks } from './hooks'
import { Option } from './option'
import { Snippet } from './snippet'
import { Path } from './path'

export class Pattern {
  config: PatternConfig;
  svg: Svg;
  parts: {
    [index: string]: Part;
  }
  options: {[propName: string]: number};
  values: {[propName: string]: any} = {};
  settings: {[propName: string]: any} = {mode: 'draft', units: 'metric'};
  hooks: Hooks;
  snippet: Snippet;
  path: Path;
  context: any
  hook: any;

  constructor(config: PatternConfig) {
    if(!config) {
      throw "Could not create pattern: You need to provide a pattern config."
    }
    if(typeof config.parts === 'undefined' || !config.parts || config.parts.length < 1) {
      throw "Could not create pattern: You should define at least one part in your pattern config";
    }
    this.config = config;
    this.point = Point;
    this.path = Path;
    this.snippet = Snippet;
    this.parts = {};
    this.svg = new Svg(this);
    this.hooks = new Hooks();
    for (let id of config.parts) {
      this.parts[id] = new Part(id);
    }

    this.options = {};
    if(typeof config.options !== 'undefined' && config.options.length > 0) {
      for (let conf of config.options) {
        if(conf.type === 'percentage') this.options[conf.id] = conf.val/100;
        else this.options[conf.id] = conf.val;
      }
    }
    this.context = {
      parts: this.parts,
      options: this.options,
      values: this.values,
      config: this.config,
      settings: this.settings
    }
    return this;
  }

  draft(): void {
    throw Error('You have to implement the draft() method in your Pattern instance.');
  }

  render(): string {
    this.hooks.attach('preRenderSvg', this.svg);
    this.hooks.attach('postRenderSvg', this.svg);
    //this.hooks.attach('insertText', this.svg);

    return this.svg.render(this);
  }

  on(hook, method): void {
    if(typeof this.hooks._hooks[hook] === 'undefined') {
      this.hooks._hooks[hook] = [];
    }
    this.hooks._hooks[hook].push(method);
  }

  macro(key, method): void {
    let name = `_macro_${key}`;
    this.on(name, method);
    for(let partId in this.parts) {
      let part = this.parts[partId];
      part[name] = () => null;
      this.hooks.attach(name, part);
    }
  }

  withPlugin(plugin: () => void): void {
    if(plugin.hooks) this.loadPluginHooks(plugin);
    if(plugin.macros) this.loadPluginMacros(plugin);

    return this; // Make it chainable
  }

  loadPluginHooks(plugin: () => void): void {
    for(let hook of this.hooks.all) {
      if(typeof plugin.hooks[hook] === 'function') {
        this.on(hook, plugin.hooks[hook]);
      }
    }
  }

  loadPluginMacros(plugin: () => void): void {
    for(let macro in plugin.macros) {
      if(typeof plugin.macros[macro] === 'function') {
        this.macro(macro, plugin.macros[macro]);
      }
    }
  }
}
