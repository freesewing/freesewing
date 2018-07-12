import { Point } from './point'

export class Part {
  id: string;
  render: boolean;
  points: {
    [index: string]: Point;
  }
  [propName: string]: any;

  constructor(id: string) {
    this.id = id;
    this.render = (id.substr(0,1) === '_') ? false : true;
    this.points = {};

    return this;
  }


//  purge = {
//    points = function(prefix: string): void {}
//    paths = function(prefix: string): void {}
//  }
}
