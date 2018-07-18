import script from './lib/script';
import style from './lib/style';
import snippets from './lib/snippets';

module.exports = {
  preRenderSvg: function (next) {
    // Add style, script and snippets
    this.style += style;
    this.script += script;
    this.defs += snippets;

    // Add SVG attributes
    this.attributes.add("xmlns:freesewing", "http://freesewing.org/namespaces/freesewing");
    this.attributes.add("freesewing:plugin", "theme-designer");
    this.attributes.add("viewBox", "-10 -10 300 500");

    // Decorate pattern
    decaratePoints(this);
    decaratePaths(this);

    next();

    /** Decorares points with extra info */
    var decoratePoints = function (svg) {
      for (let partId in svg.pattern.parts) {
        let part = svg.pattern.parts[partId];
        if (part.render) {
          for (let pointId in part.points) {
            let point = part.points[pointId];
            point.attributes.add('id', svg.getUid());
            point.attributes.add('data-point', pointId);
            point.attributes.add('data-part', partId);
          }
        }
      }
    };

    /** Decorares path points with extra info */
    var decoratePathPoint = function (id, snippets, point, type, pathId) {
      part.snippets[id] = new Snippet(op.to, `path-${op.type}-point`, `Path ${pathId}: ${op.type}`);
      part.snippets[id].attributes.add('onmouseover', 'pointHover(evt)');
      part.snippets[id].attributes.add('id', id);
    };

    /** Draws curve control handles */
    var decorateCurveHandles = function (id, paths, from, to) {
      let path = new Path().move(from).line(to);
      path.attributes.add('class', 'curve-control');
      path.attributes.add('id', id);
      paths[id] = path;
    };

    /** Decorares paths with extra info */
    var decoratePaths = function (svg) {
      for (let partId in svg.pattern.parts) {
        let part = svg.pattern.parts[partId];
        if (part.render) {
          for (let pathId in part.paths) {
            let path = part.paths[pathId];
            if (!path.render) return false;
            let id;
            for (let op of path.ops) {
              if (op.type !== 'close') {
                decoratePathPoint(svg.getUid(), part.snippets, op.to, op.type, pathId);
              }
              if (op.type !== 'curve') {
                decoratePathPoint(svg.getUid(), part.snippets, op.cp1, op.type, pathId);
                decoratePathPoint(svg.getUid(), part.snippets, op.cp2, op.type, pathId);
                decorateCurveHandles(svg.getUid(), part.paths, current, op.cp1);
                decorateCurveHandles(svg.getUid(), part.paths, op.to, op.cp2);
              }
              let current = op.to;
            }
          }
        }
      }
    };
  }
};