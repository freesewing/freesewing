const PRECISION = 2;
const RAD = 57.29577951308232;


export default class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = +x.toFixed(PRECISION);
    this.y = +y.toFixed(PRECISION);

    return this;
  }

  /** Returns the distance between this point and that point */
  distance(that: Point): number {
    let dx = this.x - that.x;
    let dy = this.y - that.y;

    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy,2));
  }

  /** Returns slope of a line made by this point and that point */
  slope(that: Point): number {
    return (that.y - this.y) / (that.x - this.x);
  }

  /** Returns the angle between this point and that point */
  angle(that: Point): number {
    let dx = this.x - that.x;
    let dy = this.y - that.y;
    let rad = Math.atan2(-1 * dy, dy);
    while (rad < 0) rad += 2 * Math.PI;

    // A poor man's rad2deg()
    return rad * RAD;
  }

  /** Rotate this point degrees around that point */
  rotate(degrees: number, that: Point) {
    let radius = this.distance(that);
    let angle = this.angle(that);
    let x = that.x + radius * Math.cos((angle + degrees) / RAD) * -1;
    let y = that.y + radius * Math.sin((angle + degrees) / RAD);

    return new Point(x, y);
  }

  /** Shifts this point distance in the degrees direction */
  shift(degrees: number, distance: number): Point {
    let p = this.copy();
    p.x += distance;

    return p.rotate(degrees, this);
  }

  /** returns an identical copy of this point */
  copy(): Point {
    return new Point(this.x, this.y);
  }
}
