/**
 * @freesewing/theme-designer | The designer theme for freesewing
 * (c) 2018 Joost De Cock <joost@decock.org> (https://github.com/joostdecock)
 * @license MIT
 */
"use strict";

var script = `
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
}
`;

var style = `
path.curve-control{stroke:#f0ad4e;stroke-width: 0.2;}
path.debug{stroke:#d9534f;stroke-opacity:0.4;stroke-width:2;}
.point{fill:none;stroke-width:0.6;stroke:#f0ad4e;}
text.tooltip{font-size:3px;}
`;

var snippets = `
<g id="point">
  <circle cy="0" cx="0" r="2" class="stroke-hint stroke-sm" />
  <circle cy="0" cx="0" r="0.8" class="fill-hint" />
</g>
<g id="point-hidden">
  <circle cy="0" cx="0" r="1" class="stroke-canvas stroke-xs" />
  <path d="M -0.5,-0.5 L 0.5,0.5 M 0.5,-0.5 L -0.5,0.5" class="stroke-canvas stroke-sm" />
</g>
<g id="path-move-point">
  <circle cx="0" cy="0" r="2"  class="stroke-canvas stroke-lg" />
  <circle cx="0" cy="0" r="0.8" class="fill-canvas" />
</g>
<g id="path-line-point">
  <circle cx="0" cy="0" r="2"  class="stroke-note stroke-lg" />
  <circle cx="0" cy="0" r="0.8" class="fill-note" />
</g>
<g id="path-curve-point"> <use xlink:href = "#path-line-point"/> </g>
<g id="path-handle-point">
  <circle cy="0" cx="0" r="2" class="stroke-mark stroke-lg no-fill" />
  <circle cx="0" cy="0" r="0.8" class="fill-mark" />
</g>
<g id="point-focus">
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
</g>
`;

var name = "@freesewing/theme-designer";
var version = "0.2.2";
var description = "The designer theme for freesewing";
var author =
  "Joost De Cock <joost@decock.org> (https://github.com/joostdecock)";
var license = "MIT";
var homepage = "https://github.com/joostdecock/theme-designer#readme";
var repository = "github:joostdecock/theme-designer";
var bugs = {
  url: "https://github.com/joostdecock/theme-designer/issues"
};
var keywords = [
  "freesewing",
  "theme",
  "svg",
  "style",
  "design",
  "sewing patterns"
];
var main = "dist/module.js";
var unpkg = "dist/theme.min.js";
var scripts = {
  precommit: "npm run pretty && lint-staged",
  test: 'echo "Error: no test specified" && exit 1',
  clean: "rimraf dist",
  pretty: 'npx prettier --write "src/*.js"',
  lint: 'eslint --fix "src/*.js"',
  browserbuild: "rollup -c rollup.browser.js",
  nodebuild: "rollup -c rollup.node.js",
  build: "npm run clean && npm run browserbuild && npm run nodebuild"
};
var husky = {
  hooks: {
    "pre-commit": "lint-staged"
  }
};
var devDependencies = {
  "babel-core": "^6.26.3",
  "babel-eslint": "^8.2.6",
  eslint: "^5.2.0",
  "eslint-config-prettier": "^2.9.0",
  "eslint-plugin-prettier": "^2.6.2",
  husky: "^0.14.3",
  "lint-staged": "^7.2.0",
  prettier: "^1.13.7",
  rimraf: "^2.6.2",
  "rollup-plugin-babel": "^3.0.7",
  "rollup-plugin-commonjs": "^9.1.3",
  "rollup-plugin-filesize": "^4.0.1",
  "rollup-plugin-json": "^3.0.0",
  "rollup-plugin-node-resolve": "^3.3.0",
  "rollup-plugin-terser": "^1.0.1"
};
var files = ["dist/*", "README.md", "package-lock.json", "package.json"];
var meta = {
  name: name,
  version: version,
  description: description,
  author: author,
  license: license,
  homepage: homepage,
  repository: repository,
  bugs: bugs,
  keywords: keywords,
  main: main,
  unpkg: unpkg,
  scripts: scripts,
  husky: husky,
  "lint-staged": {
    "*.{js,json}": ["prettier --write", "git add"]
  },
  devDependencies: devDependencies,
  files: files
};

module.exports = {
  preRenderSvg: function(next) {
    // Add style, script and snippets
    this.style += style;
    this.script += script;
    this.defs += snippets;

    // Add SVG attributes
    this.attributes.add(
      "xmlns:freesewing",
      "http://freesewing.org/namespaces/freesewing"
    );
    this.attributes.add("freesewing:theme-designer", meta.version);

    /** Decorares points with extra info */
    var decoratePoints = function(svg) {
      for (let partId in svg.pattern.parts) {
        let part = svg.pattern.parts[partId];
        if (part.render) {
          for (let pointId in part.points) {
            let point = part.points[pointId];
            point.attributes.add("id", svg.getUid());
            point.attributes.add("data-point", pointId);
            point.attributes.add("data-part", partId);
            let type = pointId.substr(0, 1) === "_" ? "point-hidden" : "point";
            let id = svg.getUid();
            part.snippets[id] = new svg.pattern.snippet(
              point,
              type,
              `Point ${pointId} in part ${partId}`
            );
            part.snippets[id].attributes.add("onmouseover", "pointHover(evt)");
            part.snippets[id].attributes.add("id", id);
            part.snippets[id].attributes.add("data-point", pointId);
            part.snippets[id].attributes.add("data-part", partId);
          }
        }
      }
    };

    /** Decorares path points with extra info */
    var decoratePathPoint = function(
      id,
      Snippet,
      snippets$$1,
      point,
      type,
      pathId,
      partId
    ) {
      snippets$$1[id] = new Snippet(
        point,
        `path-${type}-point`,
        `Path ${pathId}: ${type}`
      );
      snippets$$1[id].attributes.add("onmouseover", "pointHover(evt)");
      snippets$$1[id].attributes.add("id", id);
      snippets$$1[id].attributes.add(
        "data-point",
        point.attributes.get("data-point")
      );
      snippets$$1[id].attributes.add("data-path", pathId);
      snippets$$1[id].attributes.add("data-part", partId);
    };

    /** Draws curve control handles */
    var decorateCurveHandles = function(
      id,
      Path,
      paths,
      from,
      to,
      pathId,
      partId
    ) {
      let path = new Path().move(from).line(to);
      path.attributes.add("class", "curve-control");
      path.attributes.add("id", id);
      path.attributes.add("data-path", pathId);
      path.attributes.add("data-part", partId);
      paths[id] = path;
    };

    /** Decorares paths with extra info */
    var decoratePaths = function(svg) {
      for (let partId in svg.pattern.parts) {
        let part = svg.pattern.parts[partId];
        if (part.render) {
          for (let pathId in part.paths) {
            let path = part.paths[pathId];
            if (!path.render) return false;
            for (let op of path.ops) {
              if (op.type !== "close") {
                decoratePathPoint(
                  svg.getUid(),
                  svg.pattern.snippet,
                  part.snippets,
                  op.to,
                  op.type,
                  pathId,
                  partId
                );
              }
              if (op.type === "curve") {
                decoratePathPoint(
                  svg.getUid(),
                  svg.pattern.snippet,
                  part.snippets,
                  op.cp1,
                  "handle",
                  pathId,
                  partId
                );
                decoratePathPoint(
                  svg.getUid(),
                  svg.pattern.snippet,
                  part.snippets,
                  op.cp2,
                  "handle",
                  pathId,
                  partId
                );
                decorateCurveHandles(
                  svg.getUid(),
                  svg.pattern.path,
                  part.paths,
                  current,
                  op.cp1,
                  pathId,
                  partId
                );
                decorateCurveHandles(
                  svg.getUid(),
                  svg.pattern.path,
                  part.paths,
                  op.to,
                  op.cp2,
                  pathId,
                  partId
                );
              }
              let current = op.to;
            }
          }
        }
      }
    };

    // Decorate pattern
    decoratePoints(this);
    decoratePaths(this);
    console.log(
      "Designer theme plugin: Here's the pattern object:",
      this.pattern
    );
    next();
  }
};
