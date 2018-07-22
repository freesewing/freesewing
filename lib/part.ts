import { Point } from './point'
import { Path } from './path'
import { Snippet } from './snippet'
import { Attributes } from './attributes'
import hooklib from 'hooks'

export class Part {
  id: string;
  render: boolean;
  points: { [index: string]: Point; } = {};
  paths: { [index: string]: Path; } = {};
  snippets: { [index: string]: Snippet; } = {};
  attributes = new Attributes();
  // Expose constructors for macros
  point: Point = Point;
  path: Path = Path;
  attr: Attribute = Attributes;
  [propName: string]: any;

  constructor(id: string) {
    this.id = id;
    this.render = (id.substr(0,1) === '_') ? false : true;
    this.points.origin = new Point(0,0);
    for(let k in hooklib) this[k] = hooklib[k];

    return this;
  }

  macroRunner(args?) {
    let self = this;
    let data = args;
    let method = function (key, data) {
      let macro = `_macro_${key}`;
      if(typeof self[macro] === 'function') {
        self[macro](data);
      }
    }

    return method;
  }
}
