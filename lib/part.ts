import { Point } from './point'
import { Path } from './path'
import { Snippet } from './snippet'
import { Attributes } from './attributes'

export class Part {
  id: string;
  render: boolean;
  points: { [index: string]: Point; } = {};
  paths: { [index: string]: Path; } = {};
  snippets: { [index: string]: Snippet; } = {};
  attributes = new Attributes();
  [propName: string]: any;

  constructor(id: string) {
    this.id = id;
    this.render = (id.substr(0,1) === '_') ? false : true;
    this.points.origin = new Point(0,0);

    return this;
  }

  //macro(type: string, options: {}): void {
  //  switch(type) {
  //    case 'cof':
  //      this.points.cofFrom = options.from.shiftTowards(options.to, 10);
  //      this.points.cofTo = options.to.shiftTowards(options.from, 10);
  //      this.points.cofVia1 = options.from.rotate(-90, this.points.cofFrom);
  //      this.points.cofVia2 = options.to.rotate(-90, this.points.cofTo);
  //      this.paths.cof = new Path().move(cofFrom).line(cofVia1).line(cofVia2).line(cofTo);
  //    break;
  //  }
  //}


//  purge = {
//    points = function(prefix: string): void {}
//    paths = function(prefix: string): void {}
//  }
}
