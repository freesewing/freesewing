import { PatternConfig, PatternOption } from './types'
import { Part } from './part'
import { Svg } from './svg'
import { Option } from './option'
import themes from './themes'
import { Theme } from './themes/theme'

export class Pattern {
  config: PatternConfig;
  svg: Svg = new Svg();
  parts: {
    [index: string]: Part;
  }
  options: {[propName: string]: number};
  themes: {[index:string]: Theme} = themes;

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

  draft(config: object): void {
    throw Error('You have to implement the draft() method in your Pattern instance.');
  }

  render(): string {
    let svg = new Svg();
    return svg.render(this);
  }
}
