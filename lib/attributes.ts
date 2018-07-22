export class Attributes {
  list: any = {};

  constructor(init?) {
    for (let key in init) {
      let val = init[key];
      this.add(key, val);
    }

    return this;
  }

  /** Adds an attribute */
  add(name: string, value: string): Attributes {
    if(typeof this.list[name] === 'undefined') {
      this.list[name] = [];
    }

    this.list[name].push(value);

    return this;
  }

  /** Retrieves an attribute */
  get(name: string): string {
    if(typeof this.list[name] === 'undefined') return false;
    else return this.list[name].join(' ');
  }

  /** Returns SVG code for attributes */
  render(): string {
    let svg = '';
    for (let key in this.list) {
      svg += ` ${key}="${this.list[key].join(' ')}"`;
    }

    return svg;
  }

  /** Returns SVG code for attributes with a fiven prefix
   * typically used for data-text*/
  renderIfPrefixIs(prefix:string = ''): string {
    let svg = '';
    let prefixLen = prefix.length;
    for (let key in this.list) {
      if(key.substr(0,prefixLen) === prefix) {
        svg += ` ${key.substr(prefixLen)}="${this.list[key].join(' ')}"`;
      }
    }

    return svg;
  }
}
