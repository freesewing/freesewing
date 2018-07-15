import { PatternConfig, PatternOption } from './types'
import { Point } from './point'
import { Part } from './part'
import { Svg } from './svg'
import { Option } from './option'
import themes from './themes'
import { Theme } from './themes/theme'

export class Pattern {
  config: PatternConfig;
  svg: Svg = new Svg();
  themes: {[index:string]: Theme} = themes;
  parts: {
    [index: string]: Part;
  }
  options: {[propName: string]: number};
  values: {[propName: string]: any} = {};
  settings: {[propName: string]: any} = {mode: 'draft', units: 'metric'};

  constructor(config: PatternConfig) {
    this.config = config;

    this.parts = {};
    for (let id of config.parts) {
      this.parts[id] = new Part(id);
    }

    this.options = {};
    for (let conf of config.options) {
      if(conf.type === 'percentage') this.options[conf.id] = conf.val/100;
      else this.options[conf.id] = conf.val;
    }

    return this;
  }

  draft(): void {
    throw Error('You have to implement the draft() method in your Pattern instance.');
  }

  render(): string {
    let svg = new Svg();
    let theme = this.themes[this.settings.mode];
    theme.preRender(this, svg);

    return svg.render(this);
  }
}
