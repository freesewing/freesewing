import script from "./lib/script";
import snippets from "./lib/snippets";
import { version, name } from "../package.json";

export default {
  name: name,
  version: version,
  hooks: {
    preRender: function(next) {
      // Add script and snippets
      this.script += script;
      this.defs += snippets;

      // Add SVG attributes
      this.attributes.add("freesewing:plugin-designer", version);

      /** Decorares points with extra info */
      var decoratePoints = function(svg) {
        for (let partId in svg.pattern.parts) {
          let part = svg.pattern.parts[partId];
          if (part.render) {
            for (let pointId in part.points) {
              let point = part.points[pointId];
              point.attributes.set("id", svg.getId());
              point.attributes.set("data-point", pointId);
              point.attributes.set("data-part", partId);
              let type =
                pointId.substr(0, 1) === "_" ? "point-hidden" : "point";
              let id = "snippet-" + pointId;
              part.snippets[id] = new svg.pattern.Snippet(
                type,
                point,
                `Point ${pointId} in part ${partId}`
              );
              part.snippets[id].attributes.set(
                "onmouseover",
                "pointHover(evt)"
              );
              part.snippets[id].attributes.set("id", id);
              part.snippets[id].attributes.set("data-point", pointId);
              part.snippets[id].attributes.set("data-part", partId);
            }
          }
        }
      };

      /** Decorares path points with extra info */
      var decoratePathPoint = function(
        id,
        Snippet,
        snippets,
        point,
        type,
        pathId,
        partId
      ) {
        snippets[id] = new Snippet(
          `path-${type}-point`,
          point,
          `Path ${pathId}: ${type}`
        );
        snippets[id].attributes.set("id", id);
        snippets[id].attributes.add("data-path", pathId);
        snippets[id].attributes.add("data-part", partId);
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
        path.attributes.add("class", "curve-control various dotted");
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
              if (path.render) {
                let id;
                let current;
                for (let op of path.ops) {
                  if (op.type !== "close") {
                    decoratePathPoint(
                      svg.getId(),
                      svg.pattern.Snippet,
                      part.snippets,
                      op.to,
                      op.type,
                      pathId,
                      partId
                    );
                  }
                  if (op.type === "curve") {
                    decoratePathPoint(
                      svg.getId(),
                      svg.pattern.Snippet,
                      part.snippets,
                      op.cp1,
                      "handle",
                      pathId,
                      partId
                    );
                    decoratePathPoint(
                      svg.getId(),
                      svg.pattern.Snippet,
                      part.snippets,
                      op.cp2,
                      "handle",
                      pathId,
                      partId
                    );
                    decorateCurveHandles(
                      svg.getId(),
                      svg.pattern.Path,
                      part.paths,
                      current,
                      op.cp1,
                      pathId,
                      partId,
                      part
                    );
                    decorateCurveHandles(
                      svg.getId(),
                      svg.pattern.Path,
                      part.paths,
                      op.to,
                      op.cp2,
                      pathId,
                      partId,
                      part
                    );
                  }
                  current = op.to;
                }
              }
            }
          }
        }
      };

      // Decorate pattern
      decoratePoints(this);
      decoratePaths(this);
      this.debug("plugin-designer | Pattern object");
      this.debug(this.pattern);
      next();
    }
  }
};
