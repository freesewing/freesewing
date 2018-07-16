import { Point } from './point'
import { Attributes } from './attributes'

export class Snippet {
  anchor: Point;
  def: string;
  attributes: Attributes = new Attributes();
  description: string | false;

  constructor(anchor: Point, def: string, description: string | false = false) {
    this.anchor = anchor;
    this.def = def;
    this.description = description;

    return this;
  }
}
