import { Part } from './part'
import { Path } from './path'
import { Pattern } from './pattern'
import { Attributes } from './attributes'

export class Renderer {
  svg = '';
  readonly TAB = '  ';
  tabs: number = 0;
  freeId: number = 1;
  openGroups: string[] = [];

  constructor() {
    return this;
  }

  /** Renders a draft object as SVG */
  render(pattern: Pattern, final: boolean = false): string {
    let svg = this.openGroup('draftContainer');
    for (let partId in pattern.parts) {
      let part = pattern.parts[partId];
      if (part.render) {
        svg += this.openGroup(part.id, part.attributes);
        svg += this.renderPart(part);
        svg += this.closeGroup();
      }
    }
    svg += this.closeGroup();

    return svg;
  }

  /** Returns SVG code for a Part object */
  renderPart(part: Part): string {
		let svg = '';
    for (let pathId in part.paths) {
      let path = part.paths[pathId];
      if(path.render) svg += this.renderPath(path);
    }
    // includes
    // text on path
    // notes
    // dimensions
    // texts
    // snippets

    return svg;
  }

  /** Returns SVG code for a Path object */
  renderPath(path: Path): string {
    return `${this.nl()}<path ${path.attributes.add('d', path.asPathstring()).render()} />`;
  }


  /** Returns SVG code to open a group */
  protected openGroup(id: string, attributes?: Attributes): string {
    let svg = this.nl()+this.nl();
    svg += `<!-- Start of group #${id} -->`;
    svg += this.nl();
    svg += `<g id="${id}">`;
    this.indent();
    this.openGroups.push(id);

    return svg;
  }

  /** Returns SVG code to close a group */
  protected closeGroup(): string {
    this.outdent();

    return `${this.nl()}</g>${this.nl()}<!-- end of group #${this.openGroups.pop()} -->`;
  }

  /** Returns a linebreak + identation */
  protected nl(): string {
    return "\n"+this.TAB;
  }

  /** Increases indentation by 1 */
  protected indent(): void {
    this.tabs += 1;
  }

  /** Decreases indentation by 1 */
  protected outdent(): void {
    this.tabs -= 1;
  }

   /** Returns an unused ID */
   protected getUid() {
     this.freeId += 1;

     return this.freeId;
   }
}
