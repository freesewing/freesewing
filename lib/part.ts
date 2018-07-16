import { Point } from './point'
import { Path } from './path'
import { Snippet } from './snippet'
import { Attributes } from './attributes'

function PointProxy(id: string) {
  this.id = id;
  this.get =  function(points, key: string, proxy: ProxyHandler<Map<any, any>>): Point {
    return points.get(key);
  };
  this.set =  function(points: Map<string, Point>, key: string, point: Point, proxy: ProxyHandler<Map<any, any>>) {
    point.attributes.add('data-key', key);
    point.attributes.add('data-part', this.id);
    points.set(key, point);
    return true;
  };
};

export class Part {
  id: string;
  render: boolean;
  points: any;
  paths: { [index: string]: Path; } = {};
  snippets: { [index: string]: Snippet; } = {};
  attributes = new Attributes();
  [propName: string]: any;

  constructor(id: string) {
    this.id = id;
    this.render = (id.substr(0,1) === '_') ? false : true;
    this.points = new Proxy(new Map(), new PointProxy(id));
    this.points.origin = new Point(0,0);

    return this;
  }
//  purge = {
//    points = function(prefix: string): void {}
//    paths = function(prefix: string): void {}
//  }
}
