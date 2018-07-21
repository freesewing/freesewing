import { Point } from './point'
import { Attributes } from './attributes'


export class Path {
  render: boolean = true;
  ops: {
      type: "move" | "line" | "curve" | "close";
      to?: Point;
      cp1?: Point;
      cp2?: Point;
    }[] = [];
  attributes: Attributes = new Attributes();

  /** Adds a move operation to Point to */
  move(to: Point): Path {
    this.ops.push({type: "move", to});

    return this;
  }

  /** Adds a line operation to Point to */
  line(to: Point): Path {
    this.ops.push({type: "line", to});

    return this;
  }

  /** Adds a line operation to Point to */
  curve(cp1: Point, cp2: Point, to: Point): Path {
    this.ops.push({type: "curve", cp1, cp2, to});

    return this;
  }

  /** Adds a close operation */
  close(): Path {
    this.ops.push({type: "close"});

    return this;
  }

  /** Adds an attribute. This is here to make this call chainable in assignment */
  attr(name, value): Path {
    this.attributes.add(name, value);

    return this;
  }

  /** Returns SVG pathstring for this path */
  asPathstring() {
    let d = '';
    for(let op of this.ops) {
      switch (op.type) {
        case 'move':
          d += `M ${op.to!.x},${op.to!.y}`;
          break;
        case 'line':
          d += ` L ${op.to!.x},${op.to!.y}`;
          break;
        case 'curve':
          d += ` C ${op.cp1!.x},${op.cp1!.y} ${op.cp2!.x},${op.cp2!.y} ${op.to!.x},${op.to!.y}`;
          break;
        case 'close':
          d += ' z';
          break;
        default:
          throw `${op.type} is not a valid path command`;
          break;
      }
    }

    return d;
  }

}
