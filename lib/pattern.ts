import { PatternConfig, PatternOption } from './types'
import { Point } from './point'
import { Part } from './part'
import { Svg } from './svg'
import { Hooks } from './hooks'
import { Option } from './option'

export class Pattern {
  config: PatternConfig;
  svg: Svg = new Svg();
  parts: {
    [index: string]: Part;
  }
  options: {[propName: string]: number};
  values: {[propName: string]: any} = {};
  settings: {[propName: string]: any} = {mode: 'draft', units: 'metric'};
  hooks: Hooks;
  on: function;

  constructor(config: PatternConfig) {
    if(!config) {
      throw "Could not create pattern: You need to provide a pattern config."
    }
    if(typeof config.parts === 'undefined' || !config.parts || config.parts.length < 1) {
      throw "Could not create pattern: You should define at least one part in your pattern config";
    }
    this.config = config;
    this.parts = {};
    this.hooks = new Hooks();
    this.on = this.hooks.on;
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
    let svg = new Svg(this);
    this.hooks.attach('loadStyle', svg);
    //svg.pre('preRenderSvg', function(next) {
    //  console.log('manual attach');
    //  this.style += "path {stroke: #000; fill: none;}";
    //  next();
    //});

    return svg.render(this);
  }
}
