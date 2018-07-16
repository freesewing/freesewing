import { Point } from './point'
import { Path } from './path'
import { Snippet } from './snippet'
import { Attributes } from './attributes'
import { PointList } from './pointlist'

var pointProxy: any = {
  id: 'test',
  get: function(points, key: string, proxy: ProxyHandler<Map<any, any>>): Point {
    console.log(`getting ${key}`);
    return points.get(key);
  },
  set: function(points: Map<string, Point>, key: string, point: Point, proxy: ProxyHandler<Map<any, any>>) {
    console.log(arguments);
    console.log(`Args above. Setting ${key} to`, point);
    point.attributes.add('data-key', key);
    point.attributes.add('data-part', this.id);
    points.set(key, point);
    return true;
  }
};


export class Part {
  id: string;
  render: boolean;
  points = new Proxy(new Map(), pointProxy);
  paths: { [index: string]: Path; } = {};
  snippets: { [index: string]: Snippet; } = {};
  attributes = new Attributes();
  [propName: string]: any;

  constructor(id: string) {
    this.id = id;
    this.render = (id.substr(0,1) === '_') ? false : true;
    this.points = new Proxy(new Map(), pointProxy);
    this.points.origin = new Point(0,0);

    return this;
  }
//  purge = {
//    points = function(prefix: string): void {}
//    paths = function(prefix: string): void {}
//  }
}
