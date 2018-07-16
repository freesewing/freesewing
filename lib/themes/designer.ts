import { Pattern } from '../pattern'
import { Svg } from '../svg'
import { Path } from '../path'
import { Snippet } from '../snippet'
import { Theme } from './theme';

export class Designer extends Theme {
  style: string = `
    path.curve-control{stroke:#f0ad4e;stroke-width: 0.2;}
    path.debug{stroke:#d9534f;stroke-opacity:0.4;stroke-width:2;}
    .point{fill:none;stroke-width:0.6;stroke:#f0ad4e;}
    text.tooltip{font-size:3px;}`;
  defs: string = `
    <g id="point">
        <circle cy="0" cx="0" r="2" class="stroke-hint stroke-sm" />
        <circle cy="0" cx="0" r="0.8" class="fill-hint" />
    </g>
    <g id="volatile-point">
        <circle cy="0" cx="0" r="1" class="stroke-canvas stroke-xs" />
        <path d="M -0.5,-0.5 L 0.5,0.5 M 0.5,-0.5 L -0.5,0.5" class="stroke-canvas stroke-sm" />
    </g>
    <g id="path-point">
        <circle cx="0" cy="0" r="2"  class="stroke-note stroke-lg" />
        <circle cx="0" cy="0" r="0.8" class="fill-note" />
    </g>
    <g id="path-start-point">
        <circle cx="0" cy="0" r="2"  class="stroke-canvas stroke-lg" />
        <circle cx="0" cy="0" r="0.8" class="fill-canvas" />
    </g>
    <g id="path-curvecontrol">
        <circle cy="0" cx="0" r="2" class="stroke-mark stroke-lg no-fill" />
        <circle cx="0" cy="0" r="0.8" class="fill-mark" />
    </g>
    <g id="focus-point">
        <circle cx="0" cy="0" r="2"  class="stroke-mark stroke-lg" />
        <circle cx="0" cy="0" r="0.8" class="fill-fabric" />
    </g>
    <g id="marked-point">
        <circle cx="0" cy="0" r="3.6"  class="stroke-hint stroke-sm" />
        <circle cx="0" cy="0" r="2.8"  class="stroke-hint stroke-sm" />
        <circle cx="0" cy="0" r="2.0"  class="stroke-hint stroke-sm" />
        <circle cx="0" cy="0" r="1.2"  class="stroke-hint stroke-sm" />
        <circle cx="0" cy="0" r="0.8"  class="stroke-hint stroke-sm" />
        <circle cx="0" cy="0" r="0.4" class="fill-hint" />
    </g>`;
  script:string = `
    function pointHover(evt) {
      var point = evt.target;
      var id = point.id;
      var cx = point.getAttribute('x');
      var cy = point.getAttribute('y');
      console.log('Point '+id+' ( '+cx+' , '+cy+' )');
      var scale = 2;
      cx = cx-scale*cx;
      cy = cy-scale*cy;
      point.setAttribute("transform", 'matrix('+scale+', 0, 0, '+scale+', '+cx+', '+cy+')');
      setTimeout(function(){
        var point = document.getElementById(evt.target.id);
        point.removeAttribute("transform", '');
      }, 1000);
  }`;

  /** Pre-render method is called just prior to rendering */
  preRender(pattern: Pattern, svg: Svg): void {
    super.preRender(pattern, svg);
    svg.style += this.style;
    svg.defs += this.defs;
    svg.script += this.script;
    svg.attributes.add('freesewing:theme', 'designer');
    svg.attributes.add('viewBox', '-10 -10 300 500');
    //this.decoratePoints(pattern, svg);
    this.decoratePaths(pattern, svg);
  }

  /** Decorares points with extra info */
  decoratePoints(pattern: Pattern, svg: Svg): void {
    for (let partId in pattern.parts) {
      let part = pattern.parts[partId];
      if (part.render) {
        for (let pointId in part.points) {
          this.decoratePoint(pointId, part, svg);
        }
      }
    }
  }

  /** Decorares a point with extra info */
  decoratePoint(pointId: string, part: Part, svg: Svg): void {
    let point = part.points[pointId];
    point.attributes.add('id', svg.getUid());
    point.attributes.add('data-point', id);
  }

  /** Decorares paths with extra info */
  decoratePaths(pattern: Pattern, svg: Svg): void {
    for (let partId in pattern.parts) {
      let part = pattern.parts[partId];
      if (part.render) {
        for (let pathId in part.paths) {
          this.decoratePath(pathId, part, svg);
        }
      }
    }
  }

  /** Decorares a path with extra info */
  decoratePath(pathId: string, part: Part, svg: Svg): void {
    let path = part.paths[pathId];
    if (!path.render) return false;
    for (let op of path.ops) {
      switch(op.type) {
        case 'move':
          let id = svg.getUid();
          part.snippets[id] = new Snippet(op.to, 'path-start-point', `Startpoint of path ${pathId}`);
          part.snippets[id].attributes.add('onmouseover', 'pointHover(evt)');
          part.snippets[id].attributes.add('id', svg.getUid());
          break;
        case 'line':
          let id = svg.getUid();
          part.snippets[id] = new Snippet(op.to, 'path-point', `Line endpoint of path ${pathId}`);
          part.snippets[id].attributes.add('onmouseover', 'pointHover(evt)');
          part.snippets[id].attributes.add('id', svg.getUid());
          break;
        case 'curve':
          let id = svg.getUid();
          part.snippets[id] = new Snippet(op.to, 'path-point', `Curve endpoint of path ${pathId}`);
          part.snippets[id].attributes.add('onmouseover', 'pointHover(evt)');
          part.snippets[id].attributes.add('id', svg.getUid());
          id = svg.getUid();
          part.snippets[id] = new Snippet(op.cp1, 'path-curvecontrol', `Curve cp1 of path ${pathId}`);
          part.snippets[id].attributes.add('onmouseover', 'pointHover(evt)');
          part.snippets[id].attributes.add('id', svg.getUid());
          id = svg.getUid();
          part.snippets[id] = new Snippet(op.cp2, 'path-curvecontrol', `Curve cp2 of path ${pathId}`);
          part.snippets[id].attributes.add('onmouseover', 'pointHover(evt)');
          let cp1 = new Path().move(current).line(op.cp1);
          let cp2 = new Path().move(op.to).line(op.cp2);
          cp1.attributes.add('class', 'curve-control');
          cp1.attributes.add('id', svg.getUid());
          cp2.attributes.add('class', 'curve-control');
          cp2.attributes.add('id', svg.getUid());
          part.paths[svg.getUid()] = cp1;
          part.paths[svg.getUid()] = cp2;
          break;
      }
      let current = op.to;
    }
  }
}
