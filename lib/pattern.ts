import { PatternConfig, PatternOption } from './types'
import Part from './part'
import Option from './option'

export default class Pattern {
  config: PatternConfig;
  parts: {[propName: string]: Part};
  options: {[propName: string]: Option};

  constructor(config: PatternConfig) {
    this.config = config;

    this.parts = {};
    for (let id of config.parts) {
      this.parts[id] = new Part(id);
    }

    this.options = {};
    for (let conf of config.options) {
      this.options[conf.id] = new Option(conf);
    }

    return this;
  }

  draft(config: object): void {
    throw Error('You have to implement the draft() method in your Pattern instance.');
  }
}
