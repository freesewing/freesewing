import { Part } from './part'
import { Path } from './path'
import { Snippet } from './snippet'
import { Pattern } from './pattern'
import { Attributes } from './attributes'
import hooklib from 'hooks'
import { Hooks } from './hooks'

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
  svg: string = '';
  openGroups: string[] = [];
  hook: any;
  hooks: string[];
  pattern: Pattern;

  constructor(pattern) {
    this.prefix = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>';
    this.attributes.add
    this.attributes.add("xmlns", "http://www.w3.org/2000/svg");
    this.attributes.add("xmlns:svg", "http://www.w3.org/2000/svg");
    this.attributes.add("xmlns:xlink", "http://www.w3.org/1999/xlink");
    this.attributes.add("xmlns:freesewing", "http://freesewing.org/namespaces/freesewing");
    this.attributes.add("freesewing:foo", "bar");
    this.pattern = pattern;
    this.hooks = ['preSvgRender', 'postSvgRender'];
    for(let k in hooklib) this[k] = hooklib[k];
    for(let k in this.hooks) this.hook(k, this[k]);

    return this;
  }

  /** Method to attach preSvgRender hooks on */
  preSvgRender(): void {}

  /** Method to attach postSvgRender hooks on */
  postSvgRender(): void {}

  /** Renders a draft object as SVG */
  render(pattern: Pattern): string {
    this.preSvgRender();
    this.svg = this.prefix;
    this.svg += this.renderComments(this.header);
    this.svg += this.renderSvgTag(pattern);
    this.svg += this.renderStyle();
    this.svg += this.renderScript();
    this.svg += this.renderDefs();
    this.svg += this.openGroup('draftContainer');
    for (let partId in pattern.parts) {
      let part = pattern.parts[partId];
      if (part.render) {
        this.svg += this.openGroup(part.id, part.attributes);
        this.svg += this.renderPart(part);
        this.svg += this.closeGroup();
      }
    }
    this.svg += this.closeGroup();
    this.svg += this.nl()+'</svg>';
    this.svg += this.renderComments(this.footer);
    this.postSvgRender();
    return this.svg;
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
    let svg = '<style type="text/css"> <![CDATA[ ';
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
