import { Part } from './part'
import { Path } from './path'
import { Snippet } from './snippet'
import { Pattern } from './pattern'
import { Attributes } from './attributes'

export class Svg {
  prefix: string;
  body: string = '';
  style: string = '';
  script: string = '';
  header: string = '';
  footer: string = '';
  defs: string = '';
  attributes: Attributes = new Attributes();
  tabs: number = 0;
  freeId: number = 1;
  openGroups: string[] = [];

  constructor() {
    this.prefix = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>';
    this.attributes.add
    this.attributes.add("xmlns", "http://www.w3.org/2000/svg");
    this.attributes.add("xmlns:svg", "http://www.w3.org/2000/svg");
    this.attributes.add("xmlns:xlink", "http://www.w3.org/1999/xlink");
    this.attributes.add("xmlns:freesewing", "http://freesewing.org/namespaces/freesewing");
    this.attributes.add("freesewing:foo", "bar");

    return this;
  }

  /** Renders a draft object as SVG */
  render(pattern: Pattern): string {
    let svg = this.prefix;
    svg += this.renderComments(this.header);
    svg += this.renderSvgTag(pattern);
    svg += this.renderStyle();
    svg += this.renderScript();
    svg += this.renderDefs();
    svg += this.openGroup('draftContainer');
    for (let partId in pattern.parts) {
      let part = pattern.parts[partId];
      if (part.render) {
        svg += this.openGroup(part.id, part.attributes);
        svg += this.renderPart(part);
        svg += this.closeGroup();
      }
    }
    svg += this.closeGroup();
    svg += this.nl()+'</svg>';
    svg += this.renderComments(this.footer);

    return svg;
  }

  /** Returns SVG code for the opening SVG tag */
  renderSvgTag(pattern: Pattern) {
    let svg = '<svg';
    this.indent();
    svg += this.nl()+this.attributes.render();
    this.outdent();
    svg += this.nl()+'>'+this.nl();

    return svg;
  }

  /** Returns SVG code for the style block */
  renderStyle() {
    let svg = '<style type="text/css">';
    this.indent();
    svg += this.nl()+this.style;
    this.outdent();
    svg += this.nl()+']]> >'+this.nl()+'</style>'+this.nl();

    return svg;
  }

  /** Returns SVG code for the script block */
  renderScript() {
    let svg = '<script type="text/javascript"> <![CDATA[';
    this.indent();
    svg += this.nl()+this.script;
    this.outdent();
    svg += this.nl()+']]> >'+this.nl()+'</script>'+this.nl();

    return svg;
  }

  /** Returns SVG code for the defs block */
  renderDefs() {
    let svg = '<defs id="defs">';
    this.indent();
    svg += this.nl()+this.defs;
    this.outdent();
    svg += this.nl()+'</defs>'+this.nl();

    return svg;
  }

  /** Returns SVG code for a comment block */
  renderComments(comments: string) {
    return this.nl()+this.nl()+'<!--'+this.nl()+comments+this.nl()+'-->';
  }

  /** Returns SVG code for a Part object */
  renderPart(part: Part): string {
		let svg = '';
    for (let key in part.paths) {
      let path = part.paths[key];
      if(path.render) svg += this.renderPath(path);
    }
    for (let key in part.snippets) {
      let snippet = part.snippets[key];
      svg += this.renderSnippet(snippet);
    }
    // includes
    // text on path
    // notes
    // dimensions
    // texts

    return svg;
  }

  /** Returns SVG code for a Path object */
  renderPath(path: Path): string {
    path.attributes.add('d', path.asPathstring());
    return `${this.nl()}<path ${path.attributes.render()} />`;
  }

  /** Returns SVG code for a snippet */
  renderSnippet(snippet: Snippet): string {
    let svg = this.nl();
    svg += `<use x="${snippet.anchor.x}" y="${snippet.anchor.y}" `
    svg += `xlink:href="#${snippet.def}" ${snippet.attributes.render()}>`;
    if(snippet.description) {
      svg += `<title>${snippet.description}</title>`;
    }
    svg += '</use>';

    return svg;
  }


  /** Returns SVG code to open a group */
  openGroup(id: string, attributes?: Attributes): string {
    let svg = this.nl()+this.nl();
    svg += `<!-- Start of group #${id} -->`;
    svg += this.nl();
    svg += `<g id="${id}">`;
    this.indent();
    this.openGroups.push(id);

    return svg;
  }

  /** Returns SVG code to close a group */
  closeGroup(): string {
    this.outdent();

    return `${this.nl()}</g>${this.nl()}<!-- end of group #${this.openGroups.pop()} -->`;
  }

  /** Returns a linebreak + identation */
  nl(): string {
    return "\n"+this.tab();
  }

  /** Returns indentation */
  tab(): string {
    let space = '';
    for (let i = 0; i < this.tabs; i++) {
      space += '  ';
    }

    return space;
  }

  /** Increases indentation by 1 */
  indent(): void {
    this.tabs += 1;
  }

  /** Decreases indentation by 1 */
  outdent(): void {
    this.tabs -= 1;
  }

   /** Returns an unused ID */
   getUid() {
     this.freeId += 1;

     return ''+this.freeId;
   }
}
