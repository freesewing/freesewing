import { round, rad2deg, deg2rad } from './utils';
import { Attributes } from './attributes'

export class Point {
  x: number;
  y: number;
  attributes: Attributes = new Attributes();

  constructor(x: number, y: number) {
    this.x = round(x);
    this.y = round(y);

    return this;
  }

  /** Adds an attribute. This is here to make this call chainable in assignment */
  attr(name, value): Point {
    this.attributes.add(name, value);

    return this;
  }

  /** Returns the distance between this point and that point */
  dist(that: Point): number {
    let dx = this.x - that.x;
    let dy = this.y - that.y;

    return round(Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)));
  }

  /** Returns slope of a line made by this point and that point */
  slope(that: Point): number {
    return (that.y - this.y) / (that.x - this.x);
  }

  /** Returns the x-delta between this point and that point */
  dx(that: Point): number {
    return that.x - this.x;
  }

  /** Returns the y-delta between this point and that point */
  dy(that: Point): number {
    return that.y - this.y;
  }

  /** Returns the angle between this point and that point */
  angle(that: Point): number {
    let rad = Math.atan2(-1 * this.dy(that), this.dx(that));
    while (rad < 0) rad += 2 * Math.PI;

    return rad2deg(rad);
  }

  /** Rotate this point deg around that point */
  rotate(deg: number, that: Point): Point {
    let radius = this.dist(that);
    let angle = this.angle(that);
    let x = that.x + radius * Math.cos(deg2rad(angle + deg)) * -1;
    let y = that.y + radius * Math.sin(deg2rad(angle + deg));

    return new Point(x, y);
  }

  /** returns an identical copy of this point */
  copy(): Point {
    return new Point(this.x, this.y);
  }

  /** checks whether this point is equal to that point */
  equals(that: Point): boolean {
    return (this.x === that.x && this.y === that.y) ? true : false;
  }

  /** Mirrors this point around X value of that point */
  flipX(that: Point): Point
  {
    return new Point(that.x + this.dx(that), that.y);
  }

  /** Mirrors this point around Y value of that point */
  flipY(that: Point): Point
  {
    return new Point(that.x, that.y + this.dy(that));
  }

  /** Shifts this point distance in the deg direction */
  shift(deg: number, distance: number): Point {
    let p = this.copy();
    p.x += distance;

    return p.rotate(deg, this);
  }

  /** Shifts this point distance in the direction of that point */
  shiftTowards(that: Point, distance: number): Point {
    return this.shift(this.angle(that), distance);
  }

  /** Shifts this point fraction of the distance towards that point */
  shiftFractionTowards(that: Point, fraction: number): Point {
    return this.shiftTowards(that, this.dist(that) * fraction);
  }

  /** Shifts this point distance beyond that point */
  shiftOutwards(that: Point, distance: number): Point {
    return this.shiftTowards(that, this.dist(that) + distance);
  }
}
