import { PatternConfig, PatternOption } from './types'
import { Point } from './point'
import { Part } from './part'
import { Svg } from './svg'
import { Hooks } from './hooks'
import { Option } from './option'

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

  constructor(config: PatternConfig) {
    if(!config) {
      throw "Could not create pattern: You need to provide a pattern config."
    }
    if(typeof config.parts === 'undefined' || !config.parts || config.parts.length < 1) {
      throw "Could not create pattern: You should define at least one part in your pattern config";
    }
    this.config = config;
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
    return this;
  }

  draft(): void {
    throw Error('You have to implement the draft() method in your Pattern instance.');
  }

  render(): string {
    this.hooks.attach('preRenderSvg', this.svg);
    this.hooks.attach('postRenderSvg', this.svg);

    return this.svg.render(this);
  }

  /** Add hook */
  on(hook, method): void {
    if(typeof this.hooks._hooks[method] === 'undefined') {
      this.hooks._hooks[hook] = [];
    }
    this.hooks._hooks[hook].push(method);
  }

  loadPlugin(plugin: () => void): void {
    for(let hook of this.hooks.all) {
      if(typeof plugin[hook] === 'function') {
        this.on(hook, plugin[hook]);
      }
    }
  }
}
