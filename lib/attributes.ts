export class Attributes {
  list: any = {};

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
    return this.list[name].join(' ');
  }

  /** Returns SVG code for attributes */
  render(): string {
    let svg = '';
    for (let key in this.list) {
      let attrs = this.list
      svg += ` ${key}="${this.list[key].join(' ')}"`;
    }

    return svg;
  }
}
