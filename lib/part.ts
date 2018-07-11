import Point from './point'

export default class Part {
  id: string | number;
  points: {
    [index: string]: Point;
  }
  [propName: string]: any;

  constructor(id: string | number) {
    this.id = id;
    this.points = {};

    return this;
  }

  newPoint(id: string | number, x: number, y: number) {
    this.points[id] = new Point(x, y);
  }
}
