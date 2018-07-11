const PRECISION = 2;

export default class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = +x.toFixed(PRECISION);
    this.y = +y.toFixed(PRECISION);

    return this;
  }
}
