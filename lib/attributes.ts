export class Attributes {
  list: {name: string, value: string}[] = [];

  /** Adds an attribute */
  add(name: string, value: string): Attributes {
    this.list.push({name, value});

    return this;
  }

  /** Returns SVG code for attributes */
  render(): string {
    let svg = '';
    for (let a of this.list) {
      svg += ` ${a.name}="${a.value}"`;
    }

    return svg;
  }
}
