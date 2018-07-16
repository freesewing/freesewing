import { Point } from './point'
function pointDecorator(target: any, key: string) {

  // property value
  var _val: Point = this[key];

  // property getter
  var getter = function (): Point {
    console.log(`Get: ${key} => ${_val}`);
    return _val;
  };

  // property setter
  var setter = function (newVal: Point): void {
    console.log(`Set: ${key} => ${newVal}`);
    _val = newVal;
  };

  // Delete property.
  if (delete this[key]) {

    // Create new property with getter and setter
    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  }
}

export class PointList {
  @pointDecorator
  [index: string]: Point;
}
